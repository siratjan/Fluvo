# AP-007 · Konzept K5: Datenmodell und Datenwörterbuch

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K5
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

ER-Diagramm und Datenwörterbuch liegen vor. Jedes Feld hat Typ, Bedeutung und vor allem eine Datenklasse: DSGVO-löschbar oder GoBD-pflichtig. Diese Entscheidung lässt sich später kaum korrigieren.

## Einordnung

- **Berührt:** [FEST] tenant_id überall, Event-Log unveränderlich, zwei Datenklassen, Preise einfrieren, kein Audio · [OFFEN] Q2, Q10
- **Business Brain:** `DSGVO & Regulierung Deutschland — Tiefenrecherche`, `TSE-Pflicht`, Notion-Prototyp als Blaupause (laut Briefing)
- **Nicht Teil dieses Pakets:** Drizzle-Schema, Migrationen, Indizes

## Abnahmekriterien

- [ ] ER-Diagramm mit allen Tabellen aus Briefing §5.2 und Kardinalitäten
- [ ] Datenwörterbuch je Tabelle: Feld, Typ, Pflicht, Bedeutung, erfundenes Beispiel, Personenbezug, Klasse, Löschung
- [ ] Keine Tabelle der Klasse (b) enthält Personendaten — nur Verweise
- [ ] DSFinV-K-relevante Angaben sind vorhanden oder als Frage an die Steuerberaterin markiert
- [ ] Von `database-reviewer` und `compliance-guard` gegengelesen, von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | konzept-vertraege (Skill) | Datenwörterbuch-Format |
| 2 | konzept-diagramme (Skill) | ER-Diagramm |
| 3 | requirements-engineer | Entwurf |
| 4 | database-reviewer | Gegenlesen |
| 5 | compliance-guard | Datenklassen prüfen |

## Schritte

1. `/konzept K5` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

Löschfristen vom Anwalt (Q10) · Rückmeldung der Steuerberaterin zu DSFinV-K-Pflichtangaben

## Ergebnis

_Noch offen._
