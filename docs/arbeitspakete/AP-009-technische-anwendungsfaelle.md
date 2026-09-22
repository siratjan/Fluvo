# AP-009 · Konzept K7: Technische Anwendungsfälle

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K7
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Zu jedem fachlichen Anwendungsfall ist beschrieben, was das System dafür leistet (TU-xx) — mit Verweis auf Verträge und mit Testszenarien, aus denen `tdd-guide` später direkt Tests macht.

## Einordnung

- **Berührt:** [FEST] Gehirn vs. Hände, Mandantentrennung, Offline-First
- **Business Brain:** `@Technische Architektur`
- **Nicht Teil dieses Pakets:** Implementierungsdetails, Bibliotheken

## Abnahmekriterien

- [ ] Jeder FA ist durch mindestens einen TU getragen; jeder TU nennt seine FAs
- [ ] Je TU: Ablauf, Ausnahmen, „Darf nicht“, Verträge, Anforderungen mit Zahl
- [ ] Testszenarien je TU inkl. Zwei-Restaurant-Fall, doppelter Zustellung, Offline-Nachzügler
- [ ] Rückverfolgungstabelle in `docs/konzept/README.md` ist lückenlos
- [ ] Von `architect` und `tenant-isolation-guard` gegengelesen, von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | konzept-anwendungsfall (Skill) | TU-Format |
| 2 | requirements-engineer | Entwurf, Rückverfolgung |
| 3 | architect | Gegenlesen |
| 4 | tenant-isolation-guard | Mandantentrennung in den Szenarien |
| 5 | tdd-guide | Prüfen, ob die Szenarien als Tests taugen |

## Schritte

1. `/konzept K7` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

—

## Ergebnis

_Noch offen._
