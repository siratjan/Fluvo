# Übergabe 2026-09-23 · FA-01 abgenommen, Durchstich-Spur, K0/K3/K5-Entwürfe, Design-Team

Sitzung: Jarvis mit Sirat · Zweig `main` (kein Commit, ca. 52 geänderte/neue Dateien im Arbeitsbaum) · Vorgänger: [2026-09-22-k1-einzeldurchsicht-16-faelle-adr-0011-0012.md](2026-09-22-k1-einzeldurchsicht-16-faelle-adr-0011-0012.md)

## Erledigt

**Geprüft (von Jarvis gelesen bzw. per Stichprobe kontrolliert)**
- **Kreuzverhör FA-01** (Skill `grilling`, Runde 51): acht Punkte mit Sirat entschieden — Extra-Zutaten als bepreiste Optionen (Aufpreis je Größe), ein Notizfeld je Bestellung, strukturierte Adresse (Stockwerk, Ortsteil), Zahlungsmöglichkeit als Stammdatum je Restaurant, Ausnahme 7b „Adresse nicht auflösbar", **neuer Fall FA-24 „Bekannte Lieferorte"**, Ausnahme 9b Großbestellung (Schwelle nach Artikelanzahl), Ausnahme 13a „Anlegen scheitert" (Idempotenz je Anruf, ehrliche Absage), Sprachen DE + EN, Bestellart als Pflichtangabe statt Pflichtreihenfolge, kein zweiter Bon zur Fälligkeit einer Vorbestellung. Eingearbeitet durch `requirements-engineer`; Status FA-01 und Landkarte geprüft (Ausnahmen 2b/7b/9b/13a, 34 Testszenarien).
- **FA-01 `abgenommen`** (Sirat, Runde 52) — erster abgenommener Fall.
- **Befund A3 bereinigt:** 211 Testszenario-Labels `FA-xx-Tn` in 16 Fällen lückenlos, 6 Ausnahme-Blöcke sortiert; Stichprobe FA-13 geprüft.
- **Vorgehen geändert (ADR 0014):** „implementieren zuerst, Konzept-Artefakte fallweise nebenbei" — Durchstich-Spur Stufen 0–4. CLAUDE.md, `jarvis.md` §4b, Roadmap, Konzept-README nachgezogen (Stichprobe).
- **K0 Architekturbild** (`architect`): Diagramm, Technologie je Baustein, Durchstich-Ausschnitt, Skalierung als begründete Schätzung (erste Grenze = Voice-Kontingent/Minutenpreis, nicht der Server), Ausbauweg ohne Microservices. Zahl „120 Bestellungen/Tag" stammt aus dem Briefing, nicht aus dem Business Brain (geprüft).
- **K3 Zustandsmodell** (`requirements-engineer`) + Gegenlesen `architect` → Fehler „Storno-Recht am Zustand statt am Merkmal bezahlt" korrigiert. **Q13 entschieden (ADR 0015).**
- **K5 Datenmodell** (ER + Datenwörterbuch, 25 Tabellen) + Gegenlesen `database-reviewer` (9 fehlende Felder/Constraints, u. a. Zeitzone, Bestellnummer je Tenant, `seq` im Event-Log, Drucker-/Schicht-Zuordnung) und `compliance-guard` (Blocker: Einwilligungs-Nachweis auch bei „Nein"; E.164-Rufnummer; Notizfeld nie in Logs) → alles eingearbeitet, offene Punkte als Fragen. **Dritte Datenklasse (c) entschieden (ADR 0016).**
- Skills `fluvo-core-domain` (Piloten-Zustandskette), `fluvo-compliance` (a/b/c, Einwilligung, E.164, redact), `fluvo-multi-tenant` (tenant-agnostischer Lookup) nachgezogen; Q13 geschlossen, **Q25–Q30** neu; Stichprobe geprüft.
- **HTML-Ansicht** der Konzept-Artefakte: `tools/konzept-html/build.mjs` → `konzept.html` (10 Reiter, Mermaid gerendert, im Browser geprüft).
- **AP-014** (Monorepo-Gerüst) und **AP-015** (Kern-Durchstich) angelegt, `vorgeschlagen`, Code-Ansage steht aus.
- **Design-Team aus ECC** (MIT, zugeschnitten, Deutsch): Skills `fluvo-ui-design`, `fluvo-accessibility`, `fluvo-design-system`; Agenten `a11y-architect`, `react-reviewer`, `type-design-analyzer` — Dateien existieren; `jarvis.md` §5, CLAUDE.md Phase 4 und ADR-0001-Nachtrag ergänzt.

**Ungeprüft**
- Inhalte der sechs Design-Dateien (3 Skills, 3 Agenten — alle vorhanden) nur per Existenz kontrolliert, nicht gelesen.
- Einarbeitungen in FA-03/05/06/12/20/22 (Nachträge Runde 51), K3-/K5-Korrekturen und die ADRs 0014–0016 nur per Bericht und Grep-Stichproben kontrolliert, nicht Zeile für Zeile.
- Mermaid-Darstellung im **Cockpit** (localhost:4777) nicht angesehen — nur in `konzept.html`.
- Lesarten von Jarvis, noch nicht bestätigt: FA-20 Onboarding-Reihenfolge und Inhaber-Zugang per E-Mail-Link (steht seit gestern offen); K3 „Rückruf nötig" als Vor-Anlage-Tabelle [VORSCHLAG]; `ended_unpaid` [VORSCHLAG] bis Q3; K5 Brutto-Preise mit `tax_cents` [VORSCHLAG] bis Steuerberaterin S1.

## Entscheidungen

| Entscheidung | Runde | ADR |
|---|---|---|
| Durchstich-Spur: implementieren zuerst, Konzept fallweise; Architekturbild + K5-Ausschnitt + K3 vor dem Kern-Code; Arbeitszyklus und „Code nur auf Ansage" bleiben | 52 | **0014** |
| Reduzierte Zustandskette im Piloten (`received` → `delivered` \| `handed_over` \| `cancelled`; Merkmale statt Zustände; Storno-Recht am Merkmal „bezahlt"; kein DB-Enum) — schließt Q13 | 52 | **0015** |
| Drei Datenklassen a/b/c; Beschäftigtendaten keine (c), eigene Frist; Löschjobs tabellen-scharf; `order_customer_details` hart löschen | 52 | **0016** |
| Acht FA-01-Regeln aus dem Kreuzverhör (Optionen je Größe, Notizfeld, Adresse strukturiert, Zahlungsmöglichkeit Stammdatum, 7b, 9b, 13a, Sprachen, Pflichtangaben, kein zweiter Bon) + FA-24 | 51 | — (FA-01, FA-24, Mitschrift) |
| FA-01 abgenommen | 52 | — |
| Design-Bausteine aus ECC übernehmen | 52 | Nachtrag 0001 |

## Geänderte Dateien (die wichtigsten)

- `docs/konzept/anwendungsfaelle/FA-01-…` (abgenommen), `FA-24-bekannte-lieferorte.md` (neu), `_gespraechsnotizen-K1.md` (Runden 51–52), 16 Fälle (Labels), Nachträge in FA-03/05/06/12/20/22
- `docs/konzept/modelle/architektur.md`, `zustand-bestellung.md`, `er-durchstich.md`, `_gegenlesen-K3.md`, `_gegenlesen-K5-db.md`, `_gegenlesen-K5-compliance.md` (alle neu); `docs/konzept/vertraege/datenwoerterbuch.md` (neu); `docs/konzept/README.md` (K0-Zeile, Status K1/K3/K5)
- `docs/decisions/0014`, `0015`, `0016` (neu); Nachträge in 0001, 0006, 0007, 0014
- `docs/roadmap.md` (Durchstich-Spur), `docs/open-questions.md` (Q13 zu, Q25–Q30), `docs/arbeitspakete/README.md`, AP-003/005/007, **AP-014/AP-015 (neu)**
- `.claude/skills/fluvo-core-domain`, `fluvo-compliance`, `fluvo-multi-tenant` (nachgezogen); **neu:** `fluvo-ui-design`, `fluvo-accessibility`, `fluvo-design-system`, `.claude/agents/a11y-architect.md`, `react-reviewer.md`; `jarvis.md` §4b/§5; `CLAUDE.md`
- `tools/konzept-html/build.mjs` + `konzept.html` (neu)

## Offen / blockiert

- **Code-Ansage** für AP-014 (dann AP-015) — wartet auf Sirat; dazu: Docker Desktop vorhanden? Freigabe für Abhängigkeiten aus Briefing §4.
- **Durchgang mit Sirat** für Architekturbild, K3, K5 — noch nicht erfolgt (nur die zwei Kernentscheidungen sind gefallen). Danach Kreuzverhör und Abnahme K3/K5-Ausschnitt.
- **Anwalt (Q10):** Fragen A1–A6; **Steuerberaterin (Q2):** S1–S3 — fertig formuliert am Ende von `datenwoerterbuch.md`; Sirat leitet weiter.
- **Pilot-Fakten (Q25) am Termin 2026-09-25:** Nimmt der Fahrer Karte? Welche Sprachen rufen an? Außerdem AP-001 (Rufumleitung) → danach FA-02/03/04.
- **Q26** Optionen-/Varianten-Modell (Extra-Aufpreis je Größe) — vor `menu_options`-Migration.
- **FA-20** Lesart (Onboarding-Reihenfolge, E-Mail-Link) unbestätigt.
- Kreuzverhör der übrigen 15 durchgegangenen Fälle steht aus (nach ADR 0014 nur noch fallweise, Durchstich zuerst: FA-06 → FA-05 → FA-15).
- Briefing §5.2/§5.3 weichen jetzt von ADR 0015/0016 ab — Änderung nur auf Sirats Ansage.
- Kein Commit heute. Vor dem ersten Commit: Grep auf Pilotname und Business-Brain-Zahlen über alle 52 Dateien.

## Nächster Schritt

1. Beim Start die sechs Design-Dateien einmal lesen (Stil, Quellvermerk, keine Next.js-Reste).
2. Sirat fragen: (a) Code-Ansage AP-014, (b) Docker Desktop ja/nein, (c) Abhängigkeiten installieren ja. Bei Ja: AP-014 auf `freigegeben` → `/plan` mit `planner` → Arbeitszyklus Phase 1–6 (Gerüst: pnpm-Workspace, TS strict, Vitest, Prettier, dependency-cruiser mit Modulgrenzen-Regel, Docker-Postgres mit Rollen Eigentümer + `fluvo_app` ohne BYPASSRLS, Smoke-Test, `docs/entwicklung.md`).
3. Parallel oder danach: Architekturbild + K3 + K5 mit Sirat in je einer Runde durchgehen (`/konzept`), dann Kreuzverhör K3 und K5-Ausschnitt → `abgenommen`.
4. AP-015 erst nach AP-014 `fertig (geprüft)`; Tests zuerst aus FA-01 T1/T9/T10/T13/T14/T16 und FA-05; Schemas ↔ K5/ADR 0015/0016 vorab durch `architect` abgleichen; `type-design-analyzer` in Phase 4.
5. Nach 2026-09-25: AP-001-Ergebnis in Q1/Q4/Q15 und Q25 eintragen, FA-02/03/04 durchgehen.
6. Wenn Sirat Commit ansagt: Vertraulichkeits-Grep, dann `docs/`, `.claude/`, `tools/konzept-html/` committen (Nachricht Englisch, `docs(os): …`).
