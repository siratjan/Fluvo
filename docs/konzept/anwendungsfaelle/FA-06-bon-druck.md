# FA-06: Bon wird gedruckt — und was passiert, wenn nicht (Lieferung: zwei Exemplare)

- **Status:** mit Sirat durchgegangen (Runden 34–35, 2026-09-22)
- **Stand:** 2026-09-22

> **Geändert (ADR 0008, 2026-09-21):** Bei Bestellart **Lieferung** druckt fluvo im ersten Piloten **zwei Exemplare** desselben Bons (Station-Exemplar + Fahrer-/Kunden-Exemplar); der **Fahrer-QR entfällt** im ersten Piloten (kommt mit der Fahrer-App wieder, FA-08). Für Abholung/Mitnehmen bleibt es bei **einem** Exemplar ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 24/25, ADR 0008).

> **Geändert (Runden 34–35, 2026-09-22):** Der Bon wird **nicht mehr sofort beim Anlegen** gedruckt. Bei einer **KI-Bestellung** (auch Vorbestellung) **signalisiert das Annahme-Gerät** den Eingang (Ton + Anzeige „Neue Bestellung"); die Annahme **quittiert**, **erst dann druckt der Bon**. Wird **2 Minuten** lang nicht quittiert, druckt der Bon **trotzdem**, mit Hinweis an der Annahme (unquittiert gedruckt — Lesart Jarvis). **Von Hand angelegte** Bestellungen (FA-05) gelten als **direkt quittiert** → Bon **sofort** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 34/35).

| | |
|---|---|
| **Ziel** | Zu jeder angelegten Bestellung wird ein Bon mit allen Daten gedruckt — bei einer **KI-Bestellung erst, nachdem die Annahme das Signal quittiert hat** (spätestens **2 Minuten** nach Eingang druckt der Bon trotzdem), bei einer **von Hand angelegten** Bestellung **sofort** (gilt als direkt quittiert). Bei **Lieferung** in **zwei Exemplaren** desselben Bons (eines bleibt an der Annahmestation, eines geht mit dem Fahrer und danach an den Kunden), bei Abholung/Mitnehmen in **einem** Exemplar; der Bon trägt die Kundenrufnummer (kein Fahrer-QR im ersten Piloten), bei Vorbestellung deutlich gekennzeichnet. Gelingt der Druck nicht, bleibt das für die Annahme sichtbar — keine Bestellung verschwindet ohne Bon. |
| **Akteur** | Annahme, Koch |
| **Auslöser** | Eine Bestellung wurde angelegt (Status **Eingegangen**) — durch die KI (FA-01) oder von Hand (FA-05). |
| **Vorbedingungen** | Das Restaurant hat einen gekoppelten Drucker, der ihm zugeordnet ist. Ein Annahme-Gerät ist angemeldet und in der Lage zu signalisieren (Ton/Anzeige). Die Bestellung ist angelegt, mit Bestellart und (bei Lieferung) Adresse und Kundenrufnummer. |
| **Nachbedingungen** | Ein Bon liegt gedruckt vor, mit allen Daten der Bestellung. Bei einer **KI-Bestellung** ging dem Druck eine **Quittierung** der Annahme voraus **oder** der Bon wurde nach **2 Minuten** unquittiert gedruckt (mit Hinweis an der Annahme). Die Bestellung ist danach als **quittiert** vermerkt. Bei **Lieferung** liegen **zwei Exemplare** desselben Bons vor (Station-Exemplar + Fahrer-/Kunden-Exemplar, unterscheidbar „Station" / „Fahrer/Kunde") mit Kundenrufnummer und **ohne Fahrer-QR**, bei **Abholung/Mitnehmen** **ein** Exemplar (mit Kundenrufnummer), bei **Vorbestellung** deutlich als „Vorbestellung" mit Wunschzeit gekennzeichnet. Konnte nicht gedruckt werden, zeigt die Annahme eine Warnung „Bon nicht gedruckt". |

## Ist-Ablauf heute (aus der Mitschrift, Runde 4 und 5)

1. Die Bestellung wird auf einen Zettel **mit Durchschlag** (Kohlepapier) geschrieben.
2. Ein Exemplar bleibt an der Station (Annahme) als **Kontrolle**, das andere wird durch die Küche gereicht, bis es wieder zurück ist.
3. Der Zettel durchläuft mehrere Stationen; abgestimmt wird durch Zuruf, teils durch Abschreiben — kein festes Verfahren.

> Das an der Annahme verbliebene Exemplar ist heute die einzige Kontrolle darüber, was gefahren wurde (Mitschrift Runde 5). Für **Lieferungen** druckt fluvo dieses zweite Exemplar wieder: **zwei Bons** — eines bleibt an der Annahmestation, eines geht mit dem Fahrer und danach an den Kunden; der Fahrer nimmt sich sein Exemplar an der Station, so weiß die Annahme, **wer was gefahren hat** (wie heute mit dem Durchschlag). Das **ersetzt für Lieferungen** „ein Exemplar, Kontrolle im System" aus Runde 10 ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 24/25, ADR 0008). Für **Abholung/Mitnehmen** bleibt es bei **einem** Exemplar; die Kontrolle über nicht abgeholte/nicht kassierte Bestellungen liegt dort im **System** (FA-16).

> Die **Stations-Exemplare werden heute am Abend gesammelt** und aufbewahrt, nicht weggeworfen (Mitschrift Runde 35). Damit liegt das Stations-Exemplar mit **Name, Adresse und Rufnummer** dauerhaft auf **Papier außerhalb der Löschfunktion** des Systems — Aufbewahrungsfrist und Vernichtung gehören ins **Löschkonzept** ([OFFEN] Q10, Anwalt) und in die **Einweisung** beim Onboarding (FA-20). *Nicht gefragt:* wie lange gesammelt wird und wozu.

## Normalablauf (Lieferung, KI-Bestellung mit Quittierung)

1. Eine Liefer-Bestellung wird von der **KI** angelegt (FA-01), Status **Eingegangen**; sie ist zunächst **„neu/unquittiert"**. (Eine **von Hand** angelegte Bestellung (FA-05) gilt als **direkt quittiert** → weiter bei Schritt 4, Druck sofort — Ausnahme 1c.)
2. Das **Annahme-Gerät signalisiert** den Eingang: **Ton** + **Anzeige „Neue Bestellung"** (Anzeige/Layout → K10). Das Signal wiederholt sich, bis quittiert wird — längstens bis zur 2-Minuten-Grenze (Ausnahme 2a).
3. Ein Mitarbeiter **quittiert** die Anzeige am Gerät. **Erst die Quittierung** löst den Druck aus (nicht das Anlegen).
4. Das System erstellt den Bon mit allen Daten der Bestellung: Bestellnummer, Uhrzeit, Positionen mit Optionen und Hinweisen, Summe, Lieferadresse und **Rufnummer des Kunden** (der Fahrer ruft damit an, Runde 6). (Die **Zahlart** steht **nicht** auf dem Bon — im ersten Piloten wird für Lieferungen ohnehin **keine Zahlart und kein Zahlungseingang** im System erfasst, ADR 0008; bar oder Gutschein entscheidet sich an der Tür.)
5. Bei **Lieferung** druckt der Drucker des Restaurants **zwei Exemplare** desselben Bons, **unterscheidbar gekennzeichnet** „Station" / „Fahrer/Kunde" ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 35): eines bleibt an der **Annahmestation**, eines geht mit dem **Fahrer** und danach an den **Kunden**. Der Fahrer nimmt sich sein Exemplar an der Station ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 24/25, ADR 0008). Layout → K10. Ein **Fahrer-QR** wird im ersten Piloten **nicht** gedruckt; er kommt mit der Fahrer-App wieder (siehe FA-08, zurückgestellt).
6. Der Koch nimmt einen Bon und arbeitet danach auf Papier (Führung durch die Küche als eigener Fall FA-07 **entfällt im Piloten** — keine Küchen-Status).
7. Das System vermerkt die Bestellung als **quittiert** und den Bon als **gedruckt** (beide Exemplare, siehe 4c/4d).

## Ausnahmeabläufe

- **1a. Abholung / Mitnehmen** (zweigt von Schritt 1 ab): Der Bon wird als **ein** Exemplar gedruckt — kein zweites Stations-Exemplar (kein Fahrer, keine Zuordnung nötig). Der Bon trägt **auch hier die Kundenrufnummer** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 34 — schließt die frühere offene Frage). Ein Fahrer-QR wird ohnehin nicht gedruckt (entfällt im ersten Piloten). Bei einer **KI-Bestellung** gilt weiterhin Signal → Quittierung → Druck (Normalablauf); von Hand (FA-05) direkt quittiert. Endet in: ein Bon, Rest wie Normalablauf.
- **1b. Vorbestellung** (zweigt von Schritt 1 ab): Bei einer **KI-Vorbestellung** gilt dasselbe Prinzip wie im Normalablauf — **Signal → Quittierung → Druck** (spätestens nach 2 Minuten, Ausnahme 2a) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 35 — bestätigt Signal/Quittierung auch für Vorbestellungen); der Bon ist deutlich als **„Vorbestellung"** mit **Wunschzeit** gekennzeichnet ([ENTSCHIEDEN Sirat 2026-09-18, Runde 7]). Eine **von Hand** angelegte Vorbestellung (FA-05) gilt als direkt quittiert → Bon **sofort**. Ist die Vorbestellung eine **Lieferung**, gelten die zwei Exemplare wie im Normalablauf; sonst ein Exemplar. Das Restaurant behält ihn wie heute selbst im Blick. Endet in: gekennzeichneter Bon liegt vor.
- **1c. Von Hand angelegte Bestellung (FA-05) — direkt quittiert** (zweigt von Schritt 1 ab): Eine von der **Annahme von Hand** angelegte Bestellung gilt als **direkt quittiert**; die Annahme gibt sie ja selbst ein. Es gibt **kein** Signal und **keinen** extra Quittierungsschritt — der Bon wird **sofort** beim Anlegen erstellt und gedruckt (weiter bei Schritt 4) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 35). Endet in: Bon sofort gedruckt.
- **2a. Nicht quittiert nach 2 Minuten** (zweigt von Schritt 2 ab): Quittiert **niemand** innerhalb von **2 Minuten** nach Eingang (Stoßzeit, Gerät nicht in Hörweite), wird der Bon **trotzdem gedruckt**, mit einem **Hinweis/Warnung an der Annahme**, dass **unquittiert** gedruckt wurde (Lesart Jarvis — bei Kreuzverhör bestätigen). Bis zur Grenze signalisiert das Gerät weiter ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 35; 2 Minuten → K8). Endet in: Bon gedruckt, Bestellung als „unquittiert gedruckt" markiert, Hinweis sichtbar.
- **4a. Drucker offline / Papier leer / Deckel offen** (zweigt von Schritt 5 ab): Der Druck gelingt nicht. Die Annahme bekommt eine **Push-Meldung in der App** mit dem Grund (offline / Papier / Deckel) und der betroffenen Bestellung; die Anzeige einer technischen Störung (Drucker, KI, Verbindung) ist **Pflicht** — sie muss auf jeden Fall erscheinen ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29, Störungsmeldung → auch FA-13, FA-14, FA-22). Endet in: sichtbare Push-Meldung „Bon nicht gedruckt"; die Bestellung ist nicht verloren; Nachdruck über 4d.
- **4b. Internet fällt im Laden aus** (zweigt von Schritt 5 ab): → **FA-14**. Ob und wie der Bon dann lokal gedruckt wird, hängt an **Q8 / Risikotest AP-002** und ist offen. Endet in: siehe FA-14; nichts wird stillschweigend als gedruckt vermerkt.
- **4c. Wiederholtes Auslösen (doppelter Druck)** (zweigt von Schritt 5 ab): Je Bestellung und Bon-Art entstehen genau die **vorgesehenen Exemplare** (bei **Lieferung zwei**, sonst **eines**); ein wiederholtes Auslösen — auch eine **doppelte Quittierung** — erzeugt **keinen** weiteren Ausdruck darüber hinaus. Endet in: nur die vorgesehenen Exemplare.
- **4d. Nachdruck** (zweigt von Schritt 7 ab): Ein Bon geht verloren oder ist unleserlich; das Personal löst ausdrücklich einen **Nachdruck** aus. Der Nachdruck wird als Aktion des Personals dokumentiert. **Der Nachdruck gilt je Exemplar** — bei Lieferung kann ein **einzelnes** Exemplar (Station oder Fahrer/Kunde) nachgedruckt werden, ohne beide erneut auszugeben. Endet in: erneuter Bon (das nachgedruckte Exemplar), protokolliert.
- **4e. Geänderter Bon — auf Anforderung der Annahme** (ausgelöst durch eine Bearbeitung in **FA-11**): Wird eine Bestellung von Hand geändert, ist der **Systemeintrag Pflicht** (FA-11), der geänderte Bon wird aber **nicht automatisch gedruckt**: fluvo **bietet** der Annahme den Druck an („Geänderten Bon drucken"), und die Annahme **druckt ihn** oder **ergänzt stattdessen den alten Zettel in der Küche handschriftlich** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 41, Variante B; Schaltfläche → K10). **Wird gedruckt**, ist der Bon **deutlich als „GEÄNDERT" gekennzeichnet**, damit die Küche nicht doppelt kocht ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 35; Layout → K10). Der geänderte Bon ist eine eigene **Bon-Art**; 4c bleibt gültig. Bei Bestellart **Lieferung** wird der geänderte Bon — **wie der Erst-Bon** — in **zwei Exemplaren** gedruckt (Station-Exemplar + Fahrer-/Kunden-Exemplar), bei Abholung/Mitnehmen in **einem** Exemplar ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31/41, ADR 0008). Endet in: Systemeintrag erfolgt; geänderter Bon auf Anforderung gedruckt (bei Lieferung zwei Exemplare) **oder** alter Zettel handschriftlich ergänzt.
- **4f. Storno: Anzeige an der Annahme statt Storno-Bon** (ausgelöst durch einen Storno in **FA-11**): Wird eine Bestellung storniert, wird **kein Storno-Bon gedruckt** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 27, **von Sirat ausdrücklich bestätigt in Runde 31** — ersetzt Runde 20 / ADR 0007, wo ein Storno-Bon vorgesehen war; ADR 0009). Es gibt **keine eigene Storno-Anzeige** — der Storno ist wie jede Änderung in der **Bestellübersicht / im Log** sichtbar (mit Grund, z. B. „Kunde hat storniert"); die Küche wird wie bisher per **Zuruf** informiert (*Lesart Jarvis, Mitschrift Runde 40* — präzisiert die „Anzeige/Hinweis" aus Runde 27/31; FA-11). Endet in: kein Ausdruck; der Storno ist in der Übersicht/im Log sichtbar.

## Darf nicht

- Es wird **kein** Bon je **Küchenstation** gedruckt und **kein** Küchendisplay bedient — die Küche arbeitet auf **einem** Bon, unabhängig von der Zahl der Exemplare ([ENTSCHIEDEN Sirat 2026-09-18, Runde 4/5]).
- Bei **Lieferung** wird das **zweite Exemplar** (Stations-Exemplar) **gedruckt** — es ersetzt für Lieferungen die frühere Regel „ein Exemplar, Kontrolle im System" ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 24/25, ADR 0008). Bei **Abholung/Mitnehmen** wird **kein** zweites Exemplar gedruckt.
- Im ersten Piloten wird **kein Fahrer-QR** gedruckt — bei keiner Bestellart; er kommt mit der Fahrer-App wieder (FA-08, zurückgestellt) ([ENTSCHIEDEN Sirat 2026-09-21], ADR 0008).
- Der Bon einer **KI-Bestellung** wird **nicht vor der Quittierung** gedruckt — außer die **2-Minuten-Grenze** ist erreicht; dann druckt er **mit Hinweis „unquittiert gedruckt"** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 34/35).
- Eine **unquittierte** KI-Bestellung bleibt **nicht lautlos** liegen: Das Gerät **signalisiert**, bis quittiert wird oder die 2 Minuten ablaufen und der Bon druckt.
- Eine **von Hand** angelegte Bestellung wartet **nicht** auf ein Signal/eine Quittierung — sie gilt als direkt quittiert und druckt sofort.
- Eine Bestellung bleibt **nicht ohne sichtbaren Hinweis** ohne Bon; ein fehlgeschlagener Druck wird der Annahme angezeigt.
- Ein wiederholt verarbeiteter Auftrag erzeugt **keinen** Ausdruck über die vorgesehenen Exemplare hinaus; ein weiterer Bon entsteht nur durch ausdrücklichen Nachdruck (je Exemplar).
- Ein Bon eines Restaurants geht **nur** an dessen Drucker ([FEST 4]).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Ein Bon je Bestellung mit allen Daten für die Küche, kein Bon je Küchenstation, kein Küchendisplay | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 4/5 |
| Bon einer **KI-Bestellung** druckt **erst nach Quittierung**: Gerät signalisiert (Ton + Anzeige „Neue Bestellung"), Annahme quittiert, dann Druck | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 34 |
| **2 Minuten** ohne Quittierung → Bon druckt **trotzdem**, mit Hinweis „unquittiert gedruckt" (Lesart Jarvis); bis dahin signalisiert das Gerät weiter | [ENTSCHIEDEN Sirat 2026-09-22] (Hinweis-Wortlaut Lesart Jarvis) | Mitschrift Runde 35; 2 Min → K8 |
| **Von Hand** angelegte Bestellung (FA-05) gilt als **direkt quittiert** → Bon sofort, kein Signal, kein extra Schritt | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 35 |
| **Bei Lieferung zwei Exemplare** desselben Bons (eines an der Annahmestation, eines mit dem Fahrer/an den Kunden); bei Abholung/Mitnehmen **ein** Exemplar — ersetzt für Lieferungen „ein Exemplar, Kontrolle im System" (Runde 10) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 24/25, ADR 0008 |
| **Kein Fahrer-QR** im ersten Piloten (bei keiner Bestellart); kommt mit der Fahrer-App wieder (FA-08, zurückgestellt) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 24/25, ADR 0008 |
| Die zwei Liefer-Exemplare sind unterscheidbar gekennzeichnet „Station" / „Fahrer/Kunde" | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 35; Layout K10 |
| Kundenrufnummer steht auf dem Bon — bei Lieferung (der Fahrer ruft damit an) **und** bei Abholung/Mitnehmen | [ENTSCHIEDEN Sirat 2026-09-18/2026-09-22] | Mitschrift Runde 6, 34 |
| Nachdruck und Doppeldruck-Regel gelten **je Exemplar** | [STACK] | ADR 0008; Skill fluvo-printing |
| Aufbewahrung und Vernichtung des Stations-Exemplars (Name, Adresse, Rufnummer — außerhalb der Löschfunktion) | [OFFEN] Q10 | Löschkonzept / Einweisung FA-20; ADR 0008 „Folgen" |
| Vorbestellung: bei KI-Bestellung Signal → Quittierung → Druck (spätestens nach 2 Min), von Hand sofort; deutlich als „Vorbestellung" mit Wunschzeit gekennzeichnet | [ENTSCHIEDEN Sirat 2026-09-18/2026-09-22] | Mitschrift Runde 7 (Nachtrag), 35 |
| Je Bestellung die vorgesehenen Exemplare (Lieferung zwei, sonst eines); kein Ausdruck darüber hinaus durch wiederholtes Auslösen | [STACK] | Skill fluvo-printing (Idempotenz); Briefing §5.3 |
| Nicht bestätigter Druck erscheint als Warnung an der Annahme (nichts verschwindet lautlos) | [STACK] | Skill fluvo-printing; CLAUDE „Darf nicht" |
| Nachdruck ist eine ausdrückliche, protokollierte Aktion des Personals | [STACK] | Skill fluvo-printing |
| **Geänderter Bon** als eigene Bon-Art (nach FA-11): wird der Annahme **zum Druck angeboten**, **nicht automatisch** gedruckt — sie druckt ihn oder ergänzt den alten Küchenzettel handschriftlich (Systemeintrag bleibt Pflicht, FA-11) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 41 (Variante B); Runde 13/14 |
| Wird der geänderte Bon gedruckt, ist er **deutlich als „GEÄNDERT" gekennzeichnet** (damit nicht doppelt gekocht wird) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 41; Runde 35; K10 |
| **Kein Storno-Bon** (bestätigt Runde 31, ersetzt Runde 20 / ADR 0007, ADR 0009); **keine eigene Storno-Anzeige** — der Storno ist in der **Bestellübersicht / im Log** sichtbar, Küche per Zuruf (FA-11) (*Lesart Jarvis* — präzisiert Runde 27/31) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 40 (präzisiert Runde 27/31) |
| **Wird** der geänderte Bon gedruckt, kommt er bei Lieferung **ebenfalls in zwei Exemplaren** (wie der Erst-Bon), sonst ein Exemplar | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 31/41, ADR 0008 |
| Ein fehlgeschlagener Druck / eine technische Störung (Drucker, KI, Verbindung) wird als **Push in der App** angezeigt; die Anzeige ist **Pflicht** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 (Störungsmeldung) |
| Bon offline drucken (ohne Internet) | [OFFEN] Q8 | open-questions.md Q8 / Risikotest AP-002 |
| Nach wie vielen Sekunden ohne Bestätigung die Warnung erscheint | [OFFEN] | Frage an Sirat / K8 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Lieferung (KI, quittiert) | KI-Liefer-Bestellung angelegt, Gerät signalisiert, Annahme **quittiert**, Drucker online | Druck **erst nach Quittierung**: **zwei Exemplare** desselben Bons, gekennzeichnet „Station" / „Fahrer/Kunde", mit allen Daten und Kundenrufnummer, **ohne** Fahrer-QR; Bestellung als quittiert vermerkt | Druck vor Quittierung; nur ein Exemplar; QR auf dem Bon; Rufnummer fehlt; Kennzeichnung fehlt | manuell am Gerät + automatisch |
| Nicht quittiert nach 2 Minuten (Grenzfall) | KI-Bestellung angelegt, niemand quittiert; Uhr (hereingereicht) läuft über 2 Minuten | Bon druckt **trotzdem** nach 2 Minuten, **Hinweis „unquittiert gedruckt"** an der Annahme; Gerät signalisierte bis dahin | Bon bleibt ungedruckt; Druck ohne Hinweis; Signal verstummt vor Ablauf | automatisch (Uhr hereingereicht) |
| Von Hand angelegt → Bon sofort | Annahme legt Bestellung von Hand an (FA-05) | Bon **sofort** gedruckt (direkt quittiert), **kein** Signal, **kein** extra Quittierungsschritt | Warten auf Signal/Quittierung bei einer von Hand angelegten Bestellung | manuell + automatisch |
| Doppelte Quittierung (Grenzfall) | Dieselbe KI-Bestellung wird **zweimal** quittiert | Nur die vorgesehenen Exemplare gedruckt, kein weiterer Ausdruck | Zweiter Bon-Satz durch doppelte Quittierung | automatisch |
| Standardfall Abholung (KI, quittiert) | KI-Abhol-Bestellung angelegt, Annahme quittiert | **Ein** Exemplar nach Quittierung gedruckt (kein zweites Stations-Exemplar, kein Fahrer-QR), **mit Kundenrufnummer** | Zweites Exemplar; Fahrer-QR auf Abhol-Bon; Rufnummer fehlt | manuell + automatisch |
| Vorbestellung (KI, quittiert) | KI-Vorbestellung mit Wunschzeit 19:00, Annahme quittiert | Bon nach Quittierung (spätestens 2 Min), deutlich „Vorbestellung 19:00" gekennzeichnet (bei Lieferung zwei Exemplare) | Kennzeichnung fehlt; Bon kommt erst zur Wunschzeit; Druck vor Quittierung/ohne 2-Min-Regel | manuell + automatisch |
| Drucker offline (Grenzfall) | Bestellung angelegt, Drucker offline/Papier leer | **Push-Meldung** „Bon nicht gedruckt" mit Grund an der Annahme (Anzeige **Pflicht**); Bestellung bleibt bekannt | Bestellung verschwindet ohne Hinweis; Störung wird verschluckt | manuell + automatisch |
| Wiederholtes Auslösen (Grenzfall doppelt) | Druck-Auslöser derselben Liefer-Bestellung zweimal | Nur die zwei vorgesehenen Exemplare gedruckt, kein weiterer Ausdruck | Drittes Exemplar ohne Nachdruck | automatisch |
| Nachdruck einzelnes Exemplar | Personal löst Nachdruck des Stations-Exemplars einer Lieferung aus | Erneut das eine Exemplar, Nachdruck als Aktion protokolliert; nicht beide erneut | Nachdruck unprotokolliert; beide Exemplare erneut | manuell + automatisch |
| Geänderter Bon Lieferung, auf Anforderung (nach FA-11) | Liefer-Bestellung von Hand geändert (FA-11), Annahme **löst den Druck aus** | Geänderter Bon **auf Anforderung** gedruckt, deutlich als **„GEÄNDERT"** gekennzeichnet, in **zwei Exemplaren** (Station + Fahrer/Kunde) wie der Erst-Bon | Automatischer/erzwungener Druck; ununterscheidbar als frische Bestellung; nur ein Exemplar bei Lieferung; Küche kocht doppelt | manuell + automatisch |
| Geänderter Bon Abholung, auf Anforderung (nach FA-11) | Abhol-Bestellung von Hand geändert (FA-11), Annahme löst den Druck aus | Geänderter Bon **auf Anforderung** gedruckt, als **„GEÄNDERT"** gekennzeichnet, in **einem** Exemplar | Automatischer Druck; zweites Exemplar bei Abholung; unmarkiert | manuell + automatisch |
| Geänderter Bon nicht gedruckt (nach FA-11) | Bestellung von Hand geändert (FA-11), Annahme **druckt nicht** und ergänzt den alten Zettel handschriftlich | Systemeintrag ist erfolgt (Pflicht, FA-11); **kein** erzwungener Ausdruck durch FA-06 | Geänderten Bon automatisch drucken, obwohl die Annahme es nicht ausgelöst hat | manuell + automatisch |
| Storno: sichtbar im Log statt Bon (nach FA-11) | Bestellung storniert (FA-11), Kundenstorno mit Grund | Storno in der **Bestellübersicht / im Log** sichtbar (mit Grund); **keine eigene Anzeige**, **kein Storno-Bon** gedruckt; Küche per Zuruf | Storno-Bon drucken | manuell + automatisch |
| Internet weg | Verbindung getrennt beim Anlegen | Verhalten nach FA-14; kein stiller „gedruckt"-Vermerk; lokaler Druck hängt an Q8 | Bon gilt fälschlich als gedruckt | manuell (mit echtem Drucker, AP-002) |
| Zwei-Restaurant-Fall | Restaurant A und B, je eigener Drucker; Bestellung von B | Bon von B geht nur an B's Drucker; A druckt ihn nicht | Bon auf fremdem Drucker | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Bestellung angelegt → (KI: signalisieren → quittieren) → Bon drucken" (K2 noch offen)
- **Zustandsübergänge:** keiner am Bestellstatus — der Druck ändert ihn nicht; er ist Folge von **Eingegangen** (`order.created`). Neu: die Bestellung trägt ein **Merkmal „quittiert"** (neu/unquittiert → quittiert; oder „unquittiert gedruckt" nach 2 Minuten) — ob Merkmal oder eigener Zustand, entscheidet **K3** (`architect`).
- **Technische Anwendungsfälle:** TU-? (Eingangssignal am Annahme-Gerät, Quittierung, **2-Minuten-Timer** mit hereingereichter Uhr, Druckauftrag anlegen, Drucker-Abfrage, Bestätigung/Warnung, Nachdruck **je Exemplar**, Exemplar-Anzahl je Bestellart; Zuordnung in K7). QR-Erzeugung entfällt im ersten Piloten (kommt mit der Fahrer-App wieder, FA-08).
- **Verträge / Events:** `order.created` (Auslöser); **Quittierung** (vorläufig `order.acknowledged`) bzw. **Ablauf des 2-Minuten-Timers** (unquittiert gedruckt) lösen den Druck aus; Druckauftrag mit Status (vorläufig `print.requested` / `print.printed` / `print.failed`), **Exemplar-Kennung** (Station / Fahrer-Kunde bei Lieferung) und **Bon-Art** (Original / geändert / Nachdruck), ausgelöst durch `order.amended` (FA-11); `order.cancelled` löst **keinen** Bon und **keine eigene Anzeige** aus — der Storno wird über die **Bestellübersicht / das Log** sichtbar (Runde 40, präzisiert Runde 27); Push-Meldung bei Druckfehler/Störung (Runde 29) (K6 noch offen)
- **K-Vermerke:** Merkmal/Zustand **„quittiert"** → **K3**; die **2 Minuten** (Grenzwert) → **K8**; **Anzeige „Neue Bestellung"** und Signal-/Hinweis-Darstellung → **K10**.
- **Testszenarien:** FA-06-T1 … FA-06-T14 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI legt Bestellung an), FA-05 (Annahme von Hand), FA-07 (Küche arbeitet nach dem Bon) — **entfällt im Piloten** (keine Küchen-Status), FA-08 (Fahrer-App später; QR kommt damit wieder) — **zurückgestellt**, FA-11 (löst geänderten Bon aus), FA-14 (Internet weg)

## Offene Fragen

> **Beantwortet (Runde 34):** Die **Kundenrufnummer** steht **auch bei Abholung/Mitnehmen** auf dem Bon ([ENTSCHIEDEN Sirat 2026-09-22]). (Damit ist die frühere Frage geschlossen.)

> **Frage an Sirat:** Soll der **Name** des Kunden auf dem Bon stehen? Die KI/Annahme erfasst den Namen zwar immer (FA-01/FA-05, Mitschrift Runde 15), ob er auch **auf dem Bon** erscheint, ist **nicht entschieden**. (Wirkung: Zuordnung bei Abholung/Übergabe vs. Datensparsamkeit.)

> **Frage an Sirat / K8:** Nach wie vielen **Sekunden** ohne Druckbestätigung soll die Warnung „Bon nicht gedruckt" an der Annahme erscheinen? (Messbare Anforderung, damit nichts zu spät auffällt.)

> **Frage an Sirat / Risikotest AP-002:** Was passiert mit dem Bon bei **Internetausfall** — lokaler Druck (Q8) oder gar kein Bon bis zur Rückkehr des Netzes? Das entscheidet der Drucker-Test (AP-002).

> **Beantwortet (Runden 31/41):** Der **geänderte Bon** wird **nicht automatisch** gedruckt, sondern der Annahme **zum Druck angeboten** (Variante B, Mitschrift Runde 41) — der Systemeintrag der Änderung bleibt Pflicht (FA-11). **Wird gedruckt**, kommt er bei Lieferung **in zwei Exemplaren** (Station + Fahrer/Kunde) wie der Erst-Bon, bei Abholung/Mitnehmen in einem Exemplar ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31/41, ADR 0008). Der **Storno-Bon** entfällt (bestätigt Runde 31, ersetzt Runde 20 / ADR 0007) — bei Storno erscheint eine Anzeige an der Annahme; Nachtrag in ADR 0011.

> **Frage an Sirat / Q10 (Datenschutz, Löschkonzept / Einweisung FA-20):** Das **Stations-Exemplar** des Liefer-Bons trägt **Name, Adresse und Rufnummer** und liegt als Papier **außerhalb der Löschfunktion** des Systems. Wie lange wird es aufbewahrt und wie wird es vernichtet? Das gehört ins **Löschkonzept** und in die **Einweisung des Restaurants** (FA-20). (Aus dem Rat / `compliance-guard`, ADR 0008 „Folgen".)

> **Beantwortet (Runde 26, ADR 0008) — Rest an architect (K3, Q13):** Eine Liefer-Bestellung endet im ersten Piloten dadurch, dass die **Annahme „geliefert" drückt**, sobald sie weiß, dass geliefert wurde — **nicht** automatisch beim Bon-Druck; Zahlart und Bar-Eingang werden dabei nicht erfasst ([ENTSCHIEDEN Sirat 2026-09-21]). Offen bleibt für K3 / Q13: wie dieser Übergang in der Statuskette heißt (ohne „Unterwegs"), wie er sich zu „Abgerechnet" verhält, und was mit Liefer-Bestellungen geschieht, bei denen niemand „geliefert" drückt (Sichtbarkeit am Tagesende). *(Diese Frage wird hier einmal geführt; FA-05 verweist hierher.)*

> **Frage an Sirat / Steuerberaterin (Q2, Ergänzung 2026-09-21):** **Kassenrechtliches Risiko:** Mit fluvo ist jede Liefer-Bestellung samt Summe elektronisch erfasst, die zugehörige **Barzahlung aber nicht**. Sirat hat ausdrücklich **„ohne Bar-Eingang"** entschieden — im ersten Piloten wird für Lieferungen **keine Zahlart und kein Zahlungseingang** im System erfasst (ADR 0008). Ob das zulässig ist, klärt **nur die Steuerberaterin — vor Pilotstart** (open-questions.md Q2). Verlangt sie die Erfassung, greift Variante (C) des Rats als vorbereiteter Rückfall.

## Nicht Teil dieses Anwendungsfalls

- Genaues **Bon-Layout** (Breite 58/80 mm, Zeichensatz, Anordnung, Kennzeichnung der zwei Liefer-Exemplare „Station"/„Fahrer/Kunde") → K10.
- **Fiskalischer Block** auf dem Bon (TSE-Signatur, Zeitstempel, DSFinV-K-QR) und der Signaturzeitpunkt → K5/K6, hängt an Q2 (Steuerberaterin).
- Führung durch die **Küche** nach dem Bon → FA-07 (**entfällt im Piloten**; die Küche arbeitet auf Papier vom Bon).
- **QR-Scan** und Fahrer-Zuordnung → FA-08 (**zurückgestellt**; der QR kommt mit der Fahrer-App wieder).
- Verhalten bei **Internetausfall** im Detail → FA-14; lokaler Druck hängt an Q8 / AP-002.
