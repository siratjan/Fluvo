# K5 · Datenwörterbuch für den Piloten-Durchstich

- **Status:** Entwurf — Gegenlesen DB + Compliance 2026-09-23 eingearbeitet; Durchgang mit Sirat steht aus; offene Entscheidungen: siehe Fragen · **Paket:** AP-007 · **Skill:** `konzept-vertraege`
- **Zweck:** Je Tabelle jedes Feld mit Typ, Pflicht, **Datenklasse** und Herkunft. Gehört zum ER-Diagramm ([../modelle/er-durchstich.md](../modelle/er-durchstich.md)); dort stehen Beziehungen und Kardinalitäten.
- **Maßgeblich in der Konzeptphase ist diese Datei.** Sobald Code entsteht, wird daraus ein Zod-Schema in `packages/schemas`; ab dann ist das Schema maßgeblich und diese Datei verweist nur darauf. Nie beides pflegen.

## Konventionen

- **Typen (fachlich):** `Kennung` (ID, technisch UUID) · `Text` · `Cents` (Ganzzahl in Cent, [FEST]) · `Zahl` · `Ja/Nein` · `Zeitpunkt` (UTC, [STACK]) · `Datum` · `Uhrzeit` · `Dauer` (Sekunden/Minuten) · `Status-Liste` (String-Literal-Union aus dem Schema, keine freien Strings) · `JSON`.
- **Datenklasse:** **(a)** DSGVO-löschbar · **(b)** GoBD-pflichtig, 10 Jahre, ohne Personenbezug · **(c)** betrieblich. Löschung = **ganze personenbezogene Zeile löschen** (nicht in-place pseudonymisieren), der Beleg (b) bleibt (Briefing §5.2, DB 5.2/C-Antwort 2). **Die dritte Klasse (c) weicht von Briefing §5.2 ab und ist noch nicht freigegeben → Frage an Sirat/architect (C B1), siehe Fragen.**
- **`tenant_id`** (Kennung, Pflicht) trägt **jede** Tabelle mit Verweis auf `tenants(id)`; unten nur dort einzeln genannt, wo es der Klarheit dient. Klasse folgt der Tabelle. Bei der Übersetzung wird `tenant_id not null` **und** die RLS-Policy je Tabelle in **derselben** Migration gesetzt — ausdrücklich auch in `menu_categories/items/options/variants` (DB 1.6).
- **Fremdschlüssel:** Jede `Kennung`, die auf eine andere Tabelle desselben Tenants verweist (`menu_id`, `category_id`, `item_id`, `order_id`, `customer_id`, `zone_id`, `shift_id`, `device_id`, `collected_by`, `known_place_id` …), referenziert **zusammengesetzt `(tenant_id, id)`** auf ein zusammengesetztes Unique/PK der Elterntabelle (Skill `fluvo-multi-tenant`, DB 1.1). Ausnahme: die tenant-agnostischen Lookup-Schlüssel (`devices.token_hash`, `voice_calls.provider_call_id`, `voice_agents`), die **global** eindeutig sind (DB 1.4/1.5).
- **Geld:** `Cents` (Ganzzahl). Rundung an **einer** Stelle im Kern; Währung EUR als Annahme (Single-Currency, DB 4.3).
- **Bestellzustände** werden hier **nicht** festgelegt — `orders.status` und `tenants.status` sind Platzhalter, Verweis auf **K3** ([../modelle/zustand-bestellung.md](../modelle/zustand-bestellung.md)).
- **Konkrete Löschfristen:** [OFFEN] Q10 (Anwalt). Vorläufig genannte Werte (z. B. 12 Monate) stehen unter Vorbehalt.

---

## Stammdaten

### `tenants` — Restaurant (Mandant) · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | Primärschlüssel. |
| `name` | Text | ja | c | FA-20 | Name des Restaurants. |
| `timezone` | Text | ja | c | DB 6.1 | **IANA-Zeitzone** (z. B. `Europe/Berlin`). Trägt jede Tagesgrenze, Öffnungsprüfung (`opening_hours`), Vorbestellung (`requested_time`), Annahmestopp-Ende und Tagesabschluss. Ohne sie sind diese Zeiten nicht korrekt interpretierbar. |
| `entitlements` | JSON | ja | c | [FEST 5], FA-21 | Aktive Module, KI-Paket, Minutenkontingent, Overflow-Modus. Per Zod typisiert; Upsell = Flag umlegen. |
| `status` | Status-Liste | ja | c | FA-20/21, Q13(f) | **Platzhalter → K3** (Lebenszyklus des Restaurants: in Einrichtung / startklar / gesperrt). Hier nicht festgelegt. |
| `payment_options` | Status-Liste | ja | c | FA-01 (Runde 51) | Zahlungsmöglichkeit bei Lieferung als Stammdatum: `nur_bar` \| `bar_und_karte`. Die KI sagt es in der Zusammenfassung an. *Ob der Fahrer des Piloten Karte kann → Fakt, vor Pilotstart erfragen (FA-01).* |
| `large_order_threshold` | Zahl | nein | c | FA-01 9b (Runde 51) | Schwelle „Großbestellung" als **Artikelanzahl**, je Restaurant, im Onboarding gesetzt, änderbar. |
| `pickup_time_minutes` | Zahl | nein | c | FA-17 | Abhol-Zeitwert („Abholung in ca. X Minuten"), 10er-Raster (10…60). |
| `created_at` | Zeitpunkt | ja | c | — | Anlage. |

> **Kein Feld** für Wechselgeld-Start / Anfangsbestand — Wechselgeld liegt außerhalb des Systems (ADR 0012). Steuerdaten/TSE-Einrichtung: Betreiber-Sache, im Piloten-Durchstich nicht modelliert (Q2, Q5).

### `users` — Personal · Klasse a (Beschäftigtendaten)

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | a | — | Wird von `order_events.actor`, `orders.collected_by`, `staff_shifts.user_id` als **Verweis** genutzt (der Verweis bleibt in Klasse-b-Tabellen, der Name ist a). |
| `tenant_id` | Kennung | ja | a | [FEST 4] | — |
| `role` | Status-Liste | ja | a | FA-11, K9 | `owner` \| `annahme`. Feinere Rechte (Betriebs- vs. Geldrechte) klärt K9. |
| `name` | Text | ja | a | FA-19 | Personenbezug. |
| `email` | Text | nein | a | Briefing §4 | Inhaber-Anmeldung per E-Mail-Link. |
| `pin_hash` | Text | nein | a | FA-19, Q11 | PIN nur als Hash, nie geloggt; nur mit registriertem Gerät, Rate-Limit/Sperre (Q11). |
| `active` | Ja/Nein | ja | a | FA-20, C B2 | **Deaktivieren statt löschen** (`active=false`). Ein Klasse-(a)-Löschjob darf `users` **nicht** kundenlöschen — der Löschjob läuft tabellen-/regelscharf, nie „alle (a)" (C B2). |

> **Frist offen:** Beschäftigtendaten unterliegen einer eigenen Aufbewahrung (Arbeitsrecht, § 26 BDSG), nicht der Kundenlöschung. Nicht in Runde 51 behandelt → **Frage A5 (Anwalt)**, C B3.

### `devices` — angemeldete Geräte · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `kind` | Status-Liste | ja | c | FA-14/16/20 | `annahme_tablet` \| `printer` \| `owner_phone`. |
| `name` | Text | nein | c | FA-20 | Anzeigename. |
| `token_hash` | Text | ja | c | Security-Regel, Q11, DB 1.4 | Geräte-Token nur als Hash, ≥128 Bit, an Tenant/Zweck gebunden, ablaufend, **nie geloggt**. **Global eindeutig** — CloudPRNT löst darüber Token→Gerät→Tenant auf, **bevor** ein Tenant gesetzt ist; dieser Lese-Pfad ist eine benannte, tenant-agnostische Funktion, die den Tenant ableitet und dann `withTenant` betritt (kein `BYPASSRLS`). |
| `last_seen_at` | Zeitpunkt | nein | c | FA-14 (ADR 0013) | Grundlage der Offline-Erkennung: ist das Annahme-Gerät zu lange weg, pausiert der Server die KI. Schwelle → K8. |
| `registered_at` | Zeitpunkt | ja | c | FA-20 | Registrierung (auch Inhaber-Handy, Q11). |

### `voice_agents` — Zuordnung Voice-Anbieter → Restaurant · Klasse c

> **Neu (DB 1.5).** Der eingehende Voice-Webhook muss den Tenant auflösen, **bevor** ein `voice_calls`-Satz existiert. Ohne diese Zuordnungstabelle kann der Webhook den Tenant nicht bestimmen (Skill `fluvo-multi-tenant` nennt „eigene Zuordnungstabelle"). (Auch als `phone_numbers` denkbar, falls die Rufnummer der Schlüssel ist.)

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `provider_agent_id` | Text | ja | c | DB 1.5 | Anbieter-Agent-/Nummern-ID. **Global eindeutig** (tenant-agnostischer Lookup, kein `BYPASSRLS`). |
| `phone_number` | Text | nein | c | DB 1.5, Briefing §6 | Einlaufende Rufnummer, **E.164-normalisiert**, falls sie der Schlüssel ist. **Global eindeutig.** |

---

## Speisekarte

### `menus` — die eine Karte · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | Genau eine je Tenant ([FEST 3]) — als `unique (tenant_id)` erzwungen, nicht nur als Prosa (DB 1.3). |
| `version` | Zahl | ja | c | FA-12, [FEST 9] | Erhöht sich bei Änderung; Voice-Prompt und Offline-Cache sind Caches mit dieser Version. |
| `updated_at` | Zeitpunkt | ja | c | FA-12 | — |

### `menu_categories` — Rubriken · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `menu_id` | Kennung | ja | c | FA-12 | Verweis auf `menus`. |
| `name` | Text | ja | c | FA-12 | z. B. „Pizza". |
| `sort_order` | Zahl | nein | c | FA-12 | Reihenfolge. |

### `menu_items` — Gerichte · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `category_id` | Kennung | ja | c | FA-12 | — |
| `name` | Text | ja | c | FA-12 | Wird bei Bestellung in `order_items` **eingefroren**. |
| `description` | Text | nein | c | FA-12 | — |
| `base_price_cents` | Cents | ja | c | FA-12 (Runde 47) | **Pflicht** — ohne Preis wird kein Artikel angelegt. |
| `tax_rate` | Status-Liste | ja | c | Briefing §5.2, FA-12 | Steuersatz je Artikel (LMIV/Steuer). Nur Inhaber ändert, mit Warnung + Protokoll. Wertliste offen (Steuersätze DE). |
| `allergens` | JSON | nein | c | Briefing §5.2, FA-12 | Allergen-Kennzeichnung (LMIV). Änderung nur Inhaber, mit Warnung + Protokoll. |
| `available` | Ja/Nein | ja | c | FA-12 (B12) | „momentan aus" = `false`. Kein automatisches Zurücksetzen; von Hand wieder einschalten. |
| `price_valid_from` | Datum | nein | c | FA-12 (Runde 47) | „gültig ab" — Datum ohne Uhrzeit, wirkt ab Tagesbeginn. **Künftig geplanter Preis → offen (siehe Fragen).** |
| `sort_order` | Zahl | nein | c | FA-12 | — |

### `menu_options` — bepreiste Extras · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `item_id` | Kennung | ja | c | FA-12 | Extra zu einem Gericht (z. B. „extra Zwiebeln"). |
| `name` | Text | ja | c | FA-01/FA-12 (Runde 51) | — |
| `surcharge_cents` | Cents | ja | c | FA-12 (Runde 51) | Aufpreis. **Größen-/variantenabhängig → offen (siehe Fragen):** ob dieser Wert je Variante existiert oder eine Regel gilt. Der **Server** rechnet den Aufpreis. |

### `menu_item_variants` — Größen/Varianten · Klasse c · **OFFEN**

> Nur Platzhalter. Ob und wie Varianten (z. B. „klein"/„groß") modelliert werden, ist **nicht entschieden** (FA-12 Runde 51). Vorschlag-Felder: `id`, `item_id`, `name`, `price_cents`. Der variantenabhängige Extra-Aufpreis (`menu_options`) hängt daran. → siehe Offene Fragen.

---

## Liefergebiet und bekannte Orte

### `delivery_zones` — Lieferzonen · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `name` | Text | ja | c | FA-17 (B18) | Zone als **Ortsteil/Stadtteil**, nicht als gezeichnete Fläche. Zuordnung Adresse→Ortsteil per Geocoder (Q6). |
| `delivery_time_minutes` | Zahl | nein | c | FA-17 | Lieferzeit, **15er-Raster** (15…120). Fehlt sie: KI nennt „ca. eine Stunde" + Hinweis an die Annahme (nie still). |
| `delivery_fee_cents` | Cents | nein | c | FA-17 | Liefergebühr. Fehlt sie: kein Standard, KI übergibt an Mensch (FA-03). |
| `min_order_cents` | Cents | nein | c | FA-17 (B17) | Mindestbestellwert auf den **Warenwert** (ohne Liefergebühr). Fehlt er: kein Standard, KI übergibt. |

> Geometrie/PostGIS-Grenzen der Zone: **offen** (Q6), im Durchstich nicht als Feld modelliert.

### `known_delivery_places` — bekannte Lieferorte · Klasse a

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | a | — | — |
| `zone_id` | Kennung | ja | a | FA-24 | Ort trägt seine Zone; KI übernimmt sie bei einem Treffer. |
| `name` | Text | ja | a | FA-24 | z. B. „Firma Soundso". **Kann Personenbezug tragen.** |
| `driver_hint` | Text | nein | a | FA-24, C B10 | Fahrer-Hinweis („Tor 2, beim Pförtner"), steht auf dem Bon. Kann Namen enthalten. Gelangt **nie** in `order_events`, Logs, Sentry, URLs oder an den Voice-Anbieter (in `redact`-Liste). |
| `street` … `city_district` | Text | nein | a | FA-24 | Optionale Adresse. |
| `last_used_at` | Zeitpunkt | nein | a | C B9 | **Vorschlag:** Nutzungszeitpunkt als Ansatz für eine Löschfrist — sonst hat der Löschjob (kein Rufnummern-Bezug) nichts, woran er greift. Ob Stammdatum mit manueller Pflege oder Frist über `last_used_at` → Frage A3. |
| `created_by` | Kennung | ja | a | FA-24 | Inhaber oder Annahme (Anlegen). Wer ändern/entfernen darf → K9, offen (FA-24). |

> **Löschfrist/Datenklasse offen** (C B9, Q10) → **Frage A3 (Anwalt)**. Hier vorläufig (a). Nur beim eigenen Restaurant sichtbar ([FEST 4]).
> **Betroffenenrechte (C B8):** `known_delivery_places` hat **keinen** Rufnummern-Bezug — Auskunft/Löschung müssen diese Tabelle über Namens-/Freitextsuche ausdrücklich erfassen (Suche als POST, nie in URLs/Logs).

---

## Öffnungszeiten und Annahmestopp

### `opening_hours` — Zeitfenster · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `weekday` | Zahl | ja | c | FA-18 | 0–6. **Mehrere Zeilen je Tag** (Mittagspause). |
| `open_time` | Uhrzeit | ja | c | FA-18 | — |
| `close_time` | Uhrzeit | ja | c | FA-18, FA-23 | Ladenschluss = auch Ende eines Annahmestopps und Bestellschluss (kein eigenes Bestellschluss-Feld, Runde 29). |

### `closures` — Ruhetage / Urlaub / Feiertage · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `date_from` / `date_to` | Datum | ja | c | FA-18 (Runde 29) | Auch einzelne Tage. |
| `kind` | Status-Liste | ja | c | FA-18 | `ruhetag` \| `urlaub` \| `feiertag` \| `sonderzeit`. |
| `special_open` / `special_close` | Uhrzeit | nein | c | FA-18 | Bei abweichenden Zeiten statt vollständiger Schließung. |
| `note` | Text | nein | c | FA-18, C B4 | **Keine Personendaten** — betrieblicher Freitext, per Bedienführung/Validierung abgesichert und in der `redact`-Liste (C B4). |

### `acceptance_stops` — Annahmestopp · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `scope` | Status-Liste | ja | c | FA-23 (Runde 30) | `no_delivery` („keine Lieferung mehr", Abholung geht) \| `everything` („gar nichts mehr"). |
| `set_by` | Kennung | ja | c | FA-23 | Annahme oder Inhaber (Betriebsrecht). Verweis auf `users`. |
| `set_at` | Zeitpunkt | ja | c | FA-23 | Für Monitoring FA-22 („aktiv seit …"). |
| `auto_end_at` | Zeitpunkt | ja | c | FA-23 (Runde 42) | Automatisches Ende beim Ladenschluss des Tages. |
| `ended_at` / `ended_by` | Zeitpunkt / Kennung | nein | c | FA-23 | Manuelles Ende. |

---

## Kunden (Stammdaten, nur mit Einwilligung)

### `customers` — Stammkunde · Klasse a

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | a | — | — |
| `phone` | Text | ja | a | FA-01, [FEST 15], C B7 | **Schlüssel je Tenant** (`unique (tenant_id, phone)`). **E.164-normalisiert** (Zod), sonst matchen „030…"/„+49 30…" nicht und Betroffenenrechte greifen nicht (C B7, Briefing §6). |
| `name` | Text | nein | a | FA-01 | — |
| `consent` | Ja/Nein | ja | a | FA-01 (Weg B, ADR 0007) | **Nur der Ist-Zustand** der Einwilligung „Adresse merken". Nur bei `true` existiert dieser Eintrag überhaupt. Der **Nachweis** (auch „Nein" und Widerruf) liegt append-only in `order_events` (`consent.recorded`/`consent.revoked`), nicht hier (C B5/B6). |
| `consent_logged_at` | Zeitpunkt | ja | a | FA-01 | Zeitpunkt der Einwilligung; der prüffähige Nachweis steht append-only in `order_events`, **kein Audio** ([FEST 13]). |
| `last_order_at` | Zeitpunkt | nein | a | FA-01, Q10 | Steuert die Löschfrist (**vorläufig 12 Monate** nach letzter Bestellung, Anwalt-Vorbehalt A2). |

> **Löschung:** ganzer Eintrag samt Adressen entfällt nach Frist. Auskunft/Export/Löschung per **E.164-Rufnummer** (Briefing §6); die Suche läuft als POST, nie in URLs/Logs.
> **Einwilligungs-Nachweis (append-only, C B5/B6):** Sowohl „Ja" als auch „Nein" und ein späterer Widerruf werden als `order_events`-Ereignis festgehalten — `consent.recorded` mit **Fragetext-Version**, Antwort **Ja/Nein**, Bezug (order/call), `occurred_at`, `actor`, **ohne Name/Rufnummer/Audio**; `consent.revoked` beim Widerruf mit Folge „Kundeneintrag löschen" (ADR 0007 §K5, FA-01 T5, Art. 7 Abs. 3 DSGVO).

### `customer_addresses` — gemerkte Adresse(n) · Klasse a

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | a | — | — |
| `customer_id` | Kennung | ja | a | FA-01 | — |
| `street` / `house_number` / `postal_code` | Text | ja | a | FA-01 (Runde 51) | Strukturiert. |
| `city_district` | Text | nein | a | FA-01 (Runde 51) | Ort/Ortsteil als **eigenes Feld** (nicht Notiz). |
| `floor` | Text | nein | a | FA-01 (Runde 51) | Stockwerk, optional, **eigenes Feld**. |
| `known_place_id` | Kennung | nein | a | FA-24 | Statt Adresse ein bekannter Lieferort (Stammkunde kann Ort hinterlegt haben). |

---

## Bestellung

### `orders` — Bestellung (ohne Personenbezug) · Klasse b

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | b | — | — |
| `order_number` | Text | ja | b | FA-06, DB 1.2 | Bestellnummer, auf dem Bon. **`unique (tenant_id, order_number)`**, Vergabe per **je-Tenant-Zähler** — nie globaler Serial (verrät Fremdvolumen). |
| `order_type` | Status-Liste | ja | b | FA-01/05 (ADR 0010) | `delivery` \| `pickup` \| `takeaway`. „Hier essen" ist im Piloten gestrichen (läuft über die bestehende Kasse). |
| `status` | Status-Liste | ja | b | [FEST 4] | **Platzhalter → K3.** Hier **nicht** festgelegt (inkl. benannter Enden „nie abgeholt", „nicht zustellbar", Merkmal „quittiert"). |
| `is_preorder` | Ja/Nein | ja | b | FA-01 3b | Vorbestellung, auch auf dem Bon gekennzeichnet. |
| `requested_time` | Zeitpunkt | nein | b | FA-01/05 | Wunschzeit bei Vorbestellung; nur gegen Öffnungsfenster geprüft. |
| `is_test` | Ja/Nein | ja | b | FA-20 (B20) | Testbestellung — aus Zählung/Kasse ausgeblendet. Ob eine Testbestellung an die TSE darf → **Frage S2 (Steuerberaterin)**, C B13 / Q2. |
| `channel` | Text | ja | b | createOrder | `voice` \| `manual` — nur Information fürs Event, Logik verzweigt nicht danach ([FEST 3]). |
| `acknowledged` | Ja/Nein | ja | b | FA-06 (Runde 34/35) | Quittiert? KI-Bestellung druckt erst nach Quittierung (2-Min-Notdruck); Handannahme gilt als direkt quittiert. Ob eigener Zustand oder Merkmal → K3. |
| `delivery_zone_id` | Kennung | nein | b | FA-17 | Zone der Lieferung (bei `delivery`). |
| `subtotal_cents` | Cents | ja | b | FA-01/17 | **Warenwert** (Artikel ohne Gebühr) — Basis der Mindestbestellwert-Prüfung. Server rechnet ([FEST 8]). |
| `delivery_fee_cents` | Cents | nein | b | FA-17 | Liefergebühr (bei Lieferung). Außerhalb aller Zonen von Hand (FA-05). |
| `total_cents` | Cents | ja | b | FA-01 | Gesamtsumme. Server rechnet. |
| `payment_method` | Status-Liste | nein | b | ADR 0008, FA-15 | **Im Piloten für Lieferungen leer** (kein Bar-Eingang, ADR 0008); am Tresen `bar` \| `gutschein` \| `teilzahlung`. Feld von Anfang an vorhanden. |
| `driver_id` | Kennung | nein | b | ADR 0008 | **Im Piloten leer** — Fahrer-Zuordnung kommt mit der Fahrer-App. Feld von Anfang an vorhanden. |
| `collected_by` | Kennung | nein | b | FA-15/16 | Kassierende Person am Tresen (Verweis `users`). Grundlage des Abschlusses je Mitarbeiter. |
| `shift_id` | Kennung | nein | b | FA-16, DB 7.2 | Schicht, in der kassiert wurde (Verweis `staff_shifts`). Macht den Abschluss je Mitarbeiter zu `sum … where shift_id = X` — **kein Zeitfenster-Join**, sauber indizierbar. |
| `collected_at` | Zeitpunkt | nein | b | FA-16, DB 7.2 | Zeitpunkt des Kassierens am Tresen (Fallback/Prüfung, wenn `shift_id` fehlt). |
| `collected_cash_cents` | Cents | nein | b | FA-15/16 | Bar kassierter Anteil am Tresen. Summe je Person/Schicht = Soll im Abschluss. |
| `collected_voucher_cents` | Cents | nein | b | FA-15 (Runde 29/31) | Per Papier-Gutschein beglichener Anteil — zählt **nicht** ins zurückzugebende Bargeld. Keine Gutschein-Verwaltung. |
| `created_at` | Zeitpunkt | ja | b | createOrder | — |

> **Kein Personenbezug in `orders`** (Klasse b). Name, Rufnummer, Adresse und Notiz stehen in `order_customer_details` (a), damit die Löschung dort greift und der Beleg bleibt.
> **Modellhinweis ([STACK]):** Die `collected_*`-Felder ersetzen im Piloten eine generische `payments`-Tabelle (Teilzahlungen je Zahlart, Karte, online, Fahrer) — die kommt später (K6, Q2).

### `order_customer_details` — Personendaten einer Bestellung · Klasse a

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `order_id` | Kennung | ja | a | — | 1:1 zu `orders` (Primär- und Fremdschlüssel). |
| `customer_id` | Kennung | nein | a | FA-01, DB 5.2 | Verweis auf Stammkunde, falls vorhanden. **`ON DELETE SET NULL`**, wenn der Stammkunde nach Frist entfällt. |
| `contact_name` | Text | ja | a | FA-01 (Runde 15) | KI fragt immer nach dem Namen. |
| `contact_phone` | Text | nein | a | FA-01 (Runde 15), C B8 | Steht auf dem Bon (Fahrer braucht sie), **E.164-normalisiert**. Fehlt sie beim Anruf, fragt die KI nach. Kann **ohne** `customers`-Zeile existieren (Kunde sagte „Nein") — Auskunft/Löschung per Rufnummer müssen daher direkt über dieses Feld greifen, nicht nur über `customers` (C B8). |
| `note` | Text | nein | a | FA-01 (Runde 51), C B10 | **Freies Notizfeld je Bestellung** — Anweisung an Küche/Fahrer, steht auf dem Bon. Reine Weitergabe, **keine** kostenpflichtigen Wünsche. Kann Namen Dritter oder Gesundheitsdaten (Art. 9) enthalten: **nie** in `order_events`, Logs, Sentry, URLs oder an den Voice-Anbieter (in `redact`-Liste); nur Bon + Küche/Fahrer. Die KI **erfragt keine Gesundheitsdaten** aktiv (K4). Länge → K8. LLM-Ausgabe ist Daten, keine Anweisung. Behandlung genannter Gesundheitsdaten → **Frage A4 (Anwalt)**. |
| `delivery_street` / `_house_number` / `_postal_code` | Text | nein | a | FA-01 (Runde 51) | Strukturierte, **eingefrorene** Lieferadresse (nur `delivery`). |
| `delivery_city_district` | Text | nein | a | FA-01 (Runde 51) | Ort/Ortsteil, eigenes Feld. |
| `delivery_floor` | Text | nein | a | FA-01 (Runde 51) | Stockwerk, eigenes Feld. |
| `known_place_id` | Kennung | nein | a | FA-24 | Statt Adresse ein bekannter Lieferort. |

> **Löschung (DB 5.2, C-Antwort 2):** Diese Zeile wird nach Frist (Q10) **ganz gelöscht** (nicht in-place pseudonymisiert — `contact_name` ist NOT NULL); `orders`, `order_items`, `order_events` bleiben als Beleg (Briefing §5.2). Ein **Bon-Nachdruck nach der Löschung** zeigt Bestellung, Positionen und Summen, **ohne** Name/Adresse/Telefon (Belegfunktion, DB 5.3).
> **Achtung Papier:** Das gedruckte Stations-Exemplar des Liefer-Bons trägt dieselben Personendaten und liegt **außerhalb** dieser Löschung → Q20 (Aufbewahrung/Vernichtung, Einweisung FA-20).

### `order_items` — Positionen (eingefroren) · Klasse b

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | b | — | — |
| `order_id` | Kennung | ja | b | FA-01 | — |
| `item_name_snapshot` | Text | ja | b | §5.2 | **Eingefrorener** Artikeltext — hängt nie an der aktuellen Karte. |
| `quantity` | Zahl | ja | b | FA-01 | — |
| `unit_price_cents` | Cents | ja | b | §5.2, DB 4.1 | **Eingefrorener** Einzelpreis. **[VORSCHLAG] brutto** (Gastro-üblich). Brutto/Netto-Festlegung ist eine Steuerberaterin-Frage → **S1**. |
| `tax_rate` | Status-Liste | ja | b | §5.2 | **Eingefrorener** Steuersatz. |
| `tax_cents` | Cents | nein | b | DB 4.1 | **[VORSCHLAG]** Enthaltener USt-Betrag je Position, damit die Steuer-Aufteilung je Satz für Beleg/GoBD/DSFinV-K nachrechenbar ist — oder deterministisch aus `unit_price_cents` + `tax_rate` + Rundungsregel reproduzierbar. Vor der ersten (unveränderlichen) Zeile festlegen → **S1**. |
| `options_snapshot` | JSON | nein | b | FA-01/12 (Runde 51), DB 4.2 | Gewählte Extras/Variante mit **eingefrorenem** Aufpreis (vom Server gerechnet). **Festes Zod-Schema:** je Eintrag `name` (Text) + `surcharge_cents` (Cents), sodass `line_total = (unit_price + Σ surcharge) × quantity` prüfbar bleibt (DB 4.2). |
| `line_total_cents` | Cents | ja | b | FA-01 | Positionssumme. |

### `order_events` — Ereignisprotokoll (append-only) · Klasse b

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | b | — | — |
| `seq` | Zahl | ja | b | DB 2.1 | **Sequenz je Bestellung** (`bigint`/`BIGSERIAL` oder `order_seq`). Bestimmt die Reihenfolge deterministisch — **nie** über `occurred_at` allein (zwei Events mit gleichem Zeitstempel). |
| `order_id` | Kennung | nein | b | [FEST 7] | Optional — auch Ereignisse ohne Bestellbezug (z. B. Kassenabschluss, Menü-Änderung, Einwilligung ohne Order). |
| `type` | Status-Liste | ja | b | K6 | Ereignisart; Katalog in **K6**. Vorläufig: `order.created`, `order.acknowledged`, `order.changed`, `order.cancelled`, `counter.shift_settled`, **`consent.recorded`, `consent.revoked`** … |
| `payload` | JSON | nein | b | Skill `konzept-vertraege` | **Ohne Personendaten** — nur IDs und betriebliche Werte. Storno-Grund ist eine Kategorie, kein Freitext mit Personenbezug. Beim Einwilligungs-Nachweis: **Fragetext-Version**, Antwort **Ja/Nein** — **ohne Name/Rufnummer/Audio**. |
| `actor` | Text | ja | b | fluvo-core-domain, DB 2.4 | Reine ID: `user:<id>` \| `device:<id>` \| `voice` \| `system`. Für das Inhaber-Log (wer, was, wann). **Kein FK** (Referenzintegrität bewusst nicht erzwungen — für Klasse b als reine ID akzeptabel). |
| `idempotency_key` | Text | nein | b | fluvo-core-domain, DB 2.2 | Doppelte/Offline-Aktionen (FA-01 13a, doppelte Quittierung FA-06 4c) werden wirkungslos. **Partieller Unique:** `unique (tenant_id, idempotency_key) where idempotency_key is not null`. |
| `occurred_at` | Zeitpunkt | ja | b | — | — |

> **Nie `UPDATE`/`DELETE`.** Laufzeitrolle `fluvo_app` hat auf dieser Tabelle nur `INSERT`/`SELECT`.
> **Outbox getrennt (DB 2.3):** Der In-Process-Verteiler markiert verarbeitete Events **nicht** hier (das wäre ein verbotenes `UPDATE`), sondern in `event_dispatch` (siehe unten). `order_events` bleibt reines INSERT/SELECT.

### `event_dispatch` — Verteil-/Verarbeitet-Zustand · Klasse c

> **Neu (DB 2.3).** Hält je Event den Dispatch-Zustand des In-Process-Verteilers (Outbox-Cursor), damit `order_events` append-only bleibt.

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `event_id` | Kennung | ja | c | DB 2.3 | Verweis auf `order_events(id)` (zusammengesetzt `(tenant_id, id)`). |
| `status` | Status-Liste | ja | c | DB 2.3 | `pending` \| `dispatched`. Hier ist `UPDATE` erlaubt (nicht die append-only-Tabelle). |
| `dispatched_at` | Zeitpunkt | nein | c | DB 2.3 | — |

---

## Anruf, Bon, Schicht, Abschluss

### `voice_calls` — KI-Anruf (kein Audio) · Klasse b

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | b | — | — |
| `provider_call_id` | Text | ja | b | §5.4, DB 1.4 | ID des Voice-Anbieters (Zuordnung, Webhook). **Global eindeutig** — Webhook-Auflösung vor gesetztem Tenant (tenant-agnostischer Lookup, kein `BYPASSRLS`). **Nie in URLs/Logs.** |
| `duration_seconds` | Dauer | ja | b | §5.4, §2.21 | Sekundengenaues Metering → Stripe Meter. |
| `started_at` / `ended_at` | Zeitpunkt | ja | b | §5.4 | — |
| `outcome` | Status-Liste | ja | b | FA-01 | `order_created` \| `escalated` \| `no_order`. |
| `idempotency_key` | Text | ja | b | FA-01 13a (Runde 51), DB 3.1 | **Eindeutiger Schlüssel je Anruf** (`unique`) — Wiederholung erzeugt keine zweite Bestellung (K6). |
| `order_id` | Kennung | nein | b | FA-01 | Falls eine Bestellung entstand. Während der Frist ist ein Anruf mittelbar re-identifizierbar (über `order_customer_details`); nach Löschung bricht die Kette — der aufbewahrungspflichtige Teil ist der personenfreie Metering-Fakt (C B12). |

> **Kein Audio, kein Volltranskript, keine Rufnummer hier** ([FEST 13], §5.4). Aufbewahrungsfrist der personenfreien Metadaten → **Frage A6 (Anwalt)**, C B12 / Q10.

### `print_jobs` — Bon-Druckauftrag · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `order_id` | Kennung | ja | c | FA-06 | — |
| `device_id` | Kennung | ja | c | FA-06, DB 7.1 | **Ziel-Drucker.** Ohne ihn kann das CloudPRNT-Polling (alle paar Sekunden je Drucker) seine offenen Aufträge nicht filtern; bei mehreren Druckern (Station/Tresen) nicht zustellbar. Index `(tenant_id, device_id, status) where status='pending'`. |
| `bon_type` | Status-Liste | ja | c | FA-06 | `initial` \| `changed` (deutlich „GEÄNDERT") \| `reprint` (Nachdruck von Hand). |
| `copy_label` | Status-Liste | ja | c | FA-06 (ADR 0008) | `station` \| `fahrer_kunde` (bei Lieferung zwei) \| `single` (Abholung/Mitnehmen). |
| `status` | Status-Liste | ja | c | FA-06 | `pending` \| `printed` \| `failed` \| `unacked_print` (nach 2-Min-Notdruck). |
| `triggered_by` | Status-Liste | ja | c | FA-06 (Runde 34/35) | `ack` (Quittierung) \| `timeout` (2 Min) \| `manual` (Nachdruck). |
| `created_at` / `printed_at` | Zeitpunkt | ja/nein | c | FA-06 | — |

> **Idempotenz/Dedupe (DB 3.3):** Race „Quittierung + 2-Min-Timeout" oder doppelte Quittierung (FA-06 4c: keine Zusatz-Exemplare) darf **keine** zwei Aufträge erzeugen — Eindeutigkeit z. B. `unique (tenant_id, order_id, copy_label, bon_type)` bzw. Idempotenz über den auslösenden Event-Key.
> Enthält **keine** Personendaten (nur Verweis auf `order_id`); der gedruckte Inhalt ist flüchtig. Ein **Nachdruck nach der Löschung** der Personendaten zeigt Bestellung + Positionen + Summen **ohne** Name/Adresse/Telefon (DB 5.3). Kein Fahrer-QR im Piloten (ADR 0008).

### `staff_shifts` — Tresen-Schicht · Klasse c

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | c | — | — |
| `user_id` | Kennung | ja | c | FA-19 | Angemeldete Person. |
| `device_id` | Kennung | nein | c | FA-19 (Runde 43) | Ein Tablet, Personenwechsel per PIN — genau eine aktive Person je Gerät. |
| `started_at` | Zeitpunkt | ja | c | FA-19 | **Kein Wechselgeld-Start** (ADR 0012). |
| `ended_at` | Zeitpunkt | nein | c | FA-19 | Keine Auto-Abmeldung; liegengebliebene Schicht beendet jede Annahme-Person/der Inhaber (Auslöser wird protokolliert). |
| `status` | Status-Liste | ja | c | FA-19 | `open` \| `closed`. (Betrieblicher Schichtstatus, nicht der Bestellzustand.) |

> **Beschäftigtendaten (C B3):** Über `user_id` + Zeiten sind das Arbeitszeitdaten eines benannten Beschäftigten — eigene Aufbewahrung (§ 26 BDSG), **nicht** der Kundenlöschung unterworfen. Frist → **Frage A5 (Anwalt)**.

### `cash_settlements` — Abschluss je Mitarbeiter (Tresen) · Klasse b

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `id` | Kennung | ja | b | — | — |
| `shift_id` | Kennung | ja | b | FA-16/19 | — |
| `user_id` | Kennung | ja | b | FA-16, C B3 | Der Abschluss bleibt der Person zugeordnet, die die Schicht hatte — **Beschäftigtenbezug** (eigene Aufbewahrung, nicht Kundenlöschung; Frist → A5). |
| `expected_cash_cents` | Cents | ja | b | FA-16 (ADR 0012) | **Soll = Summe der bar kassierten Beträge** dieser Person (`collected_cash_cents`). **Kein Wechselgeld-Start.** Server rechnet, wird nie überschrieben ([FEST 8]). |
| `reported_cash_cents` | Cents | nein | b | FA-16 (ADR 0007) | Vom Mitarbeiter gemeldeter Betrag, falls abweichend. Steht **zusätzlich** neben dem Soll. |
| `comment` | Text | nein | b | FA-16 (Runde 19), C B4 | **Pflicht bei Abweichung** (weniger oder mehr); ohne Kommentar nicht absendbar. **Keine Personendaten** — landet dauerhaft in Belegdaten (append-only/GoBD); per Bedienführung/Validierung absichern, in der `redact`-Liste (C B4). Fiskalische Aufbewahrungspflicht → **Frage S3 (Steuerberaterin)**. |
| `owner_confirmed` | Ja/Nein | ja | b | FA-16 | Inhaber-Bestätigung schließt den Abschluss (auch vom registrierten Handy). |
| `owner_confirmed_by` | Kennung | nein | b | FA-16 | Inhaber; bei Selbstbestätigung = kassierende Person (protokolliert). |
| `self_confirmed` | Ja/Nein | ja | b | FA-16 (B2) | Inhaber kassiert selbst → Selbstbestätigung. |
| `closed_with_discrepancy` | Ja/Nein | ja | b | FA-16 (Runde 10) | Abschluss mit Abweichung — nur Inhaber, nur mit Begründung. |
| `discrepancy_reason` | Text | nein | b | FA-16, C B4 | Begründung bei Abweichungs-Abschluss (Pflicht, wenn `closed_with_discrepancy`). **Keine Personendaten** (append-only/GoBD, `redact`-Liste, C B4). Fiskalische Aufbewahrung → **S3**. |
| `settled_at` | Zeitpunkt | ja | b | FA-16 | Append-only, unveränderlich. |

> **Widerspruch zum Briefing §5.2 (bewusst so, nicht geglättet):** Dort ist `cash_settlements` als „Bar/Karte/Storno **je Fahrer** und Schicht" mit implizitem Wechselgeld beschrieben. Im Piloten ist es der **Tresen-Abschluss je Mitarbeiter, nur bar/Gutschein, ohne Wechselgeld** (ADR 0012) und **ohne Fahrer** (Fahrer-Teil zurückgestellt, ADR 0008). Der Fahrer-Kassensturz kommt mit `driver_shifts` später (gleiches Muster: nur kassierte Beträge).

### `tenant_health` — Betreiber-Aggregat (Gesundheit) · Klasse c

> **Skizze (C B11).** FA-22 verlangt, dass der Betreiber **keine** Bestellungen, Kundendaten oder Bestellnummern sieht. Diese Projektion je Tenant ist die einzige Betreiber-Quelle; die **Betreiber-Rolle** hat **keinen** Row-Zugriff auf `orders`/`order_customer_details`/`order_items`/`voice_calls` (→ K9, `tenant-isolation-guard`, Q16). Ausgestaltung (Felder, Aktualisierung) in K7/K9.

| Feld | Typ | Pflicht | Klasse | Herkunft | Bemerkung |
|---|---|---|---|---|---|
| `tenant_id` | Kennung | ja | c | C B11 | Ein Satz je Restaurant. |
| `status` | Status-Liste | ja | c | FA-22 | Ampel/Metrik, z. B. `ok` \| `degraded` \| `down` — **ohne** Bestell-/Kundenbezug. |
| `updated_at` | Zeitpunkt | ja | c | FA-22 | Stand der Projektion. |

---

## Nicht Teil dieses Datenwörterbuchs (kommt später)

`drivers`, `driver_shifts` (ADR 0008) · `payments` (Teilzahlungen je Zahlart — im Piloten als `orders.collected_*`) · `fiscal_transactions` (TSE/DSFinV-K, Q2/Q5) · `domains`/Website. Felder `orders.driver_id` und `orders.payment_method` sind vorbereitet und bleiben im Piloten (für Lieferungen) leer.

## Offene Fragen

Diese Punkte brauchen eine **neue Entscheidung** (Sirat, architect, Anwalt oder Steuerberaterin) und werden hier **nicht** entschieden. Verweise auf die Befund-Nummern der Gegenlese-Berichte (DB … / C …).

> **Frage an Sirat / architect (C B1):** Freigabe der **dritten Datenklasse (c) betrieblich**, die von Briefing §5.2 (zwei Klassen) abweicht (open-questions Q10, „nicht entschieden"). Vor der ersten Migration. K5-Lesart (c) = Speisekarte/Zonen/Geräte, ohne Kundenbezug/Buchung.

> **Frage an Sirat (Options-/Varianten-Modell, FA-12 Runde 51, DB 9 / Q26):** Wie wird der **größen-/variantenabhängige Aufpreis** einer Extra-Zutat hinterlegt — `menu_item_variants` mit je Variante eigenem Aufpreis, oder eine Regel/Staffel? Betrifft `menu_options.surcharge_cents` und `menu_item_variants` (heute Platzhalter). **Bleibt offen (Q26)** — bis dahin `order_items.options_snapshot` nicht auf eine unklare Struktur einfrieren.

> **Frage an den Anwalt (C B9 / A3):** Löschfrist und endgültige Datenklasse für **`known_delivery_places`** (kann Personenbezug tragen, kein Rufnummern-Bezug).

> **Frage an den Anwalt (C B10 / A4):** Behandlung des **Notizfeldes** `order_customer_details.note`, wenn ein Anrufer von sich aus Gesundheitsdaten (Art. 9) nennt.

> **Frage an den Anwalt (C B12 / A6):** **Aufbewahrungsfrist der personenfreien `voice_calls`-Metadaten** (open-questions.md Q10 nennt sie ausdrücklich).

> **Frage an den Anwalt (C B3 / A5):** Aufbewahrung der **Beschäftigtendaten** (`users`, `staff_shifts`, `cash_settlements` je Mitarbeiter), abgegrenzt von der Kundenlöschung.

> **Frage an die Steuerberaterin (DB 4.1 / S1):** Ist der eingefrorene Positionspreis **brutto** (im Modell [VORSCHLAG]) und genügt der gespeicherte `tax_cents` je Position, oder verlangt DSFinV-K eine andere Netto-/Steuer-Führung? (Vor der ersten unveränderlichen `order_items`-Zeile.)

> **Frage an die Steuerberaterin (C B13 / S2):** Darf eine als Test markierte Bestellung (`orders.is_test`) an die TSE, oder muss sie fiskalisch außen vor bleiben? (Q2)

> **Frage an die Steuerberaterin (C B4 / S3):** Sind die Freitextfelder des Tresen-Abschlusses (`comment`, `discrepancy_reason`) fiskalisch aufbewahrungspflichtig — und dürfen/sollen sie personenbezugsfrei gehalten werden?

> **Frage an Sirat / architect:** Wie werden **künftig geplante Preise** („gültig ab" in der Zukunft) gespeichert — Preis-Historie/`menu_item_scheduled_prices` oder geplanter Änderungssatz? `menu_items.price_valid_from` trägt nur einen Stichtag.

> **Frage an die Steuerberaterin (Q2):** Darf `cash_settlements`/`orders.collected_*` Barzahlungen aufzeichnen, während beim Piloten daneben eine TSE-Kasse läuft — und braucht die Tresen-Erfassung selbst eine TSE (dann `fiscal_transactions` früher)? Ohne Antwort bleibt der Weg über `payments`/`fiscal_transactions` offen.

## Fragen zur Weiterleitung (Anwalt / Steuerberaterin)

Aus dem Compliance-Bericht (2026-09-23), fertig formuliert. Verknüpft mit den Befunden oben.

**An den Anwalt (Q10):**

- **A1** (C B5/B6): Trägt die telefonische Einwilligung „Adresse merken?" als Rechtsgrundlage für einen dauerhaften Kundeneintrag (Rufnummer, Name, Adresse), und genügt ein **append-only Protokolleintrag** (Zeitpunkt, Fragetext-Version, Antwort Ja/Nein, ohne Audio) als Nachweis nach Art. 7 Abs. 1 DSGVO?
- **A2** (`customers.last_order_at`): Ist eine Löschfrist von **12 Monaten** nach der letzten Bestellung für den Kundenstamm angemessen?
- **A3** (C B9): Welche **Datenklasse und Löschfrist** gelten für die Liste bekannter Lieferorte, die Personenbezug tragen kann und keiner Rufnummer zugeordnet ist?
- **A4** (C B10): Wie ist das freie **Notizfeld** zu behandeln, wenn ein Anrufer von sich aus Gesundheitsdaten (Allergien, Art. 9) nennt — reicht Speicherung als reine Weitergabe an die Küche, und muss die KI angewiesen sein, solche Angaben nicht aktiv zu erfragen?
- **A5** (C B3): Welche **Aufbewahrung** gilt für Beschäftigtendaten (Personal, Schichten, Abschlüsse je Mitarbeiter) — abgegrenzt von der Kundenlöschung?
- **A6** (C B12): Wie lange dürfen/müssen **personenfreie Anruf-Metadaten** (Dauer, Zeitpunkt, Ausgang) aufbewahrt werden?

**An die Steuerberaterin (Q2), ergänzend:**

- **S1** (DB 4.1): Muss der GoBD-Beleg nach Löschung der Personendaten **Summe, Positionen, Zeitpunkt, Zahlart und Bestellnummer** zwingend behalten (so modelliert), oder werden weitere Angaben verlangt — und ist die Brutto-Führung mit `tax_cents` je Position ausreichend?
- **S2** (C B13): Darf eine als **Test** markierte Bestellung an die TSE, oder muss sie fiskalisch außen vor bleiben?
- **S3** (C B4): Sind die **Freitextfelder des Tresen-Abschlusses** (`comment`, `discrepancy_reason`) fiskalisch aufbewahrungspflichtig — und dürfen/sollen sie personenbezugsfrei gehalten werden?
