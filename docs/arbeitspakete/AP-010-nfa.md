# AP-010 · Konzept K8: Nicht-funktionale Anforderungen mit Zahlen

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K8
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Alles, was „gut genug“ heißt, hat eine Zahl und eine Messmethode: Latenz, Druckzeit, Offline-Dauer, Spitzenlast, Ausfall- und Wiederherstellungszeit, Geräte, Kosten je Minute. Ohne Zahl kann niemand „fertig“ prüfen.

## Einordnung

- **Berührt:** [FEST] Latenz unter 1 s, Kostenampel 0,15/0,20 €, WCAG 2.1 AA, Offline-First · [OFFEN] Q9
- **Business Brain:** `Preismodell fluvo`, `@KI-Agent Architektur & Kosten`, Pilot-Seite (Bestellungen je Tag) — Zahlen nur als Größenordnung ins Repo
- **Nicht Teil dieses Pakets:** Lasttests, Monitoring-Aufbau

## Abnahmekriterien

- [ ] Je Anforderung: ID, Zahl, Messmethode, Stufe und Quelle
- [ ] Spitzenlast des Piloten als Größenordnung festgehalten (ohne vertrauliche Details)
- [ ] Unterstützte Geräte und Browser für Annahme und Fahrer-PWA festgelegt
- [ ] Unbekannte Zahlen sind als Frage markiert, nicht geschätzt
- [ ] Von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | konzept-vertraege (Skill) | NFA-Tabelle |
| 2 | requirements-engineer | Entwurf |
| 3 | jarvis | Zahlen mit Sirat klären |

## Schritte

1. `/konzept K8` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

Wie lange darf ein Bon dauern? Wie lange muss die Küche ohne Internet durchhalten? Welche Geräte stehen beim Piloten?

## Ergebnis

_Noch offen._
