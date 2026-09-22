---
name: fluvo-printing
description: Bon-Druck in fluvo — Star CloudPRNT (Drucker fragt den Server ab), Druckaufträge als Warteschlange, Bon-Layout mit QR für den Fahrer, lokaler Rückfall bei Internetausfall. Laden bei jeder Arbeit in packages/modules/printing.
---

# Bon-Druck

Keine Software im Laden: Der Drucker fragt den fluvo-Server in kurzen Abständen nach Aufträgen (Star CloudPRNT). **Protokolldetails in der aktuellen Star-Dokumentation nachschlagen**, nicht aus dem Gedächtnis.

## Ablauf

1. Event `order.created` (und ggf. `order.cancelled`) → Modul `printing` legt einen Eintrag in `print_jobs` an (Tenant, Gerät, Bestellung, Status `pending`). Kein direkter Druckaufruf.
2. Der Drucker fragt ab (POST mit Gerätestatus). Liegt ein Auftrag vor, meldet der Server „Auftrag bereit".
3. Der Drucker holt den Auftrag (GET) im ausgehandelten Format.
4. Der Drucker bestätigt (DELETE bzw. Erfolgs-/Fehlercode) → Status `printed` oder `failed`.

Erst die Bestätigung in Schritt 4 zählt als gedruckt. Ein abgeholter, aber nicht bestätigter Auftrag wird nach Zeitlimit erneut angeboten.

## Regeln

- **Idempotenz:** je Bestellung und Bon-Art genau ein Auftrag (`unique (tenant_id, order_id, kind)`). Ein doppelt verarbeitetes Event erzeugt keinen zweiten Bon. Nachdruck ist eine ausdrückliche Aktion des Personals und wird als solche protokolliert.
- **Sichtbarkeit:** Ein Auftrag, der nach N Sekunden nicht bestätigt ist, erscheint in der Annahme als Warnung („Bon nicht gedruckt — erneut drucken"). Druckerstatus (Papier leer, Deckel offen, offline) aus der Abfrage auswerten und anzeigen.
- **Geräte:** Jeder Drucker ist in `devices` registriert und authentifiziert. Er bekommt nur Aufträge seines Tenants. Mehrere Drucker je Tenant (Küche/Theke) einplanen.
- **Abfrage-Last:** Der Abfrage-Endpunkt wird sehr oft aufgerufen — eine indexierte Abfrage, keine schwere Logik, keine Personendaten im Log.

## Bon-Inhalt

Bestellnummer groß, Uhrzeit, Kanal, Positionen mit Optionen, Hinweise, Summe und Zahlart (bar/online bezahlt), Lieferadresse, Telefonnummer des Kunden nur wenn für den Fahrer nötig.

**QR-Code:** URL der Fahrer-PWA mit Bestell-ID und Token. Der Token ist zufällig, an Tenant und Bestellung gebunden, gültig bis „Geliefert". Er enthält keine Personendaten und steht nicht in Logs.

Fiskalische Pflichtangaben (TSE-Signatur, Seriennummer, Zeitstempel bzw. QR nach DSFinV-K) kommen vom Modul `fiscal` — Layout so bauen, dass dieser Block angefügt werden kann. Wann genau signiert wird: [OFFEN].

Das Layout ist eine reine Funktion `renderReceipt(order, options) → Druckdaten` — ohne Drucker testbar, mit Schnappschuss-Tests. Bonbreite (58/80 mm) und Zeichensatz (Umlaute, €) je Gerät berücksichtigen.

## Rückfall ohne Internet

CloudPRNT braucht den Server. Rückfall: Druck aus der PWA direkt an den Drucker im selben WLAN (Star WebPRNT). Bekannte Hürde: HTTPS-Seite → Drucker unter lokaler HTTP-Adresse (Mixed Content / Private Network Access). Mögliche Wege: TLS auf dem Drucker, oder Bluetooth/USB je nach Gerät. **Vor dem Bau mit echtem Drucker klären** — steht in `docs/open-questions.md`.

Im Rückfall gedruckte Bons tragen einen Hinweis, wenn die TSE-Signatur noch aussteht.
