# FA-22: Gesundheitszustand der Restaurants überwachen (ohne Einsicht in Bestellungen)

- **Status:** mit Sirat durchgegangen (Runden 48 + 50, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Der Betreiber sieht in der Zentrale je Restaurant den Gesundheitszustand — läuft alles, oder gibt es eine Störung — **ohne** Einsicht in einzelne Bestellungen oder Kundendaten. |
| **Akteur** | Betreiber |
| **Auslöser** | Der Betreiber öffnet die Übersicht der Zentrale, oder eine Störung tritt bei einem Restaurant auf. |
| **Vorbedingungen** | Mindestens ein Restaurant ist angelegt und startklar (FA-20). Der Betreiber ist an der Zentrale angemeldet. |
| **Nachbedingungen** | Der Betreiber kennt für jedes Restaurant den aktuellen Gesundheitszustand als **Ampel** (rot/gelb/Information; Runde 48) samt den zugrunde liegenden Werten (KI erreichbar, Drucker online, Fehler, verbrauchte Minuten, Anzahl Bestellungen — **Testbestellungen ausgeblendet**, Runde 28 B20). Die Werte sind **im Minutentakt** aktualisiert (nicht live; [ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48). Bei einer technischen Störung wurde **per Push in der App** angezeigt; die Anzeige ist **Pflicht** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29), ohne dass die Benachrichtigung Kundendaten oder Bestellinhalte enthielt. Kein Bestellinhalt, keine Kundendaten und **keine Bestellnummern** wurden angezeigt. |

## Ist-Ablauf heute

Es gibt heute keinen Ablauf: Der Pilot ist das erste Restaurant, und eine Überwachung existiert bisher nicht. Dieser Anwendungsfall beschreibt sie erstmals. (Mitschrift Runde 1.)

## Normalablauf

1. Der Betreiber öffnet die Übersicht der Zentrale.
2. Das System zeigt je Restaurant den **Gesundheitszustand** als **Ampel** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48):
   - **Rot** (Störung, sofort): **KI nicht erreichbar**, **Annahme-Gerät offline** (KI deshalb automatisch pausiert; FA-14) oder **Drucker offline** — jeweils **während der Öffnungszeit** (außerhalb der Öffnungszeit ist z. B. ein offline-Drucker keine dringende Störung).
   - **Gelb** (Aufmerksamkeit): **Minutenpaket fast verbraucht** — **80 %** des gebuchten Minutenpakets ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 50; Zahl → K8) — oder **Annahmestopp seit über einer Stunde** (FA-23).
   - **Sonst: Information** — laufender Betrieb.
   Darunter die zugrunde liegenden Werte: **KI erreichbar**, **Drucker online**, **Fehler**, **verbrauchte Minuten**, **Anzahl der Bestellungen** (Variante a, Mitschrift Runde 1), ob ein **Annahmestopp aktiv** ist (welcher Schalter — „keine Lieferung mehr" / „gar nichts mehr" — und seit wann; FA-23, Mitschrift Runde 42; **ohne** Einsicht in Bestellungen) und ob das **Annahme-Gerät nicht erreichbar** ist und die **KI deshalb automatisch pausiert** wurde (seit wann; FA-14, Mitschrift Runde 45). **Testbestellungen** (aus der Startklar-Prüfung, FA-20) sind als Test markiert und **zählen hier nicht mit** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B20). Die Werte werden **im Minutentakt** aktualisiert, nicht live ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).
3. Tritt eine technische Störung auf (Drucker, KI, Verbindung), wird sie **per Push in der App angezeigt**; diese Anzeige ist **Pflicht** — sie muss auf jeden Fall erscheinen ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29; die Benachrichtigung enthält keine Personendaten). Ob zusätzlich ein anderer Weg (SMS/E-Mail) genutzt wird, bleibt offen (siehe Offene Fragen).
4. Der Betreiber erkennt, ob ein Restaurant läuft oder eine Störung hat.
5. Bei einer Störung ergreift der Betreiber Maßnahmen (z. B. Rufumleitung oder Drucker prüfen) und unterstützt das Restaurant beim Support — **ohne** einzelne Bestellungen zu öffnen (wie genau, siehe Offene Fragen).

> **Nachtrag Runde 51 (2026-09-23, aus dem Kreuzverhör FA-01 — beim Einzeldurchgang von FA-22 zu vertiefen):** Scheitert das **Anlegen einer Bestellung nach der Bestätigung** (FA-01 13a: die KI konnte trotz kurzem Wiederholen nicht speichern), ist der Vorfall **rot** im Monitoring — als technische Störung ohne Bestell- oder Personenbezug (nur Restaurant, Art, Zeitpunkt), per Push angezeigt ([ENTSCHIEDEN Sirat 2026-09-23], Mitschrift Runde 51). Die genaue Einordnung in die Ampel/Werte ist beim Einzeldurchgang von FA-22 zu bestätigen.

## Ausnahmeabläufe

- **2a. KI nicht erreichbar** (zweigt von Schritt 2 ab): Das System zeigt die KI eines Restaurants als **nicht erreichbar** und benachrichtigt den Betreiber aktiv (Weg offen). Der Betreiber prüft Rufnummer/Rufumleitung/KI-Agent (vgl. FA-20 Schritt 3). Endet in: Störung erkannt, Maßnahme eingeleitet. → Ob diese Störung als dringend gilt: siehe Offene Fragen.
- **2b. Drucker offline** (zweigt von Schritt 2 ab): Das System zeigt den Drucker als **offline** und benachrichtigt den Betreiber aktiv (Weg offen). Der Betreiber informiert das Restaurant bzw. prüft die Kopplung. Endet in: Störung erkannt, Maßnahme eingeleitet. → Q8; Dringlichkeit siehe Offene Fragen.
- **2c. Fehler gemeldet** (zweigt von Schritt 2 ab): Das System zeigt einen Fehler ohne Bestell- oder Personenbezug (nur Art und Zeitpunkt). Endet in: Fehler sichtbar, Maßnahme eingeleitet.
- **5a. Betreiber will beim Support eine einzelne Bestellung ansehen** (zweigt von Schritt 5 ab): Das System zeigt **keine** Bestellung, **keine** Kundendaten und **auch keine Bestellnummern** an — auch nicht ausnahmsweise zu Supportzwecken ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48; Variante a aus Runde 1). Der Betreiber hilft **ausschließlich** anhand des Gesundheitszustands und über **direkte Absprache** mit dem Inhaber. Endet in: Support ohne jede Einsicht in Bestellungen.

## Darf nicht

- Der Betreiber sieht **keine einzelnen Bestellungen** und **keinen Bestellinhalt** eines Restaurants (Mitschrift Runde 1, Variante a — ausdrücklich entschieden).
- Der Betreiber sieht **keine Kundendaten** (Rufnummer, Name, Adresse, Freitext) eines Restaurants — weder des eigenen Piloten noch eines fremden ([FEST 4], Briefing §6/§8, Mitschrift Runde 1).
- Die Übersicht zeigt **nur** Gesundheitswerte (KI erreichbar, Drucker online, Fehler, verbrauchte Minuten, Anzahl Bestellungen) — **keine** aggregierten Umsätze, Kundenlisten oder Bestellhistorien darüber hinaus (Mitschrift Runde 1).
- **Testbestellungen** zählen **nicht** in die „Anzahl Bestellungen" und erscheinen nicht in den Übersichten ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 28 B20).
- Eine technische Störung wird **nicht verschluckt**: sie wird **per Push** angezeigt, die Anzeige ist **Pflicht** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29).
- Ein Support-Zugriff eröffnet **keinen** Umweg zur Bestell- oder Kundeneinsicht (Mitschrift Runde 1).
- Der Betreiber sieht **auch keine Bestellnummern** — nicht einmal ausnahmsweise zu Supportzwecken; Support läuft über den Gesundheitszustand und die Absprache mit dem Inhaber ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48; Datensparsamkeit).
- Eine **Störungs-Benachrichtigung** enthält **keine Kundendaten** (Rufnummer, Name, Adresse, Freitext) und **keine Bestellinhalte** — nur Restaurant, Art und Zeitpunkt der Störung ([FEST] Briefing §6/§8; [ENTSCHIEDEN Sirat 2026-09-18, Mitschrift Runde 10]).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Überwachung = **nur Gesundheitszustand je Restaurant** (Variante a): KI erreichbar, Drucker online, Fehler, verbrauchte Minuten, Anzahl Bestellungen | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 1 |
| **Keine** Einsicht des Betreibers in einzelne Bestellungen mit Kundendaten | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 1 |
| Die Zentrale zeigt dem Betreiber keine Personendaten fremder Restaurants (für K9 Rollen/Rechte und Mandantentrennung festgehalten) | [FEST 4] | Briefing §2.4, §6; Mitschrift Runde 1 |
| Verbrauchte Minuten stammen aus sekundengenauem Metering | [FEST 21] | Briefing §2.21, §5.4 |
| Keine personenbezogenen Daten in Ansichten, Logs, Meldungen | [FEST] | Briefing §6, §8 |
| Der Betreiber wird bei Störungen **aktiv benachrichtigt**, nicht nur per Ansicht | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 10 |
| Eine Störungs-Benachrichtigung enthält keine Kundendaten und keine Bestellinhalte | [FEST] | Briefing §6 (keine Personendaten in Meldungen); dass benachrichtigt wird: Mitschrift Runde 10 |
| Technische Störung (Drucker/KI/Verbindung) wird **per Push in der App** angezeigt; Anzeige **Pflicht** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 |
| **Testbestellungen** (FA-20) sind als Test markiert und zählen **nicht** in Anzahl/Übersichten/Kasse | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 28 (B20) |
| Gesundheitswert **„Annahmestopp aktiv"** (welcher Schalter, seit wann; FA-23) ist im Monitoring sichtbar — **ohne** Einsicht in Bestellungen | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 42 |
| **Ampel — Rot** (Störung): KI nicht erreichbar, Annahme-Gerät offline (KI automatisch pausiert), Drucker offline — jeweils **während der Öffnungszeit** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 48 |
| **Ampel — Gelb**: Minutenpaket **fast verbraucht** = **80 %** des gebuchten Pakets, Annahmestopp **seit über einer Stunde** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 48 (Ampel) + Runde 50 (80 %); Zahl → K8 |
| Übriger Zustand = **Information** (laufender Betrieb) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 48 |
| Werte werden **im Minutentakt** aktualisiert (nicht live) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 48 |
| Der Betreiber sieht **keine Bestellungen und keine Bestellnummern** — Support nur über Gesundheitszustand + Absprache mit dem Inhaber | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 48 |
| Prozent-Schwelle „fast verbraucht" = **80 %** (Zahl gehört als solche in K8) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 50; Zahl → K8 |
| Ob **zusätzlich** ein anderer Weg (SMS / E-Mail) genutzt wird | [OFFEN] | Offene Fragen |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| FA-22-T1 · Standardfall gesund | Restaurant „Musterpizza" läuft normal | Übersicht zeigt KI erreichbar, Drucker online, 0 Fehler, verbrauchte Minuten, Anzahl Bestellungen | Anzeige von Bestellinhalt/Kundendaten | manuell + automatisch |
| FA-22-T2 · KI nicht erreichbar | Rufumleitung/KI-Agent gestört | Übersicht zeigt „KI nicht erreichbar" | Personendaten in der Meldung | automatisch |
| FA-22-T3 · Aktive Benachrichtigung bei Störung (Push, Pflicht) | Drucker von „Musterpizza" fällt aus | **Push-Meldung in der App** (Anzeige **Pflicht**); Meldung nennt nur Restaurant, Art, Zeitpunkt | Kundendaten/Bestellinhalt in der Benachrichtigung; Störung verschluckt | automatisch |
| FA-22-T4 · Testbestellung zählt nicht (B20) | Startklar-Prüfung erzeugte eine Testbestellung (FA-20) | „Anzahl Bestellungen" zählt die Testbestellung **nicht**; sie erscheint nicht in den Übersichten | Testbestellung in die Zählung aufnehmen | automatisch |
| FA-22-T5 · Drucker offline (Grenzfall) | Drucker getrennt | Übersicht zeigt „Drucker offline" | Bestellbezug in der Meldung | manuell am Gerät + automatisch |
| FA-22-T6 · Betreiber versucht Bestellung zu öffnen | Betreiber ruft zu „Musterpizza" die Detailsicht einer Bestellung mit Kundendaten auf | Zugriff wird verweigert; keine Bestellung, kein Kundendatum sichtbar | Anzeige einer einzelnen Bestellung/Kundendaten | automatisch |
| FA-22-T7 · Betreiber sieht keine Bestellnummer (Support) | Betreiber sucht zu einem Support-Fall nach einer Bestellnummer eines Restaurants | Keine Bestellnummer wird angezeigt; nur Gesundheitszustand sichtbar, Support über Absprache | Anzeige einer Bestellnummer | automatisch |
| FA-22-T8 · Ampel rot: Drucker offline in Öffnungszeit | „Musterpizza" ist geöffnet, Drucker fällt aus | Ampel **rot**, Grund „Drucker offline" | Rot außerhalb der Öffnungszeit; Bestellbezug in der Meldung | automatisch |
| FA-22-T9 · Ampel nicht rot: Drucker offline außerhalb Öffnungszeit (Grenzfall) | Drucker offline, aber Restaurant geschlossen | **Keine rote** Ampel wegen des Druckers (keine dringende Störung außerhalb der Öffnungszeit) | Rote Störungsmeldung außerhalb der Öffnungszeit | automatisch |
| FA-22-T10 · Ampel gelb: Minutenpaket fast verbraucht (80 %) | Verbrauch erreicht **80 %** des gebuchten Pakets | Ampel **gelb**, Grund „Minutenpaket fast verbraucht" | Gelb schon unter 80 %; KI-Abschaltung als Folge; rote Ampel | automatisch |
| FA-22-T11 · Ampel gelb: Annahmestopp über eine Stunde | Annahmestopp seit mehr als 60 Minuten aktiv | Ampel **gelb**, Grund „Annahmestopp seit über einer Stunde" | Gelb schon unter einer Stunde | automatisch |
| FA-22-T12 · Aktualisierung im Minutentakt | Störung tritt auf; Uhr wird hereingereicht | Zustand aktualisiert sich spätestens innerhalb einer Minute; nicht live | Live-Aktualisierung als Anforderung; Störung länger als eine Minute unsichtbar | automatisch |
| FA-22-T13 · Verbrauchte Minuten sichtbar | Minutenverbrauch > 0 | Übersicht zeigt verbrauchte Minuten je Restaurant | KI-Abschaltung als Folge | automatisch |
| FA-22-T14 · Zwei-Restaurant-Fall | Betreiber sieht A „Musterpizza" und B „Testdöner"; jemand versucht, über A an Bestellungen von B zu kommen | Nur Gesundheitswerte beider sichtbar; keine Bestellung/Kundendaten von A **oder** B | Übergriff auf Bestellungen/Kundendaten (fremder Tenant) | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Betrieb überwachen" (K2 noch offen)
- **Zustandsübergänge:** keiner (reine Ansicht; verändert keinen Bestell- oder Restaurant-Zustand)
- **Technische Anwendungsfälle:** TU-? (Gesundheitswerte je Tenant liefern ohne Personenbezug, Drucker-/KI-Status, Minuten-Aggregat, **Störungs-Benachrichtigung an den Betreiber ohne Personenbezug** — in K7; Rollen/Rechte in K9)
- **Verträge / Events:** liest Aggregate aus `printing`-Status, KI-Erreichbarkeit, Metering; löst bei Störung eine Benachrichtigung aus (vorläufig `health.alert`, ohne Personendaten; Weg/Namen offen, K6/K9)
- **Testszenarien:** FA-22-T1 … FA-22-T14 (Tabelle oben)
- **Nachbar-Fälle:** FA-20 (Onboarding, Restaurant startklar, Testbestellung), FA-21 (Module/Paket, verbrauchte Minuten), FA-06 (Bon/Drucker — Störung per Push), FA-13 (KI-Annahme ein/aus — KI-Störung per Push), FA-14 (Verbindungsausfall — Push), FA-23 (Annahmestopp — ob im Monitoring sichtbar, offen)

## Offene Fragen

> **Teilweise beantwortet (Runde 29):** Die Störung wird **per Push in der App** angezeigt, die Anzeige ist **Pflicht**. **Weiter offen:** Soll **zusätzlich** ein anderer Weg genutzt werden (**SMS / E-Mail**), damit der Betreiber eine Störung auch bemerkt, wenn er die App nicht offen hat? (Wirkung: Anbieterwahl, ggf. neuer Unterauftragsverarbeiter → open-questions.)

> **Frage an Sirat / Steuerberaterin (Q2):** Darf eine als **Test markierte** Bestellung (FA-20 B20) überhaupt an die **TSE**, oder muss sie fiskalisch komplett außen vor bleiben? (open-questions.md Q2.)

> **Beantwortet (Runde 48):** **Dringend (rot)** sind KI nicht erreichbar, Annahme-Gerät offline (KI automatisch pausiert) und Drucker offline — jeweils **während der Öffnungszeit**. **Gelb** sind fast verbrauchtes Minutenpaket und ein Annahmestopp seit über einer Stunde; alles Übrige ist Information ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

> **Beantwortet (Runde 48):** Der Betreiber hilft **ausschließlich** anhand des Gesundheitszustands plus **Absprache** mit dem Inhaber — er bekommt **keine** einzelnen Bestellungen und **auch keine Bestellnummern** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

> **Beantwortet (Runde 48):** Die Werte werden **im Minutentakt** aktualisiert (nicht live) ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).

> **Beantwortet (Runde 50):** Die **Prozent-Schwelle** „Minutenpaket fast verbraucht" ist **80 %** des gebuchten Pakets → Gelb ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 50). Die Zahl gehört als Wert in **K8**.

## Nicht Teil dieses Anwendungsfalls

- Einsicht in einzelne Bestellungen oder Kundendaten — ausdrücklich **ausgeschlossen** (Mitschrift Runde 1, Variante a).
- Umsatz-/Geschäftsauswertungen über den Gesundheitszustand hinaus → nicht im Piloten-Schnitt, Sirat entscheidet später.
- Modul-/Paketänderungen und Sperren → FA-21.
- Restaurant anlegen/einrichten → FA-20.
- DSGVO-Auskunft/Export/Löschung per Rufnummer (eigene Funktion im Admin-Bereich) → Briefing §6, eigener späterer Anwendungsfall.
