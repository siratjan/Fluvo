# FA-05: Bestellung von Hand annehmen (alle drei Bestellarten)

- **Status:** mit Sirat durchgegangen (Runden 38–39, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Ein Mitarbeiter der Annahme nimmt eine Bestellung selbst auf — am Telefon (Lieferung/Abholung) oder am Tresen (Mitnehmen ohne Anruf) — und legt sie ohne Schulung auf Tablet oder Handy an. |
| **Akteur** | Annahme |
| **Auslöser** | Ein Kunde ruft an und ein Mitarbeiter nimmt ab, **oder** ein Kunde steht am Tresen. |
| **Vorbedingungen** | Der Mitarbeiter ist an der Annahme-Oberfläche angemeldet (PIN + registriertes Gerät). Speisekarte, Liefergebiet mit Zonen (FA-17) und Öffnungszeiten des Restaurants sind hinterlegt. Ist ein **Annahmestopp „gar nichts mehr"** aktiv (FA-23), darf die Annahme trotzdem von Hand anlegen — das System zeigt eine **Warnung** mit „trotzdem anlegen", **keine harte Sperre** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39; siehe Ausnahme 1d). |
| **Nachbedingungen** | Genau eine neue Bestellung im Status **Eingegangen**, mit gewählter Bestellart (Lieferung / Abholung / Mitnehmen), eingefrorenen Preisen und Artikeltexten. Bei **telefonischen** Bestellungen (Lieferung/Abholung) hat der Mitarbeiter die **Pflichtangabe „Adresse merken? — Kunde gefragt"** ausgefüllt (Weg B, wie die KI in FA-01/FA-02); **nur bei „Ja"** wird ein **Kundeneintrag** (Rufnummer, Name, Adresse) beim Restaurant gespeichert bzw. aktualisiert, bei **„Nein"** nicht (die Bestellung läuft normal weiter). **Löschfrist vorerst 12 Monate nach der letzten Bestellung**, alles **vorbehaltlich Bestätigung durch den Anwalt (Q10)** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007). Bei **Mitnehmen ohne Anruf** ist die Sofortzahlung erfasst und der **angemeldeten kassierenden Person zugeordnet**. |

## Ist-Ablauf heute (aus der Mitschrift, Runde 3 und 4)

1. Der Kollege nimmt den Wunsch entgegen und schreibt ihn auf einen Zettel **mit Durchschlag** (Kohlepapier): Gerichte, Adresse, Name, ggf. Besonderheiten.
2. Er rechnet danach von Hand aus, was die Bestellung kostet.
3. Ein Exemplar des Zettels bleibt an der Station (Annahme), das andere wird durch die Küche gereicht, bis es zurück ist.
4. Bei einem Kunden am Tresen (Mitnehmen ohne Anruf) läuft es ähnlich über Zettel und Zuruf; ein festes Verfahren gibt es nicht.

> Wo es heute regelmäßig hakt: Schreibfehler, verlorene Zettel, Fehlbeträge (Mitschrift Runde 5).

## Normalablauf (Lieferung am Telefon)

1. Der Mitarbeiter öffnet an der Annahme-Oberfläche eine neue Bestellung und wählt die Bestellart **Lieferung**.
2. Der Mitarbeiter tippt die Gerichte aus der Speisekarte an; das System zeigt Verfügbarkeit und Optionen.
3. Der Mitarbeiter erfasst Lieferadresse, **Name** und Rufnummer des Kunden (**Name bei allen telefonischen Bestellungen**, [ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15) und füllt die **Pflichtangabe „Adresse merken? — Kunde gefragt"** aus (Weg B; [ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007 — vorbehaltlich Anwalt, Q10). Nur bei **„Ja"** wird ein Kundeneintrag gespeichert; bei **„Nein"** nicht.
4. Das System prüft, ob die Adresse im Liefergebiet liegt, ordnet die Lieferzone zu und berechnet die Gesamtsumme (Artikel + Liefergebühr); der Mindestbestellwert wird gegen den **Warenwert** (Artikel **ohne** Liefergebühr) geprüft ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 23 B17).
5. Der Mitarbeiter nennt dem Kunden Summe und Lieferzeit und legt die Bestellung an. Die **Lieferzeit** ist bei **jeder Handannahme** eine **Auswahl aus dem 15-Minuten-Raster** (15 · 30 · 45 · 1 Std · 1:15 · 1:30 · 1:45 · **2 Std**; Obergrenze **2 Std**) — **kein Freitext**; bei einer Adresse in einer Zone ist der Zonenwert (FA-17) **vorausgewählt** (*Lesart Jarvis*), der Mitarbeiter kann auf einen anderen Rasterwert wechseln. Bei **Abholung** ist die **Abholzeit** eine Auswahl aus dem **10-Minuten-Raster** (10 · 20 · 30 · 40 · 50 · **60 Min**; Obergrenze **60 Min**). **Statt** eines Rasterwerts kann der Mitarbeiter auch eine **konkrete gewünschte Uhrzeit** wählen (z. B. „um 18:30") — das ist dann eine **Vorbestellung** (Wunschzeit, auch am selben Tag; siehe Ausnahme 1c) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39, Obergrenzen und Uhrzeit-Auswahl Runde 44).
6. Das System speichert die Bestellung im Status **Eingegangen** und friert Preise und Artikeltexte ein. Eine **von Hand** angelegte Bestellung gilt als **direkt quittiert**: Es gibt **kein** Eingangssignal und **keinen** extra Quittierungsschritt — der Bon wird **sofort** ausgegeben (FA-06) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 35).

## Ausnahmeabläufe

- **1a. Abholung nach Anruf** (zweigt von Schritt 1 ab): Bestellart **Abholung**. Keine Adresse, keine Liefergebühr (Schritt 3 nur **Name** und Rufnummer — Name bei allen telefonischen Bestellungen, Mitschrift Runde 15; Schritt 4 ohne Zonenprüfung). Ein Bon-Exemplar (im ersten Piloten trägt ohnehin kein Bon einen Fahrer-QR, ADR 0008; bei Lieferung dagegen zwei Exemplare, FA-06). Endet in: Bestellung **Eingegangen**.
- **1b. Zum Mitnehmen, Kunde am Tresen ohne Anruf** (zweigt von Schritt 1 ab): Bestellart **Mitnehmen**. Keine Adresse. Die Annahme erfasst die Bestellung **von Hand im System**; der Kunde **bezahlt sofort beim Bestellen** — vorerst **nur bar** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29 — beantwortet die frühere offene Frage zum Zahlungszeitpunkt; bar: Runde 8). Die Sofortzahlung wird der **angemeldeten kassierenden Person zugeordnet** (Voraussetzung für den Abschluss je Mitarbeiter, FA-16). Will der Gast **nach** der bereits erfassten Zahlung noch etwas, wird das eine **neue Bestellung** — keine Nachzahlung an der bezahlten ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 21 B14; siehe FA-11 und FA-15). Endet in: Bestellung **Eingegangen** mit erfasster, zugeordneter Sofortzahlung.
- **1c. Vorbestellung** (zweigt von Schritt 1 ab): Der Mitarbeiter erfasst eine Wunschzeit, die **beliebig weit im Voraus** liegen darf. Einzige Bedingung: Das Restaurant hat zur Wunschzeit Betrieb (Öffnungszeiten, Ruhetage, Urlaub — [ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 7, 2. Nachtrag Sirat); das System prüft das und kennzeichnet die Bestellung als Vorbestellung. Der Bon wird **sofort** und deutlich gekennzeichnet gedruckt ([ENTSCHIEDEN Sirat 2026-09-18]). Endet in: Bestellung **Eingegangen**, gekennzeichnet als Vorbestellung.
- **1d. Annahmestopp „gar nichts mehr" aktiv** (zweigt von Schritt 1 ab): Ist der Annahmestopp auf **„gar nichts mehr"** gesetzt (FA-23), zeigt das System beim Öffnen einer neuen Bestellung eine **Warnung** und bietet **„trotzdem anlegen"** an — **keine harte Sperre** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39). Legt die Annahme trotzdem an, wird das **Übersteuern protokolliert** (welche Person, wann, welche Bestellung; ohne Begründung — *Lesart Jarvis: gleiches Muster wie die anderen Ausnahmen der Annahme*). Endet in: keine Bestellung (Warnung abgebrochen) **oder** Bestellung **Eingegangen** mit protokolliertem Übersteuern. (Bei „keine Lieferung mehr" ist nur die Lieferung betroffen, Abholung/Mitnehmen laufen weiter, FA-23.)
- **2a. Artikel nicht verfügbar / „momentan aus"** (zweigt von Schritt 2 ab): Das System zeigt den Artikel als nicht bestellbar; der Mitarbeiter wählt eine Alternative. Endet in: geänderter Bestellung (zurück zu 2).
- **4a. Adresse außerhalb des Liefergebiets** (zweigt von Schritt 4 ab): Das System weist darauf hin; der Mitarbeiter wechselt zu Abholung oder bricht ab. Die **Annahme darf** — als **Ausnahme** — trotzdem eine **Liefer-Bestellung mit einer Adresse außerhalb aller Zonen** anlegen; sie ist die Stelle, die über die von der KI eskalierte Ausnahme entscheidet (FA-01, Ausnahme 7a / FA-03, Grund 8). Die Ausnahme braucht **keine Begründung**, nur einen **Protokolleintrag** (welche Person, wann, welche Bestellung) — gleiches Muster wie beim Mindestbestellwert ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31/33). Weil keine Zone Werte zuordnet, gibt die Annahme die **Liefergebühr von Hand** ein; die **Lieferzeit** wählt sie **aus dem 15-Minuten-Raster** (kein Freitext, siehe Schritt 5) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39). Endet in: Abholung (1a), Liefer-Bestellung außerhalb der Zonen (Ausnahme durch die Annahme, protokolliert) oder keine Bestellung.
- **4b. Warenwert unter Mindestbestellwert** (zweigt von Schritt 4 ab): Maßgeblich ist der **Warenwert ohne Liefergebühr** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 23 B17). Liegt er darunter, zeigt das System den Mindestbestellwert; der Mitarbeiter ergänzt oder bricht ab. Die **Annahme darf eine Ausnahme machen** und **von Hand unter dem Mindestbestellwert** anlegen — sie ist die Stelle, die über die von der KI eskalierte Ausnahme entscheidet (FA-01/FA-03, Runde 28 B14). Die Ausnahme braucht **keine Begründung**, nur einen **Protokolleintrag** (welche Person, wann, welche Bestellung) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31). Endet in: ergänzter Bestellung (zurück zu 2), Anlegen unter Mindestbestellwert (Ausnahme durch die Annahme, protokolliert) oder keine Bestellung.
- **5a. Internet fällt aus** (zweigt von Schritt 5 ab): → **FA-14** (Offline-Annahme, Aktion in Warteschlange, [FEST 18]). Endet in: Bestellung wird bei Verbindung nachgespielt.

## Darf nicht

- Der Mitarbeiter rechnet Summen **nicht** von Hand; das System berechnet sie ([FEST 8], behebt „Rechenfehler").
- Eine Bestellung wird **nicht** ohne gewählte Bestellart angelegt.
- Liefer- und Abholzeit werden **nicht** als **Freitext** eingegeben; sie sind eine **Auswahl aus dem Raster** (15er bzw. 10er) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39).
- „Mitnehmen ohne Anruf" wird **nicht** ohne erfasste Sofortzahlung abgeschlossen; die Zahlung wird der **angemeldeten kassierenden Person** zugeordnet (Mitschrift Runde 29).
- Der Mitarbeiter des Restaurants A sieht **keine** Bestellungen oder Kundendaten von Restaurant B ([FEST 4], [Briefing §6]).
- Preise und Artikeltexte einer angelegten Bestellung ändern sich **nicht** nachträglich durch eine spätere Preisänderung ([Briefing §5.2, eingefroren]).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Drei Bestellarten im Piloten: Lieferung, Abholung nach Anruf, Mitnehmen ohne Anruf. „Hier essen" (Gastraum) ist **gestrichen** — läuft über die bestehende Kasse des Piloten | [ENTSCHIEDEN Sirat 2026-09-22] (ändert Runde 6) | Mitschrift Runde 37 |
| Nachbestellung nach bereits bezahltem **Mitnehmen** ist eine **neue Bestellung**, keine Nachzahlung (siehe FA-11/FA-15) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 21 (B14) |
| Der Mindestbestellwert zählt nur den **Warenwert** (Artikel ohne Liefergebühr) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 23 (B17), bestätigt Runde 27 |
| Die **Annahme** darf **von Hand unter dem Mindestbestellwert** anlegen (Ausnahme, über die die von der KI eskalierte Bitte entschieden wird, FA-01/FA-03); **keine Begründung** nötig, nur ein **Protokolleintrag** (Person, Uhrzeit, Bestellung) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 31 (Ausnahme aufgeworfen Runde 28 B14) |
| Die **Annahme** darf als **Ausnahme** eine **Liefer-Bestellung mit Adresse außerhalb aller Zonen** von Hand anlegen (über die von der KI eskalierte Bitte, FA-01 7a / FA-03 Grund 8); **keine Begründung**, nur ein **Protokolleintrag** (Person, Uhrzeit, Bestellung). Dabei gibt die Annahme die **Liefergebühr von Hand** ein und wählt die **Lieferzeit aus dem 15-Minuten-Raster** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 31/33, Werte Runde 39 |
| **Lieferzeit** ist bei **jeder Handannahme** eine **Auswahl aus dem 15-Minuten-Raster** (15 · 30 · 45 · 1 Std … **2 Std**; Obergrenze 2 Std), **Abholzeit** aus dem **10-Minuten-Raster** (10 · 20 · 30 … **60 Min**; Obergrenze 60 Min) — **kein Freitext**; in einer Zone ist der Zonenwert (FA-17) *vorausgewählt (Lesart Jarvis)*, umstellbar auf einen anderen Rasterwert. **Statt** eines Rasterwerts ist auch eine **konkrete Uhrzeit** wählbar (Wunschzeit = Vorbestellung, auch am selben Tag) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 39, Obergrenzen und Uhrzeit Runde 44 |
| Bei aktivem Annahmestopp **„gar nichts mehr"** (FA-23) ist die Handannahme **nicht gesperrt**: das System **warnt**, die Annahme kann mit „trotzdem anlegen" **übersteuern**; das Übersteuern wird **protokolliert** (Person, Uhrzeit, Bestellung; ohne Begründung — *Protokollteil Lesart Jarvis*) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 39 |
| Zahlung am Tresen (Abholung, Mitnehmen) vorerst **nur bar**, **kein** Kartengerät | [ENTSCHIEDEN Sirat 2026-09-18/2026-09-22] | Mitschrift Runde 8; bestätigt Runde 36 |
| **Mitnehmen ohne Anruf**: von der Annahme **von Hand** erfasst, **sofort beim Bestellen** bezahlt (bar), der kassierenden Person zugeordnet | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 |
| **Name** wird bei allen telefonischen Bestellungen (Lieferung/Abholung) erfasst | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 15 |
| **Weg B:** Bei telefonischen Bestellungen füllt der Mitarbeiter die Pflichtangabe „Adresse merken? — Kunde gefragt" aus; **nur bei „Ja"** wird ein Kundeneintrag (Rufnummer, Name, Adresse) gespeichert, bei „Nein" nicht. Löschfrist vorerst **12 Monate** nach der letzten Bestellung | [ENTSCHIEDEN Sirat 2026-09-21] (vorbehaltlich Anwalt, Q10) | Mitschrift Runde 17/18, ADR 0007 |
| Manuelle Annahme ruft denselben Kern-Befehl wie Telefon/Website (`createOrder`) | [FEST] | Briefing §2.2, §5.3, CLAUDE §3 |
| Summen rechnet der Server, nicht der Mensch | [FEST] | Briefing §2.8 |
| Preise/Artikeltexte zum Bestellzeitpunkt einfrieren | [FEST] | Briefing §5.2 |
| Bedienbar ohne Schulung, große Buttons, wenige Schritte, Tablet/Handy | [FEST] | Briefing §1, §2 (§9.9); Mitschrift Runde 2 |
| Anmeldung Küche/Annahme per PIN + registriertes Gerät | [STACK] / [OFFEN] Q11 | Briefing §4 (Login) |
| Offline-Annahme bei Internetausfall | [FEST] | Briefing §2.18, §5.5 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Lieferung | 2 Artikel, Adresse in Zone, Rufnummer `+49 30 23125 201`, Pflichtangabe „Adresse merken?" = **Ja** | Bestellung Eingegangen, Bestellart Lieferung, Server-Summe, Lieferzeit der Zone; Kundeneintrag gespeichert | Keine von Hand gerechnete Summe; Kundeneintrag ohne „Adresse merken? = Ja" | manuell am Gerät + automatisch |
| Kunde sagt Nein → kein Kundeneintrag | Telefonische Bestellung, Pflichtangabe „Adresse merken?" = **Nein** | Bestellung wird normal angelegt; **kein** Kundeneintrag gespeichert | Kundeneintrag trotz „Nein"; Anlegen ohne ausgefüllte Pflichtangabe | manuell + automatisch |
| Pflichtangabe „Adresse merken?" fehlt (Grenzfall) | Telefonische Bestellung, Angabe „Adresse merken?" nicht ausgefüllt | Anlegen erst nach Ausfüllen der Pflichtangabe möglich | Bestellung ohne die Pflichtangabe anlegen | automatisch |
| Abholung nach Anruf | 1 Artikel, keine Adresse | Bestellung Eingegangen, Bestellart Abholung, keine Liefergebühr, ein Bon-Exemplar (kein Fahrer-QR im ersten Piloten, ADR 0008) | Keine Adresse/Liefergebühr | manuell + automatisch |
| Mitnehmen ohne Anruf, sofort bezahlt | Gast am Tresen, 1 Artikel, zahlt sofort beim Bestellen (bar) | Bestellung Eingegangen, Bestellart Mitnehmen, Zahlung erfasst und der angemeldeten Person zugeordnet | Abschluss ohne erfasste Zahlung; Zahlung ohne Personenzuordnung | manuell + automatisch |
| Ausnahme Mindestbestellwert von Hand (B14) | Telefonische Liefer-Bestellung, Warenwert unter Zonen-Mindestbestellwert; Annahme entscheidet auf Ausnahme | System zeigt Unterschreitung; Annahme darf trotzdem anlegen (Ausnahme), **ohne Begründung**; ein **Protokolleintrag** (Person, Uhrzeit, Bestellung) wird geschrieben | Ausnahme still ohne Hinweis; Anlegen blockieren, obwohl die Annahme die Ausnahme gewählt hat; Ausnahme ohne Protokolleintrag; Begründung verlangen | manuell + automatisch |
| Vorbestellung | Wunschzeit 19:00, geöffnet | Bestellung Eingegangen, Kennzeichnung „Vorbestellung 19:00", Bon sofort gekennzeichnet gedruckt | Kennzeichnung fehlt nicht | manuell + automatisch |
| Artikel „momentan aus" (Grenzfall) | Artikel als nicht verfügbar markiert | System zeigt „nicht bestellbar", verlangt Alternative | Nicht verfügbarer Artikel wird angelegt | automatisch |
| Adresse außerhalb Liefergebiet | Adresse außerhalb der Zonen | Hinweis, Wechsel zu Abholung möglich | Liefer-Bestellung außerhalb Gebiet **ohne** Ausnahme durch die Annahme | automatisch |
| Ausnahme Liefergebiet von Hand, Gebühr + Rasterzeit (Runde 33/39) | Liefer-Bestellung, Adresse außerhalb aller Zonen; Annahme entscheidet auf Ausnahme, gibt **Liefergebühr von Hand** ein und wählt **Lieferzeit „45 Min" aus dem 15er-Raster** | System zeigt „außerhalb"; Annahme darf trotzdem als Liefer-Bestellung anlegen (Ausnahme), **ohne Begründung**; von Hand eingegebene Gebühr fließt in die Server-Summe, Rasterzeit übernommen; ein **Protokolleintrag** (Person, Uhrzeit, Bestellung) wird geschrieben | Ausnahme still ohne Hinweis; Anlegen blockieren, obwohl die Annahme die Ausnahme gewählt hat; Ausnahme ohne Protokolleintrag; Begründung verlangen; Lieferzeit als Freitext | manuell + automatisch |
| Lieferzeit-Freitext wird abgelehnt (Grenzfall, Runde 39) | Handannahme, Mitarbeiter versucht eine Lieferzeit außerhalb des 15er-Rasters (z. B. „37 Minuten" frei) einzugeben | Nur Rasterwerte (15 · 30 · 45 … bis 2 Std) wählbar; Freitext nicht möglich; Abholzeit analog nur 10er-Raster (bis 60 Min); **statt** eines Rasterwerts ist eine **konkrete Uhrzeit auswählbar** (Wunschzeit = Vorbestellung, auch am selben Tag) | Freie Zeitangabe (Minuten) zulassen; Bestellung mit rasterfremder Minutenzeit anlegen; Uhrzeit-Auswahl verhindern | automatisch |
| Handannahme bei Annahmestopp „gar nichts mehr" (Runde 39) | Annahmestopp „gar nichts mehr" aktiv (FA-23); Annahme legt trotzdem von Hand an | System **warnt**, bietet „trotzdem anlegen"; keine harte Sperre; beim Übersteuern Bestellung Eingegangen **mit Protokolleintrag** (Person, Uhrzeit, Bestellung) | Harte Sperre; stilles Anlegen ohne Warnung; Übersteuern ohne Protokolleintrag | manuell + automatisch |
| Internet weg (Grenzfall offline) | Verbindung getrennt beim Anlegen | Bestellung landet in Warteschlange, wird nachgespielt (FA-14) | Bestellung verschwindet lautlos | manuell + automatisch |
| Zwei-Restaurant-Fall | Restaurant A und B, je eigene Speisekarte, gleiche Testrufnummer `+49 30 23125 202` | Bestellung nur bei A sichtbar; B sieht nichts | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Manuelle Annahme → Bestellung anlegen" (K2 noch offen)
- **Zustandsübergänge:** (kein Vorzustand) → **Eingegangen**
- **Technische Anwendungsfälle:** TU-? (`createOrder`, Verfügbarkeits-/Liefergebietsprüfung, Zuordnung in K7)
- **Verträge / Events:** `order.created` (K6 noch offen)
- **Testszenarien:** FA-05-T1 … FA-05-T14 (Tabelle oben)
- **Nachbar-Fälle:** FA-03 (Ausnahme Mindestbestellwert **und Ausnahme Liefergebiet** — die KI eskaliert, die Annahme entscheidet hier), FA-06 (Bon), FA-07 (Küche) — **entfällt im Piloten** (keine Küchen-Status), FA-14 (Internet weg), FA-15 (Übergabe/Zahlung), FA-16 (Tagesabschluss Abholung/Mitnehmen), FA-17 (Lieferzonen — Zonen-Lieferzeit/Abhol-Zeitwert auf demselben Raster), FA-23 (Annahmestopp — Handannahme bei „gar nichts mehr" = **Warnung, übersteuerbar**, Runde 39)

## Offene Fragen

> **Beantwortet (Runde 29):** **Mitnehmen ohne Anruf** — der Kunde **bezahlt sofort beim Bestellen** (bar), die Annahme erfasst die Bestellung von Hand. Für **Abholung nach Anruf** bleibt es dabei: bezahlt wird **bei der Übergabe**, bar, durch die zuständige Person (Mitschrift Runde 9/10) → geführt in **FA-15**. (Der Kassensturz je Fahrer, FA-10, deckt das nicht ab; die Tagesabrechnung dazu → FA-16.)

> **Beantwortet (Runde 31):** Die **Ausnahme vom Mindestbestellwert** durch die Annahme (von Hand unter dem Mindestbestellwert anlegen, Runde 28 B14) braucht **keine Begründung** — es genügt der **Protokolleintrag** „unter Mindestbestellwert angelegt" mit Person, Uhrzeit und Bestellung ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31).

> **Beantwortet (Runde 39, Q22):** Legt die Annahme als **Ausnahme** eine Liefer-Bestellung mit einer **Adresse außerhalb aller Zonen** an (FA-01 7a / FA-03 Grund 8), gibt sie die **Liefergebühr von Hand** ein; die **Lieferzeit** wählt sie **aus dem 15-Minuten-Raster** (kein Freitext). Die von Hand eingegebene Gebühr fließt in die vom Server berechnete Summe ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39; open-questions.md Q22).

> **Beantwortet (Runde 39, Q23):** Ist ein Annahmestopp **„gar nichts mehr"** aktiv (FA-23), darf die Annahme trotzdem von Hand anlegen — das System **warnt** und bietet „trotzdem anlegen"; **keine harte Sperre**. Das Übersteuern wird protokolliert (*Protokollteil Lesart Jarvis*) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39; open-questions.md Q23).

> **Beantwortet (Runde 39, Q24):** Die Pflichtangabe **„Adresse merken?"** bleibt bei der Handannahme **Weg B (streng)**: der Mitarbeiter fragt den Kunden **immer** und merkt die Adresse **nur bei „Ja"** (kein pauschales Merken). FA-05 bleibt in diesem Punkt wie entworfen; ADR 0007 unverändert ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39; open-questions.md Q24).

> **Beantwortet (Runde 33):** Vorbestellung über einen Preiswechsel hinweg — es gilt der **eingefrorene Preis vom Bestelltag** ([ENTSCHIEDEN Sirat 2026-09-22], Briefing §5.2). Die Frage wird einmal in **FA-12** geführt.

> **Frage an Anwalt (über Sirat, Q10):** Sirat hat **Weg B** entschieden (der Mitarbeiter fragt den Kunden „Adresse merken?" und hält die Antwort als Pflichtangabe fest; Kundeneintrag nur bei „Ja"; Löschfrist vorerst 12 Monate) — **vorbehaltlich Bestätigung durch den Anwalt**. Trägt die mündliche Einwilligung als Rechtsgrundlage, und genügt die Pflichtangabe als Nachweis? (open-questions.md Q10.)

## Nicht Teil dieses Anwendungsfalls

- Bon-Druck → FA-06 (bei Lieferung **zwei Exemplare**; **kein** Fahrer-QR im ersten Piloten, ADR 0008). Von Hand angelegte Bestellungen gelten als **direkt quittiert** → Bon **sofort**, ohne Signal/Quittierung (FA-06, Runde 35).
- Wie eine **Liefer-Bestellung ohne Fahrer-Erfassung im System endet** (kein Fahrer-Scan, keine Zahlart im ersten Piloten) → einmal geführt in **FA-06** (K3/Q13, `architect`); hier nur der Verweis.
- Führung durch die Küche → FA-07 (**entfällt im Piloten**; die Küche arbeitet auf Papier vom Bon).
- Verhalten bei Internetausfall im Detail → FA-14.
- Übergabe und Bezahlung bei Abholung/Mitnehmen sowie Tagesabschluss → FA-15, FA-16.
- **„Hier essen" (Gastraum)** ist im Piloten **nicht** Teil von fluvo — der Gastraum läuft über die **bestehende Kasse** des Piloten ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 37).
- Wie eine Bestellart ohne „Unterwegs" durch das Zustandsmodell läuft → siehe „Offene Fragen" von FA-08/FA-10 (K3 mit `architect`).
- Änderung oder Storno nach dem Anlegen → FA-11.
