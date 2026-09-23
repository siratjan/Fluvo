# FA-15: Bestellung wird abgeholt bzw. vor Ort übergeben und bezahlt

- **Status:** mit Sirat durchgegangen (Runden 36–37, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Eine Bestellung ohne Fahrer (Abholung nach Anruf, Mitnehmen ohne Anruf) wird am Tresen/an der Annahme übergeben und bezahlt — vorerst nur bar, Papier-Gutschein des Restaurants möglich (Rest bar). |
| **Akteur** | Annahme (die dafür zuständige Person am Tresen), Kunde |
| **Auslöser** | Der Kunde kommt zur Abholung ans Restaurant oder steht zum Mitnehmen am Tresen — und die zuständige Person übergibt und kassiert. |
| **Vorbedingungen** | Es besteht eine Bestellung im Status **Eingegangen** mit Bestellart **Abholung** oder **Mitnehmen** (angelegt über FA-01 oder FA-05). Der Bon **ohne Fahrer-QR** ist gedruckt (FA-06). **Die kassierende Person ist angemeldet** (Voraussetzung für den Abschluss je Mitarbeiter, FA-16). Bei **Mitnehmen ohne Anruf** ist die Sofortzahlung bereits beim Bestellen erfasst (FA-05, Bestellart Mitnehmen). |
| **Nachbedingungen** | Die Bestellung ist beschreibend **„übergeben und bezahlt"**: Übergabe und Zahlung (bar, Gutschein oder Gutschein + bar) sind als Ereignis erfasst. Diese Bareinnahme fließt **nicht** in einen Fahrer-Kassensturz (FA-10), sondern in den Tagesabschluss Tresen (FA-16). Wie dieser Endzustand in die feste Zustandskette passt, ist offen (siehe Offene Fragen, K3). |

## Einordnung (aus der Mitschrift)

Die Bestellarten Abholung und Mitnehmen laufen **nicht** über einen Fahrer und tragen **keinen** Fahrer-QR auf dem Bon (Mitschrift Runde 6). Im Piloten gibt es **keine** Status-Meldungen aus der Küche: Nach dem Bon-Druck läuft die Küche wie heute auf Papier; das System erfährt erst wieder etwas, **wenn am Tresen kassiert bzw. übergeben wird** (Mitschrift Runde 9). Genau dieser Wiedereintritt ist FA-15.

> Der Pilot hat für den **Tischbetrieb** („Hier essen" im Gastraum) ein **eigenes Kassensystem**; fluvo läuft im Piloten **daneben** und deckt den Gastraum **nicht** ab ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 36/37). Das **Bargeld von Abholung und Mitnehmen** wird jedoch **in fluvo** kassiert (dieser Fall) und in fluvo abgeschlossen (FA-16), **nicht** in der bestehenden Kasse ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 37). Ob es heute in die bestehende Kasse eingetippt wird, hat Sirat nicht gesagt; das ist für die Steuerberaterin relevant (fluvo neben TSE-Kasse, Q2). Weiteres zur Kassenführung steht unter „Offene Fragen".

## Normalablauf (Abholung nach Anruf — kommt sehr oft vor, Mitschrift Runde 6)

1. Der Kunde kommt zur Abholung ans Restaurant und nennt sich (Name/Bestellung).
2. Die zuständige Person ruft die Bestellung an der Annahme-Oberfläche auf.
3. Das System zeigt die Bestellung mit dem vom Server berechneten, auf dem Bon stehenden Betrag.
4. Die Person kassiert diesen Betrag **bei der Übergabe bar** und erfasst die Zahlung; das System hält fest, dass die Bestellung übergeben und bezahlt ist **und ordnet die Kassierung der angemeldeten kassierenden Person zu** (Voraussetzung für den Abschluss je Mitarbeiter, FA-16) ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 10/12: bei Abholung nach Anruf wird bei der Übergabe bar bezahlt).
5. Die Person übergibt das Essen.

## Ausnahmeabläufe

- **1a. Mitnehmen, Kunde kommt ohne Anruf** (zweigt von Schritt 1 ab): Die Bestellung wird am Tresen von Hand angelegt (FA-05, Bestellart Mitnehmen); der Kunde **bezahlt sofort beim Bestellen** (bar) — die Zahlung wird der angemeldeten kassierenden Person zugeordnet ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29 — beantwortet die frühere offene Frage zum Zahlungszeitpunkt). Danach wird nur noch übergeben (Schritt 5); ein erneutes Kassieren entfällt. Endet in: Bestellung übergeben und (beim Bestellen) bezahlt.
- **2a. Abhol-Bestellung wird nie abgeholt** (zweigt von Schritt 2 ab): Der Kunde erscheint nicht; es wird nie kassiert und nie übergeben. Die Bestellung darf **nicht** lautlos verschwinden — sie muss am Tagesende als **nicht abgeschlossen** sichtbar werden (FA-16). Dass sie **ohne Bezahlung endet**, darf die **Annahme mit Pflichtgrund** bestätigen **oder** der **Inhaber** — gleiches Muster wie beim Storno (Grund Pflicht, Protokoll, sichtbar im Inhaber-Log; ADR 0007, ADR 0010) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 36 — **ändert Runde 10**, wo nur der Inhaber in seinem Inhaber-Bereich bestätigen durfte). Endet in: sichtbar als nicht abgeschlossen; das Ende ohne Bezahlung ist **mit Grund** von der Annahme oder dem Inhaber bestätigt und protokolliert (benannter Endzustand hängt an Q3, Storno-Pfad — siehe Offene Fragen).
- **4a. Kunde zahlt mit Gutschein (deckt die ganze Bestellung)** (zweigt von Schritt 4 ab): Die Person **bestätigt am Tresen die Einlösung** des Papier-Gutscheins des Restaurants als Zahlungsanteil; der **Gutschein muss nicht auf dem Bon** ausgewiesen sein — es reicht, dass der Tresen die Einlösung bestätigt ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29). Der Papier-Gutschein wird **nicht tief ins System eingebunden**: **keine** Gutschein-Verwaltung, **keine** Nummern, **keine** Entwertung im System — **wie der Inhaber die Gutscheine handhabt, legt er selbst fest** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31). Im System bleibt höchstens die **Bestätigung der Einlösung** beim Kassieren. Endet in: Bestellung übergeben und bezahlt, Einlösung am Tresen bestätigt. → Ob/wie das für Kasse/TSE zählt → Steuerberaterin, Q2.
- **4b. Gutschein kleiner als der Bestellwert** (zweigt von Schritt 4 ab): Der Gutschein deckt nur einen Teil; die Person **bestätigt die Gutschein-Einlösung** (nicht auf dem Bon, Runde 29) und kassiert den **Rest bar**. Eine Bestellung trägt damit **zwei Zahlarten** (Gutscheinbetrag + bar, [ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 8). Nur der bar kassierte Teil geht in den Tagesabschluss Tresen (FA-16) als Bargeld ein. Endet in: Bestellung übergeben und bezahlt, Zahlart Gutschein + bar.
- **4c. Kunde will an der Übergabe ändern oder stornieren** (zweigt von Schritt 4 ab): Muss erst mit der Küche abgeklärt werden → **FA-11**. **Vor** der Zahlung storniert die Annahme frei; **nach erfasster Zahlung** storniert **nur der Inhaber** — bei **Mitnehmen ohne Anruf** ist bereits **beim Bestellen bezahlt** (Ausnahme 1a), ein Storno dort ist also ein Storno **nach** erfasster Zahlung und damit **nur durch den Inhaber** möglich ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 19, ADR 0007). Ein Storno verlangt zudem einen **Grund** (FA-11, Runde 20/28). Endet in: dort (geänderte Bestellung oder Storno-Pfad, Q3).
- **4d. Internet fällt beim Kassieren aus** (zweigt von Schritt 4 ab): Die Annahme-PWA nimmt Zahlung/Übergabe in die Warteschlange und spielt sie bei Verbindung nach ([FEST 18], Idempotenz-Schlüssel; Briefing §5.5). Endet in: kein Datenverlust, Bestellung übergeben und bezahlt nach Nachspielen.

## Darf nicht

- Auf dem Bon einer Abhol-/Tresen-Bestellung steht **kein** Fahrer-QR (Mitschrift Runde 6).
- Es wird **keine** Zahlart außer **bar** und **Gutschein** erfasst; **kein** Trinkgeld — Trinkgeld bleibt beim Fahrer und **taucht nirgends im System auf** ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 6/8; bestätigt Runde 29).
- Der **Papier-Gutschein** wird **nicht** auf dem Bon ausgewiesen; die **Einlösung** wird am Tresen **bestätigt** und als Zahlungsanteil erfasst ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29).
- Der auf dem Bon stehende Betrag wird **nicht** verändert; der Server hat ihn berechnet ([FEST 8]).
- Diese Bareinnahme wird **nicht** einem Fahrer oder dem Fahrer-Kassensturz (FA-10) zugeschlagen; sie gehört in den Tagesabschluss Tresen (FA-16).
- Eine Bestellung wird **nicht** still als bezahlt/übergeben markiert — Zahlung und Übergabe werden erfasst.
- Ein kassierter Betrag wird **nicht** ohne zugeordnete kassierende Person erfasst — sonst lässt sich der Abschluss je Mitarbeiter (FA-16) nicht rechnen ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 12).
- Eine nie abgeholte Bestellung verschwindet **nicht** lautlos; sie wird in FA-16 sichtbar, und ihr Ende ohne Bezahlung wird **mit Pflichtgrund** bestätigt (durch die **Annahme** oder den **Inhaber**), nie stumm ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 36 — ändert Runde 10; ADR 0010).
- Ein Ende **ohne Bezahlung** wird **nicht ohne Grund** bestätigt: Der Grund ist Pflicht, der Vorgang wird protokolliert und ist im Inhaber-Log sichtbar — gleiches Muster wie beim Storno ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 36; ADR 0007, ADR 0010).
- Die zuständige Person sieht **keine** Bestellungen oder Beträge eines anderen Restaurants ([FEST 4], Briefing §6).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Es kassiert die dafür zuständige Person am Tresen/an der Annahme | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 9 |
| Jedes Kassieren am Tresen wird der **kassierenden Person zugeordnet** (Voraussetzung für den Abschluss je Mitarbeiter, FA-16); am geteilten Gerät bedeutet das einen schnellen Personenwechsel vor dem Kassieren (**wie** auf der Oberfläche → K10/Q11) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 12 |
| Zahlung am Tresen (Abholung nach Anruf, Mitnehmen ohne Anruf) vorerst **nur bar**, **kein** EC-/Kartengerät | [ENTSCHIEDEN Sirat 2026-09-18/2026-09-22] | Mitschrift Runde 8; bestätigt Runde 36 |
| Abholung nach Anruf: bezahlt wird **bei der Übergabe**, bar | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 10 |
| Dass eine (nie abgeholte) Bestellung **ohne Bezahlung endet**, bestätigt die **Annahme mit Pflichtgrund** **oder** der **Inhaber** (Grund Pflicht, Protokoll, sichtbar im Inhaber-Log — Muster wie Storno) | [ENTSCHIEDEN Sirat 2026-09-22] (ändert Runde 10) | Mitschrift Runde 36; ADR 0007, ADR 0010 |
| Geldrechte (Kassensturz/Tresen-Abschluss bestätigen; Schicht mit Abweichung begründet beenden) hat **nur der Inhaber**; die Annahme hat nur Betriebsrechte. Ein Geldrecht „Wechselgeld-Ausgabe bestätigen" gibt es **nicht** (Wechselgeld außerhalb des Systems, ADR 0012). **Ausnahme:** Das **Ende ohne Bezahlung** (nie abgeholt) darf seit Runde 36 auch die **Annahme mit Pflichtgrund** bestätigen (ADR 0010). Steht der Inhaber selbst an der Annahme, meldet er sich als Inhaber an | [ENTSCHIEDEN Sirat 2026-09-18/2026-09-22] | Mitschrift Runde 11/36/49; ADR 0012 |
| Der Pilot hat ein **eigenes Kassensystem** für den **Tischbetrieb** (Gastraum); fluvo läuft im Piloten **daneben**. Das **Bargeld von Abholung/Mitnehmen** wird **in fluvo** kassiert, nicht in der bestehenden Kasse | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 36/37 |
| **Storno gehört nicht mehr zu den Geldrechten:** Die Annahme darf **vor** der Zahlung ändern und stornieren (protokolliert im Log/der Tagesübersicht des Inhabers), auch an der Übergabe (Ausnahme 4c → FA-11). **Nach erfasster Zahlung** (z. B. Mitnehmen, sofort bezahlt) storniert **nur der Inhaber**. **Fahrer** dürfen weder ändern noch stornieren | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 17/18/19, ADR 0007 |
| Papier-Gutschein des Restaurants möglich; ist er kleiner als die Bestellung, wird der Rest bar bezahlt (zwei Zahlarten) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 8/9 |
| Der Papier-Gutschein muss **nicht auf dem Bon** ausgewiesen sein; die **Einlösung** wird am Tresen **bestätigt** und als Zahlungsanteil erfasst | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 |
| Papier-Gutscheine werden **nicht tief ins System eingebunden**: **keine** Gutschein-Verwaltung, **keine** Nummern, **keine** Entwertung, **kein** fester Wert im System — **der Inhaber legt die Handhabung selbst fest**; im System bleibt höchstens die **Bestätigung der Einlösung** beim Kassieren | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 31 |
| **Mitnehmen ohne Anruf** wird **sofort beim Bestellen** bezahlt (bar), der kassierenden Person zugeordnet | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 |
| Trinkgeld bleibt beim Fahrer und **taucht nirgends im System auf** | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6, bestätigt Runde 29 |
| Nachbestellung nach bereits bezahltem **Mitnehmen** ist eine **neue Bestellung**, keine Nachzahlung (FA-05/FA-11) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 21 (B14) |
| Bon ohne Fahrer-QR bei Abholung/Mitnehmen | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Im Piloten keine Küchen-Status; System erfährt nach Bon-Druck erst beim Kassieren/Übergeben wieder etwas | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 9 |
| Summen rechnet der Server, nicht der Mensch | [FEST] | Briefing §2.8 |
| Trinkgeld wird nicht abgebildet | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Tresen-Bareinnahmen fließen nicht in den Fahrer-Kassensturz, sondern in FA-16 | [ENTSCHIEDEN Sirat 2026-09-18] (Einordnung Jarvis) | Mitschrift Runde 6/8 |
| Fiskalische Behandlung (Signaturzeitpunkt bei Barzahlung am Tresen, Beleg für den Kunden) | [OFFEN] Q2 | open-questions.md Q2 |
| Benanntes Ende einer nie abgeholten Bestellung / Storno-Pfad | [OFFEN] Q3 | open-questions.md Q3 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| FA-15-T1 · Standardfall Abholung nach Anruf | Bestellung Eingegangen, Bestellart Abholung, Bon ohne QR, Betrag 22,00 €, kassierende Person M1 angemeldet, bar kassiert | Bestellung übergeben und bezahlt, Zahlart bar 22,00 €, der kassierenden Person M1 zugeordnet, geht in M1s Abschluss (FA-16) ein | Fahrer-QR auf dem Bon; Betragsänderung; Betrag ohne zugeordnete Person erfassen | manuell am Gerät + automatisch |
| FA-15-T2 · Kassieren ohne angemeldete Person (Grenzfall) | Betrag 22,00 €, keine kassierende Person angemeldet | Betrag wird **nicht** erfasst; erst nach Anmelden möglich | Betrag ohne zugeordnete Person erfassen | automatisch |
| FA-15-T3 · Standardfall Mitnehmen ohne Anruf | Tresen-Bestellung angelegt (FA-05), Betrag 14,50 €, **sofort beim Bestellen** bar bezahlt (Runde 29) | Zahlung beim Bestellen erfasst und der angemeldeten Person zugeordnet; bei Übergabe kein erneutes Kassieren | Zahlart außerhalb bar/Gutschein; erneut kassieren bei Übergabe | manuell + automatisch |
| FA-15-T4 · Zahlung per Gutschein (voll) | Betrag 20,00 €, Gutschein deckt 20,00 € | Einlösung am Tresen **bestätigt**, Zahlart Gutschein erfasst; **Gutschein nicht auf dem Bon**; Bestellung übergeben und bezahlt; kein Bargeld in FA-16 | Gutschein als Bargeld werten; Gutschein auf dem Bon ausweisen | manuell + automatisch |
| FA-15-T5 · Gutschein deckt nur Teil, Rest bar | Betrag 30,00 €, Gutschein 20,00 €, Rest 10,00 € bar | Zwei Zahlarten (Gutschein 20,00 € + bar 10,00 €); nur 10,00 € bar in FA-16 | Voller Betrag als bar gewertet | manuell + automatisch |
| FA-15-T6 · Abhol-Bestellung nie abgeholt, Inhaber bestätigt (Grenzfall) | Bestellung Abholung, Bon gedruckt, nie kassiert/übergeben; Inhaber bestätigt das Ende ohne Bezahlung mit Grund | Bestellung bleibt bis dahin nicht abgeschlossen und erscheint in FA-16 als „nicht abgeschlossen"; Ende ohne Bezahlung mit Grund bestätigt, protokolliert, im Inhaber-Log sichtbar | Bestellung verschwindet lautlos; Ende ohne Grund bestätigen | manuell + automatisch |
| FA-15-T7 · Nie abgeholt, Annahme bestätigt mit Grund (Runde 36) | wie oben; die **Annahme** bestätigt das Ende ohne Bezahlung mit Pflichtgrund | Bestätigung durch die Annahme möglich; Grund Pflicht; Vorgang protokolliert und im Inhaber-Log sichtbar (ADR 0010) | Ende ohne Grund bestätigen; Vorgang nicht protokollieren | manuell + automatisch |
| FA-15-T8 · Internet weg beim Kassieren (Grenzfall offline) | Verbindung getrennt bei Schritt 4 | Zahlung/Übergabe in Warteschlange, nach Verbindung übergeben und bezahlt | Datenverlust; doppelte Anwendung | manuell + automatisch |
| FA-15-T9 · Zwei-Restaurant-Fall | Abhol-Bestellung von Restaurant A; Restaurant B `+49 30 23125 402` hat eigene Tresen-Bestellungen | Nur Bestellungen/Beträge von A sichtbar und kassierbar | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Übergabe am Tresen → Zahlung erfassen" (K2 noch offen)
- **Zustandsübergänge:** **Eingegangen** → beschreibend **„übergeben und bezahlt"** — dieser Weg ist in der festen Kette (`… Fertig → Unterwegs → Geliefert → Abgerechnet`, [FEST 2]) **nicht** vorgesehen (kein „Unterwegs"); Auflösung offen, siehe unten (K3)
- **Technische Anwendungsfälle:** TU-? (Zahlung/Übergabe erfassen, Kassierung der angemeldeten Person zuordnen; Personenwechsel/Login → K10/Q11; Zuordnung in K7)
- **Verträge / Events:** `order.handed_over` (Übergabe als fertig markiert), `order.paid`, für das Ende ohne Bezahlung ein protokolliertes Ereignis mit Pflichtgrund (Namen vorläufig, K6 noch offen); `payments` (Briefing §5.2)
- **Testszenarien:** FA-15-T1 … FA-15-T9 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI-Annahme Abholung/Vorbestellung), FA-05 (Annahme von Hand), FA-06 (Bon: Abholung/Mitnehmen **ein** Exemplar, kein Fahrer-QR; Lieferung zwei Exemplare, ADR 0008), FA-11 (Ändern/Storno), FA-16 (Tagesabschluss Tresen), FA-10 (Abgrenzung Fahrer-Kassensturz — **zurückgestellt**, ADR 0008)

## Offene Fragen

> **Beantwortet (Runde 29):** Bei **Mitnehmen ohne Anruf** bezahlt der Kunde **sofort beim Bestellen** (bar), die Annahme erfasst von Hand. (Für Abholung nach Anruf gilt „bei der Übergabe", Runde 10.) Der fiskalische Signaturzeitpunkt bleibt bei Q2.

> **Frage an Sirat / architect (Q3, K3):** Was passiert mit einer **Abhol-Bestellung, die nie abgeholt wird** — bleibt sie bis zur Klärung offen, wird sie am Tagesende storniert, verworfen, weggeworfen? Sie braucht ein benanntes Ende (hängt an Q3, Storno-Pfad). (Mitschrift Runde 6, analog zu „nicht zustellbar" FA-09.)

> **Frage an Sirat / architect (K3):** Für Abholung/Mitnehmen gibt es in der festen Zustandskette **keinen** Weg ohne „Unterwegs", und „In Küche"/„Fertig" werden im Piloten nicht von Hand gesetzt. Wie läuft eine solche Bestellung durch das Zustandsmodell (überspringen, eigener Pfad, Zustand getrennt vom Status)? → wird in K3 mit `architect` vorbereitet, Sirat entscheidet.

> **Beantwortet (Runde 29 + 31):** Der Papier-Gutschein muss **nicht auf dem Bon** stehen; es reicht, dass der Tresen die **Einlösung bestätigt** (Runde 29). Die Gutscheine werden **nicht tief ins System eingebunden** — **keine** Verwaltung, **keine** Nummern, **keine** Entwertung, **kein** fester Wert im System; **der Inhaber legt die Handhabung selbst fest** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31). Damit sind die früheren Fragen nach Nummer/Entwertung/festem Wert gegenstandslos. **Bleibt bei Q2:** ob/wie die Einlösung für Kasse/TSE zählt → Steuerberaterin.

> **Frage an Sirat / Steuerberaterin (Q2):** Bekommt der Kunde am Tresen weiterhin nur den Bon als Beleg, oder braucht es bei Barzahlung einen TSE-Beleg — und wann wird signiert (bei Bestellung oder bei Zahlung)? → Steuerberaterin **vor** Pilotstart (open-questions.md Q2).

## Nicht Teil dieses Anwendungsfalls

- Anlegen der Bestellung (Telefon/Website/Hand) → FA-01, FA-05.
- Bon-Druck und Fehlerfall beim Drucken → FA-06.
- Tagesabschluss der Tresen-Einnahmen (je Mitarbeiter) → FA-16.
- Wie der Personenwechsel/das Anmelden der kassierenden Person am geteilten Gerät bedient wird → K10 (Oberfläche), Q11 (Login).
- Auslieferung und Kassieren durch den Fahrer sowie dessen Kassensturz → FA-08, FA-10 (**zurückgestellt** im ersten Piloten, ADR 0008; das Liefer-Bargeld läuft auf Papier).
- Ändern oder Storno nach dem Anlegen → FA-11.
- Kundengebundener Gutschein im System (Guthaben je Kunde) → späterer Anwendungsfall, nicht im Piloten-Schnitt (Mitschrift Runde 9).
- Fiskalische Signatur/DSFinV-K-Export → K5/K6, hängt an Q2.
- Wie Abholung/Tresen (ohne „Unterwegs") durch das Zustandsmodell laufen → K3 mit `architect`.
- **„Hier essen" (Gastraum/Tischbetrieb)** ist im Piloten **nicht** Teil von fluvo — der Gastraum läuft über das **bestehende Kassensystem** des Piloten ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 37 — ändert den Schnitt vom 2026-09-18). fluvo kennt im Piloten nur noch **drei Bestellarten**: Lieferung · Abholung nach Anruf · Mitnehmen ohne Anruf.
