# Übergabe 2026-09-22 (2. Sitzung) · K1: Einzeldurchsicht FA-05 … FA-23, ADR 0011 + 0012

Sitzung: Jarvis mit Sirat, gestartet in `C:\Users\sirat\Projekte\fluvo`. Kein Code, kein Commit. Nebenbei: `.claude/launch.json` um `"autoPort": true` ergänzt (Cockpit weicht auf freien Port aus, wenn 4777 belegt ist).

## Erledigt

**Geprüft (von Jarvis gelesen, Stichproben in den Dateien, README/AP-003 gegengezählt)**
- **Runden 39–50** in `_gespraechsnotizen-K1.md` geschrieben; **13 weitere Fälle** mit Sirat durchgegangen: FA-05, FA-11, FA-23, FA-19, FA-16, FA-17, FA-18, FA-13, FA-14, FA-12, FA-21, FA-22, FA-20. Zusammen mit FA-01/06/15 vom Vormittag: **16 von 22** auf `mit Sirat durchgegangen` (README-Tabelle: 16 Zeilen, gegengezählt).
- Offene Fragen Q22–Q24 beantwortet; vier erledigte Sammelpunkte in Q21 abgehakt.
- **ADR 0011** (Wechselgeld ohne Bestätigung → durch 0012 überholt; Inhaber-Bereich auch vom Handy; keine eigene Storno-Anzeige; geänderter Bon als Angebot) und **ADR 0012** (Wechselgeld nirgends im System) gelesen, Kopf und Verweise in 0007/0009/0011 geprüft.
- `docs/roadmap.md` (K, K1) und `docs/open-questions.md` durch `doc-updater` nachgezogen; Bericht gelesen.
- Befund und Korrektur in FA-14: Internetausfall im Laden stoppt die KI **nicht** (Cloud + Telefonnetz) — Entwurf war falsch, jetzt: Server pausiert die KI automatisch, wenn das Annahme-Gerät nicht erreichbar ist.

**Ungeprüft**
- Die Einarbeitungen durch `requirements-engineer` (11 Aufträge, Runden 39–50) nur per Bericht und Grep-Stichproben kontrolliert, nicht Zeile für Zeile.
- Lesarten von Jarvis, in den Dateien so markiert, noch nicht von Sirat bestätigt: Onboarding-Reihenfolge ohne Wechselgeld-Schritt + Inhaber-Zugang per E-Mail-Link (FA-20); Zonenwert bei Handannahme vorausgewählt (FA-05); Schwelle/Protokoll/Monitoring der automatischen KI-Pause (FA-14); „über das Handy ausschalten" beim Internetausfall (FA-14); keine Zeitgrenze fürs Ändern außer Zahlungsregel (FA-11); Protokoll beim Übersteuern des Annahmestopps (FA-05/23).
- Testszenario-Labels `FA-xx-Tn` weiter nicht deckungsgleich (Befund A3), heute nicht bereinigt.
- FA-08/FA-10 (zurückgestellt) tragen nur einen ADR-0012-Hinweis oben; Körper noch mit alter Wechselgeld-Logik.
- Briefing §5.2 nennt `cash_settlements` — ob dort ein Wechselgeld-Feld gedacht war, bei K5 prüfen (ADR 0012).

## Entscheidungen

| Entscheidung | Runde | ADR |
|---|---|---|
| Wechselgeld wird nirgends im System eingerechnet; Abschluss = Summe bar kassiert; kein Onboarding-Schritt | 49 | **0012** |
| Wechselgeld-Ausgabe ohne Bestätigung (überholt durch 0012); Inhaber bestätigt auch vom registrierten Handy, keine Vertretung; keine eigene Storno-Anzeige (Annahme storniert selbst, sichtbar in Übersicht/Log); geänderter Bon wird angeboten, nicht automatisch gedruckt (Risiko Küchenzettel in Kauf genommen) | 40, 41, 43 | **0011** |
| Handannahme: Lieferzeit aus 15er-Raster bis 2 Std, Abholzeit 10er-Raster bis 60 Min, oder konkrete Uhrzeit; außerhalb der Zonen Gebühr von Hand; Annahmestopp „gar nichts mehr" = Warnung mit „trotzdem anlegen"; „Adresse merken?" bleibt Weg B (immer fragen) | 39, 44 | — (FA-05, FA-17) |
| Position streichen vor Zahlung = Änderung; Adressänderung außerhalb der Zonen wie Handannahme; keine Zeitgrenze außer Zahlungsregel | 40 | — (FA-11) |
| Annahmestopp endet beim Ladenschluss des Tages; Betreiber sieht ihn im Monitoring; Ist heute: nicht rangehen / absagen | 42 | — (FA-23) |
| Ein Tablet, PIN-Wechsel, genau eine aktive Person; Liste nicht kassierter Bestellungen auch für die Annahme; jede angemeldete Annahme-Person beendet liegengebliebene Schichten | 43 | 0011 / — (FA-16, FA-19) |
| Änderung von Zeitwerten/Öffnungszeiten wirkt erst ab dem nächsten Anruf; Zone ohne Lieferzeit → „ca. eine Stunde" + Hinweis an Annahme, ohne Gebühr/Mindestbestellwert → Übergabe; Vorbestellung: KI nennt Wunschzeit | 44, 48 | — (FA-17, FA-18, FA-01) |
| KI pausiert automatisch, wenn das Annahme-Gerät offline ist (Variante A); KI aus → laufendes Gespräch zu Ende; ohne lokalen Druck: Nachdruck nach Netz-Rückkehr + handgeschriebener Zettel; bei Ausfall steigt das Personal sofort auf Papier um, **kein Nachtrag** (Variante B) | 45, 46 | — (FA-13, FA-14) |
| „Gültig ab" = Datum; Artikel ohne Preis wird nicht angelegt → Annahme legt faktisch keine Artikel an (B10 eingeschränkt) | 47, 48 | — (FA-12; doc-updater: ggf. Nachtrag zu 0007 erwägen) |
| Modul-/Paketwechsel sofort, tagesgenau; Sperre = keine neuen Bestellungen, laufende zu Ende, Hinweis an Inhaber; Modul abbuchen bei offenen Vorgängen → zu Ende führen | 48, 50 | — (FA-21) |
| Ampel: Rot = KI/Gerät/Drucker während Öffnungszeit, Gelb = Minutenpaket ≥ 80 %, Annahmestopp > 1 Std; Minutentakt; Betreiber sieht nie Bestellungen, auch keine Nummern | 48, 50 | — (FA-22) |

## Geänderte Dateien (die wichtigsten)

- `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md` — Runden 39–50
- `docs/konzept/anwendungsfaelle/FA-05, 11, 12, 13, 14, 16, 17, 18, 19, 20, 21, 22, 23` — Status `mit Sirat durchgegangen`; FA-01, FA-06, FA-15 kleine Nachträge; FA-08/FA-10 nur Hinweis oben
- `docs/decisions/0011-wechselgeld-inhaber-handy-storno-sichtbarkeit.md`, `0012-wechselgeld-ausserhalb-des-systems.md` — **neu**; Nachtragszeilen in 0007, 0009, 0011
- `docs/konzept/README.md` — FA-Tabelle (16 × durchgegangen), K1-Statuszelle Runden 39–50
- `docs/arbeitspakete/AP-003-fachliche-anwendungsfaelle.md` — Nachträge Runden 39–50
- `docs/open-questions.md` — Q22–Q24 beantwortet, Q2/Q8/Q11/Q21 ergänzt
- `docs/roadmap.md` — K, K1
- `.claude/launch.json` — `autoPort`

## Offen / blockiert

- **FA-02, FA-03, FA-04** warten auf den Rufumleitungs-Test **AP-001, Freitag 2026-09-25** (Q1: kommt die Rufnummer an?).
- **FA-08, FA-09, FA-10** zurückgestellt (Fahrer-Teil, ADR 0008).
- **Kreuzverhör und Abnahme** für alle 16 durchgegangenen Fälle stehen aus — kein Fall ist `abgenommen`.
- **Steuerberaterin (Q2):** drei Prüfpunkte gesammelt (fluvo neben bestehender Kasse; Barumsätze an Papiertagen; kein Wechselgeld-Anfangsbestand) — Sirat leitet weiter.
- **Anwalt (Q10, Q17):** Einwilligung/Löschfrist Kundenstamm; Haftung Allergene/Steuersatz bei Selbstpflege.
- **Sirat bestätigen:** Onboarding-Reihenfolge und Inhaber-Zugang per E-Mail-Link (FA-20) — steht als Lesart in FA-20 und Q21.
- **K8-Zahlen vormerken:** 2-Minuten-Notdruck, Ladenschluss als Stopp-Ende, Minutentakt Monitoring, 80 %-Schwelle, Schwelle Gerät-offline → KI-Pause, Raster-Grenzen.

## Nächster Schritt

1. Beim nächsten Start `/konzept` → Sirat die eine offene Lesart bestätigen lassen (FA-20 Reihenfolge, E-Mail-Link).
2. Dann **Kreuzverhör beginnen**, Skill `grilling`, Fall für Fall in dieser Reihenfolge (Durchstich zuerst): FA-01 → FA-06 → FA-05 → FA-15 → FA-11 → FA-19/FA-16 → FA-23 → FA-13/FA-14 → FA-17/FA-18 → FA-12 → FA-20/21/22. Je Fall: Jarvis liest den Fall, stellt Sirat die harten Fragen (Widersprüche zwischen Fällen, Grenzfälle, „was, wenn"), `requirements-engineer` arbeitet Befunde ein, danach Sirats ausdrückliches Ja → Status `abgenommen` in Datei und README.
3. Vor dem Kreuzverhör oder parallel: `requirements-engineer` bereinigt die Testszenario-Labels `FA-xx-Tn` (Befund A3 in `_gegenlesen-K1.md`) in allen 16 Fällen — rein mechanisch, keine inhaltliche Änderung.
4. Nach Freitag (AP-001): Ergebnis in Q1/Q4/Q15 eintragen, FA-02/03/04 durchgehen.
5. Wenn Sirat Commit ansagt: alles unter `docs/` und `.claude/` — vorher prüfen, dass kein Name des Piloten und keine Zahl aus dem Business Brain in den Dateien steht (heute nichts davon aufgenommen).

## Nachtrag: Healthcheck (nach der Übergabe, gleiche Sitzung)

Drei unabhängige Prüfer (FA-Fälle gegeneinander/ADRs · Briefing/CLAUDE.md/ADR-Kette/Vertraulichkeit · Cockpit-Format/Links/Hooks/Encoding). Ergebnis: nichts Blockierendes, Maschinenseite sauber.

**Behoben (geprüft per Stichprobe):**
- Pilotname stand als Pfad in `.claude/agents/jarvis.md` → entfernt. Repo jetzt frei davon (Grep ohne `events.jsonl`, das ist gitignored).
- FA-11 Geldrecht „Ende ohne Bezahlung" auf ADR 0010 gezogen; veraltete Ausnahmen-Verweise in FA-02, FA-12, FA-06 korrigiert; ADR-0011-Hinweis oben in FA-09/FA-10.
- ADR-Kette gegenläufig verlinkt: Nachtragszeilen in 0006 (→0010, 0012), 0007 (→0009, 0010, Speisekarte-Rechte FA-12), 0008 (→0009, 0010, 0012, 0013). Vorsicht: `architect` hat 0008 beim Anhängen komplett neu geschrieben (kein Edit-Werkzeug) — Überschriften geprüft, Inhalt nicht Zeile für Zeile.
- Datumsreste (Konzept-README, AP-Übersicht AP-003), toter Link `pilot.md` (→ `.`), Q13 um „quittiert" ergänzt.
- **ADR 0013** (auf Sirats Ansage): Internetausfall im Piloten — automatische KI-Pause, Papier statt Warteschlange, kein Nachtrag; [FEST 18] unverändert, §5.5-Hinweis nur als Vorschlag im ADR. Roadmap K1 nachgezogen.

**Offen aus dem Healthcheck:**
- Briefing §5.5 bekommt den Hinweis-Satz aus ADR 0013 nur auf Sirats Ansage (Briefing = Sirats Datei).
- ADR-Vorlage `0000-vorlage.md` kennt Stufe „[ENTSCHIEDEN Sirat]" und Status „entschieden" nicht — Vorlage erweitern (kosmetisch, `doc-updater`).
- `/durchstich-test` steht in CLAUDE.md, nicht in jarvis.md (kosmetisch).
- `testprotokoll-AP-002-bondruck.md` ist aus AP-002 nicht verlinkt (kosmetisch).
