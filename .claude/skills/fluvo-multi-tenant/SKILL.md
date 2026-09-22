---
name: fluvo-multi-tenant
description: Mandantentrennung in fluvo — tenant_id, Fastify-Middleware, PostgreSQL Row-Level-Security mit SET LOCAL, Drizzle-Muster, DB-Rollen, Zwei-Tenant-Test. Laden bei neuen Tabellen, Routen, Jobs, Webhooks oder WebSocket-Kanälen.
---

# Mandantentrennung

Doppelter Boden: Die Middleware setzt den Tenant, die Datenbank erzwingt ihn. Fällt eine Schicht aus, hält die andere.

## Die Falle: Verbindungs-Pool

Ein Pool gibt Verbindungen an den nächsten Request weiter. Ein `SET app.tenant_id = …` bleibt an der Verbindung hängen → der nächste Request eines anderen Restaurants läuft mit fremdem Tenant.

**Regel:** Tenant immer mit `SET LOCAL` (bzw. `set_config(..., true)`) **innerhalb einer Transaktion**. Am Transaktionsende verfällt der Wert automatisch.

```ts
// packages/db/src/with-tenant.ts — der einzige erlaubte Weg zur Datenbank
export async function withTenant<T>(tenantId: string, fn: (tx: Tx) => Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    await tx.execute(sql`select set_config('app.tenant_id', ${tenantId}, true)`);
    return fn(tx);
  });
}
```

Kein Code außerhalb von `packages/db` greift direkt auf `db` zu. Alles läuft über `withTenant`. Tenant-übergreifende Wartung (Löschfristen-Job, Abrechnung) bekommt eine eigene, klar benannte Funktion, die Tenant für Tenant durchläuft — keine Rolle mit `BYPASSRLS` in der Anwendung.

## Policy je Tabelle

In derselben Migration wie die Tabelle:

```sql
alter table orders enable row level security;
alter table orders force row level security;
create policy tenant_isolation on orders
  using (tenant_id = current_setting('app.tenant_id')::uuid)
  with check (tenant_id = current_setting('app.tenant_id')::uuid);
```

`current_setting` **ohne** `missing_ok`: fehlt der Tenant, schlägt die Abfrage fehl, statt alles oder nichts zu liefern. `FORCE` gilt auch für den Tabelleneigentümer.

## Rollen

- `fluvo_migrator`: Eigentümer der Tabellen, nur für Migrationen.
- `fluvo_app`: Laufzeitrolle. Kein `BYPASSRLS`, nicht Eigentümer, auf `order_events` nur `INSERT` und `SELECT`.

## Woher kommt der Tenant?

| Eingang | Quelle |
|---|---|
| Staff-PWA | Sitzung (Cookie) → Nutzer/Gerät → Tenant |
| Restaurant-Website | Host-Header → Domain-Tabelle → Tenant |
| Voice-Webhook | Signatur prüfen → Agent-/Nummern-ID des Anbieters → eigene Zuordnungstabelle |
| Zahlungs-Webhook | Signatur prüfen → Zahlungs-ID → eigene Tabelle |
| CloudPRNT | Geräte-Token → `devices` → Tenant |
| pg-boss-Job | `tenantId` im Job-Payload, vom Kern gesetzt |
| WebSocket | Sitzung beim Verbinden; Kanalname enthält Tenant, Abo serverseitig geprüft |

Nie aus einem ungeprüften Feld im Request-Body.

## Tabellenentwurf

- `tenant_id uuid not null references tenants(id)` auf jeder Tabelle.
- Eindeutigkeit je Tenant: `unique (tenant_id, phone)`.
- Indizes beginnen mit `tenant_id`.
- Fremdschlüssel möglichst zusammengesetzt `(tenant_id, order_id)`, damit eine Zeile nie auf einen fremden Tenant zeigen kann.

## Zwei-Tenant-Test (Pflicht)

Für jede neue Route und jede neue Abfrage:

1. Tenant A und B mit je eigenen Daten anlegen.
2. Als A: eigene Daten sichtbar, Daten von B nicht — Liste **und** Einzelabruf per ID von B (erwartet 404).
3. Als A: Schreiben auf eine ID von B schlägt fehl und verändert nichts.
4. Direkt auf DB-Ebene mit Rolle `fluvo_app` ohne gesetzten Tenant: Abfrage schlägt fehl.
5. Nacheinander A und B über **dieselbe** Pool-Verbindung (Pool-Größe 1 im Test): kein Überlaufen.

Tests laufen gegen echtes PostgreSQL. RLS lässt sich nicht mocken.
