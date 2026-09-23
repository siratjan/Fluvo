# K5 · Gegenlesen Datenmodell (DB-Sicht) — Piloten-Durchstich

- **Prüfer:** database-reviewer · **Datum:** 2026-09-23 · **Grundlage:** `er-durchstich.md`, `../vertraege/datenwoerterbuch.md` (beide Entwurf 2026-09-23)
- **Kontext:** Briefing §2/§5.2, CLAUDE.md 6/7, Skills `fluvo-multi-tenant`, `fluvo-core-domain`, `zustand-bestellung.md` (K3), FA-17/Q6/Q10, ADR 0008/0010/0012/0013
- **Einordnung:** Konzept-Datenmodell, das direkt in Drizzle-Schema + Migrationen übersetzt wird. Kein Code geprüft (existiert noch nicht).
- **Gesamtbild:** Solide, sauber getrennte Datenklassen, Cent/UTC durchgehalten, `orders`/`order_customer_details`-Schnitt ist richtig gedacht. Die Befunde betreffen fast alle **Integritäts- und Schlüsselentscheidungen, die vor der ersten Migration fallen müssen**, sowie drei fehlende Felder, ohne die die beiden Enden des Durchstichs (Bon-Druck, Tresen-Abschluss) technisch nicht sauber laufen.

## 1 · Mandantentrennung

| # | Befund | Schwere | Empfehlung |
|---|---|---|---|
| 1.1 | Alle FKs im Modell sind **einspaltig** (`menu_id`, `category_id`, `item_id`, `order_id`, `customer_id`, `delivery_zone_id`, `shift_id`, `collected_by`, `known_place_id` …). Der Skill verlangt zusammengesetzte FKs `(tenant_id, id)`, damit eine Zeile nie über eine FK-Kette auf einen fremden Tenant zeigt und RLS nicht umgangen wird. | blocker | Systementscheidung: intra-Tenant-FKs als `(tenant_id, id)` mit zusammengesetztem Unique/PK auf der Elterntabelle. Betrifft jede Tabelle → vor der ersten Migration festlegen (siehe „Drei Dinge" #1). |
| 1.2 | `orders.order_number` hat **keine** Eindeutigkeit und keine Vergabestrategie. Global oder je Tenant? Doppelte Bestellnummern sind möglich. | blocker | `unique (tenant_id, order_number)` + je-Tenant-Sequenz/Zähler festlegen (nie globaler Serial → verrät Fremdvolumen). |
| 1.3 | `menus` „genau eine je Tenant" ist nur als Prosa notiert, ohne Constraint. | wichtig | `unique (tenant_id)` auf `menus` erzwingen. |
| 1.4 | `devices.token_hash`, `voice_calls.provider_call_id` sind **Nachschlagschlüssel vor** gesetztem Tenant (CloudPRNT: Token→`devices`→Tenant; Voice-Webhook: Anbieter-ID→Tenant). Diese Lookups laufen ohne Session-Tenant und müssen global eindeutig sein — Ausnahme zur „Eindeutigkeit je Tenant"-Regel. | wichtig | `token_hash`/`provider_call_id` global-unique; diese Lese-Pfade als klar benannte, tenant-agnostische Funktion (kein `BYPASSRLS`), die den Tenant *ableitet* und dann `withTenant` betritt. |
| 1.5 | **Keine Mapping-Tabelle** für den eingehenden Voice-Webhook (Retell-Agent-/Nummern-ID → Tenant), bevor ein `voice_calls`-Satz existiert. Der Skill nennt „eigene Zuordnungstabelle". | wichtig | Tabelle `voice_agents`/`phone_numbers` (Anbieter-ID → tenant_id) ergänzen; sonst kann der Webhook den Tenant nicht auflösen. |
| 1.6 | `tenant_id` fehlt in den Feldlisten mehrerer Speisekarten-Tabellen (`menu_categories/items/options/variants`) — laut Konvention getragen, aber nirgends je Tabelle bestätigt. | hinweis | In der Übersetzung strikt: `tenant_id not null references tenants(id)` **und** RLS-Policy in *derselben* Migration je Tabelle (sonst Blocker beim Review). |

## 2 · `order_events` (append-only)

| # | Befund | Schwere | Empfehlung |
|---|---|---|---|
| 2.1 | **Keine Sequenz je Bestellung.** Nur `occurred_at` (timestamptz); zwei Events mit gleichem Zeitstempel sind nicht deterministisch geordnet — schlecht für Audit-Trail und Event-Replay. | wichtig | `seq bigint` (globaler `BIGSERIAL`) **oder** `order_seq int` je Bestellung ergänzen; Reihenfolge nie über `occurred_at` allein. |
| 2.2 | `idempotency_key` ist nullable **ohne** Unique-Constraint. Doppelte/Offline-Aktionen (FA-01 13a, doppelte Quittierung FA-06 4c) sollen wirkungslos sein — dafür braucht es eine Eindeutigkeit. | wichtig | Partieller Index `unique (tenant_id, idempotency_key) where idempotency_key is not null`. |
| 2.3 | **Outbox-Konflikt:** Der In-Process-Verteiler (core-domain) muss verarbeitete Events markieren — das wäre ein `UPDATE` auf eine append-only-Tabelle, die `fluvo_app` gar nicht darf. | wichtig | Dispatch-/Verarbeitet-Zustand in **separater** Tabelle (`event_dispatch`/Outbox-Cursor) halten; `order_events` bleibt reines INSERT/SELECT. |
| 2.4 | Struktur ansonsten vollständig: `type`, `payload` (ohne Personenbezug), `actor`, `occurred_at`, `order_id` optional. Rolle `fluvo_app` = nur INSERT/SELECT ist explizit notiert — gut. | hinweis | `actor` als Text `user:<id>` verliert Referenzintegrität (kein FK); für Klasse b bewusst als reine ID akzeptabel — so dokumentieren. |

## 3 · Idempotenz

| # | Befund | Schwere | Empfehlung |
|---|---|---|---|
| 3.1 | `voice_calls.idempotency_key` (Pflicht) je Anruf vorhanden — gut. Eindeutigkeit aber nicht als Constraint definiert. | wichtig | `unique (tenant_id, idempotency_key)` (bzw. global, da vor Tenant-Auflösung) — sonst kann ein Wiederholungsversuch doch eine zweite Bestellung erzeugen. |
| 3.2 | Offline-Aktionen (ADR 0013: Warteschlange bleibt gebaut) landen als `order_events` — hängt an 2.2. Kein eigener Ablageort nötig, aber die Eindeutigkeit ist Pflicht. | hinweis | Mit 2.2 erledigt. |
| 3.3 | `print_jobs` hat **keinen** Idempotenz-/Dedupe-Schutz. Race „Quittierung + 2-Min-Timeout" oder doppelte Quittierung (FA-06 4c: keine Zusatz-Exemplare) kann zwei Aufträge erzeugen. | wichtig | Eindeutigkeit z. B. `unique (tenant_id, order_id, copy_label, bon_type)` bzw. Idempotenz über den auslösenden Event-Key. |

## 4 · Eingefrorene Preise / nachrechenbare Summe

| # | Befund | Schwere | Empfehlung |
|---|---|---|---|
| 4.1 | Unklar, ob `unit_price_cents`/`line_total_cents` **brutto oder netto** sind, und **kein Steuerbetrag je Position** gespeichert. Für Beleg/GoBD/DSFinV-K muss die USt-Aufteilung je Steuersatz nachrechenbar sein. | wichtig | Festlegen: Preis = **brutto** (Gastro-üblich); je Position den enthaltenen Steuerbetrag speichern *oder* garantieren, dass `tax_rate` + Rundungsregel ihn deterministisch reproduziert. Vor der ersten Zeile (unveränderlich!). |
| 4.2 | `options_snapshot` als opakes `jsonb` — ohne festes Schema ist die Summe nicht verlässlich nachrechenbar (Aufpreis je Extra/Variante). | wichtig | jsonb-Struktur per Zod fixieren: je Option `name` + `surcharge_cents`, sodass `line_total = (unit_price + Σ surcharge) × quantity` prüfbar bleibt. |
| 4.3 | Liefergebühr als Wert an `orders` eingefroren — gut. `subtotal`/`total` ableitbar. Keine Rabatte (FEST 11) — gut. Währung implizit EUR. | hinweis | Rundungsregel an *einer* Stelle im Kern; Währung als Annahme dokumentieren (Single-Currency). Optional nullable `source_item_id` an `order_items` für Auswertung (nicht für Preisbildung). |

## 5 · Trennung `orders` (b) vs. `order_customer_details` (a)

| # | Befund | Schwere | Empfehlung |
|---|---|---|---|
| 5.1 | 1:1 über `order_id` als PK/FK, Personendaten isoliert — Löschung „Personenbezug weg, Beleg bleibt" funktioniert technisch. Sehr gut. | hinweis | Beibehalten. |
| 5.2 | Löschweg nicht festgelegt: **Zeile löschen** vs. **pseudonymisieren**. `contact_name` ist NOT NULL → In-place-Pseudonymisierung braucht Platzhalter. | wichtig | Empfehlung: ganze `order_customer_details`-Zeile löschen (saubere Trennung, NOT-NULL bleibt konsistent). `customer_id`-FK auf `ON DELETE SET NULL`, wenn der Stammkunde nach Frist entfällt. |
| 5.3 | **Bon-Nachdruck nach Löschung** unbestimmt: `print_jobs`→`order_id`, aber Name/Adresse sind dann weg — was druckt ein Reprint eines Liefer-Bons? | hinweis | Verhalten festschreiben: Reprint zeigt Bestellung + Positionen + Summen, **ohne** Name/Adresse/Telefon (Belegfunktion). Getrennt vom Papier-Stationsexemplar (Q20). |

## 6 · Zeit-/Geld-Typen

| # | Befund | Schwere | Empfehlung |
|---|---|---|---|
| 6.1 | **`tenants` hat keine Zeitzone.** `opening_hours` (`time`), `closures`, `requested_time`, `acceptance_stops.auto_end_at` („Ladenschluss") und jede Tagesgrenze (Tagesübersicht, Abschluss) brauchen die Tenant-Zeitzone (Europe/Berlin). | wichtig | `tenants.timezone` (IANA) ergänzen; ohne sie sind Vorbestellung, Öffnungsprüfung und Tagesabschluss nicht korrekt interpretierbar. |
| 6.2 | Geld durchgängig `*_cents` (Ganzzahl) — vollständig geprüft, korrekt. Zeitpunkte `timestamptz` (UTC) — korrekt. Dauer: `duration_seconds` (Sek.), Liefer-/Abholzeit in Minuten-Rastern. | hinweis | Minuten-Raster (15er/10er) sind Anzeigewerte — als solche dokumentieren; Regelvorgabe „Dauer in Sekunden" gilt für Messwerte (Metering) und ist eingehalten. |

## 7 · Heiße Indizes / Abfragen

| # | Befund | Schwere | Empfehlung |
|---|---|---|---|
| 7.1 | **`print_jobs` hat kein `device_id`/Ziel-Drucker.** CloudPRNT-Polling (alle paar Sekunden je Drucker) kann seine offenen Aufträge nicht filtern; bei mehreren Druckern (Station/Tresen) nicht zustellbar. | wichtig | `device_id` (Drucker) an `print_jobs`; Index `(tenant_id, device_id, status) where status='pending'`. |
| 7.2 | **Kassensturz-Zuordnung unsicher:** `orders` trägt `collected_by`, aber **kein `shift_id` und kein `collected_at`**. Abschluss je Mitarbeiter (FA-16: Soll = Summe `collected_cash_cents` in *dieser Schicht*) müsste per Zeitfenster-Join geschätzt werden — bei später Übergabe fehleranfällig. | wichtig | `orders.shift_id` (oder mindestens `collected_at timestamptz`) ergänzen; dann Abschluss = `sum … where shift_id = X`, sauber indizierbar, kein Zeitfenster-Join. |
| 7.3 | Keine konkreten Indizes im Artefakt (konzeptbedingt ok), aber Felder für die heißen Pfade weitgehend da: Tagesübersicht `(tenant_id, created_at)`, offene `where status='received'`, Vorbestellungen `(tenant_id, requested_time) where is_preorder`. | hinweis | Indizes bei der Übersetzung ergänzen, alle mit `tenant_id` beginnend; `CONCURRENTLY` in Migrationen. |
| 7.4 | Vorbestellungs-Fälligkeit + Löschfristen laufen als pg-boss-Jobs **ohne Session-Tenant**. | wichtig | Job iteriert Tenant für Tenant (`withTenant` je Tenant) bzw. setzt `tenantId` aus dem Payload — nie `BYPASSRLS`. Als Regel in K6 verankern. |

## 8 · PostGIS / Zonen

| # | Befund | Schwere | Empfehlung |
|---|---|---|---|
| 8.1 | Modell nutzt **bewusst kein** PostGIS-Polygon: Zonen sind **Ortsteile** (Name), Zuordnung Adresse→Ortsteil per Geocoder (Q6). Das ist **konsistent mit FA-17 B18** (Sirats Entscheidung „nicht als gezeichnete Fläche"). Die generische Regel „ST_Contains mit GiST" gilt hier bewusst nicht. | hinweis | So dokumentieren, dass die Abweichung von der PostGIS-Regel eine begründete FA-17-Entscheidung ist, nicht ein Versäumnis. |
| 8.2 | Determinismus der Zone hängt jetzt an einem **externen Geocoder** (Q6). Das ist ein neuer Unterauftragsverarbeiter (Datenschutz) und muss serverseitig-deterministisch sein (KI rät nie). | wichtig | Q6 vor Pilotstart klären (Anbieterwahl → Rückfrage/`open-questions`); Adresse→Ortsteil in deterministischem Code, nicht im LLM. |
| 8.3 | „Außerhalb aller Zonen" (Ausnahme, Annahme liefert von Hand, Gebühr handeingegeben) ist über `delivery_zone_id` nullable + `orders.delivery_fee_cents` abbildbar — gut. | hinweis | Beibehalten; kein Geometrie-Feld nötig. Falls später Radius/Polygon gewünscht: dann erst `geometry` + GiST. |

## 9 · Fehlt / zu viel für den Durchstich

**Fehlt (für Anruf→Bestellung→Bon + Tresen nötig):**
- `tenants.timezone` (6.1) · `unique (tenant_id, order_number)` + Vergabe (1.2) · `print_jobs.device_id` (7.1) · `orders.shift_id`/`collected_at` (7.2) · Sequenz auf `order_events` (2.1) · Unique auf Idempotenz-Keys (2.2/3.1) · Brutto/Netto + Steuerbetrag je Position (4.1) · Outbox/Dispatch getrennt von `order_events` (2.3) · Voice-Webhook-Mapping-Tabelle (1.5).

**Zu viel / auf Vorrat — aber vertretbar:**
- `orders.driver_id`, `orders.payment_method` bewusst leer (ADR 0008: „beide Wege möglich halten") — **behalten**, kein Befund.
- `menu_item_variants` und größenabhängiger `menu_options.surcharge_cents` sind **OFFEN** (Q26) — nicht bauen, bis Sirat das Options-/Varianten-Modell entschieden hat (sonst friert `order_items` eine unklare Struktur ein).
- Voller Statusumfang „vorgesehen" bei Piloten-Teilmenge (K3) — ok, Status-Liste erweiterbar halten (kein DB-Enum).

## Drei Dinge, die vor dem ersten Migrationsskript zwingend entschieden sein müssen

1. **Schlüssel- und Integritätsmodell (nicht nachrüstbar).** Zusammengesetzte FKs `(tenant_id, id)` mit passenden zusammengesetzten Uniques auf allen Elterntabellen — ja/nein; dazu die je-Tenant-Eindeutigkeiten `unique (tenant_id, order_number)`, `unique (tenant_id)` auf `menus`, `unique (tenant_id, idempotency_key)` und die global-eindeutigen Lookup-Schlüssel (`token_hash`, `provider_call_id`). Das prägt PK/Unique jeder Tabelle und ist nach befüllter DB kaum änderbar.
2. **Semantik der unveränderlichen Zeilen: Geld/Steuer + Zeit.** `unit_price` = brutto oder netto, Steuerbetrag je Position speichern oder deterministisch nachrechenbar, Rundungsstelle, Währung — **plus `tenants.timezone`**. Muss stehen, bevor die erste `orders`/`order_items`-Zeile (GoBD, 10 Jahre) geschrieben wird, denn diese Zeilen werden nie umgeschrieben.
3. **`order_events` als Audit-Trail + Outbox.** Sequenz je Bestellung, eindeutiger `idempotency_key`, Ablage von Dispatch-/Verarbeitet-Zuständen **außerhalb** der append-only-Tabelle, und Rollenrechte `fluvo_app` = nur INSERT/SELECT (UPDATE/DELETE entzogen). Eine falsch angelegte `order_events`-Migration ist wegen der Unveränderlichkeit praktisch nicht korrigierbar — diese Struktur muss beim allerersten Migrationsschritt richtig sein.

---

*Bericht vom `database-reviewer` als Text an Jarvis geliefert und von Jarvis unverändert hier abgelegt (2026-09-23). Keine Artefakte geändert, nichts aus dem Business Brain verwendet.*
