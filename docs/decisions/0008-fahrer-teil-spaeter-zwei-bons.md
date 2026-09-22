# 0008 · Fahrer-Teil kommt nach dem ersten Piloten — im Piloten zwei Bons, Liefer-Bargeld auf Papier

- **Status:** entschieden (Sirat, im Gespräch, nach Rat) — ändert den Piloten-Schnitt aus ADR 0006 (Durchstich ohne Fahrer; bei Lieferung zwei Bon-Exemplare statt einem)
- **Datum:** 2026-09-21
- **Stufe:** [ENTSCHIEDEN Sirat] (fachlich, K1 / AP-003) — nicht [FEST]. Berührt die Baureihenfolge aus Briefing §7 (Bauschritt 4 „Fahrer-PWA") und den Durchstich der Konzept-Landkarte; [FEST 17] ist berührt, aber **nicht** geändert, siehe unten.
- **Entschieden von:** Sirat

## Anlass

Beim Durchgehen von FA-08 (Fahrer liefert und kassiert) hat Sirat erklärt, dass er für die Fahrer eine eigene App entwickeln will und der Fahrer-Teil „zunächst irrelevant" ist (Mitschrift Runden 19, 23, 24). Jarvis hat dazu den Rat einberufen (`/council`, Ergebnis in der Mitschrift): drei Stimmen für den Mittelweg (C) „Annahme erfasst Fahrer und Zahlart im System", eine für (A) mit späterem (C). Sirat hat danach (A) bestätigt.

## Entscheidung

- Der **Fahrer-Teil kommt nach dem ersten Piloten** und wird eine **eigene App**. Der erste Pilot läuft **Anruf → Bestellung → Bon** (plus Tresen: Abholung, Mitnehmen, Hier essen mit Kassieren im System).
- **FA-08, FA-09 und FA-10 sind für den ersten Piloten zurückgestellt.** Die Entwürfe bleiben als Grundlage für die Fahrer-App erhalten; sie werden nicht abgenommen und nicht gebaut.
- **Bei Lieferung druckt fluvo zwei Bons.** Ein Exemplar bleibt an der Annahmestation, eines geht mit dem Fahrer und danach an den Kunden. Der Fahrer nimmt sich seinen Bon an der Station — so weiß die Annahme, wer was gefahren hat (wie heute mit dem Durchschlag).
- **Kein Bar-Eingang im System für Lieferungen.** Das an der Tür kassierte Bargeld wird im ersten Piloten **nicht** in fluvo erfasst und nicht von fluvo abgerechnet; es läuft wie heute auf Papier. Den Mittelweg (C) des Rats hat Sirat nicht gewählt.
- Abholung, Mitnehmen und Hier essen bleiben wie entschieden: Kassieren im System, Abschluss je Mitarbeiter (FA-15, FA-16).

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| (B) Fahrer-PWA schon im Piloten (bisheriger Schnitt) | löst Fehlbeträge und „wer hat was gefahren" | zu viele neue Teile auf einmal; keine Stimme im Rat dafür; Sirat baut die Fahrer-App später eigenständig |
| (C) Annahme tippt Fahrer an und trägt bei Rückkehr „geliefert + Zahlart" ein, System rechnet den Kassensturz (architect, compliance-guard, security-reviewer) | Bargeld der Lieferungen in der Kasse; Kern-Befehle werden erprobt; keine neue Anmelde-Angriffsfläche | Mehrarbeit der Annahme im Stoßbetrieb, falsche Zuordnungen schlimmer als keine (Pragmatiker); von Sirat nicht gewählt |
| (A) mit fest terminiertem (C) in Woche 3–4 (Pragmatiker, Empfehlung Jarvis) | Staffelung, KI am Telefon zuerst | von Sirat nicht gewählt — bleibt als Rückfall, falls die Steuerberaterin die Erfassung verlangt |

## Folgen

- **Offenes kassenrechtliches Risiko (nicht entschieden, Q2):** Mit fluvo ist jede Liefer-Bestellung samt Summe elektronisch erfasst, die zugehörige Barzahlung aber nicht. Ob das zulässig ist, klärt **nur die Steuerberaterin — vor Pilotstart**. Verlangt sie die Erfassung, greift Variante (C) als vorbereiteter Rückfall. **Deshalb so bauen, dass beide Wege möglich bleiben:** Felder für Fahrer-Zuordnung und Teilzahlungen je Zahlart gehören von Anfang an ins Datenmodell (K5), auch wenn sie im ersten Piloten für Lieferungen leer bleiben.
- **Ende einer Liefer-Bestellung im System (Runde 26, entschieden):** Die **Annahme drückt „geliefert“**, sobald sie weiß, dass geliefert wurde — nicht automatisch beim Bon-Druck. Zahlart und Bar-Eingang werden dabei nicht erfasst. Wie der Übergang in der Statuskette heißt (ohne „Unterwegs“, Verhältnis zu „Abgerechnet“), klärt K3 / Q13 mit `architect`.
- **[FEST 17] berührt (Runde 26, Absicht Sirat — noch keine Entscheidung im Sinne des Briefings):** Sirat will die Fahrer-App **im App-Store** anbieten. [FEST 17] sagt „PWA auf dem Privathandy, kein App-Store“. Bevor das gilt: `architect` bereitet die Folgen vor (eine Codebasis mit Store-Hülle oder native App; Entwicklerkonten, Freigabeprozess, Update-Wege, Offline-Verhalten), Sirat entscheidet ausdrücklich, das Briefing wird angepasst, eigener ADR. Fällig, wenn die Arbeit an der Fahrer-App beginnt — nicht vor dem ersten Piloten.
- **Nicht gelöst im ersten Piloten:** die von Sirat genannten Schmerzen „Fehlbeträge", „verlorenes Geld" und — über das Stations-Exemplar hinaus — „keiner weiß, wer was gefahren hat" (Mitschrift Runde 5). Die Annahme des Business Brain zur Fahrer-Bargeldabrechnung als Unterscheidungsmerkmal wird im ersten Piloten **nicht** geprüft.
- **K1:** FA-06 — bei Lieferung zwei Exemplare, Fahrer-QR entfällt vorerst (ersetzt für Lieferungen „ein Exemplar", Runde 10); Nachdruck- und Doppeldruck-Regeln gelten je Exemplar. FA-08/09/10 → „zurückgestellt". FA-11 (Betrag nach Änderung: neuer Bon in zwei Exemplaren; Verweis auf die Fahrer-App entfällt vorerst), FA-14, FA-16, FA-20 (Wechselgeld Fahrer, Fahrer mit PIN entfallen vorerst) nachziehen.
- **Datenschutz:** Das Stations-Exemplar trägt Name, Adresse und Rufnummer und liegt außerhalb der Löschfunktion → Aufbewahrung und Vernichtung gehören ins Löschkonzept und in die Einweisung des Restaurants (Q10, FA-20).
- **K10/K11:** Wireframes Fahrer entfallen für den ersten Piloten; Pilot-Erfolgskriterien ohne Fahrer-Kennzahlen.
- **Briefing §7 / Roadmap:** Reihenfolge der Bauschritte weicht ab (Fahrer-PWA nicht mehr Schritt 4 vor dem Piloten). Das Briefing ändert nur Sirat; bis dahin gilt dieser ADR als dokumentierte Abweichung.

## Wann neu bewerten

Wenn die Steuerberaterin die Erfassung der Barzahlung verlangt (dann Variante C) · wenn im Piloten Fehlbeträge bei Lieferungen weiter auftreten · sobald die Arbeit an der Fahrer-App beginnt (dann FA-08/09/10 wieder aufnehmen und [FEST 17] klären).

**Nachtrag 2026-09-22:** siehe ADR 0009 (ändert sich eine Liefer-Bestellung, wird auch der neu berechnete Bon in zwei Exemplaren gedruckt).

**Nachtrag 2026-09-22:** siehe ADR 0010 („Hier essen" fällt aus dem Piloten-Schnitt — Tresen-Kassieren gilt nur noch für Abholung und Mitnehmen).

**Nachtrag 2026-09-22:** siehe ADR 0012 (Fahrer-Wechselgeld beim Wiederaufnehmen des Fahrer-Teils nachziehen — nur kassierte Beträge, kein Startbetrag).

**Nachtrag 2026-09-22:** siehe ADR 0013 (verwandte Abweichung für den Piloten — beim Internetausfall arbeitet der Pilot auf Papier statt in der Offline-Warteschlange; [FEST 18] bleibt gebaut, der Pilot nutzt eine Teilmenge).
