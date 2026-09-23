---
name: fluvo-compliance
description: Compliance-Bauvorgaben von fluvo als Checkliste für die Umsetzung — kein Audio, KI-Offenlegung, Datensparsamkeit, zwei Datenklassen mit Löschkonzept, Betroffenenrechte per Rufnummer, Logging ohne Personendaten, Website-Pflichten. Laden bei Arbeit an Personendaten, Logging, Voice, modules/privacy oder der Website.
---

# Compliance als Bauvorgabe

Entwurfsstand, keine Rechtsberatung. Quelle: `docs/briefing.md` §6. Diese Vorgaben gelten ab der ersten Zeile Code, nicht erst vor dem Pilot.

## Logging ohne Personendaten

Personenbezogen sind hier vor allem: Rufnummer, Name, Adresse, Bestellhinweise im Freitext, E-Mail, IP-Adresse.

- Geloggt werden IDs (`tenantId`, `orderId`, `callId`), nie die Daten selbst.
- Logger mit Schwärzung einrichten (pino `redact` für bekannte Feldnamen) — als zweite Sicherung, nicht als Ersatz für Sorgfalt. In die `redact`-Liste gehören auch die Freitextfelder, die Personenbezug tragen können: `note`, `driver_hint`, `comment`, `discrepancy_reason`, `closures.note`.
- Nie ganze Request-Bodies, Webhook-Payloads oder Fehlerobjekte mit Eingabedaten loggen.
- Sentry: `sendDefaultPii: false`, Request-Daten entfernen, EU-Region.
- URLs: keine Rufnummer, keine Adresse, kein Name in Pfad oder Query. Suche per Rufnummer läuft als POST.
- Fehlermeldungen an Clients nennen keine Daten anderer Personen.

## Drei Datenklassen (ADR 0016)

| Klasse | Inhalt | Regel |
|---|---|---|
| (a) löschbar | `customers`, `customer_addresses`, `order_customer_details` (Name, Rufnummer, Adresse, Notiz), `known_delivery_places` | Löschung auf Anfrage und nach Frist |
| (b) GoBD, 10 Jahre | `orders`, `order_items`, `order_events`, Zahlungen, Fiskaldaten, Kassensturz | Beleg bleibt; Personenbezug steht nicht hier, nur der Verweis |
| (c) betrieblich | Speisekarte, Zonen, Öffnungszeiten, Geräte — Stammdaten **ohne** Personenbezug und **ohne** Buchungscharakter | keine Löschfrist der Kundenlöschung; betriebliche Aufbewahrung |

**Beschäftigtendaten sind keine (c):** `users`, `staff_shifts` (und der Beschäftigtenbezug in `cash_settlements` über `user_id`) sind Beschäftigtendaten mit **eigener** Aufbewahrung (§ 26 BDSG, Frist → Anwalt A5) — **nicht** der Kundenlöschung unterworfen. `users` wird deaktiviert (`active=false`), nicht kundengelöscht.

Folge für den Entwurf: Tabellen der Klasse (b) enthalten keine Personendaten, nur den Verweis `customer_id`. Die Personendaten einer Bestellung liegen getrennt in `order_customer_details` (a); Löschung = **ganze Zeile löschen** (nicht in-place pseudonymisieren), der Beleg (b) bleibt. `customer_id`-FK auf `ON DELETE SET NULL`. Event-Payloads von Anfang an ohne Personendaten bauen — sie lassen sich später nicht ändern.

**Löschjobs laufen tabellen-/regelscharf**, je Tenant, protokolliert (pg-boss) — nie „alle (a)" (sonst würde ein Job `users` fälschlich kundenlöschen). Konkrete Fristen: [OFFEN] (Q10, Anwalt A1–A6).

## Betroffenenrechte

Modul `privacy`, im Admin-Bereich des Restaurants: Auskunft, Export (maschinenlesbar) und Löschung **per Rufnummer**. Jede neue Tabelle mit Personenbezug muss dort aufgenommen werden — sonst ist die Auskunft unvollständig. Dafür gibt es einen Test, der alle Tabellen mit Personendaten-Spalten gegen die Liste in `privacy` prüft.

- **Rufnummer als Schlüssel ist E.164-normalisiert** (`customers.phone`, `order_customer_details.contact_phone`) — sonst matchen „030…"/„+49 30…" nicht und die Betroffenenrechte greifen nicht. Vor der ersten Migration festschreiben (Zod).
- Die Abdeckung reicht **nicht** nur über `customers`: `order_customer_details.contact_phone` kann **ohne** `customers`-Zeile existieren (Kunde sagte „Nein") — Auskunft/Löschung müssen direkt über dieses Feld greifen. `known_delivery_places` hat **keinen** Rufnummern-Bezug (Namens-/Freitextsuche nötig). Beide gehören ausdrücklich in die Vollständigkeitsprüfung.

fluvo ist Auftragsverarbeiter, das Restaurant ist verantwortlich. Jeder neue externe Dienst ist ein Unterauftragsverarbeiter → in `docs/open-questions.md` vermerken, EU-Region bevorzugen.

## Voice

- Kein Audio speichern, Aufzeichnung beim Anbieter aus (§ 201 StGB).
- KI stellt sich als KI vor, technisch erzwungen (AI Act Art. 50).
- Kein dauerhaftes Volltranskript; nur strukturierter Bestelltext.
- **Die KI erfragt keine Gesundheitsdaten (Art. 9)** aktiv (z. B. Allergien). Nennt ein Anrufer sie von sich aus, sind sie reine Weitergabe an die Küche (Notizfeld) — nie in Events/Logs/Voice-Kette (A4).
- **Einwilligungs-Nachweis append-only:** Die Einwilligung „Adresse merken?" wird als `order_events`-Ereignis festgehalten — **auch bei „Nein"** (`consent.recorded`) und beim **Widerruf** (`consent.revoked`, Folge: Kundeneintrag löschen). Inhalt: Fragetext-Version, Antwort Ja/Nein, Bezug (order/call), `occurred_at`, `actor` — **ohne Name/Rufnummer/Audio**. `customers.consent` bleibt nur der Ist-Zustand.
- Stammkunden nur per Rufnummer, keine Stimm-Biometrie.
- In die KI-Kette nur Bestellinhalt und pseudonymisierte Kennung.

## Website

- WCAG 2.1 AA: Kontrast, Tastaturbedienung, sichtbarer Fokus, Labels, Alternativtexte, keine reine Farbcodierung. Automatisch prüfen (axe) **und** einmal von Hand mit Tastatur und Screenreader.
- Allergene und Zusatzstoffe je Artikel (LMIV), vor dem Kauf sichtbar.
- Impressum, Datenschutzerklärung, Widerrufs-/AGB-Hinweise je Tenant aus der Konfiguration.
- Button-Lösung: Bestellknopf eindeutig beschriftet („zahlungspflichtig bestellen"), Gesamtsumme und Positionen direkt davor.
- Cookies: nur technisch notwendige, dann kein Banner nötig. Keine Tracker, keine extern geladenen Schriften.

## Nicht im MVP

Fahrer-GPS und Live-Tracking (Beschäftigtendatenschutz) — nicht bauen, auch nicht „vorbereitend" Standortdaten erfassen.
