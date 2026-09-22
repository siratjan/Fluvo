---
name: fluvo-voice
description: Anrufmanager KI — VoiceProvider-Adapter (Retell), Prompt-Generierung aus der Speisekarte, Function Calls, erzwungene KI-Ansage, Eskalation, Idempotenz je Anruf, Metering, Latenz- und Kostenbudget. Laden bei jeder Arbeit in packages/modules/voice.
---

# Anrufmanager KI

Voice wird gekauft, nicht gebaut. Das Modul `voice` ist ein dünner Übersetzer zwischen der Voice-Plattform und dem Kern.

## Adapter

```ts
interface VoiceProvider {
  syncAgent(tenant: TenantVoiceConfig, menuPrompt: string): Promise<void>; // Agent anlegen/aktualisieren
  verifyWebhook(rawBody: Buffer, headers: Headers): boolean;
  parseEvent(body: unknown): VoiceEvent;   // call_started | function_call | call_ended
}
```

Alles Retell-Spezifische liegt in `modules/voice/providers/retell/`. Der Kern und die übrigen Dateien des Moduls kennen nur `VoiceEvent`. Vapi dient als Diagnose-Werkzeug und bekommt bei Bedarf einen zweiten Adapter.

**Anbieter-API immer in der aktuellen Doku nachschlagen**, nicht aus dem Gedächtnis — Feldnamen und Webhook-Formate ändern sich.

## Agent-Konfiguration

- **KI-Ansage:** fester Begrüßungssatz in der Agent-Konfiguration (statische Eröffnung), nicht im frei formulierten Prompt. `syncAgent` setzt ihn bei jedem Abgleich neu; ein Test prüft, dass er gesetzt ist.
- **Aufzeichnung und Speicherung** beim Anbieter in der Konfiguration abschalten; `syncAgent` erzwingt das ebenfalls.
- **Prompt** wird je Tenant aus der Speisekarte erzeugt (kompakt: Kategorien, Artikel, Optionen, keine Romane). Auslöser: Event `menu.changed`. Mit Versionsnummer der Karte. Schlägt der Abgleich fehl: Wiederholung per Job, Hinweis im Admin-Bereich — der alte Prompt bleibt aktiv, und weil Preise und Verfügbarkeit ohnehin per Function Call geprüft werden, entsteht kein falscher Preis.
- Der Prompt ist ein **Cache**. Maßgeblich ist immer die API.

## Function Calls

| Function | Zweck | Hinweis |
|---|---|---|
| `get_customer_by_phone` | Stammkunde, letzte Adresse | Nur per Rufnummer. Keine Rufnummer übermittelt → normal weiterfragen |
| `check_menu_item` | Existenz, Verfügbarkeit, Optionen, Preis | Unscharfe Suche serverseitig, deterministisch |
| `validate_address` | Adresse auflösen, Liefergebiet prüfen | Geocoder mit Zeitlimit und Cache; kritisch für Latenz |
| `create_order` | Bestellung über den Kern-Befehl `createOrder` | Nur nach ausdrücklicher Bestätigung; Idempotenz-Schlüssel = Anruf-ID |
| `escalate_to_human` | Übergabe an Menschen | Ziel und Verhalten bei Nichtabnehmen: [OFFEN] |

Für alle: Argumente mit Zod prüfen (LLM-Ausgabe = Benutzereingabe), Antwort kurz und sprechbar, Fehler als Handlungsanweisung. Es gibt keine Function für Rabatt, Storno oder Preisänderung — die KI kann technisch nichts zusagen, was Geld kostet.

Die Summe liest die KI aus der Serverantwort vor. Sie rechnet nie selbst.

## Budgets

- **Latenz:** Gespräch unter 1 s. Serverseitig je Function Call Ziel unter 150 ms. Messen und je Aufruf protokollieren (ohne Personendaten).
- **Kosten:** bis 0,15 €/Min tragfähig, über 0,20 €/Min Preismodell anpassen. Kosten je Anruf in `voice_calls` mitschreiben.

## Webhook und Metering

Rohen Body für die Signaturprüfung aufbewahren (Fastify: eigener Content-Type-Parser für diese Route). Erst prüfen, dann verarbeiten. Tenant über die Zuordnungstabelle Agent-/Nummern-ID → Tenant.

`call_ended` → `voice_calls` (Anruf-ID eindeutig, Dauer in Sekunden, Ergebnis: bestellt / eskaliert / abgebrochen) → Stripe Meter. Doppelte Zustellung ist wirkungslos. Kein Audio, kein dauerhaftes Volltranskript.

## Datensparsamkeit

In die Voice-/LLM-Kette nur Bestellinhalt und eine pseudonymisierte Kennung. Rufnummer und Adresse nur dort, wo eine Function sie zwingend braucht.

## Telefonie

Overflow-Modus: Rufumleitung bei Nichtmelden vom Restaurant-Anschluss auf die Plattform-Nummer, An/Aus-Schalter im MVP. Fällt das Internet oder der Anbieter aus, klingelt das Telefon normal durch. Ob bei der Umleitung die Nummer des Anrufers ankommt, hängt vom Netzbetreiber ab — [OFFEN], vor dem Bau mit dem Pilot-Anschluss testen.
