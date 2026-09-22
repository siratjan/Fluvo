# 0011 · Wechselgeld ohne Bestätigung, Inhaber-Bereich auch vom Handy, keine eigene Storno-Anzeige, geänderter Bon als Angebot — Korrekturen aus K1 vom 2026-09-22

- **Status:** entschieden (Sirat, im Gespräch) — ersetzt Teile von ADR 0007 (Geldrecht „Wechselgeld-Ausgabe bestätigen", Inhaber-Bereich am Hauptgerät) und präzisiert/ergänzt ADR 0009 (Storno-Anzeige an der Annahme, geänderter Bon). Alles Übrige aus 0007 und 0009 gilt weiter.
- **Datum:** 2026-09-22
- **Stufe:** [ENTSCHIEDEN Sirat] (fachlich, im Rahmen von K1 / AP-003) — nicht [FEST]
- **Entschieden von:** Sirat

## Anlass

Bei der Einzeldurchsicht von FA-11 (Ändern/Stornieren) sowie FA-19 (Schicht beginnen) und FA-16 (Abschluss je Mitarbeiter) hat Sirat vier Punkte entschieden bzw. präzisiert (Mitschrift in `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`, Runden 40, 41 und 43). Zwei davon ändern Geld- bzw. Zugangsregeln aus ADR 0007, zwei betreffen ADR 0009 (eine Präzisierung, eine Ergänzung). Bestehende ADRs werden nicht umgeschrieben; dieser ADR hält fest, welche Sätze er ersetzt oder präzisiert. Die Fassung von heute gilt.

## Entscheidung

- **Wechselgeld-Ausgabe muss nicht bestätigt werden** (Runde 43 — ersetzt in ADR 0007 das Geldrecht „Wechselgeld-Ausgabe am Schichtbeginn bestätigen"): Die Ausgabe des Wechselgelds wird **weder vorab noch nachträglich** vom Inhaber bestätigt. Der **Wechselgeld-Start ist ein eingestellter Wert je Restaurant** (FA-16/FA-20); die Schicht startet damit **ohne Inhaber-Handgriff**, und die Person darf sofort annehmen und kassieren. Die **übrigen Geldrechte aus ADR 0007** (Kassensturz und Tresen-Abschluss bestätigen, Schicht mit Abweichung begründet beenden, Storno nach erfasster Zahlung; Preise/Allergene/Steuersatz) **bleiben beim Inhaber** — soweit sie nicht bereits durch ADR 0010 verschoben wurden.
- **Inhaber-Bereich auch vom Handy** (Runde 43 — ersetzt in ADR 0007 den Satz „Der Inhaber öffnet mit seinem Code am Hauptgerät im Laden einen eigenen Bereich"): Der Inhaber darf den Abschluss und die anderen Inhaber-Bestätigungen **auch von seinem eigenen Handy** bestätigen, nicht nur am Hauptgerät im Laden. Der Grundsatz **„keine Vertretung" bleibt** (nur der Inhaber, ADR 0007). Folge: Das Inhaber-Handy wird ein **registriertes Gerät** (Gerätebindung, kein PIN allein — Q11, `security-reviewer`). Bei jeder Abschluss-Bestätigung bleiben **Soll-Betrag, gemeldeter Betrag, Kommentar und die Bestätigung selbst protokolliert** (ADR 0007, Abschluss in zwei Schritten).
- **Keine eigene Storno-Anzeige** (Runde 40 — präzisiert in ADR 0009 den Punkt „an der Annahme erscheint ein Hinweis / eine Anzeige, dass storniert wurde"): Es gibt **keine eigene, gesonderte Storno-Anzeige**. Der Kunde sagt am Telefon einem **Mitarbeiter** (FA-03), welche Bestellung storniert werden soll, und die **Annahme storniert selbst**. Der Storno ist wie jede Änderung **in der Bestellübersicht und im Log sichtbar**; die **Küche wird per Zuruf** informiert (ADR 0009: kein Storno-Bon). Das ist **keine neue Entscheidung**, nur eine Präzisierung — die „Anzeige" aus ADR 0009 ist nichts Eigenes.
- **Geänderter Bon als Angebot** (Runde 41 — ergänzt ADR 0009): Der **Systemeintrag jeder Änderung bleibt Pflicht** (Betrag und Abschluss kommen aus dem System). **Ob** die Annahme danach den geänderten Bon **druckt** oder den alten Küchenzettel handschriftlich ergänzt, entscheidet sie selbst — der Druck wird der Annahme als **Angebot** („Geänderten Bon drucken") **angeboten, nicht automatisch ausgelöst**. Wird gedruckt, gelten die bisherigen Regeln: Kennzeichnung **„GEÄNDERT"** und bei Lieferung **zwei Exemplare** (ADR 0008/0009). Bekanntes Risiko: Der Küchenzettel kann vom System abweichen, wenn das Nachschreiben vergessen wird — das Geld stimmt trotzdem. Von Sirat in Kauf genommen.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Wechselgeld-Ausgabe weiter bestätigen (ADR 0007) | Vier-Augen-Prinzip beim Startbestand der Börse | zusätzlicher Inhaber-Handgriff am Schichtbeginn; Inhaber nicht immer da → Schicht startet nicht; Sirat: fester Startwert je Restaurant reicht |
| Inhaber-Bereich nur am Hauptgerät im Laden (ADR 0007) | Zugang an ein Gerät im Laden gebunden, physische Anwesenheit | Inhaber muss vor Ort sein, um abzuschließen; Abschlüsse bleiben über Nacht offen; Sirat: auch vom Handy, mit registriertem Gerät |
| Eigene Storno-Anzeige an der Annahme (Lesart ADR 0009) | dedizierter Hinweis „storniert" | doppelte Anzeige neben Bestellübersicht/Log; Sirat: Kunde sagt es dem Mitarbeiter, Annahme storniert selbst, Sichtbarkeit über die Übersicht reicht |
| Geänderten Bon immer automatisch drucken | Küchenzettel stimmt garantiert mit dem System | erzwingt Papier auch bei kleiner Änderung; Sirat: Druck als Angebot, Nachschreiben auf dem alten Zettel bleibt erlaubt (Risiko in Kauf genommen) |

## Folgen

- **Wechselgeld ohne Bestätigung:** FA-19 verliert den Bestätigungsschritt am Schichtbeginn (Normalablauf Schritt 4 streichen, Ausnahme 4a entfällt); der Startwert wird eine Einstellung je Restaurant (FA-20). FA-16 (Vorbedingung) und K9 (Rechte-Matrix: Geldrecht „Wechselgeld-Ausgabe bestätigen" streichen) ziehen nach.
- **Inhaber-Handy als registriertes Gerät (Q11, `security-reviewer`):** Der Inhaber-Bereich ist nicht mehr an das Hauptgerät gebunden. Die Anmeldung des Inhabers am eigenen Handy braucht **Gerätebindung/Registrierung, kein PIN allein** (Sicherheitsregel: PIN nur zusammen mit registriertem Gerät, mit Rate-Limit und Sperre). Das gehört in Q11 (Sperrschwelle, Offline-Anmeldung) und in eine `security-review` des Handy-Zugangs vor Pilotstart. FA-16 (Schritt 5, 5d), FA-19 und FA-20 (Inhaber-Handy registrieren) sowie K9 (Rollen/Rechte) und K10 sind nachzuziehen.
- **Risiko: Inhaber bestätigt Geld, das er nicht in der Hand hat.** Bestätigt der Inhaber vom Handy aus der Ferne, prüft er den Bargeldbestand nicht physisch. Gegenmittel: Soll-Betrag, gemeldeter Betrag und Kommentar bleiben sichtbar, die Bestätigung ist protokolliert (ADR 0007). Fehlbeträge fallen weiter im Log/in der Tagesübersicht auf.
- **Keine eigene Storno-Anzeige:** FA-11 (Nachbedingung, Storno-Schritt, Regeln, Testszenario „Kundenstorno: Anzeige" → „sichtbar in der Übersicht") und FA-06 halten fest, dass der Storno über Bestellübersicht/Log sichtbar ist und die Küche per Zuruf erreicht wird. K3 (Storno-Pfad) bleibt unverändert; ADR 0009 wird nur präzisiert, nicht geändert.
- **Geänderter Bon als Angebot:** FA-11 (Normalablauf Schritt 3, Nachbedingung, „Darf nicht", Regeln, Testszenarien) und FA-06 formulieren den geänderten Bon von „wird ausgegeben" auf „wird auf Anforderung angeboten" um; K10 erhält die Schaltfläche „Geänderten Bon drucken". Systemeintrag bleibt Pflicht; „GEÄNDERT" und zwei Exemplare bei Lieferung gelten nur, wenn gedruckt wird (ADR 0008/0009).
- **K1:** FA-16 (Wechselgeld-Vorbedingung, Abschluss vom Handy), FA-19 (Schichtstart ohne Bestätigung), FA-20 (Startwert je Restaurant, Inhaber-Handy registrieren), FA-11 (Storno-Sichtbarkeit, geänderter Bon als Angebot), FA-06 (Bondruck auf Anforderung).
- **K9 Rechte-Matrix:** Geldrecht „Wechselgeld-Ausgabe bestätigen" entfällt; Inhaber-Zugang nicht mehr an das Hauptgerät gebunden (registriertes Handy statt Ort).
- **K10:** Inhaber-Abschluss vom Handy; Schaltfläche „Geänderten Bon drucken".

## Wann neu bewerten

Wenn im Piloten Fehlbeträge mit Fern-Bestätigungen des Inhabers oder mit dem festen Wechselgeld-Startwert zusammenfallen (dann Bestätigung/Startwert erneut erwägen) · wenn Anwalt oder Steuerberaterin zum Inhaber-Zugang, zur Wechselgeld-Erfassung oder zur Storno-Sichtbarkeit Vorgaben machen · wenn die `security-review` des Handy-Zugangs (Q11) die Gerätebindung des Inhaber-Handys anders regeln muss.

**Nachtrag 2026-09-22:** siehe ADR 0012 (Wechselgeld außerhalb des Systems)
