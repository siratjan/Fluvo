---
name: konzept-vertraege
description: Schnittstellen-Verträge der fluvo-Konzeptphase — Ereignis-Katalog des Kerns, Kern-Befehle, API-Endpunkte, Webhook-Verträge zu Anbietern, Datenwörterbuch mit DSGVO/GoBD-Klasse je Feld, nicht-funktionale Anforderungen mit Zahlen, Ausfall-Tabelle, Rollen- und Rechte-Matrix. Laden, wenn etwas unter docs/konzept/vertraege/ entsteht oder geändert wird.
---

# Verträge

Ein Vertrag legt fest, worauf sich zwei Seiten verlassen — bevor eine von beiden gebaut ist. Prinzip „Vertrag zuerst": **genau ein maßgebliches Artefakt je Grenze**, nie dieselbe Form parallel in Prosa, Mock und Code.

Für fluvo heißt das: In der Konzeptphase ist die Markdown-Datei unter `docs/konzept/vertraege/` maßgeblich. Sobald Code entsteht, wird daraus ein Zod-Schema in `packages/schemas` — ab dann ist **das Schema** maßgeblich und die Markdown-Datei verweist nur noch darauf. Nie beides pflegen.

In einen Vertrag gehört, was die andere Seite beobachten kann: Namen, Felder, Pflicht/optional, Null-Bedeutung, erlaubte Werte, Fehlerfälle, Idempotenz, Kompatibilität. Nicht hinein gehören Tabellenspalten, Klassen, Abfragen. **Bedeutung festlegen, nicht nur Form:** „`cancellation_reason` ist nur bei Status `cancelled` gesetzt."

Vom Verbraucher her denken: Was braucht die Küche, um eine Bestellung anzuzeigen? Was braucht die KI, um eine Summe vorzulesen? Keine Datenbankzeile nach außen reichen und „Vertrag" nennen.

## 1. Kern-Befehle (`kern-befehle.md`)

Je Befehl (`createOrder`, `advanceOrder`, `cancelOrder`, `completeDelivery`, `settleShift`, …): Zweck · wer darf · Eingabe (Felder, Pflicht, Regeln) · Prüfungen in Reihenfolge · Ergebnis · typisierte Fehler (erwartbar ≠ Ausnahme) · erzeugte Events · Idempotenz-Schlüssel · zugehörige FA/TU. Alle Bestelleingänge nutzen denselben `createOrder` [FEST].

## 2. Ereignis-Katalog (`ereignisse.md`)

| Event | Wann | Nutzlast (ohne Personendaten!) | Wer reagiert | Wirkung | Idempotent? |
|---|---|---|---|---|---|

Event-Nutzlasten sind unveränderlich und 10 Jahre aufzubewahren (GoBD) — deshalb **von Anfang an ohne Namen, Rufnummer, Adresse**, nur IDs. Module sprechen nur über diese Events miteinander [FEST]. Braucht Modul A etwas von Modul B, fehlt ein Event oder die Information gehört in den Kern.

## 3. API und Webhooks (`api.md`, `webhooks.md`)

API je Endpunkt: Methode/Pfad · Rolle · Eingabe · Antwort · Fehler (einheitliche Fehlerform) · Tenant-Herkunft (Sitzung, Host, Geräte-Token) · Rate-Limit. Fremde ID → 404, nicht 403.

Webhooks je Anbieter (Voice, Zahlung, TSE, Drucker-Abfrage): Signaturprüfung · Zuordnung zum Tenant · Wiederholungsverhalten des Anbieters · Idempotenz über Ereignis-ID · was bei internem Fehler geantwortet wird. **Anbieter-Formate aus der aktuellen Doku übernehmen, nicht aus dem Gedächtnis** — und nur die Felder aufnehmen, die fluvo wirklich nutzt.

Function Calls der KI stehen im Gesprächsdesign (Skill `konzept-gespraechsdesign`), folgen aber denselben Regeln.

## 4. Datenwörterbuch (`datenwoerterbuch.md`)

Je Tabelle eine Tabelle:

| Feld | Typ | Pflicht | Bedeutung | Beispiel (erfunden) | Personenbezug | Klasse | Löschung |
|---|---|---|---|---|---|---|---|

**Klasse** ist die Entscheidung, die sich später kaum korrigieren lässt: **(a)** DSGVO-löschbar (Kundenstamm, Rufnummer, Adresse, Freitext) oder **(b)** GoBD-pflichtig, 10 Jahre (Bestellung, Positionen, Zahlung, Events, Fiskaldaten, Kassensturz). Tabellen der Klasse (b) enthalten keinen Personenbezug, nur Verweise. Jede Tabelle hat `tenant_id`. Geld: Ganzzahl in Cent. Preise und Artikeltexte an der Bestellung eingefroren. Konkrete Fristen: [OFFEN] Q10.

## 5. Nicht-funktionale Anforderungen (`nfa.md`)

| ID | Anforderung | Zahl | Wie gemessen | Stufe / Quelle |
|---|---|---|---|---|

Ohne Zahl keine Anforderung. Aus dem Briefing bekannt: Gesprächslatenz < 1 s · Kostenampel 0,15 / 0,20 € je Minute · WCAG 2.1 AA · tägliche, getestete Backups. Zu erfragen: Bon-Druck in wie vielen Sekunden, wie lange muss die Küche offline durchhalten, Bestellungen je Stunde in der Spitze, tolerierte Ausfallzeit, Wiederherstellungszeit, unterstützte Geräte/Browser (BYOD).

## 6. Ausfall-Tabelle (`ausfaelle.md`)

| Was fällt aus | Was passiert sofort | Was sieht das Personal | Was sieht der Kunde | Was wird nachgeholt | Offene Frage |
|---|---|---|---|---|---|

Zeilen mindestens: Internet im Laden · Voice-Anbieter · LLM · TSE · Drucker (Papier, offline) · Zahlungsanbieter · Geocoder · fluvo-Server · Datenbank · Handy des Fahrers ohne Netz. Maßstab: Jeder Ausfall wird an genau einer Stelle sichtbar — beim Personal, beim Anrufer (Eskalation) oder bei Sirat (Monitoring). „Telefon klingelt normal durch" ist der Rückfall der Telefonie [FEST].

## 7. Rollen und Rechte (`rollen-rechte.md`)

Matrix Rolle × Fähigkeit: Inhaber · Annahme · Koch · Fahrer · fluvo-Support · (Kunde auf der Website). Dazu je Rolle: Anmeldung (E-Mail-Link, PIN + Gerät, QR-Token), was sie an Personendaten sieht, was sie nie darf (z. B. Fahrer sieht keine fremden Touren, Support sieht keine Kundendaten ohne Anlass). Details zu PIN/Token: [OFFEN] Q11.

## Checkliste

- [ ] Je Grenze genau ein maßgebliches Artefakt
- [ ] Bedeutung von leer / null / fehlend ist festgelegt
- [ ] Jeder Fehlerfall, auf den die Gegenseite anders reagieren muss, hat einen eigenen Code
- [ ] Idempotenz je schreibendem Vertrag geklärt
- [ ] Keine Personendaten in Event-Nutzlasten, Pfaden oder Fehlermeldungen
- [ ] Jedes Feld hat eine Klasse (a) oder (b)
- [ ] Jede Zahl hat eine Messmethode und eine Quelle; Unbekanntes ist [OFFEN], nicht geschätzt
- [ ] Verknüpft mit FA/TU und Zustandsübergängen
