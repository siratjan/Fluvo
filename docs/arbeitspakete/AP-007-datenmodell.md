# AP-007 · Konzept K5: Datenmodell und Datenwörterbuch

- **Status:** in Arbeit
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-23
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K5
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

ER-Diagramm und Datenwörterbuch liegen vor. Jedes Feld hat Typ, Bedeutung und vor allem eine Datenklasse: DSGVO-löschbar oder GoBD-pflichtig. Diese Entscheidung lässt sich später kaum korrigieren.

## Einordnung

- **Berührt:** [FEST] tenant_id überall, Event-Log unveränderlich, zwei Datenklassen, Preise einfrieren, kein Audio · [OFFEN] Q2, Q10
- **Business Brain:** `DSGVO & Regulierung Deutschland — Tiefenrecherche`, `TSE-Pflicht`, Notion-Prototyp als Blaupause (laut Briefing)
- **Nicht Teil dieses Pakets:** Drizzle-Schema, Migrationen, Indizes

## Abnahmekriterien

- [ ] ER-Diagramm mit allen Tabellen aus Briefing §5.2 und Kardinalitäten
- [ ] Datenwörterbuch je Tabelle: Feld, Typ, Pflicht, Bedeutung, erfundenes Beispiel, Personenbezug, Klasse, Löschung
- [ ] Keine Tabelle der Klasse (b) enthält Personendaten — nur Verweise
- [ ] DSFinV-K-relevante Angaben sind vorhanden oder als Frage an die Steuerberaterin markiert
- [ ] Von `database-reviewer` und `compliance-guard` gegengelesen, von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | konzept-vertraege (Skill) | Datenwörterbuch-Format |
| 2 | konzept-diagramme (Skill) | ER-Diagramm |
| 3 | requirements-engineer | Entwurf |
| 4 | database-reviewer | Gegenlesen |
| 5 | compliance-guard | Datenklassen prüfen |

**Bisher tätig:** requirements-engineer (Entwurf ER + Datenwörterbuch, 2026-09-23; Gegenlese-Berichte DB + Compliance eingearbeitet, 2026-09-23), database-reviewer (Gegenlesen, 2026-09-23), compliance-guard (Gegenlesen, 2026-09-23).

## Schritte

1. `/konzept K5` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

Löschfristen vom Anwalt (Q10) · Rückmeldung der Steuerberaterin zu DSFinV-K-Pflichtangaben

## Verlauf

- **2026-09-23 · Entwurf (requirements-engineer):** ER-Diagramm und Datenwörterbuch für den Piloten-Durchstich erstellt.
  - `docs/konzept/modelle/er-durchstich.md` — zwei Mermaid-`erDiagram` (Stammdaten; Bestellung/Betrieb) mit Wort-Tabelle je Tabelle in Alltagssprache.
  - `docs/konzept/vertraege/datenwoerterbuch.md` — je Tabelle Feld, Typ (fachlich), Pflicht, Datenklasse (a/b/c), Herkunft (FA/Regel), Bemerkung.
  - **22 Tabellen** modelliert (plus `menu_item_variants` als Platzhalter): tenants, users, devices, menus, menu_categories, menu_items, menu_options, delivery_zones, known_delivery_places, opening_hours, closures, acceptance_stops, customers, customer_addresses, orders, order_customer_details, order_items, order_events, voice_calls, print_jobs, staff_shifts, cash_settlements. Später (Liste): drivers, driver_shifts, payments, fiscal_transactions, domains.
  - **Bestellzustände nicht festgelegt** (`orders.status`/`tenants.status` als Platzhalter → K3). Personenbezug einer Bestellung in eigener Tabelle `order_customer_details` (Klasse a), damit die Löschung greift und der Beleg (Klasse b) bleibt. Dritte Klasse (c) betrieblich eingeführt (Stammdaten).
  - **Offene Fragen** an Sirat/Anwalt/Steuerberaterin markiert (Optionen-/Varianten-Modell, Löschfristen known_delivery_places/Notiz/voice_calls, geplante „gültig ab"-Preise, TSE der Tresen-Erfassung).

- **2026-09-23 · Gegenlesen eingearbeitet (requirements-engineer):** Berichte `database-reviewer` (`../konzept/modelle/_gegenlesen-K5-db.md`) und `compliance-guard` (`../konzept/modelle/_gegenlesen-K5-compliance.md`) in ER-Durchstich und Datenwörterbuch eingearbeitet.
  - **Eingearbeitet (folgt aus bestehenden Regeln):** zusammengesetzte FKs `(tenant_id, id)` als Konvention (DB 1.1); Je-Tenant-Eindeutigkeiten `unique (tenant_id, order_number)` + Zähler, `unique (tenant_id)` auf `menus`, global-unique Lookups `token_hash`/`provider_call_id` + Zuordnungstabelle `voice_agents` (DB 1.2–1.6); `order_events.seq`, partieller Unique auf `idempotency_key`, getrennte Outbox-Tabelle `event_dispatch`, `actor` als reine ID (DB 2.1–2.4); Unique auf `voice_calls.idempotency_key`, Dedupe auf `print_jobs` (DB 3.1/3.3); Brutto-Preis [VORSCHLAG] + `tax_cents`, `options_snapshot`-Zod-Schema, Rundung/EUR (DB 4.1–4.3); Löschweg „ganze `order_customer_details`-Zeile", `customer_id ON DELETE SET NULL`, Nachdruck ohne Personendaten (DB 5.2/5.3); `tenants.timezone`, `print_jobs.device_id`, `orders.shift_id`/`collected_at`, Jobs je Tenant ohne `BYPASSRLS`, begründete PostGIS-Abweichung (DB 6.1/7.1/7.2/7.4/8.1); „keine Personendaten" auf `comment`/`discrepancy_reason`/`closures.note` (C B4); Einwilligungs-Nachweis append-only `consent.recorded`/`consent.revoked` (C B5/B6); E.164-Rufnummer (C B7); Privacy-Abdeckung `contact_phone`/`known_delivery_places` (C B8); `note`/`driver_hint` nie in Events/Logs/Voice (C B10); tabellen-scharfer Löschjob + `users` deaktivieren (C B2); Beschäftigtendaten kennzeichnen (C B3); `tenant_health`-Skizze + Betreiber-Rolle ohne Row-Zugriff (C B11).
  - **Als Frage eingetragen (neue Entscheidung nötig):** dritte Datenklasse (c) → architect + Sirat (C B1); Frist/Klasse bekannte Lieferorte → A3 (C B9); Brutto/Steuer-Festlegung → S1 (DB 4.1); Frist `voice_calls` → A6 (C B12); Test an TSE → S2 (C B13); Behandlung Gesundheitsdaten im Notizfeld → A4 (C B10); Beschäftigtendaten-Frist → A5 (C B3); Freitext-Aufbewahrung Tresen → S3 (C B4); Options-/Varianten-Modell bleibt offen (Q26). Block „Fragen zur Weiterleitung" A1–A6/S1–S3 ans Ende des Datenwörterbuchs übernommen.
  - **Nicht übernommen:** DB 8.2 (Geocoder-Anbieterwahl Q6) und 7.3 (konkrete Indizes) bleiben Übersetzungs-/K6-Sache, kein Modellfeld; im Text nur als Hinweis geführt.
  - Status beider Artefakte auf „Entwurf — Gegenlesen DB + Compliance 2026-09-23 eingearbeitet; Durchgang mit Sirat steht aus" gesetzt.

- **2026-09-23 · Entscheidung dritte Datenklasse (ADR 0016):** Sirat hat die dritte Datenklasse (c) „betrieblich" entschieden — neben (a) DSGVO-löschbar und (b) GoBD 10 Jahre stehen betriebliche Stammdaten ohne Personenbezug/Buchungscharakter (Speisekarte, Zonen, Öffnungszeiten, Geräte); Beschäftigtendaten sind **nicht** (c) und nicht der Kundenlöschung unterworfen (eigene Frist → Anwalt A5), Löschjobs tabellen-scharf. Wortlaut in `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md` (Runde 52). Damit ist der K5-Befund C B1 aufgelöst; der Q10-Hinweis „drei Datenklassen nicht entschieden" ist in `open-questions.md` nachgezogen, Skill `fluvo-compliance` angepasst (`doc-updater`). Offen bleiben die Anwalt-Fragen A1–A6 und Steuerberaterin-Fragen S1–S3 sowie Q26; Durchgang mit Sirat und Abnahme stehen aus.

## Ergebnis

_Noch offen — Entwurf steht und ist von `database-reviewer` und `compliance-guard` gegengelesen; die Befunde sind eingearbeitet bzw. als Frage markiert. Durchgang mit Sirat und Abnahme ausstehend._
