# FA-02: Stammkunde ruft an (Erkennung per Rufnummer)

- **Status:** Entwurf
- **Stand:** 2026-09-21

> **Abhängigkeit:** Dieser Fall steht und fällt mit dem Ergebnis des Rufumleitungs-Tests **Q1 / Risikotest AP-001**. Bei „Rufumleitung bei Nichtmelden" kann statt der Nummer des Anrufers die Nummer des Restaurants ankommen (je Netzbetreiber) — dann gibt es **keine** Stammkunden-Erkennung, und der Fall fällt sauber in FA-01 zurück (wie „keine Nummer / unterdrückte Nummer"). Solange AP-001 nicht durchgeführt ist, gilt der Normalablauf hier als **noch nicht bestätigt tragfähig**; nach dem Test ist ggf. nur der Einstieg (Schritt 1–2) anzupassen. Löschfristen für den Kundenstamm hängen an **Q10** (Anwalt).

| | |
|---|---|
| **Ziel** | Ein bereits bekannter Anrufer bestellt telefonisch, ohne Name und Adresse erneut diktieren zu müssen; die KI erkennt ihn **nur an der Rufnummer** und lässt die hinterlegte Adresse **bestätigen**, statt sie stillschweigend zu übernehmen. |
| **Akteur** | Anrufer (Stammkunde), KI-Assistent |
| **Auslöser** | Ein Anruf erreicht die KI (Overflow, [FEST 10]) und die übermittelte Rufnummer ist beim betroffenen Restaurant als Kunde hinterlegt. |
| **Vorbedingungen** | Wie FA-01 (Anrufmanager KI gebucht und aktiv, Speisekarte/Öffnungszeiten/Zonen hinterlegt, Anruf umgeleitet). Zusätzlich: Zum Anruf wird eine Rufnummer übermittelt (nicht unterdrückt, siehe Abhängigkeit), und zu dieser Rufnummer existiert **beim selben Restaurant** ein Kundeneintrag mit mindestens einer hinterlegten Adresse. |
| **Nachbedingungen** | Wie FA-01: Bei Bestätigung existiert genau eine neue Bestellung im Status **Eingegangen** mit eingefrorenen Preisen/Artikeltexten. Zusätzlich ist die Lieferadresse **eine vom Anrufer im Gespräch bestätigte** Adresse (übernommen oder neu genannt). Ohne Bestätigung existiert keine Bestellung. Der **Kundeneintrag** (Rufnummer, Name, Adresse) besteht bereits (der Kunde hat bei einer früheren Bestellung eingewilligt, „Weg B", FA-01) und wird bei dieser Bestellung aktualisiert; **Löschfrist vorerst 12 Monate nach der letzten Bestellung**, alles **vorbehaltlich Bestätigung durch den Anwalt (Q10)** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007). Ob eine im Gespräch **neu genannte** Adresse dauerhaft in den Kundeneintrag übernommen wird, bleibt offen (siehe Offene Fragen). |

## Ist-Ablauf heute (aus der Mitschrift)

> Wie ein Stammkunde heute am Telefon behandelt wird — ob der Kollege ihn an der Stimme oder der Nummer erkennt, ob Adressen im Handy stehen oder jedes Mal neu erfragt werden — wurde mit Sirat **nicht besprochen** (siehe Offene Fragen); das Ist-Bild bleibt hier offen. Der **Soll-Ablauf** (volle Adresse nennen und bestätigen lassen) ist dagegen entschieden ([ENTSCHIEDEN Sirat 2026-09-21], Runde 17/18) — vorbehaltlich Anwalt (Q10).

## Normalablauf

1. Der Anrufer wird auf die KI umgeleitet; zum Anruf wird eine Rufnummer übermittelt.
2. Die KI lässt zu dieser Rufnummer **beim betroffenen Restaurant** einen Kundeneintrag suchen und findet einen.
3. Die KI meldet sich mit dem festen ersten Satz und dem KI-Hinweis ([FEST 14]) — wie in FA-01, **ohne** dabei gespeicherte Daten vorzulesen.
4. Der Anrufer nennt, dass er liefern lassen möchte, und seine Gerichte (Speisekarten-Abgleich wie FA-01, Schritt 4).
5. Die KI nennt die **volle** hinterlegte Lieferadresse und fragt, ob dorthin geliefert werden soll ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007 — **vorbehaltlich Bestätigung durch den Anwalt, Q10**). Die Empfehlung des Hausjuristen, nur nach **Namensabgleich** und **ohne Hausnummer** vorzulesen (Schutz bei geteilter, neu vergebener oder gefälschter Nummer), hat Sirat **abgelehnt** (volle Adresse, einfacher für den Kunden); die Frage geht so an den Anwalt (Q10). Technisch ist der Umfang der Ausgabe so zu bauen, dass er später ohne Umbau eingeschränkt werden kann (ADR 0007 „Folgen").
6. Der Anrufer bestätigt die Adresse.
7. Ab hier verläuft der Fall **identisch mit FA-01 ab Schritt 6**: Adresse einer Zone zuordnen, Summe vom System berechnen lassen, Bestellung + Summe + Lieferzeit vorlesen, ausdrückliche Bestätigung, Anlage im Status **Eingegangen**, Abschluss.

## Ausnahmeabläufe

- **2a. Keine Rufnummer / unterdrückte Nummer** (zweigt von Schritt 2 ab): Es wird keine oder eine unterdrückte Nummer übermittelt. Keine Erkennung. → **Rückfall in FA-01** — dort fragt die KI wie bei jedem Erstanrufer **immer nach dem Namen** und, weil keine Rufnummer übermittelt wurde, **nach der Rufnummer** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15); Adresse wird neu erhoben. Endet in: FA-01-Normalablauf. **Dieser Zweig ist zugleich der Rückfall für den Fall, dass durch die Rufumleitung die Restaurant-Nummer ankommt (Q1 / AP-001).**
- **2b. Rufnummer übermittelt, aber unbekannt** (zweigt von Schritt 2 ab): Kein Kundeneintrag zu dieser Nummer bei diesem Restaurant. → **Rückfall in FA-01**. Endet in: FA-01-Normalablauf.
- **5a. Anrufer will an eine andere Adresse liefern lassen** (zweigt von Schritt 5 ab): Der Anrufer nennt eine abweichende Adresse. Die KI verwendet die neue Adresse (Prüfung wie FA-01, Schritt 6). Der Kundenstamm wird dadurch **nicht automatisch** geändert (siehe Offene Fragen: neue Adresse dauerhaft hinterlegen?). Endet in: Fortsetzung wie FA-01 mit der genannten Adresse.
- **5b. Anrufer bestreitet, der hinterlegte Kunde zu sein** (zweigt von Schritt 5 ab): Der Anrufer erkennt die genannte Adresse nicht (z. B. mehrere Personen an einer Nummer, neuer Besitzer der Nummer). Die KI liest **keine weiteren gespeicherten Daten** vor und behandelt den Anrufer wie einen Erstanrufer → **Rückfall in FA-01** (Adresse wird neu erhoben). Endet in: FA-01-Normalablauf.
- **4a./6a./7a. Fachliche Ausnahmen der Aufnahme** (Artikel „momentan aus", außerhalb Liefergebiet, unter Mindestbestellwert, Rabatt-/Änderungswunsch, Abbruch): identisch zu FA-01 (5a, 7a, 9a, 10b, 11a) bzw. FA-03/FA-04. Kein eigenes Verhalten in diesem Fall.

## Darf nicht

- Die KI erkennt Stammkunden **ausschließlich an der Rufnummer** — **keine** Stimm-Biometrie ([FEST 15]).
- Die KI liest einem Anrufer **keine** gespeicherten Personendaten vor, die dieser nicht selbst bestätigen kann. Genannt wird zur Bestätigung die **eine** hinterlegte Lieferadresse (volle Adresse, [ENTSCHIEDEN Sirat 2026-09-21], vorbehaltlich Anwalt Q10); frühere Bestellungen, weitere Adressen oder sonstige Daten werden **nicht** unaufgefordert ausgeplaudert (mehrere Personen je Nummer, neuer Besitzer einer Nummer). *(Reichweite über den Anwalt zu bestätigen — Q10, siehe Offene Fragen.)*
- Die KI übernimmt die hinterlegte Adresse **nicht stillschweigend**; sie wird immer bestätigt ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007).
- Der Kunde einer Rufnummer bei Restaurant A darf bei Restaurant B **nicht** sichtbar werden (Mandantentrennung).
- Wie FA-01: kein Datensatz vor Bestätigung, keine selbst gerechnete Summe, keine Rabatte/Stornos, KI-Hinweis fällt, kein Audio/Volltranskript.

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Stammkunden-Erkennung **nur** per Rufnummer, keine Stimm-Biometrie | [FEST] | Briefing §2.15 |
| Kundeneintrag ist je Tenant an die Rufnummer gebunden | [STACK] | Briefing §5.2 (`customers`, Schlüssel Rufnummer je Tenant) |
| Bei „keine Nummer / unterdrückte Nummer / Restaurant-Nummer" fällt der Fall in FA-01 zurück | [OFFEN] Q1 | Briefing §5.4; open-questions Q1 / AP-001 |
| Bei der Wiedererkennung nennt die KI die **volle** hinterlegte Adresse und fragt, ob dorthin geliefert werden soll (nicht still übernommen). Empfehlung Hausjurist „nur nach Namensabgleich, ohne Hausnummer" von Sirat **abgelehnt** | [ENTSCHIEDEN Sirat 2026-09-21] (vorbehaltlich Anwalt, Q10) | Mitschrift Runde 17/18, ADR 0007 |
| Löschfrist Kundenstamm vorerst **12 Monate** nach der letzten Bestellung | [ENTSCHIEDEN Sirat 2026-09-21] (vorbehaltlich Anwalt, Q10) | Mitschrift Runde 17/18, ADR 0007 |
| Reichweite des Vorlesens (volle Adresse) und der Löschfrist bestätigt der Anwalt | [OFFEN] Q10 | open-questions Q10 (Anwalt) |
| Latenz-Budget der KI unter 1 Sekunde (inkl. Rufnummer-Abgleich) | [STACK] | Briefing §5.4 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Stammkunde | Anruf von `+49 30 23125 201`, bei Restaurant A als Kunde mit einer Adresse hinterlegt, 2 Artikel, Adresse bestätigt, Bestellung bestätigt | Bestellung Eingegangen, Lieferadresse = bestätigte hinterlegte Adresse; die KI nennt die **volle** Adresse und fragt, ob dorthin geliefert werden soll; Summe = Server-Summe | Adresse nicht still übernommen; keine weiteren Kundendaten vorgelesen | Testanruf + automatisch |
| Andere Adresse gewünscht | Stammkunde, nennt in Schritt 5 eine abweichende Adresse | Bestellung an der neuen (geprüften) Adresse; Kundenstamm unverändert | Kein stilles Ändern des Kundenstamms | Testanruf + automatisch |
| Nummer unterdrückt (Grenzfall) | Anruf ohne übermittelte Nummer | Keine Erkennung, Rückfall FA-01 (Adresse neu erhoben) | Kein Raten eines Kunden | Testanruf + automatisch |
| Restaurant-Nummer kommt an (Abhängigkeit Q1/AP-001) | Umleitung liefert die Nummer des Restaurants statt des Anrufers | Keine Erkennung, Rückfall FA-01 wie „keine Nummer" | Kein fremder Kunde wird angezeigt | Testanruf (echte Leitung, AP-001) |
| Nummer bekannt, aber falsche Person | Anruf von `+49 30 23125 201`, Anrufer erkennt die genannte Adresse nicht | KI liest keine weiteren Daten vor, behandelt als Erstanrufer (FA-01) | Keine gespeicherten Daten preisgeben | Testanruf |
| Nummer übermittelt, unbekannt | Anruf von `+49 30 23125 299`, kein Kundeneintrag | Rückfall FA-01 | — | automatisch |
| Zwei-Restaurant-Fall | `+49 30 23125 201` ist bei Restaurant A Stammkunde, bei Restaurant B unbekannt; Anruf geht an B | Bei B keine Erkennung (Rückfall FA-01); A-Kunde für B unsichtbar | Kein Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „KI-Gespräch → Bestellung anlegen", Variante mit Rufnummer-Abgleich (K2 noch offen)
- **Zustandsübergänge:** (kein Vorzustand) → **Eingegangen** (identisch FA-01); der Kundeneintrag wird — wie bei FA-01 — bei der Bestellung gespeichert/aktualisiert (Rechtsgrundlage/Löschfrist offen → Q10)
- **Technische Anwendungsfälle:** TU-? (Function Calls `get_customer_by_phone`, danach `check_menu_item`, `validate_address`, `create_order` — Zuordnung in K7; `get_customer_by_phone` muss „keine Nummer / unbekannt" als reguläres Ergebnis liefern, siehe Q1)
- **Verträge / Events:** `order.created`; Kundeneintrag speichern/aktualisieren (vorläufig `customer.upserted`, wie FA-01); Zustimmung als Log-Eintrag (K6 noch offen)
- **Testszenarien:** FA-02-T1 … FA-02-T7 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (Erstanrufer / Rückfall), FA-03 (Eskalation), FA-04 (Abbruch), FA-17 (Zonen/Lieferzeit)

## Offene Fragen

> **Frage an Sirat:** Soll die KI dem erkannten Stammkunden aktiv „das Übliche" bzw. die letzte Bestellung anbieten? Das wurde **nicht** besprochen — bitte nicht als selbstverständlich annehmen. (Wirkung: Gesprächsführung, und ob frühere Bestelldaten überhaupt in die KI-Kette gegeben werden — Datensparsamkeit.)

> **Frage an Sirat:** Darf eine Rufnummer **mehrere** hinterlegte Adressen haben, und wenn ja, wie wählt der Anrufer? Heute wurde nur „eine hinterlegte Adresse" angenommen.

> **Frage an Sirat:** Wenn ein Stammkunde eine **neue** Adresse nennt (5a) — soll die dauerhaft im Kundenstamm hinterlegt/aktualisiert werden, oder gilt sie nur für diese eine Bestellung?

> **Frage an Sirat:** Wie läuft die Stammkunden-Behandlung heute am Telefon (Ist-Ablauf)? Nicht besprochen — nötig, um Soll gegen Ist zu prüfen.

> **Frage an Anwalt (über Sirat, Q10):** Sirat hat entschieden, die **volle** hinterlegte Adresse vorzulesen (gegen die Empfehlung des Hausjuristen, nur nach Namensabgleich und ohne Hausnummer) und eine Löschfrist von **12 Monaten** — beides **vorbehaltlich Bestätigung durch den Anwalt**. Trägt das bei geteilter, neu vergebener oder gefälschter Rufnummer? Reichweite des Vorlesens gespeicherter Daten und Löschfristen für Kundenstamm und Lieferadresse. (open-questions.md Q10.)

## Nicht Teil dieses Anwendungsfalls

- Aufnahme eines Erstanrufers, Abläufe ohne Erkennung → FA-01.
- Eskalation, Rabatt-, Änderungs- und Stornowunsch → FA-03.
- Abbruch vor Bestätigung → FA-04.
- Anlegen/Pflegen des Kundenstamms als eigene **Verwaltungsfunktion** (Kundendaten bearbeiten, löschen, mehrere Adressen pflegen) sowie kundengebundene Gutscheine → spätere Fälle, nicht im Piloten-Schnitt (Mitschrift Runde 10). Der **automatische Kundeneintrag bei der Bestellung** ist dagegen im Piloten (FA-01/FA-05, Mitschrift Runde 15).
- Technischer Rufnummern-Abgleich, Umgang von `get_customer_by_phone` mit „keine Nummer" → TU in K7.
