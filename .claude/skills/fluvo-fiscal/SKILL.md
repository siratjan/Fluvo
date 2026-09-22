---
name: fluvo-fiscal
description: Kassenrecht in fluvo — Cloud-TSE hinter FiscalProvider-Adapter (fiskaly SIGN DE), Zustand "Signatur ausstehend", DSFinV-K-Export, GoBD-Unveränderlichkeit, Fahrer-Kassensturz. Laden bei Arbeit in packages/modules/fiscal und an Kassendaten im Kern.
---

# Kasse, TSE, GoBD

Entwurfsstand, keine Rechts- oder Steuerberatung. Steuerberaterin und Anwalt prüfen noch. Alles, was hier als [OFFEN] steht, wird nicht geraten, sondern so gebaut, dass beide Antworten möglich bleiben.

## Aufteilung

- **Kern:** Kassendaten, Zahlungen, Kassensturz, Event-Log. Die Fahrer-Bargeldabrechnung gehört buchhalterisch hierher, nicht ins Fahrer-Modul.
- **Modul `fiscal`:** spricht mit der TSE und erzeugt den DSFinV-K-Export. Reagiert auf Kern-Events.

## Adapter

```ts
interface FiscalProvider {
  startTransaction(ctx: FiscalContext): Promise<FiscalTxRef>;
  finishTransaction(ref: FiscalTxRef, receipt: FiscalReceiptData): Promise<FiscalSignature>;
  exportTar?(range: DateRange): Promise<Buffer>;   // TSE-Export des Anbieters
}
```

fiskaly-Spezifisches nur in `modules/fiscal/providers/fiskaly/`. Alternative Deutsche Fiskal bleibt möglich. **API in der aktuellen Anbieter-Doku nachschlagen.**

## Signatur ist entkoppelt

Die TSE ist ein Cloud-Dienst; Küche und Bon müssen aber ohne Internet laufen. Deshalb blockiert die Signatur nie den Bestellfluss:

```
fiscal_transactions.status:  pending → signed
                                  └──→ failed_outage  (Ausfall dokumentiert, Nachsignatur/Nachmeldung)
```

- Kassenrelevantes Event → Eintrag `pending` → Job signiert → `signed` mit Signatur, Zähler, Seriennummer, Start-/Endzeit.
- TSE nicht erreichbar → Wiederholung; der Ausfall wird mit Beginn und Ende protokolliert. Bons aus dieser Zeit tragen einen Ausfallhinweis.
- Jeder Eintrag ist idempotent (eine Signatur je Geschäftsvorfall).

**[OFFEN] — nicht raten:** Signaturzeitpunkt (Bestellung vs. Zahlung; bei Barzahlung an der Tür liegen sie auseinander), genaue Ausfallregeln, Storno und Teilstorno nach Signatur, Behandlung von Online-Zahlungen, Trinkgeld. Das Datenmodell hält beide Varianten offen: `fiscal_transactions` verweist auf ein Event, nicht fest auf einen Status.

## Unveränderlichkeit (GoBD)

- `order_events`, `payments`, `fiscal_transactions`, `cash_settlements`: nur anfügen. Korrektur = neuer Gegen-Eintrag, nie Überschreiben.
- Rolle `fluvo_app` hat auf diesen Tabellen kein `UPDATE`/`DELETE`.
- Aufbewahrung 10 Jahre. DSGVO-Löschung entfernt oder pseudonymisiert den Personenbezug; der Beleg bleibt. Deshalb stehen Name, Rufnummer, Adresse nicht in diesen Tabellen, sondern nur ein Verweis auf `customers`.
- Backups und Exporte gehören zur Aufbewahrung — täglich, Wiederherstellung getestet.

## DSFinV-K

Der Export ist eine Ableitung aus dem Datenmodell, kein Nachgedanke. Beim Entwurf jeder Kassentabelle prüfen, ob die nötigen Angaben vorhanden sind: Kassen-/Geräte-ID, Bon-Nummer fortlaufend je Kasse, Zeitpunkte, Positionen mit eingefrorenem Text/Preis/Steuersatz, Zahlarten, Storno-Kennzeichen, TSE-Daten, Kassenabschluss. Genaue Feldliste aus der aktuellen DSFinV-K-Spezifikation — nicht aus dem Gedächtnis.

## Kassensturz je Fahrer

`driver_shifts` (Beginn, Ende, Wechselgeld) und `cash_settlements` (je Fahrer und Schicht: bar, Karte, Storno, Soll, Ist, Differenz). Soll entsteht ausschließlich aus den Bestellungen der Schicht im Kern. Differenzen werden festgehalten, nicht „ausgeglichen". Abschluss der Schicht setzt die Bestellungen auf `settled` und schreibt Events.

Alle Beträge Ganzzahl in Cent.
