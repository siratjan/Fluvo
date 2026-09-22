# Konzept fluvo — Artefakt-Landkarte

Stand: 2026-09-22 · Gepflegt von **Jarvis** und `requirements-engineer` · Aufbau angelehnt an Sirats Advansure-Konzept, erweitert um das, was fluvo zusätzlich braucht (Zustandsmodell, Gesprächsdesign, Datenklassen, Ausfälle).

**Zweck:** Bevor Code entsteht, steht hier, *was* gebaut wird — so genau, dass man danach bauen und testen kann. Konzipiert wird zuerst nur der **Piloten-Durchstich**: Anruf → Bestellung → Bon (plus Kassieren am Tresen). Der **Fahrer-Teil** kommt nach dem ersten Piloten als eigene App (ADR 0008, 2026-09-21); Küche, Website und Abrechnung folgen, wenn sie dran sind.

**Arbeiten:** `/konzept` zeigt den Stand und setzt am nächsten Artefakt an. `/council <Frage>` holt vier Stimmen zu einer offenen Entscheidung. Alles entsteht im Gespräch mit Sirat — nichts wird erfunden.

**Status:** `leer` → `Entwurf` → `mit Sirat durchgegangen` → `abgenommen` (nur nach Kreuzverhör und Sirats Ja)

## Artefakte

Reihenfolge ist Absicht: Jedes baut auf dem vorigen auf.

| ID | Artefakt | Ort | Status | Paket | Entspricht Advansure |
|---|---|---|---|---|---|
| K1 | Fachliche Anwendungsfälle (FA-xx) mit Testszenarien | [anwendungsfaelle/](anwendungsfaelle/) | Entwurf (22 von 22) — gegengelesen 2026-09-21, Runden 15–18 eingearbeitet (ADR 0007), Runden 21–30 eingearbeitet (B10–B18, B20, FA-19 neu); Einzeldurchsicht FA-01/FA-06/FA-15/FA-05/FA-11 (Runden 32–41, FA-11: Runde 41 eingearbeitet — geänderter Bon auf Anforderung/Variante B, keine Rückfrage offen zu FA-11); Runde 42 (FA-23 — Annahmestopp: Tagesende = Ladenschluss, im Monitoring FA-22 sichtbar); Runde 43 (FA-16/FA-19 — Wechselgeld-Ausgabe ohne Bestätigung, ein Tablet mit PIN-Wechsel, Inhaber bestätigt auch vom Handy; ändert ADR 0007, Nachtrag folgt); Runde 44 (FA-17/FA-18); Runde 45 (FA-13/FA-14 — KI läuft bei Internetausfall im Laden weiter, Server pausiert die KI-Annahme automatisch bei nicht erreichbarem Gerät; Bon-Nachdruck nach Netz-Rückkehr); Runde 46 (FA-14 — Papier-Betrieb beim Ausfall, kein Nachtrag/Variante B, sofortiges Umsteigen; FA-14 ohne offene Rückfrage durchgegangen); Runde 47 (FA-12 — „gültig ab" = Datum, Artikel ohne Preis wird nicht angelegt); Runde 48 (FA-21/FA-22 — Modul-/Paketänderung wirkt sofort, Sperre = keine neuen Bestellungen, Störungs-Ampel im Minutentakt, Betreiber ohne Bestell-/Nummer-Einsicht; Bestätigungen 44/47 eingearbeitet, Lesart-Markierungen entfernt); Runde 49 (Wechselgeld raus, ADR 0012 — kein Wechselgeld-Start/keine Einstellung/kein Abschluss-Anteil; FA-16/FA-19 nachgezogen; FA-20 Onboarding ohne Wechselgeld-Schritt, Geräte-Registrierung als eigener Schritt); Runde 50 (FA-21 Modul abbuchen: offene Vorgänge zu Ende; FA-22 Gelb ab 80 %) | AP-003 | 2.2 + 2.7.1 |
| K2 | Prozessmodell: Gesamtprozess + Sub-Prozess KI-Gespräch | [modelle/](modelle/) | leer | AP-004 | 2.3 |
| K3 | Zustandsmodell der Bestellung mit Übergangstabelle | [modelle/zustand-bestellung.md](modelle/) | leer | AP-005 | — (neu) |
| K4 | Gesprächsdesign der KI: Fluss, Function Calls, Eskalation, Verbote, Testanrufe | [gespraech/](gespraech/) | leer | AP-006 | — (neu) |
| K5 | Datenmodell (ER) + Datenwörterbuch mit DSGVO/GoBD-Klasse | [modelle/](modelle/), [vertraege/](vertraege/) | leer | AP-007 | — (neu) |
| K6 | Verträge: Kern-Befehle, Ereignis-Katalog, API, Webhooks | [vertraege/](vertraege/) | leer | AP-008 | 2.4 (verbindlicher) |
| K7 | Technische Anwendungsfälle (TU-xx) mit Testszenarien | [anwendungsfaelle/](anwendungsfaelle/) | leer | AP-009 | 2.4 + 2.7.2 |
| K8 | Nicht-funktionale Anforderungen mit Zahlen | [vertraege/nfa.md](vertraege/) | leer | AP-010 | — (neu) |
| K9 | Kontext- und Datenfluss, Ausfall-Tabelle, Rollen und Rechte | [modelle/](modelle/), [vertraege/](vertraege/) | leer | AP-011 | 2.5 |
| K10 | Oberflächen: Wireframes Annahme · Fahrer · Admin, Bon-Layout | [oberflaechen/](oberflaechen/) | leer | AP-012 | — (neu) |
| K11 | Pilot-Erfolgskriterien und MVP-Schnitt | [pilot.md](.) | leer | AP-013 | 1.3 + 3.2 |

Bereits vorhanden und **nicht** neu zu schreiben: Problem, Lösung, Zielgruppe, feste Entscheidungen, Architekturbild, Tech-Stack → [../briefing.md](../briefing.md). Offene Entscheidungen → [../open-questions.md](../open-questions.md).

Parallel, außerhalb dieses Ordners: die zwei Risikotests AP-001 (Rufumleitung) und AP-002 (Drucker). Ihr Ergebnis verändert K1, K4 und K9 — nicht aufschieben.

Rechtliches vor dem **Pilot** (nicht vor dem ersten Code): AVV, Verarbeitungsverzeichnis, DSFA, Löschkonzept mit Fristen. K5 und K9 liefern dafür die Grundlage.

## Vorschlag: fachliche Anwendungsfälle für den Piloten

Stand nach dem Gespräch mit Sirat vom 2026-09-18 (Mitschrift: [anwendungsfaelle/_gespraechsnotizen-K1.md](anwendungsfaelle/_gespraechsnotizen-K1.md)). Schnitt von Sirat am 2026-09-18 bestätigt.

Drei **Bestellarten**: Lieferung · Abholung nach Anruf · Mitnehmen (Kunde kommt ohne Anruf). „Hier essen" (Gastraum) ist für den Piloten **gestrichen** und läuft über die **bestehende Kasse** des Piloten ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 37 — ändert den Schnitt vom 2026-09-18). Kein Küchendisplay im Schnitt; ein Bon je Bestellung — bei **Lieferung zwei Exemplare** (eines bleibt an der Annahme, eines geht mit dem Fahrer zum Kunden; ADR 0008).

| ID | Titel | Akteur | Status |
|---|---|---|---|
| FA-01 | KI nimmt Anruf an und Bestellung auf (Lieferung, Abholung, Vorbestellung) | Anrufer, KI-Assistent | mit Sirat durchgegangen 2026-09-22 |
| FA-02 | Stammkunde ruft an | Anrufer, KI-Assistent | Entwurf — abhängig von AP-001/Q1 bzw. Q4, nach dem Test nachziehen |
| FA-03 | KI übergibt an einen Menschen (Eskalation, auch Änderungs-/Stornowunsch) | Anrufer, KI-Assistent, Annahme | Entwurf — abhängig von AP-001/Q1 bzw. Q4, nach dem Test nachziehen |
| FA-04 | Anrufer bricht vor der Bestätigung ab | Anrufer | Entwurf — abhängig von AP-001/Q1 bzw. Q4, nach dem Test nachziehen |
| FA-05 | Bestellung von Hand annehmen (alle drei Bestellarten) | Annahme | mit Sirat durchgegangen 2026-09-22 |
| FA-06 | Bon wird gedruckt — und was passiert, wenn nicht (mit/ohne Fahrer-QR) | Annahme, Koch | mit Sirat durchgegangen 2026-09-22 |
| FA-07 | Bestellung durch die Küche führen (ohne Küchendisplay: über die Annahme) | Annahme, Koch | entfällt im Piloten (keine Küchen-Status, Sirat 2026-09-18) — ID reserviert |
| FA-08 | Fahrer scannt, liefert aus und kassiert (mehrere je Tour, Scan lösen) | Fahrer | Entwurf — **zurückgestellt** (Fahrer-Teil nach dem ersten Piloten, ADR 0008) |
| FA-09 | Kunde nicht angetroffen / Adresse falsch | Fahrer, Annahme | Entwurf — **zurückgestellt** (ADR 0008) |
| FA-10 | Kassensturz des Fahrers am Schichtende | Fahrer, Inhaber | Entwurf — **zurückgestellt** (ADR 0008) |
| FA-11 | Bestellung ändern oder stornieren | Annahme, Inhaber | mit Sirat durchgegangen 2026-09-22 |
| FA-12 | Speisekarte und Preise pflegen („gültig ab", „momentan aus", Allergene mit Warnung) | Inhaber, Annahme | mit Sirat durchgegangen 2026-09-22 |
| FA-13 | KI-Annahme ein- und ausschalten (Overflow) | Inhaber, Annahme | mit Sirat durchgegangen 2026-09-22 |
| FA-14 | Internet fällt im Laden aus | Annahme | mit Sirat durchgegangen 2026-09-22 |
| FA-15 | Bestellung wird abgeholt bzw. vor Ort übergeben und bezahlt | Annahme, Kunde | mit Sirat durchgegangen 2026-09-22 |
| FA-16 | Abschluss je Mitarbeiter am Tresen | Annahme, Inhaber | mit Sirat durchgegangen 2026-09-22 |
| FA-17 | Lieferzonen mit Lieferzeit einstellen | Inhaber, Annahme | mit Sirat durchgegangen 2026-09-22 |
| FA-18 | Öffnungszeiten, Ruhetage und Urlaub pflegen | Inhaber, Annahme | mit Sirat durchgegangen 2026-09-22 |
| FA-19 | Schicht beginnen (Annahme-Person meldet sich am Tablet an) | Annahme | mit Sirat durchgegangen 2026-09-22 |
| FA-20 | Restaurant aufnehmen (Onboarding) | Betreiber | mit Sirat durchgegangen 2026-09-22 (Reihenfolge zu bestätigen) |
| FA-21 | Module und Paket eines Restaurants schalten | Betreiber | mit Sirat durchgegangen 2026-09-22 |
| FA-22 | Gesundheitszustand der Restaurants überwachen (ohne Einsicht in Bestellungen) | Betreiber | mit Sirat durchgegangen 2026-09-22 |
| FA-23 | Annahmestopp („keine Lieferung mehr" / „gar nichts mehr") | Annahme, Inhaber | mit Sirat durchgegangen 2026-09-22 |

## Rückverfolgung

Füllt sich mit den Artefakten. Jede Zeile muss am Ende lückenlos sein — eine leere Zelle ist ein Befund.

| FA | Prozessschritt | Zustandsübergänge | TU | Verträge / Events | Testszenarien |
|---|---|---|---|---|---|
| | | | | | |
