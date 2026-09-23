# 0016 · Drei Datenklassen (a/b/c) — DSGVO-löschbar, GoBD-pflichtig, betriebliche Stammdaten

- **Status:** entschieden (Sirat, im Gespräch) — dokumentierte Abweichung/Ergänzung zu Briefing §5.2 (bisher zwei Klassen); **keine** Änderung des Briefings selbst. Löst den in `open-questions.md` Q10 als „nicht entschieden" geführten Hinweis „drei Datenklassen" auf und schließt Compliance-Befund **B1** (`_gegenlesen-K5-compliance.md`).
- **Datum:** 2026-09-23
- **Stufe:** [ENTSCHIEDEN Sirat 2026-09-23] (fachlich/rechtlich-organisatorisch, K5 / Durchstich-Spur) — nicht [FEST], das bleibt dem Briefing vorbehalten. Berührt Briefing §5.2 (zwei Datenklassen).
- **Entschieden von:** Sirat

## Anlass

Briefing §5.2 kennt **zwei** Datenklassen: (a) DSGVO-löschbar (Kundenstamm, Rufnummer, Adresse) und (b) GoBD-pflichtig, 10 Jahre (Buchungs-/Kassendaten). Der K5-Durchstich (`docs/konzept/modelle/er-durchstich.md`, `docs/konzept/vertraege/datenwoerterbuch.md`) braucht aber eine Heimat für **betriebliche Stammdaten ohne Personenbezug und ohne Buchungscharakter** (Speisekarte, Zonen, Öffnungszeiten, Geräte, Tenant-Einstellungen): als (a) wären sie fälschlich der Kundenlöschung unterworfen, als (b) trügen sie eine 10-Jahres-Buchungsfrist, die sie nicht haben. Das Gegenlesen aus Compliance-Sicht hat das als **Befund B1** markiert und die Freigabe durch `architect` + Sirat verlangt, weil `open-questions.md` Q10 „drei Datenklassen … berührt Briefing §5.2 → architect + Steuerberaterin, **nicht entschieden**" festhielt.

**Abgrenzung zum früheren Vorschlag.** Der Hausjuristen-Vorschlag aus ADR 0007 („drei Datenklassen: Kundenstamm · Lieferdaten · Fiskaldaten ohne Klarnamen") meinte eine **andere** Dreiteilung — eine Aufspaltung entlang der *Personendaten*. Diese Entscheidung ist **nicht** jener Vorschlag: sie ergänzt die zwei Briefing-Klassen um eine dritte für **personen- und buchungsfreie Betriebsdaten**. Die beiden Dreiteilungen dürfen nicht vermischt werden. Sirat hat die drei Klassen im Gespräch entschieden (Mitschrift Runde 52).

## Entscheidung

Drei Datenklassen bestimmen Aufbewahrung und Löschung:

- **(a) DSGVO-löschbar:** Kundenstamm, personenbezogene Bestelldaten, freie Notiz, bekannte Lieferorte (vorläufig). Werden auf Löschverlangen bzw. nach Frist entfernt.
- **(b) GoBD-pflichtig, 10 Jahre:** Belegdaten **ohne Personenbezug** (Buchungs-/Kassendaten). Bleiben als Beleg erhalten.
- **(c) betriebliche Stammdaten ohne Personenbezug und ohne Buchungscharakter:** Speisekarte, Zonen, Öffnungszeiten, Geräte, Tenant-Einstellungen. Weder der Kundenlöschung unterworfen noch mit fester GoBD-Buchungsfrist belegt.

Weitere Festlegungen:

1. **Beschäftigtendaten sind keine (c)** und **nicht** der Kundenlöschung unterworfen. `users`, `staff_shifts` und `cash_settlements` (letztere über `user_id`) tragen Arbeitszeit-/Abschlussdaten benannter Beschäftigter und haben eine **eigene** Aufbewahrungsfrist (arbeitsrechtlich; § 26 BDSG) → Anwalt-Frage **A5**. `users` wird deaktiviert (`active=false`), nicht kundengelöscht.
2. **Löschjobs sind tabellen-scharf, nie „alle (a)".** Jeder Löschlauf zielt auf eine konkrete Tabelle mit konkreter Regel/Frist — ein pauschaler „Klasse-(a)-Job" würde sonst z. B. Beschäftigtendaten fälschlich löschen.
3. **Trennung `orders` (b) / `order_customer_details` (a).** Personenbezogene Bestelldaten liegen in einer eigenen a-Tabelle; die Löschung entfernt die **ganze a-Zeile hart** (nicht pseudonymisieren), der Beleg (`orders`, `order_items` mit eingefrorenem Text/Preis/Steuersatz, Zeit, Summen, Zahlart, Bestellnummer) bleibt als (b) erhalten.
4. **Maßgeblich für die Zuordnung je Feld ist das K5-Datenwörterbuch** (`docs/konzept/vertraege/datenwoerterbuch.md`) — dort trägt jedes Feld seine Klasse.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| **Bei zwei Klassen bleiben, Stammdaten als (b)** | keine Abweichung vom Briefing | Speisekarte/Zonen/Geräte sind **keine** Buchungsdaten — eine 10-Jahres-GoBD-Frist ist sachfremd und blockiert normale Pflege/Löschung |
| **Bei zwei Klassen bleiben, Stammdaten als (a)** | keine Abweichung vom Briefing | (a) ist DSGVO-löschbar — ein Kundenlöschlauf würde Speisekarte, Zonen und Geräte mitreißen; falsch, weil kein Personenbezug |
| **Hausjuristen-Dreiteilung** (Kundenstamm · Lieferdaten · Fiskaldaten ohne Klarnamen, ADR 0007) | trennt Personendaten feiner | andere Zielsetzung (Aufspaltung der Personendaten), löst das Stammdaten-Problem nicht; das Compliance-Gegenlesen (B1) hält die hier gewählte (c) für sauberer |
| **Drei Klassen a/b/c (gewählt)** | jede Datenart hat die richtige Aufbewahrung; Stammdaten weder löschbar-erzwungen noch buchungsfristbelegt; Löschjobs sauber trennbar | weicht von Briefing §5.2 ab (dokumentiert, nur auf Ansage ins Briefing) |

## Folgen

- **Skill `fluvo-compliance` nachziehen** (`doc-updater`): Zwei-Klassen-Tabelle um die K5-(c)-Klasse ergänzen; Beschäftigtendaten als eigene Kategorie mit eigener Frist ausweisen; Betroffenenrechte-Liste an die a-Tabellen anpassen.
- **Briefing §5.2 weicht ab** — Änderung nur auf Sirats Ansage; bleibt als offener Punkt geführt (nicht in dieser Spur ins Briefing geschrieben).
- **K5-Datenwörterbuch ist maßgeblich** für die Klassen-Zuordnung je Feld; das ER-Diagramm und spätere Migrationen folgen ihm. Trennung `orders`/`order_customer_details` und harte a-Zeilen-Löschung sind damit Bauvorgabe.
- **Anwalt-Fragen A1–A6 bleiben offen** (Q10): Rechtsgrundlage der Einwilligung (A1), 12-Monats-Frist Kundenstamm (A2), Klasse/Frist bekannte Lieferorte (A3), Notizfeld/Art.-9-Daten (A4), Frist Beschäftigtendaten (A5), Frist Anruf-Metadaten (A6). Diese Entscheidung legt die **Klassen-Struktur** fest, **nicht** die konkreten Fristen.
- Diese Entscheidung schließt **B1**; die übrigen Compliance-Befunde (B2–B13, insbesondere Blocker B5/B6 Einwilligungs-Nachweis und B7 Rufnummern-Normalisierung) bleiben vor dem ersten Migrationsskript zu schließen.

## Wann neu bewerten

Wenn der Anwalt (Q10, A1–A6) oder die Steuerberaterin (Q2) zu Fristen oder Klassenzuordnung etwas anderes vorgibt · wenn eine neue Datenart entsteht, die in keine der drei Klassen sauber passt · wenn bekannte Lieferorte (vorläufig (a)) rechtlich anders einzuordnen sind (A3).
