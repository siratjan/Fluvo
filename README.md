# fluvo

KI-gestützte Bestell- und Betriebsplattform für Liefer-Restaurants. *Reibungslos — vom Anruf bis zum Kunden.*

GitHub: https://github.com/siratjan/Fluvo

Dieses Repo enthält zwei Dinge: den Code von fluvo (kommt später, unter `apps/` und `packages/`) und das **Agentic Operating System** — die Arbeitsumgebung, mit der KI-Agenten fluvo bauen.

## So arbeitest du hier

Du redest immer mit **Jarvis**, dem Generalagenten. Er kennt das Repo, das Team und den Business Brain (nur lesend).

1. Claude Code **in diesem Ordner** öffnen. Die Sitzung startet als Jarvis; ein Hook lädt den aktuellen Stand (Bauschritt, offene Arbeitspakete, offene Fragen, letzte Übergabe, letzte Einträge im Business Brain).
2. Sag Jarvis, was du willst — oder frag „Was steht an?", dann schlägt er Arbeitspakete vor.
3. Jarvis legt ein Arbeitspaket unter [docs/arbeitspakete/](docs/arbeitspakete/README.md) an, wählt Agenten und Skills und zeigt dir Ziel, Abnahmekriterien und Team. Du gibst frei — Code entsteht nur, wenn du es für dieses Paket ansagst.
4. Jarvis steuert die Ausführung, lässt die Wächter prüfen und berichtet: Ergebnis, deine Entscheidungen, nächster Schritt.
5. `/handoff` schließt die Sitzung ab.

**Arbeitszyklus** — verbindlich, sobald Code entsteht ([ADR 0004](docs/decisions/0004-arbeitszyklus.md)):
**Planen** (`/plan`, wartet auf deine Freigabe) → **Testen zuerst** (`tdd-guide`, rot dann grün) → **Bauen** (nur so viel Code, dass die Tests bestehen) → **Prüfen** (`/review`, zweiter Agent ohne Vorwissen) → **Verifizieren** (`/verify`: Standards, Sicherheit, Abdeckung) → **Sichern** (`/handoff`). Keine Phase wird übersprungen; das Cockpit zeigt je Paket, wo es steht.

## Konzeptphase — vor dem ersten Code

Erst konzipieren, dann entwickeln ([ADR 0005](docs/decisions/0005-konzeptphase.md)). Die Landkarte der elf Artefakte liegt in [docs/konzept/README.md](docs/konzept/README.md) — Format angelehnt an das Advansure-Konzept. Sag Jarvis **`/konzept`**: Er zeigt den Stand und erarbeitet das nächste Artefakt mit dir im Gespräch. Bei einer offenen Entscheidung holt **`/council <Frage>`** vier unabhängige Stimmen ein; du entscheidest.

## Cockpit — sehen, was läuft

```bash
node tools/cockpit/server.mjs
```

Dann http://localhost:4777 öffnen. **Board** zeigt die Arbeitspakete, **Live** wer gerade woran arbeitet und was die Hooks blockiert haben, **Team** alle Agenten, Skills und Hooks, **Betrieb** laufende Server und den Git-Stand. Die Seite liest nur Dateien dieses Repos, läuft nur auf deinem Rechner und zeigt nichts aus dem Business Brain. Hintergrund: [ADR 0003](docs/decisions/0003-cockpit.md).

## Was wo liegt

| Ort | Inhalt |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Die zehn Regeln und der Arbeitsablauf — liest jeder Agent zuerst |
| [docs/briefing.md](docs/briefing.md) | Das Umsetzungs-Briefing, Quelle der Wahrheit |
| [docs/roadmap.md](docs/roadmap.md) | Baureihenfolge mit Status |
| [docs/open-questions.md](docs/open-questions.md) | Was noch nicht entschieden ist |
| [docs/decisions/](docs/decisions/) | Entscheidungen, eine Datei je Entscheidung |
| [docs/arbeitspakete/](docs/arbeitspakete/README.md) | Arbeitspakete mit Status |
| `.claude/agents/` | Jarvis + 13 Fachagenten, farbig nach Rolle (blau plant · grün testet · gelb prüft Code · rot Wächter) |
| `.claude/skills/` | 8 Skills mit fluvo-Fachwissen |
| `.claude/hooks/` | 5 automatische Prüfungen |
| `.claude/rules/` | Code-Standards |
| `.claude/commands/` | `/plan`, `/review`, `/durchstich-test`, `/handoff` |

## Die Agenten

| Agent | Aufgabe |
|---|---|
| **`jarvis`** (cyan) | Generalagent: Arbeitspakete, Teamwahl, Steuerung, Bericht |
| `planner` | Zerlegt Aufgaben in prüfbare Schritte |
| `architect` | Hütet die festen Entscheidungen, schreibt ADRs |
| `tdd-guide` | Tests zuerst |
| `code-reviewer` | TypeScript, React, PWA |
| `database-reviewer` | Schema, Migrationen, Abfragen |
| `tenant-isolation-guard` | Sucht Lecks zwischen Restaurants |
| `compliance-guard` | DSGVO, Kassenrecht, KI-Offenlegung, Barrierefreiheit |
| `security-reviewer` | Webhooks, Login, Tokens, Zahlung |
| `voice-integrator` | Anrufmanager KI (Retell) |
| `silent-failure-hunter` | Findet verschluckte Fehler |
| `build-error-resolver` | Bringt den Build auf Grün |
| `e2e-runner` | Ende-zu-Ende-Tests |
| `doc-updater` | Hält die Doku aktuell |

## Was die Hooks automatisch verhindern

Geheimnisse im Code · `UPDATE`/`DELETE` auf dem Event-Log · Importe von Modul zu Modul · neue Tabellen ohne `tenant_id` und Row-Level-Security · Tenant-Kontext ohne `SET LOCAL` · `git push --force`, `--no-verify`, `drizzle-kit push`. Nach jeder Änderung: Formatierung, Typprüfung, Warnung bei Personendaten in Logs.

Die Hooks erkennen grobe Verstöße über Textmuster. Sie ersetzen weder Tests noch Reviewer.

Herkunft: Aufbau angelehnt an [affaan-m/ECC](https://github.com/affaan-m/ECC) (MIT), Inhalte für fluvo neu geschrieben — siehe [ADR 0001](docs/decisions/0001-agentic-operating-system.md).
