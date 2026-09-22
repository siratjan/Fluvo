# Übergabe 2026-09-21 · Rufumleitung: Recherche, Testprotokolle AP-001/AP-002, Telefonie-Varianten

Sitzung: Jarvis mit Sirat. Kein Code, kein Commit. Sitzung wurde wieder in `C:\Users\sirat` gestartet — Hooks des fluvo-Ordners liefen nicht durchgehend. Cockpit lief (http://localhost:4777).

## Erledigt

**Geprüft (von Jarvis selbst gemacht und kontrolliert)**
- Web-Recherche Rufumleitung Deutschland (generische Suchanfragen, nichts aus dem Business Brain nach außen). Kernbefund: Umleitung **beim Netzbetreiber** einrichten, nie im Router — sonst fehlt die Anrufernummer.
- `docs/arbeitspakete/testprotokoll-AP-001-rufumleitung.md` (neu): Stufen 0–3, Pflichtumfang **Variante X** (Netzbetreiber steuert: `*61*`+`*67*` dauerhaft, `*21*` für „KI nimmt alles"), neue Testfälle D2 (gleichzeitige Anrufe), D3 (Sofort-Umleitung), D5 (Betriebsablauf Variante X), D4 als Kür (Variante Y), Zettel-Vorlage fürs Restaurant.
- `docs/arbeitspakete/testprotokoll-AP-002-bondruck.md` (neu): CloudPRNT-Messung, lokaler Druck ohne Internet mit 8er-Matrix, Alternativen C1–C4. Neuer Befund: Chrome ≥ 142 „Local Network Access" nimmt private IPs von der Mixed-Content-Sperre aus; Safari nicht.
- **AP-001 auf `freigegeben`** (Sirat: „ich führe das aus"), Schritt 1 abgehakt, Übersicht `README.md` nachgezogen. Cockpit zeigt es an.
- `docs/open-questions.md` Q15 erweitert: technische Grenze (Schleife beim Zurückstellen), Sirats Wunsch nach umschaltbaren Modi, Variante X vs. Y, Überlegung „KI nie ganz aus".
- Business Brain, auf Sirats Ansage („mach den ingest"): neue Synthese-Seite zur Rufumleitung, A24 → [In Progress], Q12/Q13 neu, 8 Seiten nachgezogen, Lint sauber. Dort nichts committet.

**Ungeprüft**
- Alle Preise und Anbieter-Aussagen stammen von Webseiten vom 2026-09-21, nichts davon praktisch getestet. Latenz- und Kostenrechnungen sind Richtwerte mit angenommenen 3.600 Min/Monat.
- Menüpfade in der Twilio-Konsole und in der Drucker-Weboberfläche nicht selbst gesehen.
- Ob `*61*`/`*67*` ein `*21*` … `#21#` überleben (Kernfrage von D5), ob mehrere Umleitungen parallel laufen (D2), Retell-Limit gleichzeitiger Anrufe.

## Entscheidungen

- **Sirat:** AP-001 wird mit **Variante X** getestet (2026-09-21). Variante Y nur Kür.
- **Sirat:** Twilio-Nummer soll **im Namen des Piloten-Betriebs** registriert werden (Restaurant = Endnutzer im Regulatory Bundle), weil Twilio deutsche Ortsnetznummern nicht an Privatpersonen vergibt. Voraussetzung: schriftliches Einverständnis des Inhabers + dessen Gewerbeanmeldung. Klärt Sirat vor Ort.
- **Nicht entschieden** (Q15): „KI nie ganz aus?" und „außerhalb der Öffnungszeit KI-Ansage oder Durchklingeln?" — würde ADR 0006 ändern, nur auf Sirats ausdrückliche Ansage. Variante Y (fluvo steuert, Regler in der App, zweite Rufnummer, Twilio Programmable Voice, Mehrkosten grob 40–75 $/Restaurant/Monat) berührt [STACK] → ADR + `architect`.

## Offen / blockiert

| Was | Wartet auf |
|---|---|
| Twilio: Konto-Upgrade (20 $, Auto-Recharge aus) | Sirat — Konto existiert, ist noch Testkonto |
| Einverständnis + Gewerbeanmeldung des Piloten, Stufe-0-Fragen (Anbieter, Tarif, Router, Anzahl Rufnummern, Termin) | Sirat beim Piloten, **Freitag 2026-09-25** |
| Regulatory Bundle einreichen → bis 3 Werktage → Nummer kaufen → Elastic SIP Trunk zu Retell | nach dem Freitag-Termin |
| AP-002: Druckermodell, Ansage für Wegwerf-Skripte, Freigabe | Sirat |
| Voice-Testergebnis vom 18.09. (≈ 0,13 €/Min; war Retell-Telefonie enthalten?) fehlt im Business Brain | Sirat liefert Eckdaten → Ingest dort |
| K1: Jarvis liest alle 20 Entwürfe gegen (Schritt 2 der letzten Übergabe) | nicht begonnen |

## Nächster Schritt

1. Sitzung in `C:\Users\sirat\Projekte\fluvo` starten.
2. Freitag nach dem Pilot-Besuch: Ergebnisse aus Stufe 0 ins Testprotokoll AP-001; Bundle in Twilio Feld für Feld anlegen.
3. Bis dahin möglich: K1-Gegenlesen (`/konzept K1`), AP-002-Entscheidungen.
4. Nach bestandenem AP-001: ADR-Entwurf Telefonie (Variante X/Y, Anbieter, Nummer je Restaurant als eigenes Bundle → löst evtl. Ortsnetzbezug), Q1/Q15 beantworten, FA-02/03/04/06/13/14/20 nachziehen.
