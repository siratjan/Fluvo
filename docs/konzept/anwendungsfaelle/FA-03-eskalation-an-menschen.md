# FA-03: KI übergibt an einen Menschen (Eskalation)

- **Status:** Entwurf
- **Stand:** 2026-09-22

> **Abhängigkeit:** Der **Normalablauf dieses Falls ist offen** und hängt an **Q4 / Risikotest AP-001**. Die KI ist rangegangen, **weil niemand abgenommen hat** ([FEST 10], Overflow) — eine Weiterleitung zurück ins Restaurant läuft deshalb oft ins Leere. Solange Q4 nicht mit dem Piloten geklärt ist, sind unten **zwei Varianten** beschrieben — (A) Rückruf-Ticket und (B) direkte Weiterleitung —, beide mit benanntem Ende. Nach der Klärung ist zu wählen bzw. zu kombinieren; die Ausnahmeabläufe und das „Darf nicht" bleiben davon voraussichtlich unberührt. Zusätzlich hängt der Einstieg an **Q1 / AP-001** (Rufnummer im Rückruf-Ticket, siehe FA-02). Löschfristen für ein Rückruf-Ticket: **Q10** (Anwalt) und K5.

| | |
|---|---|
| **Ziel** | Wenn die KI etwas nicht selbst erledigen darf oder kann, kommt das Anliegen des Anrufers zu einem Menschen — **ohne** dass es lautlos verschwindet. |
| **Akteur** | Anrufer, KI-Assistent, Annahme/Inhaber (Mensch im oder am Restaurant) |
| **Auslöser** | Im laufenden Gespräch tritt ein Eskalationsgrund auf (siehe unten) — auch dann, wenn der Anrufer bei der Bestellart-Frage der KI **„Sonstiges"** wählt (FA-01, Ausnahme 3d) und sein Anliegen die KI nicht selbst erledigen darf. |
| **Vorbedingungen** | Wie FA-01 (KI aktiv, innerhalb der Öffnungszeit, Anruf umgeleitet). Bei Änderung/Storno: Es existiert bereits eine **angelegte** Bestellung, auf die sich der Anrufer bezieht. |
| **Nachbedingungen** | Das Anliegen ist an einen Menschen übergeben und **sichtbar hinterlegt**: entweder als offenes Rückruf-Ticket (Variante A) oder durch eine tatsächlich zustande gekommene direkte Weiterleitung (Variante B). In **keinem** Fall entsteht durch die Eskalation selbst eine neue Bestellung, und die KI hat **nichts** zugesagt, was Geld kostet. Eine laufende, noch nicht bestätigte Bestellung wird durch die Eskalation nicht angelegt (Rückfall siehe FA-04). |

## Ist-Ablauf heute (aus der Mitschrift, Runde 6)

Änderung und Storno nach dem Auflegen müssen heute **immer erst mit der Küche abgeklärt** werden („ist die Pizza schon im Ofen?"). Der Kollege am Telefon entscheidet das nie allein — er gibt das Gespräch an jemanden weiter, der da ist ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 6). Genau dieses „an einen Menschen weitergeben" bildet fluvo hier ab. Das eigentliche Ändern/Stornieren der Bestellung selbst ist **nicht** Teil dieses Falls (→ FA-11).

## Eskalationsgründe (Auslöser im Detail)

1. **Rabattwunsch** — die KI sagt nichts zu, was Geld kostet ([FEST 11]).
2. **Änderung oder Storno einer bereits aufgegebenen (angelegten) Bestellung** — muss mit der Küche abgeklärt werden; die KI entscheidet das nie ([FEST 11]; Mitschrift Runde 6).
3. **Beschwerde.**
4. **Die KI versteht den Anrufer wiederholt nicht** (mehrfaches Nicht-Verstehen im selben Gespräch).
5. **Der Anrufer verlangt ausdrücklich einen Menschen.**
6. **Frage zu einer laufenden Bestellung** (z. B. „Wo bleibt mein Essen?") — die KI gibt die Auskunft **nicht selbst** (Status-Auskunft/Live-ETA ist V2, [FEST 12]), sondern übergibt an einen Mitarbeiter ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15).
7. **Ausnahme vom Mindestbestellwert** — will ein Anrufer unter dem Mindestbestellwert der Zone beliefert werden (FA-01, Ausnahme 9a), sagt die KI das **nicht selbst** zu, sondern verbindet an die Annahme; **die Annahme entscheidet** über die Ausnahme ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B14).
8. **Ausnahme vom Liefergebiet** — will ein Anrufer an eine Adresse **außerhalb des Liefergebiets** beliefert werden (FA-01, Ausnahme 7a), sagt die KI das **nicht selbst** zu, sondern verbindet an die Annahme; **die Annahme entscheidet** über die Ausnahme (Muster wie beim Mindestbestellwert) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 33).

> **Nachtrag Runde 51 (Hinweis — FA-03 ist noch nicht mit Sirat durchgegangen):** Aus dem Kreuzverhör von FA-01 kommen **vier weitere Eskalationsgründe** hinzu, die beim Durchgehen von FA-03 einzuarbeiten sind: **9. Adresse nicht auflösbar** (Geocoder findet die Adresse nach zweitem Anlauf nicht, kein bekannter Lieferort — FA-01 7b / FA-24); **10. Großbestellung über der Schwelle** (Sofort-Bestellung über der Artikelanzahl-Schwelle; niemand erreichbar → „Rückruf nötig", kein Bon bis ein Mensch bestätigt — FA-01 9b); **11. Technischer Fehler** (Anlegen scheitert nach der Bestätigung; ehrliche Absage, **kein Rückruf-Versprechen** — FA-01 13a); **12. Sprache** (Anrufer spricht weder Deutsch noch Englisch, nach zweitem Missverständnis — FA-01 2b) ([ENTSCHIEDEN Sirat 2026-09-23], Mitschrift Runde 51).

## Normalablauf (Variante A — Rückruf-Ticket) `[VORSCHLAG]`

> Empfehlung für den MVP laut open-questions Q4 („im MVP vermutlich Rückruf-Ticket"). Mit Sirat/Piloten zu bestätigen.

1. Im Gespräch tritt ein Eskalationsgrund auf (einer der acht oben).
2. Die KI teilt dem Anrufer mit, dass sie das nicht selbst erledigen kann und ein Mensch sich kümmert.
3. Die KI nimmt kurz das **Anliegen** auf (worum es geht) und — sofern übermittelt — die **Rufnummer** für den Rückruf.
4. Das System legt ein **offenes Rückruf-Ticket** in der Annahme-Oberfläche an (Rufnummer, Anliegen, Zeitpunkt, ggf. Bezug zu einer bestehenden Bestellung).
5. Die KI nennt dem Anrufer, dass zurückgerufen wird, und beendet das Gespräch.
6. Ein Mensch an der Annahme sieht das offene Ticket, ruft zurück und bearbeitet das Anliegen (Rabatt/Änderung/Storno/Beschwerde) — der weitere fachliche Weg läuft über FA-11 (Änderung), Storno (Q3) bzw. persönliche Klärung.
7. Der Mensch markiert das Ticket als **erledigt**. Endet in: Ticket erledigt.

## Normalablauf (Variante B — direkte Weiterleitung)

1.–2. wie Variante A.
3. Die KI verbindet das Gespräch **direkt** an ein je Restaurant hinterlegtes Ziel (Telefon im Laden / zweite Nummer).
4. **Nimmt jemand ab:** Der Mensch übernimmt das Gespräch. Endet in: Gespräch beim Menschen, keine offene Aufgabe im System.
5. **Nimmt niemand ab** (der Regelfall laut Q4, weil die KI ja gerade wegen Nichtmeldens rangegangen ist): Die Weiterleitung schlägt fehl → es wird **automatisch ein offenes Rückruf-Ticket wie in Variante A** angelegt, damit das Anliegen **nicht verloren geht**. Endet in: offenes Rückruf-Ticket.

## Ausnahmeabläufe

- **A3a. Keine Rufnummer übermittelt** (zweigt von Variante A, Schritt 3 ab): Es gibt keine Nummer für den Rückruf. Die KI bittet den Anrufer, die Rufnummer zu nennen, oder später noch einmal anzurufen. Das Ticket wird — wenn eine Nummer genannt wird — mit dieser angelegt; sonst als Ticket **ohne Rückrufnummer, nur mit Anliegen und Uhrzeit** (Rückruf nicht möglich, aber sichtbar). Endet in: Ticket (mit oder ohne Nummer). *(Abhängig von Q1/AP-001.)*
- **B5a. Weiterleitung technisch nicht möglich** (zweigt von Variante B, Schritt 5 ab): behandelt wie „niemand nimmt ab" → Rückruf-Ticket. Endet in: offenes Rückruf-Ticket.
- **Xa. Eskalation aus einem laufenden, noch nicht bestätigten Bestellgespräch** (kann bei jedem Grund auftreten): Die begonnene, noch **nicht** bestätigte Bestellung wird **nicht** angelegt (→ FA-04). Nur das Anliegen wird eskaliert. Endet in: Ticket bzw. Weiterleitung; keine Bestellung.
- **Xb. Niemand bearbeitet das offene Ticket** (Grenzfall): Das Ticket bleibt **sichtbar offen** und altert nicht lautlos weg. → Die genaue Erinnerungs-/Benachrichtigungslogik ist Teil von Q4 und offen (siehe Offene Fragen). Endet in: weiterhin offenes, sichtbares Ticket.

## Darf nicht

- Ein Eskalationswunsch darf **nicht lautlos verschwinden**: Wird nicht direkt übernommen (niemand nimmt ab), muss ein **sichtbares** offenes Rückruf-Ticket entstehen.
- Die KI sagt **nichts** zu, was Geld kostet — kein Rabatt, kein Storno, keine Änderungszusage ([FEST 11]).
- Die KI ändert oder storniert **selbst keine** bestehende Bestellung; das tut nur ein Mensch (FA-11 / Storno-Pfad Q3).
- Die Eskalation legt **keine** neue Bestellung an.
- Das Rückruf-Ticket enthält **nur** Rufnummer, Anliegen und Zeitpunkt (datensparsam), ist der Klasse (a) zugeordnet und **löschbar** (K5/Q10) — **kein** Audio, **kein** Volltranskript ([FEST 13]).
- Ein Rückruf-Ticket eines Restaurants darf bei einem anderen Restaurant **nicht** sichtbar sein (Mandantentrennung).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| KI sagt nichts zu, was Geld kostet (Rabatt, Storno); Änderung/Storno geht an einen Menschen | [FEST] | Briefing §2.11; Mitschrift Runde 6 |
| Ziel: ≈ 85 % der Anrufe erledigt die KI selbst, ≈ 15 % gehen an Menschen | [FEST] | Briefing §2.10 |
| Weiterleitung ins Restaurant läuft oft ins Leere (KI ging ran, weil niemand abnahm) → Auffangweg nötig | [OFFEN] Q4 | open-questions Q4 |
| Normalweg im MVP „vermutlich Rückruf-Ticket" | `[VORSCHLAG]` / [OFFEN] Q4 | open-questions Q4 |
| Ziel der direkten Weiterleitung je Tenant konfigurierbar (`escalate_to_human`) | [OFFEN] | Briefing §8 (offene Punkte) |
| Rückruf-Ticket enthält Rufnummer nur, wenn übermittelt | [OFFEN] Q1 | open-questions Q1 / AP-001 |
| Rückruf-Ticket ist Klasse (a), löschbar; Löschfrist | [OFFEN] Q10 | Briefing §5.2/§6; open-questions Q10 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Rabattwunsch (Variante A) | Anrufer `+49 30 23125 301` verlangt Rabatt | Offenes Rückruf-Ticket mit Nummer + Anliegen; keine Bestellung, keine Zusage | Keine Rabattzusage; nichts verschwindet | Testanruf + automatisch |
| Änderung einer bestehenden Bestellung | Anrufer bezieht sich auf angelegte Bestellung, will ändern | Eskalation; bestehende Bestellung von der KI unverändert; Ticket offen | KI ändert/storniert nicht selbst | Testanruf + automatisch |
| Beschwerde | Anrufer beschwert sich | Ticket offen mit Anliegen „Beschwerde" | — | Testanruf |
| KI versteht wiederholt nicht | Mehrfaches Nicht-Verstehen im selben Gespräch | Eskalation ausgelöst, Ticket/Weiterleitung | Kein endloses Schleifen | Testanruf |
| Anrufer verlangt Menschen | Anrufer sagt „ich will einen Menschen" | Sofort Eskalation | Kein Hinhalten | Testanruf |
| Frage zu laufender Bestellung („Wo bleibt mein Essen?") | Anrufer fragt nach dem Stand seiner bestehenden Bestellung | Eskalation (Grund 6), Übergabe an einen Mitarbeiter; KI gibt **keine** Status-Auskunft selbst | KI beantwortet den Bestellstatus selbst | Testanruf + automatisch |
| Ausnahme Mindestbestellwert (Grund 7, B14) | Anrufer will unter dem Mindestbestellwert beliefert werden (aus FA-01, 9a) | Eskalation (Grund 7), Übergabe an die Annahme; die Annahme entscheidet; KI sagt die Ausnahme **nicht** selbst zu | KI gewährt die Ausnahme selbst | Testanruf + automatisch |
| Ausnahme Liefergebiet (Grund 8) | Anrufer will an eine Adresse außerhalb des Liefergebiets beliefert werden (aus FA-01, 7a) | Eskalation (Grund 8), Übergabe an die Annahme; die Annahme entscheidet; KI sagt die Ausnahme **nicht** selbst zu | KI gewährt die Ausnahme selbst | Testanruf + automatisch |
| „Sonstiges" als Einstieg (FA-01 3d) | Anrufer wählt bei der Bestellart-Frage „Sonstiges" mit einem Anliegen, das die KI nicht selbst erledigen darf | Eskalation ausgelöst (Ticket/Weiterleitung); keine Bestellung aus diesem Zweig | Anliegen verschwindet lautlos; KI sagt etwas Geldwirksames zu | Testanruf + automatisch |
| Direkte Weiterleitung, niemand nimmt ab (Grenzfall Q4) | Variante B, Ziel meldet sich nicht | Fällt auf offenes Rückruf-Ticket zurück | Anliegen geht nicht verloren | Testanruf (AP-001) |
| Eskalation aus laufender, unbestätigter Bestellung | Anrufer eskaliert vor der Bestätigung | Keine Bestellung angelegt (FA-04); nur Anliegen eskaliert | Kein Datensatz in den Bestellungen | Testanruf + automatisch |
| Keine Rufnummer übermittelt | Eskalation, Nummer unterdrückt | Ticket ohne Rückrufnummer (Anliegen + Uhrzeit) sichtbar, oder Nummer erfragt | Kein stilles Verwerfen | Testanruf |
| Zwei-Restaurant-Fall | Rückruf-Ticket bei Restaurant A angelegt (`+49 30 23125 301`) | Ticket nur bei A sichtbar, nicht bei B | Kein Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Eskalation an einen Menschen" (K2 noch offen); zweigt aus P? „KI-Gespräch"
- **Zustandsübergänge:** keine Änderung am Bestellstatus durch die Eskalation selbst; bei laufender unbestätigter Bestellung: kein Übergang (keine Anlage). Das Rückruf-Ticket ist ein eigenes Objekt außerhalb der Bestell-Zustandsmaschine (Modellierung in K2/K4 offen).
- **Technische Anwendungsfälle:** TU-? (Function Call `escalate_to_human`; Weiterleitungs-/Ticket-Logik — Zuordnung in K7; Ziel je Tenant konfigurierbar, Briefing §8)
- **Verträge / Events:** Eskalations-/Ticket-Event (K6 noch offen); **kein** `order.created`
- **Testszenarien:** FA-03-T1 … FA-03-T13 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (Aufnahme; „Sonstiges" 3d, Rabatt/Änderung 10b → Grund 1/2, Ausnahme Liefergebiet 7a → Grund 8, Ausnahme Mindestbestellwert 9a → Grund 7), FA-04 (Abbruch der laufenden Bestellung), FA-05 (Ausnahme Mindestbestellwert und Ausnahme Liefergebiet von Hand), FA-11 (Änderung durch einen Menschen), FA-17 (Liefergebiet/Zonen), Storno-Pfad (Q3)

## Offene Fragen

> **Frage an Sirat (mit dem Piloten klären — Q4, höchste Wirkung):** Welcher Weg gilt im MVP — Rückruf-Ticket in der Annahme (Variante A), direkte Weiterleitung an ein Telefon/eine zweite Nummer (Variante B), oder B mit A als Auffang? Die KI ging ran, **weil niemand abnahm** — eine Weiterleitung ins selbe Restaurant läuft oft ins Leere. Ohne diese Entscheidung ist der Normalablauf nicht endgültig.

> **Frage an Sirat:** Wer soll das offene Rückruf-Ticket sehen und bearbeiten — nur die Annahme, auch der Inhaber, und soll er zusätzlich benachrichtigt werden (SMS/Push)? Und: Ab wann gilt ein unbearbeitetes Ticket als „zu lange offen"? (Damit nichts lautlos altert.)

> **Frage an Sirat:** **Allergen-Auskunft am Telefon** — darf die KI aus der hinterlegten Speisekarte antworten (Allergene sind je Artikel gepflegt), oder gibt sie eine solche Frage wie Grund 6 an einen Menschen ab? Das wurde in Runde 15 **nicht getrennt beantwortet** und ist **nicht entschieden**. (Wirkung: Haftung, Gesprächsführung.)

> **Frage an Anwalt (über Sirat, Q10):** Löschfrist für Rückruf-Tickets (Rufnummer + Anliegen).

## Nicht Teil dieses Anwendungsfalls

- Das eigentliche **Ändern** einer bestehenden Bestellung durch einen Menschen → FA-11.
- Der **Storno**-Pfad selbst (fiskalische Behandlung, Modellierung; Storno **nach erfasster Zahlung** → Q3). **Wer** stornieren darf, ist entschieden: die **Annahme**, ohne Vorab-Bestätigung des Inhabers ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007 — FA-11); ein Mensch an der Annahme bearbeitet das eskalierte Anliegen.
- Aufnahme einer neuen Bestellung → FA-01/FA-02.
- Abbruch der laufenden Bestellung → FA-04.
- Technische Ausgestaltung von Weiterleitung, Ticket und Benachrichtigung → TU in K7 / K8 (Ausfälle) / K10 (Oberfläche).
