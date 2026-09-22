---
name: konzept-anwendungsfall
description: Format und Vorgehen für fachliche (FA-xx) und technische (TU-xx) Anwendungsfälle von fluvo samt Testszenarien, angelehnt an Sirats Advansure-Konzept. Laden, wenn ein Anwendungsfall entworfen, im Dialog geschärft oder geprüft wird.
---

# Anwendungsfälle und Testszenarien

Format nach Sirats Advansure-Konzept (Kap. 2.2, 2.4, 2.7), erweitert um das, was fluvo zusätzlich braucht: Ausnahmeabläufe, eine „darf nicht"-Klausel und Rückverfolgbarkeit. Vorlagen: `docs/konzept/anwendungsfaelle/_vorlage-FA.md` und `_vorlage-TU.md`.

## Zwei Sorten

- **FA-xx — fachlich:** Was ein Mensch (oder die KI als Akteur) erlebt und erreicht. Sprache des Restaurants. Keine Tabellen, Endpunkte, Bibliotheken.
- **TU-xx — technisch:** Was das System dafür leisten muss. Akteure sind Systemteile (Kern, Modul `voice`, Drucker, Retell …). Hier stehen Befehle, Events, Verträge.

Ein FA verweist auf die TUs, die ihn tragen; ein TU nennt die FAs, denen er dient. Fehlerfälle, die der Mensch bemerkt, sind **eigene FAs** (wie bei Advansure „Kamera-Berechtigung verweigert"), z. B. „Anrufer bricht ab", „Bon wird nicht gedruckt".

## Felder

| Feld | Inhalt |
|---|---|
| **ID und Titel** | `FA-07: Fahrer liefert aus und kassiert`. IDs bleiben stabil, Lücken sind erlaubt |
| **Ziel** | Ein Satz: wer erreicht was, wozu |
| **Akteur** | Inhaber · Annahme · Koch · Fahrer · Anrufer · KI-Assistent (bei TU: Systemteile) |
| **Auslöser** | Das konkrete Ereignis, das den Fall startet |
| **Vorbedingungen** | Was vorher wahr sein muss (Status, Entitlement, Gerät, Verbindung) |
| **Nachbedingungen** | Was danach wahr ist — als beobachtbarer Zustand, inkl. Status der Bestellung |
| **Normalablauf** | Nummerierte Schritte, abwechselnd Akteur/System, je Schritt eine Handlung |
| **Ausnahmeabläufe** | `3a. …` zweigt von Schritt 3 ab. Jede Ausnahme hat ein beschriebenes Ende |
| **Darf nicht** | Verbotene Nebenwirkungen: „KI nennt keinen Rabatt", „kein Datensatz vor Bestätigung", „Tenant B sieht nichts" |
| **Regeln und Zahlen** | Geschäftsregeln mit Stufe [FEST]/[STACK]/[OFFEN] und Quelle; messbare Anforderungen (Sekunden, Klicks) |
| **Rückverfolgung** | Prozessschritt (BPMN) · Zustandsübergänge · TUs bzw. FAs · Verträge/Events · Testszenarien |
| **Offene Fragen** | Was nur Sirat oder der Pilot beantworten kann |
| **Nicht Teil** | Was bewusst später kommt |

## Testszenarien

Je Anwendungsfall eine Tabelle, wie bei Advansure — plus zwei Spalten:

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall | … | … | … | automatisch (Vitest/Playwright) · manuell am Gerät · Testanruf |

Mindestens: Standardfall, jeder Ausnahmeablauf, ein Grenzfall (leer, doppelt, zu spät, offline), bei allem mit Daten ein **Zwei-Restaurant-Fall**. Aus diesen Tabellen werden in Phase 2 des Arbeitszyklus („Testen zuerst") direkt die Tests — schreibe sie so, dass `tdd-guide` sie ohne Rückfrage übernehmen kann.

## Im Dialog erarbeiten

Reihenfolge der Fragen, jeweils nur so viele wie nötig:

1. **Erzähl den Normalfall** — „Was passiert heute, Schritt für Schritt, wenn …?" Erst den Ist-Ablauf mit Zetteln, dann den Soll-Ablauf mit fluvo.
2. **Wer und womit** — welche Person, welches Gerät, wo steht sie, hat sie die Hände frei?
3. **Was geht schief** — „Was passiert heute, wenn …?" (Kunde nicht da, falsche Adresse, Artikel aus, Fahrer hat kein Wechselgeld, Internet weg, zwei tippen gleichzeitig).
4. **Woran merkt man, dass es geklappt hat** — daraus werden Nachbedingungen und erwartete Ergebnisse.
5. **Was darf auf keinen Fall passieren** — daraus wird „Darf nicht".

Technische Fakten (was das Briefing schon sagt) nicht erfragen, sondern nachlesen. Geschäftliche Fakten nie aus dem Briefing „ableiten", wenn sie dort nicht stehen — fragen.

## Checkliste vor „Entwurf fertig"

- [ ] Jeder Schritt hat genau einen Handelnden und eine Handlung
- [ ] Kein Schritt beschreibt Technik in einem FA
- [ ] Jede Ausnahme endet in einem benannten Zustand; nichts verschwindet lautlos
- [ ] Status der Bestellung vor und nach dem Fall stimmt mit dem Zustandsmodell überein
- [ ] Alles Berechenbare rechnet der Server, nicht die KI und nicht der Mensch
- [ ] Bedienbar ohne Schulung: Schritte und Klicks gezählt, wo eine Oberfläche beteiligt ist
- [ ] Mandantentrennung und Personendaten bedacht (wer sieht was?)
- [ ] Testszenarien decken Normalfall, jede Ausnahme und einen Grenzfall ab
- [ ] Rückverfolgung ausgefüllt, IDs existieren
- [ ] Jede Regel trägt Stufe und Quelle; Unbekanntes steht unter „Offene Fragen"
