# FA-20: Restaurant aufnehmen (Onboarding)

- **Status:** mit Sirat durchgegangen (Runden 48–49, 2026-09-22) — Reihenfolge als Lesart zu bestätigen
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Der Betreiber (fluvo, heute der Gründer) legt ein neues Restaurant an und richtet es vollständig ein, bis die erste Bestellung möglich ist, und übergibt es dann dem Inhaber zur Selbstpflege. |
| **Akteur** | Betreiber |
| **Auslöser** | Ein Restaurant hat einen Vertrag mit fluvo geschlossen und soll aufgenommen werden. |
| **Vorbedingungen** | Der Betreiber ist an der Zentrale angemeldet. Die Stammdaten, Steuerdaten und die gewünschten Module/das Minutenpaket des Restaurants liegen ihm vor. Ein Inhaber-Ansprechpartner mit Zugangs-Adresse ist benannt. |
| **Nachbedingungen** | Genau ein neues Restaurant ist angelegt und als **startklar** markiert; eine erste Bestellung (per Telefon oder von Hand) ist möglich. Der Inhaber hat Zugang zu seinem Profil und pflegt die in FA-12/FA-17 genannten Daten fortan selbst. Alle Onboarding-Schritte sind dokumentiert. |

## Ist-Ablauf heute

Es gibt heute keinen Ablauf: Der Pilot ist das **erste** Restaurant. Ein Onboarding-Verfahren existiert bisher nicht — dieser Anwendungsfall beschreibt es erstmals. (Mitschrift Runde 1.)

## Normalablauf

Die folgende **Reihenfolge** ist die **Lesart Jarvis** aus Runde 49 (Sirat hat in Runde 49 nur zum Wechselgeld Stellung genommen; die Reihenfolge bestätigt er **bei Gelegenheit**): Stammdaten → Module → Rufnummer/KI → Drucker → Öffnungszeiten → Liefergebiet → Speisekarte → Mitarbeiter/PINs → Geräte registrieren (Tablet, Inhaber-Handy) → Testbestellung → Übergabe per E-Mail-Link. Alle Schritte in diesem Fall führt der **Betreiber** aus; die Spalte „nur Betreiber" der Rechteaufteilung (Mitschrift Runde 2) ist hier vollständig enthalten.

1. Der Betreiber legt das Restaurant mit **Name, Adresse und Steuerdaten** an und veranlasst die **TSE-Einrichtung** (nur Betreiber, Mitschrift Runde 2).
2. Der Betreiber bucht die **gebuchten Module und das Minutenpaket** → über **FA-21** (nur Betreiber, kostet Geld/Vertrag).
3. Der Betreiber richtet **Rufnummer, Rufumleitung und den KI-Agenten** ein (nur Betreiber, Mitschrift Runde 2).
4. Der Betreiber **koppelt den Drucker** (mindestens beim ersten Mal Betreiber-Sache, Mitschrift Runde 2).
5. Der Betreiber hinterlegt **Öffnungszeiten (auch mehrere Zeitfenster je Tag), Ruhetage, Urlaub und abweichende Einzeltage/Feiertage** → über **FA-18** (Pflichtpunkt der Einrichtung: sonst sagt die KI bei Vorbestellungen falsch zu; danach pflegt der Inhaber/die Annahme selbst). **Kein eigener Bestellschluss** — Bestellschluss = Ladenschluss ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29 B15, → FA-18).
6. Der Betreiber richtet das **Liefergebiet mit Zonen** ein — je Zone die **drei Werte Lieferzeit, Liefergebühr und Mindestbestellwert** ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13) — sowie den **Abholzeit-Wert** je Restaurant → über **FA-17** (danach pflegt der Inhaber selbst).
7. Der Betreiber spielt die **Speisekarte** ein — per Foto/PDF mit anschließender **manueller Freigabe** — und ergänzt **Optionen, Allergene und Steuersatz** je Artikel → über **FA-12** (danach pflegt der Inhaber selbst).
8. Der Betreiber legt **Mitarbeiter mit PIN** an (danach pflegt der Inhaber selbst). **Fahrer mit PIN sind für den ersten Piloten zurückgestellt** (Fahrer-Teil kommt später als eigene App, ADR 0008): Der Schritt bleibt als Grundlage erhalten, wird im ersten Piloten aber nicht benötigt (kein Fahrer im System).
9. Der Betreiber **registriert die Geräte** — das **Tablet der Annahme/das Hauptgerät** im Laden und das **Inhaber-Handy** (damit der Inhaber den Abschluss auch von unterwegs bestätigen kann, FA-16, [ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 43; Gerätebindung → Q11, `security-reviewer`). FA-05/FA-08/FA-15 setzen ein „registriertes Gerät" voraus, der Inhaber-Bereich hängt am Hauptgerät bzw. registrierten Inhaber-Handy (FA-16) — die Geräte-Registrierung ist damit ein **eigener Onboarding-Schritt** (Runde 43/49). **Wechselgeld wird beim Onboarding nicht eingestellt** — es gibt keinen Wechselgeld-Start im System ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 49, ADR 0012; Wechselgeld regeln Annahme-Person und Fahrer außerhalb von fluvo).
10. Der Betreiber stellt sicher, dass die **rechtlichen Grundlagen** vorliegen — **[VORSCHLAG]** aus der Hausjuristen-Recherche (Mitschrift Runde 17/18, ADR 0007), **vorbehaltlich Bestätigung durch den Anwalt (Q10)**: ein **AVV (Auftragsverarbeitungsvertrag) zwischen Restaurant und fluvo** ist abgeschlossen, und das Restaurant hat einen **Datenschutzhinweis mit einem Abschnitt „Telefonische Bestellung"** (KI-Annahme, Kundenstamm nach „Weg B", FA-01/FA-02). Zur **Einweisung** gehört zusätzlich der Umgang mit dem **Stations-Exemplar** des Liefer-Bons (Name, Adresse, Rufnummer auf Papier, außerhalb der Löschfunktion) — Aufbewahrung und Vernichtung nach dem Löschkonzept → Frage geführt in **FA-06** (Q10, ADR 0008).
11. Der Betreiber führt die **Startklar-Prüfung** durch: ein **Testanruf** (die KI meldet sich, nimmt eine Testbestellung an — als Kriterium [ENTSCHIEDEN Sirat 2026-09-18, Mitschrift Runde 10]) und ein **Testbon** (der gekoppelte Drucker gibt einen Bon aus — [VORSCHLAG] Jarvis, von Sirat nicht widersprochen). Die dabei entstehende **Testbestellung** wird als **Test markiert** und in **Zählungen, Übersichten und Kasse ausgeblendet** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B20). Ob eine Testbestellung überhaupt an die **TSE** darf, klärt die **Steuerberaterin** → **Q2**.
12. Das System markiert das Restaurant als **startklar**. Der Betreiber **übergibt** dem Inhaber den Zugang zu seinem Profil **per E-Mail-Link** an den benannten Ansprechpartner (*Lesart Jarvis: Link + Abhaken des Übergabe-Schritts als Quittung; Sirat bei Gelegenheit bestätigen*); ab hier pflegt der Inhaber die oben genannten Daten selbst (Mitschrift Runde 2, Tabelle Inhaber/Betreiber).

> **Hinweis — bestehende Kasse (Mitschrift Runde 36/37, 2026-09-22):** Beim Onboarding wird **erfasst, ob das Restaurant bereits ein Kassensystem hat**. Der Pilot nutzt eines für den **Tischbetrieb** (Gastraum, „Hier essen"); fluvo läuft im Piloten **daneben** und deckt den Gastraum **nicht** ab. Das **Bargeld von Abholung/Mitnehmen** wird **in fluvo** kassiert (FA-15/FA-16). Dass fluvo neben einer bestehenden TSE-Kasse Barzahlungen erfasst, ist fiskalisch offen → **Q2** (Steuerberaterin). Dies ist ein **Erfassungs-Hinweis**, keine erfundene Verfahrensregel.

## Ausnahmeabläufe

- **3a. Rufumleitung liefert die Anrufernummer nicht** (zweigt von Schritt 3 ab): Beim Testanruf zeigt sich, dass statt der Nummer des Anrufers die Nummer des Restaurants ankommt → die Stammkunden-Erkennung greift nicht (Q1). Der Betreiber dokumentiert das; das Restaurant kann trotzdem startklar werden, die Stammkunden-Erkennung bleibt aber eingeschränkt. Endet in: startklar mit dokumentierter Einschränkung. → [OFFEN] Q1.
- **4a. Drucker koppelt nicht / Testbon bleibt aus** (zweigt von Schritt 4 oder 11 ab): Der Betreiber prüft die Drucker-Kopplung erneut. Solange kein Testbon gedruckt wird, wird das Restaurant **nicht** startklar. Endet in: Restaurant bleibt in Einrichtung, offener Punkt beim Betreiber. → [OFFEN] Q8.
- **10b. AVV oder Datenschutzhinweis fehlt** (zweigt von Schritt 10 ab): Ist der AVV nicht abgeschlossen oder fehlt der Datenschutzhinweis mit dem Abschnitt „Telefonische Bestellung", wird das Restaurant **nicht** startklar — **[VORSCHLAG]**, vorbehaltlich Anwalt (Q10). Endet in: Restaurant bleibt in Einrichtung, offener rechtlicher Punkt.
- **7a. KI-Freigabe der Speisekarte ist unvollständig oder falsch** (zweigt von Schritt 7 ab): Der Betreiber korrigiert die aus Foto/PDF erkannten Artikel vor der Freigabe von Hand. Ohne manuelle Freigabe geht keine Karte scharf (Briefing §3). Endet in: freigegebene Speisekarte oder Abbruch der Freigabe.
- **11a. Testanruf misslingt** (zweigt von Schritt 11 ab): Die KI meldet sich nicht oder nimmt keine Testbestellung an. Der Betreiber prüft Rufnummer/Rufumleitung/KI-Agent (Schritt 3) erneut. Das Restaurant wird **nicht** startklar. Endet in: Restaurant bleibt in Einrichtung.
- **1a. Steuerdaten/TSE noch nicht geklärt** (zweigt von Schritt 1 ab): Ab wann die TSE im Pilot scharf sein muss, ist offen (Q2, Steuerberaterin vor Pilotstart). Der Betreiber legt das Restaurant an, hält den TSE-Status aber als offen fest, bis die Steuerberaterin bestätigt. Endet in: Restaurant angelegt, TSE-Freigabe ausstehend. → [OFFEN] Q2.

## Darf nicht

- Ein Restaurant wird **nicht** als startklar markiert, solange die Startklar-Prüfung nicht bestanden ist: **Testanruf** ([ENTSCHIEDEN Sirat 2026-09-18]) **und** **Testbon** ([VORSCHLAG] Jarvis).
- Ein Restaurant wird **nicht** startklar, solange **AVV** und **Datenschutzhinweis** (Abschnitt „Telefonische Bestellung") nicht vorliegen — **[VORSCHLAG]** aus der Hausjuristen-Recherche, vorbehaltlich Anwalt (Q10).
- Eine Speisekarte geht **nicht** ohne **manuelle Freigabe** scharf; aus Foto/PDF erkannte Artikel, Allergene und Steuersätze werden **nicht** ungeprüft übernommen (Briefing §3, §5.2).
- Der Betreiber sieht während des Onboardings **keine** Bestellungen oder Kundendaten eines **anderen** Restaurants ([FEST 4], Briefing §6).
- Der KI-Agent wird **nicht** scharf geschaltet, bevor Rufnummer und Rufumleitung geprüft sind (Q1).
- Eine **Testbestellung** aus der Startklar-Prüfung wird **nicht** wie eine echte Bestellung gezählt — sie ist als **Test markiert** und in Zählungen, Übersichten und Kasse **ausgeblendet** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B20; ob sie an die TSE darf → Q2).
- Die Aufgaben aus der Spalte „nur Betreiber" (Restaurant anlegen/sperren, Module/Minutenpaket, Rufnummer/KI-Agent, Steuerdaten/TSE, Drucker koppeln beim ersten Mal) werden **nicht** an den Inhaber übergeben (Mitschrift Runde 2).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Es gibt zwei Nutzer der Zentrale: Betreiber (legt an, richtet ein, überwacht) und Inhaber (pflegt selbst) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 1/2 |
| Onboarding-Daten (Ausgangspunkt, „vielleicht kommen noch weitere dazu"): Name/Adresse/Steuerdaten · Öffnungszeiten/Ruhetage/Urlaub/**Einzeltage-Feiertage** (mehrere Zeitfenster je Tag; **kein** eigener Bestellschluss, Runde 29) · Liefergebiet mit Zonen (als **Ortsteile**, Runde 28 B18), **je Zone Lieferzeit + Liefergebühr + Mindestbestellwert**, Abholzeit · Speisekarte mit Optionen/Allergenen/Steuersatz · Module + Minutenpaket · Rufnummer + Rufumleitung · Drucker · Mitarbeiter + Fahrer mit PIN · **Geräte-Registrierung** (Tablet/Hauptgerät, Inhaber-Handy). **Kein Wechselgeld-Start** (ADR 0012) | [ENTSCHIEDEN Sirat 2026-09-18/2026-09-22] | Mitschrift Runde 1/5/7/8/13; Runde 28/29/49 |
| Nur der Betreiber: Restaurant anlegen/sperren, Module/Minutenpaket, Rufnummer/KI-Agent, Steuerdaten/TSE, Drucker koppeln (mind. erstes Mal) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 2 |
| Speisekarte per Foto/PDF einspielen, mit **manueller Freigabe** | [FEST] | Briefing §3 (KI-Speisekarten-Digitalisierung), Modul-Tabelle |
| Öffnungszeiten, Ruhetage und Urlaub müssen gepflegt sein (sonst sagt die KI bei Vorbestellungen falsch zu) — Pflichtpunkt der Einrichtung | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 7/10, → FA-18 |
| Liefergebiet mit Zonen; je Zone **drei Werte** (Lieferzeit, Liefergebühr, Mindestbestellwert); Abholzeit-Wert je Restaurant | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 5/8/13, → FA-17 |
| **Kein eigener Bestellschluss** in den Onboarding-Daten — Bestellschluss = Ladenschluss (streicht Runde 13); abweichende Einzeltage/Feiertage gehören dazu | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 (B15), → FA-18 |
| **Testbestellung** aus der Startklar-Prüfung ist als **Test markiert** und in Zählungen/Übersichten/Kasse **ausgeblendet** (TSE-Frage → Q2) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 28 (B20) |
| Beim Onboarding wird **erfasst, ob eine bestehende Kasse** vorhanden ist (Pilot: Kasse für den Tischbetrieb/Gastraum); fluvo läuft **daneben**, Bargeld von Abholung/Mitnehmen wird in fluvo kassiert (Hinweis, keine Verfahrensregel; fiskalisch → Q2) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 36/37 |
| Startklar-Kriterium: bestandener Testanruf ([ENTSCHIEDEN]) plus Testbon ([VORSCHLAG] Jarvis) | [ENTSCHIEDEN Sirat 2026-09-18] / [VORSCHLAG] | Mitschrift Runde 10 |
| Vor „startklar": **AVV** zwischen Restaurant und fluvo abgeschlossen und **Datenschutzhinweis** mit Abschnitt „Telefonische Bestellung" vorhanden | [VORSCHLAG] (Hausjurist), vorbehaltlich Anwalt (Q10) | Mitschrift Runde 17/18, ADR 0007 |
| **Kein Wechselgeld im System** — beim Onboarding wird **kein** Wechselgeld-Start eingestellt (weder Tresen noch Fahrer); Wechselgeld regeln Annahme-Person und Fahrer außerhalb von fluvo | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 49, ADR 0012 (ersetzt Runde 5/8/13) |
| **Geräte-Registrierung** ist ein eigener Onboarding-Schritt: Tablet/Hauptgerät und Inhaber-Handy werden vom Betreiber registriert | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 43/49; Q11 |
| Multi-Tenant über `tenant_id`, Isolation erzwungen | [FEST] | Briefing §2.4, §6 |
| Anmeldung Inhaber per E-Mail-Link; Mitarbeiter/Fahrer per PIN + registriertes Gerät | [STACK] / [OFFEN] Q11 | Briefing §4 (Login) |
| Rufumleitung bei Nichtmelden auf die Voice-Plattform (Overflow, keine Hardware) | [FEST] | Briefing §5.4 |
| Reihenfolge des Onboardings beim Piloten (Lesart Jarvis, Runde 49; Sirat bestätigt bei Gelegenheit) | [ENTSCHIEDEN Sirat 2026-09-22, vorbehaltlich Bestätigung] | Mitschrift Runde 49 |
| TSE ab wann im Pilot scharf | [OFFEN] Q2 | open-questions.md Q2 (Steuerberaterin) |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall vollständiges Onboarding | Alle Onboarding-Daten für Test-Restaurant „Musterpizza" (Rufnummer `+49 30 23125 401`), alle Schritte 1–11 durchlaufen | Restaurant angelegt und **startklar**, Testanruf + Testbon bestanden, Inhaber hat Zugang | Startklar ohne bestandene Prüfung | manuell + Testanruf |
| Speisekarte per Foto ohne Freigabe | Karte per PDF eingespielt, Freigabe **nicht** erteilt | Karte bleibt unscharf, Restaurant nicht startklar | Karte scharf ohne Freigabe | manuell + automatisch |
| Falsch erkannter Allergen-/Steuerwert (Grenzfall) | KI erkennt Steuersatz/Allergen falsch, Betreiber korrigiert vor Freigabe | Freigabe erst nach Korrektur, korrigierte Werte scharf | Ungeprüfte Übernahme | manuell + automatisch |
| Testanruf misslingt | KI meldet sich nicht (Rufumleitung falsch) | Restaurant bleibt in Einrichtung, offener Punkt beim Betreiber | Startklar trotz fehlgeschlagenem Testanruf | Testanruf |
| Testbon bleibt aus | Drucker nicht gekoppelt | Restaurant bleibt in Einrichtung | Startklar ohne Testbon | manuell am Gerät |
| Testbestellung wird ausgeblendet (B20) | Startklar-Prüfung erzeugt eine Testbestellung (Testanruf/Testbon) | Testbestellung als **Test markiert**; erscheint **nicht** in Zählungen (FA-22 „Anzahl Bestellungen"), Übersichten und Kasse | Testbestellung als echte Bestellung zählen/anzeigen | manuell + automatisch |
| Übergabe an Inhaber | Restaurant startklar, Inhaber-Zugang erteilt | Inhaber kann Preise/Öffnungszeiten/Liefergebiet selbst ändern; kann Module/Rufnummer/Steuerdaten **nicht** ändern | Inhaber schaltet Module/Rufnummer | manuell + automatisch |
| Zwei-Restaurant-Fall | Restaurant A „Musterpizza" und B „Testdöner" (Rufnummer `+49 30 23125 402`) parallel im Onboarding | Jedes Restaurant nur mit eigenen Daten; A sieht nichts von B und umgekehrt | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Restaurant aufnehmen / einrichten" (K2 noch offen)
- **Zustandsübergänge:** Restaurant: (nicht vorhanden) → in Einrichtung → **startklar** (Restaurant-Lebenszyklus, in K3/K9 zu bestätigen; kein Bestell-Zustand)
- **Technische Anwendungsfälle:** TU-? (Restaurant anlegen, Entitlements setzen, Speisekarten-Import mit Freigabe, Drucker koppeln, Testanruf/Testbon — in K7)
- **Verträge / Events:** `tenant.created`, `tenant.went_live` (Namen vorläufig, K6 noch offen)
- **Testszenarien:** FA-20-T1 … FA-20-T8 (Tabelle oben)
- **Nachbar-Fälle:** FA-21 (Module/Paket schalten), FA-22 (Überwachung — Testbestellung nicht in „Anzahl Bestellungen"), FA-12 (Speisekarte pflegen — Inhaber/Annahme), FA-17 (Lieferzonen — Inhaber pflegt alle drei Zonenwerte und legt Zonen an; die Annahme ändert nur Lieferzeit/Abholzeit, Runde 20 B11), FA-18 (Öffnungszeiten/Ruhetage/Urlaub/Feiertage — Pflichtpunkt, kein Bestellschluss, Inhaber/Annahme), FA-13 (KI-Annahme ein/aus), FA-19 (Mitarbeiter melden sich zu Schichtbeginn an)

## Offene Fragen

> **Frage an Sirat (Reihenfolge — Lesart bestätigen):** Der Normalablauf oben bildet die **Lesart Jarvis** aus Runde 49 ab: Stammdaten → Module → Rufnummer/KI → Drucker → Öffnungszeiten → Liefergebiet → Speisekarte → Mitarbeiter/PINs → Geräte registrieren → Testbestellung → Übergabe per E-Mail-Link (**ohne** den früheren Wechselgeld-Schritt, ADR 0012). Passt diese Reihenfolge, und was muss zwingend zuerst stehen (z. B. Steuerdaten/TSE) bzw. kann parallel laufen? (Mitschrift Runde 49.)

> **Frage an Sirat:** Fehlen in der Onboarding-Liste noch **weitere Daten**? Du hast die Liste als Ausgangspunkt bestätigt mit „vielleicht kommen noch weitere dazu" (Mitschrift Runde 1).

> **Frage an Sirat / Steuerberaterin:** Ab wann muss die **TSE** im Pilot scharf sein, und darf ein Restaurant vorher schon Bestellungen annehmen? (Q2 — Steuerberaterin vor Pilotstart.)

> **Frage an Sirat (Inhaber-Zugang — Lesart bestätigen):** Der **Inhaber-Zugang** wird bei der Übergabe **per E-Mail-Link** an den benannten Ansprechpartner erteilt; *Vorschlag Jarvis (Lesart): der Link plus das Abhaken des Übergabe-Schritts dienen als Quittung.* Passt das so? (Mitschrift Runde 2/49; Briefing §4.)

> **Beantwortet (Runde 43/49):** Die **Geräte-Registrierung** (Tablet der Annahme/Hauptgerät, Inhaber-Handy) ist jetzt ein **eigener Onboarding-Schritt** (Schritt 9), ausgeführt vom Betreiber. FA-05/FA-08/FA-15 setzen ein „registriertes Gerät" voraus, der Inhaber-Bereich hängt am Hauptgerät bzw. registrierten Inhaber-Handy (FA-16). Gerätebindung/Sperrschwelle bleiben technisch offen → Q11, `security-reviewer`.

> **Frage an Anwalt (über Sirat, Q10):** Sind **AVV** und ein **Datenschutzhinweis** mit Abschnitt „Telefonische Bestellung" als Voraussetzung für „startklar" richtig und ausreichend (Hausjuristen-Vorschlag)? Verbindlich über den Anwalt.

## Nicht Teil dieses Anwendungsfalls

- Nachträgliches Ändern von Modulen/Minutenpaket und Sperren/Entsperren → FA-21.
- Laufende Überwachung des Gesundheitszustands → FA-22.
- Selbstpflege durch Inhaber/Annahme (Preise, Speisekarte, Liefergebiet, Öffnungszeiten/Ruhetage/Urlaub, Mitarbeiter/Fahrer, PIN-Reset) → FA-12, FA-17, FA-18.
- KI-Annahme ein-/ausschalten (Overflow) durch den Inhaber → FA-13.
- Details der Rufumleitung (kommt die Anrufernummer an?) → Risikotest AP-001, Q1.
- Details des Offline-/Cloud-Drucks mit echtem Gerät → Risikotest AP-002, Q8.
- Fiskalische Einrichtung im Detail → Q2, Steuerberaterin.
