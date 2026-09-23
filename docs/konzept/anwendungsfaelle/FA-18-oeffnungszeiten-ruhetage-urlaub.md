# FA-18: Öffnungszeiten, Ruhetage und Urlaub pflegen

- **Status:** mit Sirat durchgegangen (Runde 44, 2026-09-22)
- **Stand:** 2026-09-22

> **Geändert (Runde 29, 2026-09-22, B15):** Es gibt **keinen eigenen Bestellschluss** mehr — **Bestellschluss = Ladenschluss**: solange das Restaurant geöffnet hat, werden Bestellungen angenommen. Das Feld/der Begriff „eigener Bestellschluss" (Runde 13/21) ist damit **gestrichen**. Muss der Laden an einem vollen Abend **früher dicht machen**, ist das ein **Annahmestopp** (FA-23), kein Bestellschluss ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29). **Feiertage/abweichende Einzeltage** werden benötigt (Runde 29).

| | |
|---|---|
| **Ziel** | Der Inhaber (und die Annahme mit Betriebsrechten) trägt selbst — auf Tablet oder Handy — die wöchentlichen Öffnungszeiten (auch mehrere Zeitfenster je Tag), Ruhetage, Urlaubszeiträume und abweichende Einzeltage/Feiertage des Restaurants ein und passt sie an, damit die KI (FA-01) und die Annahme (FA-05) nur dann eine Bestellung oder Vorbestellung annehmen, wenn zur Wunschzeit Betrieb ist. Ein eigener Bestellschluss entfällt (Bestellschluss = Ladenschluss, Runde 29). |
| **Akteur** | Inhaber, Annahme |
| **Auslöser** | Der Inhaber oder die Annahme öffnet die Öffnungszeiten-Einstellungen des Restaurants (z. B. um einen Urlaub oder einen einmaligen Ruhetag einzutragen). |
| **Vorbedingungen** | Das Restaurant ist angelegt und hat beim Onboarding (FA-20) einen ersten Satz Öffnungszeiten erhalten. Der Bearbeiter ist angemeldet (Tablet/Handy). |
| **Nachbedingungen** | Das Restaurant hat gepflegte Öffnungszeiten inkl. eingetragener Ruhetage und Urlaubszeiträume. KI (FA-01) und Annahme (FA-05) prüfen jede Wunschzeit (sofort oder Vorbestellung) gegen diese Zeiten und nehmen außerhalb des Betriebs nicht an. Eine Änderung ist gespeichert; berührt sie bereits angenommene Vorbestellungen, sind diese benannt (siehe Ausnahme 4a). |

## Ist-Ablauf heute (aus der Mitschrift)

> Wie Öffnungszeiten, Ruhetage und Urlaub beim Piloten heute gepflegt und dem Telefondienst bekannt gemacht werden, wurde im Gespräch **nicht besprochen**. Nicht erfinden — siehe Offene Fragen. Neu gegenüber heute ist, dass die KI Vorbestellungen **beliebig weit im Voraus** annimmt (Mitschrift Runde 7 / Offene Fragen, entschieden), einzige Bedingung: Das Restaurant hat zur Wunschzeit Betrieb. Damit werden gepflegte Öffnungszeiten, Ruhetage und Urlaub zur Voraussetzung, sonst sagt die KI falsch zu.

## Normalablauf

1. Der Inhaber/die Annahme öffnet die Öffnungszeiten des Restaurants (Tablet/Handy).
2. Der Bearbeiter trägt je Wochentag die Öffnungszeiten ein (offen/geschlossen, Von–Bis) oder ändert sie. Ein Tag kann **mehrere Zeitfenster** haben (z. B. Mittagspause: „Mo–Fr 11:00–14:00 und 17:00–22:00") ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 22 B16). Zwischen den Fenstern (in der Pause) gilt **„außerhalb der Öffnungszeit"** — das Telefon klingelt durch wie heute, die KI geht nicht ran (Runde 14, vorbehaltlich AP-001/Q15; siehe FA-13).
3. Der Bearbeiter kennzeichnet feste Ruhetage (z. B. „montags geschlossen").
4. Der Bearbeiter trägt einen Urlaubszeitraum ein (Von–Bis, ganze Tage geschlossen).
5. **Bestellschluss = Ladenschluss** (kein eigenes Feld): Bestellungen werden für die Zeiten angenommen, **in denen gearbeitet wird**; „in Betrieb" heißt zugleich „annehmbar". Es gibt **keinen** gesondert einstellbaren Bestellschluss mehr ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29 B15 — streicht den eigenen Bestellschluss aus Runde 13/21). Wer an einem vollen Abend früher schließen will, nutzt den **Annahmestopp** (FA-23). Der **Ladenschluss des Tages** (aus diesen Öffnungszeiten) beendet einen noch aktiven Annahmestopp **automatisch** — er ist der Bezugspunkt für dessen „Tagesende" ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 42; siehe FA-23).
6. Das System speichert die Zeiten.
7. Ab dann prüfen KI (FA-01) und Annahme (FA-05) jede Wunschzeit gegen diese Zeiten: Liegt sie in einem Betriebsfenster, wird angenommen; liegt sie außerhalb (Ruhetag, Urlaub, außerhalb der Öffnungszeit, in einer **Pause** zwischen zwei Fenstern), wird nicht angenommen. „In Betrieb" ist zugleich das einzige Annahmekriterium der Zeit — ein gesonderter Bestellschluss existiert nicht (Runde 29).

## Ausnahmeabläufe

- **2a. Abweichende Zeiten an einzelnen Tagen / Feiertage** (zweigt von Schritt 2 ab): Der Bearbeiter trägt für einen einzelnen Datumstag abweichende Zeiten oder „geschlossen" ein (z. B. Feiertag, verkürzter Tag). Solche **Feiertage/abweichenden Einzeltage werden benötigt** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29). Der Einzeltag hat Vorrang vor der wöchentlichen Regel. Endet in: eingetragener Ausnahmetag, gegen den KI/Annahme prüfen.
- **2b. Wert im laufenden Betrieb ändern** (zweigt von Schritt 2 ab): Öffnungszeit/Ruhetag/Urlaub wird geändert. Das dürfen **Inhaber und Annahme** (Betriebsrecht, [ENTSCHIEDEN Sirat 2026-09-18, Mitschrift Runde 11]). Ein **bereits laufendes KI-Gespräch bleibt beim Stand vom Gesprächsbeginn**; der neue Stand gilt **ab dem nächsten Anruf** — gleiche Regel wie bei Preisen (FA-12) und Zeitwerten (FA-17; [ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 44). Endet in: geänderter Stand gespeichert, ab dem nächsten Anruf wirksam.
- **4a. Urlaub/Ruhetag nachträglich eintragen, obwohl schon Vorbestellungen angenommen sind** (zweigt von Schritt 4 ab): Für einen Zeitraum liegen bereits angenommene Vorbestellungen vor. Das System darf diese **nicht stillschweigend** entwerten. fluvo **warnt** vor dem Speichern und **zeigt die Liste der betroffenen Vorbestellungen** ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13). Das **Weitere regelt der Inhaber selbst** — Kunden informieren, ggf. Vorbestellung stornieren über FA-11 (Storno ist ein eigener, protokollierter Pfad, [FEST 2]). fluvo **nimmt ihm nichts ab und storniert nichts automatisch**. Endet in: gespeicherte Sperrzeit **und** benannte, dem Inhaber angezeigte, nicht lautlos verschwundene Vorbestellungen.
- **7a. Wunschzeit liegt außerhalb des Betriebs** (zweigt von Schritt 7 ab): Die KI/Annahme nimmt die Bestellung/Vorbestellung zur genannten Zeit **nicht** an. Das gilt auch für eine **Pause** zwischen zwei Zeitfenstern (Mittagspause, Runde 22 B16) — sie zählt als „außerhalb der Öffnungszeit". Außerhalb der Öffnungszeit **klingelt das Telefon durch wie heute**, die KI geht nicht ran (keine Ansage; [ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 14); offen ist **nur die technische Machbarkeit** → **Q15**. Wie die KI eine Vorbestellung an einem geschlossenen Tag ablehnt, gehört zu FA-01. Endet in: keine Bestellung zu einer Zeit ohne Betrieb.

## Darf nicht

- Die KI/Annahme nimmt **keine** Bestellung oder Vorbestellung für eine Zeit an, zu der laut gepflegten Zeiten **kein Betrieb** ist (Ruhetag, Urlaub, außerhalb der Öffnungszeit) — Voraussetzung der Vorbestellung, Mitschrift Runde 7.
- Eine fehlende oder unvollständige Zeitangabe wird **nicht** stillschweigend als „geöffnet" behandelt; der fehlende Wert muss auffallen (nichts verschwindet lautlos).
- Eine nachträglich eingetragene Sperrzeit (Urlaub/Ruhetag) lässt bereits angenommene Vorbestellungen **nicht lautlos verschwinden**; fluvo warnt und zeigt die betroffenen Vorbestellungen vor dem Speichern (Ausnahme 4a).
- fluvo **storniert keine** betroffene Vorbestellung **automatisch** und informiert **keinen** Kunden von sich aus; das regelt der **Inhaber selbst** ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13).
- Öffnungszeiten gelten **je Restaurant**; Restaurant A sieht oder ändert **nicht** die Zeiten von B ([FEST 4]).
- Die KI **entscheidet nicht selbst** über Öffnung/Schließung, sondern liest nur die gepflegten Zeiten ([FEST 8], Gehirn vs. Hände; die Prüfung macht der Kern, [Briefing §5.3]).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Vorbestellung beliebig weit im Voraus; einzige Bedingung: Betrieb zur Wunschzeit → Öffnungszeiten/Ruhetage/Urlaub müssen gepflegt sein | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 7 / Offene Fragen |
| Öffnungszeiten, Ruhetage, Urlaub pflegt der Inhaber selbst | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 2 |
| Die Annahme hat Inhaber-**Betriebsrechte** (u. a. Öffnungszeiten, Ruhetage, Urlaub ändern), **nicht** die Geld-Bestätigung — die bleibt beim Inhaber | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 11 |
| Öffnungszeiten gehören zu den Onboarding-Daten | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 1 |
| Der Kern validiert jede Bestellung u. a. gegen die Öffnungszeiten | [FEST] | Briefing §5.3 |
| Zeiten gelten je Restaurant; kein Übergriff auf fremden Tenant | [FEST] | Briefing §2.4 (Multi-Tenant) |
| Bedienbar auf Tablet/Handy, ohne Schulung | [FEST] | Briefing §1, §9.9; Mitschrift Runde 2 |
| **Kein eigener Bestellschluss** — **Bestellschluss = Ladenschluss**: angenommen wird, solange gearbeitet wird. Das Feld/der Begriff „eigener Bestellschluss" (Runde 13/21) ist **gestrichen**. Früher schließen = Annahmestopp (FA-23) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 (B15) — streicht Runde 13/21 |
| Ein Tag kann **mehrere Zeitfenster** tragen (z. B. Mittagspause); in der Pause gilt „außerhalb der Öffnungszeit" (Telefon klingelt durch, Runde 14, vorbehaltlich AP-001/Q15) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 22 (B16), bestätigt Runde 28 |
| **Abweichende Einzeltage / Feiertage** werden **benötigt** (einzelner Tag geschlossen oder mit anderen Zeiten); der Einzeltag hat Vorrang vor der Wochenregel | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 |
| Bei nachträglicher Sperrzeit warnt fluvo und zeigt die betroffenen Vorbestellungen; das Weitere (Kunden informieren, ggf. Storno über FA-11) regelt der **Inhaber selbst** — fluvo storniert nichts automatisch | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 13 |
| Ein geänderter Stand gilt **nicht** für ein laufendes KI-Gespräch — dieses bleibt beim Stand vom Gesprächsbeginn, der neue Stand wirkt **ab dem nächsten Anruf** (wie FA-12/FA-17) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 44 |
| Was ein Anrufer außerhalb der Öffnungszeit hört: das Telefon klingelt **durch wie heute**, keine KI-Ansage (entschieden); **offen ist nur die technische Machbarkeit** | [ENTSCHIEDEN Sirat 2026-09-18] / [OFFEN] Q15 | Mitschrift Runde 14; open-questions.md Q15 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| FA-18-T1 · Standardfall Öffnungszeiten | Mo–Fr 11:00–22:00, Sa/So geschlossen eingetragen | KI/Annahme nehmen zu Betriebszeiten an, sonst nicht | Annahme außerhalb der Zeit | manuell + automatisch (mit FA-01) |
| FA-18-T2 · Fester Ruhetag | „Montags geschlossen" gesetzt; Vorbestellung für kommenden Montag 12:00 | Vorbestellung wird nicht angenommen | Zusage trotz Ruhetag | automatisch |
| FA-18-T3 · Urlaub eintragen | Urlaub „Testwoche" 2026-10-05 bis 2026-10-12 | Vorbestellungen in diesem Zeitraum werden nicht angenommen | Zusage im Urlaubszeitraum | manuell + automatisch |
| FA-18-T4 · Nachträglicher Urlaub trifft Vorbestellungen (Ausnahme 4a) | Zwei Vorbestellungen für 2026-10-06 liegen vor; danach Urlaub 05.–12.10. eingetragen | Warnung mit Liste beider betroffener Vorbestellungen vor dem Speichern; sie werden dem Inhaber angezeigt; nichts verschwindet lautlos; **keine** automatische Stornierung | Stilles Speichern; Vorbestellung verschwindet unbemerkt; automatischer Storno durch fluvo | manuell + automatisch |
| FA-18-T5 · Bestellschluss = Ladenschluss (kein eigenes Feld) | Betriebsfenster bis 22:00; Bestellung wird um 21:55 aufgegeben (es wird noch gearbeitet) | Bestellung wird angenommen — angenommen wird, solange gearbeitet wird; es gibt **keinen** gesonderten Bestellschluss | Einen eigenen Bestellschluss vor Ladenschluss erfinden/anbieten | automatisch |
| FA-18-T6 · Früher schließen = Annahmestopp statt Bestellschluss (B15) | Voller Abend; das Restaurant will vor Ladenschluss keine neuen Bestellungen mehr | Das geschieht über den **Annahmestopp** (FA-23), nicht über ein Bestellschluss-Feld; bestehende Vorbestellungen bleiben bestehen (FA-23) | Ein separates Bestellschluss-Feld dafür anbieten | manuell + automatisch (mit FA-23) |
| FA-18-T7 · Mittagspause / mehrere Zeitfenster | „Mo–Fr 11:00–14:00 und 17:00–22:00" eingetragen; Anruf/Vorbestellung um 15:30 (in der Pause) | Kein Betrieb in der Pause → **nicht angenommen**; das Telefon klingelt durch wie heute (außerhalb der Öffnungszeit, FA-13/Q15). Zum Vergleich: um 12:00 und um 18:00 wird angenommen | Pause stillschweigend als geöffnet behandeln; die zwei Fenster zu einem durchgehenden verschmelzen | automatisch |
| FA-18-T8 · Einzeltag / Feiertag (Ausnahme 2a) | Für 2026-12-24 abweichend „geschlossen" eingetragen | Der Ausnahmetag **greift** (Vorrang vor der Wochenregel); KI/Annahme nehmen an dem Tag nichts an | Feiertag stillschweigend als geöffnet; Wochenregel überstimmt den Einzeltag | manuell + automatisch |
| FA-18-T9 · Zwei-Restaurant-Fall | Restaurant A: Mo geöffnet; Restaurant B: Mo Ruhetag; A ändert A-Zeiten | Jede KI prüft die Zeiten des eigenen Restaurants; A ändert B nicht und sieht B nicht | Übergriff auf fremden Tenant; vermischte Zeiten | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Stammdatenpflege → Öffnungszeiten/Ruhetage/Urlaub" (K2 noch offen)
- **Zustandsübergänge:** keiner an einer Bestellung — Stammdatenänderung; liefert die Prüfgrundlage für die Annahme in FA-01 und FA-05 (Kern-Validierung gegen Öffnungszeiten, Briefing §5.3). Ausnahme 4a führt **nicht** selbst einen Storno aus — ein etwaiger Storno betroffener Vorbestellungen läuft über den protokollierten Pfad (FA-11, [FEST 2]).
- **Technische Anwendungsfälle:** TU-? (Öffnungszeiten/Ruhetage/Urlaub **und abweichende Einzeltage/Feiertage** je Restaurant speichern/lesen; Betriebsprüfung „ist zur Zeit X geöffnet"; betroffene Vorbestellungen zu einem Zeitraum ermitteln und dem Inhaber anzeigen; Zuordnung in K7). Ein eigener Bestellschluss entfällt (Runde 29).
- **Verträge / Events:** vorläufig `opening_hours.updated`, `closure.added`, `special_day.set` (Namen offen, K6); die Betriebsprüfung fließt in `create_order`/Vorbestellungsannahme (FA-01, Briefing §5.3, §5.4)
- **Testszenarien:** FA-18-T1 … FA-18-T9 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI prüft Wunschzeit, nimmt Vorbestellung an/ab), FA-05 (Annahme prüft dieselben Zeiten), FA-11 (Storno betroffener Vorbestellungen), FA-12 (Speisekarte/Preise, gleiche Betriebsrechte), FA-13 (KI an/aus; außerhalb der Öffnungszeit klingelt es durch wie heute, keine Ansage — technische Machbarkeit Q15), FA-17 (Lieferzonen/-zeit, gleiche Rechte), FA-20 (Onboarding legt erste Öffnungszeiten an), FA-23 (Annahmestopp — früher schließen statt Bestellschluss, Runde 29)

## Offene Fragen

> **Beantwortet (Runde 29, B15):** Es gibt **keinen eigenen Bestellschluss** — Bestellschluss = Ladenschluss; das Feld/der Begriff ist gestrichen. Früher schließen läuft über den **Annahmestopp** (FA-23). Damit ist auch die frühere Frage „worauf sich ein eigener Bestellschluss bezieht" gegenstandslos.

> **Beantwortet (Runde 29):** **Abweichende Einzeltage / Feiertage** werden **benötigt** (einzelner Tag geschlossen oder mit anderen Zeiten). Offen bleibt allein die genaue Ausgestaltung der Oberfläche → K10.

> **Beantwortet (Runde 44):** Eine Änderung wirkt **nicht sofort** für ein laufendes KI-Gespräch — dieses bleibt beim Stand vom Gesprächsbeginn, der neue Stand gilt erst ab dem nächsten Anruf (zur Konsistenz mit der Preisregel FA-12 und den Zeitwerten FA-17).

> **Zur technischen Machbarkeit (Q15):** Dass das Telefon außerhalb der Öffnungszeit **durchklingelt wie heute** und die KI **nicht** rangeht (keine Ansage, keine Vorbestellungsannahme nach Ladenschluss), ist **entschieden** ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 14). Offen ist **nur die technische Machbarkeit** — wie das mit der Rufumleitung bei Nichtmelden zusammengeht → **Q15** (nicht FA-13). Wie die KI eine Vorbestellung an einem geschlossenen Tag ablehnt, gehört zu FA-01.

## Nicht Teil dieses Anwendungsfalls

- **Prüfung und Annahme** einer konkreten Bestellung/Vorbestellung gegen die Öffnungszeiten am Telefon → FA-01; an der Annahme → FA-05.
- Verhalten **außerhalb der Öffnungszeit** (Telefon klingelt durch wie heute, keine Ansage — entschieden; technische Machbarkeit → Q15) und KI-Verhalten bei geschlossenem Tag → FA-01 / FA-13.
- **Storno** einer von einer nachträglichen Sperrzeit betroffenen Vorbestellung → FA-11 (protokollierter Pfad, [FEST 2]).
- **Erste Öffnungszeiten** beim Onboarding anlegen → FA-20.
- **Lieferzonen mit Lieferzeit** und **Speisekarte/Preise** pflegen → FA-17 bzw. FA-12.
- Technische **Betriebsprüfung** („ist zur Zeit X geöffnet?") und Zeitzonen-Behandlung → K6/K7.
