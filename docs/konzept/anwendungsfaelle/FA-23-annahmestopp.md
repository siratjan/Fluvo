# FA-23: Annahmestopp — „wir nehmen (nichts / keine Lieferung) mehr an"

- **Status:** mit Sirat durchgegangen (Runde 42, 2026-09-22)
- **Stand:** 2026-09-22
- **Hinweis:** Aus Mitschrift Runde 21/23. **Schnitt von Sirat bestätigt** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 30): FA-23 gehört in den Schnitt (jetzt FA-01 … FA-06, FA-08 … FA-23; FA-07 entfällt, FA-19 „Schicht beginnen" neu). Beim Setzen sind die **zwei Stufen anzugeben** („gar nichts mehr" oder „Lieferung gestoppt, Abholung noch in Ordnung"); **setzen und aufheben** dürfen **Annahme und Inhaber**.

| | |
|---|---|
| **Ziel** | Ist im Laden so viel los, dass keine (weiteren) Bestellungen mehr angenommen werden können, schaltet das Restaurant einen **Annahmestopp** ein. Die KI **geht weiter ran**, sagt freundlich ab und bietet — wenn zur Wunschzeit Betrieb ist — eine **Vorbestellung** an; niemand legt in der Zwischenzeit eine neue reguläre Bestellung an. |
| **Akteur** | Annahme, Inhaber (Betriebsrecht: beide schalten). **Betroffen:** Anrufer, KI-Assistent. |
| **Auslöser** | Ein Mitarbeiter der Annahme oder der Inhaber legt von Hand einen der beiden Stopp-Schalter um, weil der Betrieb die Menge nicht mehr schafft. |
| **Vorbedingungen** | Das Restaurant ist im Betrieb (innerhalb der Öffnungszeit, FA-18). Der Handelnde ist als Annahme oder Inhaber angemeldet. Der Annahmestopp ist eine **Betriebseinstellung** des Restaurants, unabhängig vom KI-An/Aus-Schalter (FA-13). |
| **Nachbedingungen** | Für das Restaurant ist einer der Stopp-Zustände gesetzt und als **Ereignis** dokumentiert (wer, wann, welcher Schalter): **„keine Lieferung mehr"** (Lieferung gesperrt, **Abholung läuft weiter**) oder **„gar nichts mehr"** (keine Annahme). Der Stopp wirkt **nur auf neue Bestellungen**; **bereits angenommene (Vor-)Bestellungen werden trotzdem gemacht** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29). Die KI verhält sich entsprechend (siehe Normalablauf). Der Stopp **endet von Hand** oder **spätestens beim Ladenschluss des Tages von selbst** (Ladenschluss aus den Öffnungszeiten, FA-18; [ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 42). |

## Ist-Ablauf heute (aus der Mitschrift)

> Heute beim Piloten geschieht in Stoßzeiten eines von beidem (Sirat, Mitschrift Runde 42): Es wird **nicht rangegangen**, oder es wird rangegangen und gesagt: „**Wir nehmen keine Bestellungen mehr entgegen.**" Dazu Sirats Satz aus Runde 21: „Manchmal ist so viel los, dass man sagt: ‚Wir nehmen keine Bestellungen mehr an.' Das wird von Hand eingeschaltet — ‚dann ist es was anderes.'"

## Normalablauf (Annahmestopp einschalten)

1. Die Annahme oder der Inhaber öffnet die Betriebseinstellungen und wählt einen der beiden Stopp-Schalter ([ENTSCHIEDEN Sirat 2026-09-21], Betriebsrecht Annahme und Inhaber, Mitschrift Runde 23):
   - **„keine Lieferung mehr"** — es wird **keine Lieferung** mehr angenommen, **Abholung** läuft weiter.
   - **„gar nichts mehr"** — es wird **nichts** mehr angenommen (weder Lieferung noch Abholung).
2. Das System setzt den Stopp-Zustand für das Restaurant und hält die Umschaltung als **Ereignis** fest (wer, wann, welcher Schalter; nichts verschwindet lautlos, [FEST 6], Briefing §2.6). Der Stopp wirkt **nur auf neue Bestellungen** — **bereits angenommene (Vor-)Bestellungen bleiben bestehen und werden gemacht** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29).
3. Ab jetzt gilt für die **KI** (FA-01): Sie **geht weiter ran** und sagt **freundlich ab**, dass im Moment keine (bzw. keine Liefer-)Bestellungen angenommen werden. Den **Wortlaut** legt K4 fest (hier nicht ausformuliert).
4. Die KI bietet — **nur wenn zur Wunschzeit Betrieb ist** (Öffnungszeiten, Ruhetage, Urlaub, Zeitfenster; FA-18) — eine **Vorbestellung** für später/morgen an ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 23). Ist zur Wunschzeit kein Betrieb, wird keine Vorbestellung zugesagt (wie FA-01, Ausnahme 3b-i).
5. Bei **„keine Lieferung mehr"** nimmt die KI eine **Abholung** weiterhin regulär an (FA-01, Ausnahme Abholung); nur die Lieferung ist gesperrt.

## Normalablauf (Annahmestopp beenden)

1. Die Annahme oder der Inhaber legt den Schalter zurück (von Hand). ODER: Der Stopp endet **spätestens beim Ladenschluss des Tages von selbst** — dem Ladenschluss aus den gepflegten Öffnungszeiten (FA-18), nicht um Mitternacht ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 42).
2. Das System hebt den Stopp-Zustand auf und hält auch das als **Ereignis** fest.
3. Ab jetzt nimmt die KI/Annahme wieder regulär an (FA-01/FA-05).

## Ausnahmeabläufe

- **1a. „keine Lieferung mehr" — Anrufer will liefern lassen** (zweigt von Schritt 1 ab): Die KI sagt ab, dass Lieferung im Moment nicht geht, und bietet **Abholung** oder eine **Vorbestellung** (bei Betrieb zur Wunschzeit) an. Endet in: Abholung angelegt, Vorbestellung angelegt oder Gespräch ohne Bestellung.
- **1b. „gar nichts mehr" — Anrufer will bestellen** (zweigt von Schritt 1 ab): Die KI sagt ab und bietet — **nur bei Betrieb zur Wunschzeit** — eine **Vorbestellung** an. Endet in: Vorbestellung angelegt oder Gespräch ohne Bestellung.
- **3a. KI ist ausgeschaltet (FA-13) und Annahmestopp aktiv** (zweigt von Schritt 3 ab): Ist die KI **aus**, klingelt das Telefon durch wie heute (FA-13) und das Personal nimmt selbst an — **dann** greift der Annahmestopp als **organisatorische** Regel (das Personal nimmt eben nichts mehr an). Der Annahmestopp und „KI aus" sind **zwei verschiedene** Einstellungen (siehe „Darf nicht"). Endet in: kein KI-Eingriff; Stopp wirkt über das Personal.
- **Bstopp. Bestellung von Hand während „gar nichts mehr"** (Grenzfall): Die Annahme darf trotz „gar nichts mehr" von Hand eine Bestellung anlegen (z. B. Stammgast am Tresen) — das System zeigt eine **Warnung** und bietet **„trotzdem anlegen"**, **keine harte Sperre** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39). Übersteuert die Annahme, wird das protokolliert (*Protokollteil Lesart Jarvis*; Ablauf in FA-05, Ausnahme 1d). Endet in: keine Bestellung (Warnung abgebrochen) oder Bestellung **Eingegangen** mit protokolliertem Übersteuern.

## Darf nicht

- Der Annahmestopp ist **nicht** dasselbe wie „KI aus" (FA-13): **„KI aus"** = das Personal nimmt selbst an (Telefon klingelt durch); **Annahmestopp** = **niemand** nimmt (die betroffene Art) an, obwohl die KI rangeht ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 21/23). Die zwei Schalter dürfen **nicht** vermischt werden. Davon zu unterscheiden ist eine **dritte, automatische** Variante, in der die KI ebenfalls absagt: die **KI-Pause bei nicht erreichbarem Annahme-Gerät** (FA-14, Mitschrift Runde 45) — das ist **kein Schalter**, sondern eine automatische Reaktion des Servers auf eine Störung, und sie **endet von selbst**, sobald das Gerät wieder online ist. Als **vierte** Variante kommt die **Betreiber-Sperre** (FA-21) hinzu — sie stoppt neue Bestellungen ebenfalls, ist aber **vom Restaurant nicht schaltbar**, sondern allein Sache des Betreibers ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).
- Bei **„keine Lieferung mehr"** wird die **Abholung nicht** mitgesperrt — sie läuft weiter (Mitschrift Runde 23).
- Die KI **legt während des Stopps keine** reguläre (bzw. Liefer-)Bestellung an; sie sagt ab und bietet nur eine Vorbestellung an — und diese **nur bei Betrieb zur Wunschzeit** (FA-18).
- Die KI bietet **keine** Vorbestellung für eine Zeit **ohne Betrieb** an (FA-18; wie FA-01).
- Die Umschaltung (ein und aus) verschwindet **nicht** lautlos; sie ist als **Ereignis** dokumentiert ([FEST 6], Briefing §2.6).
- Der Stopp wirkt **nicht** auf **bereits angenommene** (Vor-)Bestellungen — die werden trotzdem gemacht; er betrifft **nur neue** Bestellungen ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29).
- Der Stopp eines Restaurants wirkt **nicht** auf ein anderes Restaurant ([FEST 4]).
- Der Stopp bleibt **nicht** unbemerkt über den Tag hinaus hängen: Er endet von Hand oder **spätestens beim Ladenschluss des Tages von selbst** (Ladenschluss aus den Öffnungszeiten, FA-18; Mitschrift Runde 42).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Annahmestopp existiert, wird **von Hand** eingeschaltet („dann ist es was anderes") | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 21 |
| **Zwei Stufen**, die beim Setzen **anzugeben** sind: „gar nichts mehr" **oder** „Lieferung gestoppt, Abholung noch in Ordnung" (Abholung läuft weiter) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 23, bestätigt Runde 30 |
| Der Stopp wirkt **nur auf neue Bestellungen**; **bereits angenommene (Vor-)Bestellungen werden trotzdem gemacht** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 |
| Die KI **geht ran**, sagt freundlich ab und bietet eine **Vorbestellung** an — **nur** wenn zur Wunschzeit Betrieb ist (FA-18) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 23 |
| Bei „keine Lieferung mehr" nimmt die KI **Abholung** weiter an | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 23 |
| **Setzen und aufheben** ist ein **Betriebsrecht** — Annahme und Inhaber | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 23, bestätigt Runde 30 (Nachtrag) |
| Der Stopp endet **von Hand**, spätestens **beim Ladenschluss des Tages von selbst** (Ladenschluss aus den Öffnungszeiten, FA-18; nicht um Mitternacht) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 42 (präzisiert Runde 23) |
| Umschaltung (ein/aus) ist als **Ereignis** dokumentiert | [FEST 6] | Briefing §2.6 |
| Abgrenzung zu „KI aus" (FA-13): KI aus = Personal nimmt selbst an; Annahmestopp = niemand nimmt an | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 21/23 |
| Stopp gilt je Restaurant; kein Übergriff auf fremden Tenant | [FEST 4] | Briefing §2.4 |
| **Wortlaut** der Absage → K4 | [STACK] | K4 (Gesprächsdesign) |
| Die Annahme darf während „gar nichts mehr" von Hand anlegen — **Warnung, übersteuerbar** („trotzdem anlegen"), keine harte Sperre; Übersteuern protokolliert (FA-05, Ausnahme 1d) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 39 |
| „Tagesende" = **Ladenschluss des Tages** aus den Öffnungszeiten (FA-18), nicht Mitternacht | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 42 |
| Der **Betreiber sieht** den aktiven Annahmestopp in den **Gesundheitswerten** (FA-22): welcher Schalter, seit wann — **ohne** Einsicht in Bestellungen | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 42 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| FA-23-T1 · Standardfall „gar nichts mehr" | Annahme schaltet „gar nichts mehr" ein; Anruf zur Betriebszeit | KI geht ran, sagt freundlich ab, bietet Vorbestellung an (bei Betrieb zur Wunschzeit); keine reguläre Bestellung angelegt; Umschaltung als Ereignis dokumentiert | Reguläre Bestellung anlegen; Umschaltung nicht dokumentiert | manuell am Gerät + Testanruf |
| FA-23-T2 · „keine Lieferung mehr" — Abholung läuft weiter | Schalter „keine Lieferung mehr"; Anrufer will abholen | KI nimmt die **Abholung** regulär an; nur Lieferung ist gesperrt | Abholung mitsperren | Testanruf + automatisch |
| FA-23-T3 · „keine Lieferung mehr" — Anrufer will liefern lassen | Schalter „keine Lieferung mehr"; Anrufer will liefern lassen | KI sagt ab (keine Lieferung), bietet Abholung oder Vorbestellung an | Liefer-Bestellung anlegen | Testanruf + automatisch |
| FA-23-T4 · Vorbestellung nur bei Betrieb zur Wunschzeit | „gar nichts mehr"; Wunschzeit auf einem Ruhetag/in einer Pause | KI bietet **keine** Vorbestellung an (kein Betrieb zur Wunschzeit, FA-18) | Vorbestellung für eine Zeit ohne Betrieb zusagen | Testanruf + automatisch |
| FA-23-T5 · Vorbestellung angeboten und angelegt | „gar nichts mehr"; Wunschzeit morgen zur Betriebszeit | KI bietet Vorbestellung an; bei Bestätigung Bestellung Eingegangen, als Vorbestellung gekennzeichnet | Reguläre Sofort-Bestellung statt Vorbestellung | Testanruf + automatisch |
| FA-23-T6 · Stopp trifft nur neue Bestellungen (Runde 29) | Vor dem Stopp sind zwei Vorbestellungen für später angenommen; danach „gar nichts mehr" gesetzt | Die zwei bestehenden Vorbestellungen bleiben bestehen und werden gemacht; nur **neue** Bestellungen werden abgelehnt | Bestehende Vorbestellung durch den Stopp entwerten/ablehnen | manuell + automatisch |
| FA-23-T7 · Ende von Hand | Stopp aktiv, Annahme legt Schalter zurück | Stopp aufgehoben, als Ereignis dokumentiert; KI/Annahme nehmen wieder regulär an | Stopp bleibt trotz Zurücklegen aktiv | manuell + automatisch |
| FA-23-T8 · Ende beim Ladenschluss des Tages von selbst | Stopp am Abend aktiv, nicht zurückgelegt; Ladenschluss laut Öffnungszeiten (FA-18) z. B. 22:00 | Beim Ladenschluss (22:00) ist der Stopp automatisch aufgehoben und als Ereignis dokumentiert; **nicht** erst um Mitternacht; am nächsten Betriebstag nimmt die KI/Annahme wieder regulär an | Stopp bleibt über den Ladenschluss hinaus hängen; Aufhebung erst um Mitternacht | automatisch |
| FA-23-T9 · Fahrer darf nicht schalten | Als Fahrer angemeldet, versucht Stopp zu schalten | Nicht möglich (Betriebsrecht Annahme/Inhaber) | Fahrer schaltet den Stopp | automatisch |
| FA-23-T10 · Bestellung von Hand während „gar nichts mehr" (Grenzfall, Runde 39) | „gar nichts mehr" aktiv; Annahme versucht, von Hand eine Bestellung anzulegen | System **warnt** und bietet „trotzdem anlegen"; keine harte Sperre; beim Übersteuern Bestellung Eingegangen mit **Protokolleintrag** (FA-05, Ausnahme 1d) | Harte Sperre; stilles Anlegen ohne Warnung; Übersteuern ohne Protokolleintrag | manuell + automatisch |
| FA-23-T11 · Betreiber sieht den Stopp im Monitoring (FA-22) | Restaurant A hat „gar nichts mehr" seit 19:30 aktiv; Betreiber öffnet die Gesundheitswerte | Die Zentrale zeigt für A **„Annahmestopp aktiv"** mit **welchem Schalter** und **seit wann** (19:30); keine Bestell- oder Kundendaten | Bestellinhalt/Kundendaten von A anzeigen; Stopp im Monitoring verschweigen | automatisch |
| FA-23-T12 · Zwei-Restaurant-Fall | Restaurant A schaltet „gar nichts mehr"; Restaurant B `+49 30 23125 404` ohne Stopp | Nur A ist gestoppt; bei B nimmt die KI weiter regulär an; im Monitoring erscheint der Stopp nur bei A | A's Stopp wirkt auf B; A's Stopp bei B im Monitoring sichtbar | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Annahmestopp ein-/ausschalten" (Betriebseinstellung, K2 noch offen)
- **Zustandsübergänge:** **keiner** an einer Bestellung — geschaltet wird eine Tenant-/Betriebseinstellung (Stopp-Zustand), kein Bestellstatus. Wirkt auf die Annahme in FA-01 (KI sagt ab / bietet Vorbestellung).
- **Technische Anwendungsfälle:** TU-? (Stopp-Zustand je Restaurant setzen/lesen, zwei Schalter, automatisches Ende am Tagesende, Wirkung auf `create_order`/KI-Gespräch; Zuordnung in K7 — Platzhalter)
- **Verträge / Events:** vorläufig `intake_stop.set` / `intake_stop.cleared` (Namen offen, K6); der Stopp fließt als Prüfung in `create_order` bzw. in das KI-Gespräch (FA-01) ein — Platzhalter
- **Testszenarien:** FA-23-T1 … FA-23-T12 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI sagt ab, bietet Vorbestellung an — nur bei Betrieb zur Wunschzeit), FA-05 (Bestellung von Hand während „gar nichts mehr" = **Warnung, übersteuerbar**, Runde 39), FA-13 (KI an/aus — Abgrenzung), FA-18 (Öffnungszeiten/Betrieb zur Wunschzeit; **Ladenschluss beendet den Stopp**, Runde 42), FA-22 (Gesundheitszustand — der Betreiber **sieht** den aktiven Stopp: welcher Schalter, seit wann; Runde 42)

## Offene Fragen

> **Beantwortet (Runde 39, Q23):** Die **Annahme von Hand** (FA-05) darf während **„gar nichts mehr"** trotzdem eine Bestellung anlegen — das System zeigt eine **Warnung** mit „trotzdem anlegen", **keine harte Sperre**; das Übersteuern wird protokolliert (Ablauf in FA-05, Ausnahme 1d) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 39; open-questions.md Q23).

> **Beantwortet (Runde 42):** „Tagesende" ist der **Ladenschluss des Tages** aus den gepflegten Öffnungszeiten (FA-18) — **nicht** Mitternacht. Der Stopp endet spätestens dann von selbst ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 42).

> **Beantwortet (Runde 42):** Der **Betreiber sieht** den aktiven Annahmestopp in den **Gesundheitswerten** (FA-22): welcher Schalter, seit wann — **ohne** Einsicht in Bestellungen oder Kundendaten (nur der Betriebszustand) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 42).

> **Frage an K4:** Der genaue **Wortlaut** der freundlichen Absage (und des Vorbestellungs-Angebots) wird im Gesprächsdesign festgelegt — hier nicht ausformuliert.

## Nicht Teil dieses Anwendungsfalls

- Der **Gesprächsablauf** und der **Wortlaut** der KI-Absage → K4.
- **KI an-/ausschalten** (anderer Schalter) → FA-13.
- **Öffnungszeiten, Ruhetage, Urlaub, Zeitfenster** pflegen → FA-18.
- **Vorbestellung** aufnehmen (Ablauf) → FA-01, FA-05.
- **Monitoring** des Betreibers → FA-22 (der Stopp **erscheint** dort als Gesundheitswert „Annahmestopp aktiv, welcher Schalter, seit wann"; entschieden Runde 42). Die Aufnahme des Werts selbst gehört zu FA-22.
- **Fiskalische** Wirkung: keine — es entsteht während des Stopps keine Bestellung (außer angebotene Vorbestellungen, die regulär laufen).
