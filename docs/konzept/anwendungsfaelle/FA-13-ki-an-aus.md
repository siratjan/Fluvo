# FA-13: KI-Annahme ein- und ausschalten (Overflow)

- **Status:** mit Sirat durchgegangen (Runde 45, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Das Restaurant schaltet die KI-Annahme jederzeit ein oder aus — z. B. um bei wenig Betrieb lieber selbst mit den Kunden zu sprechen. Ist die KI aus, klingelt das Telefon wieder normal. |
| **Akteur** | Inhaber, Annahme (Betriebsrecht: beide) |
| **Auslöser** | Der Inhaber oder die Annahme legt den An/Aus-Schalter der KI-Annahme um. |
| **Vorbedingungen** | Das Restaurant hat das KI-Anrufmodul gebucht und eingerichtet (durch den Betreiber, FA-21). Der Handelnde ist als Inhaber oder Annahme angemeldet. |
| **Nachbedingungen** | Die KI-Annahme ist **an** oder **aus**; der Zustand ist im System dokumentiert (Betriebsrecht-Ereignis). Ist sie **aus**, klingelt das Telefon normal durch (kein KI-Eingriff). Ist sie **an**, geht die KI im Overflow-Modus ran, wenn niemand abnimmt — **aber nur innerhalb der Öffnungszeit**. Außerhalb der Öffnungszeit klingelt das Telefon durch wie heute, ohne KI. |

## Ist-Ablauf heute (aus der Mitschrift, Runde 3)

1. Heute gibt es keine KI: Das Telefon (ein Handy) klingelt, ein Kollege nimmt ab und schreibt von Hand auf.
2. Nimmt niemand ab, klingelt es ins Leere; einen An/Aus-Schalter für eine KI gibt es nicht. *(Ob und wie eine Vertretung einspringt, wurde nicht besprochen — nicht in der Mitschrift.)*

> Mit fluvo kommt der An/Aus-Schalter neu hinzu. „Aus" soll den heutigen Zustand herstellen: Das Telefon klingelt normal ([FEST 18]: Fallback bei Voice ist das normal durchklingelnde Telefon).

## Normalablauf (KI ausschalten)

1. Der Inhaber oder die Annahme öffnet die Einstellungen und legt den Schalter „KI-Annahme" auf **aus** ([ENTSCHIEDEN Sirat 2026-09-18], Betriebsrecht Annahme und Inhaber, Mitschrift Runde 11).
2. Das System schaltet die KI-Annahme ab und hält die Umschaltung als Ereignis fest.
3. Ab jetzt **klingelt das Telefon normal** — die KI geht bei Nichtmelden nicht mehr ran ([FEST 10] Overflow-Modus, im MVP An/Aus-Schalter; [FEST 18] Fallback).
4. Das System zeigt deutlich an, dass die KI **aus** ist (`[VORSCHLAG]` Jarvis; genaue Anzeige → K10).

## Normalablauf (KI einschalten)

1. Der Inhaber oder die Annahme legt den Schalter auf **an**.
2. Das System aktiviert die KI-Annahme im **Overflow-Modus**: Die KI geht nur ran, **wenn niemand abnimmt** ([FEST 10]) und **nur innerhalb der Öffnungszeit**. Außerhalb der Öffnungszeit klingelt das Telefon durch wie heute — keine KI, keine Ansage, keine Vorbestellungsannahme nach Ladenschluss ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 14). Hat ein Tag **mehrere Zeitfenster** (z. B. Mittagspause, FA-18/Runde 22 B16), gilt **in der Pause** ebenfalls „außerhalb der Öffnungszeit": Das Telefon klingelt durch wie heute, die KI geht nicht ran — **vorbehaltlich AP-001/Q15**.
3. Das System hält die Umschaltung als Ereignis fest und zeigt an, dass die KI **an** ist.

## Ausnahmeabläufe

- **1a. Laufendes KI-Gespräch beim Ausschalten** (zweigt von Schritt 1 ab): Wird ausgeschaltet, während die KI gerade ein Gespräch führt, läuft dieses Gespräch **zu Ende** ([ENTSCHIEDEN Sirat 2026-09-22, „erstmal"], Mitschrift Runde 45; früher `[VORSCHLAG]` Jarvis). Erst danach greift „aus". Endet in: laufendes Gespräch abgeschlossen, danach keine neue KI-Annahme.
- **1c. Automatische Pause bei nicht erreichbarem Annahme-Gerät** (kann jederzeit auftreten, unabhängig vom Schalter): Merkt der **Server**, dass das **Annahme-Gerät nicht erreichbar** ist (z. B. Internetausfall im Laden), **pausiert er die KI-Annahme automatisch** — die KI geht ran und **sagt freundlich ab**, bis das Gerät wieder online ist; sie legt **keine** Bestellung an, die der Laden nicht sehen kann ([ENTSCHIEDEN Sirat 2026-09-22, Variante A], Mitschrift Runde 45; Ablauf in **FA-14**). Das ist **kein Schalter** und **endet von selbst**, sobald das Gerät wieder erreichbar ist. Abgrenzung: anders als bei **„aus" (von Hand)** nimmt hier **niemand** ab (das Personal ist ja offline), und anders als beim **Annahmestopp (FA-23)** ist es keine bewusste Betriebsentscheidung, sondern eine automatische Reaktion auf eine Störung. Endet in: KI pausiert und sagt ab, solange das Gerät offline ist; nimmt automatisch wieder an, sobald es online ist — keine unsichtbare Bestellung.
- **1b. Fahrer versucht zu schalten** (zweigt von Schritt 1 ab): Ohne Betriebsrecht ist Schalten nicht möglich. Endet in: Zustand unverändert; nur Inhaber/Annahme dürfen (Mitschrift Runde 11). *(Eine eigene Rolle „Koch" mit Anmeldung gibt es im Piloten nicht.)*
- **2a. Umschalten wirkt nicht auf die Rufumleitung** (zweigt von Schritt 2 ab): Wie „aus" technisch auf die Rufumleitung bei Nichtmelden wirkt (und ob „aus" wirklich sofort normal durchklingelt), hängt an **Q1 / Risikotest AP-001** → hier nur als **Abhängigkeit** vermerkt, nicht gelöst. Endet in: Verhalten bestätigt der Rufumleitungs-Test.
- **2b. Umschalten offline** (zweigt von Schritt 2 ab): Ob sich die KI-Annahme ohne Internet umschalten lässt, hängt am Zusammenspiel mit der Voice-Plattform (braucht Internet, [FEST 18]) → siehe Offene Fragen und FA-14. Endet in: siehe FA-14 / Offene Fragen.
- **KIstoerung. KI trotz „an" technisch gestört / nicht erreichbar** (kann jederzeit auftreten): Ist die KI eingeschaltet, aber technisch **nicht erreichbar** (eine der Störungen Drucker/KI/Verbindung, Runde 29), bekommt das Personal eine **Push-Meldung in der App**; diese Anzeige ist **Pflicht** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29 — siehe auch FA-22, FA-06, FA-14). Endet in: sichtbare Push-Störungsmeldung; das Personal kann selbst annehmen (Telefon klingelt durch).

## Darf nicht

- **Nur** Inhaber und Annahme dürfen die KI schalten (Betriebsrecht); **nicht** der Fahrer ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 11). (Eine eigene Rolle „Koch" mit Anmeldung gibt es im Piloten nicht.)
- Ist die KI **aus**, greift sie **nicht** ins Telefon ein — es klingelt normal durch ([FEST 10], [FEST 18]).
- Ist die KI **an**, geht sie **nicht** vor dem Personal ran, sondern **nur** im Overflow (wenn niemand abnimmt) ([FEST 10]).
- Die KI geht **außerhalb der Öffnungszeit nicht** ran — keine Ansage, keine Vorbestellung nach Ladenschluss; das Telefon klingelt durch wie heute ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 14).
- Der Schalter dieses Restaurants wirkt **nicht** auf ein anderes Restaurant ([FEST 4]).
- Das Umschalten ist **nicht** dasselbe wie das Buchen/Sperren des Moduls durch den Betreiber (FA-21) — hier wird ein gebuchtes Modul nur an-/ausgeschaltet, nicht geschaltet, was gebucht ist.
- „KI aus" ist **nicht** dasselbe wie der **Annahmestopp** (FA-23): Bei „KI aus" **nimmt das Personal selbst an** (Telefon klingelt durch); beim Annahmestopp **nimmt niemand** an, obwohl die KI rangeht und absagt ([ENTSCHIEDEN Sirat 2026-09-21], Mitschrift Runde 21/23). Als **vierte Variante** kommt die **Betreiber-Sperre** (FA-21) hinzu — anders als „KI aus", Annahmestopp und die automatische Pause ist sie **vom Restaurant nicht schaltbar**, sondern allein Sache des Betreibers ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 48).
- Die Umschaltung verschwindet **nicht** lautlos; sie ist als Ereignis dokumentiert ([FEST] Briefing §2.6).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| KI-Annahme jederzeit beliebig ein-/ausschaltbar (z. B. bei wenig Betrieb persönlich sprechen) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 13 |
| Schalten ist ein **Betriebsrecht** — Annahme und Inhaber | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 11 |
| Overflow-Modus: KI geht nur ran, wenn niemand abnimmt; im MVP An/Aus-Schalter | [FEST 10] | Briefing §2 (10) |
| KI ist nur aktiv, wenn **eingeschaltet UND innerhalb der Öffnungszeit**; außerhalb klingelt das Telefon durch wie heute (keine Ansage, keine Vorbestellung nach Ladenschluss) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 14 |
| In einer **Pause** zwischen zwei Zeitfenstern (Mittagspause, FA-18) gilt „außerhalb der Öffnungszeit": Telefon klingelt durch, KI geht nicht ran — vorbehaltlich AP-001/Q15 | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 22 (B16) |
| KI aus → Telefon klingelt normal durch (Fallback) | [FEST 18] | Briefing §2 (18), §5.4 |
| Laufendes KI-Gespräch läuft beim Ausschalten zu Ende („erstmal") | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 45 |
| Bei **nicht erreichbarem Annahme-Gerät** pausiert der Server die KI-Annahme **automatisch** (KI sagt ab, kein Schalter, endet von selbst); Ablauf in FA-14 | [ENTSCHIEDEN Sirat 2026-09-22, Variante A] | Mitschrift Runde 45 |
| Deutlich sichtbar, ob die KI gerade an ist | [VORSCHLAG] | Jarvis (Anzeige → K10) |
| Wirkung des Ausschaltens / der Öffnungszeit auf die Rufumleitung bei Nichtmelden | [OFFEN] Q1 | open-questions.md Q1 / Risikotest AP-001 |
| Eine technische **KI-Störung** (nicht erreichbar trotz „an") wird als **Push in der App** angezeigt; die Anzeige ist **Pflicht** (Drucker/KI/Verbindung) | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 (Störungsmeldung) |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Ausschalten | Inhaber legt Schalter auf „aus" | KI aus, Ereignis dokumentiert, Anzeige „KI aus"; Telefon klingelt bei Anruf normal | KI geht trotzdem ran; Umschaltung nicht dokumentiert | manuell am Gerät + Testanruf (hängt an AP-001) |
| Standardfall Einschalten | Annahme legt Schalter auf „an", innerhalb der Öffnungszeit | KI an im Overflow; geht nur ran, wenn niemand abnimmt | KI geht vor dem Personal ran | manuell + Testanruf |
| KI an, aber außerhalb der Öffnungszeit (Grenzfall) | KI eingeschaltet, Anruf nach Ladenschluss, niemand nimmt ab | Telefon klingelt durch wie heute; KI geht **nicht** ran, keine Ansage, keine Vorbestellung | KI nimmt nach Ladenschluss an oder spielt Ansage | manuell + Testanruf (hängt an AP-001) |
| Annahme darf schalten | Angemeldet als Annahme, schaltet um | Umschaltung möglich (Betriebsrecht) | Umschaltung verweigern trotz Betriebsrecht | automatisch |
| Fahrer darf nicht (Ausnahme) | Angemeldet als Fahrer, versucht zu schalten | Nicht möglich; Zustand unverändert | Fahrer schaltet KI | automatisch |
| Laufendes Gespräch beim Ausschalten (Grenzfall) | KI führt gerade ein Gespräch, jemand schaltet aus | Gespräch läuft zu Ende, danach kein neuer KI-Anruf | Laufendes Gespräch bricht mitten drin ab | manuell (Testanruf) |
| KI trotz „an" gestört (Störungsmeldung, Runde 29) | KI eingeschaltet, aber technisch nicht erreichbar | **Push-Meldung** in der App (Anzeige **Pflicht**); Personal kann selbst annehmen | Störung verschlucken; keine Anzeige | manuell + automatisch |
| Automatische Pause bei offline-Gerät (Runde 45) | KI „an", Annahme-Gerät nicht erreichbar (Ausfall im Laden), Anruf kommt | Server pausiert die KI-Annahme automatisch; KI sagt freundlich ab; kein Schalter; nimmt nach Netz-Rückkehr von selbst wieder an (FA-14) | KI legt eine Bestellung an, die der Laden nicht sieht; Pause bleibt hängen | Testanruf + automatisch (hängt an AP-001) |
| Umschalten offline (Grenzfall offline) | Kein Internet, Schalter umlegen | Verhalten nach FA-14 / Offene Frage; kein stiller Falschzustand | Zustand gilt fälschlich als geändert | manuell (AP-001/AP-002) |
| Zwei-Restaurant-Fall | Restaurant A schaltet KI aus; Restaurant B `+49 30 23125 403` bleibt an | Nur A ist aus; bei B geht die KI weiter im Overflow ran | A's Schalter wirkt auf B | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „KI-Annahme an/aus schalten" (Betriebseinstellung, K2 noch offen)
- **Zustandsübergänge:** **keiner** an einer Bestellung — geschaltet wird eine Tenant-/Betriebseinstellung (Overflow-Modus), kein Bestellstatus
- **Technische Anwendungsfälle:** TU-? (Overflow-Flag setzen, Wirkung auf Rufumleitung/Voice-Plattform, Anzeige des Zustands; Zuordnung in K7). Abhängig von AP-001.
- **Verträge / Events:** Overflow-Modus als Teil der Entitlements/Tenant-Konfiguration ([FEST 5]); Umschaltung als Ereignis (vorläufig `tenant.ai_intake_toggled`, K6 noch offen)
- **Testszenarien:** FA-13-T1 … FA-13-T8 (Tabelle oben)
- **Nachbar-Fälle:** FA-01 (KI nimmt Anruf an — nur wenn „an"), FA-03 (KI übergibt an Menschen), FA-21 (Betreiber bucht/sperrt das Modul — Abgrenzung), FA-18 (Öffnungszeiten — Verhalten außerhalb, Pausenzeiten), FA-14 (Umschalten/Betrieb ohne Internet), FA-23 (Annahmestopp — Abgrenzung: KI aus vs. niemand nimmt an), Risikotest AP-001 (Rufumleitung)

## Offene Fragen

> **Beantwortet (Runde 45):** Ein **gerade geführtes KI-Gespräch** läuft beim Ausschalten **zu Ende** — „aus" greift danach ([ENTSCHIEDEN Sirat 2026-09-22, „erstmal"], Mitschrift Runde 45).

> **Frage an Sirat / K10:** Wo und wie sieht das Personal **deutlich**, ob die KI gerade **an** ist (damit niemand versehentlich Anrufe verpasst oder doppelt annimmt)?

> **Frage an Risikotest AP-001 / Q1:** Wie wirkt „KI aus" technisch auf die **Rufumleitung bei Nichtmelden** — klingelt es dann sofort normal, oder braucht es einen Umweg? (open-questions.md Q1.)

## Nicht Teil dieses Anwendungsfalls

- Das **Buchen oder Sperren** des KI-Moduls und des Minutenpakets durch den Betreiber → FA-21.
- Der **Gesprächsablauf** der KI selbst → FA-01 / K4 (Gesprächsdesign).
- **Eskalation**, wenn die KI an ist, aber niemand für die Übergabe erreichbar ist → FA-03 / Q4.
- Die genaue **Wirkung auf die Rufumleitung** → Risikotest AP-001 / Q1.
- **Öffnungszeiten, Ruhetage, Urlaub** pflegen → FA-18.
- **Annahmestopp** („keine Lieferung mehr" / „gar nichts mehr") → FA-23 (eigener Fall, andere Bedeutung als „KI aus").
