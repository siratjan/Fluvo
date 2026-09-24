# Übergabe 2026-09-23 · AP-014 Gerüst fertig, K3/K5 durchgegangen

Sitzung: Jarvis mit Sirat · Zweig `docs/k3-k5-abnahme` (nicht committet, 14 Dateien) · `main` = `4178d08` auf GitHub (privat) · Vorgänger: [2026-09-23-fa01-abnahme-durchstich-spur-k0-k3-k5.md](2026-09-23-fa01-abnahme-durchstich-spur-k0-k3-k5.md)

## Erledigt

**Geprüft (von Jarvis nachgeprüft: Befehle selbst ausgeführt oder Stichprobe gelesen)**
- **Konzeptstand der Vorsitzung committet:** `23e27a5` (Design-Team) und `5f87b0d` (Konzept: ADR 0014–0016, FA-01, K0/K3/K5-Entwürfe) auf `main`. Vorher geprüft: kein Pilotname, keine Geheimnisse.
- **AP-014 Monorepo-Gerüst `fertig (geprüft)`**, alle sechs Phasen des Arbeitszyklus. Commit `4178d08`, per Fast-Forward in `main` übernommen, `main` und der Feature-Zweig **erstmals nach GitHub gepusht** (Sirat hat bestätigt, dass das Repo privat ist).
  - pnpm-Workspace mit `@fluvo/core|schemas|db` und `apps/api` (nur `/health`). TS 6.0.3 strict, Vitest mit den Projekten `unit` und `db`, Prettier, LF über `.gitattributes`.
  - dependency-cruiser: Regeln `no-cross-module` und `module-allowed-deps`, beide per Gegenprobe nachgewiesen.
  - Docker Compose `postgis/postgis:17-3.5` (per Digest gepinnt, nur 127.0.0.1). DB aus `template_postgis`, installiert sind nur `plpgsql` und `postgis`. Rollen: `fluvo_migrator` ist Eigentümer, kein Superuser. `fluvo_app` hat kein BYPASSRLS, kein CREATE und NOINHERIT und ist Eigentümer von nichts.
  - Endstand: typecheck, prettier, depcruise, test 8/8, test:db 12/12, `pnpm audit --prod` 0, Frischklon grün.
  - Reviews: 3 Runden plus Verify, zusammen 9 unabhängige Prüfläufe, 0 Blocker.
  - Sirat hat vier Abweichungen akzeptiert: kein Abdeckungswerkzeug (kommt mit AP-015), kein Lint, eine Dev-Lücke in esbuild über drizzle-kit (Behebung in AP-015), Zwei-Tenant-Test in AP-015.
  - `docs/entwicklung.md` angelegt.
- **Rechner eingerichtet:** pnpm 12.6.0 über corepack in `%APPDATA%\npm` (ohne Admin), WSL 2 und Docker Desktop (Engine 29.8.0). Sirat hat `.env` (Zufallspasswörter) und `.env.example` selbst angelegt, Agenten dürfen `.env*` nicht anfassen.
- **Durchgang K3 und K5-Ausschnitt mit Sirat, Runden 53–55.** Alle Fragen an Sirat innerhalb der Durchstich-Spur sind entschieden (siehe unten). Eingearbeitet in K3, K5 (ER, Datenwörterbuch), FA-12, FA-15, FA-16 und die Mitschrift. Neue Testszenarien FA-16-T22…T25 und FA-12-T15/T16.
- **Doku zum Abschluss:** Roadmap, open-questions (Q26/27/28/31 beantwortet), ADR 0015 mit Nachträgen zu Runde 53 und 55, **ADR 0017** (Werkzeug-Grundlagen), Skills `fluvo-multi-tenant` und `fluvo-core-domain` nachgezogen. AP-015 hat die Checkliste „Vorgaben aus AP-014“.

**Ungeprüft**
- Die Einarbeitungen von Runde 53–55 in K3, K5, FA-12/15/16, ADR 0015, ADR 0017 und in die Skills sind nur über Agentenberichte und die Liste geänderter Dateien kontrolliert, nicht Zeile für Zeile gelesen.
- `.env.example`: Den Inhalt konnte kein Agent lesen. Er ist über Sirats Befehl belegt, der nur Namen schreibt.
- Die sechs Design-Dateien (Skills und Agenten aus der Vorsitzung) sind weiterhin nicht inhaltlich gelesen.

## Entscheidungen

| Entscheidung | Runde / Quelle | ADR |
|---|---|---|
| Einfache pnpm-Auflösung ohne TS-Projektreferenzen; PostGIS-Image; Treiber `pg`; TS 6 statt 7; Docker + WSL 2 | AP-014 Phase 1/3 | **0017** |
| Vier Abweichungen in Phase 5 akzeptiert (Coverage → AP-015, kein Lint, esbuild → AP-015, Zwei-Tenant-Test → AP-015) | AP-014 Phase 5 | — (AP-014 Ergebnis) |
| `delivered` ist im Piloten das Ende (kein „Abgerechnet“) | 53 | 0015 Nachtrag |
| Offene Bestellungen werden im Tagesabschluss gezeigt und einzeln bewusst beendet, kein automatischer Status | 53 | 0015 Nachtrag |
| `ended_unpaid` ist ein eigener Endzustand (Schwund ≠ Storno); fiskalisch weiter Q3 | 53 | 0015 Nachtrag |
| Aufpreis je Extra je Größe (`menu_option_variant_prices`); keine geplanten Preise | 54 | — (K5, FA-12, Q26) |
| Tagesabschluss **blockiert** bei offenen Bestellungen | 55 | 0015 Nachtrag (Q31) |
| Jeder Artikel hat mindestens eine Variante (ohne Größe: eine Standardvariante); `base_price_cents` entfällt (Regel 9) | 55 | — (K5, FA-12) |
| Brutto und `tax_cents` als Bauannahme bis zur Antwort der Steuerberaterin (S1); vor dem ersten echten Einsatz muss sie vorliegen | Jarvis-Hinweis, von Sirat zur Kenntnis genommen | — (K5) |

## Geänderte Dateien (die wichtigsten)

- **In `main` (committet):** `package.json`, `pnpm-workspace.yaml`, `tsconfig*.json`, `vitest.config.ts`, `.dependency-cruiser.cjs`, `docker-compose.yml`, `docker/postgres/init/20-fluvo-roles.sh`, `apps/api/**`, `packages/{core,schemas,db,modules}/**`, `docs/entwicklung.md`, `docs/arbeitspakete/AP-014…`, `AP-015…`
- **Auf `docs/k3-k5-abnahme` (nicht committet):** `docs/konzept/modelle/zustand-bestellung.md`, `er-durchstich.md`, `docs/konzept/vertraege/datenwoerterbuch.md`, FA-12/15/16, `_gespraechsnotizen-K1.md`, `docs/konzept/README.md`, `docs/decisions/0015…` (Nachträge), `0017…` (neu), `docs/open-questions.md`, `docs/roadmap.md`, `.claude/skills/fluvo-core-domain/SKILL.md`, diese Notiz.

## Offen / blockiert

- **Kreuzverhör und Abnahme von K3 und K5-Ausschnitt**: Sie warten auf eine Sitzung mit Sirat (Skill `grilling`). Das ist die letzte Hürde vor AP-015.
- **Durchgang Architekturbild (K0)** mit Sirat steht noch aus.
- **AP-015 Kern-Durchstich**: Er wartet auf die Abnahme von K3/K5 und auf Sirats **Code-Ansage**.
- **AP-001 Rufumleitungs-Test**: Termin beim Piloten am **Freitag, 2026-09-25**. Danach das Ergebnis in Q1/Q4/Q15/Q25 eintragen und FA-02/03/04 durchgehen.
- **Steuerberaterin**: Q3 (Storno, `ended_unpaid` fiskalisch), S1 (brutto/`tax_cents`, vor dem ersten echten Einsatz Pflicht), S2/S3. **Anwalt**: A1–A6 (Fristen).
- FA-01 9b „Rückruf nötig“ (Vor-Anlage vs. `pending_callback`) liegt außerhalb der Durchstich-Spur und ist offen.
- Commit des Zweigs `docs/k3-k5-abnahme` wartet auf Sirats Ansage.

## Nächster Schritt

1. Sirat fragen: Zweig `docs/k3-k5-abnahme` committen (Nachricht Englisch, z. B. `docs(konzept): record K3/K5 walkthrough decisions (rounds 53-55), ADR 0017`), pushen und in `main` übernehmen? Vorher den Grep auf Vertrauliches ausführen (Pilotname, €-Beträge außerhalb von Testszenarien).
2. **Kreuzverhör K3** mit Sirat über den Skill `grilling`, auf Basis von `docs/konzept/modelle/zustand-bestellung.md` (Übergangstabelle, Storno-Recht am Merkmal „bezahlt“, Notdruck, Tagesabschluss blockiert). Danach **Kreuzverhör K5-Ausschnitt** über `er-durchstich.md` und das Datenwörterbuch (Varianten und Aufpreise, eingefrorene Positionen, Datenklassen a/b/c, RLS je Tabelle). Bei Sirats Ja jeweils den Status `abgenommen` in der Datei und in `docs/konzept/README.md` setzen.
3. Danach Sirat um die Code-Ansage für **AP-015** bitten und den Arbeitszyklus ab Phase 1 (`/plan` → `planner`) starten. Die Checkliste „Vorgaben aus AP-014“ in AP-015 ist Pflicht. Tests zuerst aus FA-01 T1/T9/T10/T13/T14/T16, FA-05, FA-16-T25 und den K3-Testszenarien. `type-design-analyzer` in Phase 4.
4. Lokale DB starten mit `pnpm db:up` (Docker Desktop muss laufen), siehe `docs/entwicklung.md`.
