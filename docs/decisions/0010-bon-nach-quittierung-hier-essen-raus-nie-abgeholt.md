# 0010 · Bon erst nach Quittierung, „Hier essen" raus aus dem Piloten-Schnitt, „nie abgeholt" auch durch die Annahme — Korrekturen aus K1 vom 2026-09-22

- **Status:** angenommen (Sirat, im Gespräch) — ersetzt Teile von ADR 0007 (Geldrecht „Ende ohne Bezahlung") und ADR 0008 (Bestellart „Hier essen" im Piloten-Schnitt) sowie die frühere Annahme „Bon sofort beim Anlegen". Alles Übrige aus 0007, 0008 und 0009 gilt weiter.
- **Datum:** 2026-09-22
- **Stufe:** [ENTSCHIEDEN Sirat] (fachlich, im Rahmen von K1 / AP-003) — nicht [FEST]
- **Entschieden von:** Sirat

## Anlass

Bei der Einzeldurchsicht von FA-06 und FA-15 (Mitschrift in `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`, Runden 34–37) hat Sirat drei Punkte entschieden, die frühere Festlegungen ändern: den Auslöser des Bon-Drucks, den Schnitt der Bestellarten für den Piloten und das Geldrecht „Ende ohne Bezahlung". Bestehende ADRs werden nicht geändert; dieser ADR hält fest, welche Sätze er ersetzt. Die Fassung von heute gilt.

## Entscheidung

- **Bon erst nach Quittierung** (Runden 34, 35 — ersetzt die bisherige Annahme „Bon sofort beim Anlegen", Mitschrift Runde 7/10, FA-06 alt): Geht eine **KI-Bestellung** ein (auch eine Vorbestellung), **signalisiert das Annahme-Gerät** (Ton + Anzeige „Neue Bestellung"). Die Annahme **quittiert** die Anzeige; erst die Quittierung **löst den Bon-Druck** aus und die Bestellung geht weiter. Wird **2 Minuten** lang nicht quittiert, druckt der Bon **trotzdem**, mit Hinweis an der Annahme, dass unquittiert gedruckt wurde. Bis dahin signalisiert das Gerät weiter. **Von Hand angelegte Bestellungen** (FA-05) gelten als **direkt quittiert** — der Bon druckt sofort beim Anlegen, ohne zusätzlichen Schritt.
- **„Hier essen" fällt aus dem Piloten-Schnitt** (Runde 37 — ändert den Schnitt vom 2026-09-18, „vier Bestellarten" in `docs/konzept/README.md`; ersetzt in ADR 0008 die Nennung von „Hier essen" in „plus Tresen: Abholung, Mitnehmen, Hier essen mit Kassieren im System" und im Satz „Abholung, Mitnehmen und Hier essen bleiben wie entschieden"): Der Pilot hat ein **bestehendes Kassensystem** für den Tischbetrieb; der Gastraum bleibt dort. fluvo kennt im Piloten **drei Bestellarten**: **Lieferung**, **Abholung nach Anruf**, **Mitnehmen ohne Anruf**. Das **Bargeld von Abholung und Mitnehmen wird in fluvo kassiert** (Tresen-Kassieren FA-15, Abschluss FA-16), nicht in der bestehenden Kasse.
- **„Nie abgeholt" auch durch die Annahme** (Runde 36 — ersetzt „nur der Inhaber", Runde 10 vom 2026-09-18, in ADR 0007 als Geldrecht des Inhabers „Ende ohne Bezahlung … bestätigen" geführt): Das **Ende einer Bestellung ohne Bezahlung** darf auch die **Annahme** bestätigen — mit **Pflichtgrund**, protokolliert und **sichtbar im Inhaber-Log**. Gleiches Muster wie Storno vor Zahlung (ADR 0007/0009: Grund Pflicht, Protokoll, Log). Im Piloten betrifft das den Fall „nie abgeholt"; der Liefer-Fall „nicht zustellbar" ist mit dem Fahrer-Teil zurückgestellt (ADR 0008).

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Bon sofort beim Anlegen (FA-06 alt, Runde 7/10) | kein zusätzlicher Handgriff; Bon liegt immer sofort vor | niemand muss die Bestellung wahrgenommen haben, bevor sie in die Küche geht; Sirat: erst quittieren, damit die Annahme jede KI-Bestellung bewusst annimmt |
| Signal ohne Zeitgrenze, bis jemand quittiert | keine unquittiert gedruckten Bons | Bestellung bleibt in der Stoßzeit oder ohne Gerät in Hörweite liegen; Sirat: nach 2 Minuten trotzdem drucken, mit Hinweis |
| Quittierung auch für von Hand angelegte Bestellungen | ein einheitlicher Ablauf | die Annahme gibt sie selbst ein — die Wahrnehmung ist schon erfolgt; Sirat: direkt quittiert, Bon sofort |
| „Hier essen" in fluvo behalten (Schnitt 2026-09-18 / ADR 0008) | eine Plattform für alle Bestellarten | Doppelerfassung neben der bestehenden TSE-Kasse des Piloten; anderes Produkt (Tische, offene Rechnungen); Sirat: Gastraum bleibt in der bestehenden Kasse |
| „Ende ohne Bezahlung" nur durch den Inhaber (ADR 0007, Runde 10) | Vier-Augen-Prinzip beim Geld | Inhaber nicht immer da → Fall bleibt offen liegen; Sirat: wie beim Storno reicht die Annahme mit Pflichtgrund und Log |

## Folgen

- **Neues Merkmal/Zustand „quittiert" (K3):** Eine KI-Bestellung existiert ab dem Anlegen im System und ist bis zur Quittierung „neu/unquittiert". Der **Druck wird durch die Quittierung ausgelöst**, nicht durch das Anlegen. K3 hält fest, ob „quittiert" ein eigener Zustand oder ein Merkmal an der Bestellung ist, und wie der 2-Minuten-Zwangsdruck abgebildet wird. Von Hand angelegte und quittierte Bestellungen überspringen diesen Schritt.
- **Zahl 2 Minuten (K8):** Die Frist bis zum Zwangsdruck gehört als benannte Zahl nach K8 (Anforderungen mit Zahlen), zusammen mit dem wiederholten Signal bis dahin.
- **Anzeige (K10):** FA-06 und K10 beschreiben das Signal (Ton + „Neue Bestellung"), die Quittier-Aktion und den Hinweis „unquittiert gedruckt". FA-01 (Schritt 12/13) verliert den direkten Bon-Druck; an seine Stelle tritt das Signal.
- **Offline (Q8/FA-14):** Ungeklärt bleibt das Verhalten bei Internet-/Geräteausfall — signalisiert und quittiert das lokale Gerät auch offline, und läuft die 2-Minuten-Frist lokal? Gehört zu FA-14 und dem Offline-Verhalten (Regel 7 des Briefings, laufende Bestellungen immer abrufbar).
- **Drei Bestellarten im Piloten (K5, K11):** Das Merkmal „Bestellart" trägt im Piloten nur noch Lieferung, Abholung nach Anruf, Mitnehmen ohne Anruf. FA-05 (Bestellart-Auswahl), FA-15 (Ausnahme „Hier essen" streichen, Storno-nach-Zahlung-Beispiel anpassen), FA-16, FA-11 (B14 „Getränk nach Bezahlung" wird für „Hier essen" gegenstandslos, bleibt für Mitnehmen), FA-06, K3, K5 und K11 (MVP-Schnitt) sowie der Schnitt-Absatz „Vier Bestellarten" in `docs/konzept/README.md` sind nachzuziehen.
- **Fiskalische Frage (Q2):** Der Pilot betreibt fluvo **neben** einer bestehenden TSE-Kasse. Ob fluvo Barzahlungen von Abholung/Mitnehmen am Tresen erfassen darf, während daneben eine TSE-Kasse läuft — oder ob jede Barzahlung in *die* bestehende Kasse muss — klärt **nur die Steuerberaterin, vor Pilotstart** (Q2). Ob dieses Bargeld heute in die bestehende Kasse eingetippt wird, ist für sie relevant und offen.
- **Geldrechte-Liste (K9):** Das Geldrecht „Ende ohne Bezahlung bestätigen" wandert vom Inhaber zur Annahme (mit Pflichtgrund und Log), analog zum Storno vor Zahlung (ADR 0007/0009). Beim Inhaber bleiben die übrigen Geldrechte aus ADR 0007 (Kassen bestätigen, Abschluss mit Abweichung beenden, Storno nach erfasster Zahlung — ADR 0007 Runde 19). FA-15 (2a, „Darf nicht", Regeln) und FA-16 setzen das um; K9 (Rechte-Matrix) und K5 (Pflichtfeld „Grund", ohne Personendaten im Freitext) ziehen nach.
- **Testszenarien:** (1) KI-Bestellung erzeugt bei Eingang genau ein Signal und keinen Druckauftrag; Quittierung löst genau einen Druck aus. (2) Ohne Quittierung druckt der Bon nach 2 Minuten (Uhr wird hereingereicht) mit gesetztem „unquittiert"-Hinweis. (3) Von Hand angelegte Bestellung druckt sofort, ohne Quittier-Schritt. (4) Bestellart kennt nur Lieferung/Abholung/Mitnehmen; „Hier essen" wird nicht angeboten. (5) „Ende ohne Bezahlung" durch die Annahme ohne Grund wird abgelehnt, mit Grund abgeschlossen und im Log sichtbar.

## Wann neu bewerten

Wenn im Piloten Bestellungen wegen fehlender Quittierung liegen bleiben (dann Frist/Signal nachschärfen oder Auslöser überdenken) · wenn die Steuerberaterin die Bargelderfassung neben der bestehenden Kasse untersagt (dann wandert das Tresen-Kassieren von Abholung/Mitnehmen zurück in die bestehende Kasse) · wenn der Pilot den Gastraum doch über fluvo führen will (dann „Hier essen" wieder in den Schnitt, größerer Umbau) · wenn Fehlbeträge mit „Ende ohne Bezahlung"-Bestätigungen der Annahme zusammenfallen (dann Vier-Augen-Prinzip erneut erwägen).
