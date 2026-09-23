# FA-21: Module und Paket eines Restaurants schalten

- **Status:** mit Sirat durchgegangen (Runden 48 + 50, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Der Betreiber schaltet für ein Restaurant Module und das Minutenpaket ein oder aus und sperrt bzw. entsperrt das Restaurant — Vorgänge, die Geld kosten und über den Vertrag laufen. |
| **Akteur** | Betreiber |
| **Auslöser** | Ein Restaurant bucht ein Modul dazu bzw. ab, wechselt das Minutenpaket, oder soll gesperrt/entsperrt werden. |
| **Vorbedingungen** | Das Restaurant ist angelegt (FA-20). Der Betreiber ist an der Zentrale angemeldet. Die vertragliche Grundlage für die Änderung liegt vor. |
| **Nachbedingungen** | Die gebuchten Module bzw. das Minutenpaket des Restaurants entsprechen **ab sofort** der neuen Konfiguration (Dazu- und Abbuchen gleich; Abrechnung tagesgenau). Bei einer Sperre nimmt das Restaurant **keine neuen** Bestellungen an (die KI sagt ab, die Handannahme ist gesperrt), **laufende** Bestellungen werden zu Ende geführt; der Inhaber sieht den Hinweis „gesperrt, bitte fluvo kontaktieren". Bei Entsperrung nimmt es wieder an. Jede Änderung ist dokumentiert. |

## Ist-Ablauf heute

Es gibt heute keinen Ablauf: Der Pilot ist das erste Restaurant, und es wurde noch nie ein Modul oder Paket nachträglich geschaltet. Dieser Anwendungsfall beschreibt es erstmals. (Mitschrift Runde 1/2.)

## Normalablauf

1. Der Betreiber öffnet das Restaurant in der Zentrale.
2. Der Betreiber wählt die zu **buchenden Module** (Basis, Anrufmanager KI, Küchenmanager, Fahrermanager, Website — Briefing §3) und/oder das **Minutenpaket** aus.
3. Das System legt die **gebuchten Module als Konfiguration je Restaurant** um ([FEST 5]: „Upsell = Flag umlegen").
4. Das System übernimmt die Änderung **sofort** — Dazubuchen und Abbuchen gleich — und dokumentiert sie; die Abrechnung erfolgt **tagesgenau** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).
5. Das Restaurant kann das neu gebuchte Modul **ab sofort** nutzen; ein abgebuchtes Modul steht **ab sofort** nicht mehr zur Verfügung.

## Ausnahmeabläufe

- **2a. Restaurant sperren** (zweigt von Schritt 2 ab): Der Betreiber sperrt das Restaurant — Gründe: **Zahlungsrückstand** oder **Vertragsende** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48). Das gesperrte Restaurant nimmt **keine neuen** Bestellungen an: Die KI **sagt ab**, die **Handannahme ist gesperrt**. Bereits **laufende** Bestellungen werden **zu Ende geführt** (Küche, unterwegs, Abrechnung). Der Inhaber sieht in seinem Profil den Hinweis **„gesperrt, bitte fluvo kontaktieren"**. Endet in: Restaurant gesperrt, keine neuen Bestellungen, laufende abgeschlossen, dokumentiert.
- **2b. Restaurant entsperren** (zweigt von Schritt 2 ab): Der Betreiber hebt eine Sperre auf; das Restaurant kann wieder Bestellungen annehmen. Endet in: Restaurant entsperrt, dokumentiert.
- **3a. Abbuchen eines Moduls mit offenen Vorgängen** (zweigt von Schritt 3 ab): Ein Modul wird abgebucht (wirkt sofort), zu dem es noch laufende Vorgänge gibt (z. B. Fahrermanager mit offener Schicht). Die **offenen Vorgänge werden — analog zur Sperre — zu Ende geführt** (z. B. offene Schicht/Abschluss); das Modul ist **ab dann nur für Neues** weg ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 50). Endet in: laufende Vorgänge abgeschlossen, Modul für Neues nicht mehr verfügbar, dokumentiert.
- **4a. Minutenkontingent verbraucht** (tritt im Betrieb ein, nicht durch diesen Fall ausgelöst): Ist das gebuchte Minutenpaket aufgebraucht, wird die KI **nie abgeschaltet** ([FEST 21]); die weiteren Minuten laufen als Overage weiter. Endet in: KI bleibt erreichbar, Mehrverbrauch wird erfasst.

## Darf nicht

- Die KI wird bei verbrauchtem Minutenkontingent **nie** abgeschaltet ([FEST 21], Briefing §2.21).
- Der **Inhaber** kann Module und Minutenpaket **nicht** selbst schalten und ein Restaurant **nicht** selbst sperren/entsperren — das ist ausschließlich Sache des Betreibers (Mitschrift Runde 2, Spalte „nur Betreiber"). Die **Sperre** ist deshalb **nicht dasselbe** wie das Ausschalten der KI durch den Inhaber (FA-13) oder der Annahmestopp durch die Annahme (FA-23): Diese beiden sind vom Restaurant schaltbar, die Sperre **nur** vom Betreiber ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).
- Eine **laufende** Bestellung wird durch eine Sperre **nicht** abgebrochen — sie wird zu Ende geführt ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48; nichts verschwindet lautlos).
- Eine Modul-/Paketänderung bei Restaurant A verändert **nicht** die Konfiguration von Restaurant B ([FEST 4], [FEST 5]).
- Der Betreiber sieht auch bei diesem Vorgang **keine** Bestellungen oder Kundendaten eines Restaurants (Mitschrift Runde 1, → FA-22).
- Preise oder Beträge einer bereits angelegten Bestellung ändern sich **nicht** durch eine Modul-/Paketänderung (Briefing §5.2, eingefroren).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Nur der Betreiber schaltet Module und Minutenpaket und sperrt/entsperrt ein Restaurant | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 2 |
| Gebuchte Module als Konfiguration je Restaurant; Upsell = Flag umlegen | [FEST 5] | Briefing §2.5 |
| Module: Basis, Anrufmanager KI, Küchenmanager, Fahrermanager, Website, KI-Speisekarten-Digitalisierung | [FEST] | Briefing §3 |
| KI wird bei verbrauchtem Minutenkontingent **nie** abgeschaltet | [FEST 21] | Briefing §2.21 |
| Preismodell modular + nutzungsbasiert (Minutenkontingent + Overage), sekundengenaues Metering | [FEST 21] | Briefing §2.21, §5.4 |
| Restaurant sperren/entsperren ist Betreiber-Sache; vom Restaurant **nicht** schaltbar (anders als KI aus FA-13 und Annahmestopp FA-23) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 2, bestätigt Runde 48 |
| Eine Modul-/Paketänderung wirkt **sofort** (Dazu- und Abbuchen gleich); Abrechnung **tagesgenau** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 48 |
| Sperre = **keine neuen** Bestellungen (KI sagt ab, Handannahme gesperrt); **laufende** Bestellungen werden zu Ende geführt; Gründe: Zahlungsrückstand, Vertragsende | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 48 |
| Bei einer Sperre sieht der **Inhaber** den Hinweis „gesperrt, bitte fluvo kontaktieren" | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 48 |
| Beim **Abbuchen eines Moduls** mit offenen Vorgängen (z. B. offene Schicht) werden diese **zu Ende geführt** (wie bei der Sperre); das Modul ist ab dann nur für Neues weg | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 50 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| FA-21-T1 · Standardfall Modul dazubuchen (wirkt sofort) | Restaurant „Musterpizza", Fahrermanager wird gebucht | Fahrermanager **sofort** verfügbar, Änderung dokumentiert, Abrechnung tagesgenau | Verzögerung bis Monatswechsel; Änderung an anderem Restaurant | manuell + automatisch |
| FA-21-T2 · Modul abbuchen (wirkt sofort) | Website-Modul wird abgebucht | Website **sofort** nicht mehr verfügbar, dokumentiert | Stilles Verschwinden ohne Doku; Verzögerung bis Monatswechsel | manuell + automatisch |
| FA-21-T3 · Modul abbuchen mit offenen Vorgängen (Grenzfall) | Fahrermanager wird abgebucht, während eine **Schicht/ein Abschluss offen** ist | Offener Vorgang wird **zu Ende geführt**; das Modul ist nur für **Neues** nicht mehr verfügbar, dokumentiert | Offenen Vorgang abbrechen; neuen Vorgang trotz Abbuchung starten | automatisch |
| FA-21-T4 · Minutenkontingent verbraucht (Grenzfall) | Minutenpaket auf 0, weiterer Anruf | KI bleibt erreichbar, Mehrverbrauch als Overage erfasst | KI wird abgeschaltet | automatisch + Testanruf |
| FA-21-T5 · Restaurant sperren (Zahlungsrückstand) | Restaurant wird gesperrt, neuer Anruf, neue Handannahme | KI sagt ab, Handannahme gesperrt, keine neue Bestellung, Sperre dokumentiert | Neue Bestellung trotz Sperre | manuell + automatisch + Testanruf |
| FA-21-T6 · Sperre mit laufender Bestellung (Grenzfall) | Bestellung ist „in Küche"/„unterwegs", während gesperrt wird | Laufende Bestellung wird **zu Ende geführt** (bis abgerechnet); nur **neue** werden abgewiesen | Laufende Bestellung abbrechen | automatisch |
| FA-21-T7 · Inhaber sieht Sperr-Hinweis | Restaurant gesperrt, Inhaber öffnet sein Profil | Inhaber sieht „gesperrt, bitte fluvo kontaktieren" | Inhaber sieht Betreiber-Interna oder kann selbst entsperren | manuell + automatisch |
| FA-21-T8 · Restaurant entsperren | Gesperrtes Restaurant wird entsperrt | Bestellungen wieder möglich, dokumentiert | — | manuell + automatisch |
| FA-21-T9 · Inhaber versucht Modul zu schalten | Als Inhaber angemeldet, Modul-/Paketbereich aufrufen | Zugriff verweigert, kein Flag umgelegt | Inhaber legt Flag um | automatisch |
| FA-21-T10 · Zwei-Restaurant-Fall | Modul bei A „Musterpizza" umgelegt, B „Testdöner" (Rufnummer `+49 30 23125 402`) unverändert prüfen | Nur A geändert; B trägt weiterhin seine eigene Konfiguration | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Vertrag / Entitlements pflegen" (K2 noch offen)
- **Zustandsübergänge:** Restaurant: startklar ↔ gesperrt (Restaurant-Lebenszyklus, in K3/K9 zu bestätigen; kein Bestell-Zustand). Bestell-Zustandskette bleibt unberührt; eine Sperre blockiert nur den **Einstieg** neuer Bestellungen (`createOrder`), laufende Bestellungen durchlaufen ihre Kette weiter.
- **Technische Anwendungsfälle:** TU-? (Entitlements sofort setzen, Restaurant sperren/entsperren mit Blockade neuer `createOrder`, Metering/Overage — in K7)
- **Verträge / Events:** `tenant.entitlements_changed`, `tenant.suspended`, `tenant.resumed` (Namen vorläufig, K6 noch offen)
- **Testszenarien:** FA-21-T1 … FA-21-T10 (Tabelle oben)
- **Nachbar-Fälle:** FA-20 (Onboarding, erste Buchung), FA-22 (Überwachung inkl. verbrauchte Minuten), FA-13 (KI-Annahme ein/aus — Inhaber, nicht identisch mit Sperre), FA-23 (Annahmestopp — Annahme, nicht identisch mit Sperre)

## Offene Fragen

> **Beantwortet (Runde 48):** Eine Modul-/Paketänderung wirkt **sofort** — Dazubuchen und Abbuchen gleich; die Abrechnung ist **tagesgenau** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

> **Beantwortet (Runde 48):** Bereits **laufende** Bestellungen werden bei einer Sperre **zu Ende geführt** (Küche, unterwegs, Abrechnung); nur **neue** Bestellungen werden abgewiesen ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

> **Beantwortet (Runde 48):** Eine **Sperre** umfasst **alle neuen** Bestellungen — die KI sagt ab, die Handannahme ist gesperrt. Gründe: **Zahlungsrückstand** oder **Vertragsende** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

> **Beantwortet (Runde 48):** Der **Inhaber** sieht bei einer Sperre den Hinweis **„gesperrt, bitte fluvo kontaktieren"** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

> **Beantwortet (Runde 50):** Beim **Abbuchen eines Moduls** mit noch **offenen Vorgängen** (z. B. Fahrermanager mit offener Schicht) werden diese — **analog zur Sperre — zu Ende geführt**; das Modul ist ab dann nur für **Neues** weg ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 50).

## Nicht Teil dieses Anwendungsfalls

- Erstmaliges Buchen beim Onboarding im Zusammenhang → FA-20.
- KI-Annahme durch den Inhaber ein-/ausschalten (Overflow, betriebliche Entscheidung, kein Vertrag) → FA-13.
- Anzeige der verbrauchten Minuten und des Gesundheitszustands → FA-22.
- Details der SaaS-Abrechnung/Overage-Verrechnung (Stripe Meters) → K6/K7, Briefing §5.4.
- Preise und Paketstaffeln (vertraulich, nicht in diesem Artefakt) → Business Brain, Sirat.
