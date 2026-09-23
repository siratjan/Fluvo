# K5 · Gegenlesen aus Compliance-Sicht (Datenwörterbuch + ER-Durchstich)

- Prüfer: compliance-guard · Stand 2026-09-23 · keine Rechtsberatung
- Geprüfte Artefakte: `../vertraege/datenwoerterbuch.md`, `er-durchstich.md`
- Grundlage: Briefing §2 (§2.13/§2.15), §5.2, §5.4, §6; CLAUDE.md Regel 7–8; Skill `fluvo-compliance`; ADR 0007; FA-01, FA-22, FA-24; open-questions Q2/Q10
- Trennung: **[Bauvorgabe]** = verstößt gegen / lückt eine Bauvorgabe · **[Recht]** = rechtlich zu klären (Anwalt/Steuerberaterin)

## Vorbemerkung: keine strikten Blocker im Schema

Kein Feld speichert Audio, kein Volltranskript, keine Rufnummer in `voice_calls`, keine Stimm-Biometrie. Damit sind die harten §2.13/§2.15-Blocker im Datenmodell eingehalten. Die folgenden Befunde sind Lücken/Abweichungen, die **vor dem ersten Migrationsskript** zu schließen sind (append-only-Felder und der Rufnummern-Schlüssel lassen sich später kaum korrigieren).

## Befundtabelle

| # | Befund | Schwere | Empfehlung | Rechtsgrund/Quelle |
|---|---|---|---|---|
| B1 | Dritte Datenklasse **(c) betrieblich** eingeführt, obwohl Briefing §5.2 nur zwei Klassen kennt; open-questions Q10 hält „drei Datenklassen … berührt Briefing §5.2 → architect + Steuerberaterin, **nicht entschieden**" fest. K5 baut auf einer noch offenen Abweichung auf. | wichtig [Bauvorgabe] | Vor Migration durch `architect` + Sirat freigeben. Fachlich ist die K5-(c) („Speisekarte/Zonen/Geräte", kein Kundenbezug, keine Buchung) sauberer als der Hausjuristen-Vorschlag (Kundenstamm/Lieferdaten/Fiskaldaten) — Unterschied benennen, nicht vermischen. | Briefing §5.2; CLAUDE.md „[FEST]/[STACK] berührt → architect"; Q10 |
| B2 | **`users` als Klasse (a)** — Beschäftigtendaten in derselben Klasse wie Kundendaten. Ein Löschjob „Klasse (a) nach 12 Monaten" würde Personal fälschlich löschen. | wichtig [Bauvorgabe] | Löschjob **tabellen-/regelscharf** definieren, nicht „alle (a)". `users` wird deaktiviert (`active=false`), nicht kundengelöscht; eigene arbeitsrechtliche Frist. | Briefing §6; §5.2 |
| B3 | **`staff_shifts` (c)** trägt `user_id` + Zeiten = Arbeitszeitdaten eines benannten Beschäftigten; als „rein betrieblich" untergewichtet. Gleiches indirekt `cash_settlements` (b) via `user_id`. | hinweis [Recht] | Klarstellen: Schicht-/Abschlussdaten sind Beschäftigtendaten mit eigener Aufbewahrung; nicht der Kundenlöschung unterwerfen. Frist → Anwalt-Frage A5. | § 26 BDSG |
| B4 | **Freitext in append-only/GoBD-Feldern:** `cash_settlements.comment`, `discrepancy_reason` (b) sowie `closures.note` (c) können Personenbezug aufnehmen und landen dauerhaft in Belegdaten. `order_events.payload` ist bereits korrekt „ohne Personendaten". | wichtig [Bauvorgabe] | Regel „keine Personendaten" auf diese Felder ausdehnen; per Bedienführung/Validierung absichern. | CLAUDE.md Regel 7/8; Briefing §6 |
| B5 | **Einwilligung „Nein" hat keinen Speicherort:** `customers` existiert nur bei `consent=true`, aber FA-01 Schritt 12/13 und T5 verlangen, dass **auch „Nein" als Protokolleintrag** festgehalten wird; ADR 0007 §K5 fordert Protokoll mit „Anruf-ID, Zeit, Fragetext, Antwort — ohne Audio". Fehlt komplett. | **Blocker** [Bauvorgabe] | Einwilligung als **append-only Nachweis**: `order_events`-Typ `consent.recorded` oder eigene `consent_log` (append-only) mit `tenant_id`, Bezug (order_id/call), **Fragetext-Version**, **Antwort (Ja/Nein)**, `occurred_at`, `actor` — **ohne Name/Rufnummer**. `customers.consent` bleibt nur Ist-Zustand. | ADR 0007 §K5; FA-01 T5; Briefing §2.13 |
| B6 | **Kein Widerruf der Einwilligung** modelliert. | wichtig [Bauvorgabe] | Widerruf als Ereignis (append-only) + Folge (Kundeneintrag löschen). | Art. 7 Abs. 3 DSGVO |
| B7 | **Rufnummer ohne festgelegte Normalisierung:** `customers.phone` und `order_customer_details.contact_phone` als „Text". Betroffenenrechte per Rufnummer funktionieren nur bei konsistentem Schlüssel. | wichtig [Bauvorgabe] | **E.164-Normalisierung** als Schlüssel festschreiben (Schema/Zod), sonst matchen „030…"/„+49 30…" nicht. Vor Migration. | Briefing §6 |
| B8 | **Löschung/Auskunft per Rufnummer erreicht nicht alle Personendaten-Tabellen:** `order_customer_details.contact_phone` kann **ohne** `customers`-Zeile existieren (Kunde sagte „Nein"). `known_delivery_places` (a) hat **keinen** Rufnummern-Bezug. | wichtig [Bauvorgabe] | Privacy-Modul und Vollständigkeits-Test um `order_customer_details` (direkt über `contact_phone`) und `known_delivery_places` (Namens-/Freitextsuche) erweitern. | Briefing §6 |
| B9 | **`known_delivery_places` (a) ohne Löschfrist-Schlüssel:** kein `last_used_at`, kein Kundenbezug → Löschjob hat nichts, woran er ansetzt. Personenbezug möglich („bei Familie Müller", `driver_hint`). | wichtig [Bauvorgabe] + [Recht] | Entweder als **Stammdaten** mit manueller Pflege + dokumentierter Aufbewahrung, oder Nutzungszeitpunkt ergänzen. Klasse/Frist → Anwalt (Q10). | Art. 5 Abs. 1 e DSGVO; FA-24; Q10 |
| B10 | **Notizfeld `note` (a)** und `driver_hint`: Freitext, kann **Namen Dritter** und **Gesundheitsdaten (Allergien, Art. 9)** enthalten. Risiko: `note` gelangt in Logs/Events/Voice-Anbieter. | wichtig [Bauvorgabe] + [Recht] | `note` **nie** in `order_events.payload`, Logs, Sentry, Fehlermeldungen, URLs; nur an Bon (Papier → Q20) und Küche/Fahrer. K4: die KI **erfragt keine Gesundheitsdaten** aktiv. Längenbegrenzung K8. Art. 9 → Anwalt. | CLAUDE.md Regel 8; Art. 9 DSGVO; FA-01 |
| B11 | **Betreiber-Health-Aggregat nicht modelliert:** FA-22 verlangt, dass der Betreiber **keine** Bestellungen, Kundendaten oder Bestellnummern sieht. Im Modell fehlt eine getrennte Aggregat-Quelle. | wichtig [Bauvorgabe] | Health-/Metrik-Projektion je Tenant modellieren; Betreiber-Rolle **ohne** Row-Zugriff auf `orders`/`order_customer_details`/`order_items`/`voice_calls`. → K7/K9 + `tenant-isolation-guard` (Q16). | FA-22; Briefing §6/§8 |
| B12 | **`voice_calls` → `order_id` → `order_customer_details`:** während der 12 Monate ist ein Anruf mittelbar re-identifizierbar. Systembedingt und vertretbar; nach Löschung bricht die Kette. | hinweis [Recht] | Metering-Fakt (Dauer, Zeit, Tenant) ist der aufbewahrungspflichtige Teil; Frist der Metadaten → Anwalt/Steuerberaterin. | §5.4; Q10 |
| B13 | **`is_test`-Bestellungen** und TSE: offen, ob Testbestellung an die TSE darf. | hinweis [Recht] | → Q2 (Steuerberaterin). | Q2; FA-22 |

## Antworten auf die zehn Leitfragen (Kurzfassung)

1. **Klassen:** überwiegend plausibel. Klasse (c) tragfähig für echte Betriebsstammdaten, **wenn** dort nie Kundenpersonenbezug oder Buchungsdaten landen. Ausnahmen B2/B3/B4. Gemischte a/b-Tabellen wurden vermieden — korrekt gelöst. Prozessual offen: B1.
2. **GoBD-Beleg nach Löschung:** Ja. `orders` + `order_items` behalten Bestellnummer, Summen, Positionen mit eingefrorenem Text/Preis/Steuersatz, Zeit, Zahlart-Feld. Empfehlung: `order_customer_details` **hart löschen** (ganze Zeile) statt pseudonymisieren; K5-Bemerkung „entfernt/pseudonymisiert" auf „gelöscht" präzisieren.
3. **Notizfeld:** B10. Frist wie übrige Bestell-Personendaten (Q10). KI erfragt Gesundheitsangaben nicht aktiv (K4).
4. **Bekannte Lieferorte:** B8/B9.
5. **`voice_calls`:** nötig `duration_seconds`, `started_at`/`ended_at`, `outcome`, `idempotency_key`, `order_id`, `provider_call_id`. Richtig nicht vorhanden: Transkript, Rufnummer. `provider_call_id` nie in URLs/Logs.
6. **Einwilligungs-Protokoll:** nicht ausreichend — B5/B6, größte Lücke.
7. **Betroffenenrechte per Rufnummer:** B7/B8. `contact_phone` bleibt Klartext (Bon), Suche als POST, nie in URLs/Logs.
8. **Betreiber-Zugriff:** B11.
9. **Logging/IDs:** umsetzbar (UUIDs überall, `actor` als ID). Freitextfelder (`note`, `comment`, `discrepancy_reason`, `closures.note`, `driver_hint`) in die pino-`redact`-Liste; `order_number` aus Betreiber-Ansichten fernhalten.
10. **Fragen für Anwalt / Steuerberaterin** — fertig zum Weiterleiten:

**Anwalt (Q10):**
- A1: Trägt die telefonische Einwilligung „Adresse merken?" als Rechtsgrundlage für einen dauerhaften Kundeneintrag (Rufnummer, Name, Adresse), und genügt ein append-only Protokolleintrag (Zeitpunkt, Fragetext-Version, Antwort Ja/Nein, ohne Audio) als Nachweis nach Art. 7 Abs. 1 DSGVO?
- A2: Ist eine Löschfrist von 12 Monaten nach der letzten Bestellung für den Kundenstamm angemessen?
- A3: Welche Datenklasse und Löschfrist gelten für die Liste bekannter Lieferorte, die Personenbezug tragen kann und keiner Rufnummer zugeordnet ist?
- A4: Wie ist das freie Notizfeld zu behandeln, wenn ein Anrufer von sich aus Gesundheitsdaten (Allergien, Art. 9) nennt — reicht Speicherung als reine Weitergabe an die Küche, und muss die KI angewiesen sein, solche Angaben nicht aktiv zu erfragen?
- A5: Welche Aufbewahrung gilt für Beschäftigtendaten (Personal, Schichten, Abschlüsse je Mitarbeiter) — abgegrenzt von der Kundenlöschung?
- A6: Wie lange dürfen/müssen personenfreie Anruf-Metadaten (Dauer, Zeitpunkt, Ausgang) aufbewahrt werden?

**Steuerberaterin (Q2), ergänzend:**
- S1: Muss der GoBD-Beleg nach Löschung der Personendaten Summe, Positionen, Zeitpunkt, Zahlart und Bestellnummer zwingend behalten (so modelliert), oder werden weitere Angaben verlangt?
- S2: Darf eine als Test markierte Bestellung an die TSE, oder muss sie fiskalisch außen vor bleiben?
- S3: Sind die Freitextfelder des Tresen-Abschlusses (`comment`, `discrepancy_reason`) fiskalisch aufbewahrungspflichtig — und dürfen/sollen sie personenbezugsfrei gehalten werden?

## Blocker vor dem ersten Migrationsskript

1. B5/B6 — Einwilligungs-Nachweis inkl. „Nein" und Widerruf als append-only modellieren.
2. B7 — Rufnummern-Normalisierung (E.164) als Schlüssel festschreiben.
3. B1 — Drei-Klassen-Modell durch `architect` + Sirat freigeben.
4. B4 — „keine Personendaten"-Regel auf `cash_settlements.comment/discrepancy_reason`, `closures.note` ausdehnen.
5. B8/B9 — Privacy-Abdeckung für `order_customer_details.contact_phone` (ohne `customers`) und `known_delivery_places`; Frist-Schlüssel für bekannte Lieferorte.

Nicht migrations-blockierend, aber vor dem jeweiligen Modul: B2/B11.

## Skill `fluvo-compliance` nachziehen (nur benannt)

- Zwei-Klassen-Tabelle mit der K5-(c)-Klasse abgleichen (nach B1-Freigabe).
- Betroffenenrechte-Liste um `order_customer_details.contact_phone` und `known_delivery_places` ergänzen.
- Voice-Abschnitt: „KI erfragt keine Gesundheitsdaten (Art. 9)"; Nachweis auch bei „Nein"/Widerruf.
- Neue Regel: Rufnummer normalisiert (E.164) als Schlüssel; Freitextfelder in `redact`-Liste.

---

*Bericht vom `compliance-guard` als Text an Jarvis geliefert und von Jarvis hier abgelegt (2026-09-23). Keine Artefakte geändert.*
