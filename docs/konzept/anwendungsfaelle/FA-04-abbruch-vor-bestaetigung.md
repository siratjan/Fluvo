# FA-04: Anrufer bricht vor der Bestätigung ab

- **Status:** Entwurf
- **Stand:** 2026-09-21

> **Abhängigkeit:** Die **fachliche Regel** dieses Falls (kein Datensatz ohne ausdrückliche Bestätigung, [Briefing §5.4]) steht fest und ist **nicht** vom Rufumleitungs-Test abhängig. Offen ist nur die **Zusatzfrage**, ob die Annahme einen abgebrochenen Anruf sehen soll (mit Rufnummer als Rückruf-Chance) — diese Frage berührt **Q1 / AP-001** (kommt überhaupt eine Anrufernummer an?) und die Datensparsamkeit; sie ist an Sirat gestellt, nicht entschieden. Der Grenzfall „Abbruch genau während der Anlage" hängt an der Idempotenz im Kern (K2/K6), nicht an einem Risikotest.

| | |
|---|---|
| **Ziel** | Bricht ein Anruf ab, bevor der Anrufer die Bestellung ausdrücklich bestätigt hat, entsteht **keine** Bestellung — nichts Halbes bleibt zurück. |
| **Akteur** | Anrufer, KI-Assistent |
| **Auslöser** | Der Anrufer bricht vor der ausdrücklichen Bestätigung ab: er legt auf, die Verbindung reißt ab, er schweigt anhaltend, oder er sagt „ich überleg's mir". |
| **Vorbedingungen** | Ein Gespräch mit der KI läuft (FA-01 oder FA-02), die Bestellung ist im Gespräch **noch nicht bestätigt** (Schritt 9 in FA-01 noch nicht erreicht). |
| **Nachbedingungen** | In den Bestellungen existiert **kein** Datensatz zu diesem Gespräch ([Briefing §5.4]). Der Anruf selbst ist für die Minutenabrechnung mit seiner **Dauer in Sekunden** gezählt — **ohne** Audio und **ohne** dauerhaftes Volltranskript ([FEST 13]). |

## Ist-Ablauf heute (aus der Mitschrift)

> Wie ein **abgebrochener** Anruf heute (ohne fluvo) beim Piloten gehandhabt wird, wurde im Gespräch **nicht besprochen** — nicht erfinden. Fest steht nur die fachliche Soll-Regel: Ohne ausdrückliche Bestätigung entsteht **kein** Datensatz (Umsetzung von Briefing §5.4).

## Normalablauf

1. Ein Gespräch mit der KI läuft (Aufnahme wie FA-01/FA-02), die Bestellung ist **noch nicht** bestätigt.
2. Der Anrufer bricht ab (legt auf / Verbindung reißt / schweigt anhaltend / „ich überleg's mir").
3. Die KI beendet das Gespräch, ohne eine Bestellung anzulegen.
4. Das System legt **keinen** Datensatz in den Bestellungen an.
5. Der Anruf wird mit seiner Dauer (Sekunden) für die Minutenabrechnung erfasst — ohne Audio, ohne dauerhaftes Volltranskript.

## Ausnahmeabläufe

- **2a. Anrufer legt einfach auf** (zweigt von Schritt 2 ab): Gespräch endet abrupt. Endet in: keine Bestellung, Anrufdauer gezählt.
- **2b. Verbindungsabbruch** (zweigt von Schritt 2 ab): Die Leitung reißt technisch ab. Endet in: keine Bestellung, Anrufdauer bis zum Abbruch gezählt.
- **2c. Anhaltendes Schweigen** (zweigt von Schritt 2 ab): Der Anrufer reagiert über einen längeren Zeitraum nicht. Die KI beendet das Gespräch (genaue Schwelle → Gesprächsdesign K4). Endet in: keine Bestellung, Anrufdauer gezählt.
- **2d. „Ich überleg's mir"** (zweigt von Schritt 2 ab): Der Anrufer will nicht bestätigen. Die KI verabschiedet sich. Endet in: keine Bestellung, Anrufdauer gezählt.
- **2e. Abbruch aus einem Ausnahmezweig von FA-01** (zweigt von Schritt 2 ab): Der Anrufer bricht ab, nachdem ein FA-01-Ausnahmefall auftrat (Artikel „momentan aus", außerhalb Liefergebiet, unter Mindestbestellwert) und keine Einigung zustande kam. Endet in: keine Bestellung, Anrufdauer gezählt. *(FA-01 verweist für seine Ausnahmen 5a/7a/9a auf diesen Fall.)*
- **2f. Grenzfall: Abbruch genau während der Bestätigung/Anlage** (zweigt von Schritt 2 ab): Der Abbruch fällt mit dem Moment der ausdrücklichen Bestätigung und der Anlage zusammen. Ergebnis: Es entsteht **entweder genau eine** vollständige Bestellung (Bestätigung war abgeschlossen) **oder keine** — **nie eine halbe** und **nie zwei**. Ein wiederholter oder verzögert eintreffender Anlage-Auftrag desselben Gesprächs führt **nicht** zu einer zweiten Bestellung. Endet in: eine Bestellung (Status **Eingegangen**) **oder** keine Bestellung.

## Darf nicht

- **Kein** Datensatz in den Bestellungen ohne ausdrückliche Bestätigung ([Briefing §5.4]).
- **Kein** halber Datensatz und **keine zwei** Bestellungen aus einem einzigen Gespräch — auch nicht bei Abbruch genau während der Anlage (Grenzfall 2f).
- **Kein** Audio, **kein** dauerhaftes Volltranskript des abgebrochenen Gesprächs ([FEST 13]); gespeichert wird nur die Anrufdauer in Sekunden.
- **Keine** Personendaten aus dem abgebrochenen Gespräch in Logs, Fehlermeldungen oder URLs (nur IDs).
- Eine etwaige „abgebrochen"-Anzeige eines Restaurants darf bei einem anderen Restaurant **nicht** sichtbar sein (Mandantentrennung).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Bestellung erst mit `create_order` nach ausdrücklicher Bestätigung; vorher kein Datensatz in `orders` | [FEST] | Briefing §5.4, §2.2 |
| Aus einem Gespräch entsteht genau eine oder keine Bestellung, nie zwei (idempotent) | [FEST] | Briefing §5.4/§5.5 (Idempotenz); Regel 7/§5.3 |
| Anrufdauer in Sekunden wird für die Minutenabrechnung erfasst | [FEST] | Briefing §2.21, §5.4 (Metering) |
| Kein Audio, kein dauerhaftes Volltranskript | [FEST] | Briefing §2.13; §5.4 |
| Schwelle für „anhaltendes Schweigen" (Sekunden) | [OFFEN] | Gesprächsdesign K4 (noch offen) |
| Ob die Annahme abgebrochene Anrufe sieht (und ob mit Rufnummer) | [OFFEN] Q1 | open-questions Q1 / AP-001 (siehe Offene Fragen) |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Auflegen | Anruf, 1 Artikel genannt, Anrufer legt vor der Bestätigung auf | Keine Bestellung; Anrufdauer erfasst | Kein Datensatz in den Bestellungen | Testanruf + automatisch |
| Verbindungsabbruch | Leitung reißt vor der Bestätigung ab | Keine Bestellung; Dauer bis Abbruch erfasst | Kein halber Datensatz | Testanruf + automatisch |
| Anhaltendes Schweigen | Anrufer schweigt über die Schwelle hinaus | KI beendet, keine Bestellung | Kein endloses Offenhalten | Testanruf |
| „Ich überleg's mir" | Anrufer will nicht bestätigen | KI verabschiedet sich, keine Bestellung | Keine Anlage ohne Bestätigung | Testanruf + automatisch |
| Abbruch aus Ausnahmezweig | Artikel „momentan aus", keine Einigung, Anrufer legt auf | Keine Bestellung | Kein Datensatz | Testanruf |
| Grenzfall Anlage-Moment (2f) | Abbruch genau bei Bestätigung/Anlage; Anlage-Auftrag trifft doppelt/verspätet ein | Genau eine **oder** keine Bestellung; nie zwei, nie halb | Keine zweite Bestellung; kein Teil-Datensatz | automatisch (Idempotenz-Test) |
| Kein Audio/Transkript | Beliebiger Abbruch | Nur Anrufdauer gespeichert | Kein Audio, kein Volltranskript, keine Personendaten in Logs | automatisch |
| Zwei-Restaurant-Fall | Abbruch bei Restaurant A (`+49 30 23125 401`), Restaurant B parallel aktiv | Keine Bestellung bei A; B unberührt und ohne Einsicht | Kein Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „KI-Gespräch → Bestellung anlegen", Abbruchzweig vor der Bestätigung (K2 noch offen)
- **Zustandsübergänge:** **kein** Übergang (keine Bestellung entsteht); im Grenzfall 2f entweder (kein Vorzustand) → **Eingegangen** oder kein Übergang
- **Technische Anwendungsfälle:** TU-? (kein `create_order` ohne Bestätigung; Idempotenz der Anlage; Call-Ended-Webhook → Dauer nach `voice_calls`/Metering — Zuordnung in K7)
- **Verträge / Events:** **kein** `order.created`; Anrufdauer-/Metering-Erfassung (K6 noch offen)
- **Testszenarien:** FA-04-T1 … FA-04-T8 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (Aufnahme, Ausnahme 10a und Verweise 5a/7a/9a), FA-02 (Stammkunde), FA-03 (Eskalation ohne bestätigte Bestellung)

## Offene Fragen

> **Frage an Sirat:** Soll die Annahme **sehen**, dass ein Anruf abgebrochen wurde (als Rückruf-Chance), und wenn ja, **mit Rufnummer**? Das erhöht die Chance auf eine gewonnene Bestellung, steht aber gegen Datensparsamkeit — und die Rufnummer kommt nur an, wenn Q1/AP-001 das hergibt. Bitte abwägen und entscheiden (nicht angenommen).

> **Frage an Sirat (bzw. K4):** Ab welcher Dauer gilt Schweigen als Abbruch, und meldet sich die KI vorher noch einmal? (Wirkung: gezählte Minuten, Kundenerlebnis.)

## Nicht Teil dieses Anwendungsfalls

- Erfolgreiche Aufnahme mit Bestätigung → FA-01/FA-02.
- Eskalation an einen Menschen → FA-03.
- Genaue Metering-/Abrechnungslogik der Minuten → K6/Billing.
- Gesprächsführung bei Schweigen/Nachfragen im Detail → Gesprächsdesign K4.
