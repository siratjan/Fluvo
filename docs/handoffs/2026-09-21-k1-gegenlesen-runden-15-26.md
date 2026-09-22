# Übergabe 2026-09-21 (abends) · K1 gegengelesen, Runden 15–26, ADR 0007 und 0008

Sitzung: Jarvis mit Sirat, `/konzept` (AP-003). Kein Code, kein Commit. Die Sitzung wurde in `C:\Users\sirat` gestartet und nach der ersten Antwort nach `C:\Users\sirat\Projekte\fluvo` umgezogen — ab da galten die Projekt-Einstellungen. Zweite Übergabe dieses Tages (die erste: `2026-09-21-rufumleitung-recherche-testprotokolle.md`).

## Erledigt

**Geprüft (von Jarvis selbst gemacht oder kontrolliert)**
- Alle 20 FA-Entwürfe Zeile für Zeile gegen Mitschrift, ADR 0006 und Briefing §2 gelesen. Befunde und Fragenliste: `docs/konzept/anwendungsfaelle/_gegenlesen-K1.md` (Teil A Korrekturen, Teil B 20 Fragen, Teil C Vormerkungen).
- Gespräch mit Sirat, Runden 15–26, mitgeschrieben in `_gespraechsnotizen-K1.md` — einschließlich der Stellen, an denen das Diktat unklar war (als Lesart gekennzeichnet).
- ADR 0007 und ADR 0008 geschrieben; ADR 0006 verweist auf beide. Q2 und Q10 in `open-questions.md` ergänzt. Landkarte und AP-003 nachgezogen.
- Rat (`/council`) zur Auslieferung im ersten Piloten: vier Stimmen eingeholt, Ergebnis in der Mitschrift.
- Stichproben nach den Einarbeitungen: keine alten [FEST]-Nummern, kein „Q5/Q11", kein „Storno nur Inhaber" mehr in den FA; ein Rest in FA-08 selbst korrigiert; Antwort aus Runde 26 selbst in FA-06 nachgetragen.
- Öffentliche Web-Angaben zum Piloten (Öffnungszeiten mit Mittagspause) abgerufen — nur im Business Brain abgelegt, nicht im Repo.

**Ungeprüft**
- Die fünf Einarbeitungs-Durchgänge von `requirements-engineer` (Teil A · Runden 15/16 · 17/18 · 19/20 · 21–23 · ADR 0008) kennt Jarvis **nur aus dessen Berichten plus Stichproben** — nicht Zeile für Zeile gegengelesen. Betroffen sind praktisch alle FA-Dateien und der neue FA-23.
- Business Brain: Ingest der Hausjuristen-Antwort (Quelle S0017, neue Seiten Stammkunden-Erkennung und Löschkonzept, fünf Widersprüche markiert, offene Fragen dort erweitert) und der Nachtrag zur vollen Adresse liefen per Agent; Jarvis hat die Seiten nicht nachgelesen. Der mechanische Lint dort ist sauber; der Ingest lief ohne den im Vault vorgesehenen Rücksprache-Schritt. Dort nichts committet.
- Die Einschätzung des Hausjuristen ist Recherche, keine Rechtsberatung; mehrere Punkte sind ausdrücklich unbelegt (Endfassung EDSA 2/2025, Stand § 38 BDSG, § 33 UStDV aus dem Gedächtnis, keine Rechtsprechung zu Telefonbestellungen).
- `docs/roadmap.md` und der Rest von `docs/open-questions.md` (Q3, Q4, Q13–Q15, Q18, neu Q19–Q21): `doc-updater` lief beim Schreiben dieser Notiz noch — Ergebnis in der nächsten Sitzung prüfen.
- Kein Entwurf ist mit Sirat einzeln durchgegangen, im Kreuzverhör gewesen oder abgenommen. AP-003 weiter 1 von 6 Kriterien.

## Entscheidungen

Alle von Sirat, Stufe `[ENTSCHIEDEN Sirat 2026-09-21]`, Einzelheiten mit Runde in der Mitschrift.

**ADR 0007** (`docs/decisions/0007-storno-annahme-und-kundenstamm.md`) — ersetzt in 0006 „Storno nur Inhaber":
- Annahme ändert und storniert; **nach erfasster Zahlung storniert nur der Inhaber**; Storno braucht einen Grund, Küche bekommt einen Storno-Bon; alles im Log/der Tagesübersicht des Inhabers. Fahrer ändern nichts.
- Inhaber-Bereich mit Code am Hauptgerät, keine Vertretung; kassiert der Inhaber selbst, bestätigt er sich selbst (protokolliert). Wechselgeld-Ausgabe bestätigt der Inhaber.
- Abschluss in zwei Schritten: Mitarbeiter bestätigt den angezeigten Betrag oder meldet einen abweichenden **mit Pflicht-Kommentar**, dann bestätigt der Inhaber.
- Kundenstamm (vorbehaltlich Anwalt): Kundeneintrag je Restaurant; KI **fragt** bei der Erstbestellung „Adresse merken?" (auch Handannahme); Löschfrist vorerst 12 Monate; Wiedererkennung mit **voller Adresse** (gegen die Empfehlung des Hausjuristen — so bauen, dass der Umfang eine Einstellung ist).
- KI fragt immer nach dem Namen, ohne Rufnummer nach der Nummer; „Wo bleibt mein Essen?" geht an einen Mitarbeiter.
- Annahme an der Karte nur „heute aus" (springt am nächsten Geschäftstag zurück), an den Zonen nur Lieferzeit/Abholzeit; Rest Inhaber. Mindestbestellwert = Warenwert ohne Liefergebühr.
- Änderungen: Adresse und Lieferung↔Abholung erlaubt; unter Mindestbestellwert nur Warnung; Nachbestellung nach bezahltem „Hier essen" = neue Bestellung. Bezahlte Bestellungen bleiben sichtbar, bis als übergeben markiert. Bestellschluss = Ladenschluss. Vorbestellungen in Listen markiert.
- Annahmestopp: zwei Schalter, KI geht ran und sagt ab/bietet Vorbestellung, Annahme + Inhaber schalten, Ende von Hand oder am Tagesende → neuer Entwurf **FA-23** (Schnitt von Sirat noch zu bestätigen).

**ADR 0008** (`docs/decisions/0008-fahrer-teil-spaeter-zwei-bons.md`) — nach dem Rat (3 Stimmen für den Mittelweg, 1 für Staffelung; Sirat blieb bei seiner Variante):
- Fahrer-Teil kommt **nach dem ersten Piloten** als eigene App; FA-08/09/10 zurückgestellt. Pilot = Anruf → Bestellung → Bon (+ Tresen).
- Bei Lieferung **zwei Bon-Exemplare** (Station · Fahrer/Kunde), kein Fahrer-QR. **Kein Bar-Eingang im System** für Lieferungen. Die Annahme drückt „geliefert".

**Ausdrücklich NICHT entschieden**
- [FEST 17]: Sirat will die Fahrer-App im App-Store — als Absicht notiert, [FEST] nicht geändert (erst `architect`, dann Sirat, dann Briefing).
- Kassenrecht: Bestellung erfasst, Barzahlung nicht — nur die Steuerberaterin (Q2), **vor Pilotstart**. Rückfall ist der Mittelweg des Rats; Felder für Fahrer und Zahlart bleiben im Datenmodell.
- Statuskette (Q13) samt Lieferung ohne „Unterwegs"; drei Datenklassen statt zwei (Briefing §5.2).
- Briefing §7 und Roadmap-Reihenfolge: ADR 0008 ist eine dokumentierte Abweichung; das Briefing ändert nur Sirat.

## Geänderte Dateien (die wichtigsten)

- `docs/konzept/anwendungsfaelle/_gegenlesen-K1.md` (neu) · `_gespraechsnotizen-K1.md` (Runden 15–26, Rat)
- `docs/konzept/anwendungsfaelle/FA-01 … FA-20` (fast alle geändert) · `FA-23-annahmestopp.md` (neu)
- `docs/decisions/0007-…md`, `0008-…md` (neu) · `0006-…md` (Verweise)
- `docs/konzept/README.md` · `docs/arbeitspakete/AP-003-…md`, `README.md` · `docs/open-questions.md` (Q2, Q10; Rest per `doc-updater`) · `docs/roadmap.md` (per `doc-updater`)
- Außerhalb des Repos: Business Brain (Quelle S0017, zwei neue Konzeptseiten, Pilot-Seite, Log) — und zwei Einträge in Jarvis' Gedächtnis (Pilot-Zuordnung; Business-Brain-Updates direkt erledigen).

## Offen / blockiert

| Was | Wartet auf |
|---|---|
| Darf die Barzahlung der Lieferungen außerhalb des Systems bleiben? Reicht sonst ein Nachtrag bei Rückkehr/Schichtende? (Q2) · Storno nach Zahlung fiskalisch (Q3) · 8 oder 10 Jahre je Unterlage, Name/Adresse außerhalb des Kassen-Datensatzes | Steuerberaterin — **vor Pilotstart** |
| Einwilligungsfrage und Wortlaut, 12 Monate, volle Adresse vorlesen, AVV-Formulierung, DSFA/Datenschutzbeauftragter beim Restaurant, Auskunft/Löschung per Rufnummer, Stations-Exemplar des Bons (Q10; Fragenkatalog im Business Brain) | Anwalt |
| Liefergebiet/Zonen, Mindestbestellwert, Liefergebühr, Öffnungszeiten bestätigen (Web-Quellen weichen ab), Telefonanbieter/Tarif/Router (Stufe 0 AP-001), Einverständnis + Gewerbeanmeldung für die Rufnummer, wer das Stations-Exemplar aufbewahrt | Sirat beim Piloten, **Freitag 2026-09-25** |
| FA-13 neu fassen (Variante X: Umleitung steuert der Netzbetreiber), „außerhalb der Öffnungszeit klingelt es durch" inkl. Mittagspause technisch möglich? (Q15) | Risikotest AP-001 |
| Bon-Druck ohne Internet; zwei Exemplare je Lieferung im Test berücksichtigen (Q8) | AP-002 — Freigabe und Druckermodell von Sirat |
| Statuskette für den ersten Piloten (Q13) | K3 / AP-005 mit `architect`, Sirat entscheidet |
| Fahrer-App im App-Store vs. [FEST 17] | `architect` + Sirat, wenn die Fahrer-App beginnt |
| Restfragen aus dem Gegenlesen: B18 Zonen beschreiben · B20 Testbestellung · eigener früherer Bestellschluss · geänderter/Storno-Bon zweifach · Handannahme bei „gar nichts mehr" · Fall „Schicht beginnen" (nur Tresen) · Tagesübersicht als eigener Fall · „das Übliche" · FA-23 in den Schnitt · die kleinen Fragen in den Entwürfen | Sirat, beim Durchgehen |
| Veraltete Deliverables im Business Brain (Compliance-Report, Fragenkatalog Steuerberaterin, Umsetzungs-Briefing: „10 Jahre", DSFA bei fluvo, zwei Datenklassen) | Sirats Ansage zum Neu-Erzeugen |

## Nächster Schritt

1. Sitzung direkt in `C:\Users\sirat\Projekte\fluvo` starten (Ordner beim Anlegen der Sitzung wählen), `/konzept K1`.
2. **Zuerst prüfen:** Bericht von `doc-updater` lesen bzw. `docs/roadmap.md` und `docs/open-questions.md` (Q3, Q4, Q13–Q15, Q18–Q21) gegen ADR 0007/0008 kontrollieren.
3. **Dann gegenlesen:** Jarvis liest die heute geänderten FA-Dateien selbst — Reihenfolge FA-06, FA-11, FA-01, FA-02, FA-05, FA-15, FA-16, FA-18, FA-23, dann der Rest — gegen Mitschrift Runden 15–26 und ADR 0007/0008. Achten auf: Reste des Fahrer-Ablaufs außerhalb von FA-08/09/10, doppelte oder widersprüchliche Regelzeilen nach fünf Einarbeitungen, Testzählung, Stufen.
4. Mit Sirat die Restfragen (Tabelle oben) klären, dann die Fälle einzeln durchgehen — Beginn mit FA-16, FA-15, FA-01, FA-05, FA-11, FA-06; Status je Fall auf `mit Sirat durchgegangen`.
5. Nach Freitag: Ergebnisse vom Piloten ins Testprotokoll AP-001 und in FA-17/FA-18; Business-Brain-Seite des Piloten aktualisieren.
6. Danach Kreuzverhör (`grilling`) und Abnahme K1; dann K3 mit `architect` (Q13 inkl. Lieferung ohne „Unterwegs").
