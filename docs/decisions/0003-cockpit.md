# 0003 · Cockpit: lokale Übersicht über das Operating System

- **Status:** angenommen
- **Datum:** 2026-09-18
- **Stufe:** [STACK]
- **Entschieden von:** Sirat

## Anlass

Sirat will sehen, welcher Agent woran arbeitet, welche Server laufen und wie Ergebnisse aussehen — ohne Dateien von Hand zu öffnen.

## Entscheidung

Eine lokale Seite unter `tools/cockpit/` (ein Node-Skript ohne Abhängigkeiten, eine HTML-Datei), erreichbar unter http://localhost:4777, mit vier Reitern:

- **Board** — Arbeitspakete als Kanban, Detailansicht je Paket (Ziel, Kriterien, Team, Ergebnis), dazu Roadmap, offene Fragen, Entscheidungen, Übergaben.
- **Live** — wer gerade arbeitet, Tageszahlen, geänderte Dateien, Zeitleiste aller Ereignisse inklusive Hook-Blockaden.
- **Team** — Jarvis, Fachagenten nach Farbe und Rolle mit Modell und Skills, Arbeitsablauf, Skills, Hooks, Befehle, Regeln.
- **Betrieb** — welche Ports antworten, Git-Stand, installierte Werkzeuge.

Dazu eine Statuszeile für Claude Code im Terminal (`.claude/hooks/statusline.mjs`).

Datenquelle der Live-Ansicht ist `.claude/state/events.jsonl`, geschrieben vom Hook `log-event.mjs` (Ereignisse `SubagentStart/Stop`, `PostToolUse`, `PostToolUseFailure`, `SessionStart/End`, `UserPromptSubmit`, `Stop`) und von den Wächter-Hooks bei jeder Blockade.

## Grenzen — bewusst so

- Das Cockpit **liest nur**; es steuert nichts und schreibt nichts.
- Es lauscht nur auf `127.0.0.1` und gibt nur `.md`/`.mjs`/`.json` aus `docs/` und `.claude/` heraus (kein `.env`, kein Ereignislog, nichts außerhalb des Repos).
- Der **Business Brain wird nicht angezeigt** (Vertraulichkeit).
- Das Log enthält nur Metadaten: Agent, Werkzeug, Dateipfad, gekürzter Befehl mit geschwärzten Geheimnissen. Keine Nachrichten, keine Dateiinhalte. Es liegt nicht im Git.
- „Server läuft" heißt nur: der Port antwortet. Wem er gehört, wird nicht geprüft.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Fertiges Werkzeug (Grafana, Kanban-App) | ausgereift | neuer beweglicher Teil, Daten müssten exportiert werden, kennt die Agenten nicht |
| Obsidian-Vault über `docs/` | kein Bau nötig | zeigt nichts live, keine Agenten-Aktivität |
| Veröffentlichte Webseite | von überall erreichbar | Projektinterna verließen den Rechner |

## Wann neu bewerten

Sobald Code existiert: Reiter „Betrieb" um Testlauf, Build-Status und Voice-Kosten je Minute (Ampel 0,15 €/0,20 €) erweitern. Wenn Reviewer-Befunde je Arbeitspaket gebraucht werden: Befunde als Datei neben dem AP ablegen und in der Detailansicht zeigen.
