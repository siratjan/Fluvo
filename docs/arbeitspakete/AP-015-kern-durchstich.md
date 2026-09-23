# AP-015 · Kern-Durchstich: Bestellung anlegen, Zustandsmaschine, Event-Log, Mandantentrennung

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-23 · **Zuletzt geändert:** 2026-09-23
- **Herkunft:** Vorschlag Jarvis (Durchstich-Spur, ADR 0014, Stufe 1)
- **Roadmap-Schritt:** 1
- **Entsteht Code?** ja — Ansage von Sirat steht aus
- **Phase:** —

## Ziel

Der Kern existiert als Code und ist getestet: `createOrder` nimmt eine kanalneutrale Bestellung (Lieferung/Abholung/Mitnehmen, Vorbestellung, Notiz, Optionen mit Aufpreis) entgegen, prüft gegen Speisekarte, Zone und Öffnungszeit, rechnet die Summe deterministisch in Cent, schreibt die Bestellung im Zustand `received` und ein unveränderliches `order.created`-Ereignis — alles innerhalb eines Tenant-Kontexts mit Row-Level-Security. Die Zustandsmaschine aus K3 (ADR 0015) ist als Übergangstabelle im Code, die Zod-Schemas sind die maßgebliche Form der K5-Tabellen des Ausschnitts. Danach kann das Voice-Modul (Stufe 2) `createOrder` real aufrufen.

## Einordnung

- **Berührt:** [FEST 1] Monolith · [FEST 2] Zustandsmaschine (ADR 0015) · [FEST 3] ein Eingang `createOrder` · [FEST 4] Mandantentrennung doppelt · [FEST 6/7] Event-Log append-only · [FEST 8] Preise deterministisch · [STACK] Drizzle/Zod/Vitest · [OFFEN] Q26 Options-/Varianten-Modell (so bauen, dass Aufpreis je Größe später kommt: `options_snapshot` mit `surcharge_cents`), Q3/Q2 (Storno-Fiskalik — nicht in diesem Paket), Q13 geschlossen durch ADR 0015
- **Business Brain:** keine Geschäftsannahme; Grundlage ist `@Technische Architektur` (bereits im Briefing)
- **Nicht Teil dieses Pakets:** Voice-Adapter, Function Calls, Bon-Druck, PWA, Kundenstamm/Einwilligung (kommt mit FA-02 nach AP-001), Tresen-Kassieren/Abschluss, Onboarding, Betreiber-Monitoring, TSE, Zahlung

## Abnahmekriterien

Tests zuerst (Pflichtbereiche laut `.claude/rules/testing.md`): Zustandsmaschine, Preise/Summen, `createOrder`, Mandantentrennung, Idempotenz, Event-Log.

- [ ] Zod-Schemas in `packages/schemas` für den K5-Ausschnitt: `tenants` (mit `timezone`), `menus`/`menu_categories`/`menu_items`/`menu_options`, `delivery_zones`, `opening_hours`/`closures`, `orders`, `order_items` (eingefrorene Texte/Preise, `tax_cents`, `options_snapshot` mit festem Schema), `order_customer_details` (getrennt, Klasse a), `order_events` (`seq`, `idempotency_key`), Status als Literal-Union nach ADR 0015 — keine Doppel-Typen
- [ ] Drizzle-Schema + erste Migration in `packages/db` für genau diese Tabellen: jede mit `tenant_id`, RLS-Policy in derselben Migration, zusammengesetzte FKs `(tenant_id, id)`, `unique (tenant_id, order_number)`, partieller Unique auf `idempotency_key`, Rolle `fluvo_app` nur INSERT/SELECT auf `order_events`
- [ ] `withTenant(tenantId, fn)` setzt den Tenant per `SET LOCAL` in jeder Transaktion; **Zwei-Tenant-Test** für jede Tabelle des Ausschnitts (A sieht B nicht — gegen echte PostgreSQL als `fluvo_app`)
- [ ] `createOrder(input, ctx)` in `packages/core`: kanalneutral; erwartbare Fehler als typisiertes Ergebnis (Artikel nicht verfügbar, außerhalb Liefergebiet, außerhalb Öffnungszeit, unter Mindestbestellwert nach Warenwert); Uhr und Zufall hereingereicht
- [ ] Preisrechnung als reine Funktion: Cent-Ganzzahlen, Optionen-Aufpreis, Liefergebühr der Zone, Mindestbestellwert gegen Warenwert ohne Liefergebühr (FA-01 9a), Steuerbetrag je Position, eine Rundungsstelle; Tests mit den Testszenarien aus FA-01 (T1, T9, T10, T13, T14, T16) und FA-05
- [ ] Zustandsmaschine als Übergangstabelle nach ADR 0015: erlaubte Übergänge grün, jeder Rückwärts-Übergang rot; Storno-Recht am Merkmal „bezahlt"; Merkmale (quittiert, Vorbestellung, Test) sind keine Zustände
- [ ] Idempotenz: zweiter `createOrder` mit demselben `idempotency_key` erzeugt keine zweite Bestellung (FA-01 13a / T‑Szenarien)
- [ ] `order_events`: `UPDATE`/`DELETE` als `fluvo_app` schlägt fehl (Test); `seq` lückenlos je Bestellung; Payload ohne Personendaten (Test mit Notiz und Name im Input: beides fehlt im Event)
- [ ] Kein Modul-Import in `core`; `pnpm typecheck`, `pnpm test`, `pnpm depcruise` grün
- [ ] Skills `fluvo-core-domain` und `fluvo-multi-tenant` an den gebauten Stand angepasst (Phase 6)

## Vorgaben aus AP-014

Beim Bau von AP-014 (2026-09-23) entstandene, an dieses Paket weitergereichte Auflagen. Als Checkliste beim Planen und Prüfen abzuhaken:

- [ ] Je Tabelle in **derselben Migration**: `ENABLE` + `FORCE ROW LEVEL SECURITY`, Policy mit `current_setting('app.tenant_id')` **ohne** `missing_ok`, expliziter `GRANT` nur der nötigen Rechte an `fluvo_app` (keine DEFAULT PRIVILEGES); `order_events` nur `SELECT` und `INSERT`.
- [ ] `withTenant` als **einziger** DB-Zugang; kein roher Pool-Export aus `packages/db`.
- [ ] Zwei-Tenant-Test Pflicht je Tabelle und je Abfrage; die CI/Prüfkette muss `pnpm test:db` **wirklich aufrufen** (nicht stillschweigend überspringen).
- [ ] Fastify-Logger erst mit Redaktion ohne Personendaten aktivieren.
- [ ] Abdeckungswerkzeug `@vitest/coverage-v8` einführen (aus AP-014 verschoben) — **nach Rückfrage bei Sirat** (neue Abhängigkeit).
- [ ] esbuild-Dev-Lücke (≤0.24.2, moderate, via drizzle-kit) beheben — per pnpm-`overrides` oder drizzle-kit-Update.
- [ ] drizzle-kit lädt `.env` **nicht** selbst; die Variablen müssen in der Umgebung liegen (siehe `docs/entwicklung.md`, Abschnitt 4).
- [ ] Optional: `REVOKE CONNECT` für `PUBLIC` auf den DBs `postgres` und `template_postgis`.
- [ ] Optional: Migrator-Test um `rolcreatedb` ergänzen; Positivtest „`fluvo_app` darf `spatial_ref_sys` lesen".
- Hinweis: `spatial_ref_sys` gehört `postgres`; eigene SRIDs einzutragen bräuchte den Superuser.

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | planner | Zerlegung in PR-Größe: Schemas → DB/RLS → Preisrechnung → Zustandsmaschine → `createOrder` |
| 2 | architect (kurz) | Abgleich Schemas ↔ K5/ADR 0015/0016 vor dem ersten Test |
| 3 | tdd-guide + Skills `fluvo-core-domain`, `fluvo-multi-tenant` | Tests zuerst, rot aus dem richtigen Grund |
| 4 | Umsetzung (Jarvis steuert) | nur so viel Code, dass die Tests grün werden |
| 5 | code-reviewer + database-reviewer + tenant-isolation-guard | Prüfen ohne Vorwissen |
| 6 | security-reviewer, compliance-guard | Verifizieren: Rollen, keine Personendaten in Events/Logs |
| 7 | doc-updater | Skills, Roadmap, K5/K6 („Schema ist maßgeblich") |

## Schritte

Vom `planner` zu erzeugen. Grobe Reihenfolge: Schemas (1 PR) → DB-Schema, Migration, Rollen, RLS, `withTenant`, Zwei-Tenant-Tests (1–2 PRs) → Preisrechnung (1 PR) → Zustandsmaschine (1 PR) → `createOrder` + Event-Log + Idempotenz (1–2 PRs).

## Arbeitszyklus

- [ ] 1 · Planen — Plan liegt vor, **Sirat hat freigegeben** am …
- [ ] 2 · Testen zuerst — Tests geschrieben, waren rot: …
- [ ] 3 · Bauen — Tests grün, keine Hook-Blockade offen
- [ ] 4 · Prüfen — `/review` durch … (ohne Vorwissen), Blocker: keine
- [ ] 5 · Verifizieren — `/verify`: Standards · Sicherheit · Abdeckung
- [ ] 6 · Sichern — `/handoff`, Doku und Skills nachgezogen

## Braucht von Sirat

- Ansage „Code darf entstehen" für dieses Paket (angefragt 2026-09-23) — Voraussetzung: AP-014 fertig
- Entscheidung Brutto-Preise mit `tax_cents` je Position (K5 [VORSCHLAG], Steuerberaterin S1) — bis zur Antwort so bauen, dass Netto-Umstellung eine Migration wäre, keine Neuberechnung alter Zeilen
- Q26 (Optionen-/Varianten-Modell) kann offen bleiben: `options_snapshot` friert den Aufpreis je Position ein, egal wie er später hinterlegt wird

## Ergebnis

_Noch offen._
