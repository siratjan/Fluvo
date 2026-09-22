# AP-005 · Konzept K3: Zustandsmodell der Bestellung

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
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
| 1 | konzept-diagramme (Skill) | Zustandsdiagramm + Übergangstabelle |
| 2 | fluvo-core-domain (Skill) | bestehende Kern-Regeln |
| 3 | requirements-engineer | Entwurf |
| 4 | architect | Gegenlesen |
| 5 | compliance-guard | Storno und TSE-Bezug prüfen |

## Schritte

1. `/konzept K3` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

Wie läuft Storno heute im Restaurant? Gibt es Abholung beim Piloten? · Termin mit der Steuerberaterin zu Q2/Q3

## Ergebnis

_Noch offen._
