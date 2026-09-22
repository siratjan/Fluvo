---
name: new-module
description: Legt ein neues fluvo-Modul unter packages/modules regelkonform an — Paketgerüst, erlaubte Abhängigkeiten, Anbindung über Kern-Events, Entitlement, Tests. Verwenden, wenn ein Modul erstmals angelegt wird.
---

# Neues Modul anlegen

Module sind Sichten auf den Kern. Sie hängen nur von `core`, `schemas` und `db` ab — nie voneinander.

## Vorab klären

1. Steht das Modul im Briefing (§3)? Wenn nicht: `architect` einschalten, Sirat fragen.
2. Gehört die Logik wirklich ins Modul? Alles, was Bestellstatus, Preise, Kassendaten oder Entitlements betrifft, gehört in den Kern.
3. Spricht es mit einem externen Anbieter? Dann zuerst das Adapter-Interface entwerfen.

## Gerüst

```
packages/modules/<name>/
├── package.json          name: @fluvo/module-<name>
├── tsconfig.json         erweitert die Basis-Konfiguration
└── src/
    ├── index.ts          einzige öffentliche Schnittstelle: register<Name>Module(ctx)
    ├── handlers.ts       Reaktionen auf Kern-Events
    ├── routes.ts         Fastify-Routen des Moduls (falls nötig)
    ├── providers/        Adapter für externe Anbieter (falls nötig)
    └── *.test.ts
```

`package.json` — Abhängigkeiten ausschließlich:

```json
{
  "dependencies": {
    "@fluvo/core": "workspace:*",
    "@fluvo/schemas": "workspace:*",
    "@fluvo/db": "workspace:*"
  }
}
```

Dazu nur externe Bibliotheken, die das Modul selbst braucht (z. B. das SDK seines Anbieters). Ein Eintrag `@fluvo/module-*` ist verboten; der Hook und dependency-cruiser lehnen ihn ab.

## Anbindung

```ts
export function registerKitchenModule(ctx: ModuleContext) {
  ctx.events.on('order.created', handlers.onOrderCreated);
  ctx.events.on('order.advanced', handlers.onOrderAdvanced);
  ctx.http.register(routes, { prefix: '/kitchen' });
}
```

- Lesen: über Abfragen des Kerns bzw. `withTenant`.
- Ändern: ausschließlich über Kern-Befehle (`advanceOrder`, …). Ein Modul schreibt nie direkt in `orders` oder `order_events`.
- Eigene Tabellen des Moduls: mit `tenant_id` und RLS (Skill `fluvo-multi-tenant`), Migration in `packages/db`.
- Braucht Modul A etwas von Modul B: Das ist ein Zeichen, dass die Information in den Kern gehört oder als Kern-Event fehlt.
- Jede Route und jeder Handler prüft das Entitlement (`hasEntitlement(tenant, '<name>')`). Ohne Freischaltung: Route antwortet 404, Handler tut nichts.
- Event-Handler sind idempotent — Events können nach einem Absturz erneut zugestellt werden.

## Tests

- Handler mit Kern-Events gegen echtes PostgreSQL.
- Zwei-Tenant-Test für jede Route.
- Entitlement aus → Modul wirkungslos.
- Anbieter über den Adapter durch ein Testdoppel ersetzt.

## Abschluss

`pnpm depcruise` grün, Modul in `apps/api` registriert, `docs/roadmap.md` aktualisiert.
