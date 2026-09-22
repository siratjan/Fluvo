# FA-09: Kunde nicht angetroffen / Adresse falsch

- **Status:** Entwurf — zurückgestellt
- **Stand:** 2026-09-21

> **Zurückgestellt (ADR 0008, 2026-09-21):** Der Fahrer-Teil kommt nach dem ersten Piloten als eigene App. Dieser Entwurf bleibt als Grundlage erhalten, wird für den ersten Piloten aber weder abgenommen noch gebaut. Im ersten Piloten: zwei Bons bei Lieferung, Liefer-Bargeld auf Papier (FA-06).

> **ADR 0011 (2026-09-22): Inhaber-Bereich auch vom registrierten Handy** — beim Wiederaufnehmen nachziehen.

| | |
|---|---|
| **Ziel** | Kann eine Liefer-Bestellung nicht zugestellt werden (niemand da, Adresse falsch, Kunde nicht erreichbar), endet sie in einem benannten Zustand „nicht zustellbar", dokumentiert an der Bestellung — sie verschwindet nicht lautlos und zählt nicht als kassiertes Bargeld. Der Fahrer meldet, der **Inhaber bestätigt** das Ende ohne Bezahlung. |
| **Akteur** | Fahrer (meldet), Inhaber (bestätigt) |
| **Auslöser** | Der Fahrer ist an der Lieferadresse und kann nicht übergeben: niemand öffnet, die Adresse existiert nicht oder passt nicht, der Kunde ist nicht erreichbar. |
| **Vorbedingungen** | Die Bestellung ist Bestellart **Lieferung**, Status **Unterwegs**, dem Fahrer zugeordnet (FA-08). Die Rufnummer des Kunden steht auf dem Bon (FA-06). |
| **Nachbedingungen** | Der Fahrer hat die Bestellung als **nicht zustellbar** gemeldet und der **Inhaber hat das Ende ohne Bezahlung bestätigt**. Erst danach endet die Bestellung in einem benannten Zustand **„nicht zustellbar"**, an der Bestellung dokumentiert. Für diese Bestellung wurde **kein Bargeld** kassiert; sie geht nicht in den zurückzugebenden Betrag des Kassensturzes (FA-10) ein. |

## Ist-Ablauf heute (aus der Mitschrift, Runde 6)

1. Die Rufnummer des Kunden steht auf dem Zettel.
2. Der Fahrer ruft an und wartet ab.
3. Im schlimmsten Fall kehrt der Fahrer zurück, und das Essen wird weggeworfen.

> Heute gibt es dafür kein festes Ende und keine Dokumentation. fluvo braucht ein benanntes Ende „nicht zustellbar" (Mitschrift Runde 6). Wie lange gewartet wird, wer die Rückkehr entscheidet und ob es einen zweiten Versuch gibt, ist offen (siehe Offene Fragen).

## Normalablauf

1. Der Fahrer ist an der Adresse; niemand öffnet oder die Adresse passt nicht.
2. Der Fahrer ruft die auf dem Bon stehende **Rufnummer des Kunden** an.
3. Der Fahrer wartet (Dauer offen, siehe Offene Fragen).
4. Der Kunde meldet sich nicht und kommt nicht.
5. Der Fahrer meldet die Bestellung in der PWA als **„nicht zustellbar"**.
6. Der **Inhaber bestätigt**, dass die Bestellung ohne Bezahlung endet. Erst diese Bestätigung setzt den Endzustand „nicht zustellbar" ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 10 — dass eine Bestellung ohne Bezahlung endet, bestätigt der Inhaber, nicht der Fahrer allein).
7. Das System dokumentiert das an der Bestellung; sie zählt **nicht** als bar kassiert (FA-10).

## Ausnahmeabläufe

- **4a. Kunde meldet sich doch / kommt heraus** (zweigt von Schritt 4 ab): Der Fahrer übergibt das Essen und kassiert wie üblich (FA-08, Schritt 5–6). Endet in: Bestellung **Geliefert**, Zahlart erfasst — nicht dieser Fall.
- **4b. Kunde nennt am Telefon eine korrigierte Adresse** (zweigt von Schritt 4 ab): Der Fahrer erhält eine andere Adresse in der Nähe. Ob er selbst dorthin weiterfahren darf oder ob das über die Annahme läuft, ist offen (siehe Offene Fragen). Endet in: entweder Zustellung an der korrigierten Adresse (FA-08) oder „nicht zustellbar" (Schritt 5).
- **4c. Zweiter Zustellversuch** (zweigt von Schritt 4 ab): Ob ein zweiter Versuch vorgesehen ist und wer ihn entscheidet, ist offen (siehe Offene Fragen). Endet in: offen — bis dahin führt der Fall zu „nicht zustellbar" (Schritt 5).
- **5a. Internet weg beim Melden/Bestätigen** (zweigt von Schritt 5/6 ab): Die PWA nimmt Meldung bzw. Inhaber-Bestätigung in die Warteschlange und spielt sie bei Verbindung nach ([FEST 18], Idempotenz-Schlüssel). Endet in: kein Datenverlust; Zustand nach Nachspielen der Inhaber-Bestätigung gesetzt.
- **6a. Inhaber bestätigt (noch) nicht** (zweigt von Schritt 6 ab): Die Bestätigung des Endes ohne Bezahlung macht **nur der Inhaber** in seinem **Inhaber-Bereich**, den er mit **seinem Code** am **Hauptgerät** im Laden öffnet; es gibt **keine Vertretung** ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 16). Ist der Inhaber nicht da, bleibt der Vorgang **offen**: Die Bestellung bleibt in der Meldung „nicht zustellbar" und ist **nicht** abgeschlossen; nichts wird still verbucht. Endet in: gemeldet, aber ohne Inhaber-Bestätigung — bleibt sichtbar bis zur Bestätigung (Ende des Ausnahmepfads offen, siehe Offene Fragen). *(Ob der Inhaber auch von unterwegs bestätigen kann, ist offen — siehe Offene Fragen.)*

## Darf nicht

- Eine nicht zustellbare Bestellung **verschwindet nicht lautlos**; sie endet in einem benannten, dokumentierten Zustand.
- Der **Fahrer** erledigt eine Bestellung **nicht allein** als unbezahlt / nicht zustellbar; erst der **Inhaber** bestätigt das Ende ohne Bezahlung ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 10).
- Die **Annahme** bestätigt eine unbezahlte / nicht zustellbare Bestellung **nicht** selbst; das ist ein Geldrecht des Inhabers ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 11).
- Der nicht kassierte Betrag geht **nicht** in den zurückzugebenden Betrag des Fahrers ein ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 5/6 → FA-10: nur bar Kassiertes zählt).
- „Nicht zustellbar" wird **nicht** als „Geliefert" gebucht.
- Der Fahrer verändert den auf dem Bon stehenden Betrag **nicht** ([FEST 8]).
- Der Fahrer sieht **keine** Bestellungen eines anderen Restaurants ([FEST 4]).
- Das Ereignis wird **nur angefügt**, nicht geändert oder gelöscht ([FEST 6]).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Rufnummer des Kunden steht auf dem Bon (der Fahrer ruft an) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Benanntes Ende „nicht zustellbar", an der Bestellung dokumentiert | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 6 |
| Dass eine Bestellung ohne Bezahlung endet, bestätigt der **Inhaber**; der Fahrer meldet nur (nicht der Fahrer allein) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 10 |
| Geldrechte hat **nur der Inhaber** (u. a. Bestellung als „nicht bezahlt"/„nicht zustellbar" bestätigen); die Annahme hat nur Betriebsrechte. Steht der Inhaber selbst an der Annahme, meldet er sich als Inhaber an | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 11 |
| Bestätigt wird **nur im Inhaber-Bereich** am **Hauptgerät** im Laden, den der Inhaber mit **seinem Code** öffnet; **keine Vertretung**. Ist er nicht da, bleibt der Vorgang offen | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 16 |
| Nicht zustellbare Bestellung zählt nicht als bar kassiert (kein Bargeld) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 5/6 (Folge aus FA-10) |
| Ereignisprotokoll unveränderlich (Append-only, GoBD) | [FEST] | Briefing §2.6, §4 |
| Offline-Erfassung bei Internetausfall | [FEST] | Briefing §2.18, §5.5 |
| Wie „nicht zustellbar" in der festen Statuskette modelliert wird | [OFFEN] Q3 | open-questions.md Q3 / K3 mit `architect` |
| Fiskalische Behandlung einer nicht zustellbaren (ggf. bereits signierten) Bestellung | [OFFEN] Q2 | open-questions.md Q2 (Steuerberaterin) |
| Wartezeit an der Tür, Rückkehr-Entscheidung, zweiter Versuch | [OFFEN] | Frage an Sirat |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall nicht angetroffen | Fahrer an der Adresse, niemand öffnet, Anruf ohne Antwort, meldet „nicht zustellbar", **Inhaber bestätigt** | Bestellung im Zustand „nicht zustellbar", an der Bestellung dokumentiert | Bestellung verschwindet lautlos; als „Geliefert" gebucht; Abschluss ohne Inhaber-Bestätigung | manuell am Gerät + automatisch |
| Fahrer kann nicht allein abschließen | Fahrer meldet „nicht zustellbar", Inhaber bestätigt **nicht** | Bestellung bleibt gemeldet, aber offen; nicht abgeschlossen | Fahrer schließt allein als unbezahlt ab; still verbucht | manuell + automatisch |
| Kunde meldet sich doch (Ausnahme) | Nach dem Anruf öffnet der Kunde | Bestellung **Geliefert**, Zahlart erfasst (FA-08) | „nicht zustellbar" trotz Übergabe | manuell |
| Adresse falsch, keine Korrektur | Adresse existiert nicht, Kunde nicht erreichbar, gemeldet, Inhaber bestätigt | Bestellung „nicht zustellbar", dokumentiert | Betrag verändert; als kassiert gewertet | manuell + automatisch |
| Nicht zustellbar geht nicht in Kassensturz (Grenzfall) | 1 Bestellung „nicht zustellbar", Schichtende (FA-10) | Ihr Betrag zählt nicht zum zurückzugebenden Betrag | Betrag als bar kassiert gerechnet | automatisch |
| Internet weg beim Melden/Bestätigen (Grenzfall offline) | Verbindung getrennt bei Schritt 5/6 | Meldung bzw. Inhaber-Bestätigung in Warteschlange, Zustand nach Verbindung gesetzt | Datenverlust; doppelte Anwendung | manuell + automatisch |
| Zwei-Restaurant-Fall | Fahrer bei Restaurant A; Bestellung/QR von Restaurant B `+49 30 23125 302` | Fahrer von A kann B nicht als „nicht zustellbar" melden; keine fremde Bestellung sichtbar | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Auslieferung → nicht zustellbar" (K2 noch offen)
- **Zustandsübergänge:** **Unterwegs** → **„nicht zustellbar"** (erst nach Inhaber-Bestätigung; Endzustand außerhalb der festen Vorwärtskette `… → Geliefert → Abgerechnet` — Modellierung in K3, hängt an Q3)
- **Technische Anwendungsfälle:** TU-? (Zustand „nicht zustellbar" setzen, Ausschluss aus dem Kassensturz; Zuordnung in K7)
- **Verträge / Events:** vorläufig `order.undeliverable` (Name offen, K6); Ereignis unveränderlich ([FEST 6])
- **Testszenarien:** FA-09-T1 … FA-09-T7 (Tabelle oben)
- **Nachbar-Fälle:** FA-06 (Rufnummer auf dem Bon), FA-08 (Auslieferung/Kassieren), FA-10 (Kassensturz), FA-11 (Storno)

## Offene Fragen

> **Frage an Sirat / architect (K3):** „Nicht zustellbar" ist ein Ende außerhalb der festen Statuskette `Eingegangen → In Küche → Fertig → Unterwegs → Geliefert → Abgerechnet` ([FEST 2]). Wie wird es modelliert — als eigener protokollierter Pfad wie Storno (Q3), oder als Endzustand neben „Geliefert"? Was passiert mit der bereits zubereiteten (und ggf. fiskalisch erfassten) Bestellung? → K3 mit `architect`, fiskalisch mit der Steuerberaterin (Q2/Q3).

> **Frage an Sirat:** Wie lange soll der Fahrer an der Tür bzw. nach dem Anruf **warten**, bevor er „nicht zustellbar" setzt? (Messbare Anforderung, damit der Fall ein klares Ende hat.)

> **Frage an Sirat:** Der Inhaber bestätigt „nicht zustellbar" im **Inhaber-Bereich am Hauptgerät** im Laden (Runde 16). Kann er das auch **von unterwegs** (eigenes Handy) — oder muss der Fahrer bis zu seiner Anwesenheit warten? (Nicht entschieden; Wirkung: wie lange eine unbezahlt endende Bestellung offen bleibt.)

> **Frage an Sirat:** **Wer entscheidet die Rückkehr** und dass das Essen weggeworfen wird — der Fahrer allein oder die Annahme/Inhaber? (Wirkung: Rechte in der PWA, K9.)

> **Frage an Sirat:** Gibt es einen **zweiten Zustellversuch**, und wer entscheidet ihn? Darf der Fahrer bei einer am Telefon **korrigierten Adresse** selbst weiterfahren, oder läuft das über die Annahme?

## Nicht Teil dieses Anwendungsfalls

- Auslieferung und Kassieren an der Tür → FA-08.
- Kassensturz am Schichtende → FA-10.
- Storno-Ablauf und dessen fiskalische Behandlung → FA-11, hängt an Q3.
- Modellierung von „nicht zustellbar" in der Zustandsmaschine → K3 mit `architect`.
- Fiskalische Behandlung (Signatur, Beleg, ggf. Rückabwicklung) → K5/K6, hängt an Q2 (Steuerberaterin).
