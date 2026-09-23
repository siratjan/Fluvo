---
name: fluvo-core-domain
description: Domänenmodell des fluvo-Kerns — Bestellung als Zustandsmaschine, createOrder, Events und Outbox, Preisberechnung, Entitlements. Laden bei jeder Arbeit in packages/core oder wenn ein Modul mit Bestellungen, Status oder Events umgeht.
---

# fluvo-Kern

Der Kern ist das einzige, was Bestellungen anlegt und ihren Status ändert. Module sind Sichten darauf.

## Zustandsmaschine

Im **Piloten** (ADR 0015, reduzierte Kette): `received` ist der einzige Vor-Endzustand, die Küchen- und Fahrer-Zustände werden nicht von Hand gesetzt.

```
received → delivered      (Lieferung: Annahme drückt „geliefert", keine Zahlart im System — ADR 0008)
         → handed_over    (Abholung/Mitnehmen: am Tresen übergeben und bezahlt)
         → ended_unpaid   (nie abgeholt/nie kassiert, Pflichtgrund — [VORSCHLAG] bis Q3)
         → cancelled      (Storno-Pfad, mit Grund und Akteur)
delivered / handed_over → cancelled   (Storno aus dem Endzustand — nur Inhaber)
```

Die vollen Zustände `in_kitchen`, `ready`, `out_for_delivery`, `settled` (Briefing §5.3: Eingegangen → In Küche → Fertig → Unterwegs → Geliefert → Abgerechnet) sind **später zwischen `received` und `delivered` einschiebbar**, ohne Daten-Rückbau: Das Event-Log protokolliert Tatsachen, nicht den Graphen ([FEST 7]). Ereignisnamen bleiben bedeutungsstabil.

Umsetzung als einfache Übergangstabelle, keine Bibliothek:

```ts
const transitions = {
  received: ['delivered', 'handed_over', 'ended_unpaid', 'cancelled'],
  delivered: ['cancelled'],
  handed_over: ['cancelled'],
  ended_unpaid: [],
  cancelled: [],
} as const satisfies Record<OrderStatus, readonly OrderStatus[]>;
```

`OrderStatus` ist eine **String-Literal-Union aus dem Zod-Schema** (`packages/schemas`) plus **Textspalte** (ggf. CHECK-Constraint, per neuer Migration erweiterbar) — **kein** Postgres-`ENUM` (schwer erweiter-/umsortierbar; deckt sich mit `typescript.md` „keine enums").

„Offen" und „terminal" werden **nicht an einzelne Statuswerte gebunden** (sonst brechen Monitoring/Listen beim Einschieben neuer Zustände), sondern als abgeleitete Mengen an **einer** Stelle im Kern definiert:

```ts
const TERMINAL_STATES = ['delivered', 'handed_over', 'ended_unpaid', 'cancelled'] as const;
const OPEN_STATES = allStatuses.filter((s) => !TERMINAL_STATES.includes(s));
```

Regeln:
- Nur der Server wendet Übergänge an. Clients senden Absichten („geliefert"), keine Zustände. Die KI löst nie einen Statusübergang aus — sie ruft nur `createOrder` nach Bestätigung auf.
- Ungültiger Übergang → abgelehnt mit klarem Fehler. Bereits angewendeter Übergang (gleicher Idempotenz-Schlüssel oder Zielstatus schon erreicht) → wirkungslos, kein Fehler. Das ist die Konfliktregel für die Offline-Warteschlange.
- **Storno-Recht am Merkmal „bezahlt", nicht am Zustand:** Die Annahme storniert frei, solange **keine Zahlung erfasst und kein Endzustand** erreicht ist; sobald eine Zahlung erfasst ist **oder** die Bestellung terminal ist, storniert **nur der Inhaber**. Ein bezahltes Mitnehmen ist schon in `received` bezahlt → Storno nur Inhaber. Grund immer Pflicht. Die fiskalische Zulässigkeit von Storno und `ended_unpaid` ist [OFFEN] → `docs/open-questions.md` (Q3).

## Befehle und Events

Jede Änderung ist ein Befehl im Kern: `createOrder`, `advanceOrder`, `cancelOrder`, `settleShift`, … Ein Befehl
1. validiert (Zod-Schema + Domänenregeln),
2. ändert den Zustand **und** schreibt das Event in `order_events` — in **derselben Transaktion**,
3. gibt das Ergebnis zurück.

Nach dem Commit werden die Events in-process an die Module verteilt (Outbox-Muster: ein Verteiler liest unverarbeitete Events, damit nach einem Absturz nichts verloren geht). Module reagieren auf Events, z. B. `order.created` → `printing` erzeugt den Bon-Auftrag, `kitchen` zeigt an. Ein Modul ruft nie ein anderes Modul auf.

**Outbox getrennt:** Der Dispatch-Zustand (verarbeitet/offen) steht in einer eigenen Tabelle `event_dispatch` (`pending | dispatched`), **nicht** in `order_events` — dort wäre ein `UPDATE` verboten. `order_events` bleibt reines INSERT/SELECT.

Event-Felder: `id`, `tenant_id`, `seq` (Sequenz **je Bestellung** — bestimmt die Reihenfolge deterministisch, nie über `occurred_at` allein), `order_id` (optional — auch Ereignisse ohne Bestellbezug), `type`, `payload` (ohne Personenbezug; jedes Übergangs-Event trägt `from`/`to`), `actor` (`user:<id>`, `device:<id>`, `voice`, `system`), `idempotency_key`, `occurred_at`. Doppelte/Offline-Aktionen werden über `unique (tenant_id, idempotency_key) where idempotency_key is not null` wirkungslos. Nie `UPDATE`/`DELETE`; `fluvo_app` hat nur INSERT/SELECT.

Ereignisnamen (K3, vorläufig bis K6): `order.created`, `order.acknowledged` (menschliche Quittierung), `order.printed_unacknowledged` (2-Minuten-Notdruck — eigenes Ereignis, nicht `acknowledged`), `order.paid`/`payment.captured` (an einen Zahlungssatz gebunden, entkoppelt von der Erfüllungskante), `order.delivered`, `order.handed_over`, `order.cancelled`, `order.ended_unpaid`, `consent.recorded`, `consent.revoked`. Namen sind bedeutungsstabil (`order.delivered` = „Lieferung abgeschlossen", auch wenn später `out_for_delivery` davorsteht).

## createOrder

Ein Befehl für alle Kanäle. Eingabe enthält `channel` nur als Information fürs Event — die Logik verzweigt nicht danach.

Prüft in dieser Reihenfolge: Entitlements des Tenants → Öffnungszeiten → jeder Artikel und jede Option gegen die aktuelle Speisekarte (Existenz, Verfügbarkeit, erlaubte Kombination) → Adresse im Liefergebiet (PostGIS) → Mindestbestellwert.

Schreibt `orders` und `order_items` mit **eingefrorenen** Werten: Artikeltext, Einzelpreis, Optionen, Steuersatz. Historische Bestellungen hängen nie an der aktuellen Karte.

## Geld

- Immer Ganzzahl in Cent. Nie `number` mit Nachkommastellen, nie Gleitkomma-Arithmetik.
- Steuer je Position mit dem Steuersatz des Artikels; Rundungsregel an einer einzigen Stelle im Kern.
- Summen entstehen ausschließlich im Kern. Kein Client, kein LLM, kein Modul rechnet nach.

## Entitlements

`tenants.entitlements` (JSON, per Zod-Schema typisiert): aktive Module, KI-Paket, Minutenkontingent, Overflow-Modus. Prüfung an einer Stelle im Kern (`hasEntitlement(tenant, 'kitchen')`). Upsell = Flag umlegen, kein Code-Pfad je Paket.

## Speisekarte

Zweite Kernressource, genau eine Wahrheit. Jeder Verbraucher (KI-Prompt, Website, Bon, Küche, Abrechnung) liest über den Kern. Abgeleitete Kopien (Voice-Prompt, IndexedDB) sind Caches mit Versionsnummer der Karte und werden bei `menu.changed` neu erzeugt.
