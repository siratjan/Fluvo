# FA-19: Schicht beginnen (Annahme-Person meldet sich am Tablet an)

- **Status:** mit Sirat durchgegangen (Runden 43 + 49, 2026-09-22)
- **Stand:** 2026-09-22
- **Hinweis:** **Neu am 2026-09-22** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 30; Inhalt nach `_gegenlesen-K1.md` B3). Schließt die Lücke, die FA-15/FA-16 (und später FA-08/FA-10) mit „offene Schicht je Person" voraussetzen, aber bisher kein Fall beschreibt. Der **Fahrer-Teil ist zurückgestellt** (ADR 0008) — dieser Fall betrifft im ersten Piloten die **Annahme/Tresen-Person**.

| | |
|---|---|
| **Ziel** | Eine Annahme-Person meldet sich zu Schichtbeginn am Tablet an, damit **jede Bestellung, Änderung, jeder Storno und der Abschluss je Mitarbeiter** (FA-16) einer Person zugeordnet sind — und der Inhaber im Log/der Tagesübersicht sieht, **wer** was getan hat. |
| **Akteur** | Annahme (die anmeldende Person) |
| **Auslöser** | Eine Person beginnt ihre Schicht und meldet sich am (ggf. geteilten) Tablet der Annahme an. |
| **Vorbedingungen** | Das Gerät ist als Annahme-Gerät des Restaurants **registriert** (Onboarding FA-20 / Geräteregistrierung, Q11). Die Person hat einen **PIN** (vom Betreiber/Inhaber angelegt, FA-20). |
| **Nachbedingungen** | Die Person ist am registrierten Gerät angemeldet; für sie ist eine **offene Schicht** mit **eigener Börse** eröffnet — **ohne** einen im System geführten Startbetrag ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 49, ADR 0012; Wechselgeld regelt jede Person außerhalb von fluvo). Die Person darf **sofort** annehmen und kassieren. Ab jetzt wird **jede** Aktion (Bestellung, Änderung, Storno, Kassieren) der **aktiven Person** zugeordnet und mit Person + Uhrzeit protokolliert ([FEST 6], Briefing §2.6). Die Anmeldung selbst ist als Ereignis dokumentiert. |

## Ist-Ablauf heute (aus der Mitschrift)

> **Nicht besprochen.** Wie sich heute beim Piloten am Telefon/Tresen jemand „anmeldet", steht nicht in der Mitschrift — heute läuft alles auf Papier, ohne Personenzuordnung; genau daraus entstehen „keiner weiß, wer was gefahren/kassiert hat" und verlorene Zettel (Mitschrift Runde 5). Nicht erfinden — siehe Offene Fragen.

## Normalablauf

1. Die Person öffnet die Annahme-Oberfläche am registrierten Tablet und gibt ihren **PIN** ein ([STACK]/[OFFEN] Q11: PIN + registriertes Gerät, Briefing §4).
2. Das System prüft den PIN gegen das registrierte Gerät und meldet die Person an; sie ist ab jetzt die **aktive Person** am Gerät.
3. Das System eröffnet für sie eine **offene Schicht** mit **eigener Börse**, **ohne Startbetrag** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 49, ADR 0012; kein Wechselgeld-Start im System) — die Person darf **sofort** annehmen und kassieren.
4. Ab jetzt ordnet das System **jede** Aktion (Bestellung anlegen FA-01/FA-05, Änderung/Storno FA-11, Kassieren FA-15) der **aktiven Person** zu und hält sie mit Person + Uhrzeit fest.
5. Am Schichtende macht die Person ihren Abschluss je Mitarbeiter → **FA-16**.

## Ausnahmeabläufe

- **1a. Falscher PIN / gesperrt** (zweigt von Schritt 1 ab): Nach mehreren Fehlversuchen greift eine **Sperre** (Rate-Limit, Briefing §4/Sicherheit; Details Q11). Endet in: keine Anmeldung; Hinweis, dass gesperrt ist. → genaue Schwelle Q11.
- **1b. Nicht registriertes Gerät** (zweigt von Schritt 1 ab): Der PIN allein genügt **nicht** — die Anmeldung ist nur am **registrierten Gerät** möglich ([FEST]/Briefing §4). Endet in: keine Anmeldung; das Gerät muss erst registriert werden (FA-20, Q11).
- **2a. Ein Tablet, Personenwechsel per PIN** (zweigt von Schritt 2 ab): Es gibt **ein** Tablet am Tresen; genau **eine** Person ist zugleich am Gerät **aktiv** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 43). Die aktive Person wechselt durch erneute **PIN-Eingabe**. Die bisherige Person bleibt mit ihrer **offenen Schicht** und **eigener Börse** bestehen, bis sie ihren Abschluss (FA-16) macht. `[VORSCHLAG security-reviewer, Rat 2026-09-21]`: **kurze Sperre je PIN** am geteilten Tablet und **jede Aktion mit der aktiven Person stempeln** — als **Vorschlag** aufgenommen, **nicht** von Sirat entschieden (siehe Offene Fragen). Endet in: neue aktive Person; die bisherige bleibt bis zu ihrem Abschluss (FA-16) offen.
- **2b. Internet fällt beim Anmelden aus** (zweigt von Schritt 2 ab): Ob sich eine Person **offline** anmelden kann (PIN-Prüfung ohne Server) ist offen → FA-14 / Q11; hier **nicht** gelöst. Endet in: siehe FA-14 / Offene Fragen.

## Darf nicht

- Eine Anmeldung ist **nicht** allein mit dem PIN möglich — sie braucht **zusätzlich das registrierte Gerät** ([FEST]/Briefing §4; Sicherheit: „PIN-Login nur zusammen mit registriertem Gerät").
- Nach der Anmeldung bleibt **keine** Aktion **ohne** zugeordnete Person: Bestellung, Änderung, Storno und Kassieren tragen **immer** die aktive Person (sonst lässt sich FA-16 nicht je Mitarbeiter rechnen und das Inhaber-Log nicht führen, ADR 0007).
- Die Schicht wird **nicht** mit einem **Wechselgeld-Start** eröffnet und **nicht** blockiert, bis jemand eine Wechselgeld-Ausgabe bestätigt — beides gibt es nicht ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 49, ADR 0012; Wechselgeld liegt außerhalb von fluvo). Die Person darf sofort annehmen und kassieren.
- Der **PIN** wird **nicht** geloggt und **nicht** im Klartext gespeichert; keine Personendaten in Logs/URLs (Briefing §8, Sicherheit).
- Eine Person eines Restaurants meldet sich **nicht** an einem Gerät eines **anderen** Restaurants an ([FEST 4]).
- Die Anmeldung/Umschaltung verschwindet **nicht** lautlos; sie ist als Ereignis dokumentiert ([FEST 6], Briefing §2.6).

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Anmeldung der Annahme-Person zu Schichtbeginn per **PIN + registriertes Gerät**; danach ist jede Aktion einer Person zugeordnet | [ENTSCHIEDEN Sirat 2026-09-22] / [OFFEN] Q11 | Mitschrift Runde 30; `_gegenlesen-K1.md` B3 |
| Jede Bestellung, Änderung, jeder Storno und das Kassieren werden der **aktiven Person** zugeordnet (Voraussetzung für FA-16 und das Inhaber-Log) | [ENTSCHIEDEN Sirat 2026-09-21] | Mitschrift Runde 12/17/18, ADR 0007 |
| Die Schicht wird mit **eigener Börse**, aber **ohne Startbetrag** eröffnet; **kein Wechselgeld-Start** im System und keine Wechselgeld-Bestätigung — die Person darf sofort annehmen und kassieren | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 49, ADR 0012 (ändert Runde 43 / ADR 0007 → 0011) |
| PIN-Login nur mit registriertem Gerät, mit **Rate-Limit und Sperre** | [FEST] / [OFFEN] Q11 | Briefing §4; Sicherheit; open-questions.md Q11 |
| Anmeldung als Ereignis dokumentiert; Kassen-/Ereignisdaten nur anfügen | [FEST 6] | Briefing §2.6 |
| Gerätebindung, Sperrschwelle nach Fehlversuchen, Gültigkeit am geteilten Gerät | [OFFEN] Q11 | open-questions.md Q11 |
| `[VORSCHLAG security-reviewer, Rat 2026-09-21]`: geteiltes Tablet → **kurze Sperre je PIN**, jede Aktion mit aktiver Person stempeln | [VORSCHLAG] | Mitschrift, Rat (`/council`) 2026-09-21 |
| Eine Schicht **ohne Abschluss bleibt aktiv** und muss **ausdrücklich beendet** werden; **keine** automatische Abmeldung nach Inaktivität | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 31 |
| Eine **liegengebliebene** Schicht (ohne Abschluss) beendet **jede angemeldete Annahme-Person oder der Inhaber** — nicht nur die Person selbst; wer das auslöst, wird **mitprotokolliert**; der Abschluss je Mitarbeiter (FA-16) bleibt der Person zugeordnet, die die Schicht hatte | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 31 (Nachtrag), bestätigt Runde 43 |
| **Ein Tablet** am Tresen; genau **eine** Person je Gerät ist zugleich **aktiv**, Wechsel per **PIN**; die andere Person hat nur eine offene Schicht mit eigener Börse | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 43 |
| Bedienbar ohne Schulung, Touch, wenige Schritte | [FEST] | Briefing §1, §9.9 |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Anmeldung | Registriertes Tablet, Person M1 (PIN `1357`) meldet sich an | M1 angemeldet, offene Schicht mit Börse **ohne Startbetrag** eröffnet; M1 darf sofort annehmen/kassieren; Anmeldung als Ereignis dokumentiert | Schicht mit Wechselgeld-Start eröffnen; einen Wechselgeld-Bestätigungsschritt verlangen | manuell am Gerät + automatisch |
| Zuordnung jeder Aktion | M1 angemeldet, legt eine Bestellung an und kassiert eine Tresen-Bestellung | Beide Aktionen sind **M1** zugeordnet (Person + Uhrzeit), sichtbar im Inhaber-Log; fließen in M1s Abschluss (FA-16) | Aktion ohne zugeordnete Person | automatisch |
| Falscher PIN, Sperre (Grenzfall) | Mehrfach falscher PIN | Nach der Schwelle **gesperrt** (Rate-Limit); keine Anmeldung; genaue Schwelle Q11 | Unbegrenzte Fehlversuche; Anmeldung trotz Sperre | automatisch |
| Nicht registriertes Gerät | Richtiger PIN auf einem **nicht** registrierten Gerät | Anmeldung **nicht** möglich (PIN allein genügt nicht) | Anmeldung nur mit PIN ohne registriertes Gerät | automatisch |
| Personenwechsel am selben Tablet (PIN) | M1 aktiv am einzigen Tablet, M2 (PIN `2468`) meldet sich an | M2 wird die **einzige** aktive Person; folgende Aktionen sind M2 zugeordnet; M1s Schicht bleibt mit eigener Börse bis zu ihrem Abschluss (FA-16) offen | Zwei aktive Personen gleichzeitig am selben Gerät; M2s Aktionen M1 zurechnen; M1s Schicht stillschweigend schließen | manuell + automatisch |
| Schicht bleibt aktiv, keine Auto-Abmeldung (Grenzfall) | M1 angemeldet, Tablet längere Zeit unbenutzt | M1s Schicht **bleibt aktiv**; keine automatische Abmeldung; sie muss ausdrücklich beendet werden | Schicht nach Inaktivität still abmelden/schließen | automatisch |
| Liegengebliebene Schicht durch andere Person beenden | M1s Schicht liegt ohne Abschluss offen; Inhaber **oder** eine angemeldete Annahme-Person beendet sie | Schicht beendet; **wer** sie beendet hat, wird protokolliert; der Abschluss (FA-16) bleibt **M1** zugeordnet | Beenden ohne Protokoll der auslösenden Person; Abschluss der falschen Person zurechnen | manuell + automatisch |
| Person startet sofort (ohne Inhaber) | M1 meldet sich an, kein Inhaber anwesend | Schicht ist offen (ohne Startbetrag), M1 darf **sofort** annehmen und kassieren; **keine** Wechselgeld-Bestätigung nötig ([ENTSCHIEDEN Sirat 2026-09-22], Runde 49, ADR 0012) | Schicht blockieren, bis ein Inhaber etwas bestätigt | manuell am Gerät + automatisch |
| PIN nicht geloggt | Anmeldung mit PIN | PIN erscheint **nicht** in Logs/URLs/Fehlermeldungen; nur die Person-ID wird geloggt | PIN im Klartext speichern/loggen | automatisch |
| Internet weg beim Anmelden (Grenzfall offline) | Netz getrennt, Person will sich anmelden | Verhalten nach FA-14 / Q11; kein stiller Falschzustand | Anmeldung gilt fälschlich als erfolgt | manuell (AP-002) |
| Zwei-Restaurant-Fall | Person von Restaurant A versucht sich am Gerät von Restaurant B (`+49 30 23125 402`) anzumelden | Anmeldung **nicht** möglich; A-Person hat an B-Gerät keinen Zugang | Übergriff auf fremden Tenant | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Schichtbeginn → Anmeldung" (K2 noch offen)
- **Zustandsübergänge:** **keiner** an einer Bestellung — eröffnet wird eine **Schicht** (Personen-/Kassenkontext), kein Bestellstatus. Liefert die Personenzuordnung für FA-01/FA-05 (anlegen), FA-11 (ändern/stornieren), FA-15 (kassieren), FA-16 (Abschluss).
- **Technische Anwendungsfälle:** TU-? (PIN-Anmeldung am registrierten Gerät, genau eine aktive Person je Gerät, Schicht **ohne Startbetrag** eröffnen, jede Aktion mit aktiver Person stempeln; Zuordnung in K7). Hängt an Q11.
- **Verträge / Events:** vorläufig `staff.signed_in`, `shift.opened` (Namen offen, K6); ein Ereignis für eine Wechselgeld-Bestätigung gibt es **nicht** (ADR 0012); die aktive Person fließt als Kontext in `createOrder`, `order.amended`, `order.cancelled`, das Kassieren (FA-15) und `counter.shift_settled` (FA-16)
- **Testszenarien:** FA-19-T1 … FA-19-T9 (Tabelle oben)
- **Nachbar-Fälle:** FA-16 (Abschluss je Mitarbeiter — die hier eröffnete Schicht wird dort geschlossen), FA-15 (Kassieren der angemeldeten Person zugeordnet), FA-11 (Änderung/Storno mit Person im Log, ADR 0007), FA-05 (Annahme von Hand durch die angemeldete Person), FA-20 (Mitarbeiter/PIN und Geräteregistrierung), FA-10 (Fahrer-Kassensturz — **zurückgestellt**, ADR 0008; die Fahrer-Schicht kommt mit der Fahrer-App)

## Offene Fragen

> **Beantwortet (Runde 31):** Eine **Schicht ohne Abschluss bleibt aktiv** und muss **ausdrücklich beendet** werden; es gibt **keine** automatische Abmeldung nach Inaktivität ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31). Meldet sich M1 ab und M2 an, ohne dass M1 seinen Abschluss (FA-16) gemacht hat, bleibt **M1s Schicht offen**, bis sie ausdrücklich beendet wird (siehe Ausnahme 2a).

> **Beantwortet (Runde 31 Nachtrag, bestätigt Runde 43):** Eine **liegengebliebene** Schicht beendet **jede angemeldete Annahme-Person oder der Inhaber** — nicht nur die Person selbst ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 31 Nachtrag / Runde 43). „Annahme" = jede angemeldete Annahme-Person (Lesart in Runde 43 bestätigt). Der Abschluss je Mitarbeiter (FA-16) bleibt der Person zugeordnet, die die Schicht hatte; wer den Abschluss einer fremden Schicht auslöst, wird mitprotokolliert.

> **Beantwortet (Runde 43):** Es gibt **ein** Tablet am Tresen; genau **eine** Person ist je Gerät zugleich **aktiv**, gewechselt wird per **PIN**; die andere Person hat nur eine offene Schicht mit eigener Börse ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 43). Damit ist die frühere Frage „mehrere Personen gleichzeitig am selben Gerät" geklärt.

> **Beantwortet (Runde 49, ADR 0012):** Wechselgeld wird **nirgendwo im System eingerechnet** — es gibt **keinen** Wechselgeld-Start und keine Wechselgeld-Bestätigung. Die Schicht startet **ohne Startbetrag**; die Person darf **sofort** annehmen und kassieren ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 49, ADR 0012; ersetzt die Regelung aus Runde 43 / ADR 0007 → 0011). Damit entfällt auch die frühere Frage „Betrieb, wenn der Inhaber später kommt".

> **Frage an Sirat / Q11:** Gerätebindung, **Sperrschwelle** nach Fehlversuchen und ob sich eine Person **offline** anmelden kann (FA-14) — offen in Q11. Der Vorschlag des security-reviewers (kurze Sperre je PIN am geteilten Tablet, jede Aktion stempeln) ist **noch nicht** entschieden.

## Nicht Teil dieses Anwendungsfalls

- Der **Abschluss** je Mitarbeiter am Schichtende → FA-16.
- Das **Kassieren** der einzelnen Bestellung und die Zuordnung zur kassierenden Person → FA-15.
- **Anlegen** von Mitarbeitern und PINs sowie die **Geräteregistrierung** → FA-20 (und Q11).
- Wie der **Personenwechsel** am geteilten Gerät auf der Oberfläche aussieht → K10.
- **Fahrer-Schicht** und Fahrer-Anmeldung → **zurückgestellt** (Fahrer-Teil später als eigene App, ADR 0008; FA-08/FA-10).
- Technische Details der **Anmeldung** (Hash, Rate-Limit, Session) → TU in K7 / Q11.
