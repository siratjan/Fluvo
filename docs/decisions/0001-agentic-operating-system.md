# 0001 · Eigenes, schlankes Agentic Operating System statt ECC-Komplettinstallation

- **Status:** angenommen
- **Datum:** 2026-09-18
- **Stufe:** [STACK]
- **Entschieden von:** Sirat

## Anlass

fluvo wird von einem Solo-Gründer mit KI-Agenten gebaut. Als Vorlage für die Arbeitsumgebung der Agenten lag das Repo [affaan-m/ECC](https://github.com/affaan-m/ECC) (v2.2.1, MIT) vor.

## Entscheidung

ECC wird nicht als Plugin installiert. Stattdessen liegt im Repo unter `.claude/` ein auf fluvo zugeschnittenes System aus 13 Agenten, 8 Skills, 5 Hooks, 4 Regeldateien und 4 Befehlen. Aufbau und Rollenverteilung orientieren sich an ECC; die Inhalte sind für fluvo neu geschrieben, auf Deutsch.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| ECC komplett installieren | sofort verfügbar, wird gepflegt | 68 Agenten / 292 Skills, davon rund 90 % für Sprachen und Themen, die fluvo nicht nutzt; allgemeine Regeln kennen die [FEST]-Entscheidungen nicht; Hooks teils nicht Windows-tauglich (tmux, macOS-Benachrichtigung) |
| Gar kein System, nur CLAUDE.md | am einfachsten | keine automatische Absicherung von Mandantentrennung, Event-Log und Modulgrenzen — genau die Fehler, die Agenten leise einbauen |
| **Eigenes schlankes System** | jede Datei ist relevant; Domänen-Wächter, die ECC nicht hat | muss selbst gepflegt werden |

## Aus ECC als Vorbild übernommen

Rollen `planner`, `architect`, `tdd-guide`, `code-reviewer` (aus `typescript-reviewer` + `react-reviewer`), `database-reviewer`, `security-reviewer`, `silent-failure-hunter`, `build-error-resolver`, `e2e-runner`, `doc-updater`; die Skill-Ideen `blueprint` und `architecture-decision-records`; die Hook-Ideen Typprüfung, Formatierung, Geheimnis-Erkennung vor Commit, Sitzungsstart/-ende.

## Neu für fluvo

Agenten `tenant-isolation-guard`, `compliance-guard`, `voice-integrator`; alle acht Skills; Hooks für Modulgrenze, Event-Log-Schutz, Migrations-Prüfung (tenant_id + RLS), `SET LOCAL`, Personendaten in Logs.

## Folgen

- Die Hooks für Typprüfung, Formatierung und dependency-cruiser laufen still durch, bis das Monorepo-Gerüst (Roadmap 0b) steht.
- Die Muster-Erkennung der Hooks ist bewusst einfach (Textmuster). Sie fängt grobe Verstöße ab und ersetzt weder Tests noch Reviewer.
- Ändert sich ein Muster im Code, muss der zugehörige Skill nachgezogen werden (`doc-updater`).

## Wann neu bewerten

Wenn ein zweiter Entwickler dazukommt, oder wenn ein ECC-Baustein fehlt, der mehrfach gebraucht wurde.

**Nachtrag 2026-09-23:** Auf Sirats Ansage wurden Design-Bausteine aus ECC übernommen — zugeschnitten und auf Deutsch, mit Quellvermerk (MIT): Skills `fluvo-ui-design` (aus `frontend-design-direction`), `fluvo-accessibility` (aus `accessibility` + `frontend-a11y`), `fluvo-design-system` (aus `design-system`); Agenten `a11y-architect`, `react-reviewer`, `type-design-analyzer`. Einsatz ab Stufe 3 der Durchstich-Spur (Annahme-Tablet) bzw. bei AP-015 (Typen). Team jetzt 18 Agenten, 15 Skills.
