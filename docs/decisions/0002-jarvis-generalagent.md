# 0002 · Jarvis als Generalagent und einziger Ansprechpartner

- **Status:** angenommen
- **Datum:** 2026-09-18
- **Stufe:** [STACK]
- **Entschieden von:** Sirat

## Anlass

Sirat will nicht selbst entscheiden müssen, welcher der 13 Fachagenten und 8 Skills für eine Aufgabe zuständig ist. Er will mit genau einem Agenten reden, der das Projekt und das Geschäftswissen kennt.

## Entscheidung

Die Hauptsitzung in diesem Repo läuft als Agent **Jarvis** (`.claude/settings.json` → `"agent": "jarvis"`). Jarvis nimmt Arbeitspakete entgegen oder schlägt sie vor, wählt Agenten und Skills, steuert die Ausführung, prüft das Ergebnis und berichtet. Arbeitspakete liegen als Dateien unter `docs/arbeitspakete/`.

Jarvis hat **Lesezugriff** auf den Business Brain (`permissions.additionalDirectories`). Schreibzugriffe dorthin blockieren zwei Hooks (`pre-write-guard`, `pre-bash-guard`).

Alle Agenten tragen eine Farbe nach Rolle: cyan Jarvis · blau Planung · grün Tests · gelb Code-Prüfung · rot Wächter · lila/orange/pink Spezialisten.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Jarvis nur als Rolle in CLAUDE.md beschreiben | keine Einstellung nötig | Rolle verwässert, kein eigener Name/keine Farbe in der Oberfläche |
| Jarvis als gewöhnlicher Subagent | einfach | Sirat müsste ihn jedes Mal aufrufen; Subagenten führen keinen Dialog |
| Schreibzugriff auf den Business Brain | Jarvis könnte Erkenntnisse direkt zurückspielen | Der Vault hat eigene Buchführung (index.md, log.md, Zitierpflicht, raw/ unveränderlich) und einen eigenen Agenten; zwei Schreiber erzeugen Unordnung |

## Folgen

- Änderungen am Business Brain formuliert Jarvis als Auftrag; Sirat führt sie in einer Sitzung im Vault aus.
- Der Pfad zum Business Brain steht in `settings.json`, in `jarvis.md`, in `CLAUDE.md` und im Hook `session-start.mjs` (überschreibbar per Umgebungsvariable `FLUVO_BUSINESS_BRAIN`). Zieht der Vault um, an diesen Stellen anpassen.
- Für eine Sitzung ohne Jarvis den Eintrag `"agent"` in `.claude/settings.json` vorübergehend entfernen.

## Wann neu bewerten

Wenn Jarvis regelmäßig Erkenntnisse hat, die im Business Brain fehlen, und der Umweg über Sirat bremst — dann einen geregelten Rückkanal (z. B. Ablage in `inbox/` des Vaults) entscheiden.
