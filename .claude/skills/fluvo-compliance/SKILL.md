---
name: fluvo-compliance
description: Compliance-Bauvorgaben von fluvo als Checkliste für die Umsetzung — kein Audio, KI-Offenlegung, Datensparsamkeit, zwei Datenklassen mit Löschkonzept, Betroffenenrechte per Rufnummer, Logging ohne Personendaten, Website-Pflichten. Laden bei Arbeit an Personendaten, Logging, Voice, modules/privacy oder der Website.
---

# Compliance als Bauvorgabe

Entwurfsstand, keine Rechtsberatung. Quelle: `docs/briefing.md` §6. Diese Vorgaben gelten ab der ersten Zeile Code, nicht erst vor dem Pilot.

## Logging ohne Personendaten

Personenbezogen sind hier vor allem: Rufnummer, Name, Adresse, Bestellhinweise im Freitext, E-Mail, IP-Adresse.

- Geloggt werden IDs (`tenantId`, `orderId`, `callId`), nie die Daten selbst.
- Logger mit Schwärzung einrichten (pino `redact` für bekannte Feldnamen) — als zweite Sicherung, nicht als Ersatz für Sorgfalt.
- Nie ganze Request-Bodies, Webhook-Payloads oder Fehlerobjekte mit Eingabedaten loggen.
- Sentry: `sendDefaultPii: false`, Request-Daten entfernen, EU-Region.
- URLs: keine Rufnummer, keine Adresse, kein Name in Pfad oder Query. Suche per Rufnummer läuft als POST.
- Fehlermeldungen an Clients nennen keine Daten anderer Personen.

## Zwei Datenklassen

| Klasse | Inhalt | Regel |
|---|---|---|
| (a) löschbar | `customers`, `addresses`, Rufnummer, Freitext-Hinweise | Löschung auf Anfrage und nach Frist |
| (b) GoBD, 10 Jahre | Bestellungen, Positionen, Zahlungen, Events, Fiskaldaten, Kassensturz | Beleg bleibt; Personenbezug wird entfernt oder pseudonymisiert |

Folge für den Entwurf: Tabellen der Klasse (b) enthalten keine Personendaten, nur den Verweis `customer_id`. Löschung = Kundendatensatz löschen/leeren, Verweis zeigt danach auf einen anonymen Platzhalter. Lieferadresse an der Bestellung: nach Frist entfernen. Event-Payloads von Anfang an ohne Personendaten bauen — sie lassen sich später nicht ändern.

Löschfristen laufen als Job (pg-boss), je Tenant, protokolliert. Konkrete Fristen: [OFFEN].

## Betroffenenrechte

Modul `privacy`, im Admin-Bereich des Restaurants: Auskunft, Export (maschinenlesbar) und Löschung **per Rufnummer**. Jede neue Tabelle mit Personenbezug muss dort aufgenommen werden — sonst ist die Auskunft unvollständig. Dafür gibt es einen Test, der alle Tabellen mit Personendaten-Spalten gegen die Liste in `privacy` prüft.

fluvo ist Auftragsverarbeiter, das Restaurant ist verantwortlich. Jeder neue externe Dienst ist ein Unterauftragsverarbeiter → in `docs/open-questions.md` vermerken, EU-Region bevorzugen.

## Voice

- Kein Audio speichern, Aufzeichnung beim Anbieter aus (§ 201 StGB).
- KI stellt sich als KI vor, technisch erzwungen (AI Act Art. 50).
- Kein dauerhaftes Volltranskript; nur strukturierter Bestelltext. Zustimmungen als Log-Eintrag (Event).
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
