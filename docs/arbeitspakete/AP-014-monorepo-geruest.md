# AP-014 · Monorepo-Gerüst und lokale Entwicklungsumgebung

- **Status:** fertig (geprüft)
- **Angelegt:** 2026-09-23 · **Zuletzt geändert:** 2026-09-23
- **Herkunft:** Vorschlag Jarvis (Durchstich-Spur, ADR 0014, Stufe 1)
- **Roadmap-Schritt:** 1
- **Entsteht Code?** ja — Ansage von Sirat am 2026-09-23 (Gerüst, kein Fachcode)
- **Phase:** 6 · Sichern

## Ziel

Das Repo kann Code tragen: pnpm-Monorepo nach Briefing §5.1 mit den Paketen `packages/core`, `packages/schemas`, `packages/db` und `apps/api` als leere, typgeprüfte Hüllen; Tests, Typprüfung, Formatierung und die Modulgrenzen-Prüfung laufen mit einem Befehl; eine lokale PostgreSQL mit der Laufzeitrolle `fluvo_app` (ohne Eigentümerrechte, damit RLS greift) steht für Tests bereit. Danach kann AP-015 den Kern testgetrieben bauen, ohne Werkzeug-Fragen.

## Einordnung

- **Berührt:** [STACK] Tech-Stack Briefing §4 (TypeScript, pnpm, Fastify, PostgreSQL + Drizzle, Zod, Vitest, dependency-cruiser) — wird umgesetzt, nicht geändert · [FEST 1] modularer Monolith, [FEST 4] Mandantentrennung (Rollen-Setup) · [OFFEN] keine
- **Business Brain:** keine Annahme berührt (reine Technik)
- **Nicht Teil dieses Pakets:** Fachlogik, Tabellen mit Inhalt, Migrationen außer der Rollen-/RLS-Grundlage, Deployment, externe Konten

## Abnahmekriterien

- [x] `pnpm install`, `pnpm typecheck`, `pnpm test`, `pnpm depcruise`, `pnpm format:check` laufen grün auf einem frischen Klon (Windows, Sirats Rechner) — Frischklon-Lauf 2026-09-23 grün; zusätzlich `pnpm audit --prod` 0
- [x] Paketstruktur nach Briefing §5.1: `apps/api`, `packages/core`, `packages/schemas`, `packages/db`; `packages/modules/` als leerer Ordner mit Regel — Struktur vorhanden, `pnpm-workspace.yaml` löst alle vier Pakete auf, typecheck grün
- [x] dependency-cruiser blockiert nachweislich einen Import von `modules/*` in ein anderes Modul (ein Beispieltest, der rot wird) — Regeln `no-cross-module` und `module-allowed-deps`, beide per Gegenprobe (verbotener Import im `__fixtures__`-Ordner) nachgewiesen rot
- [x] TypeScript `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, ESM — laut `.claude/rules/typescript.md` — in `tsconfig.base.json` gesetzt, `pnpm typecheck` grün
- [x] Lokale PostgreSQL (Docker Compose) mit Eigentümer-Rolle für Migrationen und Laufzeitrolle `fluvo_app` ohne `BYPASSRLS`; ein Smoke-Test verbindet sich als `fluvo_app` — `test:db` 12/12 grün gegen `postgis/postgis:17-3.5` in Docker; Rauchtest verbindet als `fluvo_app` und prüft Rollen-Attribute
- [x] `.env.example` nur mit Namen, `.env*` ignoriert; keine Geheimnisse im Repo — git-Status zeigt `.env` ignoriert und `.env.example` getrackt; Inhalt hat Sirat mit einem Befehl angelegt, der nur Namen schreibt (Agenten dürfen `.env*` nicht schreiben)
- [x] Eine Seite `docs/entwicklung.md`: wie man startet, testet, prüft — in Sirats Sprache — vorhanden, sechs Abschnitte (Voraussetzungen, Einrichten, Prüfkette, Datenbank, Struktur, Fehlersuche)

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | planner | Schritte in PR-Größe, Reihenfolge Werkzeuge → DB → Smoke-Test |
| 2 | Umsetzung (Jarvis steuert) + Skill `fluvo-multi-tenant` | Rollen-Setup und RLS-Grundlage richtig anlegen |
| 3 | code-reviewer | Gerüst, Konfiguration, Skripte |
| 4 | security-reviewer | `.env`-Umgang, Rollen ohne BYPASSRLS, keine Geheimnisse |
| 5 | build-error-resolver | falls Typen/Lint/depcruise rot |
| 6 | doc-updater | `docs/entwicklung.md`, Roadmap |

## Schritte

Plan von `planner` (2026-09-23), sechs Schritte:

1. **Werkzeug-Fundament:** pnpm-Workspace (pnpm per corepack, Version fest), TS-Basis-Config (strict, `NodeNext`), Prettier, `.gitattributes` mit LF-Zeilenenden (Windows), `.env.example` nur mit Namen.
2. **Test-Kette:** Vitest; `pnpm test` / `typecheck` / `depcruise` / `format:check` an der Wurzel; ein Test, der erst rot und dann grün ist.
3. **Pakethüllen:** `@fluvo/core`, `@fluvo/schemas`, `@fluvo/db`, `apps/api` (Fastify, nur `/health`); je ein Test erst rot, dann grün; `packages/modules/` leer mit Regel-Hinweis.
4. **Modulgrenze:** dependency-cruiser-Regeln `no-cross-module` und „Module nur core/schemas/db“. Nachweis über einen Test-Ordner mit absichtlich verbotenem Import, den ein Vitest-Test prüft und bei dem er den Verstoß erwartet. Dieser Ordner ist von Typprüfung und normalem depcruise ausgenommen. Der Test ist rot, bevor die Regel existiert.
5. **DB und Rollen (blockiert, bis Docker installiert ist):** Docker Compose, Init-Skript mit `fluvo_migrator` (Eigentümer) und `fluvo_app` (ohne BYPASSRLS, Superuser oder CREATE-Rechte, nicht Eigentümer), Drizzle-Konfiguration ohne Tabellen. Rauchtest als `fluvo_app` mit Rollenprüfung. DB-Tests laufen nur über `pnpm test:db` und schlagen mit klarer Meldung fehl, wenn die DB fehlt. Sie werden also nicht stillschweigend übersprungen.
6. **`docs/entwicklung.md`**, Roadmap, Handoff.

Nicht in AP-014: `apps/web-staff`, `apps/site`, Fachtabellen, RLS-Policies auf Fachtabellen (→ AP-015).

## Arbeitszyklus

- [x] 1 · Planen — Plan liegt vor (2026-09-23), **Sirat hat freigegeben** am 2026-09-23 (einfache Workspace-Auflösung ohne TS-Projektreferenzen; Postgres-Image mit PostGIS; Treiber `pg`)
- [x] 2 · Testen zuerst — Tests geschrieben (tdd-guide, 2026-09-23), waren rot: 6 Unit-Tests (Pakete `@fluvo/core|schemas|db` fehlen, `apps/api` fehlt, `.dependency-cruiser.cjs` fehlt) + DB-Rauchtest (DB nicht erreichbar) — von Jarvis nachgeprüft
- [x] 3 · Bauen — Tests grün (2026-09-23, von Jarvis nachgeprüft): typecheck, test 7/7, depcruise, format:check, test:db 5/5 gegen PostGIS in Docker; Versionen aktualisiert (TS 6.0.3, da dependency-cruiser TS 7 noch nicht unterstützt)
- [x] 4 · Prüfen — Runde 1 (2026-09-23): code-reviewer, security-reviewer, database-reviewer, tenant-isolation-guard — **0 Blocker**; Auflagen: PostGIS in fluvo-DB aktivieren, Test „fluvo_app ohne DDL“, Test für Regel `module-allowed-deps`, „allows“-Test schärfen, leeres catch kommentieren, Root-devDeps, `docs/entwicklung.md`, Frischklon-Nachweis → zurück nach 2/3 · Nachbesserung erledigt (tdd-guide, Rot-Nachweise und Gegenproben je Auflage; Frischklon grün; test 8/8, test:db 8/8 — von Jarvis nachgeprüft) · Runde 2: code-reviewer (freigabefähig, 0 Befunde „sollte“), database-reviewer (0 Blocker; PostGIS-Zusätze entfernt, Tests spatial_ref_sys + Migrator-Rechte ergänzt) · Runde 3: database-reviewer — Freigabe, 0 Blocker. **Blocker: keine.**
- [x] 5 · Verifizieren — `/verify` 2026-09-23: typecheck ✅ · prettier ✅ · depcruise ✅ · test 8/8 ✅ · test:db 12/12 ✅ · `pnpm audit --prod` 0 ✅ · security-reviewer + tenant-isolation-guard (Endstand) 0 Blocker ✅ · **Abweichungen (a)–(d) von Sirat akzeptiert 2026-09-23:** (a) Abdeckungswerkzeug (`@vitest/coverage-v8`) kommt mit AP-015 nach Rückfrage, (b) kein Lint-Werkzeug und es bleibt dabei (Briefing verlangt keins), (c) 1 moderate Dev-Lücke esbuild ≤0.24.2 via drizzle-kit 0.31.11 (bereits neueste) — Behebung in AP-015 per pnpm-`overrides` oder drizzle-kit-Update, (d) Zwei-Tenant-Test mangels Tabellen Pflicht erst in AP-015
- [x] 6 · Sichern — `/handoff` 2026-09-23: `docs/entwicklung.md`, Roadmap (Schritt 0b), README, Skill `fluvo-multi-tenant` und AP-015-Vorgaben nachgezogen

## Braucht von Sirat

- ~~Ansage „Code darf entstehen"~~ — erteilt 2026-09-23
- ~~Docker Desktop installieren~~ — erledigt 2026-09-23 (WSL 2 + Docker Desktop, Engine 29.8.0)
- ~~`.env` / `.env.example` anlegen~~ — von Sirat angelegt 2026-09-23 (Agenten dürfen `.env*` nicht schreiben)
- ~~Freigabe Abhängigkeiten~~ — erteilt 2026-09-23 (pnpm via corepack + Stack aus Briefing §4)
- Nichts mehr offen.

## Ergebnis

**Entstanden (2026-09-23):** pnpm-Monorepo nach Briefing §5.1 mit den Pakethüllen `packages/core`, `packages/schemas`, `packages/db` und `apps/api` (Fastify, nur `/health`), `packages/modules/` als leerer Ordner mit Grenzregel. Werkzeug-Fundament (`package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`/`tsconfig.json`, `.prettierrc`/`.prettierignore`, `.gitattributes` mit LF, `.dependency-cruiser.cjs`, `vitest.config.ts` mit Projekten `unit` und `db`). Lokale PostgreSQL über `docker-compose.yml` und `docker/postgres/init/20-fluvo-roles.sh`. Prüfkette an der Wurzel: `pnpm typecheck`, `test`, `test:db`, `depcruise`, `format:check`, `db:up|down|reset`. Doku `docs/entwicklung.md`.

**Prüfung:** typecheck ✅, prettier ✅, depcruise ✅ (Regeln `no-cross-module` und `module-allowed-deps`, beide per Gegenprobe rot nachgewiesen), `pnpm test` 8/8, `pnpm test:db` 12/12, `pnpm audit --prod` 0, Frischklon grün. Reviews: Runde 1 (code-reviewer, security-reviewer, database-reviewer, tenant-isolation-guard), Runde 2 (code-reviewer, database-reviewer), Runde 3 (database-reviewer), Verify (security-reviewer, tenant-isolation-guard) — 0 Blocker.

**Versionen:** TypeScript 6.0.3, zod 4.6.5, drizzle-orm 0.45.3, drizzle-kit 0.31.11, vitest 5.0.1, dependency-cruiser 18.4.0, fastify 5.12.5, pg 8.23.0, prettier 3.9.9, @types/node 24, pnpm 12.6.0. DB-Image `postgis/postgis:17-3.5` (per Digest gepinnt), nur auf 127.0.0.1.

**Entscheidungen:** TypeScript 6.0.3, weil dependency-cruiser 18.4 TS 7 nicht unterstützt. PostGIS über `template_postgis` geklont (Zusätze tiger/topology/fuzzystrmatch entfernt, nur `plpgsql` und `postgis` bleiben). Treiber `pg` statt eines schwereren Clients. Einfache Workspace-Auflösung ohne TS-Projektreferenzen. Rollen: `fluvo_migrator` (Eigentümer, kein Superuser, NOBYPASSRLS), `fluvo_app` (NOSUPERUSER, NOBYPASSRLS, NOCREATEDB, NOCREATEROLE, NOINHERIT, nur CONNECT + USAGE, Eigentümer von nichts); PUBLIC-Rechte auf DB und Schema entzogen; PostGIS-Referenztabellen behalten bewusst PUBLIC-SELECT; bewusst keine DEFAULT PRIVILEGES.

**Von Sirat am 2026-09-23 akzeptierte Abweichungen:** (a) Abdeckungsmessung kommt mit AP-015 (`@vitest/coverage-v8` dort nach Rückfrage), (b) kein Lint-Werkzeug und es bleibt dabei, (c) esbuild ≤0.24.2 (moderate, nur Dev, via drizzle-kit 0.31.11 — bereits neueste) wird in AP-015 behoben, (d) Zwei-Tenant-Test Pflicht in AP-015.

**Offene Reste → AP-015:** RLS-Policies und Tabellenrechte je Migration, `withTenant` als einziger DB-Zugang, Zwei-Tenant-Tests, Abdeckungswerkzeug, esbuild-Dev-Lücke. Als Checkliste im Abschnitt „Vorgaben aus AP-014" von AP-015 festgehalten.
