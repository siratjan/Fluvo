# 0006 · Piloten-Schnitt aus der Konzeptarbeit K1 — Produktentscheidungen vom 2026-09-18

- **Status:** entschieden (Sirat, im Gespräch) — der Punkt „Storno nur Inhaber" in der Rechte-Trennung ist **ersetzt durch 0007** (2026-09-21); außerdem ändert **0008** (2026-09-21) den Schnitt: Fahrer-Teil nach dem ersten Piloten, bei Lieferung zwei Bon-Exemplare; alles Übrige gilt weiter
- **Datum:** 2026-09-18
- **Stufe:** [ENTSCHIEDEN Sirat] (fachlich, im Rahmen von K1 / AP-003) — nicht [FEST], das bleibt dem Briefing vorbehalten
- **Entschieden von:** Sirat

## Anlass

Im Gespräch zur Konzeptarbeit K1 (fachliche Anwendungsfälle, AP-003) hat Sirat den Piloten-Schnitt festgelegt und eine Reihe fachlicher Fragen entschieden. Quelle für alles: die Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md` (Runden 1–14). Die FA-Entwürfe (FA-01 … FA-18, FA-20 … FA-22; FA-07 entfällt im Piloten) stehen im Status `Entwurf`; Durchgehen und Abnahme mit Sirat stehen noch aus. Dieser ADR hält die inhaltlichen Produktentscheidungen fest, damit sie nicht in der Mitschrift verloren gehen.

## Entscheidung

Die folgenden Punkte sind entschieden (Runde in Klammern verweist auf die Mitschrift):

- **Vier Bestellarten** (Runde 6): Lieferung (Bon mit Fahrer-QR), Abholung nach Anruf (Bon ohne QR), Mitnehmen ohne Anruf, Hier essen. „Hier essen" nur die kleine Form — am Tresen bestellen, sofort zahlen, keine Tische/offenen Rechnungen (Runde 7).
- **Keine Küche im System** (Runden 4, 5, 9): kein Küchendisplay und keine Küchen-Status im Piloten; ein Bon je Bestellung, ein Exemplar, Kontrolle liegt im System (Runde 10). FA-07 entfällt im Piloten, ID bleibt reserviert.
- **Vorbestellung** (Runden 7, 10, offene-Fragen-Liste): beliebig weit im Voraus möglich, einzige Bedingung ist Betrieb zur Wunschzeit; der Bon kommt **sofort**, deutlich als Vorbestellung mit Wunschzeit gekennzeichnet.
- **KI nennt die Summe immer** vor der Bestätigung (Runde 8), nicht nur auf Wunsch.
- **Lieferzonen** tragen drei Werte je Zone (Runden 5, 10, 13): Lieferzeit, Liefergebühr, Mindestbestellwert. Für Abholung gibt es einen eigenen Zeitwert je Restaurant („Abholung in ca. X Minuten", Runde 8).
- **Preise mit „gültig ab" oder sofort** (Runden 2, 3): der Inhaber legt den Zeitpunkt fest. Ein laufendes KI-Gespräch rechnet mit dem Preisstand vom Gesprächsbeginn zu Ende; der Kunde zahlt nie einen anderen Preis, als ihm am Telefon genannt wurde. Bereits aufgenommene Bestellungen behalten ihren Preis.
- **Geld-Muster** (Runden 5, 6, 8, 10, 12): Fahrer-Kassensturz und Tresen-Abschluss laufen nach demselben Muster, je Person mit eigener Börse und eigenem Wechselgeld. Zurückzugeben = Wechselgeld-Start + Summe der von dieser Person bar kassierten Beträge; der **Inhaber bestätigt**. Angezeigt wird nur der zurückzugebende Betrag; alles darüber ist Sache der Person. Eine Abweichung schließt die Schicht nur der Inhaber ab, und nur mit festgehaltener Begründung. Trinkgeld wird nicht abgebildet.
- **Rechte-Trennung** (Runden 10, 11, 13): Betriebsrechte (Annahme **und** Inhaber: Artikel „heute aus", Speisekarte, Lieferzeit, Zonen, Öffnungszeiten/Urlaub, KI an/aus, Bon nachdrucken, Bestellung von Hand) gegen Geldrechte (**nur** Inhaber: Kassensturz und Tagesabschluss bestätigen, Schicht mit Abweichung beenden, „nicht bezahlt" bestätigen, Storno). Preise, Allergene und Steuersatz ändert **nur der Inhaber**.
- **Änderung einer Bestellung** (Runden 6, 13, 14): erst mit der Küche abklären; jede Änderung **wird ins System eingetragen**, die Preise ändern sich entsprechend, es entsteht ein **neuer, als geändert erkennbarer Bon**. Bearbeiten ist ein neues Ereignis, nichts wird überschrieben.
- **KI jederzeit an/aus** (Runde 13); außerhalb der Öffnungszeit **klingelt das Telefon durch wie heute**, die KI geht nicht ran (Runde 14).
- **Betreiber-Zentrale** (Runden 1, 10): Onboarding neuer Restaurants, Module und Minutenpaket schalten, Überwachung **nur** über Gesundheitswerte (keine fremden Bestellungen/Kundendaten) mit aktiver Benachrichtigung bei Störung. „Startklar" ist erreicht, wenn ein Testanruf (und Testbon) durchläuft.
- **Kundengebundener Gutschein im System**: später, nicht im Piloten-Schnitt (Runde 10).

## Berührt [FEST] — ausdrücklich NICHT entschieden

Der Schnitt berührt die feste Statuskette `… Fertig → Unterwegs → Geliefert → Abgerechnet` [FEST 2]: die vier Bestellarten und der Wegfall der Küchen-Status passen nicht mehr überall. **Diese Punkte sind hier NICHT entschieden.** Sie werden in K3 durch `architect` vorbereitet, danach entscheidet Sirat. Sie sind als offene Frage festgehalten (siehe `docs/open-questions.md` Q13, mit den Unterpunkten Weg ohne „Unterwegs", Umgang mit den nicht gesetzten Zuständen „In Küche"/„Fertig", Fahrer-Scan lösen, Enden „nicht zustellbar"/„nie abgeholt", Storno-Pfad, Lebenszyklus des Restaurants).

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Küchendisplay/Küchen-Status im Piloten | näher am Zielbild | Sirat: erst der Durchstich, Küche läuft wie heute auf Papier (Runde 9) |
| Preisänderung nur zum nächsten Geschäftstag (Vorschlag Jarvis) | einfach zu rechnen | Sirat will „sofort" möglich, nur ohne laufendes Gespräch zu treffen (Runde 3) |
| Annahme bekommt volle Inhaber-Rechte (Wunsch Sirat, Runde 10) | ein Rollentyp weniger | hebelt das Vier-Augen-Prinzip bei Geld aus → Trennung Betriebs-/Geldrechte (Runde 11) |
| KI nimmt nach Ladenschluss Vorbestellungen an (Vorschlag Jarvis) | mehr Reichweite | Sirat: Telefon klingelt durch wie heute (Runde 14) |

## Folgen

- **K3 (Zustandsmodell):** muss die Statuskette für vier Bestellarten und ohne Küchen-Status überarbeiten (Q13); Scan-Lösen und Storno als eigene Ereignisse; Lebenszyklus des Restaurants.
- **K5 (Datenmodell):** Bestellart als Merkmal; Zone mit drei Werten; Preise mit „gültig ab"; Teilzahlungen je Zahlart (inkl. Gutschein, Q14); Börse/Wechselgeld je Person; Vorbestellung mit Wunschzeit.
- **K9 (Rollen/Ausfälle):** Betriebsrechte vs. Geldrechte als Rollen-Matrix; Betreiber-Zentrale mit Gesundheitswerten ohne Mandantentrennung zu umgehen (Q16, `tenant-isolation-guard`).
- **K10 (Oberflächen/Bon):** Inhaber-Profil für Touch/kleines Display; Personenwechsel per PIN am geteilten Tresen-Gerät; Bon-Kennzeichnung für Vorbestellung und für geänderten Bon.
- Neue und ergänzte offene Fragen: Q13 (Statuskette/Bestellarten), Q14 (Zahlart Gutschein), Q15 (KI außerhalb Öffnungszeit, ergänzt Q1), Q16 (Betreiber-Zentrale/Mandantentrennung), Q17 (Haftung Allergene/Steuersatz), Q18 (Tresen-Abschluss/mehrere Börsen, ergänzt Q2); Ergänzung an Q4.

## Wann neu bewerten

Wenn beim Durchgehen der FA-Entwürfe mit Sirat einzelne Entscheidungen fallen oder sich ändern, oder wenn K3 die Statuskette-Frage (Q13) klärt — dann dieser ADR durch einen neuen ersetzen (`ersetzt durch NNNN`), nicht umschreiben.

**Nachtrag 2026-09-22:** siehe ADR 0010 („Hier essen" fällt aus dem Piloten-Schnitt → drei Bestellarten: Lieferung, Abholung nach Anruf, Mitnehmen ohne Anruf).

**Nachtrag 2026-09-22:** siehe ADR 0012 (Wechselgeld außerhalb des Systems — kein Wechselgeld-Start je Börse, ersetzt Runde 12).

**Nachtrag 2026-09-23:** siehe ADR 0014 (Vorgehen — Durchstich-Spur). Der hier festgehaltene Piloten-Schnitt wird nun als dünner Durchstich zuerst gebaut; das Konzept wächst mit dem Code, statt K2…K11 vorab vollständig abzunehmen.

**Nachtrag 2026-09-23:** siehe ADR 0015 (Zustandskette der Bestellung im Piloten). Die oben als „berührt [FEST] — ausdrücklich NICHT entschieden" markierte Statuskette (Q13) ist damit für den Bestell-Durchstich entschieden: reduzierte Kette `received → delivered | handed_over | cancelled` (`ended_unpaid` [VORSCHLAG]), Merkmale statt Zustände, Storno-Recht am Merkmal „bezahlt". Die Rest-Unterpunkte von Q13 (delivered↔Abgerechnet, „niemand drückt geliefert", Fahrer-Enden, Restaurant-Lebenszyklus) bleiben offen.
