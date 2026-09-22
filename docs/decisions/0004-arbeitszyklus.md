# 0004 · Verbindlicher Arbeitszyklus beim Entwickeln

- **Status:** angenommen
- **Datum:** 2026-09-18
- **Stufe:** [FEST] (Arbeitsweise)
- **Entschieden von:** Sirat

## Anlass

Sirat will, dass Jarvis beim Entwickeln nach dem festen Rhythmus aus dem ECC-Werkstatt-Handbuch (Kapitel 06 „Der Arbeitszyklus") arbeitet: reproduzierbare Ergebnisse statt schneller Demos, die später teuer werden.

## Entscheidung

Jedes Arbeitspaket, in dem Code entsteht, durchläuft sechs Phasen in fester Reihenfolge. Keine wird übersprungen.

| # | Phase | ECC-Vorbild | Umsetzung in fluvo |
|---|---|---|---|
| 1 | Planen | `/plan „Beschreibung"` | `/plan` → `planner` (ggf. `architect`); wartet auf Sirats Freigabe |
| 2 | Testen zuerst | `tdd-workflow` | `tdd-guide`; Tests müssen zuerst rot sein |
| 3 | Bauen | im TDD-Ablauf | nur so viel Code, dass die Tests bestehen; Hooks prüfen mit |
| 4 | Prüfen | `/code-review` | `/review` → `code-reviewer` + Wächter, ohne Vorwissen über die Entstehung |
| 5 | Verifizieren | `/quality-gate` · `/security-scan` | `/verify`: Standards, Sicherheit, Abdeckung der Pflicht-Testbereiche |
| 6 | Sichern | `/save-session` | `/handoff` → `doc-updater`; Gelerntes in Doku und Skills |

Zurückgehen ist erlaubt, vorwärts springen nicht. Pakete ohne Code laufen verkürzt (Planen → Erarbeiten → Prüfen → Sichern).

## Folgen

- `jarvis.md` §4a und `CLAUDE.md` beschreiben den Zyklus; neuer Befehl `/verify`.
- Die AP-Vorlage führt das Feld `Phase` und eine Zyklus-Checkliste; das Cockpit zeigt beides als Fortschritt.
- Will Sirat im Einzelfall abkürzen, nennt Jarvis das Risiko in einem Satz und hält die Abkürzung im Arbeitspaket fest.

## Wann neu bewerten

Wenn der Zyklus bei sehr kleinen Änderungen (Tippfehler, Textanpassung) spürbar bremst — dann eine ausdrückliche Bagatellgrenze festlegen, statt stillschweigend abzukürzen.
