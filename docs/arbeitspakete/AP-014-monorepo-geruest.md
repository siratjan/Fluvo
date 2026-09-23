# AP-014 · Monorepo-Gerüst und lokale Entwicklungsumgebung

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-23 · **Zuletzt geändert:** 2026-09-23
- **Herkunft:** Vorschlag Jarvis (Durchstich-Spur, ADR 0014, Stufe 1)
- **Roadmap-Schritt:** 1
- **Entsteht Code?** ja — Ansage von Sirat steht aus (Gerüst, kein Fachcode)
- **Phase:** —

## Ziel

Das Repo kann Code tragen: pnpm-Monorepo nach Briefing §5.1 mit den Paketen `packages/core`, `packages/schemas`, `packages/db` und `apps/api` als leere, typgeprüfte Hüllen; Tests, Typprüfung, Formatierung und die Modulgrenzen-Prüfung laufen mit einem Befehl; eine lokale PostgreSQL mit der Laufzeitrolle `fluvo_app` (ohne Eigentümerrechte, damit RLS greift) steht für Tests bereit. Danach kann AP-015 den Kern testgetrieben bauen, ohne Werkzeug-Fragen.

## Einordnung

- **Berührt:** [STACK] Tech-Stack Briefing §4 (TypeScript, pnpm, Fastify, PostgreSQL + Drizzle, Zod, Vitest, dependency-cruiser) — wird umgesetzt, nicht geändert · [FEST 1] modularer Monolith, [FEST 4] Mandantentrennung (Rollen-Setup) · [OFFEN] keine
- **Business Brain:** keine Annahme berührt (reine Technik)
- **Nicht Teil dieses Pakets:** Fachlogik, Tabellen mit Inhalt, Migrationen außer der Rollen-/RLS-Grundlage, Deployment, externe Konten

## Abnahmekriterien

- [ ] `pnpm install`, `pnpm typecheck`, `pnpm test`, `pnpm depcruise`, `pnpm format:check` laufen grün auf einem frischen Klon (Windows, Sirats Rechner)
- [ ] Paketstruktur nach Briefing §5.1: `apps/api`, `packages/core`, `packages/schemas`, `packages/db`; `packages/modules/` als leerer Ordner mit Regel
- [ ] dependency-cruiser blockiert nachweislich einen Import von `modules/*` in ein anderes Modul (ein Beispieltest, der rot wird)
- [ ] TypeScript `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, ESM — laut `.claude/rules/typescript.md`
- [ ] Lokale PostgreSQL (Docker Compose) mit Eigentümer-Rolle für Migrationen und Laufzeitrolle `fluvo_app` ohne `BYPASSRLS`; ein Smoke-Test verbindet sich als `fluvo_app`
- [ ] `.env.example` nur mit Namen, `.env*` ignoriert; keine Geheimnisse im Repo
- [ ] Eine Seite `docs/entwicklung.md`: wie man startet, testet, prüft — in Sirats Sprache

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

1. Werkzeuge: pnpm-Workspace, TypeScript-Basis-Config, Vitest, Prettier, dependency-cruiser mit der Modulgrenzen-Regel.
2. Pakete als Hüllen mit je einem trivialen Test (rot → grün), damit die Kette nachweislich läuft.
3. Docker Compose für PostgreSQL; Init-Skript legt Rollen an (Eigentümer, `fluvo_app`); Drizzle-Konfiguration; Smoke-Test.
4. `docs/entwicklung.md`; Handoff.

## Arbeitszyklus

- [ ] 1 · Planen — Plan liegt vor, **Sirat hat freigegeben** am …
- [ ] 2 · Testen zuerst — Tests geschrieben, waren rot: …
- [ ] 3 · Bauen — Tests grün, keine Hook-Blockade offen
- [ ] 4 · Prüfen — `/review` durch … (ohne Vorwissen), Blocker: keine
- [ ] 5 · Verifizieren — `/verify`: Standards · Sicherheit · Abdeckung
- [ ] 6 · Sichern — `/handoff`, Doku und Skills nachgezogen

## Braucht von Sirat

- Ansage „Code darf entstehen" für dieses Paket (angefragt 2026-09-23)
- Docker Desktop auf dem Rechner (für die lokale Datenbank) — oder Ansage, stattdessen eine lokal installierte PostgreSQL zu nutzen
- Freigabe für das Installieren der Abhängigkeiten (pnpm, TypeScript, Vitest, Drizzle, Zod, Prettier, dependency-cruiser — alle aus Briefing §4)

## Ergebnis

_Noch offen._
