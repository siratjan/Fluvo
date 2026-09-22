# fluvo — Umsetzungs-Briefing für Agenten

**Stand:** 2026-09-18 · **Zweck:** Eine Datei, die ein (KI-)Agent oder Entwickler liest und danach
genau weiß, *was* fluvo ist und *wie* es technisch umgesetzt wird.
**Grundlage:** Business-Brain-Vault (`wiki/`), v. a. [[@Technische Architektur]],
[[@KI-Agent Architektur & Kosten]], [[Modularer Monolith]], [[Gehirn vs. Hände]],
[[Preismodell fluvo]], [[DSGVO & Regulierung Deutschland — Tiefenrecherche]].

**Lesehilfe — drei Verbindlichkeitsstufen:**
- **[FEST]** = im Vault entschieden. Nicht neu diskutieren, nicht „verbessern".
- **[STACK]** = Technologie-Empfehlung des Agenten vom 2026-09-18 (nicht quellenbelegt, Allgemeinwissen).
  Gilt als Arbeitsgrundlage, solange Sirat nichts anderes sagt. Abweichen nur mit Begründung und Rückfrage.
- **[OFFEN]** = ungeklärt. Nicht raten — so bauen, dass beide Antworten möglich bleiben, und Sirat fragen.

> **Arbeitsmodus:** Das Vault ist in der Discovery-Phase („kein Produktionscode, solange nicht
> ausdrücklich verlangt"). Code wird erst geschrieben, wenn Sirat es für die jeweilige Aufgabe
> ausdrücklich ansagt. Der Code lebt in einem **eigenen Repo**, nicht im Vault.

---

## 1. Die Idee in Kürze

**fluvo** ist eine KI-gestützte Bestell- und Betriebsplattform (Cloud-SaaS) für kleine,
familiengeführte Liefer-Restaurants im DACH-Raum. Claim: *„Reibungslos — vom Anruf bis zum Kunden."*

- **Problem:** Der Ablauf hängt an handschriftlichen Zetteln (Schreib-/Rechenfehler), das Telefon ist in
  Stoßzeiten überlastet, Lieferando kostet rund 20 % Provision.
- **Lösung:** Eine KI nimmt Telefonbestellungen an; ein Orchestrator führt jede Bestellung durch
  **Anruf → Küche → Fahrer → Abrechnung**. Zusätzlich eine eigene, provisionsfreie Bestell-Website.
- **Zielgruppe:** Betriebe ab ca. 20 Bestellungen/Tag, wenig technikaffines Personal, hohe Fluktuation.
  → Jede Oberfläche muss ohne Schulung bedienbar sein (große Buttons, wenige Schritte).
- **Differenzierung:** „KI am Telefon" allein ist kein Alleinstellungsmerkmal mehr, der reine Workflow auch
  nicht. Der Burggraben ist die **Integration** aus KI-Anruf + Workflow + **Fahrer-Bargeldabrechnung**
  als *ein* einfaches System. Das Zeitfenster dafür ist begrenzt → Tempo zählt.
- **Pilot:** Ein Pilotinteressent mit ca. 120 Telefonbestellungen/Tag (≈ 1.040 KI-Minuten/Monat).
  Noch keine zahlenden Kunden.
- **Team:** Solo-Gründer, baut mit KI-Agenten. → Wenige bewegliche Teile, Standard-Technik, eine Sprache.

---

## 2. Feste Produktentscheidungen [FEST]

1. **Modularer Monolith:** eine Codebasis, eine Datenbank, ein Deployment. Keine Microservices.
2. **Ein Kern, Module sind nur Sichten.** Zentrales Objekt ist die **Bestellung** als Zustandsmaschine:
   `Eingegangen → In Küche → Fertig → Unterwegs → Geliefert → Abgerechnet`.
   Der Kern kennt keine Kanäle (Telefon, Website, manuell sind nur Eingänge).
3. **Zweite Kernressource: die Speisekarte.** KI, Website, Bon, Küchendisplay und Abrechnung lesen
   *dieselbe* Karte. Es gibt keine zweite Kopie der Wahrheit.
4. **Multi-Tenant über `tenant_id`**, Isolation per Middleware erzwungen.
5. **Entitlements als Tenant-Konfiguration** (Module, KI-Paket, Minuten, Modus). Upsell = Flag umlegen.
6. **Events in-process** (kein Kafka). Das Ereignisprotokoll ist zugleich der **GoBD-Audit-Trail**.
7. **Module hängen nur vom Kern ab, nie voneinander.**
8. **Gehirn vs. Hände:** Ein LLM nur für Sprache und Urteil. Alles Berechenbare (Preise, Summen,
   Liefergebiet, Status, Abrechnung) ist deterministischer Code.
9. **Voice kaufen statt bauen:** Im MVP eine Komplett-Plattform (Start: **Retell**; Vapi als
   Diagnose-Werkzeug). Eigener Voice-Stack erst bei Volumen/Margendruck.
10. **Entlastungs-MVP:** Die KI entlastet das Telefon (Ziel ≈ 85 % selbst, ≈ 15 % Eskalation an Menschen),
    sie ersetzt das Personal nicht. **Overflow-Modus:** KI geht ran, wenn niemand abnimmt; im MVP An/Aus-Schalter.
11. **Die KI sagt nichts zu, was Geld kostet** (keine Rabatte, keine Stornos).
12. **KI-MVP-Scope:** nur (1) Anruf aufnehmen und (2) Bestellung anlegen/routen. Status-Auskunft und
    Live-ETA/GPS sind V2.
13. **Kein Audio speichern.** Nur strukturierter Text. Zustimmungen als Log-Eintrag.
14. **Die KI stellt sich zu Gesprächsbeginn als KI vor** — technisch erzwungen, nicht dem Prompt überlassen.
15. **Stammkunden-Erkennung nur per Rufnummer.** Keine Stimm-Biometrie.
16. **TSE wird eingebaut** (Cloud-TSE per API); DSFinV-K-Export ist Teil des Datenmodells.
    Die Fahrer-Bargeldabrechnung gehört buchhalterisch in den Kern, nicht ins Fahrer-Modul.
17. **BYOD:** Fahrer nutzen eine PWA auf dem Privathandy (kein App-Store). fluvo verkauft keine Hardware.
18. **Offline-First für Küche und Bon:** Beides muss einen Internetausfall überleben. Die KI-Telefonie
    braucht Internet; Fallback: das Telefon klingelt normal durch.
19. **Website:** ein Template, gefüllt aus Tenant-Konfiguration + Speisekarte. Bestehende Websites werden
    ersetzt, nicht angebunden. Barrierefrei nach WCAG 2.1 AA.
20. **Lieferando wird nicht ersetzt**, fluvo läuft daneben.
21. **Preismodell modular + nutzungsbasiert** (Minutenkontingent + Overage, KI wird nie abgeschaltet).
    → **Minuten-Metering sekundengenau**; Abrechnung ist ein eigenes Teilsystem.

---

## 3. Module

| Modul | Was es ist | Technische Form |
|---|---|---|
| **Kern** | Tenant, Entitlements, Speisekarte, Bestellung, Zustandsmaschine, Event-Log, TSE-Anbindung, Kassensturz | Backend |
| **Basis** | Manuelle Bestellannahme + Bon-Druck | Web-App (Annahme-Oberfläche) |
| **Anrufmanager KI** | Voice-Plattform nimmt Anruf an, legt Bestellung über *denselben* Endpunkt an wie die manuelle Annahme | Webhook + Function Calls |
| **Küchenmanager** | Küchendisplay, Status weiterschalten, mehrere Stationen | Web-App im Kiosk-Modus, WebSocket, Offline-Cache |
| **Fahrermanager** | QR auf dem Bon (Bestell-ID + Einmal-Token) → Navigation + Bargeldabrechnung; Kassensturz pro Fahrer (Bar/Karte/Storno) | PWA |
| **Website** | Provisionsfreier Bestellkanal je Restaurant, eigene Domain | Server-gerendertes Template |
| **KI-Speisekarten-Digitalisierung** | Foto/PDF der Karte → Artikel | Onboarding-Werkzeug (LLM + manuelle Freigabe) |

---

## 4. Tech-Stack [STACK]

| Schicht | Wahl | Begründung |
|---|---|---|
| Sprache | **TypeScript** überall, Monorepo mit **pnpm** | Eine Sprache; Backend, PWAs und Website teilen Typen und Validierungs-Schemas. |
| Validierung | **Zod**-Schemas im gemeinsamen Paket | Bestellung und Speisekarte einmal definiert, überall geprüft. |
| Backend | **Node.js + Fastify** als dauerhaft laufender Server (nicht serverless) | WebSockets, Voice-Webhooks und Drucker-Polling brauchen einen langlebigen Prozess. |
| Datenbank | **PostgreSQL** + **Drizzle ORM**; **PostGIS** für Liefergebiete | `tenant_id` in Middleware **und** als Row-Level-Security in der DB (doppelter Boden). |
| Events/Audit | Append-only-Tabelle `order_events`, Outbox-Muster | Kein Kafka. Nie UPDATE/DELETE auf Events. |
| Jobs | **pg-boss** (Postgres-basiert) | Kein Redis nötig. |
| Zustandsmaschine | Einfache Übergangstabelle im Code, nur im Kern | Keine Bibliothek. Der Server entscheidet jeden Übergang. |
| Annahme, Küche, Fahrer, Admin | **React + Vite** als PWAs; Live-Updates per WebSocket | Offline: Service Worker + IndexedDB + Aktions-Warteschlange mit Idempotenz-Schlüsseln. |
| Restaurant-Website | **Astro** (server-gerendert), ein Template | Kundendomains über **Caddy mit On-Demand-TLS** (Let's Encrypt). |
| Online-Zahlung | **Mollie** oder **Stripe Checkout** (gehostete Zahlseite, SAQ A) | Keine Kartendaten im eigenen System. |
| Voice | **Retell** hinter einem `VoiceProvider`-Adapter | Anbieterwechsel (Vapi, eigener Stack) ohne Umbau des Kerns. |
| Bon-Druck | **Star CloudPRNT** (Drucker fragt den Server ab) | Keine Software im Laden. Lokaler Fallback siehe §6. |
| TSE | **fiskaly SIGN DE** per API (Alternative: Deutsche Fiskal) | Hinter einem `FiscalProvider`-Adapter. |
| SaaS-Abrechnung | **Stripe Billing** mit Meters (nutzungsbasiert) | Minuten aus dem Call-Ended-Webhook. |
| Hosting | **Hetzner (Deutschland)**, Docker, Deploy mit Coolify oder Kamal | EU-Hosting. DB alternativ als Managed-Dienst eines EU-Anbieters. Tägliche, getestete Backups. |
| Monitoring | Sentry (EU-Region), strukturierte Logs **ohne** personenbezogene Daten | |
| Login | Inhaber: E-Mail-Link. Küche/Fahrer: PIN bzw. QR-Token | Kein Passwort-Aufwand für fluktuierendes Personal. |

**Verworfen:** Supabase + Next.js (Logik verstreut, US-Anbieter) · Make/Notion/Airtable als Produktivsystem
(kein TSE/GoBD/Offline/Mandantentrennung; der Notion-Prototyp bleibt Blaupause fürs Datenmodell) ·
Python/FastAPI (nur sinnvoll für einen späteren eigenen Voice-Stack, der ohnehin ein separater Dienst wäre).

---

## 5. Architektur

### 5.1 Repo-Struktur
```
fluvo/
├── apps/
│   ├── api/            ← Fastify-Server (der Monolith)
│   ├── web-staff/      ← PWA: Annahme, Küche, Fahrer, Admin (Rollen-Ansichten)
│   └── site/           ← Astro-Template der Restaurant-Websites
├── packages/
│   ├── core/           ← Domänenlogik: Bestellung, Zustandsmaschine, Speisekarte, Preise, Entitlements, Events
│   ├── modules/
│   │   ├── intake/     ← manuelle Annahme
│   │   ├── voice/      ← VoiceProvider-Adapter (Retell), Function-Call-Handler, Metering
│   │   ├── kitchen/
│   │   ├── driver/     ← QR-Token, Kassensturz-Ansicht
│   │   ├── printing/   ← CloudPRNT, Bon-Layout
│   │   ├── fiscal/     ← FiscalProvider-Adapter (fiskaly), DSFinV-K-Export
│   │   ├── billing/    ← Stripe Meters, Entitlement-Sync
│   │   └── privacy/    ← Auskunft/Export/Löschung per Rufnummer, Löschfristen
│   ├── schemas/        ← Zod-Schemas, geteilt
│   └── db/             ← Drizzle-Schema, Migrationen
```
**Regel, maschinell geprüft (dependency-cruiser):** `modules/*` darf nur `core`, `schemas`, `db` importieren —
nie ein anderes Modul. Module sprechen miteinander ausschließlich über Events des Kerns.

### 5.2 Datenmodell (Kern)
- `tenants` (inkl. `entitlements` als JSON: Module, KI-Paket, Minuten, Overflow-Modus), `users`, `devices`
- `menus`, `menu_categories`, `menu_items`, `menu_options` — **mit Allergen-Feldern (LMIV)** und Steuersatz
- `customers` (Schlüssel: Rufnummer je Tenant), `addresses`
- `orders`, `order_items` (Preis und Artikeltext zum Bestellzeitpunkt **einfrieren**), `order_events`
- `drivers`, `driver_shifts`, `cash_settlements` (Bar/Karte/Storno je Fahrer und Schicht)
- `payments`, `fiscal_transactions` (TSE-Signaturen), `voice_calls` (Dauer in Sekunden, **kein Audio, kein Volltranskript auf Dauer**)
- Jede Tabelle trägt `tenant_id`. Row-Level-Security ist auf jeder Tabelle aktiv.
- **Zwei Datenklassen:** (a) DSGVO-löschbar (Kundenstamm, Rufnummer, Adresse) und (b) GoBD-pflichtig, 10 Jahre
  (Buchungs-/Kassendaten). Löschung = Personenbezug aus (b) entfernen/pseudonymisieren, Beleg bleibt.

### 5.3 Bestellfluss
1. Eingang (manuell, Voice oder Website) ruft **denselben** Kern-Befehl `createOrder` auf.
2. Der Kern validiert gegen Speisekarte, Liefergebiet und Öffnungszeiten, berechnet Preise, schreibt `order_events`.
3. Event `order.created` → `printing` druckt den Bon mit QR, `kitchen` zeigt an.
4. Statuswechsel nur über Kern-Befehle; nur Vorwärts-Übergänge, Storno als eigener, protokollierter Pfad.
5. Fahrer scannt den QR → Navigation (Deep-Link in die Karten-App) → „Geliefert" + Zahlart.
6. Schichtende: Kassensturz pro Fahrer → `Abgerechnet`; TSE-/Kassenlogik im Kern.

### 5.4 Voice-Anbindung
- Die Rufnummer des Restaurants wird per **Rufumleitung bei Nichtmelden** auf die Nummer der Voice-Plattform
  geleitet (= Overflow-Modus, keine Hardware).
- Die KI-Ansage („Sie sprechen mit einem KI-Assistenten …") ist ein **fester erster Satz in der
  Agent-Konfiguration**, nicht Teil des frei formulierten Prompts.
- Die Speisekarte steht kompakt im Prompt (je Tenant generiert, bei Kartenänderung automatisch neu synchronisiert).
  **Preise, Verfügbarkeit, Adresse und Liefergebiet prüft die KI immer per Function Call** gegen die eigene API:
  `check_menu_item`, `validate_address`, `get_customer_by_phone`, `create_order`, `escalate_to_human`.
- Summen rechnet der Server, nie das LLM.
- Aufzeichnung und Speicherung beim Voice-Anbieter **abschalten**.
- Abgebrochene Gespräche: Bestellung erst mit `create_order` nach ausdrücklicher Bestätigung; vorher kein Datensatz in `orders`.
- Metering: Dauer in Sekunden aus dem Call-Ended-Webhook → `voice_calls` → Stripe Meter.
- Kostenampel (Vault): bis 0,15 €/Min ist das Preismodell tragfähig, über 0,20 €/Min muss es angepasst werden.
  Latenz-Budget: unter 1 Sekunde.

### 5.5 Offline-Strategie
- Küchen- und Annahme-PWA halten offene Bestellungen und die Speisekarte in IndexedDB.
- Aktionen (Status weiter, neue manuelle Bestellung) landen in einer Warteschlange mit Idempotenz-Schlüssel
  und werden bei Verbindung nachgespielt. Konfliktregel: Der Server wendet nur gültige Vorwärts-Übergänge an,
  doppelte Aktionen werden ignoriert.
- Bon-Druck offline: lokaler Druck aus der PWA im selben Netz (z. B. Star WebPRNT). **Früh mit echtem Drucker testen.**

---

## 6. Compliance als Bauvorgabe („ab Tag 1")

Entwurfsstand, keine Rechtsberatung — Anwalt und Steuerberaterin prüfen noch. Trotzdem so bauen:

- Kein Audio speichern (§ 201 StGB). KI-Offenlegung technisch erzwungen (AI Act Art. 50).
- fluvo ist **Auftragsverarbeiter** der Restaurants; AVV, Verarbeitungsverzeichnis und DSFA müssen vor dem Pilot stehen.
- Auskunft, Export und Löschung **per Rufnummer** als Funktion im Admin-Bereich.
- Löschkonzept mit den zwei Datenklassen aus §5.2; automatische Löschfristen als Job.
- **Provider-agnostische KI-Kette:** LLM, STT, TTS und Voice hinter Adaptern. EU-Region bevorzugen.
  In die Voice-Kette nur Bestellinhalt und pseudonymisierte Kennung geben, so wenig Personenbezug wie möglich.
- Keine personenbezogenen Daten in Logs, Fehlermeldungen oder URLs.
- Cloud-TSE + DSFinV-K-Export im Datenmodell; Event-Log unveränderlich.
- Website: WCAG 2.1 AA, Allergen-Kennzeichnung, Impressum/Datenschutz/Widerruf je Tenant, Button-Lösung im Checkout.
- Fahrer-GPS berührt Beschäftigtendatenschutz → im MVP **nicht** bauen.

---

## 7. Baureihenfolge

Ziel ist ein dünner Durchstich für den Piloten: **Anruf → Bestellung → gedruckter Bon.**

1. **Kern:** Tenant/Entitlements, Speisekarte, Bestellung, Zustandsmaschine, Event-Log, RLS, TSE-Grundgerüst im Datenmodell.
2. **Basis:** manuelle Annahme + Bon-Druck (CloudPRNT) inkl. Offline-Test.
3. **Anrufmanager KI:** Retell an denselben Endpunkt, Function Calls, Metering, Eskalation.
4. **Fahrer-PWA:** QR-Scan, Geliefert/Zahlart, Kassensturz — der Teil, der fluvo vom Wettbewerb abhebt.
5. **Küchendisplay.**
6. **Website** mit Online-Zahlung und Kundendomains.
7. **Abrechnung der fluvo-Kunden** (Stripe Meters) und Speisekarten-Digitalisierung als Onboarding-Werkzeug.

> [!warning] Widerspruch im Vault
> [[@Technische Architektur]] nennt die Reihenfolge Kern+TSE → Basis+Bon → Fahrer → KI → Küche → Website.
> [[Go-to-Market & Onboarding]] beschreibt den Rollout mit KI-Telefon zuerst. Die Reihenfolge oben ist der
> Vorschlag des Agenten (KI auf Platz 3), von Sirat noch nicht als [Entschieden] bestätigt.

---

## 8. Offene Punkte [OFFEN]

| # | Frage | Wie damit bauen |
|---|---|---|
| A24 / Q2 | Rufnummernumleitung in Deutschland: Anbieter, Kosten, Weiterleitung vs. Portierung | Telefonie-Nummer je Tenant konfigurierbar halten; vor dem Pilot mit echter Leitung testen. |
| Q1 / A11 | Ergebnis des Schicht-3-Voice-Tests ist im Vault noch nicht eingetragen | Sirat trägt nach; bis dahin gilt Retell als Arbeitsannahme. |
| Q5 / Q11 | TSE-Einordnung durch die Steuerberaterin; ab wann im Pilot scharf | `FiscalProvider` mit Test-/Live-Modus, Datenmodell von Anfang an vollständig. |
| Q9 | EU-Provider-Shortlist für LLM/STT/TTS | Adapter, keine Anbieter-Spezifika im Kern. |
| — | Cloud-Druck und Offline-Druck mit echtem Gerät verifizieren | Früh im Schritt 2. |
| — | Offline-Pufferdauer und Konfliktregeln der Küche im Detail | Start mit der Regel aus §5.5. |
| — | Eskalation mitten im Anruf (Weiterleitung an welches Telefon?) | `escalate_to_human` als Function Call, Ziel je Tenant konfigurierbar. |
| — | Zweite Preis-Staffel im Vault noch nicht konsolidiert | Preise nie im Code fest verdrahten; alles über Entitlements/Stripe-Produkte. |
| — | Reihenfolge Bau vs. Go-to-Market (siehe §7) | Sirat entscheidet. |
| — | Selbst betriebener Server vs. Managed-Dienste | Hängt von Sirats Betriebserfahrung ab; Docker hält beides offen. |

---

## 9. Regeln für jeden Agenten, der an fluvo arbeitet

1. Erst dieses Briefing lesen. [FEST] nicht in Frage stellen, [STACK] einhalten, bei [OFFEN] fragen.
2. Keine neue Infrastruktur (Redis, Kafka, zweite Datenbank, zweite Sprache, Microservice) ohne Rückfrage.
3. Geschäftslogik gehört in `packages/core`, nie in eine Oberfläche, nie in einen Prompt.
4. Jede neue Tabelle: `tenant_id` + RLS-Policy + Test, der Mandanten-Übergriff nachweislich verhindert.
5. Jede Zustandsänderung einer Bestellung erzeugt ein Event. Events werden nie geändert oder gelöscht.
6. Geldbeträge als ganze Cent (Integer), nie als Fließkommazahl. Summen rechnet nur der Server.
7. Externe Dienste (Voice, TSE, Druck, Zahlung, LLM) immer hinter einem Adapter mit Test-Attrappe.
8. Keine personenbezogenen Daten in Logs, Tests, Beispieldaten oder an externe Dienste. Keine echten Kundendaten im Repo.
9. Bedienoberflächen für Küche/Fahrer: große Buttons, ein Schritt pro Bildschirm, ohne Schulung verständlich, offline-tauglich.
10. Tests zuerst für: Zustandsmaschine, Preisberechnung, Mandantentrennung, Kassensturz, Metering.
11. Keine Zahlen, Kunden oder Testergebnisse erfinden. Was fehlt, als offen markieren und Sirat fragen.
12. `outputs/fluvo/pitch/build_deck.js` nie ungefragt ausführen (überschreibt manuelle PowerPoint-Änderungen).
