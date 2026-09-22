---
name: fluvo-offline-pwa
description: Offline-First für die fluvo-Staff-PWA (Annahme, Küche, Fahrer) — Service Worker, IndexedDB, Aktions-Warteschlange mit Idempotenz-Schlüsseln, Konfliktregel, WebSocket-Abgleich. Laden bei jeder Arbeit in apps/web-staff.
---

# Offline-First

Küche und Bon müssen einen Internetausfall überleben. Die PWA ist deshalb kein dünner Client: Sie hält den Arbeitsstand lokal und gleicht ihn ab.

## Bausteine

- **Service Worker** (vite-plugin-pwa / Workbox): App-Hülle vorab gecacht, damit die App ohne Netz startet. API-Antworten werden **nicht** vom Service Worker gecacht — Daten leben in IndexedDB.
- **IndexedDB:** `menu` (mit Versionsnummer), `orders` (offene Bestellungen), `outbox` (wartende Aktionen).
- **WebSocket** für Live-Updates; nach jedem Wiederverbinden ein vollständiger Abgleich der offenen Bestellungen per HTTP (verpasste Nachrichten sind normal).

## Aktions-Warteschlange

Jede schreibende Aktion — auch online — geht durch die Warteschlange. Es gibt keinen zweiten Pfad.

```ts
type QueuedAction = {
  idempotencyKey: string;   // crypto.randomUUID(), beim Auslösen erzeugt, nie neu vergeben
  type: 'order.create' | 'order.advance' | 'order.cancel' | 'delivery.complete';
  payload: unknown;         // Zod-geprüft
  createdAt: string;
  attempts: number;
};
```

Ablauf: Aktion in `outbox` schreiben → Oberfläche sofort optimistisch aktualisieren (als „wartet" erkennbar) → senden → bei Erfolg aus `outbox` entfernen und lokalen Stand durch die Serverantwort ersetzen.

Reihenfolge je Bestellung einhalten. Wiederholung mit wachsendem Abstand. Auslöser: `online`-Event, WebSocket-Verbindung, App-Start. (Background Sync ist auf iOS nicht verlässlich — nicht darauf bauen.)

## Konfliktregel

Der Server entscheidet, der Client fügt sich:
- Gleicher Idempotenz-Schlüssel schon gesehen → Server antwortet mit dem früheren Ergebnis.
- Übergang schon erreicht (zwei Geräte schalten dieselbe Bestellung weiter) → wirkungslos, Erfolg.
- Übergang ungültig (Bestellung inzwischen storniert) → Ablehnung. Die Aktion verschwindet **nicht lautlos**: Das Personal sieht einen klaren Hinweis, der lokale Stand wird auf den Serverstand gesetzt.

## Offline angelegte Bestellungen

Die Annahme legt Bestellungen offline an. Der Client vergibt eine vorläufige ID und rechnet eine **vorläufige** Summe aus der gecachten Karte, klar als vorläufig markiert. Verbindlich sind ID, Bestellnummer und Summe des Servers. Weicht der Server ab (Karte geändert), wird das angezeigt. TSE-Signatur offline: [OFFEN], siehe `docs/open-questions.md`.

## Bon-Druck ohne Internet

CloudPRNT braucht den Server. Rückfall: Druck aus der PWA direkt an den Drucker im selben WLAN (Star WebPRNT). Fallstrick: Eine per HTTPS geladene PWA darf einen Drucker unter `http://192.168…` nicht ohne Weiteres ansprechen (Mixed Content / Private Network Access). Früh mit echtem Gerät testen — siehe Skill `fluvo-printing`.

## Bedienbarkeit

Wenig technikaffines, wechselndes Personal: Ziele mind. 48 px, ein Hauptknopf je Ansicht, keine versteckten Gesten. Verbindungsstatus dauerhaft sichtbar („Offline — 3 Aktionen warten"). Küchendisplay im Kiosk-Modus: Bildschirm wach halten (Wake Lock), kein Scrollen für die wichtigsten Bestellungen. Fahrer-PWA läuft auf Privathandys — alte Geräte und schwaches Netz einplanen.

## Tests

Abläufe „Netz weg → handeln → Netz da" mit Playwright (`context.setOffline(true)`). Prüfen: alles genau einmal auf dem Server, abgelehnte Aktionen sichtbar.
