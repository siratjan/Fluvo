# AP-006 · Konzept K4: Gesprächsdesign der KI

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K4
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Das Verhalten der KI am Telefon ist festgelegt: Gesprächsfluss, Pflichtangaben, die fünf Function Calls als Verträge, Eskalationsregeln, Verbotsliste und mindestens 20 Testanrufe als Abnahme-Satz.

## Einordnung

- **Berührt:** [FEST] KI-MVP-Scope, KI-Ansage, „sagt nichts zu, was Geld kostet“, kein Audio · [OFFEN] Q1, Q4, Q5, Q6
- **Business Brain:** `@Experiment KI-Telefontest`, `outputs/fluvo/experiment/Retell-Testanleitung.md`, `Entlastungs-MVP` (A11/A11b), `@KI-Agent Architektur & Kosten`
- **Nicht Teil dieses Pakets:** Der ausformulierte Prompt, die Retell-Konfiguration, Status-Auskunft (V2)

## Abnahmekriterien

- [ ] Gesprächsfluss als Diagramm + Tabelle; jede Phase hat Ausgänge zu Eskalation und Abbruch
- [ ] Pflichtangaben je Bestellart festgelegt
- [ ] Fünf Function Calls spezifiziert: Eingabe, sprechbare Antwort, Fehlerfälle mit Handlungsanweisung, Zeitbudget, Idempotenz
- [ ] Eskalationsauslöser mit Erkennungsmerkmal; beide Wege für Q4 tragfähig
- [ ] Jede Leitplanke ist technisch abgesichert, nicht nur im Prompt
- [ ] Mindestens 20 Testanrufe inkl. „keine Rufnummer“ und „Abbruch vor Bestätigung“
- [ ] Von `voice-integrator` und `compliance-guard` gegengelesen, von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | konzept-gespraechsdesign (Skill) | Aufbau und Leitplanken |
| 2 | requirements-engineer | Entwurf, Abgleich mit dem Experiment im Business Brain |
| 3 | voice-integrator | Machbarkeit bei der Voice-Plattform, Zeitbudgets |
| 4 | compliance-guard | Offenlegung, Datensparsamkeit |
| 5 | jarvis | Mit Sirat durchgehen |

## Schritte

1. `/konzept K4` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

Erkenntnisse aus deinen Testanrufen, die nicht im Business Brain stehen · Ergebnis von AP-001 (Rufnummernübermittlung)

## Ergebnis

_Noch offen._
