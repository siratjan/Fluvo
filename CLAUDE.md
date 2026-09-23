# fluvo — Arbeitsanweisung für Agenten

fluvo ist eine KI-gestützte Bestell- und Betriebsplattform (Cloud-SaaS) für kleine Liefer-Restaurants im DACH-Raum: KI nimmt Telefonbestellungen an, ein Kern führt jede Bestellung durch Anruf → Küche → Fahrer → Abrechnung.

**Quelle der Wahrheit:** [docs/briefing.md](docs/briefing.md). Vor jeder nicht-trivialen Aufgabe die betroffenen Abschnitte lesen. Bei Widerspruch zwischen dieser Datei und dem Briefing gilt das Briefing.

## Jarvis und der Business Brain

- **Jarvis** (`.claude/agents/jarvis.md`) ist der Generalagent und Sirats einziger Ansprechpartner. Die Hauptsitzung läuft als Jarvis (`settings.json` → `"agent": "jarvis"`). Er nimmt Arbeitspakete entgegen oder plant sie ([docs/arbeitspakete/](docs/arbeitspakete/README.md)), wählt Agenten und Skills aus, prüft und berichtet. Fachagenten reden nicht direkt mit Sirat, sie liefern an Jarvis.
- **Business Brain** (`C:\Users\sirat\Business_Brain\Business_Brain`) ist Sirats Geschäftswissen: Idee, Annahmen mit Status, Preise, Wettbewerb, Recht. Einstieg über `index.md`. Von hier aus **nur lesen** — ein Hook blockiert Schreibzugriffe. Nichts daraus nach außen geben (Websuche, Artifacts, externe Dienste, Commit-Nachrichten).

- **GitHub:** https://github.com/siratjan/Fluvo.git (`origin`, Hauptzweig `main`) ist das zentrale Repo für allen Code, die Doku und dieses Operating System. Commit und Push nur auf Sirats Ansage — siehe `.claude/rules/git.md`.

## Arbeitsmodus

- **Discovery-Phase, jetzt als Durchstich-Spur (ADR 0014, 2026-09-23):** implementieren zuerst, Konzept fallweise nebenbei — Architekturbild, K5-Ausschnitt und K3 vor dem ersten Kern-Code. Produktionscode nur, wenn Sirat es für die jeweilige Aufgabe ausdrücklich ansagt. Ohne Ansage: planen, dokumentieren, Fragen klären.
- Aktueller Bauschritt und Status: [docs/roadmap.md](docs/roadmap.md).
- Ungeklärtes steht in [docs/open-questions.md](docs/open-questions.md). **Nicht raten** — so bauen, dass beide Antworten möglich bleiben, und Sirat fragen.
- Sprache: Doku und Kommunikation Deutsch, Code und Bezeichner Englisch.

## Verbindlichkeitsstufen

- **[FEST]** = entschieden. Nicht neu diskutieren, nicht „verbessern". Berührt eine Aufgabe eine [FEST]-Entscheidung, Agent `architect` einschalten und Sirat fragen.
- **[STACK]** = Arbeitsgrundlage. Abweichen nur mit Begründung, Rückfrage und ADR in `docs/decisions/`.
- **[OFFEN]** = ungeklärt. Siehe oben.

## Die zehn Regeln, die nie gebrochen werden

1. **Modularer Monolith.** Eine Codebasis, eine DB, ein Deployment. Keine Microservices, kein Kafka, kein Redis.
2. **Modulgrenze.** `packages/modules/*` importiert nur `core`, `schemas`, `db` — nie ein anderes Modul. Module sprechen nur über Events des Kerns.
3. **Ein Eingang.** Telefon, Website und manuelle Annahme rufen denselben Kern-Befehl `createOrder` auf. Der Kern kennt keine Kanäle.
4. **Zustandsmaschine im Kern.** Nur Vorwärts-Übergänge, Storno als eigener protokollierter Pfad. Der Server entscheidet jeden Übergang.
5. **Gehirn vs. Hände.** LLM nur für Sprache und Urteil. Preise, Summen, Liefergebiet, Status, Abrechnung sind deterministischer Code.
6. **Mandantentrennung doppelt.** Jede Tabelle hat `tenant_id`; Middleware **und** Row-Level-Security. Tenant-Kontext per `SET LOCAL` in jeder Transaktion.
7. **Event-Log unveränderlich.** Auf `order_events` nie `UPDATE` oder `DELETE`. Es ist der GoBD-Audit-Trail.
8. **Kein Audio, keine Personendaten in Logs, Fehlermeldungen oder URLs.**
9. **Eine Speisekarte.** Keine zweite Kopie der Wahrheit. Der Voice-Prompt ist nur ein Cache; maßgeblich ist immer die API.
10. **Anbieter hinter Adaptern.** Voice, TSE, Zahlung, Druck, LLM sind austauschbar (`VoiceProvider`, `FiscalProvider`, …).

## Arbeitsablauf

Sirat redet mit **Jarvis**. Jarvis legt das Arbeitspaket an, wählt das Team und führt es durch den **Arbeitszyklus**. Sobald Code entsteht, sind die sechs Phasen und ihre Reihenfolge verbindlich — keine wird übersprungen:

| # | Phase | Womit | Tor zur nächsten Phase |
|---|---|---|---|
| 1 | **Planen** | `/plan` → `planner`, ggf. `architect` | Sirats Freigabe |
| 2 | **Testen zuerst** | `tdd-guide` | Tests existieren und sind rot |
| 3 | **Bauen** | Umsetzung im TDD-Ablauf; Hooks prüfen automatisch | Tests grün — nur so viel Code, wie dafür nötig ist |
| 4 | **Prüfen** | `/review` → `code-reviewer` + Wächter (`tenant-isolation-guard`, `database-reviewer`, `compliance-guard`, `security-reviewer`, `silent-failure-hunter`; bei Oberflächen zusätzlich `react-reviewer`, `a11y-architect`; bei Schemas `type-design-analyzer`) — ein zweiter Agent ohne Vorwissen | keine offenen Blocker |
| 5 | **Verifizieren** | `/verify` — Standards, Sicherheit, Abdeckung | alles grün oder Abweichung von Sirat akzeptiert |
| 6 | **Sichern** | `/handoff` → `doc-updater` — Stand festhalten, Gelerntes in Doku und Skills | AP `fertig (geprüft)` |

Zurückgehen ist erlaubt (Befund in 4/5 → zurück nach 2 oder 3), vorwärts springen nicht. Ein roter Test wird nie passend gemacht. Commit frühestens nach Phase 5 und nur auf Ansage. Details: `.claude/agents/jarvis.md` §4a.

Befehle: `/plan`, `/review`, `/verify`, `/handoff`, dazu `/durchstich-test`.

### Konzept und Code — Durchstich-Spur (ADR 0014)

Seit 2026-09-23 (ADR 0014, ersetzt „erst konzipieren, dann entwickeln" von 2026-09-18): **implementieren zuerst, Konzept-Artefakte fallweise nebenbei**. Nicht die Landkarte K1–K11 ([docs/konzept/README.md](docs/konzept/README.md)) in fester Reihenfolge abnehmen — je Durchstich-Fall entsteht, was zum Bauen nötig ist (Zustand, Schema, Vertrag, Test). Vor dem ersten Kern-Code stehen aber **Architekturbild, K5-Ausschnitt (Datenmodell) und K3 (Zustandsmodell)** als Entwürfe; die K1-Durchstich-Fälle, K3 und der K5-Ausschnitt werden abgenommen, K2/K8/K9/K10/K11 bleiben dünn und wachsen mit dem Code. **Kern-Qualität von Anfang an voll:** Zustandsmaschine, RLS, unveränderliches Event-Log. Der **Arbeitszyklus** und **„Code nur auf Ansage je AP"** bleiben unverändert. Jarvis erarbeitet die Artefakte **im Gespräch mit Sirat** (`/konzept`), `requirements-engineer` entwirft und prüft, `/council` holt vier unabhängige Stimmen zu offenen Entscheidungen. Nichts erfinden: Was nur Sirat, der Pilot, Anwalt oder Steuerberaterin wissen, wird gefragt. `abgenommen` erst nach Kreuzverhör und Sirats Ja. Keine vertraulichen Zahlen und kein Name des Piloten in den Artefakten.

## Wo was liegt

| Ort | Inhalt |
|---|---|
| `.claude/agents/` | Agenten (Planer, Reviewer, Wächter) |
| `.claude/skills/` | fluvo-Fachwissen, wird bei Bedarf geladen |
| `.claude/hooks/` | Automatische Prüfungen (Node-Skripte) |
| `.claude/rules/` | Code-Standards — vor dem Schreiben von Code lesen |
| `docs/arbeitspakete/` | Arbeitspakete (Übersicht in `README.md`, Vorlage `_vorlage.md`) |
| `docs/konzept/` | Konzept-Artefakte K1–K11 (Landkarte in `README.md`) |
| `docs/decisions/` | ADRs, eine Datei je Entscheidung |
| `docs/handoffs/` | Übergabe-Notizen je Sitzung |
| `apps/`, `packages/` | Code (Struktur siehe Briefing §5.1) |
| `tools/cockpit/` | Lokale Übersichtsseite (http://localhost:4777). Liest `docs/arbeitspakete/` und `.claude/state/events.jsonl` — AP-Dateien deshalb exakt im Format der Vorlage halten |

Regeln zum Code: @.claude/rules/typescript.md · @.claude/rules/testing.md · @.claude/rules/security.md · @.claude/rules/git.md
