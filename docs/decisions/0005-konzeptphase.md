# 0005 · Konzeptphase vor der Entwicklung, mit eigenem Konzept-Team

- **Status:** angenommen
- **Datum:** 2026-09-18
- **Stufe:** [FEST] (Arbeitsweise)
- **Entschieden von:** Sirat

## Anlass

Sirat will die Idee erst konzipieren, bevor entwickelt wird, und hat dafür sein Advansure-Konzept aus dem Projektsemester als Vorbild genannt (Anwendungsfälle, BPMN, technische Anwendungsfälle, Kontext/Datenfluss, Architekturbild, Testplanung je Anwendungsfall).

## Entscheidung

Vor dem ersten Produktionscode entstehen für den Piloten-Durchstich elf Artefakte (K1–K11, Landkarte in `docs/konzept/README.md`). Format und Gliederung folgen dem Advansure-Konzept; ergänzt wird, was fluvo zusätzlich braucht: Zustandsmodell der Bestellung, Gesprächsdesign der KI, Datenwörterbuch mit DSGVO/GoBD-Klasse je Feld, Anforderungen mit Zahlen, Ausfall-Tabelle, Rollen und Rechte, Pilot-Erfolgskriterien.

Dafür kommt ein Konzept-Team ins Operating System:

| Baustein | Vorbild in ECC | Was übernommen wurde |
|---|---|---|
| Agent `requirements-engineer` | `product-capability`, `/prp-prd` | Keine Produktwahrheit erfinden; feste Regel, Vorliebe und Offenes trennen; Versprechen vom Weg trennen; Übergabe mit klarem nächsten Schritt |
| Skill `konzept-anwendungsfall` | `intent-driven-development` + Advansure-Format | Kriterien mit Ausgangslage, Auslöser, Ergebnis, „darf nicht" und Prüfmethode; wenig fragen, erst nachlesen; Geschäftsregeln nie aus Technik ableiten |
| Skill `konzept-vertraege` | `contract-first`, `api-design`, `error-handling` | Genau ein maßgebliches Artefakt je Grenze; vom Verbraucher her denken; Bedeutung statt nur Form; später Zod-Schema als einzige Quelle |
| Skill `konzept-diagramme` | — | Diagramme als Mermaid-Text im Git, Tabelle daneben ist maßgeblich |
| Skill `konzept-gespraechsdesign` | — | Verhalten der KI getrennt vom Prompt; jede Leitplanke technisch abgesichert |
| Befehl `/council` | `council` | Vier frische Stimmen ohne Gesprächsverlauf (gegen Verankerung), eigene Position zuerst, stärkster Widerspruch bleibt sichtbar — hier besetzt mit `architect`, `compliance-guard`, `security-reviewer` und einem Pragmatiker |
| Befehl `/konzept` | — | Stand zeigen, nächstes Artefakt im Dialog erarbeiten |

Nicht übernommen: `product-lens`, `market-research` (das „Warum" ist im Business Brain validiert), `spec-miner` (braucht Code), `plan-canvas` (das Cockpit deckt es ab), `living-docs-governance` (später).

## Regeln

- Konzipiert wird **im Gespräch mit Sirat**; Jarvis führt, `requirements-engineer` arbeitet zu.
- Status `abgenommen` erst nach Kreuzverhör (`grilling` oder Gegenlesen) und Sirats Ja.
- Umfang: nur der Durchstich Anruf → Bestellung → Bon → Fahrer. Küche, Website, Abrechnung später.
- Die Risikotests AP-001/AP-002 laufen parallel und werden nicht aufgeschoben.
- Artefakte liegen im Git: keine vertraulichen Zahlen, kein Name des Piloten.

## Folgen

- Testszenarien aus K1/K7 werden in Phase 2 des Arbeitszyklus (ADR 0004) zu Tests.
- Verträge aus K6 werden zu Zod-Schemas; ab dann ist das Schema maßgeblich.
- Das Cockpit hat einen Reiter „Konzept" und zeichnet Mermaid-Diagramme (lädt dafür die Mermaid-Bibliothek aus dem Netz; ohne Internet bleibt der Diagramm-Text lesbar).

## Wann neu bewerten

Wenn die Konzeptphase länger als etwa drei Wochen konzentrierter Arbeit dauert oder der Pilot wartet: Umfang weiter kürzen statt Qualität senken.
