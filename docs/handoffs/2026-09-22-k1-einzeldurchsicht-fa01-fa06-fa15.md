# Übergabe 2026-09-22 · K1: Fragen B10–B20 beantwortet, Einzeldurchsicht FA-01 / FA-06 / FA-15, ADR 0009 + 0010

Sitzung: Jarvis mit Sirat, gestartet in `C:\Users\sirat\Projekte\fluvo`. Kein Code, kein Commit. Vorab: Erklärung zu einem Bekannten-Setup (Fritzbox + lokale KI-Telefonie) und Antwort-Entwurf für ihn — nichts davon im Repo, nichts Vertrauliches nach außen.

## Erledigt

**Geprüft (von Jarvis gelesen und gegen Mitschrift/ADRs abgeglichen)**
- **Runden 27–31** in `_gespraechsnotizen-K1.md`: B10–B18, B20 und die „kleinen Fragen" (Feiertage, Gutscheine, Trinkgeld, Störungsmeldung, Mitnehmen) beantwortet; Schnitt FA-23 bestätigt; **FA-19 „Schicht beginnen"** aufgenommen; Storno-Bon-Widerspruch (Runde 20 vs. 27) aufgelöst: **Fassung von heute gilt**.
- **Runden 32–37, Einzeldurchsicht:** **FA-01**, **FA-06**, **FA-15** stehen auf `mit Sirat durchgegangen` (Datei + Landkarte). Kernergebnisse: Einstieg „Lieferung, Abholung oder Sonstiges?"; Ausnahmen Liefergebiet/Mindestbestellwert entscheidet die Annahme (Protokoll, kein Grund); Preis vom Bestelltag; **Bon erst nach Quittierung am Annahme-Gerät, nach 2 Minuten Notdruck, von Hand = sofort**; Rufnummer auf jedem Bon; Kennzeichnung „Station"/„Fahrer/Kunde"/„GEÄNDERT"; **„Hier essen" raus** (Pilot hat bestehende Kasse für den Gastraum → drei Bestellarten); nur bar; „nie abgeholt" darf auch die Annahme mit Grund beenden.
- **ADR 0009** und **ADR 0010** gelesen — Format, ersetzte Sätze und Rückwege stimmen.
- Stichproben nach jeder Einarbeitung: FA-23, FA-19, FA-18/FA-20 (Bestellschluss), FA-06 (Quittierung), README-Tabelle, Grep auf „Hier essen"/„Bestellschluss"/„heute aus"/„Nachtrag-ADR folgt".
- `docs/open-questions.md` Q2: **Frage an die Steuerberaterin** (fluvo neben bestehender TSE-Kasse) fertig formuliert zum Weiterleiten.
- AP-003 „Ergebnis" mit zwei Nachträgen von heute.

**Ungeprüft**
- Die Einarbeitung durch `requirements-engineer` in **17 Fällen** (Runden 27–31) und die „Hier essen"-Bereinigung in FA-05/FA-11/FA-16/FA-08/FA-10/FA-20 nur per Grep und Bericht kontrolliert, nicht Zeile für Zeile.
- Lesarten von Jarvis, in den Dateien als solche markiert, noch nicht von Sirat bestätigt: Warnhinweis beim 2-Minuten-Notdruck (FA-06 2a); Gutschein-Einlösung als Zahlungsanteil (FA-15 4a); „Annahme = jede angemeldete Person" beim Beenden fremder Schichten (FA-19/FA-16); „Manavelli" = „manuell" (Runde 37).
- Testszenario-Zähllabels (`FA-xx-Tn`) sind seit dem 21.09. nicht deckungsgleich mit den Zeilen (Sammelbefund A3 in `_gegenlesen-K1.md`), heute nicht bereinigt.

## Entscheidungen

| Entscheidung | Quelle | ADR |
|---|---|---|
| Kein Storno-Bon (Anzeige an der Annahme, Küche per Zuruf); Storno-Grund bei jedem Storno Pflicht; kein eigenes Bestellschluss-Feld (früher Schluss = Annahmestopp); geänderter Bon bei Lieferung in zwei Exemplaren | Runden 27–31 | **0009** |
| Bon erst nach Quittierung, 2-Minuten-Notdruck, von Hand = direkt quittiert; „Hier essen" aus dem Piloten-Schnitt (drei Bestellarten, Gastraum über bestehende Kasse); „nie abgeholt" auch durch Annahme mit Pflichtgrund | Runden 34–37 | **0010** |
| Annahme darf Artikel/Optionen anlegen/entfernen (ohne Preis), für den Inhaber dokumentiert; „momentan aus" statt „heute aus", kein automatisches Zurücksetzen | Runde 27 | — (FA-12) |
| Zonen als Ortsteile beschrieben, Geocoder ordnet zu, KI rät nie; Mindestbestellwert auf Warenwert ohne Liefergebühr | Runden 27/28 | — (FA-17, Q6) |
| Mehrere Zeitfenster je Tag, Feiertage/Einzeltage nötig | Runden 28/29 | — (FA-18) |
| Testbestellung beim Onboarding als Test markiert und ausgeblendet | Runde 28 | — (FA-20/22) |
| Papier-Gutscheine nicht im System (nur Einlösung bestätigen); Trinkgeld nirgends; Störungen als Push, Anzeige Pflicht | Runden 29/31 | — (FA-15/16, FA-06/13/14/22) |
| Schicht bleibt ohne Abschluss aktiv, keine Auto-Abmeldung; Inhaber und Annahme dürfen beenden | Runde 31 | — (FA-19, FA-16) |
| Annahmestopp: zwei Stufen, setzen/aufheben Annahme und Inhaber; wirkt nur auf neue Bestellungen | Runden 29/30 | — (FA-23) |
| FA-19 „Schicht beginnen" im Schnitt | Runde 30 | — |

## Geänderte Dateien (die wichtigsten)

- `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md` — Runden 27–38
- `docs/konzept/anwendungsfaelle/FA-01`, `FA-06`, `FA-15` — Status `mit Sirat durchgegangen`
- `docs/konzept/anwendungsfaelle/FA-19-schicht-beginnen.md` — **neu**
- `docs/konzept/anwendungsfaelle/FA-03, 04, 05, 08, 10, 11, 12, 13, 14, 16, 17, 18, 20, 22, 23` — Runden 27–37 eingearbeitet
- `docs/konzept/README.md` — K1 „22 von 22", drei Bestellarten, Zeilen FA-01/05/06/12/15/19/23
- `docs/decisions/0009-storno-ohne-bon-annahmestopp-statt-bestellschluss.md` — **neu**
- `docs/decisions/0010-bon-nach-quittierung-hier-essen-raus-nie-abgeholt.md` — **neu**
- `docs/open-questions.md` — Q2 Frage an die Steuerberaterin; weitere Nachträge durch `doc-updater` (Q3, Q6, Q8, Q10/Q20, Q15, neue Q22–Q24)
- `docs/roadmap.md` — K1-Zeile durch `doc-updater`
- `docs/arbeitspakete/AP-003-fachliche-anwendungsfaelle.md` — Nachträge 2026-09-22

## Offen / blockiert

| Was | Wartet auf |
|---|---|
| **Frage an die Steuerberaterin** (Q2): Darf fluvo Barzahlungen am Tresen erfassen, wenn daneben eine TSE-Kasse läuft? Kann das Konzept kippen (Rückweg in ADR 0010) | Sirat leitet weiter, **vor Pilotstart** |
| FA-05, drei Fragen (Runde 38 / Q22–Q24): Pflichtangabe „Adresse merken?" streng oder Standard „Nein"; Liefergebühr/-zeit außerhalb aller Zonen; manuelle Annahme bei Annahmestopp „gar nichts mehr" | Sirat, nächste Sitzung |
| Lesarten Jarvis bestätigen (siehe „Ungeprüft") | Sirat, bei Durchsicht der jeweiligen Fälle |
| Quittierung bei Internetausfall (FA-14), lokaler Druck (Q8) | AP-002 Druckertest |
| FA-02/03/04 nachziehen, KI außerhalb der Öffnungszeit (Q15) | AP-001 Rufumleitungstest, **Freitag 2026-09-25** beim Piloten |
| Aufbewahrung/Vernichtung der gesammelten Stations-Zettel (Q10/Q20), telefonische Einwilligung (Q10) | Anwalt |
| Einzeldurchsicht der übrigen 18 Fälle, danach Kreuzverhör (`grilling`) und Abnahme | Sirat |
| Antwort an den Bekannten (lokale KI-Telefonie) — Entwurf im Chat, nicht im Repo | Sirat schickt selbst |

## Nächster Schritt

1. Sitzung in `C:\Users\sirat\Projekte\fluvo` starten, `/konzept` → K1.
2. **FA-05 zu Ende**: die drei Fragen aus Runde 38 (ganz unten in `_gespraechsnotizen-K1.md`) stellen, Antworten als Runde 39 notieren, `requirements-engineer` arbeitet sie in FA-05 (und FA-23, FA-17) ein, Status `mit Sirat durchgegangen`, README-Zeile nachziehen.
3. Dann in dieser Reihenfolge: **FA-11** (Ändern/Stornieren — viele Regeln aus 0007/0009), **FA-16** (Tresen-Abschluss, nach „Hier essen"-Bereinigung Zeile für Zeile prüfen), **FA-19**, **FA-23**, **FA-12/17/18** (Stammdaten). FA-02/03/04 erst nach dem Freitag-Test.
4. Sirat erinnern: Steuerberaterin-Frage (Q2) abschicken; Freitag Stufe 0 des Testprotokolls AP-001 mitnehmen.
