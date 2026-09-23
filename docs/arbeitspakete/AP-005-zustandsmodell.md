# AP-005 · Konzept K3: Zustandsmodell der Bestellung

- **Status:** in Arbeit
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-23
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K3
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Für jeden Status der Bestellung ist festgelegt, wer welchen Übergang auslösen darf, was er bewirkt und was bei Storno, Doppelklick und Offline-Nachzüglern passiert. Das wichtigste Einzelartefakt — daraus wird der Kern.

## Einordnung

- **Berührt:** [FEST] Zustandsmaschine, nur Vorwärts-Übergänge, Storno als eigener Pfad, Event-Log · [OFFEN] Q2, Q3
- **Business Brain:** `Modularer Monolith`, `Fahrer-Bargeldabrechnung`, `TSE-Pflicht`
- **Nicht Teil dieses Pakets:** Umsetzung im Code, Zustände anderer Objekte (Schicht, Zahlung) — nur soweit sie die Bestellung berühren

## Abnahmekriterien

- [ ] Zustandsdiagramm und Übergangstabelle sagen dasselbe
- [ ] Je Übergang: Auslöser, wer darf, Bedingungen, Wirkung (Events, Druck, TSE), Verhalten offline
- [ ] Storno aus jedem Status beantwortet oder als [OFFEN] mit Frage an die Steuerberaterin markiert
- [ ] Gleichzeitige und verspätete Aktionen sind geregelt
- [ ] Abholung statt Lieferung ist entschieden oder als offene Frage eingetragen
- [ ] Von `architect` gegengelesen, von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | jarvis | Gespräch mit Sirat führen (`/konzept K3`) |
| 2 | konzept-diagramme (Skill) | Zustandsdiagramm + Übergangstabelle |
| 3 | fluvo-core-domain (Skill) | bestehende Kern-Regeln |
| 4 | requirements-engineer | Entwurf |
| 5 | architect | Gegenlesen (berührt [FEST 2], Q13) |
| 6 | compliance-guard | Storno und TSE-Bezug prüfen |
| 7 | grilling (Skill) | Kreuzverhör vor der Abnahme |

## Schritte

1. `/konzept K3` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

Wie läuft Storno heute im Restaurant? Gibt es Abholung beim Piloten? · Termin mit der Steuerberaterin zu Q2/Q3

## Ergebnis

**Zwischenstand 2026-09-23 (Entwurf):** `requirements-engineer` hat den ersten Entwurf des Zustandsmodells angelegt: `docs/konzept/modelle/zustand-bestellung.md` — `stateDiagram-v2` plus Übergangstabelle für den Piloten-Durchstich. Zustände: `received` (einziger Vor-Endzustand, keine Küchen-Status), Enden `delivered` (Lieferung), `handed_over` (Abholung/Mitnehmen), `ended_unpaid` [VORSCHLAG, nie abgeholt], `cancelled` (Storno-Pfad). Merkmale statt Zustände: „quittiert" (ADR 0010), Bestellart, Vorbestellung, Test, Notiz, Zahlung. Sonderfälle geregelt: Doppelquittierung (idempotent), Offline-Nachzügler (im Piloten keiner — ADR 0013, Konfliktregel dennoch festgehalten), Storno vor/nach Zahlung, 2-Minuten-Notdruck (Zeitauslöser), „Rückruf nötig" bei Sofort-Großbestellung (Vorschlag: Vor-Anlage-Zustand außerhalb der Zustandsmaschine). Nicht erlaubte Übergänge (rückwärts nie; Korrektur = Änderung oder Storno + Neuanlage) ausdrücklich benannt.

**Berührt [FEST 2] / Q13** — der Entwurf ist ein Vorschlag, der von `architect` gegenzulesen und von Sirat zu entscheiden ist (reduzierte Kette gegenüber Briefing §5.3). **Befund:** Der Skill `fluvo-core-domain` und Briefing §5.3 zeigen die volle Kette (`received → in_kitchen → ready → out_for_delivery → delivered → settled`); der Piloten-Schnitt weicht ab (keine Küchen-/Fahrer-Status, `handed_over`/`ended_unpaid` neu, `settled` kein Bestellstatus). Skill-Datei **nicht** geändert — im Bericht genannt.

Offene Fragen an Sirat/architect: (1) reduzierte Kette bestätigen; (2) „Abgerechnet" für Lieferungen ohne erfasste Zahlung + „niemand drückt geliefert"; (3) `ended_unpaid` eigenes Ende oder Storno-Pfad; (4) „Rückruf nötig" Vor-Anlage-Zustand oder eigener Status; (5) „quittiert" Merkmal oder Zustand. Fiskalische Storno-Grenzen → Q3 (Steuerberaterin). Kein Kreuzverhör, keine Abnahme.

**Zwischenstand 2026-09-23 (Gegenlesen `architect` eingearbeitet):** `requirements-engineer` hat den Prüfbericht `docs/konzept/modelle/_gegenlesen-K3.md` in den Entwurf eingearbeitet — nur, was aus bereits entschiedenen Regeln folgt; alles Übrige bleibt Frage an Sirat. Geändert: (1) **Fehler (hoch) behoben** — Storno-Recht an das Merkmal **„Zahlung erfasst"** gekoppelt statt an den Zustand (bezahltes Mitnehmen ist `paid` in `received` → Storno nur Inhaber; Endzustand-Storno unabhängig von der Zahlung, bei `delivered` gibt es im Piloten keine); Übergangstabelle und Sonderfall entsprechend korrigiert. (2) `order.paid`/`payment.captured` als **eigenständiges** Ereignis von der Erfüllungskante entkoppelt; Notdruck jetzt `order.printed_unacknowledged`, klar getrennt von der Quittierung `order.acknowledged`. (3) Absatz **„Zukunftssicherheit"** ergänzt: Status als Zod-Union/Textspalte (kein DB-Enum), `OPEN_STATES`/`TERMINAL_STATES` als abgeleitete Mengen — Vorgabe für K5/Code. (4) `ended_unpaid` bleibt eigenes Ende mit `order.ended_unpaid`; Ereignis folgt aus [FEST 7], Statuslabel bleibt **[VORSCHLAG]** bis Q3. (5) „Rückruf nötig" Variante A (Vor-Anlage außerhalb der FSM, eigene kleine Tabelle mit `tenant_id`+RLS) als **[VORSCHLAG]** eingetragen. (6) Abschnitt „Offene Fragen": **Q13 als bedingt schließbar** markiert; die vier nicht mitgeschlossenen Rest-Unterpunkte (delivered↔Abgerechnet, „niemand drückt geliefert", Fahrer-Enden, Restaurant-Lebenszyklus → K9) aufgelistet; Fiskal → Q3. Status des Artefakts: „Entwurf — Gegenlesen `architect` 2026-09-23 eingearbeitet; Durchgang mit Sirat und Entscheidung Q13 stehen aus". Skill `fluvo-core-domain`, Briefing und ADRs **nicht** geändert (im Bericht benannt). Weiterhin kein Kreuzverhör, keine Abnahme.

**Entscheidung 2026-09-23 (Q13, ADR 0015):** Sirat hat die reduzierte Zustandskette für den Piloten entschieden (`received` → `delivered` | `handed_over` | `cancelled`; `ended_unpaid` [VORSCHLAG] bis Q3; Quittierung/Vorbestellung/Test/Zahlung als Merkmale; Storno-Recht am Merkmal „bezahlt"; spätere Zustände einschiebbar, Status als Literal-Union ohne DB-Enum) — Wortlaut in `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md` (Runde 52). Q13 in `open-questions.md` als beantwortet geschlossen (Rest-Unterpunkte → Q27–Q30), Skill `fluvo-core-domain` nachgezogen (`doc-updater`). Kreuzverhör und Abnahme des K3-Artefakts stehen weiterhin aus.
