# FA-01: KI nimmt Anruf an und Bestellung auf (Lieferung, Abholung, Vorbestellung)

- **Status:** mit Sirat durchgegangen (Runden 32–33, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Ein Anrufer bestellt telefonisch zum Liefern, zum Abholen oder als Vorbestellung auf eine Uhrzeit; die KI nimmt auf, nennt die vom System berechnete Summe und die Lieferzeit und legt die Bestellung erst nach ausdrücklicher Bestätigung an. |
| **Akteur** | Anrufer, KI-Assistent |
| **Auslöser** | Ein Anruf erreicht die KI, weil im Laden niemand abgenommen hat (Overflow, [FEST 10]). |
| **Vorbedingungen** | Das Restaurant hat den Anrufmanager KI gebucht und aktiv geschaltet (FA-13). Speisekarte, Öffnungszeiten, Liefergebiet mit Zonen und Lieferzeit (FA-17) sind hinterlegt. Der Anruf ist auf die KI umgeleitet. Ist ein **Annahmestopp** aktiv (FA-23), nimmt die KI die betroffene Bestellart **nicht** regulär an, sondern sagt ab und bietet ggf. eine Vorbestellung an (siehe Ausnahme 3c). |
| **Nachbedingungen** | Bei Bestätigung existiert genau eine neue Bestellung im Status **Eingegangen**, mit Bestellart (Lieferung / Abholung), eingefrorenen Preisen und Artikeltexten, und — falls Vorbestellung — mit Kennzeichnung „Vorbestellung" und Wunschzeit. Bei einer **Erstbestellung** hat die KI gefragt, ob sie sich die **Adresse für die nächste Bestellung merken** soll (Einwilligung, „Weg B"); die **Antwort** ist als **Protokolleintrag** festgehalten (kein Audio, [FEST 13]). Nur bei **„Ja"** wird beim Restaurant ein **Kundeneintrag** (Rufnummer, Name, Adresse) gespeichert — dadurch kann FA-02 (Stammkunde) eintreten; bei **„Nein"** wird **kein** Kundeneintrag angelegt und die Bestellung läuft normal weiter. **Löschfrist vorerst 12 Monate nach der letzten Bestellung.** Alles **vorbehaltlich Bestätigung durch den Anwalt (Q10)** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007). Ohne Bestätigung existiert keine Bestellung. |

## Ist-Ablauf heute (aus der Mitschrift, Runde 3 und 4)

1. Das Telefon (ein Handy) klingelt; der Kollege am Telefon nimmt ab, fragt „Was darf es sein?" und schreibt von Hand auf: Gerichte, Adresse, Name, ggf. Besonderheiten. Legt auf.
2. Derselbe Kollege rechnet danach von Hand aus, was die Bestellung kostet.
3. Der Preis wird dem Kunden nur auf Wunsch genannt; nach der Lieferzeit fragen rund 90 % der Anrufer, sie wird geschätzt.

> Beim Piloten wird heute *nach* dem Auflegen gerechnet — der Kunde erfährt den Preis am Telefon in der Regel nicht verbindlich (Mitschrift Runde 4). fluvo dreht das um: Das System rechnet, die KI nennt die Summe **immer** vor der Bestätigung ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 8).

## Normalablauf (Lieferung)

1. Der Anrufer wird auf die KI umgeleitet.
2. Die KI meldet sich mit einem festen ersten Satz und weist darauf hin, dass ein KI-Assistent spricht.
3. Die KI fragt nach der **Bestellart**: „Lieferung, Abholung oder Sonstiges?" (genauer Wortlaut → **K4**). Der Anrufer wählt **Lieferung** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 32/33). („Abholung" → Ausnahme 3a; „Sonstiges" → Ausnahme 3d; eine Wunschzeit macht daraus eine Vorbestellung → Ausnahme 3b.)
4. Der Anrufer nennt seine Gerichte.
5. Die KI gleicht jeden Wunsch mit der aktuellen Speisekarte des Restaurants ab (Verfügbarkeit, Optionen, Preis).
6. Der Anrufer nennt seine Lieferadresse.
7. Die KI lässt prüfen, ob die Adresse im Liefergebiet liegt, und ordnet sie einer Lieferzone zu. Die Zonen sind als **Ortsteile** beschrieben (FA-17); die Zuordnung Adresse → Ortsteil macht das System (Geocoder → Q6) — die **KI rät den Ortsteil nie** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B18; [FEST 8]).
8. Die KI fragt **immer nach dem Namen** des Anrufers und — falls zum Anruf **keine Rufnummer übermittelt** wurde — **nach der Rufnummer** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15). Die Rufnummer wird gebraucht, damit sie auf dem Bon steht (der Fahrer braucht sie, FA-06/FA-09).
9. Die KI lässt die Gesamtsumme (Artikel + Liefergebühr) vom System berechnen; der Mindestbestellwert wird gegen den **Warenwert** (Artikel **ohne** Liefergebühr) geprüft ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 27 B17).
10. Die KI liest dem Anrufer die Bestellung, die vom System berechnete Gesamtsumme und die für die Zone hinterlegte Lieferzeit (FA-17) vor.
11. Der Anrufer bestätigt die Bestellung ausdrücklich.
12. **Bei einer Erstbestellung** (die Rufnummer ist noch nicht als Kunde hinterlegt) fragt die KI, ob sie sich die **Adresse für die nächste Bestellung merken** soll (Einwilligung, „Weg B"; [ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007). Den genauen **Wortlaut** legt K4 fest (hier nicht ausformuliert). Die **Antwort** (Ja/Nein) wird als **Protokolleintrag** festgehalten — **kein Audio, kein Volltranskript** ([FEST 13]).
13. Das System legt die Bestellung im Status **Eingegangen** an, friert Preise und Artikeltexte ein und vermerkt die Zustimmung zur Bestellung als Log-Eintrag. **Bei „Ja"** (Schritt 12) wird zusätzlich ein **Kundeneintrag** (Rufnummer, Name, Adresse) gespeichert; **bei „Nein"** wird **kein** Kundeneintrag angelegt — die Bestellung läuft normal weiter (alles vorbehaltlich Anwalt, Q10). Der **Bon wird nicht sofort gedruckt**: Das **Annahme-Gerät signalisiert** die neue Bestellung; der Bon druckt **nach Quittierung** der Annahme (spätestens nach **2 Minuten**) → **FA-06** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 34/35).
14. Die KI bestätigt die Aufnahme, nennt die Lieferzeit noch einmal und beendet das Gespräch.

## Ausnahmeabläufe

- **2a. Rufnummer ist als Stammkunde bekannt** (zweigt von Schritt 2 ab): → **FA-02** (Stammkunden-Erkennung nur per Rufnummer, [FEST 15]).
- **3a. Abholung statt Lieferung** (zweigt von Schritt 3 ab): Der Anrufer wählt bei der Bestellart-Frage **Abholung**. Es wird keine Adresse und keine Liefergebühr erhoben (Schritte 6–7 entfallen). Die KI fragt weiterhin **nach dem Namen** und, falls keine Rufnummer übermittelt wurde, nach der Rufnummer (Schritt 8 gilt auch hier). Die KI nennt die Summe und die **Abholzeit** — ein eigener, je Restaurant eingestellter Wert („Abholung in ca. X Minuten", FA-17, [ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 8). → Bestellart **Abholung**, ein Bon-Exemplar (im ersten Piloten trägt ohnehin **kein** Bon einen Fahrer-QR — der QR kommt mit der Fahrer-App wieder, ADR 0008; bei Lieferung dagegen zwei Exemplare, FA-06). Endet in: Bestellung angelegt, Status **Eingegangen**.
- **3b. Vorbestellung auf eine Zeit** (zweigt von Schritt 3 ab): Der Anrufer nennt zusätzlich zur Bestellart (Lieferung oder Abholung) eine Wunschzeit; diese darf **beliebig weit im Voraus** liegen. Einzige Bedingung: Das Restaurant hat zur Wunschzeit Betrieb (Öffnungszeiten, Ruhetage, Urlaub berücksichtigt — [ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 7, Nachtrag Sirat). Die KI lässt das prüfen. Hat das Restaurant Betrieb: Aufnahme wie Lieferung/Abholung, zusätzlich Kennzeichnung „Vorbestellung" mit Wunschzeit. Bei einer Vorbestellung nennt die KI die **gewünschte Uhrzeit** als Zusage, **nicht** die Zonen-Lieferzeit ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44); fehlt der Zone ein Zeitwert, nennt sie „ca. eine Stunde" (Runde 44). Der Bon wird über **FA-06** ausgegeben — bei dieser KI-Bestellung **nach Quittierung** der Annahme (spätestens nach 2 Minuten, nicht mehr „sofort") — und deutlich als Vorbestellung mit Wunschzeit gekennzeichnet ([ENTSCHIEDEN Sirat 2026-09-18], Bon-Ablauf angepasst Runde 34/35, FA-06). Der genannte Preis ist der **eingefrorene Preis vom Bestelltag** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 33; Briefing §5.2 — Frage wird einmal in FA-12 geführt). Endet in: Bestellung angelegt, Status **Eingegangen**, gekennzeichnet als Vorbestellung.
- **3b-i. Kein Betrieb zur Wunschzeit** (zweigt von 3b ab): Die KI teilt mit, dass zu der Zeit kein Betrieb ist (geschlossen, Ruhetag oder Urlaub), und fragt nach einer anderen Zeit. Kommt keine Einigung zustande, **beendet die KI das Gespräch freundlich** — **keine Übergabe an einen Menschen** nur deswegen ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 32). Endet in: neue Wunschzeit (zurück zu 3b) oder keine Bestellung, Gespräch beendet.
- **3c. Annahmestopp aktiv** (zweigt von Schritt 3 ab): Ist für das Restaurant ein **Annahmestopp** gesetzt (FA-23), sagt die KI **freundlich ab** und bietet — nur bei Betrieb zur Wunschzeit (FA-18) — eine **Vorbestellung** an. Bei **„keine Lieferung mehr"** nimmt die KI eine **Abholung** weiter regulär an (3a); nur die Lieferung ist gesperrt. Bei **„gar nichts mehr"** wird nichts regulär angenommen ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 23; Ausgestaltung → FA-23). Endet in: Abholung/Vorbestellung angelegt oder Gespräch ohne Bestellung.
- **3d. „Sonstiges" (kein Bestell-Anliegen)** (zweigt von Schritt 3 ab): Der Anrufer nennt bei der Bestellart-Frage ein anderes Anliegen (z. B. Änderung/Storno einer bestehenden Bestellung, Beschwerde, Frage zu einer laufenden Bestellung, Wunsch nach einem Menschen). Die KI gibt — soweit erlaubt und aus den Stammdaten möglich — **Auskunft**; alles, was sie nicht selbst erledigen darf, **übergibt sie an einen Menschen** → **FA-03** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 32/33; Wortlaut → K4). Endet in: Auskunft gegeben oder Eskalation (FA-03); keine Bestellung aus diesem Zweig.
- **5a. Artikel nicht verfügbar / „momentan aus"** (zweigt von Schritt 5 ab): Die KI teilt mit, dass der Artikel nicht verfügbar ist, und fragt nach einer Alternative. Endet in: geänderter Bestellung (zurück zu 5) oder Abbruch (FA-04).
- **7a. Adresse außerhalb des Liefergebiets** (zweigt von Schritt 7 ab): Die KI teilt mit, dass nicht dorthin geliefert wird, und bietet **Abholung** an. Bittet der Anrufer um eine **Ausnahme** (dorthin trotzdem liefern), sagt die KI das **nicht selbst zu**, sondern **verbindet an die Annahme** → **FA-03** (Eskalationsgrund „Ausnahme Liefergebiet"); **die Annahme entscheidet** über die Ausnahme (Muster wie bei der Ausnahme Mindestbestellwert, 9a) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 33). Endet in: Bestellart Abholung (3a), Eskalation an die Annahme (FA-03) oder Abbruch (FA-04).
- **8a. Keine Rufnummer übermittelt** (zweigt von Schritt 8 ab): Wurde zum Anruf keine Rufnummer übermittelt (unterdrückt oder nicht übertragen), fragt die KI den Anrufer ausdrücklich nach seiner Rufnummer, damit sie auf dem Bon steht (der Fahrer braucht sie, FA-09) ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15). Endet in: Rufnummer erfasst, weiter im Normalablauf.
- **9a. Warenwert unter Mindestbestellwert** (zweigt von Schritt 9 ab): Maßgeblich ist der **Warenwert ohne Liefergebühr** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 27 B17). Liegt er unter dem Mindestbestellwert der Zone, **teilt die KI den Mindestbestellwert mit und fragt, ob der Anrufer etwas dazunehmen möchte**. Will der Anrufer **eine Ausnahme** (unter dem Mindestbestellwert liefern lassen), sagt die KI das **nicht selbst zu**, sondern **verbindet an die Annahme** → **FA-03** (Eskalationsgrund „Ausnahme Mindestbestellwert"); **die Annahme entscheidet** über die Ausnahme ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B14). Endet in: ergänzter Bestellung (zurück zu 5), Eskalation an die Annahme (FA-03) oder Abbruch (FA-04).
- **10a. Anrufer will die noch nicht bestätigte Bestellung ändern** (zweigt von Schritt 10 ab): Solange die Bestellung im laufenden Gespräch **noch nicht bestätigt** ist, ist ein Wunsch nach mehr, weniger oder anderen Artikeln normaler Gesprächsverlauf. Die KI passt die Bestellung an und geht **zurück zu Schritt 5** (neue Speisekarten-Abgleichung, neue Summe). Keine Eskalation.
- **10b. Anrufer wünscht einen Rabatt, oder will eine bereits aufgegebene Bestellung ändern/stornieren** (zweigt von Schritt 10 ab): Die KI sagt nichts zu, was Geld kostet ([FEST 11]), und übergibt an einen Menschen → **FA-03**. (Nur der Rabattwunsch und die Änderung/Stornierung einer **bereits angelegten** Bestellung sind Eskalationsgründe, nicht die Änderung der laufenden, noch offenen Bestellung.)
- **11a. Anrufer bestätigt nicht / legt auf** (zweigt von Schritt 11 ab): Es wird keine Bestellung angelegt → **FA-04**.

## Darf nicht

- Die KI legt **keinen** Datensatz in den Bestellungen an, bevor der Anrufer ausdrücklich bestätigt hat ([Briefing §5.4]).
- Die KI rechnet Summen **nicht selbst**; jede genannte Summe kommt vom System ([FEST 8]).
- Die KI sagt **nichts** zu, was Geld kostet — keine Rabatte, keine Stornos ([FEST 11]).
- Die KI **entscheidet nicht selbst** über eine **Ausnahme vom Mindestbestellwert** — sie verbindet an die Annahme, die Annahme entscheidet ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B14; [FEST 11]).
- Die KI **entscheidet nicht selbst** über eine **Ausnahme außerhalb des Liefergebiets** — sie sagt ab, bietet Abholung an und verbindet bei Ausnahmewunsch an die Annahme, die entscheidet ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 33; [FEST 11]).
- Die KI **rät den Ortsteil** einer Adresse **nicht**; die Zuordnung Adresse → Ortsteil/Zone macht der Geocoder (Q6), nicht das LLM ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B18; [FEST 8]).
- Die KI gibt sich **nicht** als Mensch aus; der KI-Hinweis fällt immer ([FEST 14]).
- Es wird **kein** Audio und **kein** dauerhaftes Volltranskript gespeichert ([FEST 13]).
- Eine Vorbestellung außerhalb der Öffnungszeit wird **nicht** als reguläre Bestellung angelegt.
- Der Anrufer zahlt nie einen anderen Preis, als ihm am Telefon genannt wurde (Preisstand vom Gesprächsbeginn, Mitschrift Runde 3).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| KI-Ansage als fester erster Satz, technisch erzwungen | [FEST] | Briefing §2.14, §5.4 |
| Bestellung erst mit ausdrücklicher Bestätigung; vorher kein Datensatz | [FEST] | Briefing §5.4 |
| Summen und Liefergebühr rechnet der Server, nicht das LLM | [FEST] | Briefing §2.8, §5.4 |
| Der Mindestbestellwert zählt nur den **Warenwert** (Artikel ohne Liefergebühr) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 27 (B17), erstmals Runde 23 |
| Einstieg: Nach dem KI-Hinweis fragt die KI nach der **Bestellart** „Lieferung, Abholung oder Sonstiges?" (Wortlaut → K4); „Sonstiges" führt zu Auskunft oder Übergabe an einen Menschen (FA-03) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 32/33 |
| Unter Mindestbestellwert: KI sagt es und fragt nach Ergänzung; bei **Ausnahmewunsch** verbindet die KI an die **Annahme**, die entscheidet (Eskalationsgrund, FA-03) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 28 (B14) |
| Adresse **außerhalb des Liefergebiets**: KI sagt ab und bietet Abholung an; bei **Ausnahmewunsch** verbindet die KI an die **Annahme**, die entscheidet (Eskalationsgrund „Ausnahme Liefergebiet", FA-03) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 33 |
| Zonen als **Ortsteile** beschrieben; Adresse → Ortsteil per Geocoder (Q6), die **KI rät den Ortsteil nie** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 28 (B18) |
| KI nennt keine Rabatte/Stornos | [FEST] | Briefing §2.11 |
| Lieferzeit ist der je Zone eingestellte Wert (FA-17), die KI nennt ihn | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 5 |
| Abholzeit ist ein eigener, je Restaurant eingestellter Wert („Abholung in ca. X Minuten", FA-17); die KI nennt ihn | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 8 |
| Vorbestellung: KI prüft Öffnungszeit, kennzeichnet die Bestellung (auch auf dem Bon) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 7 |
| Vorbestellung: Bon-Ausgabe über FA-06 — bei KI-Bestellung **nach Quittierung** (spätestens 2 Min), deutlich als Vorbestellung mit Wunschzeit gekennzeichnet (der Bon-Zeitpunkt „sofort" gilt seit Runde 34/35 nur noch für von Hand angelegte Bestellungen) | [ENTSCHIEDEN Sirat 2026-09-18/2026-09-22] | Mitschrift Runde 7 (Nachtrag), 32, 34/35 |
| Vorbestellung beliebig weit im Voraus; einzige Bedingung: Betrieb zur Wunschzeit (Öffnungszeiten, Ruhetage, Urlaub) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 7 (2. Nachtrag Sirat) |
| KI fragt **immer nach dem Namen**; ist keine Rufnummer übermittelt, fragt sie nach der Rufnummer | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 15 |
| **Weg B (Einwilligung):** Die KI fragt bei der **Erstbestellung**, ob sie sich die Adresse für die nächste Bestellung merken soll. Bei **Ja** wird ein Kundeneintrag (Rufnummer, Name, Adresse) gespeichert; bei **Nein** nicht, die Bestellung läuft normal weiter. Die Antwort wird als Protokolleintrag festgehalten (kein Audio, [FEST 13]) | [ENTSCHIEDEN Sirat 2026-09-21] (vorbehaltlich Anwalt, Q10) | Mitschrift Runde 17/18, ADR 0007 |
| **Löschfrist vorerst 12 Monate** nach der letzten Bestellung | [ENTSCHIEDEN Sirat 2026-09-21] (vorbehaltlich Anwalt, Q10) | Mitschrift Runde 17/18, ADR 0007 |
| Genauer **Wortlaut** der Einwilligungsfrage → nicht hier, sondern in **K4** | [STACK] | ADR 0007 „Folgen" (K4) |
| Stammkunden-Erkennung nur per Rufnummer | [FEST] | Briefing §2.15 |
| KI nennt die Summe **immer** vor der Bestätigung (nicht nur auf Wunsch) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 8 |
| Vorbestellung über einen Preiswechsel hinweg: es gilt der **eingefrorene Preis vom Bestelltag** (die Frage wird einmal in **FA-12** geführt) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 33; Briefing §5.2 |
| Latenz-Budget der KI unter 1 Sekunde | [STACK] | Briefing §5.4 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Lieferung | Anruf, KI fragt Bestellart, Anrufer „Lieferung", 2 Artikel, Adresse im Liefergebiet, Bestätigung | Bestellung im Status Eingegangen, Bestellart Lieferung, Summe = Server-Summe, Lieferzeit der Zone genannt, Name erfragt | Kein Datensatz vor Bestätigung; KI nennt keine selbst gerechnete Summe; Bestellart nicht erfragt | Testanruf + automatisch |
| Bestellart-Frage im Einstieg | Anruf, KI fragt nach dem KI-Hinweis „Lieferung, Abholung oder Sonstiges?" | KI stellt die Bestellart-Frage, bevor Gerichte aufgenommen werden; je nach Antwort Lieferung (Normalablauf), Abholung (3a) oder Sonstiges (3d) | Gerichte aufnehmen, ohne die Bestellart zu kennen | Testanruf |
| „Sonstiges" → Auskunft/Eskalation (3d) | Anrufer wählt bei der Bestellart-Frage „Sonstiges" (z. B. Frage/Änderung) | KI gibt zulässige Auskunft oder übergibt an einen Menschen (FA-03); keine Bestellung aus diesem Zweig | KI legt eine Bestellung an; KI sagt etwas zu, was Geld kostet | Testanruf + automatisch |
| Erstbestellung, Kunde sagt Ja | Neue Rufnummer, KI fragt „Adresse merken?", Anrufer sagt **Ja** | Kundeneintrag (Rufnummer, Name, Adresse) gespeichert; Antwort als Protokolleintrag (kein Audio); Bestellung Eingegangen | Kundeneintrag ohne Einwilligung; Audio/Transkript gespeichert | Testanruf + automatisch |
| Kunde sagt Nein → kein Kundeneintrag | Neue Rufnummer, KI fragt „Adresse merken?", Anrufer sagt **Nein** | **Kein** Kundeneintrag angelegt; Bestellung läuft normal weiter und wird angelegt; „Nein" als Protokolleintrag | Kundeneintrag trotz „Nein"; Bestellung scheitert wegen „Nein" | Testanruf + automatisch |
| Folgeanruf nach Nein → keine Wiedererkennung | Dieselbe Rufnummer ruft erneut an, nachdem sie zuvor „Nein" gesagt hat | Keine Stammkunden-Erkennung (kein Eintrag); Ablauf wie Erstbestellung, KI fragt Name und erneut „Adresse merken?" | Adresse aus einem nicht angelegten Eintrag vorlesen | Testanruf + automatisch |
| Name immer, Nummer übermittelt | Anruf mit übermittelter Rufnummer, KI fragt nach dem Namen | Name erfasst; KI fragt **nicht** zusätzlich nach der Nummer (liegt schon vor) | Bestellung ohne erfragten Namen | Testanruf + automatisch |
| Keine Rufnummer übermittelt | Anruf mit unterdrückter/nicht übertragener Nummer | KI fragt nach dem Namen **und** nach der Rufnummer; beide erfasst und auf dem Bon | Bon-Rufnummer fehlt trotz Nachfrage-Möglichkeit | Testanruf + automatisch |
| Standardfall Abholung | Anruf, „ich hole ab", 1 Artikel, Bestätigung | Bestellung Eingegangen, Bestellart Abholung, keine Liefergebühr, ein Bon-Exemplar (kein Fahrer-QR im ersten Piloten, ADR 0008) | Keine Adresse/Liefergebühr erhoben | Testanruf + automatisch |
| Vorbestellung, geöffnet | Anruf, Wunschzeit 19:00, Restaurant um 19:00 offen | Bestellung Eingegangen, gekennzeichnet „Vorbestellung 19:00" | Kennzeichnung fehlt nicht | Testanruf + automatisch |
| Vorbestellung, kein Betrieb (Grenzfall) | Wunschzeit auf einem Ruhetag/Urlaubstag | KI teilt „kein Betrieb" mit, fragt nach anderer Zeit; ohne Einigung **beendet die KI freundlich**, keine Bestellung, keine Übergabe an einen Menschen | Keine Bestellung für eine Zeit ohne Betrieb; Übergabe an einen Menschen nur wegen fehlender Einigung | Testanruf |
| Vorbestellung weit im Voraus | Wunschzeit in mehreren Tagen, Restaurant hat dann Betrieb | Bestellung Eingegangen, „Vorbestellung" mit Datum/Zeit, Bon über FA-06 (bei KI-Bestellung nach Quittierung) | Ablehnung nur wegen Vorlauf | Testanruf + automatisch |
| Artikel „momentan aus" | Bestellter Artikel als nicht verfügbar markiert | KI meldet „nicht verfügbar", fragt nach Alternative | Artikel wird nicht als bestellbar bestätigt | Testanruf + automatisch |
| Adresse außerhalb Liefergebiet | Adresse außerhalb der Zonen | KI meldet „liefern wir dorthin nicht", bietet Abholung an | Keine Liefer-Bestellung angelegt | Testanruf + automatisch |
| Ausnahmewunsch Liefergebiet → Eskalation | Adresse außerhalb der Zonen; Anrufer will trotzdem dorthin geliefert bekommen (Ausnahme) | KI sagt die Ausnahme **nicht** selbst zu, verbindet an die **Annahme** (FA-03, Grund „Ausnahme Liefergebiet"); die Annahme entscheidet | KI gewährt die Ausnahme selbst; Liefer-Bestellung außerhalb Gebiet ohne Annahme-Entscheid | Testanruf + automatisch |
| Unter Mindestbestellwert (Grenzfall) | **Warenwert** (ohne Liefergebühr) unter Mindestbestellwert; Liefergebühr würde die Rechnungssumme darüber heben | KI nennt Mindestbestellwert, fragt nach Ergänzung; die Liefergebühr zählt **nicht** mit | Bestellung wird bestätigt; Liefergebühr zum Mindestbestellwert-Vergleich addiert | Testanruf + automatisch |
| Ausnahmewunsch Mindestbestellwert → Eskalation (B14) | Warenwert unter Mindestbestellwert; Anrufer will trotzdem geliefert bekommen (Ausnahme) | KI sagt die Ausnahme **nicht** selbst zu, verbindet an die **Annahme** (FA-03); die Annahme entscheidet | KI gewährt die Ausnahme selbst; Bestellung unter Mindestbestellwert ohne Annahme-Entscheid | Testanruf + automatisch |
| Ortsteil per Geocoder, KI rät nicht (B18) | Zonen als „Ortsteil A/B"; Anrufer nennt Adresse, Geocoder ordnet Ortsteil B zu | System ordnet die Adresse Ortsteil B zu und nennt dessen Zeit/Gebühr/Mindestbestellwert; KI nennt keinen Ortsteil von sich aus | KI rät den Ortsteil; falscher/erfundener Ortsteil | Testanruf + automatisch |
| Abbruch vor Bestätigung (Grenzfall leer) | Anrufer legt vor Schritt 10 auf | Keine Bestellung; Verweis FA-04 | Kein Datensatz in den Bestellungen | Testanruf |
| Zwei-Restaurant-Fall | Restaurant A und B, gleiche Testrufnummer `+49 30 23125 111`, unterschiedliche Speisekarten/Zonen | Jede Bestellung liegt beim richtigen Restaurant; A sieht B nicht | Kein Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „KI-Gespräch → Bestellung anlegen" (K2 noch offen)
- **Zustandsübergänge:** (kein Vorzustand) → **Eingegangen**
- **Technische Anwendungsfälle:** TU-? (Function Calls `check_menu_item`, `validate_address`, `get_customer_by_phone`, `create_order`, `escalate_to_human` — Zuordnung in K7)
- **Verträge / Events:** `order.created`; Kundeneintrag speichern/aktualisieren (vorläufig `customer.upserted`, Rechtsgrundlage/Löschfrist offen → Q10); Zustimmung als Log-Eintrag (K6 noch offen)
- **Testszenarien:** FA-01-T1 … FA-01-T14 (Tabelle oben)
- **Nachbar-Fälle:** FA-02 (Stammkunde, entsteht durch den hier gespeicherten Kundeneintrag), FA-03 (Eskalation, u. a. „Sonstiges" 3d, Ausnahme Mindestbestellwert 9a, Ausnahme Liefergebiet 7a, „Frage zu laufender Bestellung"), FA-04 (Abbruch), FA-06 (Bon), FA-17 (Lieferzonen/-zeit), FA-23 (Annahmestopp — KI sagt ab / bietet Vorbestellung, Ausnahme 3c)

## Offene Fragen

> **Beantwortet (Runde 33):** Vorbestellung über einen Preiswechsel hinweg — es gilt der **eingefrorene Preis vom Bestelltag** ([ENTSCHIEDEN Sirat 2026-09-22], Briefing §5.2). Die Frage wird einmal in **FA-12** geführt.

> **Beantwortet (Runde 32):** Passt bei einer Vorbestellung ohne Betrieb zur Wunschzeit keine andere Zeit, **beendet die KI das Gespräch freundlich** — **keine** Übergabe an einen Menschen nur deswegen ([ENTSCHIEDEN Sirat 2026-09-22]).

> **Frage an Anwalt (über Sirat, Q10):** Sirat hat **Weg B** entschieden (KI fragt bei der Erstbestellung um Einwilligung, Löschfrist vorerst 12 Monate) — dies **vorbehaltlich Bestätigung durch den Anwalt**. Trägt die telefonische Einwilligung als Rechtsgrundlage, genügt die 12-Monats-Frist, und reicht der Protokolleintrag (ohne Audio) als Nachweis? (open-questions.md Q10.)

## Nicht Teil dieses Anwendungsfalls

- Stammkunden-Erkennung und -Ablauf → FA-02.
- Eskalation an einen Menschen, Änderungs- und Stornowunsch sowie **Fragen zu einer bereits laufenden Bestellung** („Wo bleibt mein Essen?", Eskalationsgrund 6) → FA-03.
- Abbruch vor der Bestätigung → FA-04.
- Bon-Druck → FA-06 (bei Lieferung **zwei Exemplare**, **kein** Fahrer-QR im ersten Piloten, ADR 0008). Küche → FA-07 (**entfällt im Piloten**; die Küche arbeitet auf Papier vom Bon).
- Status-Auskunft, Live-ETA/GPS → V2 ([FEST 12]).
- Bestellung über Website oder von Hand → FA-05.
