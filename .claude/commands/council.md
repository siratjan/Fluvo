---
description: Vier unabhängige Stimmen zu einer offenen Entscheidung — Sirat entscheidet danach
argument-hint: <Frage oder Qn aus open-questions.md>
---

Berufe den Rat ein zu: $ARGUMENTS

Der Rat ist für **Entscheidungen mit mehreren vertretbaren Wegen** (z. B. Mollie oder Stripe, Geocoder, Eskalationsziel). Nicht für Faktenfragen, nicht für Code-Review, und nie, um eine [FEST]-Entscheidung neu aufzumachen — dann ablehnen und den Briefing-Abschnitt nennen.

1. **Frage schärfen.** Ein Satz: Was wird entschieden, welche Randbedingungen gelten, woran erkennt man eine gute Entscheidung? Ist die Frage unklar: eine Rückfrage, dann weiter. Bei `Qn`: den Eintrag aus `docs/open-questions.md` lesen.
2. **Kontext knapp zusammenstellen:** betroffene Briefing-Abschnitte, [FEST]-Regeln, die berührt werden, relevante Annahmen aus dem Business Brain mit Status (ohne vertrauliche Zahlen). Nur was für die Entscheidung nötig ist.
3. **Eigene Position zuerst aufschreiben** (Position, drei Gründe, größtes Risiko) — bevor du die anderen liest. Sonst spiegelst du sie nur.
4. **Vier Stimmen parallel starten, als frische Agenten ohne Gesprächsverlauf.** Jede bekommt nur Frage + Kontext + ihre Rolle:
   - `architect` — Tragfähigkeit, Wartbarkeit, Folgen in zwei Jahren, Verträglichkeit mit dem Briefing
   - `compliance-guard` — DSGVO, Kassenrecht, Auftragsverarbeiter, was vor dem Pilot stehen muss
   - `security-reviewer` — Angriffsfläche, Abhängigkeit von Dritten, was schiefgehen kann
   - Pragmatiker (`general-purpose`, Rolle im Auftrag festlegen) — Tempo für einen Solo-Gründer, wenige bewegliche Teile, Kosten, das Zeitfenster am Markt
   
   Auftrag an jede Stimme: „Antworte mit: 1. Position (1–2 Sätze) · 2. Drei Gründe · 3. Größtes Risiko deiner Empfehlung · 4. Was die anderen vermutlich übersehen. Direkt, ohne Absicherungsfloskeln, unter 250 Wörter."
5. **Zusammenführen — mit Schutz vor eigener Voreingenommenheit:** Keine Stimme ohne Begründung übergehen. Hat eine Stimme deine Position geändert, sag es. Der stärkste Widerspruch bleibt sichtbar, auch wenn du ihn verwirfst. Stehen zwei Stimmen gegen dich, ist das ein Signal.
6. **Ausgabe für Sirat**, knapp:
   - je Stimme: Position + ein Satz warum
   - **Einigkeit** · **Stärkster Widerspruch** · **Stimmt die Frage überhaupt?** · **Empfehlung**
   - Was Sirat für die Entscheidung noch liefern müsste (Zahl, Test, Gespräch)
7. **Sirat entscheidet.** Danach: `architect` schreibt den ADR, `doc-updater` schließt die Frage in `docs/open-questions.md`. Ohne Entscheidung: Ergebnis des Rats beim Qn-Eintrag als Notiz festhalten.
