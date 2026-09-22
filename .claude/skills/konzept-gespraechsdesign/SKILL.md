---
name: konzept-gespraechsdesign
description: Gesprächsdesign für den fluvo-Anrufmanager KI in der Konzeptphase — Gesprächsfluss, Pflichtangaben einer Bestellung, Spezifikation der Function Calls, Eskalationsregeln, Verbotsliste, Testanrufe als Abnahme-Satz. Laden, wenn etwas unter docs/konzept/gespraech/ entsteht oder geändert wird.
---

# Gesprächsdesign

Hier wird festgelegt, **wie sich die KI am Telefon verhält** — nicht, wie der Prompt formuliert ist. Der Prompt ist später eine Ableitung daraus. Technik der Anbindung: Skill `fluvo-voice`.

Ausgangsmaterial im Business Brain (nur lesen): `outputs/fluvo/experiment/Retell-Testanleitung.md` (20 Testanrufe mit Bewertungstabelle), `wiki/sources/@Experiment KI-Telefontest.md`, `wiki/concepts/Entlastungs-MVP.md`, `Overflow-Modus.md`, `wiki/sources/@KI-Agent Architektur & Kosten.md`. Erkenntnisse übernehmen, keine Zahlen oder den Namen des Piloten ins Repo schreiben.

## Feste Leitplanken [FEST]

- Scope MVP: Anruf annehmen, Bestellung aufnehmen und anlegen. Keine Status-Auskunft, keine Lieferzeit-Zusagen auf Basis von GPS.
- Entlasten, nicht ersetzen: Ziel ≈ 85 % selbst, ≈ 15 % Eskalation. Lieber früh übergeben als schlecht bedienen.
- Erster Satz: Die KI stellt sich als KI vor — technisch erzwungen.
- Die KI sagt nichts zu, was Geld kostet: kein Rabatt, keine Gutschrift, kein Storno, keine Sonderpreise.
- Die KI rechnet nicht. Preise, Summen, Liefergebiet, Mindestbestellwert kommen vom Server.
- Bestellung entsteht erst nach **ausdrücklicher Bestätigung** der vorgelesenen Zusammenfassung.
- Stammkunden nur über die Rufnummer. Kein Audio, kein dauerhaftes Transkript.

## 1. Gesprächsfluss (`gespraechsfluss.md`)

Mermaid `flowchart TD` plus Tabelle. Phasen: Begrüßung mit KI-Hinweis → (Stammkunde erkannt?) → Lieferung oder Abholung → Artikel aufnehmen (Schleife: Artikel, Optionen, Menge, Verfügbarkeit) → Adresse und Liefergebiet → Zahlart → Zusammenfassung mit Summe vom Server → Bestätigung → Verabschiedung. Von jeder Phase gibt es einen Pfeil zu **Eskalation** und zu **Abbruch**.

| Phase | Ziel | Was die KI sagt (Sinn, nicht Wortlaut) | Function Call | Weiter wenn | Sonst |
|---|---|---|---|---|---|

## 2. Pflichtangaben (`pflichtangaben.md`)

Was muss vorliegen, bevor `create_order` aufgerufen werden darf — je Bestellart (Lieferung/Abholung): Artikel mit Pflicht-Optionen, Menge, Name, Rufnummer, Adresse (validiert), Zahlart, Hinweise. Je Angabe: Pflicht? · wie erfragt · wie geprüft · was bei Unklarheit. Allergene: Die KI gibt nur wieder, was in der Karte steht, und verweist bei Unsicherheit an einen Menschen — das ist ein Eskalationsgrund.

## 3. Function Calls (`function-calls.md`)

Für `get_customer_by_phone`, `check_menu_item`, `validate_address`, `create_order`, `escalate_to_human` je ein Vertrag (Regeln wie im Skill `konzept-vertraege`):

| Punkt | Inhalt |
|---|---|
| Zweck | wozu, in welcher Phase |
| Eingabe | Felder, Pflicht, erlaubte Werte — so knapp, dass ein LLM sie zuverlässig füllt |
| Antwort | kurz und **sprechbar**; enthält, was die KI als Nächstes sagen soll |
| Fehlerfälle | je Fall ein Code + Handlungsanweisung („Artikel aus → Alternative X/Y anbieten") |
| Zeitbudget | Ziel < 150 ms serverseitig; was passiert bei Überschreitung |
| Idempotenz | `create_order`: Schlüssel = Anruf-ID |
| Darf nicht | z. B. `get_customer_by_phone` gibt keine früheren Bestellungen preis, bevor der Anrufer sich als Kunde zu erkennen gibt |

Es gibt bewusst **keine** Function für Rabatt, Storno, Preisänderung, Status-Auskunft.

## 4. Eskalation (`eskalation.md`)

| Auslöser | Erkennungsmerkmal | Was die KI sagt | Was technisch passiert |
|---|---|---|---|

Auslöser mindestens: Kunde verlangt Menschen · zweimal nicht verstanden · Beschwerde/Reklamation · Wunsch außerhalb des Scopes (Storno, Status, Rabatt, Catering) · Allergie-/Gesundheitsfrage · Adresse nicht auflösbar · Artikel nicht zuordenbar · Function Call wiederholt fehlgeschlagen · Gespräch zu lang. **Wohin eskaliert wird, wenn niemand abnimmt, ist [OFFEN] Q4** — der Entwurf muss beide Wege tragen (Weiterleitung / Rückruf-Ticket).

## 5. Verbotsliste (`verbote.md`)

Was die KI nie tut oder sagt — jeweils mit der Absicherung, die nicht vom Prompt abhängt (fehlende Function, Server-Prüfung, feste Ansage). Eine Regel, die nur im Prompt steht, gilt als nicht abgesichert.

## 6. Testanrufe (`testanrufe.md`)

Der Abnahme-Satz: mindestens 20 Szenarien, aufbauend auf dem Experiment.

| # | Szenario | Anrufer-Verhalten | Erwartet | Darf nicht | Ergebnis (bestellt / eskaliert / abgebrochen) |
|---|---|---|---|---|---|

Abdecken: einfache Bestellung · viele Optionen · Änderung mitten im Gespräch · Dialekt/Hintergrundlärm · Stammkunde · neue Adresse außerhalb des Liefergebiets · Artikel aus · Frage nach Rabatt · Storno-Wunsch · Allergie-Frage · Anrufer legt vor Bestätigung auf · Schweigen · Spaßanruf · Anruf außerhalb der Öffnungszeit · keine Rufnummer übermittelt (Q1). Dazu die Messgrößen: Quote selbst erledigt, Gesprächsdauer, Kosten je Anruf, Fehlbestellungen.

## Checkliste

- [ ] Jede Phase hat Ausgänge zu Eskalation und Abbruch
- [ ] Jede Leitplanke ist technisch abgesichert, nicht nur im Prompt
- [ ] Antworten der Function Calls sind sprechbar und enthalten den nächsten Schritt
- [ ] Vor der Bestätigung existiert kein Datensatz in `orders`
- [ ] Szenario „keine Rufnummer" und „niemand nimmt die Eskalation an" sind behandelt
- [ ] Verknüpft mit FA (Anruf annehmen, Eskalation, Abbruch), TU und Kern-Befehl `createOrder`
