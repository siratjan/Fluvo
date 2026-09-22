# AP-004 · Konzept K2: Prozessmodell Gesamtprozess und KI-Gespräch

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K2
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Der Weg einer Bestellung vom Anruf bis zur Abrechnung ist als Prozessmodell mit Bahnen je Beteiligtem dargestellt, dazu der Sub-Prozess des KI-Gesprächs. Jeder Schritt ist einem Anwendungsfall zugeordnet.

## Einordnung

- **Berührt:** [FEST] Bestellfluss Briefing §5.3 · [OFFEN] Q4
- **Business Brain:** `Integrations-Burggraben` (A13), `@Technische Architektur`
- **Nicht Teil dieses Pakets:** Prozesse für Website-Bestellungen und Küchendisplay

## Abnahmekriterien

- [ ] Gesamtprozess als Mermaid-Diagramm mit Bahnen: Anrufer, KI, Annahme, Küche, Fahrer, System
- [ ] Sub-Prozess „KI-Gespräch“ als eigenes Diagramm
- [ ] Jede Verzweigung hat alle Ausgänge; Übergaben zwischen Bahnen sind benannt
- [ ] Zuordnungstabelle Prozessschritt → FA → TU ist lückenlos
- [ ] Diagramme rendern im Cockpit
- [ ] Von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | konzept-diagramme (Skill) | Aufbau, Mermaid-Regeln |
| 2 | requirements-engineer | Modell aus den Anwendungsfällen ableiten |
| 3 | jarvis | Mit Sirat durchgehen |
| 4 | architect | Gegenlesen gegen Briefing §5.3 |

## Schritte

1. `/konzept K2` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

Entscheidung, ob zusätzlich eine `.bpmn`-Datei für dein Modellierungswerkzeug gewünscht ist

## Ergebnis

_Noch offen._
