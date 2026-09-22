# FA-08: Fahrer scannt, liefert aus und kassiert (mehrere je Tour, Scan lösen)

- **Status:** Entwurf — zurückgestellt
- **Stand:** 2026-09-21

> **Zurückgestellt (ADR 0008, 2026-09-21):** Der Fahrer-Teil kommt nach dem ersten Piloten als eigene App. Dieser Entwurf bleibt als Grundlage erhalten, wird für den ersten Piloten aber weder abgenommen noch gebaut. Im ersten Piloten: zwei Bons bei Lieferung, Liefer-Bargeld auf Papier (FA-06).

> **ADR 0012 (2026-09-22): Wechselgeld außerhalb des Systems** — beim Wiederaufnehmen nachziehen (kein Wechselgeld-Start, Kassensturz = nur die bar kassierten Beträge des Fahrers).

| | |
|---|---|
| **Ziel** | Ein Fahrer ordnet sich abholbereite Liefer-Bestellungen per QR-Scan zu, fährt sie aus, findet die Adresse per Klick und kassiert bar oder per Gutschein des Restaurants. |
| **Akteur** | Fahrer |
| **Auslöser** | Eine oder mehrere Liefer-Bestellungen liegen abholbereit (die Küche arbeitet auf Papier, das System kennt keinen Küchen-Status); der Fahrer scannt den QR auf dem jeweiligen Bon. |
| **Vorbedingungen** | Der Fahrer ist in der Fahrer-PWA auf seinem Privathandy angemeldet (**offene Schicht, deren Wechselgeld-Ausgabe der Inhaber bestätigt hat** — [ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15/16). Die Bestellung ist Bestellart **Lieferung**, Status **Eingegangen** (im Piloten gibt es keine Küchen-Status, deshalb steht die Bestellung beim Scan noch auf Eingegangen — wie FA-15; der Weg Eingegangen → Unterwegs ohne die Küchen-Zustände ist nicht modelliert, siehe Q13/K3), Bon mit Fahrer-QR ist gedruckt. Der Fahrer startet die Schicht mit dem je Restaurant eingestellten Wechselgeld-Startbetrag (beim Piloten 50 €). |
| **Nachbedingungen** | Jede ausgelieferte Bestellung ist dem Fahrer zugeordnet, im Status **Geliefert**, mit erfasster Zahlart (bar, Gutschein oder Gutschein + bar). Alle Zuordnungen und Scan-Lösungen sind als Ereignisse dokumentiert; nichts wurde gelöscht. |

## Ist-Ablauf heute (aus der Mitschrift, Runde 5)

1. Die Mitarbeiter entscheiden intern, wer was fährt.
2. Ein Fahrer nimmt mehrere Bestellungen in dieselbe Richtung auf einmal mit.
3. Die Adresse steht auf dem Zettel und wird vom Fahrer ins Handy **abgetippt**.
4. An der Tür kassiert der Fahrer bar, manchmal per Gutschein; der Kunde bekommt den Zettel als Beleg. Wechselgeld-Start: beim Piloten 50 €.
5. Es bleibt manchmal unklar, wer welche Bestellung gefahren hat; das an der Station verbliebene Zettel-Exemplar ist die einzige Kontrolle.

> Wo es heute regelmäßig hakt: verlorene Zettel, „keiner weiß, wer was gefahren hat", verlorenes Geld (Mitschrift Runde 5). Der QR-Scan löst genau die Zuordnung Bestellung → Fahrer.

## Normalablauf

1. Der Fahrer scannt den QR auf dem Bon einer abholbereiten Liefer-Bestellung (Status **Eingegangen**).
2. Das System ordnet die Bestellung diesem Fahrer zu und setzt sie auf **Unterwegs** (Ereignis dokumentiert). Wie der Übergang **Eingegangen → Unterwegs** ohne die Küchen-Zustände modelliert wird, ist nicht entschieden → Q13/K3.
3. Der Fahrer wiederholt Schritt 1 für jede weitere Bestellung derselben Tour.
4. Der Fahrer öffnet zu einer Bestellung die Adresse per Klick in seiner Karten-App und fährt los.
5. An der Tür übergibt der Fahrer das Essen und kassiert den **in der Fahrer-App angezeigten Betrag** — **bar** oder per **Gutschein** des Restaurants. Maßgeblich ist der Betrag **in der App**, nicht der Bon: Wurde die Bestellung nach dem Scan geändert (FA-11), zeigt die App den neuen, vom Server berechneten Betrag ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15 B9).
6. Der Fahrer erfasst in der PWA für die Bestellung die Zahlart und markiert sie als **Geliefert**.
7. Der Fahrer wiederholt Schritte 4–6 für die weiteren Bestellungen der Tour und kehrt zurück.

## Ausnahmeabläufe

- **1a. Falsch gescannt / Tour umverteilt — Scan lösen** (zweigt von Schritt 1 oder 3 ab): Der Fahrer löst eine Zuordnung wieder. Das Lösen ist ein **neues Ereignis**, kein Löschen; die frühere Zuordnung bleibt an der Bestellung dokumentiert ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 6; unveränderliches Ereignisprotokoll [FEST 6], Briefing §2.6). Die Bestellung kann danach von einem anderen Fahrer gescannt werden. Endet in: Bestellung ohne Fahrerzuordnung (Rückzustand siehe Offene Fragen).
- **1b. Bereits einem anderen Fahrer zugeordnet** (zweigt von Schritt 1 ab): Das System weist darauf hin, dass die Bestellung schon einem Fahrer zugeordnet ist; ohne Lösen (1a) durch den anderen wird sie nicht doppelt zugeordnet. Endet in: keine Doppelzuordnung.
- **5a. Kunde nicht angetroffen / Adresse falsch** (zweigt von Schritt 5 ab): Die Rufnummer des Kunden steht auf dem Bon; der Fahrer ruft an → **FA-09**. Endet in: dort mit benanntem Ende („nicht zustellbar", hängt an Q3).
- **5b. Kunde zahlt mit Gutschein (deckt die ganze Bestellung)** (zweigt von Schritt 5 ab): Der Fahrer erfasst als Zahlart **Gutschein** (eigener Gutschein des Restaurants). Endet in: Bestellung Geliefert, Zahlart Gutschein. → Art/Verbuchung des Gutscheins offen (siehe Offene Fragen).
- **5c. Gutschein kleiner als der Bestellwert** (zweigt von Schritt 5 ab): Der Gutschein deckt nur einen Teil; der Fahrer kassiert den **Rest bar**. Er erfasst beide Beträge — eine Bestellung trägt damit **zwei Zahlarten** (Gutscheinbetrag + bar, [ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 8). Nur der bar kassierte Teil geht in den Kassensturz (FA-10) ein; den Gutschein gibt der Fahrer mit ab. Endet in: Bestellung Geliefert, Zahlart Gutschein + bar. → Art/Verbuchung des Gutscheins offen (siehe Offene Fragen).
- **6a. Internet weg beim Erfassen** (zweigt von Schritt 6 ab): Die PWA nimmt „Geliefert" und Zahlart in die Warteschlange und spielt sie bei Verbindung nach ([FEST 18], Idempotenz-Schlüssel). Endet in: kein Datenverlust, Bestellung Geliefert nach Nachspielen.

## Darf nicht

- Der Fahrer **ändert** und **storniert** eine Bestellung **nicht** — er darf sie nur **ansehen**, sich per Scan **zuordnen/lösen** und **Zustellung und Zahlart erfassen**. Ändern und Stornieren macht die Annahme (FA-11) ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 17/18, ADR 0007).
- Ein Scan wird beim Lösen **nicht** gelöscht; die frühere Zuordnung bleibt als Ereignis erhalten ([FEST 6], Mitschrift Runde 6).
- Eine Bestellung wird **nicht** zwei Fahrern gleichzeitig zugeordnet.
- Es wird **keine** Zahlart außer Bar und Gutschein erfasst (Trinkgeld wird nicht abgebildet, Mitschrift Runde 6).
- Der Fahrer tippt die Adresse **nicht** ab; sie wird per Klick übergeben (Deep-Link, [Briefing §5.3]).
- Der Fahrer sieht **keine** Bestellungen eines anderen Restaurants ([FEST 4]).
- Der Fahrer kassiert **nicht** stur den auf dem Bon gedruckten Betrag, wenn er vom **App-Betrag abweicht**: Maßgeblich ist der **in der App angezeigte**, vom Server berechnete Betrag; nach einer Änderung (FA-11) ist der Bon ggf. veraltet ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 15 B9). Der Fahrer rechnet den Betrag **nicht** selbst ([FEST 8]).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Zuordnung Bestellung → Fahrer entsteht durch den QR-Scan | [FEST] | Briefing §3 (Fahrermanager); Mitschrift Runde 5 |
| Mehrere Bestellungen je Tour (mehrere Scans, dann losfahren) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 5 |
| Scan lösbar, aber an der Bestellung dokumentiert (neues Ereignis, kein Löschen) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Der Fahrer kann Bestellungen **nicht ändern oder stornieren** — nur ansehen, zuordnen/lösen, Zustellung und Zahlart erfassen (Ändern/Storno macht die Annahme, FA-11) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 17/18, ADR 0007 |
| Adresse per Klick in die Karten-App (Deep-Link), kein Abtippen | [FEST] | Briefing §5.3; Mitschrift Runde 5 |
| Zahlung nur bar oder eigener Gutschein des Restaurants | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 5/6 |
| Gutschein kleiner als Bestellwert → Rest bar; eine Bestellung kann zwei Zahlarten tragen (Gutschein + bar) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 8 |
| Trinkgeld wird nicht abgebildet | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Rufnummer des Kunden steht auf dem Bon | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Wechselgeld-Start je Restaurant einstellbar (beim Piloten 50 €) je Fahrer und Schicht | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 5 |
| Die Schicht setzt voraus, dass der **Inhaber die Ausgabe des Wechselgelds bestätigt** hat (am Schichtbeginn) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 15/16 |
| Maßgeblich ist der **Betrag in der Fahrer-App**, nicht der Bon (bei Änderung nach dem Scan, FA-11) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 15 (B9) |
| Fahrer nutzt PWA auf Privathandy (BYOD, kein App-Store) | [FEST] | Briefing §2.17 |
| Oberfläche große Buttons, ein Schritt pro Bildschirm, ohne Schulung, offline-tauglich | [FEST] | Briefing §9.9, §2.18 |
| Zahlart „Gutschein" fehlt bisher im Briefing (dort Bar/Karte/Storno) | [OFFEN] | Mitschrift Runde 5 (Widerspruch) |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall, eine Bestellung | Liefer-Bestellung (Status Eingegangen), QR gescannt, bar kassiert, Geliefert | Bestellung dem Fahrer zugeordnet, Status Eingegangen → Unterwegs → Geliefert, Zahlart bar | Doppelzuordnung; Betragsänderung | manuell am Gerät + automatisch |
| Mehrere Bestellungen je Tour | 3 abholbereite Bestellungen (Status Eingegangen), 3 Scans, dann Auslieferung | Alle 3 dem Fahrer zugeordnet, einzeln auf Geliefert setzbar | Vermischung der 3 Adressen/Beträge | manuell + automatisch |
| Scan lösen | Bestellung gescannt, dann gelöst | Zuordnung entfernt, Lösen als Ereignis dokumentiert, frühere Zuordnung bleibt sichtbar | Ereignis wird gelöscht/überschrieben | automatisch |
| Doppelt scannen (Grenzfall doppelt) | Bestellung schon Fahrer X zugeordnet, Fahrer Y scannt | Hinweis „bereits zugeordnet", keine Übernahme ohne Lösen | Doppelzuordnung | automatisch |
| Zahlung per Gutschein (voll) | Kunde zahlt die ganze Bestellung mit Gutschein des Restaurants | Zahlart Gutschein erfasst, Bestellung Geliefert | Zahlart außerhalb bar/Gutschein | manuell + automatisch |
| Gutschein deckt nur Teil, Rest bar | Bestellwert 30,00 €, Gutschein 20,00 €, Rest 10,00 € bar | Zwei Zahlarten erfasst (Gutschein 20,00 € + bar 10,00 €), Bestellung Geliefert; nur 10,00 € bar gehen später in den Kassensturz | Bar-Teil fehlt oder voller Betrag als bar gewertet | manuell + automatisch |
| Bestellung nach Scan geändert (Grenzfall) | Bestellung gescannt (Bon 25,00 €), danach in FA-11 auf 32,00 € geändert | Fahrer-App zeigt 32,00 €; der Fahrer kassiert 32,00 € (App-Betrag), nicht den alten Bon-Betrag | Alten Bon-Betrag kassieren | manuell + automatisch |
| Kunde nicht angetroffen | Niemand an der Tür | Verweis FA-09, Bestellung bleibt zustellbar/nicht zustellbar mit benanntem Ende | Bestellung verschwindet lautlos | manuell |
| Internet weg beim „Geliefert" (Grenzfall offline) | Verbindung getrennt bei Schritt 6 | Aktion in Warteschlange, nach Verbindung Geliefert | Datenverlust; doppelte Anwendung | manuell + automatisch |
| Zwei-Restaurant-Fall | Fahrer bei Restaurant A, QR-Bon von Restaurant B `+49 30 23125 301` | Scan von B wird bei A abgelehnt; keine fremde Bestellung sichtbar | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Auslieferung → Zahlung erfassen" (K2 noch offen)
- **Zustandsübergänge:** **Eingegangen** → **Unterwegs** → **Geliefert**; der Übergang **Eingegangen → Unterwegs** ohne die Küchen-Zustände „In Küche"/„Fertig" ist im Piloten **nicht modelliert** → K3 (Q13). Rückzustand beim Scan-Lösen ebenfalls offen (siehe unten)
- **Technische Anwendungsfälle:** TU-? (QR-Token prüfen, Zuordnung, Statuswechsel, Zahlart erfassen; Zuordnung in K7)
- **Verträge / Events:** `order.assigned_to_driver`, `order.driver_assignment_released`, `order.out_for_delivery`, `order.delivered` (Namen vorläufig, K6 noch offen)
- **Testszenarien:** FA-08-T1 … FA-08-T10 (Tabelle oben)
- **Nachbar-Fälle:** FA-06 (Bon mit QR), FA-07 (Bestellung durch die Küche) — **entfällt im Piloten** (keine Küchen-Status, Sirat 2026-09-18), FA-09 (nicht angetroffen), FA-10 (Kassensturz)

## Offene Fragen

> **Beantwortet (ADR 0008, Mitschrift Runde 24/25):** Die Rückfragen aus Runde 19 und 23 („sehen die Fahrer im Piloten nur, oder erfassen sie Geliefert/Zahlart?"; „ist der Fahrer-Teil aus dem Piloten-Schnitt?"; „wie wird das Liefer-Bargeld kontrolliert?") sind entschieden: **Der Fahrer-Teil ist aus dem ersten Piloten herausgenommen** und wird eine **eigene App**; dieser Fall ist **zurückgestellt** (Entwurf bleibt als Grundlage erhalten). Im ersten Piloten scannt, liefert und kassiert **kein Fahrer im System**. Bei Lieferung druckt fluvo **zwei Bons** — eines bleibt an der Annahmestation, eines geht mit dem Fahrer und danach an den Kunden (FA-06); der Fahrer nimmt sich sein Exemplar an der Station, so weiß die Annahme, wer was gefahren hat. Das **Liefer-Bargeld läuft auf Papier**; es wird **keine Zahlart und kein Zahlungseingang** für Lieferungen im System erfasst ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 24/25, ADR 0008).

> **Frage an Sirat / architect (offen):** Ist „eigene App" eine eigene **PWA** auf dem Privathandy ([FEST 17] bleibt) oder eine **App-Store-App** ([FEST 17] berührt)? Von Sirat noch nicht beantwortet → `architect` und ausdrückliche Entscheidung von Sirat, bevor die Arbeit an der Fahrer-App beginnt (ADR 0008, „Folgen").

> **Frage an Sirat / architect (K3):** Der Scan setzt die Bestellung auf **Unterwegs**. Beim **Scan lösen** müsste sie zurück auf **Eingegangen** (im Piloten ohne Küchen-Zustände) — das ist ein Rückwärts-Übergang, den die feste Zustandskette (`… Fertig → Unterwegs → Geliefert → Abgerechnet`, [FEST 2], nur vorwärts) nicht vorsieht. Wie wird das Lösen modelliert (eigener protokollierter Pfad wie Storno, oder Zuordnung getrennt vom Status)? → wird in K3 mit `architect` vorbereitet, Sirat entscheidet.

> **Frage an Sirat:** Setzt der Scan die Bestellung sofort auf **Unterwegs**, oder erst ein separates „Losfahren" nach mehreren Scans? (Wirkung: was Küche/Annahme über den Zustand einer bereits gescannten, aber noch nicht ausgelieferten Bestellung sehen.)

> **Frage an Sirat:** Gutscheine — eigene Papier-Gutscheine des Restaurants? Wert- oder Aktionsgutschein? Wie werden sie heute verbucht, und braucht der Kassensturz (FA-10) den vollen Wert oder eine Gutschein-Nummer? (Mitschrift, offene Fragen aus dem Gespräch.)

> **Frage an Sirat:** Bekommt der Kunde mit fluvo weiterhin nur den Bon als Beleg, oder braucht es an der Tür einen TSE-Beleg? → Steuerberaterin (Q2).

## Nicht Teil dieses Anwendungsfalls

- Kunde nicht angetroffen / Adresse falsch → FA-09.
- Kassensturz am Schichtende → FA-10.
- Bon-Druck und QR-Erzeugung → FA-06.
- Fiskalische Signatur/Beleg an der Tür → hängt an Q2, Steuerberaterin.
- Fahrer-GPS / Live-ETA → im MVP nicht gebaut ([Briefing §6], [FEST 12]).
- Wie Abholung/Mitnehmen (ohne „Unterwegs") durch das Zustandsmodell laufen → K3 mit `architect`.
