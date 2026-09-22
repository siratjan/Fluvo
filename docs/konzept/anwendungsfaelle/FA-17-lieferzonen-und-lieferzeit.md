# FA-17: Lieferzonen einstellen (Lieferzeit, Liefergebühr, Mindestbestellwert je Zone)

- **Status:** mit Sirat durchgegangen (Runde 44, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Je Lieferzone (Stadtteil/Ort) sind **drei Werte** hinterlegt — Lieferzeit, Liefergebühr und Mindestbestellwert — sowie je Restaurant ein Abhol-Zeitwert, damit die KI (FA-01) und die Annahme (FA-05) dem Kunden für seine Adresse die richtige Zeit, Gebühr und den geltenden Mindestbestellwert zuordnen. Der **Inhaber** pflegt alle Werte und legt Zonen an/entfernt sie; die **Annahme** ändert im Alltag **nur die Lieferzeit je Zone und den Abhol-Zeitwert**. |
| **Akteur** | Inhaber (alle drei Zonenwerte, Abhol-Zeitwert, Zonen anlegen/entfernen); Annahme (**nur** Lieferzeit je Zone und Abhol-Zeitwert) |
| **Auslöser** | Ein Mitarbeiter/Inhaber öffnet die Zonen-Einstellungen des Restaurants. |
| **Vorbedingungen** | Das Restaurant hat ein Liefergebiet mit Zonen hinterlegt (Onboarding FA-20). Der Bearbeiter ist angemeldet (Tablet/Handy). |
| **Nachbedingungen** | Jede Lieferzone trägt **drei Werte**: Lieferzeit, Liefergebühr und Mindestbestellwert; das Restaurant hat einen Abhol-Zeitwert. KI (FA-01) und Annahme (FA-05) nennen für eine Adresse in einer Zone deren Werte, für Abholung den Abhol-Wert. |

## Ist-Ablauf heute (aus der Mitschrift, Runde 4 und 5)

1. Nach der Lieferzeit fragen rund 90 % der Anrufer; sie wird heute von Hand **geschätzt**.
2. Ein festes Verfahren, wie die Zeit je Ort bestimmt wird, gibt es nicht.

> fluvo ersetzt die Schätzung durch einen vorab eingestellten Wert **je Lieferort/Zone** (Mitschrift Runde 5) und einen eigenen Wert für Abholung je Restaurant (Runde 8). Live-Berechnung nach Auslastung ist laut Briefing V2 (Mitschrift Runde 4).

## Normalablauf

1. Der Mitarbeiter/Inhaber öffnet die Liste der Lieferzonen (Stadtteile/Orte).
2. Zu jeder Zone trägt er die **drei Werte** ein: **Lieferzeit** (aus dem **15-Minuten-Raster**: 15 · 30 · 45 · 1 Std · 1:15 · 1:30 · 1:45 · **2 Std** — Obergrenze 2 Std), **Liefergebühr** und **Mindestbestellwert** ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13: Mindestbestellwert gilt je Zone; Rasterwerte und Obergrenze [ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44).
3. Er trägt einen **Abhol-Zeitwert** für das Restaurant ein („Abholung in ca. X Minuten") — aus dem **10-Minuten-Raster**: 10 · 20 · 30 · 40 · 50 · **60 Min** (Obergrenze 60 Min; [ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44).
4. Das System speichert die Werte.
5. Ab dann nennt die KI/Annahme für eine Adresse in einer Zone deren Lieferzeit, deren Liefergebühr und deren Mindestbestellwert und für Abholung den Abhol-Wert.

## Ausnahmeabläufe

- **2a. Wert im laufenden Betrieb anpassen** (zweigt von Schritt 2 ab): Ein Wert wird geändert (z. B. bei hoher Auslastung). Die **Annahme** darf im Alltag **nur die Lieferzeit je Zone und den Abhol-Zeitwert** ändern; **Liefergebühr und Mindestbestellwert** ändert **nur der Inhaber** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 20 B11 — präzisiert das Betriebsrecht „Zonen" aus Runde 10/11). Ein **bereits laufendes KI-Gespräch bleibt beim Stand vom Gesprächsbeginn**; der neue Wert gilt **ab dem nächsten Anruf** — gleiche Regel wie bei Preisen (FA-12; [ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44). Endet in: geänderter Wert gespeichert, ab dem nächsten Anruf wirksam.
- **1a. Zone ohne vollständige Werte** (zweigt von Schritt 1 ab): Eine Zone hat noch keinen Lieferzeit-Wert, keine Liefergebühr oder keinen Mindestbestellwert.
  - **Fehlende Lieferzeit:** Die KI nennt einen **Standardwert von einer Stunde** („ca. eine Stunde"), und die **Annahme bekommt einen Hinweis**, dass die Zone keinen Lieferzeit-Wert hat (damit sie ihn nachträgt). Kein Übergeben an einen Menschen, keine Ablehnung ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44). Der Standardwert wird **nie still** gesetzt — der Hinweis ist Pflicht.
  - **Fehlende Liefergebühr oder Mindestbestellwert:** Hier gibt es **keinen sinnvollen Standard** — der fehlende Wert muss auffallen; die KI **übergibt an einen Menschen** (FA-03) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44, bestätigt Runde 48).
  - Endet in: fehlende Lieferzeit → „ca. eine Stunde" genannt + Hinweis an die Annahme; fehlende Gebühr/Mindestbestellwert → Übergabe an einen Menschen (FA-03).
- **1b. Neue Zone hinzufügen / Zone entfernen** (zweigt von Schritt 1 ab): Das Liefergebiet und seine Zonen pflegt **nur der Inhaber** — **nicht** die Annahme ([ENTSCHIEDEN Sirat 2026-09-18, Runde 2]; bestätigt [ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 20 B11). Eine Zone wird als **Ortsteil/Stadtteil** beschrieben (z. B. „Ortsteil A", „Ortsteil B"), **nicht** als auf einer Karte gezeichnete Fläche ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B18). Endet in: geändertes Liefergebiet; jede neue Zone braucht die drei Werte (sonst 1a).

## Darf nicht

- Die KI/Annahme nennt **keine erfundene Zeit, Gebühr oder Mindestbestellwert**, sondern nur die eingestellten Werte der Zone ([FEST 8], Gehirn vs. Hände).
- Der Server prüft den **Mindestbestellwert je Zone**; unterschreitet eine Lieferbestellung ihn, wird sie **nicht** als Lieferung angenommen — der Client/die KI entscheidet das nicht ([FEST 8], Gehirn vs. Hände; Summenprüfung im Kern).
- Eine fehlende **Lieferzeit** darf mit dem **Standardwert „eine Stunde"** belegt werden — aber **nie still**: Die **Annahme bekommt einen Hinweis**, dass die Zone keinen Lieferzeit-Wert hat ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44; nichts verschwindet lautlos).
- Eine fehlende **Liefergebühr oder Mindestbestellwert** wird **nicht** stillschweigend mit einem Standardwert belegt und **nicht** erraten; der fehlende Wert muss auffallen, die KI übergibt an einen Menschen (FA-03) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44, bestätigt Runde 48).
- Die Zonenwerte gelten **je Restaurant**; Restaurant A sieht oder ändert **nicht** die Werte von B ([FEST 4]).
- Der Bearbeiter ändert **nicht** die Grenzen des Liefergebiets, wenn ihm dafür die Rechte fehlen (Liefergebiet pflegt der Inhaber, [ENTSCHIEDEN Sirat 2026-09-18, Runde 2]).
- Die **Annahme** ändert **keine Liefergebühr und keinen Mindestbestellwert** und legt **keine Zonen** an/entfernt keine — das darf **nur der Inhaber**; die Annahme darf **nur** die **Lieferzeit je Zone und den Abhol-Zeitwert** ändern ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 20 B11; bestätigt Runde 27 B11).
- Die **KI/Annahme rät den Ortsteil einer Adresse nicht**; die Zuordnung Adresse → Ortsteil macht der Geocoder (Q6). Lässt sich eine Adresse keinem hinterlegten Ortsteil zuordnen, wird kein Ortsteil erfunden — die KI übergibt an einen Menschen (FA-03) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B18; [FEST 8], Gehirn vs. Hände).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Jede Zone trägt **drei Werte**: Lieferzeit, Liefergebühr, Mindestbestellwert (je Restaurant/Lieferservice unterschiedlich) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 13 |
| Lieferzeit je Zone, vorab eingestellt; die KI nennt diesen Wert | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 5 |
| Zonen = Stadtteile bzw. andere Orte mit unterschiedlicher Dauer | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Eigener Abhol-Zeitwert je Restaurant („Abholung in ca. X Minuten") | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 8 |
| Liefergebiet, Mindestbestellwert, Liefergebühr pflegt der Inhaber selbst | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 2 |
| Die Annahme hat Inhaber-**Betriebsrechte**, **nicht** die Geld-Bestätigung — die bleibt beim Inhaber | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 10/11 |
| Bei den Zonen darf die Annahme **nur die Lieferzeit je Zone und den Abhol-Zeitwert** ändern; **Liefergebühr, Mindestbestellwert und Zonen anlegen/entfernen: nur der Inhaber** (präzisiert das Betriebsrecht „Zonen") | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 20 (B11) |
| Liefergebühr kann je Ort/Zone unterschiedlich sein; wird beim Onboarding aufgenommen (FA-20) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 10 |
| Mindestbestellwert gilt **je Zone** und ist je Restaurant unterschiedlich | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 13 |
| Der Mindestbestellwert bezieht sich auf den **Warenwert** (Summe der Artikel), **ohne** Liefergebühr — die Gebühr wird zum Vergleich nicht mitgezählt | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 23 (B17), bestätigt Runde 27 |
| Eine Zone wird als **Ortsteil/Stadtteil** beschrieben, **nicht** als gezeichnete Fläche; das System ordnet eine genannte Adresse einem Ortsteil zu (Geocoder → Q6), die KI rät den Ortsteil **nie** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 28 (B18) |
| Eine Adresse **außerhalb aller Zonen** wird regulär **nicht** als Lieferung angenommen; über eine **Ausnahme** (dorthin trotzdem liefern) entscheidet die **Annahme** von Hand — die KI sagt ab und eskaliert (FA-01 Ausnahme 7a, FA-03 Grund 8, FA-05). Dabei gibt die Annahme die **Liefergebühr von Hand** ein und wählt die **Lieferzeit aus dem 15-Minuten-Raster** (FA-05); dieselbe Regel **gilt auch bei einer Adressänderung** (FA-11) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 33, Werte Runde 39, Adressänderung Runde 40 |
| **Lieferzeit je Zone** wird auf dem **15-Minuten-Raster** (15 · 30 · 45 · 1 Std · 1:15 · 1:30 · 1:45 · **2 Std**; Obergrenze **2 Std**), der **Abhol-Zeitwert** auf dem **10-Minuten-Raster** (10 · 20 · 30 · 40 · 50 · **60 Min**; Obergrenze **60 Min**) gepflegt — damit die Werte mit der Auswahl bei der Handannahme (FA-05) zusammenpassen | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 39 (Raster), Runde 44 (Obergrenzen) |
| Fehlt einer Zone die **Lieferzeit**, nennt die KI den **Standardwert „eine Stunde"** („ca. eine Stunde") und die **Annahme bekommt einen Hinweis** (nicht still) — keine Ablehnung, keine Übergabe deswegen | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 44 |
| Fehlt einer Zone **Liefergebühr oder Mindestbestellwert**, gibt es **keinen Standard** — die KI übergibt an einen Menschen (FA-03) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 44, bestätigt Runde 48 |
| Bei einer **Vorbestellung** nennt die KI die **gewünschte Uhrzeit** als Zusage, **nicht** die Zonen-Lieferzeit („muss flexibel sein") | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 44 |
| Öffnungszeiten, Ruhetage, Urlaub müssen gepflegt sein (für Vorbestellung, FA-01) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 7 (Nachtrag) |
| Bedienbar auf Tablet/Handy, ohne Schulung | [FEST] | Briefing §1, §9.9; Mitschrift Runde 2 |
| Live-Lieferzeit nach Auslastung (statt fester Wert) | [OFFEN] | V2, Briefing §5.4; Mitschrift Runde 4 |
| Ein geänderter Zeitwert gilt **nicht** für ein laufendes KI-Gespräch — dieses bleibt beim Stand vom Gesprächsbeginn, der neue Wert wirkt **ab dem nächsten Anruf** (wie die Preisregel FA-12) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 44 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall, zwei Zonen mit je drei Werten | Zone „Testviertel-Nord" 30 Min / 2,50 € / MBW 15,00 €; Zone „Testviertel-Süd" **45 Min** (Rasterwert) / 4,00 € / MBW 25,00 € | KI/Annahme ordnen einer Adresse je Zone die richtige Lieferzeit, Gebühr und den Mindestbestellwert zu; die Lieferzeiten liegen auf dem 15er-Raster | Falsche Zone/Werte genannt; erfundene Werte; rasterfremde Lieferzeit | manuell + automatisch (mit FA-01) |
| Mindestbestellwert je Zone (Grenzfall) | Gleiche Bestellung 20,00 € Warenwert; Adresse in Zone Nord (MBW 15,00 €) vs. Adresse in Zone Süd (MBW 25,00 €) | In Zone Nord annehmbar (über MBW), in Zone Süd **nicht** als Lieferung annehmbar (unter MBW) — der Server prüft je Zone | Bestellung in Zone Süd trotz Unterschreitung annehmen; MBW über Zonen vermischen | automatisch |
| Mindestbestellwert = Warenwert ohne Liefergebühr (Rechenbeispiel) | Zone Nord MBW 15,00 €, Liefergebühr 2,50 €; Bestellung mit **Warenwert 14,00 €** (Rechnungssumme mit Gebühr 16,50 €) | Bestellung **unter** MBW (14,00 < 15,00) — obwohl die Rechnungssumme 16,50 € über 15,00 € läge; die Liefergebühr zählt **nicht** mit | Liefergebühr zum MBW-Vergleich addieren; Bestellung fälschlich annehmen | automatisch |
| Abholzeit setzen | Abhol-Wert „ca. 20 Minuten" | KI/Annahme nennen bei Abholung 20 Minuten | Zonen-Lieferzeit statt Abhol-Wert genannt | manuell + automatisch |
| Raster-Obergrenzen (Grenzfall) | Auswahl der Lieferzeit bis **2 Std** (15er-Schritte) und des Abhol-Werts bis **60 Min** (10er-Schritte) | Werte bis zur Obergrenze wählbar; darüber hinaus (z. B. 2:15 Std, 70 Min) und rasterfremde Werte (z. B. 37 Min) sind **nicht** wählbar | Wert über der Obergrenze oder abseits des Rasters annehmen | automatisch |
| Wert anpassen (laufendes Gespräch) | Zone-Nord von 30 auf 45 Min geändert, während ein KI-Gespräch bereits läuft | Das laufende Gespräch bleibt bei 30 Min (Stand vom Gesprächsbeginn); erst der **nächste** Anruf nutzt 45 Min | Laufendes Gespräch auf 45 Min umstellen; alter Wert nach dem nächsten Anruf | automatisch |
| Annahme-Rechte an den Zonenwerten (B11) | Annahme (Betriebsrechte) versucht, Liefergebühr/Mindestbestellwert von Zone-Nord zu ändern und eine Zone anzulegen; ändert außerdem die Lieferzeit von Zone-Nord | Liefergebühr/Mindestbestellwert **nicht** änderbar, Zone **nicht** anlegbar (nur Inhaber); **Lieferzeit ändern gelingt** | Annahme ändert Liefergebühr/Mindestbestellwert oder legt Zonen an | automatisch |
| Zone ohne Lieferzeit (Grenzfall) | Neue Zone „Testdorf" mit Gebühr und Mindestbestellwert, aber **ohne Lieferzeit** | KI nennt „ca. eine Stunde"; die Annahme bekommt einen **Hinweis**, dass die Zone keinen Lieferzeit-Wert hat; keine Ablehnung, keine Übergabe | Standardwert **still** setzen (ohne Hinweis); erfundene konkrete Zeit; Übergabe/Ablehnung nur wegen fehlender Lieferzeit | manuell + automatisch |
| Zone ohne Gebühr/Mindestbestellwert (Grenzfall) | Neue Zone „Testdorf" **ohne Liefergebühr oder Mindestbestellwert** | Kein Standard; die KI übergibt an einen Menschen (FA-03) | Stiller Standardwert; erfundener Wert; Bestellung stillschweigend annehmen | manuell + automatisch |
| Ortsteil-Zuordnung per Geocoder (B18) | Zonen als „Ortsteil A" (keine Gebühr) und „Ortsteil B" (Gebühr) hinterlegt; Anrufer nennt eine Adresse, die der Geocoder Ortsteil B zuordnet | System ordnet die Adresse Ortsteil B zu und nennt dessen Werte; KI nennt keinen Ortsteil von sich aus | KI rät den Ortsteil; Adresse einem falschen/erfundenen Ortsteil zugeordnet | automatisch (mit FA-01) |
| Adresse keinem Ortsteil zuzuordnen (Grenzfall, B18) | Anrufer nennt eine Adresse, die der Geocoder keinem hinterlegten Ortsteil zuordnen kann | KI erfindet keinen Ortsteil, übergibt an einen Menschen (FA-03) | Ortsteil raten; Bestellung stillschweigend annehmen | automatisch (mit FA-01/FA-03) |
| Zwei-Restaurant-Fall | Restaurant A: Nord 30 Min / MBW 15,00 €; Restaurant B: Nord 60 Min / MBW 20,00 €; A ändert A-Nord | Jede KI nutzt die Werte des eigenen Restaurants; A ändert B nicht und sieht B nicht | Übergriff auf fremden Tenant; vermischte Werte | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Stammdatenpflege → Lieferzonen/-zeit einstellen" (K2 noch offen)
- **Zustandsübergänge:** keiner an einer Bestellung — Stammdatenänderung; liefert die Werte für FA-01 (Schritt 8) und FA-05 (Schritt 5).
- **Technische Anwendungsfälle:** TU-? (die drei Zonenwerte — Lieferzeit, Liefergebühr, Mindestbestellwert — je Zone speichern/lesen, Abhol-Wert je Restaurant, Zone zu Adresse, Mindestbestellwert-Prüfung je Zone im Kern; Zuordnung in K7)
- **Verträge / Events:** vorläufig `delivery_zone.updated`, `pickup_time.updated` (Namen offen, K6); nutzt Liefergebiet/PostGIS ([Briefing §4]); Mindestbestellwert-Prüfung fließt in `create_order` (FA-01/FA-05)
- **Testszenarien:** FA-17-T1 … FA-17-T10 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI nennt Lieferzeit/Abholzeit; Adresse außerhalb der Zonen → KI sagt ab/eskaliert, Ausnahme 7a), FA-03 (Ausnahme Liefergebiet → Annahme entscheidet, Grund 8), FA-05 (Annahme nennt die Werte und darf außerhalb der Zonen als Ausnahme anlegen), FA-12 (Speisekarte/Preise, weitere Inhaber-Selbstbedienung), FA-18 (Öffnungszeiten/Ruhetage/Urlaub, gleiche Rechte), FA-20 (Onboarding legt Liefergebiet/Zonen an)

## Offene Fragen

> **Beantwortet (Runde 44):** Ein **geänderter Zeitwert** gilt **nicht sofort** für ein laufendes KI-Gespräch — dieses bleibt beim Stand vom Gesprächsbeginn, der neue Wert wirkt ab dem nächsten Anruf (wie die Preisregel FA-12).

> **Beantwortet (Runde 44):** Fehlt einer **Zone die Lieferzeit**, nennt die KI „ca. eine Stunde" und die Annahme bekommt einen Hinweis (nicht still) — keine Ablehnung, keine Übergabe. Fehlt Liefergebühr oder Mindestbestellwert, gibt es keinen Standard und die KI übergibt an einen Menschen (FA-03).

> **Beantwortet (Runde 44):** Bei einer **Vorbestellung** nennt die KI die **gewünschte Uhrzeit** als Zusage, nicht die Zonen-Lieferzeit („muss flexibel sein").

> **Beantwortet (Runde 44, bestätigt Runde 48):** Bei fehlender **Liefergebühr oder Mindestbestellwert** übergibt die KI an einen Menschen (FA-03) — der Standardwert „ca. eine Stunde" gilt nur bei fehlender Lieferzeit ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

## Nicht Teil dieses Anwendungsfalls

- **Liefergebiet-Grenzen** (Geometrie der Zonen) anlegen/ändern → Inhaber-Selbstbedienung (Rechte-Tabelle Runde 2); Ersteinrichtung im Onboarding FA-20. (Die drei Zonenwerte Lieferzeit, Liefergebühr, Mindestbestellwert sind Teil **dieses** Falls.)
- **Öffnungszeiten, Ruhetage, Urlaub** pflegen → **FA-18** (Voraussetzung für die Vorbestellung, FA-01).
- **Speisekarte und Preise** pflegen → FA-12.
- **Live-Lieferzeit nach Auslastung / Live-ETA** → V2 ([FEST 12], Briefing §5.4).
- Wie die Zone zu einer Adresse bestimmt wird (Geocoder, PostGIS) → K6/K7, hängt an Q6.
