# 0017 · Werkzeug-Grundlagen des Monorepos (AP-014)

- **Status:** angenommen — Umsetzung des [STACK] aus Briefing §4, **keine** Änderung des Stacks. Hält die Werkzeug-Entscheidungen aus AP-014 fest, damit AP-015 ohne erneute Werkzeug-Fragen bauen kann.
- **Datum:** 2026-09-23
- **Stufe:** [STACK] (Umsetzung des Tech-Stacks Briefing §4 — TypeScript, pnpm, Fastify, PostgreSQL + Drizzle, Zod, Vitest, dependency-cruiser)
- **Entschieden von:** Sirat (Freigaben am 2026-09-23 im Rahmen von AP-014)

## Anlass

AP-014 (Monorepo-Gerüst, `docs/arbeitspakete/AP-014-monorepo-geruest.md`) hat das Repo tragfähig für Code gemacht: pnpm-Workspace, TypeScript-Basis, Vitest, Prettier, dependency-cruiser-Modulgrenzen und eine lokale PostgreSQL mit Laufzeitrolle `fluvo_app`. Der Briefing-Stack (§4) legt die **Werkzeuge** fest, lässt aber mehrere **Umsetzungsdetails** offen (DB-Treiber, TypeScript-Nebenversion, Workspace-Auflösung, DB-Image, lokale Docker-Einrichtung). Diese Details wurden in AP-014 mit Sirat entschieden und werden hier als eigene ADR festgehalten, weil sie AP-015 und alle folgenden Bauschritte binden und sonst nur im Arbeitspaket verstreut stünden.

## Entscheidung

1. **pnpm-Workspace ohne TypeScript-Projektreferenzen.** Die Pakete (`packages/core`, `packages/schemas`, `packages/db`, `apps/api`) werden über `pnpm-workspace.yaml` und ihren Paketnamen (`@fluvo/*`) aufgelöst — **einfache Auflösung**, keine `composite`/`references`-Projektreferenzen in den `tsconfig`-Dateien.
2. **DB-Treiber `pg` (node-postgres).** Als PostgreSQL-Treiber wird `pg` genutzt, nicht ein schwererer Client. Grund: der spätere Job-Runner **pg-boss bringt `pg` ohnehin mit**, und das Briefing legt keinen Treiber fest. Drizzle läuft über denselben `pg`-Pool.
3. **PostgreSQL-Image mit PostGIS: `postgis/postgis:17-3.5`** (per Digest gepinnt, nur an `127.0.0.1` gebunden). Die fluvo-DB wird aus `template_postgis` geklont; von den PostGIS-Zusätzen bleiben nur **`plpgsql` und `postgis`** (tiger/topology/fuzzystrmatch entfernt). PostGIS wird gebraucht, weil das Liefergebiet (Regel: deterministischer Code) auf räumlichen Abfragen beruht.
4. **TypeScript 6.0.3 statt 7.** dependency-cruiser 18.4 unterstützt TypeScript 7 noch nicht; da die Modulgrenzen-Prüfung (Regel 2) nicht verhandelbar ist, wird die letzte TS-6-Reihe gefahren, bis dependency-cruiser TS 7 trägt.
5. **Docker Desktop mit WSL 2** trägt die lokale PostgreSQL für Tests (Sirats Windows-Rechner; Engine 29.8.0). DB-Tests laufen nur über `pnpm test:db` und schlagen mit klarer Meldung fehl, wenn die DB fehlt — sie werden nie stillschweigend übersprungen.
6. **`.env` und `.env.example` legt nur Sirat an.** Ein Hook verbietet Agenten das Schreiben von `.env*`; `.env.example` enthält nur Namen, `.env*` ist ignoriert (security.md).

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| **TS-Projektreferenzen** (`composite`/`references`) | inkrementelle Builds, saubere Paketgrenzen auf TS-Ebene | Mehraufwand in der Konfiguration ohne spürbaren Nutzen bei vier kleinen Paketen; Modulgrenze wird ohnehin über dependency-cruiser erzwungen (Regel 2) |
| **Schwererer/anderer DB-Treiber** (z. B. `postgres.js`) | teils schnelleres Protokoll | zweiter Treiber neben dem, den pg-boss mitbringt — mehr bewegliche Teile; kein Briefing-Grund |
| **Reines `postgres:17` ohne PostGIS**, Geo später nachrüsten | kleineres Image | Liefergebiet braucht räumliche Abfragen; PostGIS nachträglich in eine bestehende DB einzuziehen ist teurer als von Anfang an das PostGIS-Image |
| **TypeScript 7 sofort** | neueste Sprachfeatures/Performance | dependency-cruiser 18.4 trägt TS 7 nicht → Modulgrenzen-Prüfung (Regel 2) fiele aus; nicht akzeptabel |
| **Lokale PostgreSQL nativ statt Docker** | kein Docker nötig | schwerer reproduzierbar über Rechner hinweg; Rollen-/RLS-Setup wäre nicht im Repo versioniert; Docker Compose hält das Setup deterministisch |

## Folgen

- **AP-015 baut ohne Werkzeug-Fragen** auf diesem Fundament (Kern-Durchstich `createOrder`, RLS-Policies je Migration, `withTenant`, Zwei-Tenant-Tests). Offene Reste aus AP-014 (Abdeckungswerkzeug `@vitest/coverage-v8`, esbuild-Dev-Lücke via drizzle-kit) werden in AP-015 nachgezogen.
- **Versionen sind in AP-014 dokumentiert** (`docs/arbeitspakete/AP-014-monorepo-geruest.md`, Abschnitt „Versionen"); dieser ADR hält nur die *Begründungen* fest, nicht die genaue Versionsliste (die sich mit Updates ändert).
- **Keine Änderung am Briefing** — Briefing §4 bleibt gültig, hier stehen nur seine Umsetzungsdetails.
- **`docs/entwicklung.md`** beschreibt Start, Test und Prüfkette in Sirats Sprache; neue Mitarbeitende folgen ihr.

## Wann neu bewerten

- **TypeScript 7**, sobald dependency-cruiser es unterstützt (dann Punkt 4 auflösen).
- **DB-Treiber**, falls pg-boss ihn nicht mehr mitbringt oder ein Messgrund für einen anderen Treiber auftaucht.
- **PostGIS-Image/Version**, wenn PostgreSQL 18+ oder eine neuere PostGIS-Reihe ansteht (dann Digest neu pinnen) oder das Hosting-/Prod-Datenbankangebot PostGIS anders bereitstellt.
- **Workspace-Auflösung**, falls die Build-Zeiten mit wachsender Paketzahl Projektreferenzen rechtfertigen.
- **Docker/WSL 2**, wenn die Entwicklungsumgebung (anderer Rechner, CI) eine andere DB-Bereitstellung braucht.
