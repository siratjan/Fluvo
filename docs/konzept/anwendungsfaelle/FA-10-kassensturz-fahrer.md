# FA-10: Kassensturz des Fahrers am Schichtende

- **Status:** Entwurf — zurückgestellt
- **Stand:** 2026-09-21

> **Zurückgestellt (ADR 0008, 2026-09-21):** Der Fahrer-Teil kommt nach dem ersten Piloten als eigene App. Dieser Entwurf bleibt als Grundlage erhalten, wird für den ersten Piloten aber weder abgenommen noch gebaut. Im ersten Piloten: zwei Bons bei Lieferung, Liefer-Bargeld auf Papier (FA-06).

> **ADR 0012 (2026-09-22): Wechselgeld außerhalb des Systems** — beim Wiederaufnehmen nachziehen (kein Wechselgeld-Start, Kassensturz = nur die bar kassierten Beträge des Fahrers).

> **ADR 0011 (2026-09-22): Inhaber-Bereich auch vom registrierten Handy** — beim Wiederaufnehmen nachziehen.

| | |
|---|---|
| **Ziel** | Am Schichtende sieht der Fahrer genau einen Betrag: wie viel Bargeld er zurückgeben muss. Bestellungen ohne zugeordneten Fahrer werden **dem Inhaber** sichtbar. |
| **Akteur** | Fahrer, Inhaber |
| **Auslöser** | Der Fahrer beendet seine Schicht und öffnet den Kassensturz in der Fahrer-PWA. |
| **Vorbedingungen** | Der Fahrer hatte eine **offene Schicht**, deren **Wechselgeld-Ausgabe der Inhaber am Schichtbeginn bestätigt** hat ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15/16), mit dem je Restaurant eingestellten Wechselgeld-Start (beim Piloten 50 €). Seine ausgelieferten Bestellungen sind mit Zahlart (bar / Gutschein / Gutschein + bar) erfasst (FA-08). |
| **Nachbedingungen** | Der Fahrer kennt den zurückzugebenden (Soll-)Betrag und hat ihn übergeben; er hat ihn **bestätigt oder eine Abweichung mit Kommentar gemeldet**; **der Inhaber hat die Rückgabe bestätigt** (er sieht Soll-Betrag, gemeldeten Betrag und Kommentar). Erst danach sind die abgerechneten Bestellungen auf **Abgerechnet** gesetzt, die Schicht geschlossen und der Kassensturz als Ereignis dokumentiert. Bestellungen ohne zugeordneten Fahrer sind gelistet. |

## Ist-Ablauf heute (aus der Mitschrift, Runde 5)

1. Der Fahrer muss selbst separat notieren, was er gefahren ist.
2. Es bleiben manchmal Zettel übrig, und niemand weiß, wer sie gefahren hat.
3. Das an der Station verbliebene Zettel-Exemplar ist die einzige Kontrolle.

> Wo es heute regelmäßig hakt: Fehlbeträge, verlorene Zettel, verlorenes Geld (Mitschrift Runde 5). Der Kassensturz ersetzt die separate Notiz durch die Summe der gescannten Bestellungen.

## Normalablauf

1. Der Fahrer öffnet in der PWA den Kassensturz für seine Schicht.
2. Das System zeigt genau einen Betrag: den **zurückzugebenden Betrag** = Wechselgeld-Start (je Restaurant einstellbar; beim Piloten 50 €) + Summe der **bar** kassierten Beträge. Bei einer Teilzahlung (Gutschein + bar, FA-08) zählt nur der **bar** kassierte Teil. Rein mit Gutschein bezahlte Bestellungen zählen nicht mit, weil der Fahrer dafür kein Bargeld bekommen hat; die eingesammelten Gutscheine gibt er mit ab (Mitschrift Runde 6: angezeigt wird nur, wie viel der Fahrer zurückgeben muss).
3. Der Fahrer **bestätigt den angezeigten (Soll-)Betrag** — **oder** meldet einen **abweichenden Betrag mit Kommentar** (z. B. weil noch Optionen fehlen), gibt das Geld zurück ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007). Der vom Server gerechnete Soll-Betrag wird dabei **nie überschrieben** ([FEST 8]); der gemeldete Betrag und der Kommentar werden **zusätzlich** festgehalten.
4. Der **Inhaber** sieht in seinem **Inhaber-Bereich** den **Soll-Betrag**, den vom Fahrer **gemeldeten Betrag** und den **Kommentar** und **bestätigt** den Empfang; den Bereich öffnet er mit **seinem Code** am **Hauptgerät** im Laden (**keine Vertretung**; [ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 16). Erst diese Bestätigung schließt den Kassensturz ab.
5. Das System schließt die Schicht, setzt die abgerechneten Bestellungen auf **Abgerechnet** und dokumentiert den Kassensturz als Ereignis.

## Ausnahmeabläufe

- **2a. Bestellungen ohne zugeordneten Fahrer** (zweigt von Schritt 2 ab): Das System listet Liefer-Bestellungen, die niemandem zugeordnet sind (kein Scan oder Scan gelöst, FA-08). **Vorbestellungen sind in dieser Liste als solche markiert** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15). Sie fließen nicht in den Betrag eines Fahrers ein, werden aber **dem Inhaber** sichtbar gemacht, damit sie nicht verloren gehen (der Fahrer sieht nur seinen zurückzugebenden Betrag; ob auch die Annahme diese Liste sieht → Frage B7). *(Ob nur **fälliges** in der Liste erscheint — Wunschzeit/Bestelltag = heute — bleibt `[VORSCHLAG]` Jarvis, siehe Offene Fragen.)* Endet in: dem Inhaber angezeigte Liste offener, nicht zugeordneter Bestellungen, Vorbestellungen markiert.
- **3a. Fahrer bricht ab / schließt die PWA vor der Übergabe** (zweigt von Schritt 3 ab): Die Schicht bleibt offen, der Kassensturz ist nicht bestätigt. Endet in: Schicht offen, erneut aufrufbar; nichts wird still abgeschlossen.
- **4a. Der Betrag stimmt nicht** (zweigt von Schritt 3 oder 4 ab): Der Fahrer hat in Schritt 3 einen **abweichenden Betrag mit Kommentar** gemeldet, **oder** der Inhaber zählt nach und kommt auf einen anderen Betrag. Der Inhaber sieht **Soll-Betrag, gemeldeten Betrag und Kommentar**. Der Kassensturz wird zunächst **nicht** abgeschlossen, die Schicht bleibt **offen**; nichts wird still verbucht. Der **Inhaber** kann die Schicht danach **mit Begründung beenden** (Abschluss mit Abweichung): Der Soll-Betrag wird nicht überschrieben, sondern die Abweichung mit einer festgehaltenen **Begründung** dokumentiert. Nur der Inhaber darf das, und nur mit Begründung. Endet in: entweder Schicht offen (keine Bestätigung) oder Schicht mit dokumentierter Abweichung und Begründung durch den Inhaber beendet ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 10; Schritt des Mitarbeiters [ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007).
- **4b. Internet weg** (zweigt von Schritt 4 ab): Der angezeigte Betrag beruht auf den erfassten Bestellungen; die Bestätigung des Inhabers landet in der Warteschlange und wird bei Verbindung nachgespielt ([FEST 18]). Endet in: Schicht geschlossen nach Nachspielen, sobald die Inhaber-Bestätigung nachgespielt ist.
- **4c. Inhaber nicht da** (zweigt von Schritt 4 ab): Die Bestätigung geht **nur** im **Inhaber-Bereich** am **Hauptgerät** mit dem **Code des Inhabers**; es gibt **keine Vertretung** (Mitschrift Runde 16). Ist der Inhaber nicht da, kann er weder bestätigen noch mit Begründung beenden — der Kassensturz bleibt **nicht** abgeschlossen und die Schicht **offen**; nichts wird still verbucht. Endet in: Schicht offen, bis der Inhaber im Inhaber-Bereich bestätigt. *(Ob der Inhaber auch von unterwegs bestätigen kann, ist offen — siehe Offene Fragen.)*
- **4d. Der Inhaber ist selbst der Fahrer (Inhaber kassiert selbst)** (zweigt von Schritt 4 ab): Fährt der Inhaber selbst aus, **bestätigt er seinen eigenen Kassensturz selbst**; niemand sonst bestätigt. Das wird als **Selbstbestätigung protokolliert** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15 B2). Endet in: Schicht geschlossen, Abschluss als Selbstbestätigung dokumentiert.

## Darf nicht

- Das System zeigt dem Fahrer **nichts** über den zurückzugebenden Betrag hinaus — **kein Soll/Ist-Vergleich, keine Bewertung für den Fahrer**; alles darüber hinaus ist seine Verantwortung ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 6). Der Fahrer darf aber **selbst eine Abweichung mit Kommentar melden** (Schritt 3) — das ist keine Bewertung durch das System, sondern seine eigene Meldung ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007).
- Der vom **Server** gerechnete Soll-Betrag wird durch die Meldung des Fahrers **nie überschrieben**; gemeldeter Betrag und Kommentar stehen **zusätzlich** daneben ([FEST 8]; ADR 0007).
- Eine **Abweichung ohne Kommentar** lässt sich **nicht absenden** — bei weniger **oder** mehr als angezeigt ist der Kommentar Pflicht ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 19, ADR 0007).
- **Kein** Trinkgeld wird abgebildet (Mitschrift Runde 6).
- Beträge werden **nicht** vom Client gerechnet; der Server berechnet den zurückzugebenden Betrag ([FEST 8]).
- Nicht zugeordnete Bestellungen werden **nicht** stillschweigend übergangen; sie müssen sichtbar werden (Mitschrift Runde 5).
- Der Kassensturz wird **nicht** ohne Bestätigung des Inhabers abgeschlossen; die Fahrer-Bestätigung allein schließt die Schicht nicht ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 8).
- Ein **Abschluss mit Abweichung** (Betrag stimmt nicht) geschieht **nicht** ohne festgehaltene **Begründung** und **nicht** durch den Fahrer — nur der **Inhaber** darf die Schicht mit Begründung beenden ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 10).
- Ein Fehlbetrag wird **nicht** still verbucht oder korrigiert; er bleibt als dokumentierte Abweichung mit Begründung erhalten ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 10; [FEST 6]).
- Der Kassensturz eines Fahrers zeigt **keine** Bestellungen oder Beträge eines anderen Restaurants ([FEST 4]).
- Die **Annahme** bestätigt **keinen** eigenen Abschluss und beendet **keine** Schicht mit Abweichung — das sind Geldrechte des Inhabers ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 11).
- Kassendaten und Ereignisse werden **nur angefügt**, nie geändert oder gelöscht ([FEST 6]).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Angezeigt wird nur der zurückzugebende Betrag; der Rest ist Verantwortung des Fahrers | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Zurückzugeben = Wechselgeld-Start (je Restaurant einstellbar, beim Piloten 50 €) + Summe der **bar** kassierten Beträge; Gutschein-Bestellungen zählen nicht mit, die Gutscheine werden abgegeben (Gutscheine werden **nicht** abgezogen) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 5/6 |
| Teilzahlung (Gutschein + bar): nur der **bar** kassierte Teil geht in den Kassensturz ein | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 8 |
| Fahrer gibt das Geld zurück, der **Inhaber bestätigt**; erst dessen Bestätigung schließt den Kassensturz ab | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 8 |
| Schritt des Mitarbeiters: Der Fahrer **bestätigt den angezeigten (Soll-)Betrag** oder meldet einen **abweichenden Betrag mit Kommentar**; der Inhaber sieht Soll-Betrag, gemeldeten Betrag und Kommentar. Der Soll-Betrag wird **nie überschrieben** (Server rechnet, [FEST 8]) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 17/18, ADR 0007 |
| Meldet der Fahrer **weniger oder mehr** als angezeigt, ist ein **Kommentar Pflicht**; ohne Kommentar kann er die Meldung **nicht absenden** | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 19, ADR 0007 |
| Stimmt der Betrag nicht, bleibt die Schicht **offen**; nur der **Inhaber** kann sie **mit festgehaltener Begründung** beenden (Abschluss mit Abweichung). Nichts wird still verbucht | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 10 |
| Geldrechte (Kassensturz bestätigen, Schicht mit Abweichung begründet beenden) hat **nur der Inhaber**; die Annahme hat nur Betriebsrechte. Steht der Inhaber selbst an der Annahme, meldet er sich als Inhaber an | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 11 |
| Trinkgeld wird nicht abgebildet | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Bestellungen ohne zugeordneten Fahrer werden sichtbar gemacht; **Vorbestellungen** sind in der Liste **als solche markiert** | [ENTSCHIEDEN Sirat 2026-09-18] / [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 5 / Runde 15 |
| Der Inhaber bestätigt **nur im Inhaber-Bereich** am **Hauptgerät** im Laden (eigener Code); **keine Vertretung**. Ist er nicht da, bleibt der Kassensturz offen | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 16 |
| Ist der Inhaber selbst der Fahrer, **bestätigt er seinen eigenen Abschluss selbst** — als **Selbstbestätigung protokolliert** | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 15 (B2) |
| Die Schicht setzt voraus, dass der **Inhaber die Ausgabe des Wechselgelds** am Schichtbeginn **bestätigt** hat | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 15/16 |
| Summen rechnet der Server | [FEST] | Briefing §2.8 |
| Fahrer-Bargeldabrechnung gehört buchhalterisch in den Kern, nicht ins Fahrer-Modul | [FEST] | Briefing §2.16 |
| Kassendaten unveränderlich (Append-only, GoBD-Audit-Trail) | [FEST] | Briefing §2.6, §4 |
| Fiskalische Behandlung (Signaturzeitpunkt, Beleg, Barzahlung an der Tür) | [OFFEN] Q2 | open-questions.md Q2 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall bar | 50 € Start, 3 Bestellungen bar (24,50 € + 18,00 € + 31,50 €), Inhaber bestätigt | Zurückzugeben = 50 € + 74,00 € = 124,00 €; nach Inhaber-Bestätigung Bestellungen auf Abgerechnet, Schicht geschlossen | Zusätzliche Kennzahlen/Bewertung anzeigen; Abschluss ohne Inhaber-Bestätigung | manuell am Gerät + automatisch |
| Mit Gutschein (voll) | 50 € Start, 2 bar (20,00 € + 20,00 €), 1 Gutschein voll (15,00 €) | Zurückzugeben = 50 € + 40,00 € = 90,00 €; der Gutschein wird **nicht** abgezogen | Gutschein abziehen oder als Bargeld werten | automatisch |
| Teilzahlung Gutschein + bar | 50 € Start, 1 Bestellung 30,00 € (Gutschein 20,00 € + bar 10,00 €) | Zurückzugeben = 50 € + 10,00 € = 60,00 €; nur der bar kassierte Teil zählt | Vollen Bestellwert als bar werten | automatisch |
| Grenzfall: keine Bestellung gefahren (leer) | 50 € Start, 0 Bestellungen, Inhaber bestätigt | Zurückzugeben = 50,00 € | Betrag ungleich Wechselgeld-Start | automatisch |
| Bestellungen ohne Fahrer sichtbar | 1 fertige Liefer-Bestellung nie gescannt | Bestellung erscheint in der Liste „ohne zugeordneten Fahrer" | Bestellung wird still übergangen | manuell + automatisch |
| Betrag stimmt nicht, Schicht bleibt offen | Fahrer gibt zurück, Inhaber kommt auf anderen Betrag, beendet (noch) nicht | Kassensturz nicht abgeschlossen, Schicht bleibt offen; nichts verbucht | Schicht ohne Inhaber-Bestätigung schließen; Betrag still korrigieren | manuell |
| Mitarbeiter meldet abweichenden Betrag (weniger) mit Kommentar | Soll 124,00 €; Fahrer meldet 118,00 € mit Kommentar „6 € fehlen, Kunde hatte nicht passend" | Soll-Betrag (124,00 €) bleibt unverändert; gemeldeter Betrag 118,00 € und Kommentar stehen daneben; Inhaber sieht alle drei; Schicht bleibt offen bis zur Inhaber-Entscheidung | Soll-Betrag überschreiben; Meldung ohne Kommentar akzeptieren | manuell + automatisch |
| Mitarbeiter meldet abweichenden Betrag (mehr) mit Kommentar | Soll 124,00 €; Fahrer meldet 130,00 € mit Kommentar „er muss mehr Optionen haben" | Soll-Betrag bleibt unverändert; gemeldeter Betrag 130,00 € und Kommentar stehen daneben; Inhaber sieht alle drei | Soll-Betrag überschreiben; Meldung ohne Kommentar akzeptieren | manuell + automatisch |
| Abweichender Betrag ohne Kommentar (Grenzfall) | Fahrer meldet abweichenden Betrag (weniger oder mehr), gibt keinen Kommentar an | Meldung lässt sich **nicht absenden**; ein Kommentar wird verlangt ([ENTSCHIEDEN Sirat 2026-09-21], Runde 19) | Abweichung ohne Kommentar absenden | automatisch |
| Abschluss mit Abweichung (Inhaber, mit Begründung) | Betrag weicht ab, Inhaber beendet Schicht mit festgehaltener Begründung | Schicht beendet, Abweichung + Begründung als Ereignis dokumentiert | Abweichung still verbuchen; Begründung fehlt | manuell + automatisch |
| Abschluss mit Abweichung ohne Begründung (Grenzfall) | Inhaber will Schicht mit Abweichung beenden, gibt keine Begründung an | Beenden nicht möglich, Schicht bleibt offen | Schicht mit Abweichung ohne Begründung beenden | automatisch |
| Fahrer kann Abweichung nicht beenden | Fahrer versucht, die Schicht mit Abweichung selbst zu beenden | Nicht möglich; nur der Inhaber darf das | Fahrer beendet Schicht mit Abweichung | automatisch |
| Inhaber nicht da | Fahrer gibt zurück, Inhaber weder bestätigt noch beendet (nicht im Inhaber-Bereich am Hauptgerät) | Kassensturz nicht abgeschlossen, Schicht bleibt offen | Schicht still schließen; Vertretung bestätigt | manuell |
| Inhaber ist selbst der Fahrer (Selbstbestätigung) | Inhaber fährt selbst aus, öffnet Kassensturz, bestätigt selbst | Schicht geschlossen, Abschluss als **Selbstbestätigung** protokolliert | Fremde Bestätigung verlangen; Selbstbestätigung nicht als solche protokollieren | manuell + automatisch |
| Vorbestellung in der Liste ohne Fahrer markiert | 1 Vorbestellung ohne Scan, Schichtende | Erscheint dem Inhaber in der Liste ohne Fahrer, **als Vorbestellung markiert** | Vorbestellung unmarkiert / als reguläre offene Bestellung | automatisch |
| Abbruch vor Übergabe (Grenzfall) | Kassensturz geöffnet, PWA vor der Übergabe geschlossen | Schicht bleibt offen, erneut aufrufbar | Schicht still schließen | manuell |
| Internet weg beim Bestätigen (Grenzfall offline) | Verbindung getrennt bei Schritt 4 (Inhaber-Bestätigung) | Bestätigung in Warteschlange, Schicht schließt nach Verbindung | Doppelter Abschluss; Datenverlust | manuell + automatisch |
| Zwei-Restaurant-Fall | Fahrer bei Restaurant A; Restaurant B hat eigene Schichten `+49 30 23125 401` | Kassensturz zeigt nur Bestellungen/Beträge von A | Beträge von B einrechnen oder anzeigen | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Schichtende → Abrechnung" (K2 noch offen)
- **Zustandsübergänge:** **Geliefert** → **Abgerechnet** (je abgerechneter Bestellung)
- **Technische Anwendungsfälle:** TU-? (Kassensturz berechnen, Schicht schließen, offene Bestellungen ermitteln; Zuordnung in K7)
- **Verträge / Events:** `shift.settled`, `order.settled`, für den Abschluss mit Abweichung `shift.closed_with_discrepancy` (mit Begründung) (Namen vorläufig, K6 noch offen); Kassensturz-Daten (`cash_settlements`, Briefing §5.2)
- **Testszenarien:** FA-10-T1 … FA-10-T16 (Tabelle oben)
- **Nachbar-Fälle:** FA-08 (Auslieferung/Zahlung), FA-09 (nicht angetroffen), FA-16 (Tagesabschluss Abholung/Mitnehmen)

## Offene Fragen

> **Frage an Sirat / Steuerberaterin (Q2):** Mit fluvo wird jede Bestellung erstmals elektronisch erfasst. Wie wird die Fahrer-Bargeldabrechnung fiskalisch behandelt — wann wird signiert (bei Bestellung oder bei Barzahlung an der Tür), welcher Beleg gilt, wie werden Gutscheine verbucht? → Steuerberaterin **vor** Pilotstart (open-questions.md Q2).

> **Beantwortet (Runde 19, ADR 0007):** Der **Kommentar ist Pflicht**, wenn der Fahrer einen abweichenden Betrag (weniger oder mehr) meldet; ohne Kommentar kann er nicht absenden.

> **Frage an Sirat:** Wie geht ein als Gutschein kassierter Betrag in die Rechnung ein — mit vollem Bestellwert, und braucht es die Gutschein-Nummer für die Buchhaltung? (Hängt mit der Gutschein-Frage aus FA-08 zusammen.)

> **Frage an Sirat:** Was passiert mit den gelisteten Bestellungen **ohne zugeordneten Fahrer** am Schichtende — bleiben sie offen bis zur Klärung, oder gibt es dafür einen eigenen Abschluss (Inhaber)?

> **Frage an Sirat (`_gegenlesen-K1.md` B7):** Die Liste der nicht zugeordneten Bestellungen wird **dem Inhaber** angezeigt; der Fahrer sieht nur seinen zurückzugebenden Betrag. **Sieht auch die Annahme** diese Liste, oder nur der Inhaber? (Hier nicht festgelegt.) — Ob nur **fälliges** in der Liste erscheint, bleibt `[VORSCHLAG]` Jarvis.

> **Frage an Sirat (Schichtbeginn):** Der Schichtbeginn — die vom **Inhaber bestätigte Ausgabe des Wechselgelds** — ist bisher **kein eigener Fall**. **Jarvis schlägt einen kleinen Fall „Schicht beginnen" (z. B. FA-19) vor**; ob er angelegt wird, entscheidet **Sirat**. (Wirkung: wie die in FA-08/FA-10/FA-16 vorausgesetzte offene Schicht mit bestätigtem Wechselgeld entsteht.)

> **Frage an Sirat:** Wer **fährt und zugleich am Tresen kassiert**, regelt seine **zwei Börsen selbst**; das System zeigt weiterhin nur den offenen/zurückzugebenden Betrag, der Mitarbeiter tippt **keinen Betrag ein** (Mitschrift Runde 16 B3). Offen: Werden für eine solche Person **ein gemeinsamer** oder **zwei getrennte** Beträge angezeigt (Fahrer-Kassensturz FA-10 und Tresen-Abschluss FA-16)?

> **Frage an Sirat:** Inhaber-Bereich am **Hauptgerät** im Laden (Runde 16) — kann der Inhaber auch **von unterwegs** bestätigen, oder nur am Gerät im Laden? (Nicht entschieden.)

## Nicht Teil dieses Anwendungsfalls

- Auslieferung und Kassieren an der Tür → FA-08.
- Tagesabschluss für Abholung und Mitnehmen → FA-16.
- Fiskalische Signatur, DSFinV-K-Export → K5/K6, hängt an Q2.
- Bewertung oder Soll/Ist-Abgleich des Fahrers am Gerät — bewusst nicht abgebildet (Mitschrift Runde 6). Eine Abweichung kann nur der Inhaber begründet festhalten (Runde 10), es gibt keine automatische Fehlbetrags-Verfolgung.
- Trinkgeld — bewusst nicht abgebildet.
