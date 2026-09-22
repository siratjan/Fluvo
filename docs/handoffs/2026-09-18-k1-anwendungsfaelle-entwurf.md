# Übergabe 2026-09-18 · K1 Fachliche Anwendungsfälle — alle 20 im Entwurf

Sitzung: Jarvis mit Sirat, Konzeptarbeit `/konzept K1` (AP-003). Kein Code, kein Commit.

Hinweis zur Sitzung: Sie wurde in `C:\Users\sirat` gestartet, nicht im fluvo-Ordner — der Sitzungs-Hook und der Schreibschutz-Hook für den Business Brain liefen deshalb nicht. Der Business Brain wurde nur gelesen (eine Seite). Nächste Sitzung bitte direkt in `C:\Users\sirat\Projekte\fluvo` starten.

## Erledigt

**Geprüft**
- Schnitt der Anwendungsfälle von Sirat bestätigt: FA-01 … FA-18, FA-20 … FA-22; FA-07 entfällt im Piloten (ID reserviert). Erstes Abnahmekriterium von AP-003 abgehakt.
- Gespräch mit Sirat in 14 Runden geführt und mitgeschrieben: `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md` — die Quelle für alle Entwürfe.
- Alle 20 Entwurfsdateien existieren; Textsuche über den Ordner: kein Name/Ort des Piloten, keine falsch als [FEST] markierten Gesprächsentscheidungen (eine Stelle in FA-22 von Jarvis korrigiert).
- Rechenfehler im Kassensturz gefunden und behoben (Gutscheine werden NICHT abgezogen): FA-10 Formel und Testszenario, Mitschrift.
- Von Jarvis inhaltlich gelesen: FA-01 (ganz), FA-10 (ganz, nach Überarbeitung), FA-08 (etwa zur Hälfte).
- Landkarte `docs/konzept/README.md`, AP-003, Roadmap, offene Fragen (Q4 ergänzt, Q13–Q18 neu), ADR 0006 nachgezogen.

**Ungeprüft**
- Die übrigen 17 Entwürfe kennt Jarvis nur aus den Rückmeldungen von `requirements-engineer` — nicht Zeile für Zeile gegengelesen.
- Kein Entwurf ist mit Sirat durchgegangen, keiner im Kreuzverhör, keiner abgenommen. AP-003: 1 von 6 Kriterien erfüllt.
- Rückverfolgung in allen Fällen nur mit Platzhaltern (`P?`, `TU-?`), weil K2/K3/K6/K7 noch leer sind.
- Inhalt von ADR 0006 und der neuen Fragen Q13–Q18 von Jarvis nicht gegengelesen (nur Rückmeldung von `doc-updater`).

## Entscheidungen

Alle von Sirat im Gespräch, Stufe `[ENTSCHIEDEN Sirat 2026-09-18]` — gesammelt in **ADR 0006** (`docs/decisions/0006-piloten-schnitt-k1.md`), Einzelheiten mit Runde in der Mitschrift:

- Vier Bestellarten: Lieferung · Abholung nach Anruf · Mitnehmen · Hier essen (nur Tresen mit Sofortzahlung).
- Kein Küchendisplay, keine Küchen-Status im Piloten; ein Bon je Bestellung, ein Exemplar; Fahrer-QR nur bei Lieferung.
- Vorbestellung beliebig weit im Voraus (Bedingung: Betrieb zur Wunschzeit), Bon sofort mit Kennzeichnung.
- KI nennt die Summe immer; Lieferzeit aus der Zone, Abholzeit als eigener Wert.
- Zone trägt drei Werte: Lieferzeit, Liefergebühr, Mindestbestellwert.
- Preise mit „gültig ab" oder sofort; laufendes KI-Gespräch behält den Preisstand vom Beginn.
- Geld-Muster überall gleich: eigene Börse je Person (Fahrer wie Tresen), zurückzugeben = Wechselgeld-Start + bar Kassiertes, Inhaber bestätigt; bei Abweichung bleibt die Schicht offen, nur der Inhaber beendet mit Begründung; unbezahlte/nicht zustellbare/nie abgeholte Bestellung bestätigt der Inhaber.
- Trennung Betriebsrechte (Annahme + Inhaber) / Geldrechte (nur Inhaber); Preise, Allergene, Steuersatz nur Inhaber (mit Warnung und Protokoll).
- Jede Änderung einer Bestellung geht ins System, Preis wird neu gerechnet, neuer Bon. Änderung/Storno entscheidet nie die KI.
- KI jederzeit an/aus; außerhalb der Öffnungszeit klingelt das Telefon durch wie heute.
- Betreiber-Zentrale: Onboarding, Module schalten, Überwachung nur Gesundheitswerte (keine Bestellungen/Kundendaten), aktive Benachrichtigung bei Störung. „Startklar" = erfolgreicher Testanruf.
- Kundengebundener Gutschein im System: später, nicht im Piloten.

**Ausdrücklich NICHT entschieden** (berührt [FEST 2], Q13): Statuskette für Abholung/Tresen, nicht gesetzte Küchen-Zustände, Scan lösen, Ende „nicht zustellbar"/„nie abgeholt", Storno-Pfad, Lebenszyklus des Restaurants.

## Geänderte Dateien (die wichtigsten)

- `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md` (neu) — Mitschrift Runden 1–14
- `docs/konzept/anwendungsfaelle/FA-01 … FA-06, FA-08 … FA-18, FA-20 … FA-22` (neu, 20 Dateien, Status Entwurf)
- `docs/konzept/README.md` — neuer Schnitt, Status je Fall, K1 „Entwurf (20 von 20)"
- `docs/arbeitspakete/AP-003-fachliche-anwendungsfaelle.md` — Kriterium 1 abgehakt, Zwischenstand, Vormerkungen K3/K9
- `docs/decisions/0006-piloten-schnitt-k1.md` (neu) · `docs/open-questions.md` (Q4 ergänzt, Q13–Q18) · `docs/roadmap.md`

## Offen / blockiert

| Was | Wartet auf |
|---|---|
| TSE/Beleg, Storno nach Zahlung, Abschluss je Börse, Gutscheine fiskalisch (Q2, Q3, Q14, Q18) | Steuerberaterin — **vor Pilotstart**; Sirat sollte außerdem mit dem Inhaber offen besprechen, dass fluvo jede Bestellung elektronisch erfasst |
| Anrufernummer bei Rufumleitung; Durchklingeln außerhalb der Öffnungszeit (Q1, Q15) | Risikotest AP-001 (noch `vorgeschlagen`, Freigabe Sirat) |
| Eskalation: Rückruf-Ticket oder Durchstellen (Q4) | Sirat mit dem Piloten; Empfehlung Jarvis: Rückruf-Ticket |
| Bon-Druck ohne Internet (Q8) | Risikotest AP-002 (noch `vorgeschlagen`) |
| Haftung bei selbst gepflegten Allergenen/Steuersatz (Q17) | Anwalt |
| Statuskette, sechs Punkte (Q13) | K3 / AP-005 mit `architect`, Sirat entscheidet |
| Betreiber-Sicht ohne Umgehung der Mandantentrennung (Q16) | K9 / AP-011, `tenant-isolation-guard` |
| Kleine Fragen an Sirat (in den Entwürfen als `> Frage an Sirat`): wer darf eine Bestellung bearbeiten und bis wann (FA-11) · läuft ein KI-Gespräch beim Ausschalten zu Ende (FA-13) · Stammkunde: nur Adresse bestätigen oder auch „das Übliche" (FA-02) · abgebrochene Anrufe sichtbar? (FA-04) · Feiertage/Einzeltage (FA-18) · Mitnehmen: Zahlung beim Bestellen? (FA-15) · Papier-Gutschein mit Nummer? (FA-08/15) · Reihenfolge Onboarding (FA-20) · Benachrichtigungsweg (FA-22) | Sirat, beim Durchgehen |

## Nächster Schritt

1. Sitzung in `C:\Users\sirat\Projekte\fluvo` starten, `/konzept K1`.
2. **Jarvis liest zuerst alle 20 Entwürfe kritisch gegen** (gegen Mitschrift, Briefing §2/§5, Nachbar-Fälle): Widersprüche zwischen Fällen, erfundene Regeln, fehlende Ausnahme-Enden, Reste alter Stände. Befunde an `requirements-engineer` zurück. Ergebnis: eine bereinigte, nach Wirkung sortierte Fragenliste für Sirat.
3. Mit Sirat die Fälle einzeln durchgehen (je ca. 15 Minuten), Beginn mit **FA-10 Kassensturz**, dann FA-08, FA-01, FA-05, FA-15/16; Status je Fall auf `mit Sirat durchgegangen`.
4. Parallel Sirat um Freigabe von **AP-001** und **AP-002** bitten (kein Code) — ihr Ergebnis verändert FA-02/03/04/06/13/14.
5. Danach Kreuzverhör (Skill `grilling`) und Abnahme K1; dann K2/K3 — K3 zuerst mit `architect` die sechs Punkte aus Q13 als Entscheidungsvorlage.
