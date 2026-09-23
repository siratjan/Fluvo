# FA-24: Bekannte Lieferorte pflegen und nutzen

- **Status:** Entwurf (aus Kreuzverhör FA-01, Runde 51) — mit Sirat noch nicht einzeln durchgegangen
- **Stand:** 2026-09-23

| | |
|---|---|
| **Ziel** | Das Restaurant pflegt eine Liste von Orten, die Anrufer statt einer Straße nennen („Firma Soundso", „am See wie immer", „Baustelle Hauptstraße"), sodass die KI und die Annahme diese Orte **wiedererkennen** und eine Lieferung **ohne erneutes Erfragen der Adresse** aufnehmen können. |
| **Akteur** | Inhaber, Annahme, KI-Assistent |
| **Auslöser** | Der Inhaber oder die Annahme legt einen bekannten Lieferort an bzw. speichert ihn aus einem Anruf; **oder** ein Anrufer nennt im Gespräch einen Ort statt einer Adresse (Nutzung durch die KI, FA-01 Schritt 6/7). |
| **Vorbedingungen** | Das Restaurant ist angelegt, Liefergebiet mit Zonen (FA-17) ist hinterlegt. Der Bearbeiter ist angemeldet (Inhaber per E-Mail-Link; Annahme per PIN + registriertes Gerät). |
| **Nachbedingungen** | In der Liste bekannter Lieferorte des Restaurants existiert ein Eintrag mit **Name, Zone, Fahrer-Hinweis** und **optional Adresse**; **oder** eine Bestellung wurde einem bekannten Lieferort zugeordnet (ohne dass die KI einen Ort geraten hat). Ein bekannter Lieferort ist **nur** beim eigenen Restaurant sichtbar ([FEST 4]). |

## Ist-Ablauf heute (aus der Mitschrift, Runde 51)

Anrufer nennen beim Piloten oft **keinen Straßennamen**, sondern einen Ort, den das Restaurant kennt („Firma Soundso", „am See wie immer", „Baustelle Hauptstraße"). Heute weiß der Kollege am Telefon aus Erfahrung, wo das ist, und schreibt es auf den Zettel. fluvo bildet dieses Erfahrungswissen als **Liste bekannter Lieferorte** ab, damit auch die KI den Ort auflösen kann ([ENTSCHIEDEN Sirat 2026-09-23], Mitschrift Runde 51).

## Normalablauf (bekannten Lieferort anlegen)

1. Der **Inhaber** oder die **Annahme** öffnet die Liste bekannter Lieferorte des Restaurants.
2. Der Bearbeiter legt einen Eintrag an mit **Name** (der genannte Ort), **Zone** (aus dem Liefergebiet, FA-17), **Fahrer-Hinweis** (z. B. „Tor 2, beim Pförtner") und **optional einer Adresse** ([ENTSCHIEDEN Sirat 2026-09-23], Mitschrift Runde 51).
3. Das System speichert den Eintrag beim Restaurant. Ab jetzt kann die KI (FA-01) und die Annahme (FA-05) diesen Ort **wiedererkennen**.

## Ausnahmeabläufe

- **N. Nutzung durch die KI** (aus FA-01 Schritt 6/7): Ein Anrufer nennt einen Ort statt einer Adresse. Die KI **gleicht** den genannten Ort mit der Liste ab — **Treffer aus der Liste, kein Raten** (B18). Bei einem Treffer bestätigt die KI den Ort, übernimmt dessen **Zone** und braucht **keine Adresse**. Endet in: Lieferung mit aufgelöstem Ort (zurück in FA-01).
- **S. Stammkunde hat einen Ort statt einer Adresse** (FA-02): Ein Stammkunde (Erkennung nur per Rufnummer, [FEST 15]) kann im Kundeneintrag statt einer Adresse einen **Ort** hinterlegt haben. Die KI nutzt ihn wie einen bekannten Lieferort. Endet in: Lieferung mit aufgelöstem Ort.
- **U. Unbekannter Ort** (aus FA-01 Ausnahme 7b): Nennt der Anrufer einen Ort, der **weder in der Liste** noch **im Kundeneintrag** noch **beim Geocoder** auflösbar ist, fragt die KI **einmal** nach (Straße in der Nähe / Ortsteil). Bleibt der Ort unbekannt, **übergibt die KI an die Annahme** → **FA-03** (Grund „Adresse nicht auflösbar"). Die Annahme legt die Bestellung von Hand an (FA-05 4a) und kann den Ort dabei **sofort als bekannten Lieferort speichern**, damit die KI ihn künftig kennt ([ENTSCHIEDEN Sirat 2026-09-23], Mitschrift Runde 51). Endet in: Übergabe an die Annahme; Ort ggf. neu in der Liste.

## Darf nicht

- Die KI **rät** einen Ort **nie** — sie nimmt nur **Treffer aus der Liste** (oder aus dem Kundeneintrag / vom Geocoder) ([ENTSCHIEDEN Sirat 2026-09-23], Mitschrift Runde 51; B18, [FEST 8]).
- Die KI legt **nie** eine Liefer-Bestellung mit einem Ort an, der **weder in der Liste noch im Kundeneintrag noch beim Geocoder auflösbar** ist — sie übergibt an die Annahme (FA-01 7b) ([ENTSCHIEDEN Sirat 2026-09-23], Mitschrift Runde 51).
- Ein bekannter Lieferort eines Restaurants ist bei einem **anderen** Restaurant **nicht** sichtbar ([FEST 4], Briefing §6).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| **Liste bekannter Lieferorte je Restaurant** mit **Name, Zone, Fahrer-Hinweis**, **optional Adresse** | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51 |
| **Anlegen** dürfen **Inhaber und Annahme** | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51 |
| KI **gleicht ab** — **Treffer aus der Liste, kein Raten**; bei Treffer keine Adresse nötig, Zone aus dem Eintrag | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51 |
| Stammkunde (FA-02) kann statt einer Adresse einen **Ort** hinterlegt haben | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51 |
| **Unbekannter Ort:** einmal nachfragen, sonst Übergabe an die Annahme (FA-01 7b); die Annahme kann beim Anlegen **sofort** als bekannten Lieferort speichern | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51 |
| KI legt **nie** eine Liefer-Bestellung mit unauflösbarem Ort an | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51 |
| **Fahrer-Hinweis** des bekannten Lieferorts steht auf dem **Bon** (FA-06) | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51 |
| Bekannte Lieferorte optional im **Onboarding** anlegbar | [ENTSCHIEDEN Sirat 2026-09-23] | Mitschrift Runde 51 (→ FA-20) |
| Mandantentrennung: bekannter Lieferort nur beim eigenen Restaurant sichtbar | [FEST] | Briefing §2.4, §6 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| FA-24-T1 · Bekannten Lieferort anlegen (Inhaber) | Inhaber legt „Testfirma Nord" an: Zone „Ortsteil A", Fahrer-Hinweis „Tor 2, beim Pförtner", ohne Adresse | Eintrag gespeichert; ab jetzt für KI/Annahme auffindbar | Eintrag ohne Zone; Eintrag bei fremdem Restaurant sichtbar | manuell + automatisch |
| FA-24-T2 · Bekannten Lieferort anlegen (Annahme) | Annahme (Betriebsrecht) legt „Baustelle Teststraße" an | Eintrag gespeichert; die Annahme darf anlegen | Annahme darf nicht anlegen | manuell + automatisch |
| FA-24-T3 · KI nutzt Treffer (kein Raten) | Anrufer nennt „Testfirma Nord"; Eintrag existiert | KI findet den Treffer, bestätigt den Ort, übernimmt dessen Zone, fragt keine Adresse ab | Ort raten; falscher/erfundener Ort; Adresse trotz Treffer verlangen | Testanruf + automatisch |
| FA-24-T4 · Stammkunde mit Ort statt Adresse (FA-02) | Stammkunde `+49 30 23125 241` mit hinterlegtem Ort ruft an | KI erkennt den Kunden per Rufnummer, nutzt den hinterlegten Ort wie einen bekannten Lieferort | Adresse neu erfragen, obwohl ein Ort hinterlegt ist | Testanruf + automatisch |
| FA-24-T5 · Unbekannter Ort → Übergabe (FA-01 7b) | Anrufer nennt „am alten Turm"; nicht in Liste, Kundeneintrag oder Geocoder auflösbar | KI fragt einmal nach; ohne Auflösung Übergabe an die Annahme (FA-03 „Adresse nicht auflösbar") | Liefer-Bestellung mit unauflösbarem Ort anlegen; Ort raten | Testanruf + automatisch |
| FA-24-T6 · Annahme speichert Ort sofort beim Anlegen | Nach Übergabe (T5) legt die Annahme von Hand an und speichert „am alten Turm" als bekannten Lieferort | Bestellung angelegt (FA-05); neuer Eintrag in der Liste; künftig für die KI auffindbar | Ort geht ohne Speichermöglichkeit verloren | manuell + automatisch |
| FA-24-T7 · Fahrer-Hinweis auf dem Bon | Liefer-Bestellung an „Testfirma Nord" mit Fahrer-Hinweis | Der Fahrer-Hinweis erscheint auf dem Bon (FA-06) | Fahrer-Hinweis fehlt auf dem Bon | manuell am Gerät + automatisch |
| FA-24-T8 · Zwei-Restaurant-Fall | Restaurant A „Musterpizza" hat „Testfirma Nord"; Restaurant B „Testdöner" ruft dieselbe Bezeichnung nicht ab; Testrufnummer `+49 30 23125 242` | Der bekannte Lieferort von A ist nur bei A sichtbar; B findet ihn nicht | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Stammdatenpflege → bekannte Lieferorte" und „KI-Gespräch → Ort auflösen" (K2 noch offen)
- **Zustandsübergänge:** keiner an einer Bestellung — Stammdatenpflege; die Nutzung wirkt auf `createOrder` (Adresse/Ort → Zone)
- **Technische Anwendungsfälle:** TU-? (bekannten Lieferort anlegen/ändern; Function Call `resolve_delivery_place` der KI — Abgleich mit der Liste, kein Raten; Zuordnung in K7)
- **Verträge / Events:** vorläufig `delivery_place.upserted`; die Nutzung fließt in `order.created` (aufgelöste Zone). Datenklasse des Eintrags (kann Personenbezug tragen) → K5. (K6 noch offen)
- **Testszenarien:** FA-24-T1 … FA-24-T8 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI nutzt den Ort, Schritt 6/7, Ausnahme 7b), FA-02 (Stammkunde mit Ort statt Adresse), FA-03 (Übergabe „Adresse nicht auflösbar"), FA-05 (Annahme legt von Hand an und speichert den Ort), FA-06 (Fahrer-Hinweis auf dem Bon), FA-17 (Zone), FA-20 (Onboarding, optional bekannte Lieferorte)

## Offene Fragen

> **Frage an Sirat:** Wer darf einen bekannten Lieferort **ändern und entfernen** — Inhaber und Annahme (wie beim Anlegen) oder nur der Inhaber? In Runde 51 ist nur das **Anlegen** (Inhaber und Annahme) entschieden; Ändern/Entfernen wurde nicht genannt. (Wirkung: Betriebs-/Geldrecht-Zuordnung, K9.)

> **Frage an Sirat / Anwalt (Q10):** Ein bekannter Lieferort kann **Personenbezug** tragen (Firmenname, Kundenbezeichnung, Fahrer-Hinweis mit Namen). Welche **Datenklasse** und welche **Löschfrist** gelten für die Liste? (Datensparsamkeit, Löschkonzept — nicht in Runde 51 entschieden.)

> **Frage an Sirat:** Soll der **Fahrer-Hinweis** dem Anrufer am Telefon **vorgelesen** werden, oder erscheint er **nur auf dem Bon** für den Fahrer? In Runde 51 ist nur „auf dem Bon" genannt. (Wirkung: Gesprächsdesign K4.)

## Nicht Teil dieses Anwendungsfalls

- **Nutzung** des Ortes im laufenden KI-Gespräch im Detail (Wortlaut, Rückfragen) → FA-01 / K4.
- Zuordnung Adresse → Ortsteil per Geocoder → FA-01 (7), FA-17, Q6.
- Stammkunden-Erkennung und -Ablauf → FA-02.
- Bon-Layout (wo der Fahrer-Hinweis steht) → FA-06 / K10.
