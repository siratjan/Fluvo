---
name: fluvo-core-domain
description: Domänenmodell des fluvo-Kerns — Bestellung als Zustandsmaschine, createOrder, Events und Outbox, Preisberechnung, Entitlements. Laden bei jeder Arbeit in packages/core oder wenn ein Modul mit Bestellungen, Status oder Events umgeht.
---

# fluvo-Kern

Der Kern ist das einzige, was Bestellungen anlegt und ihren Status ändert. Module sind Sichten darauf.

## Zustandsmaschine

```
received → in_kitchen → ready → out_for_delivery → delivered → settled
    └──────────┴──────────┴────────────┴──→ cancelled   (eigener Pfad, mit Grund und Akteur)
```

(Deutsch im Briefing: Eingegangen → In Küche → Fertig → Unterwegs → Geliefert → Abgerechnet.)

Umsetzung als einfache Übergangstabelle, keine Bibliothek:

```ts
const transitions = {
  received: ['in_kitchen', 'cancelled'],
  in_kitchen: ['ready', 'cancelled'],
  ready: ['out_for_delivery', 'cancelled'],
  out_for_delivery: ['delivered', 'cancelled'],
  delivered: ['settled'],
  settled: [],
  cancelled: [],
} as const satisfies Record<OrderStatus, readonly OrderStatus[]>;
```

Regeln:
- Nur der Server wendet Übergänge an. Clients senden Absichten („weiter zu `ready`"), keine Zustände.
- Ungültiger Übergang → abgelehnt mit klarem Fehler. Bereits angewendeter Übergang (gleicher Idempotenz-Schlüssel oder Zielstatus schon erreicht) → wirkungslos, kein Fehler. Das ist die Konfliktregel für die Offline-Warteschlange.
- Ob Storno nach `delivered` möglich ist und wie er fiskalisch läuft, ist [OFFEN] → `docs/open-questions.md`.

## Befehle und Events

Jede Änderung ist ein Befehl im Kern: `createOrder`, `advanceOrder`, `cancelOrder`, `settleShift`, … Ein Befehl
1. validiert (Zod-Schema + Domänenregeln),
2. ändert den Zustand **und** schreibt das Event in `order_events` — in **derselben Transaktion**,
3. gibt das Ergebnis zurück.

Nach dem Commit werden die Events in-process an die Module verteilt (Outbox-Muster: ein Verteiler liest unverarbeitete Events, damit nach einem Absturz nichts verloren geht). Module reagieren auf Events, z. B. `order.created` → `printing` erzeugt den Bon-Auftrag, `kitchen` zeigt an. Ein Modul ruft nie ein anderes Modul auf.

Event-Felder: `id`, `tenant_id`, `order_id`, `type`, `payload` (ohne unnötigen Personenbezug), `actor` (Nutzer, Gerät, `voice`, `system`), `idempotency_key`, `occurred_at`. Nie `UPDATE`/`DELETE`.

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
