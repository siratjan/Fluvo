# Gesprächsnotizen K1 — Rohmaterial für die Anwendungsfälle

Mitschrift von Jarvis aus dem Gespräch mit Sirat. Kein Artefakt, sondern die Quelle, aus der `requirements-engineer` die FA-Entwürfe schreibt. Aussagen von Sirat sind als solche markiert; alles andere ist Einordnung oder Frage.

## 2026-09-18 · Runde 1: Schnitt und Betreiber-Zentrale

**Vorgehen (Sirat):** Alles durchgehen. Sirat erzählt, was abgebildet werden muss; danach wird geprüft, ob der Schnitt FA-01 … FA-14 ausreicht.

**Neuer Schwerpunkt (Sirat):** Zuerst das Gesamtsystem — eine Zentrale, in der ein neues Restaurant aufgenommen (Onboarding) und überwacht wird. Darunter hängen je Restaurant die Module Anrufmanager, Küchendisplay, Fahrer.

**Zwei Nutzer der Zentrale (Sirat):**
- **Betreiber** (fluvo, heute Sirat): legt Restaurants an, richtet ein, überwacht.
- **Inhaber** des Restaurants: geht in sein eigenes Profil und ändert selbst, z. B. Preise — Begründung: fluvo soll schnell wachsen, Änderungen dürfen nicht an Sirat hängen.

**Onboarding-Daten (Vorschlag Jarvis aus Briefing §5.2, von Sirat als Ausgangspunkt bestätigt — „vielleicht kommen noch weitere dazu"):**
Name/Adresse/Steuerdaten · Öffnungszeiten · Liefergebiet, Mindestbestellwert, Liefergebühr · Speisekarte mit Optionen, Allergenen, Steuersatz · gebuchte Module und Minutenpaket · Rufnummer und Rufumleitung · Drucker · Mitarbeiter und Fahrer mit PIN.
Reihenfolge beim Piloten: noch offen.

**Überwachung (Sirat, entschieden):** Variante (a) — Gesundheitszustand je Restaurant (KI erreichbar, Drucker online, Fehler, verbrauchte Minuten, Anzahl Bestellungen). **Keine** Einsicht in einzelne Bestellungen mit Kundendaten.
→ Folge: Die Zentrale zeigt dem Betreiber keine Personendaten fremder Tenants. Für K9 (Rollen und Rechte) und `tenant-isolation-guard` festhalten.

**Einordnung Jarvis:**
- Passt zum Briefing: Tenant + Entitlements [FEST 4, 5], Speisekarten-Digitalisierung als Onboarding-Werkzeug (§3).
- Fehlt im bisherigen Schnitt: Akteur „Betreiber". Vorschlag eigener Block FA-20 ff. „Betreiber-Zentrale"; FA-12 (Speisekarte pflegen) wird Teil der Inhaber-Selbstbedienung.
- Risiko benannt: Im Konzept aufnehmen ja; beim Bauen nicht vor dem Durchstich Anruf → Bon → Fahrer. Reihenfolge wird in K11 entschieden.

## 2026-09-18 · Runde 2: Wer darf was, Preisänderung, Gerät

**Aufteilung Inhaber / Betreiber (Vorschlag Jarvis, von Sirat bestätigt):**

| Inhaber selbst | Nur Betreiber |
|---|---|
| Preise, Artikel, Optionen, „heute aus" | Restaurant anlegen / sperren |
| Öffnungszeiten, Urlaub | Module und Minutenpaket |
| Liefergebiet, Mindestbestellwert, Liefergebühr | Rufnummer und KI-Agent einrichten |
| Mitarbeiter und Fahrer anlegen, PIN zurücksetzen | Steuerdaten, TSE-Einrichtung |
| KI-Annahme an/aus | Drucker koppeln (mindestens beim ersten Mal) |

**Preisänderung (Sirat):** Der Inhaber legt selbst fest, ab wann sie gilt — z. B. „ab morgen" oder „ab diesem/nächstem Monat". → Preise brauchen ein Gültig-ab-Datum. Bereits aufgenommene Bestellungen behalten ihren Preis (Briefing §5.2, eingefroren).

**Gerät (Sirat):** Das Inhaber-Profil wird auf Tablet oder Handy bedient, nicht am PC. → Profil muss für kleine Bildschirme und Touch gebaut sein (für K10 festhalten).

## 2026-09-18 · Runde 3: Nachträge Zentrale, Ist-Ablauf beim Piloten

**Preisänderung „sofort" (Sirat):** Soll möglich sein — zusätzlich zu „gültig ab Datum". Bedingung von Sirat: Es darf dabei kein laufendes KI-Gespräch getroffen werden. (Vorschlag Jarvis, Nächster-Geschäftstag-Regel, damit abgelehnt.)
→ Regel-Kandidat für K6/K7: Ein laufendes Gespräch rechnet mit dem Preisstand vom Gesprächsbeginn zu Ende; die Änderung gilt ab dem nächsten Anruf. Wie genau, klärt der technische Anwendungsfall — fachlich gilt: Der Kunde zahlt nie einen anderen Preis, als ihm am Telefon genannt wurde.

**Allergene und Steuersatz (Sirat, entschieden):** Variante (b) — Inhaber darf selbst ändern, mit deutlicher Warnung und Protokoll. Haftungsfrage → Anwalt.

**Ist-Ablauf Telefonbestellung beim Piloten (Sirat):**
1. Das Telefon (ein Handy) klingelt. Der Kollege am Telefon nimmt ab, fragt, was es sein darf, und schreibt von Hand auf: Gerichte, Adresse, Name, ggf. Besonderheiten. Legt auf.
2. Derselbe Kollege rechnet danach aus, was die Bestellung kostet, und gibt den Zettel in die Küche.
3. Die Küche gibt den Zettel an mehrere Stationen weiter; anhand des Zettels wird abgestimmt, was wann gemacht wird.
4. Ist das Essen fertig, wird alles Zugehörige in Boxen gepackt und dem Fahrer übergeben.
5. Der Fahrer fährt aus, kassiert vom Kunden den Betrag, der auf der Rechnung steht, und kommt zurück.

**Beobachtungen Jarvis (noch zu klären):**
- Gerechnet wird *nach* dem Auflegen — erfährt der Kunde heute am Telefon überhaupt den Preis?
- Ein Zettel, mehrere Stationen: Wer koordiniert, damit alles gleichzeitig fertig ist?
- Sirats Gesamtbild enthält das Küchendisplay; AP-003 schließt es bisher aus („nicht Teil dieses Pakets"). Schnitt mit Sirat klären.
- „Rechnung" beim Fahrer: Ist das der Zettel oder ein Kassenbeleg? Wird heute in eine Kasse gebucht?

## 2026-09-18 · Runde 4: Annahme und Küche im Detail

**Preis und Lieferzeit am Telefon (Sirat):** Der Preis wird nur auf Wunsch des Kunden genannt. Nach der Lieferzeit fragen rund 90 % der Anrufer; sie wird dann geschätzt.
→ Für FA-01/K4: Die KI braucht eine Antwort auf „Wie lange dauert es?". Woher die Schätzung kommt (fester Wert des Inhabers, je Auslastung?), ist offen — Live-ETA ist laut Briefing V2.

**Zettel (Sirat):** Bestellung wird auf einen Zettel mit Durchschlag (Kohlepapier) geschrieben. Ein Exemplar bleibt an der Station (Annahme), das andere wird durch die Küche gereicht, bis es wieder zurück ist.

**Mehrere Stationen (Sirat):** Der Zettel durchläuft mehrere Stationen; abgestimmt wird durch Zuruf, teils durch Abschreiben. Kein festes Verfahren.

**Küchendisplay (Sirat, entschieden):** Nicht im Schnitt. Es bleibt beim Bon. → FA-07 wie vorgeschlagen (ohne Display); offen ist, ob ein Bon reicht oder je Station einer gedruckt wird.

## 2026-09-18 · Runde 5: Bon, Lieferzeit, Fahrer und Geld

**Bon (Sirat, entschieden für die Testphase):** fluvo druckt die ganze Bestellung mit allen Daten auf **einen** Bon, wie heute üblich. Bon je Station ist kein Thema für den Piloten.

**Lieferzeit (Sirat, entschieden):** Ein Mitarbeiter stellt vorab ein, wie lange eine Bestellung dauert — **je nach Lieferort** (also je Zone/Ortsteil ein Wert). Die KI nennt diesen Wert. → Gehört zu den Einstellungen des Restaurants (Inhaber-/Annahme-Seite) und in die Onboarding-Liste; Liefergebiet braucht Zonen mit Zeitwert.

**Tour (Sirat):** Die Mitarbeiter entscheiden intern, wer was fährt. Ein Fahrer nimmt mehrere Bestellungen in dieselbe Richtung auf einmal mit. Die Adresse steht auf dem Zettel und wird vom Fahrer ins Handy abgetippt.

**Zahlung an der Tür (Sirat):** Nur bar, manchmal ein Gutschein. Der Kunde bekommt im Normalfall den Zettel als Beleg. Der Fahrer startet mit 50 € Wechselgeld.

**Schichtende (Sirat):** Der Fahrer muss selbst separat notieren, was er gefahren ist. Es bleiben manchmal Zettel übrig, und niemand weiß, wer sie gefahren hat. Das Exemplar, das an der Station bleibt, ist die einzige Kontrolle.

**Wo es regelmäßig hakt (Sirat):** Fehlbeträge · verlorene Zettel · verlorenes Geld · Schreibfehler.

**Folgen für das Konzept (Jarvis):**
- FA-08: Zuordnung Bestellung → Fahrer entsteht durch den QR-Scan; genau das löst „keiner weiß, wer was gefahren ist". Mehrere Bestellungen je Tour müssen gehen (mehrere Scans, dann losfahren).
- FA-08: Adresse kommt per Deep-Link in die Karten-App — kein Abtippen.
- FA-10: Kassensturz = Wechselgeld-Start + Summe der **bar** kassierten Bestellungen. (Korrektur Jarvis: Gutscheine werden nicht abgezogen — für sie hat der Fahrer kein Bargeld bekommen; er gibt die Gutscheine mit ab.) Offene Bestellungen ohne Fahrer sichtbar machen.
- Zahlart „Gutschein" fehlt bisher im Briefing (dort: Bar/Karte/Storno). Art der Gutscheine klären.
- Mit fluvo wird jede Bestellung erstmals elektronisch erfasst. Damit wird Q2 (TSE, Signaturzeitpunkt, Beleg für den Kunden) für den Piloten verbindlich → Steuerberaterin **vor** Pilotstart.

## 2026-09-18 · Runde 6: Ausnahmen und Bestellarten

**Scan rückgängig (Sirat):** Ein Fahrer-Scan muss wieder gelöst werden können (falsch gescannt, Tour umverteilt) — aber es muss an der Bestellung dokumentiert bleiben. → Passt zum unveränderlichen Ereignisprotokoll: Lösen ist ein neues Ereignis, kein Löschen.

**Kassensturz (Sirat, entschieden):** Angezeigt wird nur, **wie viel der Fahrer zurückgeben muss**. Alles darüber hinaus ist seine Verantwortung. Trinkgeld wird nicht abgebildet.

**Zonen (Sirat):** Stadtteile bzw. andere Orte mit unterschiedlicher Dauer.

**Kunde nicht erreichbar / Adresse falsch (Sirat):** Die Rufnummer des Kunden muss auf dem Bon stehen. Fahrer ruft an, wartet ab; im schlimmsten Fall kehrt er zurück und das Essen wird weggeworfen. → FA-09 braucht ein benanntes Ende („nicht zustellbar") — hängt an Q3 (Storno-Pfad).

**Änderung und Storno nach dem Auflegen (Sirat):** Muss immer erst mit der Küche abgeklärt werden (ist die Pizza schon im Ofen?). Die KI entscheidet das nie, sondern gibt das Gespräch an einen Menschen vor Ort weiter. → Bestätigt [FEST 11]; macht Q4 (Eskalation, wenn niemand abnimmt) dringender.

**Bestellarten (Sirat) — neu, fehlten bisher:**
1. **Lieferung** — Bon mit QR für den Fahrer.
2. **Abholung nach Telefonbestellung** — kommt sehr oft vor. Bon **ohne** Fahrer-QR.
3. **Zum Mitnehmen, Kunde kommt persönlich vorbei** (ohne Anruf) — muss abgedeckt sein.
4. **Hier essen** — Kunden essen vor Ort; muss abgedeckt sein.

**Gutscheine (Sirat):** Eigene Gutscheine des Restaurants. **Trinkgeld:** nicht abdecken.

**Folgen für das Konzept (Jarvis):**
- Die Bestellung braucht ein Merkmal „Bestellart". Arten 3 und 4 laufen über die Annahme von Hand (FA-05).
- Die feste Statuskette `… Fertig → Unterwegs → Geliefert → Abgerechnet` [FEST 2] passt nur auf Lieferung. Für Abholung, Mitnehmen und Hier-essen braucht es einen Weg ohne „Unterwegs". Berührt eine [FEST]-Entscheidung → in K3 mit `architect` vorbereiten, Sirat entscheidet.
- „Hier essen" kann klein sein (am Tresen bestellen, sofort zahlen) oder ein komplettes Kassensystem (Tische, offene Rechnungen, Teilzahlung). Umfang klären — das Zweite wäre ein anderes Produkt.
- Wer kassiert bei Abholung/Mitnehmen/Hier-essen, und wie geht das in die Tagesabrechnung ein? Der Kassensturz je Fahrer deckt das nicht ab.

## 2026-09-18 · Runde 7: Hier essen, Vorbestellung

**„Hier essen" (Sirat, entschieden):** Zunächst nur die kleine Form — Gast bestellt am Tresen, zahlt sofort, Bon geht in die Küche. Keine Tische, keine offenen Rechnungen, kein getrenntes Zahlen.

**Vorbestellung (Sirat):** Gibt es. Die KI muss prüfen, ob zur gewünschten Zeit geöffnet ist, und die Bestellung als Vorbestellung kennzeichnen, damit jeder sie als solche erkennt (auch auf dem Bon).

**Neuer Schnitt** (FA-01 … FA-17, FA-20 … FA-22): von Jarvis vorgelegt, siehe `docs/konzept/README.md`. Ausdrückliche Bestätigung von Sirat steht noch aus.

**Bon bei Vorbestellung (Sirat, entschieden):** Der Bon kommt **sofort**, deutlich als Vorbestellung mit Wunschzeit gekennzeichnet. Das Restaurant behält ihn wie heute selbst im Blick.

## 2026-09-18 · Runde 8: Antworten auf die Fragen aus den ersten vier Entwürfen

Hinweis zur Kennzeichnung: Entscheidungen aus diesem Gespräch tragen die Stufe **[ENTSCHIEDEN Sirat, Datum]** — nicht [FEST]. [FEST] bleibt den Entscheidungen des Briefings vorbehalten.

- **Summe (Sirat, entschieden):** Die KI nennt die Summe **immer** vor der Bestätigung — nicht nur auf Wunsch.
- **Zeit bei Abholung (Sirat, entschieden):** Ein eigener Wert je Restaurant („Abholung in ca. X Minuten"), den der Mitarbeiter einstellt — wie die Lieferzeit je Zone. → gehört zu FA-17.
- **Gutschein kleiner als die Bestellung (Sirat, entschieden):** Der Rest wird bar bezahlt. → Eine Bestellung kann zwei Zahlarten haben (Gutscheinbetrag + bar). In den Kassensturz des Fahrers geht nur der bar kassierte Teil ein; der Gutschein wird abgegeben.
- **Kassensturz (Sirat, entschieden):** Der Fahrer gibt das Geld zurück, der **Inhaber bestätigt**. Erst die Bestätigung des Inhabers schließt den Kassensturz ab.
- **Zahlung bei Abholung, Mitnehmen, Hier essen (Sirat, entschieden):** Vorerst **nur bar**.

## 2026-09-18 · Runde 9: Kassieren am Tresen, Küchen-Status, Gutscheine

- **Kassieren bei Abholung/Mitnehmen/Hier essen (Sirat):** Es kassiert die Person, die dafür zuständig ist (Annahme/Tresen). Der genaue Zeitpunkt (beim Bestellen oder bei der Übergabe) wurde nicht genannt → bleibt Frage.
- **Küchen-Status (Sirat, entschieden):** Im Piloten zunächst **keine** Status-Meldungen aus der Küche. Der Bon wird gedruckt, danach läuft die Küche wie heute auf Papier. Das System erfährt erst wieder etwas beim Fahrer-Scan bzw. beim Kassieren am Tresen.
  → Folge: FA-07 („Bestellung durch die Küche führen") entfällt für den Piloten als eigener Fall; die ID bleibt reserviert. Die festen Zustände „In Küche" und „Fertig" [FEST 2] werden dann nicht von Hand gesetzt — wie die Kette damit umgeht (überspringen, automatisch setzen), ist ein weiterer Punkt für K3 mit `architect`.
- **Gutscheine (Sirat):** Papier-Gutscheine des Restaurants. Zusätzlich Wunsch: im System für einen bestimmten Kunden einen Gutschein hinterlegen können.
  → Einordnung Jarvis: Papier-Gutschein = Zahlart beim Kassieren, klein. Kundengebundener Gutschein im System ist eine neue Funktion (Guthaben je Kunde, Einlösen, Missbrauchsschutz, Verhalten der KI am Telefon) — als eigener, späterer Anwendungsfall vormerken, nicht im Piloten-Schnitt. Sirat entscheidet.

## 2026-09-18 · Runde 10: Antworten auf die gebündelte Fragerunde (13 Entwürfe)

- **Zahlungszeitpunkt Abholung nach Anruf (Sirat, entschieden):** Bezahlt wird **bei der Übergabe**, bar. (Hier essen: beim Bestellen, Runde 7. Mitnehmen ohne Anruf: nicht ausdrücklich genannt — Kunde steht am Tresen; Frage bleibt klein offen.)
- **Tagesabschluss Tresen, FA-16 (Sirat, entschieden):** Der Mitarbeiter macht seinen Tagesabschluss, gibt anschließend das Geld zurück, der **Inhaber bestätigt** — gleiches Muster wie beim Fahrer (FA-10).
- **Betrag stimmt nicht (Sirat, entschieden; gilt für FA-10, sinngemäß FA-16):** Die Schicht bleibt offen; der **Inhaber kann sie mit Begründung beenden**. → Abschluss mit Abweichung ist möglich, aber nur durch den Inhaber und nur mit festgehaltener Begründung.
- **Nicht bezahlt / nicht zustellbar / nie abgeholt (Sirat, entschieden):** Dass eine Bestellung ohne Bezahlung endet, wird **vom Inhaber bestätigt** — nicht von Fahrer oder Annahme allein.
- **Bon (Sirat, entschieden):** **Ein** Exemplar; die Kontrolle liegt im System.
- **Rechte der Annahme (Sirat):** Die Person an der Annahme soll **auch Inhaber-Rechte** haben.
  → Einwand Jarvis, mit Sirat zu klären: Dann könnte die Annahme den eigenen Tagesabschluss, Fehlbeträge und unbezahlte Bestellungen selbst bestätigen — das Vier-Augen-Prinzip aus den drei Punkten darüber wäre ausgehebelt. Vorschlag: Annahme bekommt alle **Betriebs**rechte des Inhabers (heute aus, Preise, Lieferzeit, Zonen, Öffnungszeiten, KI an/aus), aber **nicht** die Bestätigung von Geld (Kassensturz, Tagesabschluss, Abschluss mit Abweichung, unbezahlte Bestellung).
- **Liefergebühr (Sirat, entschieden):** Kann je Ort/Zone unterschiedlich sein; wird beim Onboarding aufgenommen. (Mindestbestellwert je Zone: nicht genannt → Frage bleibt.)
- **FA-18 (Sirat, bestätigt):** Neuer Fall „Öffnungszeiten, Ruhetage und Urlaub pflegen" kommt in den Schnitt.
- **Startklar (Sirat, entschieden):** Testanruf (und Testbon, Vorschlag Jarvis) genügt als Kriterium.
- **Störungen (Sirat, entschieden):** Der Betreiber will **aktiv benachrichtigt** werden, nicht nur eine Ansicht.
- **Kundengebundener Gutschein im System (Sirat, entschieden):** später, nicht im Piloten-Schnitt.

## 2026-09-18 · Runde 11: Rechte der Annahme

**Trennung Betriebsrechte / Geldrechte (Vorschlag Jarvis, von Sirat bestätigt — „ja die Trennung ist gut"):**

| Betriebsrechte (Annahme **und** Inhaber) | Geldrechte (**nur** Inhaber) |
|---|---|
| Artikel „heute aus", Speisekarte | Fahrer-Kassensturz bestätigen |
| Lieferzeit, Zonen, Öffnungszeiten, Urlaub | Tagesabschluss Tresen bestätigen |
| KI an/aus | Schicht mit Abweichung begründet beenden |
| Bon nachdrucken, Bestellung von Hand | Bestellung als „nicht bezahlt" bestätigen, Storno |

Steht der Inhaber selbst an der Annahme, meldet er sich als Inhaber an. → Grundlage für die Rollen-Matrix in K9.

Noch offen: ob Preise, Allergene und Steuersatz zu den Betriebsrechten der Annahme gehören oder beim Inhaber bleiben (Empfehlung Jarvis: Inhaber).

## 2026-09-18 · Runde 12: Tagesabschluss am Tresen (FA-16)

- **Wechselgeld am Tresen (Sirat, entschieden):** Ja, es gibt einen festen Wechselgeld-Betrag — wie beim Fahrer. → je Restaurant einstellbar; Höhe noch nicht genannt.
- **Abschluss (Sirat, entschieden):** **Je Mitarbeiter**, nicht je Tag — jeder schließt seine eigene Schicht ab (Inhaber bestätigt, Runde 10).
- **Gleichzeitig kassieren (Sirat):** Es kann vorkommen, dass abends zwei Leute gleichzeitig am Tresen kassieren.

**Folgen (Jarvis):**
- Jedes Kassieren am Tresen muss der Person zugeordnet sein, die kassiert hat — sonst lässt sich ein Abschluss je Mitarbeiter nicht rechnen. Auf einem geteilten Tablet heißt das: schneller Personenwechsel (PIN) vor dem Kassieren. → K10 (Oberfläche), Q11 (Login).
- Knackpunkt: Abschluss je Mitarbeiter funktioniert nur, wenn auch das **Bargeld je Mitarbeiter getrennt** ist (eigene Börse/eigenes Fach mit eigenem Wechselgeld). Greifen zwei in dieselbe Lade, kann niemand sagen, wessen Fehlbetrag es ist — dann wäre ein Abschluss je Lade ehrlicher. Mit Sirat klären.

- **Bargeld am Tresen (Sirat, entschieden, Runde 12 Nachtrag):** **Jeder Mitarbeiter hat seine eigene Börse.** → Abschluss je Mitarbeiter ist stimmig (Weg A): eigenes Wechselgeld je Person, zurückzugeben = Wechselgeld-Start + Summe der von dieser Person bar kassierten Beträge — dasselbe Muster wie beim Fahrer (FA-10). Voraussetzung bleibt: Jedes Kassieren ist der kassierenden Person zugeordnet (Personenwechsel per PIN am geteilten Gerät).

## 2026-09-18 · Runde 13: Änderung, KI an/aus, Internetausfall, Bestellschluss, Rechte, Mindestbestellwert

- **Wechselgeld am Tresen (Sirat):** beim Piloten 50 € — aber der Wert ist Nebensache; wichtig ist nur der Betrag, den der Mitarbeiter zurückgeben muss. → bleibt je Restaurant einstellbar.
- **Änderung einer aufgegebenen Bestellung, FA-11 (Sirat, entschieden):** Zwei Wege — entweder der Küche zurufen, oder die Bestellung von Hand bearbeiten und einen **neuen Bon** ausgeben. (Vorher mit der Küche abklären, Runde 6. Storno bestätigt nur der Inhaber, Runde 11.)
  → Folge: Bearbeiten ist ein neues Ereignis an der Bestellung, nichts wird überschrieben; der neue Bon muss als geänderter Bon erkennbar sein, damit nicht doppelt gekocht wird. Wer bearbeiten darf (Annahme?) und bis zu welchem Zeitpunkt: noch Frage.
- **KI an/aus, FA-13 (Sirat, entschieden):** Jederzeit beliebig ein- und ausschaltbar — z. B. wenn wenig los ist und man lieber persönlich mit den Kunden spricht. (Betriebsrecht: Annahme und Inhaber, Runde 11.)
- **Nachträglicher Urlaub bei bestehenden Vorbestellungen, FA-18 (Sirat, entschieden):** Das regelt der **Inhaber selbst** (Kunden informieren, ggf. stornieren). fluvo warnt und zeigt die betroffenen Vorbestellungen, nimmt ihm aber nichts ab.
- **Internetausfall, FA-14 (Sirat):** Kommt selten vor. Mindestanforderung: Die **laufenden Bestellungen müssen immer abrufbar** sein.
- **Bestellschluss (Sirat, entschieden):** Standard = Öffnungszeiten; der Inhaber kann einen eigenen Wert einstellen (z. B. letzte Bestellung vor Ladenschluss).
- **Preise, Allergene, Steuersatz (Sirat, entschieden):** Nur der Inhaber — nicht die Annahme.
- **Mindestbestellwert (Sirat, entschieden):** Gilt **je Zone** und ist je Restaurant/Lieferservice unterschiedlich. → Zone trägt drei Werte: Lieferzeit, Liefergebühr, Mindestbestellwert.

## 2026-09-18 · Runde 14: Änderung immer ins System, Anrufe außerhalb der Öffnungszeit

- **Änderung einer Bestellung (Sirat, entschieden — präzisiert Runde 13):** Jede Änderung **wird im System eingetragen**, und die Preise ändern sich entsprechend. Zurufen allein genügt nicht. → Bon, Betrag beim Fahrer und Kassensturz stimmen immer mit dem überein, was tatsächlich geliefert wird.
- **Außerhalb der Öffnungszeit (Sirat, entschieden):** Das Telefon **klingelt durch wie heute**. Die KI geht außerhalb der Öffnungszeit nicht ran — keine Ansage, keine Vorbestellungsannahme nach Ladenschluss. (Vorschlag Jarvis „KI nimmt nach Ladenschluss Vorbestellungen an" damit abgelehnt.)
  → Folge: Die KI ist nur aktiv, wenn (a) eingeschaltet und (b) innerhalb der Öffnungszeit. Wie das mit der Rufumleitung bei Nichtmelden technisch zusammengeht (die Umleitung greift ja unabhängig von der Uhrzeit), ist ein Punkt für Q1/Risikotest AP-001 und K4.

## 2026-09-21 · Runde 15: Antworten auf die Fragen B1–B9 aus dem Gegenlesen

Fragen siehe `_gegenlesen-K1.md`, Teil B.

- **B1 Inhaber nicht da (Sirat):** Es wird eine Ansicht geben, in der **ein Kollege das System für den Inhaber bedient**. → Rückfrage Jarvis offen: Wer ist dieser Kollege (fest benannte Vertretung?), und darf er auch den **eigenen** Abschluss bestätigen? Sonst ist die Trennung Betriebs-/Geldrechte aus Runde 11 ausgehebelt.
- **B2 Inhaber kassiert selbst (Sirat, entschieden):** Niemand bestätigt — **er bestätigt sich selbst**. → wird als Selbstbestätigung protokolliert.
- **B3 Schichtbeginn (Sirat):** Der **Inhaber bestätigt** (die Ausgabe des Wechselgelds). Wer fährt **und** am Tresen kassiert, muss seine beiden Geldbörsen **selbst regeln** und den **Endbetrag ins System eintragen**. → Rückfrage Jarvis offen: „Endbetrag eintragen" ist neu gegenüber Runde 6 (System zeigt nur den zurückzugebenden Betrag). Trägt der Mitarbeiter ein, was er abgibt, und das System vergleicht?
- **B4 Stammkunde (Sirat, entschieden):** **Doch — die Kundendaten werden gespeichert** (beim Restaurant). Frage von Sirat: Ist das rechtlich erlaubt? → Einordnung Jarvis im Gespräch, verbindlich über den Anwalt (Q10 erweitern).
- **B5 Name und Rufnummer (Sirat, entschieden):** Die KI fragt **immer nach dem Namen**. Wird **keine Rufnummer** übermittelt, **fragt sie nach der Nummer**.
- **B6 „Wo bleibt mein Essen?" und ähnliche Anrufe (Sirat, entschieden):** Zunächst **an einen Mitarbeiter weitergeben**. → sechster Eskalationsgrund in FA-03 (Frage zu laufender Bestellung; Allergen-Auskunft sinngemäß — von Sirat nicht getrennt beantwortet, nachfragen).
- **B7 Vorbestellungen in den Abschluss-Listen (Sirat, entschieden):** Ja — sie müssen **als Vorbestellung markiert** sein. (Ob sie in den Listen erscheinen oder erst am Fälligkeitstag: Vorschlag Jarvis „nur Fälliges", von Sirat nicht widersprochen, beim Durchgehen bestätigen. Wer die Listen sieht: nicht beantwortet.)
- **B8 Hier essen, zweiter Handgriff:** von Sirat nicht verstanden → Jarvis erklärt neu.
- **B9 Betrag nach Änderung (Sirat, entschieden):** **Was in der App steht, hat Bestand** — nicht der Bon.

## 2026-09-21 · Runde 16: Inhaber-Bereich, offener Betrag, „übergeben" bleibt

- **B1 Vertretung (Sirat, entschieden — ersetzt die Antwort aus Runde 15):** Es gibt **keine Vertretung**. Es gibt einen **Inhaber-Bereich**, in den nur der Inhaber **mit seinem Code** kommt; dort bestätigt er **alle Kassen** (Fahrer und Tresen). Der Bereich liegt auf dem **Hauptgerät** im Laden („Home-System", an dem die anderen Tablets hängen). Die Kasse wird **am Anfang** bestätigt (Ausgabe Wechselgeld, Runde 15 B3) und **am Ende** noch einmal. → Rückfrage Jarvis offen: „noch mal zweimal" = einmal am Anfang, einmal am Ende? Und was gilt für einen Storno, wenn der Inhaber gerade nicht da ist?
  → Folge: Trennung Betriebs-/Geldrechte (Runde 11) bleibt unverändert. Ist der Inhaber nicht da, bleiben Abschlüsse offen, bis er bestätigt.
- **B3 „Endbetrag" (Sirat, klargestellt):** Gemeint ist **kein Eintippen** durch den Mitarbeiter. Nach der Schicht zeigt das System den **offenen Betrag** (wie Runde 6). Wer fährt und am Tresen kassiert, regelt seine zwei Börsen selbst. 
- **Neu — Tagesübersicht für den Inhaber (Sirat):** Der Inhaber sieht für den Tag, **was wann bestellt wurde**, ob alles in Ordnung ist, und **was wann von welchem Kollegen gelöscht/geändert wurde**. → Einordnung Jarvis: „Löschen" gibt es nicht (Ereignisprotokoll, Storno nur Inhaber); sichtbar werden Änderungen, entfernte Positionen und Stornos mit Person und Uhrzeit. Neue Anforderung, bisher in keinem Fall — Kandidat für eigenen Fall oder Teil des Inhaber-Bereichs (K10).
- **B8 Hier essen (Sirat, entschieden — Vorschlag Jarvis abgelehnt):** Die Bestellung **bleibt sichtbar, auch wenn sie bezahlt ist**, bis der Mitarbeiter sie bei der Übergabe als **fertig** markiert; erst dann verschwindet sie aus der Liste. → Der zweite Handgriff bleibt; er dient als Übersicht „was muss noch raus". (Zahlungszeitpunkt bei Mitnehmen: weiterhin nicht beantwortet.)

## 2026-09-21 · Runde 17: Wer ändert und storniert, Abschluss in zwei Schritten, Kundenstamm

Sirat hat diktiert; Jarvis' Lesart steht dabei und ist von Sirat noch zu bestätigen, wo vermerkt.

- **Fahrer (Sirat, entschieden):** Fahrer können **nichts ändern oder stornieren** — sie sehen ihre Bestellungen nur.
- **Ändern und Stornieren im Tagesgeschäft (Sirat — ändert Runde 11, Bestätigung der Lesart steht aus):** Die Person am Telefon/an der Annahme (das kann auch der Inhaber sein) ist im Alltag der „Administrator": Sie darf Bestellungen **ändern und stornieren**, wenn es Schwierigkeiten gibt. Das muss **nicht** der Inhaber machen. **Alles wird protokolliert** und erscheint als Log beim Inhaber (wer, was, wann). Der Inhaber hat **Überwachung/Monitoring** und behält das, was ans **Geld** geht (Kassen bestätigen, Abschluss mit Abweichung, unbezahlte Bestellung bestätigen).
  → Folge, falls bestätigt: **Storno wandert von den Geldrechten (nur Inhaber, Runde 11) zu den Betriebsrechten der Annahme**, abgesichert durch das Log statt durch eine Vorab-Bestätigung. ADR 0006 wäre in diesem Punkt durch einen neuen ADR zu ersetzen. Die Frage „Storno, wenn der Inhaber nicht da ist" erledigt sich damit.
- **Abschluss in zwei Schritten (Sirat, Lesart Jarvis):** Der Mitarbeiter **bestätigt seinen Abschluss selbst** (Schritt 1), das geht **an den Inhaber**, der im Inhaber-Bereich **bestätigt** (Schritt 2). Das ist das „zweimal" aus Runde 16. Ob der Mitarbeiter dabei nur den angezeigten Betrag bestätigt (Runde 16) oder doch einen Betrag eintippt, war im Diktat nicht eindeutig → nachfragen.
- **Kundenstamm — Entscheidungen zur Einschätzung des Hausjuristen (Sirat, entschieden, vorbehaltlich echtem Anwalt):**
  - **Weg B (Empfehlung):** Die KI **fragt** bei der ersten Bestellung, ob sie sich die Adresse merken soll (Einwilligung). Gleiches bei der Annahme von Hand.
  - **Wiedererkennung:** Die KI nennt die hinterlegte Adresse und fragt, ob dorthin geliefert werden soll. (Ob nur nach Namensabgleich und ohne Hausnummer, wie empfohlen: im Diktat nicht eindeutig → nachfragen.)
  - **Löschfrist:** vorerst **12 Monate** nach der letzten Bestellung.
- **Ingest ins Business Brain:** von Sirat angesagt.

## 2026-09-21 · Runde 18: Bestätigungen zu Runde 17

- **Storno durch die Annahme (Sirat, entschieden — bestätigt die Lesart aus Runde 17, ändert Runde 11):** Ja. Die Annahme darf Bestellungen **ändern und stornieren**; der Inhaber muss nicht vorab bestätigen, er sieht alles im **Log** (wer, was, wann). Fahrer dürfen weder ändern noch stornieren. Beim Inhaber bleiben die Geldrechte: Kassen bestätigen, Abschluss mit Abweichung beenden, unbezahlte Bestellung („nicht zustellbar", „nie abgeholt") bestätigen. → **ADR 0007**, ersetzt den Storno-Punkt aus ADR 0006.
- **Abschluss, Schritt des Mitarbeiters (Sirat, entschieden):** Der Mitarbeiter **bestätigt den angezeigten Betrag** — er kann aber auch **einen Kommentar dazuschreiben und den Betrag ändern** („er muss mehr Optionen haben"). Danach bestätigt der Inhaber im Inhaber-Bereich.
  → Lesart Jarvis: Das System zeigt den zurückzugebenden Betrag (Soll). Der Mitarbeiter bestätigt ihn oder meldet einen **abweichenden Betrag mit Kommentar**; der Inhaber sieht Soll, gemeldeten Betrag und Kommentar. Der Soll-Betrag selbst wird nie überschrieben (Server rechnet, [FEST 8]). Präzisiert Runde 6/16.
- **Adresse bei der Wiedererkennung (Sirat, entschieden — gegen die Empfehlung des Hausjuristen):** Die KI nennt die **volle Adresse** und fragt, ob dorthin geliefert werden soll. Hinweis Jarvis: Der Hausjurist hält das für zu offen (geteilte, neu vergebene oder gefälschte Rufnummer); die Frage geht so an den echten Anwalt (Q10). So bauen, dass die Ausgabe später ohne Umbau eingeschränkt werden kann.

## 2026-09-21 · Runde 19: Storno nach Zahlung, Kommentar bei Abweichung, Fahrer

- **Storno nach erfasster Zahlung (Sirat, entschieden — Vorschlag Jarvis bestätigt):** **Vor** der Zahlung storniert die Annahme frei (Runde 18); **nach** erfasster Zahlung storniert **nur der Inhaber**. (Fiskalische Seite weiter Q3 / Steuerberaterin.)
- **Abweichender Betrag beim Abschluss (Sirat, entschieden):** Gibt der Mitarbeiter **weniger oder mehr** Geld zurück als angezeigt, **muss er kommentieren**; danach bestätigt der Inhaber. → Kommentar ist bei Abweichung **Pflicht** (der `[VORSCHLAG]` aus FA-10/FA-16 wird Entscheidung).
- **Fahrer (Sirat, Lesart unklar → Rückfrage):** „Zunächst sehen die Fahrer nur und ändern nichts; später kommt eine Funktion dazu, mit der sie eine Bestellung auf ‚geliefert' drücken oder eine Notiz machen." → Widerspricht dem bisherigen FA-08 (Fahrer markiert im Piloten „Geliefert" und erfasst die Zahlart) und würde FA-10 die Grundlage nehmen (ohne erfasste Zahlart kein gerechneter Kassensturz). Mit Sirat klären, was im Piloten gilt.

## 2026-09-21 · Runde 20: B10–B13 (Rechte an Karte und Zonen, „heute aus", Storno-Grund und -Bon)

- **B10 Speisekarte (Sirat, entschieden):** Die Annahme legt **keine** Artikel/Optionen an und entfernt keine; sie schaltet nur **„heute aus"** an und ab. Alles andere an der Karte macht der Inhaber. (Präzisiert „Speisekarte" als Betriebsrecht aus Runde 11.)
- **B11 Zonenwerte (Sirat, entschieden):** Die Annahme ändert nur **Lieferzeit und Abholzeit**. **Liefergebühr, Mindestbestellwert und Zonen anlegen/entfernen: nur der Inhaber.** (Präzisiert „Zonen" als Betriebsrecht aus Runde 11.)
- **B12 „heute aus" zurücksetzen (Sirat — Diktat unklar, Jarvis liest Zustimmung; beim Durchgehen bestätigen lassen):** Annahme und Inhaber dürfen zurücksetzen; zusätzlich springt „heute aus" am **nächsten Geschäftstag von selbst** zurück. Länger nicht verfügbare Artikel nimmt der Inhaber von der Karte.
- **B13 Storno (Sirat, entschieden):** Beim Storno ist ein **Grund Pflicht** (kurze Auswahl, z. B. Kunde hat abgesagt · doppelt · Artikel aus · Sonstiges). Die Küche bekommt einen deutlich gekennzeichneten **Storno-Bon**, zusätzlich zum Zuruf.
- **Fahrer im Piloten (Rückfrage aus Runde 19):** von Sirat noch nicht beantwortet.

## 2026-09-21 · Runde 21: B12, B14, B15 — und neu: Annahmestopp

- **B12 (Sirat, bestätigt):** „heute aus" setzen Annahme und Inhaber zurück; es springt am nächsten Geschäftstag von selbst zurück. Die Kennzeichnung „Lesart Jarvis" aus Runde 20 entfällt.
- **B14 Änderungen (Sirat, entschieden — Vorschläge Jarvis angenommen):** (1) Adresse ändern und Lieferung ↔ Abholung wechseln ist erlaubt; das System rechnet Zone, Liefergebühr und Mindestbestellwert neu, neuer Bon. (2) Rutscht die Summe durch eine Änderung unter den Mindestbestellwert, **warnt** das System, die Annahme darf trotzdem speichern. (3) Ist „Hier essen" schon bezahlt und der Gast will noch etwas, wird das eine **neue Bestellung**, keine Nachzahlung.
- **B15 Bestellschluss (Sirat, entschieden):** Bestellungen werden für die Zeiten angenommen, in denen gearbeitet wird. **Ladenschluss = Bestellschluss** (Standard, wie Runde 13). Der Bestellschluss bezieht sich damit auf die Betriebszeit, nicht auf eine gesonderte Wunschzeit-Prüfung.
- **Neu — Annahmestopp (Sirat):** Manchmal ist so viel los, dass man sagt: „Wir nehmen keine Bestellungen mehr an." Das wird **von Hand eingeschaltet** — „dann ist es was anderes". → Neue Funktion, bisher in keinem Fall. Offen: Was tut die KI während des Stopps (rangehen und absagen / Vorbestellung anbieten / nicht rangehen)? Gilt der Stopp für alles oder nur für Lieferung? Wer schaltet (Betriebsrecht Annahme + Inhaber — Vorschlag Jarvis)? Endet er von selbst (Tagesende)? Abgrenzung zu „KI aus" (FA-13): KI aus = Personal nimmt selbst an; Annahmestopp = niemand nimmt an.
- **Noch nicht beantwortet:** B16 (Pausenzeiten), B17 (Mindestbestellwert worauf), Fahrer im Piloten (Runde 19).

## 2026-09-21 · Runde 22: Pilot benannt, B16 aus öffentlichen Angaben

- **Pilot (Sirat):** Sirat hat den Pilot-Betrieb benannt und erlaubt, bei Bedarf öffentliche Daten aus dem Internet heranzuziehen. Der Name steht **nicht** in diesem Repo (Repo-Regel), sondern im Business Brain (Seite des Pilot-Betriebs).
- **B16 Pausenzeiten (aus der öffentlichen Website des Piloten, abgerufen 2026-09-21 — von Sirat vor Ort zu bestätigen):** Der Pilot hat werktags eine **Mittagspause** (zwei Zeitfenster am Tag, grob vormittags bis früher Nachmittag und später Nachmittag bis spät abends), am Wochenende ein durchgehendes Fenster mit späterem Beginn. Zwei öffentliche Quellen weichen um 15–60 Minuten voneinander ab. → FA-18 braucht **mehrere Zeitfenster je Tag**; maßgeblich ist, was der Inhaber im Onboarding einträgt. Folge für FA-13/Q15: In der Pause ist „außerhalb der Öffnungszeit" — dort klingelt das Telefon durch (Runde 14), vorbehaltlich AP-001.
- Liefergebiet, Mindestbestellwert und Liefergebühr stehen nicht auf der öffentlichen Kontaktseite → Termin am 2026-09-25.

## 2026-09-21 · Runde 23: Annahmestopp, B17, Fahrer-App

- **Annahmestopp (Sirat, entschieden — Vorschlag Jarvis angenommen):** (1) Die KI **geht ran**, sagt freundlich, dass im Moment keine Bestellungen angenommen werden, und bietet eine **Vorbestellung** für später/morgen an (wenn dann Betrieb ist). (2) **Zwei Schalter:** „keine Lieferung mehr" und „gar nichts mehr" (Abholung geht beim ersten weiter). (3) Schalten dürfen **Annahme und Inhaber** (Betriebsrecht). (4) Ende **von Hand**, spätestens **am Tagesende von selbst**. Abgrenzung: „KI aus" (FA-13) = Personal nimmt selbst an; Annahmestopp = niemand nimmt an.
- **B17 Mindestbestellwert (Sirat, entschieden):** zählt nur der **Warenwert**, ohne Liefergebühr.
- **Fahrer (Sirat):** „Für Fahrer werde ich eine **separate App** entwickeln. Also ist das zunächst einmal irrelevant." → Beantwortet die Rückfrage aus Runde 19 nicht, sondern verschiebt den Fahrer-Teil. **Nicht eingearbeitet**, weil es den Piloten-Schnitt und das Briefing berührt: FA-08/FA-09/FA-10 und der Durchstich „Anruf → Bestellung → Bon → Fahrer" (Landkarte), Bauschritt 4 „Fahrer-PWA … der Teil, der fluvo vom Wettbewerb abhebt" (Briefing §7), [FEST 17] BYOD-PWA ohne App-Store. Rückfragen Jarvis: Ist der Fahrer-Teil damit **aus dem Piloten-Schnitt**? Wie wird das Liefer-Bargeld im Piloten dann kontrolliert (heute: Zettel)? Ist „separate App" eine eigene PWA ([FEST 17] bleibt) oder eine App-Store-App ([FEST 17] berührt → `architect`)?

## 2026-09-21 · Runde 24: Fahrer-Teil kommt später, im Piloten zwei Bons

- **Fahrer-Teil (Sirat, entschieden — ändert den Piloten-Schnitt):** Variante (a): Der **Fahrer-Teil kommt später** und wird eine **eigene App**. Der Pilot läuft zunächst **Anruf → Bestellung → Bon**. FA-08, FA-09, FA-10 sind damit für den ersten Piloten **zurückgestellt** (Entwürfe bleiben erhalten). → **ADR 0008**.
- **Ersatz im Piloten (Sirat, entschieden — ändert Runde 10 „ein Exemplar" für Lieferungen):** Bei Lieferung werden **zwei Bons** gedruckt. **Einer bleibt an der Annahmestation**, **einer geht mit dem Fahrer und danach an den Kunden**. Der Fahrer nimmt sich seinen Bon an der Annahmestation; dadurch weiß die Annahme, **wer was gefahren hat** — wie heute mit dem Durchschlag (Runde 4/5).
  → Folgen (Jarvis): Fahrer-QR auf dem Bon entfällt vorerst. Das Liefer-Bargeld wird im Piloten **nicht vom System** abgerechnet (kein Fahrer-Kassensturz); die Probleme aus Runde 5 (Fehlbeträge, „keiner weiß, wer was gefahren hat") werden im ersten Piloten nur durch das Stations-Exemplar gemildert, nicht gelöst. Der Tresen-Abschluss (FA-16) bleibt.
- **Offen (Rückfragen Jarvis):** (1) Wie wird eine Liefer-Bestellung im System **abgeschlossen** (geliefert, bezahlt, Zahlart), wenn kein Fahrer sie erfasst — trägt die Annahme das nach, wenn der Fahrer zurückkommt? Das braucht die Kasse/TSE ohnehin (Q2). (2) „Eigene App" = eigene PWA auf dem Privathandy ([FEST 17] bleibt) oder App-Store-App ([FEST 17] berührt → `architect`)? Von Sirat noch nicht beantwortet.

## 2026-09-21 · Rat (`/council`) zu Runde 24: Auslieferung und Liefer-Bargeld im ersten Piloten

Frage: (A) Fahrer-Teil später, zwei Bons, Bargeld auf Papier (Sirats Entscheidung Runde 24) · (B) Fahrer-PWA schon im Piloten · (C) ohne Fahrer-App: die Annahme tippt beim Rausgeben den Fahrer an und trägt bei Rückkehr „geliefert + Zahlart" ein, das System rechnet den Kassensturz.

- **architect: (C)** — füllt die hintere Hälfte der Zustandsmaschine mit echten Daten; dieselben Kern-Befehle nutzt später die Fahrer-App; (A) lässt den Hauptschmerz auf Papier. Risiko: Annahme als Nadelöhr → offene Fahrten sichtbar machen, Schichtende erst wenn alle geschlossen.
- **compliance-guard: (C)** — Zahlart und Zahlungseingang der Lieferungen müssen für Kasse/DSFinV-K ins System; (A) lässt das Tür-Bargeld außerhalb der Kasse. Ob nachträgliches Erfassen bei Rückkehr genügt, klärt nur die Steuerberaterin (Q2/Q3). Zusatz: Der Stations-Bon aus (A) ist ein Papier-Speicher mit Personendaten außerhalb der Löschfunktion → Verbleib/Vernichtung ins Löschkonzept.
- **security-reviewer: (C)** — keine neue Anmelde-Angriffsfläche (kein Fahrer-Login, keine Privatgeräte); (B) hieße unprüfbare Bargeld-Angaben von fremden Geräten. Risiko: geteiltes Tablet → kurze Sperre je PIN, jede Aktion mit aktiver Person stempeln.
- **Pragmatiker: (A) zum Start, (C) mit festem Termin (Woche 3–4 des Piloten)** — verkauft wird die KI am Telefon; die Annahme tippt in (C) genau dann zusätzlich, wenn drei Anrufe warten — falsche Zuordnungen sind schlimmer als keine. Felder „Fahrer" und „Zahlart" von Tag 1 im Datenmodell; das Papier-Doppel braucht man ohnehin als Rückfall.
- **Jarvis (vorab notiert): (C)**; durch den Pragmatiker ergänzt um die Staffelung und darum, Sirats zwei Bons als Ablauf beizubehalten.
- **Ergebnis:** Entscheidung liegt bei Sirat; bis dahin gilt Runde 24 (A).

## 2026-09-21 · Runde 25: Entscheidung nach dem Rat

- **Auslieferung im ersten Piloten (Sirat, entschieden):** Variante **(A)** — „ohne Bar-Eingang" im System und „mit doppeltem Zettel", wie in Runde 24 gesagt. Den Mittelweg (C) des Rats wählt Sirat nicht. → **ADR 0008**. Das kassenrechtliche Risiko (Bestellung erfasst, Barzahlung nicht) geht als Frage an die Steuerberaterin (Q2); Felder für Fahrer und Zahlart bleiben im Datenmodell vorbereitet.
- Noch offen: „eigene App" = PWA oder App-Store ([FEST 17]); wie eine Liefer-Bestellung ohne Fahrer-Erfassung im System endet (K3); Bezug des eigenen Bestellschlusses (Rückfrage Jarvis, von Sirat nicht eindeutig beantwortet).

## 2026-09-21 · Runde 26: Ende der Liefer-Bestellung, Fahrer-App im App-Store

- **Ende einer Liefer-Bestellung im ersten Piloten (Sirat, entschieden):** Die **Annahme drückt „geliefert"** — nicht automatisch beim Bon-Druck, sondern nachdem die Annahme es bestätigt hat (Lesart Jarvis: wenn der Fahrer zurück ist bzw. die Annahme weiß, dass geliefert wurde). Eine Zahlart oder ein Bar-Eingang wird dabei **nicht** erfasst (Runde 25). → Wie das in der Statuskette heißt (Eingegangen → Geliefert ohne „Unterwegs"; „Abgerechnet"?), gehört zu K3/Q13.
- **Fahrer-App (Sirat, Absicht):** Die eigene Fahrer-App soll **im App-Store** verfügbar sein. (Nachricht brach danach ab.) → **Berührt [FEST 17]** („PWA auf dem Privathandy, kein App-Store"). Nach Repo-Regel: nicht stillschweigend übernehmen — `architect` bereitet die Folgen vor (eine Codebasis mit Hülle für die Stores oder eigene native App; Entwicklerkonten, Freigabeprozess, Update-Wege, Offline), Sirat entscheidet dann ausdrücklich, und das Briefing wird angepasst. Nicht dringend: erst wenn die Arbeit an der Fahrer-App beginnt.

## Offene Fragen aus dem Gespräch

- Feiertage / abweichende Einzeltage: nötig für den Piloten?
- FA-11: Wer darf eine Bestellung bearbeiten, und bis wann (bis der Fahrer gescannt hat / bis kassiert ist)?
- Dürfen Annahme-Mitarbeiter Preise, Allergene und Steuersatz ändern, oder nur der Inhaber?
- Mindestbestellwert je Zone oder je Restaurant?
- Mitnehmen ohne Anruf: Zahlung beim Bestellen (naheliegend) — bestätigen lassen.
- Papier-Gutscheine: fester Wert? Nummer/Entwertung nötig, oder reicht „Gutschein über X €"?
- Benachrichtigung bei Störung: auf welchem Weg (SMS, Push, E-Mail), welche Störungen sind dringend?
- ✅ Vorbestellung, wie weit im Voraus (Sirat, entschieden): **beliebig weit** — einzige Bedingung: Das Restaurant hat zur Wunschzeit Betrieb. → Öffnungszeiten, Ruhetage und Urlaub müssen gepflegt sein (FA-12/FA-17), sonst sagt die KI falsch zu. Folgefrage: Gilt bei einer Vorbestellung über einen Preiswechsel hinweg der Preis vom Bestelltag? (Briefing §5.2: Preis wird bei Bestellung eingefroren → ja, sofern Sirat nichts anderes will.)
- ✅ Neuer Schnitt FA-01 … FA-17, FA-20 … FA-22 von Sirat bestätigt („passt", 2026-09-18).
- Gutscheine: eigene Papier-Gutscheine des Restaurants? Wert- oder Aktionsgutschein? Wie wird er heute verbucht?
- Trinkgeld: bleibt beim Fahrer, taucht nirgends auf?
- Beleg für den Kunden mit fluvo: reicht der Bon, oder braucht es einen TSE-Beleg an der Tür? → Steuerberaterin (Q2).

- Haftung für falsche Allergen-/Steuerangaben, wenn der Inhaber selbst pflegt → Anwalt.
- Reihenfolge des Onboardings beim Piloten.
- Fahrer, Geld, Schichtende (Runde 4).

## 2026-09-22 · Runde 27: Mittlere Fragen B10–B13, B17 (aus `_gegenlesen-K1.md`)

- **B10 · Speisekarte, Rechte der Annahme (Sirat, entschieden):** Die Annahme darf Artikel und Optionen **anlegen und entfernen** (ohne Preis, Allergene, Steuersatz — Runde 13 bleibt). Jede solche Änderung wird **für den Inhaber dokumentiert** (sichtbar im Inhaber-Bereich / Log). → FA-12, Inhaber-Log (siehe Vormerkung „Tagesübersicht/Log des Inhabers").
- **B11 · Zonen (Sirat, bestätigt):** Annahme ändert nur **Lieferzeit** (und Abholzeit). Liefergebühr, Mindestbestellwert, Zonen anlegen/entfernen: nur Inhaber. → FA-17.
- **B12 · „Heute aus" (Sirat, entschieden):** Die Annahme darf einen Artikel selbst wieder einschalten. **Kein automatisches Zurücksetzen** am nächsten Tag: Der Artikel bleibt sichtbar als „momentan aus" gekennzeichnet, bis ihn jemand von Hand wieder einschaltet. *(Lesart Jarvis aus „der Kollege muss selber einschalten" — bei der Einzeldurchsicht von FA-12 bestätigen lassen. Folge: Bezeichnung „heute aus" ist irreführend → „momentan aus"/„ausverkauft".)* → FA-12.
- **B13 · Storno (Sirat, entschieden):** Storniert der Kunde ausdrücklich („ich will die Bestellung nicht mehr"), erscheint eine **Anzeige/Hinweis an der Annahme**; ein **Storno-Bon wird nicht gedruckt**. *(Lesart Jarvis: Der Storno-Grund „Kunde hat storniert" wird bei der Anzeige mitgeführt; ob ein Grund bei jedem Storno Pflicht ist, hat Sirat nicht ausdrücklich gesagt — bei FA-11 nachfragen.)* → FA-11, FA-06 (kein Storno-Bon).
- **B17 · Mindestbestellwert (Sirat, entschieden):** bezieht sich auf den **Warenwert ohne Liefergebühr**. → FA-17, FA-01, FA-05, später K6 (Preisregel).

## 2026-09-22 · Runde 28: Bestätigungen zu B12/B13, Fragen B14, B16, B18, B20

- **B12 (Sirat, bestätigt):** Lesart aus Runde 27 stimmt — kein automatisches Zurücksetzen, sichtbar „momentan aus", Annahme darf selbst wieder einschalten.
- **B13 (Sirat, entschieden):** Bei **jedem Storno ist ein Grund Pflicht** (Eingabe durch die Person, die storniert). → FA-11, ADR 0007 ergänzen (Storno mit Log **und** Grund).
- **B14 · Größere Änderungen (Sirat, entschieden):**
  - Adresse in eine andere Zone: ja, neue Gebühr/neuer Mindestbestellwert werden übernommen.
  - Wechsel **Lieferung ↔ Abholung**: erlaubt.
  - **Mindestbestellwert nicht erreicht (am Telefon):** Die KI sagt es dem Anrufer und fragt, ob er etwas dazunehmen möchte. Will der Anrufer eine **Ausnahme**, verbindet die KI an die Annahme; **die Annahme entscheidet** über die Ausnahme. → FA-01 (Ablauf + Eskalationsgrund „Ausnahme Mindestbestellwert"), FA-03, FA-05 (Annahme darf Mindestbestellwert von Hand unterschreiten — Begründung? offen), K4 (Gesprächsdesign). *Sirats Zahlenbeispiel war frei erfunden, nicht der Wert des Piloten.*
  - Änderung **nach** Bezahlung (Hier essen, Getränk dazu): **neue Bestellung**, keine Nachzahlung auf die alte.
- **B15 · Bestellschluss:** Frage von Sirat nicht verstanden — in Runde 29 einfacher gestellt.
- **B16 · Pausenzeiten (Sirat, bestätigt):** Ja, Pausen zwischen Mittag und Abend sind üblich → **mehrere Zeitfenster je Tag** in FA-18; KI und Vorbestellung prüfen gegen die Fenster.
- **B18 · Zone beschreiben (Sirat, entschieden):** Zonen werden als **Ortsteile/Stadtteile** beschrieben („nach Ortsteil A keine Gebühr, nach Ortsteil B kommt eine Gebühr dazu"), nicht als gezeichnete Fläche. Folge: Das System muss eine genannte Adresse einem Ortsteil zuordnen können (Geocoder → Q6) — und die KI darf den Ortsteil nicht raten. → FA-17, FA-01 (`validate_address`), K4, Q6. *(Sirat nannte reale Ortsteile aus dem Umfeld des Piloten — hier bewusst nicht wiedergegeben.)*
- **B20 · Testbestellung beim Onboarding (Sirat, entschieden):** wird als **Test markiert** und in Zählungen, Übersichten und Kasse **ausgeblendet**. Details später. → FA-20, FA-22, K5 (Kennzeichen `is_test`), Kasse/TSE: ob eine Testbestellung überhaupt an die TSE darf → Steuerberaterin (Q2).

## 2026-09-22 · Runde 29: B15 Bestellschluss, kleine Fragen

- **B15 · Bestellschluss (Sirat, entschieden):** Es gibt **keinen eigenen Bestellschluss** — solange das Restaurant geöffnet hat, werden Bestellungen angenommen (Bestellschluss = Ladenschluss). Muss der Laden an einem vollen Abend **früher dicht machen**, ist das ein **Annahmestopp** (FA-23): keine neuen Bestellungen mehr, aber **bereits angenommene Vorbestellungen für später werden trotzdem gemacht**. → FA-18 (Feld „Bestellschluss" streichen), FA-23 (Annahmestopp wirkt nur auf neue Bestellungen, nie auf bestehende), FA-01/FA-05 (Wunschzeit nur gegen Öffnungsfenster prüfen). *Nicht beantwortet:* ob die KI außerhalb der Öffnungszeit rangeht und Vorbestellungen für den nächsten Tag annimmt → bleibt in Q15 / FA-13.
- **Feiertage / abweichende Einzeltage (Sirat, entschieden):** werden benötigt (z. B. ein einzelner Tag geschlossen oder mit anderen Zeiten). → FA-18.
- **Gutscheine (Sirat, entschieden):** Der Pilot hat **Papier-Gutscheine**. Sie müssen **nicht auf dem Bon** ausgewiesen werden; es reicht, dass Fahrer bzw. Tresen die Einlösung **bestätigen**. *(Lesart Jarvis: Der Gutschein wird beim Kassieren als Zahlungsanteil erfasst, Bon bleibt unverändert; ob und wie das für die Kasse/TSE zählt → Steuerberaterin, Q2. Im ersten Piloten ist der Fahrer-Teil Papier, also betrifft es nur den Tresen: FA-15/FA-16.)*
- **Trinkgeld (Sirat, bestätigt):** bleibt beim Fahrer, taucht nirgends im System auf.
- **Störungsmeldung (Sirat, entschieden):** **Push in der App**; eine technische Störung (Drucker, KI, Verbindung) **muss auf jeden Fall angezeigt** werden. → FA-06, FA-13, FA-14, FA-22; K8 (Zeit bis zur Anzeige), K10.
- **Mitnehmen ohne Anruf (Sirat, bestätigt):** Kunde bezahlt sofort beim Bestellen; die Bestellung wird von der Annahme **von Hand im System** erfasst. → FA-05, FA-15.

**Stand nach Runde 29:** B10–B18, B20 und die kleinen Fragen beantwortet. B19 zurückgestellt (Fahrer-Teil). Offen aus K1: Schnitt FA-23 (Sirat bestätigen), FA-19 „Schicht beginnen" (Sirat ja/nein), Grund-Pflicht bei Ausnahme vom Mindestbestellwert durch die Annahme (FA-05), Q15 (KI außerhalb der Öffnungszeit).

## 2026-09-22 · Runde 30: Schnitt FA-23 bestätigt, FA-19 aufgenommen

- **FA-23 Annahmestopp (Sirat, Schnitt bestätigt):** Zwei Stufen, die man beim Setzen **angeben können muss**: „gar nichts mehr" oder „Lieferung gestoppt, Abholung noch in Ordnung". *Nicht beantwortet:* wer den Annahmestopp setzen darf (Annahme und Inhaber, oder nur Inhaber) → Frage bleibt in FA-23.
- **FA-19 „Schicht beginnen" (Sirat, entschieden):** wird als eigener fachlicher Anwendungsfall aufgenommen. Inhalt laut Gegenlesen B3: Anmeldung der Annahme-Person am Tablet zu Schichtbeginn (PIN, Gerät registriert — Q11), damit Bestellungen, Änderungen, Stornos und der Abschluss je Mitarbeiter (FA-16) einer Person zugeordnet sind. → neue Datei FA-19, Eintrag in `docs/konzept/README.md`; Schnitt jetzt FA-01 … FA-06, FA-08 … FA-23 (FA-07 entfällt).
- **Nachtrag Runde 30 · Annahmestopp setzen (Sirat, entschieden):** **Annahme und Inhaber** dürfen den Annahmestopp setzen (und aufheben). → FA-23.

## 2026-09-22 · Runde 31: Widerspruch Storno-Bon aufgelöst, Nachfragen aus der Einarbeitung

- **Storno-Bon (Sirat, entschieden — ersetzt Runde 20 / ADR 0007):** Es gilt die **Fassung von heute** (Runde 27): **kein Storno-Bon**, stattdessen Anzeige/Hinweis an der Annahme. → Nachtrag-ADR zu 0007 durch `architect`, dort auch: Bestellschluss-Feld gestrichen (Runde 29), Storno-Grund bei jedem Storno Pflicht (Runde 28).
- **Ausnahme Mindestbestellwert durch die Annahme (Sirat, entschieden):** braucht **keine Begründung**, nur den **Protokolleintrag** (wer, wann, welche Bestellung). → FA-05.
- **Geänderter Bon bei Lieferung (Sirat, entschieden):** wird ebenfalls in **zwei Exemplaren** gedruckt (wie der Erst-Bon, ADR 0008). → FA-06, FA-11.
- **Papier-Gutscheine (Sirat, entschieden):** werden **nicht tief ins System eingebunden** — wie der Inhaber sie handhabt, legt er selbst fest. Im System bleibt höchstens die Bestätigung der Einlösung beim Kassieren (Runde 29); keine Gutschein-Verwaltung, keine Nummern, keine Entwertung. → FA-15, FA-16: Regeln entsprechend abschwächen; Frage nach Nummer/Entwertung gestrichen.
- **Schicht ohne Abschluss (Sirat, entschieden):** Die Schicht **bleibt aktiv** und muss **ausdrücklich beendet** werden (FA-16). Keine automatische Abmeldung nach Inaktivität. *Offen:* wer eine liegengebliebene Schicht beenden darf (nur die Person selbst oder auch der Inhaber) → Frage in FA-19.
- **Nachtrag Runde 31 · Liegengebliebene Schicht beenden (Sirat, entschieden):** **Inhaber und Annahme** dürfen eine Schicht beenden — also nicht nur die Person selbst. *(Lesart Jarvis: „Annahmebereich" = jede angemeldete Annahme-Person; der Abschluss je Mitarbeiter in FA-16 bleibt trotzdem der Person zugeordnet, die die Schicht hatte — bei Durchsicht FA-16/FA-19 bestätigen.)* → FA-19, FA-16.

## 2026-09-22 · Runde 32: Einzeldurchsicht FA-01 (Teil 1)

- **Gesprächseinstieg (Sirat, entschieden):** Nach dem festen ersten Satz mit KI-Hinweis fragt die KI **zuerst nach der Bestellart**: „Möchten Sie liefern lassen oder abholen?" (sinngemäß; Sirats zweite Variante: „Geht es um eine Lieferung, Abholung oder Sonstiges?" — das „Sonstiges" fängt Anliegen wie Änderung/Storno/Frage ab und führt dann in FA-03). Erst danach Gerichte → Adresse (bei Lieferung) → Name. → FA-01 Normalablauf Schritt 2/3 anpassen (neuer Schritt „Bestellart erfragen"), 3a/9b entsprechend; K4 Gesprächsdesign legt den Wortlaut fest.
- **Reihenfolge Gerichte → Adresse → Name (Sirat, bestätigt):** passt so.
- Fragen 2 (Vorbestellung: Bon sofort oder erst am Tag?) und 3 (keine Einigung bei Vorbestellung: beenden oder an Mensch?) noch nicht beantwortet.
- **Vorbestellung, Bon (Sirat, bestätigt):** Der Bon wird **sofort** beim Anlegen gedruckt — auch bei Vorbestellung für einen späteren Tag (wie heute der Zettel). Keine zeitgesteuerte Druckung. → FA-01 3b, FA-06 bleiben wie entworfen.
- **Keine Einigung bei Vorbestellung (Sirat, entschieden):** Die KI **beendet das Gespräch freundlich** — keine Übergabe an einen Menschen nur deswegen. → FA-01 3b-i: offene Frage streichen, Ausnahme endet in „keine Bestellung, Gespräch beendet"; FA-04.
- „Sonstiges" als dritte Option im Einstieg: Rückfrage Jarvis, noch nicht beantwortet.

## 2026-09-22 · Runde 33: Einzeldurchsicht FA-01 (Teil 2) — abgeschlossen

- **„Sonstiges" im Einstieg (Sirat, entschieden):** Ja — die KI fragt „Lieferung, Abholung oder Sonstiges?" (Wortlaut → K4). „Sonstiges" führt zu Auskunft oder Übergabe an einen Menschen (FA-03). → FA-01 Schritt 2/3, FA-03.
- **Adresse außerhalb des Liefergebiets (Sirat, entschieden):** Die KI sagt zuerst, dass dorthin nicht geliefert wird (und bietet Abholung an). Bittet der Anrufer um eine **Ausnahme**, verbindet die KI an die **Annahme**, die entscheidet — gleiches Muster wie beim Mindestbestellwert (Runde 28 B14). → FA-01 6a, FA-03 (neuer Eskalationsgrund „Ausnahme Liefergebiet"), FA-05 (Annahme darf Adresse außerhalb der Zonen anlegen — Protokolleintrag; Liefergebühr/Lieferzeit dafür? offen), FA-17.
- **Vorbestellung über Preiswechsel (Sirat, bestätigt):** Es gilt der **Preis vom Bestelltag** (eingefroren bei Bestellung, Briefing §5.2). → FA-01, FA-12: Frage schließen, [VORSCHLAG] → [ENTSCHIEDEN Sirat 2026-09-22].
- **FA-01 ist damit mit Sirat durchgegangen** (Runden 32–33). Status → „mit Sirat durchgegangen" nach Einarbeitung. Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 34: Einzeldurchsicht FA-06 (Teil 1) — Bon erst nach Quittierung

- **Rufnummer auf Abhol-/Mitnehmen-Bon (Sirat, entschieden):** Ja, die Rufnummer steht auch auf dem Bon bei Abholung/Mitnehmen. → FA-06 1a, offene Frage schließen.
- **Neuer Ablauf beim Eingang einer Bestellung (Sirat, entschieden — ändert „Bon sofort"):** Sobald eine Bestellung (von der KI) eingegangen ist, **signalisiert das Annahme-Gerät** (Ton/Piepen + Anzeige „Neue Bestellung"). Der Kollege **quittiert** die Anzeige am Gerät — **erst dann wird der Bon gedruckt** und die Bestellung geht weiter. *(Lesart Jarvis: Der Druck wird durch die Quittierung ausgelöst, nicht durch das Anlegen. Bestellung existiert ab Anlegen im System, ist bis zur Quittierung „neu/unquittiert". Betrifft FA-06 Normalablauf, FA-01 Schritt 12/13 [Bon-Druck raus, stattdessen Signal], FA-13, FA-14, K3 [Zustand oder Merkmal „quittiert"], K8 [Zeit bis Signal], K10 [Anzeige].)*
- **Offen (Rückfragen Jarvis, Runde 35):** Was passiert, wenn **niemand quittiert** (Stoßzeit, Gerät nicht in Hörweite) — nach X Minuten trotzdem drucken, oder Signal wiederholen bis jemand kommt? Gilt die Quittierung auch für **von Hand** angelegte Bestellungen (FA-05) — vermutlich nein, da die Annahme sie selbst eingibt. Gilt sie für **Vorbestellungen** genauso? Kennzeichnung „Station"/„Fahrer/Kunde" und „GEÄNDERT" (Frage 2), Aufbewahrung des Stations-Exemplars (Frage 4) noch unbeantwortet.

## 2026-09-22 · Runde 35: Einzeldurchsicht FA-06 (Teil 2) — abgeschlossen

- **Niemand quittiert (Sirat, entschieden):** Nach **2 Minuten** ohne Quittierung wird der Bon **trotzdem gedruckt** (mit Hinweis/Warnung an der Annahme, dass unquittiert gedruckt wurde — Lesart Jarvis). Bis dahin signalisiert das Gerät weiter. → FA-06, K8 (2 Minuten als Zahl), K3.
- **Von Hand angelegte Bestellungen (Sirat, entschieden):** gelten als **direkt quittiert** — Bon druckt sofort beim Anlegen, kein extra Schritt. → FA-05, FA-06.
- **Vorbestellungen der KI (Sirat, bestätigt):** gleiches Prinzip — Signal → Quittierung → Druck (spätestens nach 2 Minuten). → FA-06 1b, FA-01 3b.
- **Kennzeichnung (Sirat, bestätigt):** Die zwei Liefer-Exemplare tragen „Station" / „Fahrer/Kunde"; der geänderte Bon trägt deutlich „GEÄNDERT". [VORSCHLAG] Jarvis → [ENTSCHIEDEN Sirat 2026-09-22]. → FA-06, K10.
- **Stations-Zettel heute (Sirat, Ist-Ablauf):** Die Zettel werden am Abend **gesammelt** (aufbewahrt), nicht weggeworfen. *Folge:* Das Stations-Exemplar mit Name, Adresse, Rufnummer liegt dauerhaft auf Papier → Löschkonzept braucht eine Regel für Aufbewahrung/Vernichtung (Frist? Zweck: Kontrolle/Reklamation?) → Q10, Anwalt; Einweisung beim Onboarding (FA-20). *Nicht gefragt:* wie lange gesammelt wird und wozu.
- **FA-06 ist damit mit Sirat durchgegangen** (Runden 34–35). Status → „mit Sirat durchgegangen" nach Einarbeitung. Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 36: Einzeldurchsicht FA-15 (Teil 1) — Kasse beim Piloten

- **Zahlart am Tresen (Sirat, bestätigt):** **nur bar**, kein EC-/Kartengerät. → FA-15, FA-16 bleiben.
- **Bestehende Kasse beim Piloten (Sirat, Ist-Ablauf — neu und wichtig):** Der Pilot hat **ein Kassensystem**, das für den **Tischbetrieb** („Hier essen" im Gastraum) genutzt wird — Bestellungen am Tisch werden dort eingetragen. → fluvo läuft im Piloten **neben** einer bestehenden Kasse. *Folgen:* (1) Q2 an die Steuerberaterin wird konkreter: Darf fluvo Barzahlungen am Tresen erfassen, wenn daneben eine TSE-Kasse läuft — oder muss jede Barzahlung in *die* Kasse? (2) Braucht der Pilot die Bestellart **„Hier essen" in fluvo** überhaupt, wenn der Gastraum über die bestehende Kasse läuft? (3) Doppelerfassung vermeiden: Werden Abholung/Mitnehmen heute in die bestehende Kasse eingetippt? *Nicht gefragt — Runde 37.* → FA-15, FA-16, FA-05, FA-20 (Onboarding: bestehende Kasse erfassen), Q2, K11 (MVP-Schnitt).
- **Nie abgeholte Bestellung (Sirat, entschieden — ändert Runde 10):** Auch die **Annahme** darf das Ende ohne Bezahlung **mit Grund** bestätigen, nicht mehr nur der Inhaber. Gleiches Muster wie Storno (ADR 0007/0009: Grund Pflicht, Protokoll, sichtbar im Inhaber-Log). → FA-15 2a, „Darf nicht", Regeln (Geldrechte-Liste), FA-16; ADR-Nachtrag zu 0007 nötig (Geldrecht „Ende ohne Bezahlung" fällt weg).

## 2026-09-22 · Runde 37: „Hier essen" fällt aus dem Piloten-Schnitt

- **Bestellart „Hier essen" (Sirat, entschieden — ändert den Schnitt vom 2026-09-18):** wird für den Piloten **komplett gestrichen**. Gäste im Gastraum laufen über das **bestehende Kassensystem** des Piloten bzw. manuell (Lesart Jarvis aus „Manavelli" = „manuell"). fluvo kennt im Piloten nur noch **drei Bestellarten**: Lieferung · Abholung nach Anruf · Mitnehmen ohne Anruf. → README (Schnitt-Absatz „Vier Bestellarten"), FA-05 (Bestellart streichen, Sofortzahlung bleibt für Mitnehmen), FA-15 (Ausnahme 1b streichen, Storno-nach-Zahlung-Beispiel anpassen), FA-16, FA-11 (B14 „Getränk nach Bezahlung" wird gegenstandslos, Regel bleibt für Mitnehmen), FA-06, K3, K5, K11 (MVP-Schnitt). ADR-Nachtrag (zusammen mit „nie abgeholt", Runde 36).
- *Offen aus Runde 36:* Wo landet heute das Bargeld von Abholung/Mitnehmen (bestehende Kasse oder daran vorbei)? Frage an die Steuerberaterin (fluvo neben TSE-Kasse) — Jarvis formuliert sie auf Sirats Wunsch.
- **Bargeld von Abholung/Mitnehmen (Sirat, entschieden):** wird **in fluvo erfasst** (Tresen-Kassieren FA-15, Abschluss FA-16) — nicht in der bestehenden Kasse. *(Ob es heute in die bestehende Kasse eingetippt wird, hat Sirat nicht gesagt; für die Steuerberaterin relevant.)* Frage an die Steuerberaterin formuliert Jarvis → Q2.
- **FA-15 ist damit mit Sirat durchgegangen** (Runden 36–37). Status → „mit Sirat durchgegangen" nach Einarbeitung.

## 2026-09-22 · Runde 38: Einzeldurchsicht FA-05 begonnen — unbeantwortet (Sitzungsende)

Jarvis hat FA-05 zusammengefasst und drei Fragen gestellt; Sirat hat die Sitzung vorher beendet. **Offen, beim nächsten Mal zuerst:**
1. Pflichtangabe „Adresse merken? — Kunde gefragt" bei manueller Annahme: streng (ohne Antwort kein Anlegen) oder Standard „Nein", nur bei „Ja" antippen?
2. Adresse außerhalb aller Zonen (Ausnahme durch die Annahme): Liefergebühr und Lieferzeit von Hand eintippen, oder automatisch der Wert der weitesten Zone?
3. Annahmestopp „gar nichts mehr" gesetzt, Annahme will trotzdem von Hand anlegen: Sperre oder nur Warnung mit „trotzdem anlegen"?

## 2026-09-22 · Runde 39: Einzeldurchsicht FA-05 — die drei Fragen beantwortet (Q22–Q24)

- **Q22 · Adresse außerhalb aller Zonen (Sirat, entschieden):** Die **Liefergebühr** gibt die Annahme **von Hand** ein. Die **Lieferzeit** wird **nie frei getippt**, sondern **immer aus einem Raster in 15-Minuten-Schritten** gewählt: 15 · 30 · 45 · 1 Std · 1:15 · 1:30 (… Obergrenze nicht genannt — Lesart Jarvis: Raster geht weiter, z. B. bis 2 Std; bei Durchsicht FA-17 bestätigen). Die **Abholzeit** hat ein **Raster in 10-Minuten-Schritten**: 10 · 20 · 30 (…). *Lesart Jarvis: Das Raster gilt bei jeder Handannahme, nicht nur außerhalb der Zonen; innerhalb einer Zone ist der Zonenwert (FA-17) vorausgewählt und die Annahme kann auf einen anderen Rasterwert wechseln. Folge für FA-17: Zonen-Lieferzeit und Abhol-Zeitwert werden ebenfalls auf dem Raster gepflegt, damit die Werte zusammenpassen.* → FA-05 (4a, Schritt 5, Regeln, Testszenarien, Frage schließen), FA-17 (Werteformat, Frage in Zeile 60 schließen), K5 (Datenwörterbuch: Lieferzeit/Abholzeit als Rasterwert in Minuten), K10 (Auswahl statt Freitext).
- **Q23 · Handannahme bei Annahmestopp „gar nichts mehr" (Sirat, entschieden):** **Warnung** mit „trotzdem anlegen" — keine harte Sperre. *(Lesart Jarvis: Das Übersteuern wird protokolliert wie die anderen Ausnahmen der Annahme — Person, Zeit, Bestellung, ohne Begründung.)* → FA-05 (neue Ausnahme), FA-23 (Wirkung auf Handannahme präzisieren).
- **Q24 · „Adresse merken?" bei Handannahme (Sirat, bestätigt — nach Hinweis von Jarvis auf ADR 0007):** Sirats erste Antwort war „Adresse wird immer gemerkt"; nach dem Hinweis auf Weg B (Einwilligung, Q10 beim Anwalt) **bleibt Weg B**: Der Mitarbeiter **fragt den Kunden immer** und merkt die Adresse **nur bei Ja**. Damit bleibt FA-05 in diesem Punkt wie entworfen; ob die Pflichtangabe streng ist oder Standard „Nein" hat, wurde nicht mehr eigens entschieden — *Lesart Jarvis: streng (Anlegen erst nach Antwort), wie im Entwurf.* Keine Änderung an ADR 0007.
- **FA-05 ist damit mit Sirat durchgegangen** (Runden 38–39). Status → „mit Sirat durchgegangen" nach Einarbeitung. Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 40: Einzeldurchsicht FA-11 (Ändern/Stornieren)

- **Zweiter Anruf mit Änderungswunsch (Sirat, entschieden — „fürs erste"):** Das Telefon wird an einen **Mitarbeiter weitergegeben**; die KI ändert nichts (bestätigt FA-03 / [FEST 11]). Eine **zeitliche Grenze** („bis wann darf geändert/storniert werden?") hat Sirat **nicht** gesetzt — *Lesart Jarvis: im Piloten keine Systemgrenze außer der Zahlungsregel (nach erfasster Zahlung nur Inhaber, ADR 0007); ob es noch geht, klärt die Annahme mit der Küche.* → FA-11 Frage „bis wann" schließen (mit Lesart), K3.
- **Neue Adresse außerhalb aller Zonen nach Änderung (Sirat, bestätigt):** gleiche Regel wie bei der Handannahme (Runde 39): Warnung, Annahme darf als **Ausnahme** speichern, **Liefergebühr von Hand**, **Lieferzeit aus dem 15er-Raster**, **Protokolleintrag** ohne Begründung. → FA-11 3d, Regeln, Testszenario „Neue Adresse außerhalb", Frage schließen; FA-17.
- **Einzelne Position streichen vor Zahlung (Sirat, bestätigt):** ist eine **Änderung**, kein Storno — die Annahme klärt es mit dem Kunden, **editiert die Bestellung** und gibt einen **neuen Zettel** raus **„oder schreibt auf dem alten noch drauf"**. *Achtung — Lesart Jarvis, noch zu bestätigen (Runde 41):* Der **Systemeintrag bleibt Pflicht** (Runde 14: Bon, Betrag und Abschluss müssen übereinstimmen); ob die Küche den **neuen Bon** bekommt oder die Annahme den alten Zettel **handschriftlich ergänzt**, ist dann eine organisatorische Wahl der Annahme — der Druck des geänderten Bons wäre damit **nicht erzwungen**. Teilstorno **nach Zahlung** bleibt bei Q3 (Steuerberaterin). → FA-11 3c, Regeln (neuer Bon: von „wird ausgegeben" auf „wird angeboten/kann ausgegeben werden"?), FA-06.
- **„Storno-Anzeige an der Annahme" (Sirat, entschieden):** Keine eigene Anzeige nötig — der Kunde sagt am Telefon (an den Mitarbeiter, FA-03), welche Bestellung, und **die Annahme storniert selbst**. *Lesart Jarvis: Die „Anzeige" aus ADR 0009 ist nichts Eigenes; der Storno ist wie jede Änderung in der Bestellübersicht/im Log sichtbar; Küche per Zuruf.* → FA-11 (Nachbedingung, Storno-Schritt 5, Regeln, Testszenario „Kundenstorno: Anzeige" auf „sichtbar in der Übersicht" umformulieren), FA-06, ADR 0009 (Nachtrag durch `architect` bei Gelegenheit — keine neue Entscheidung, nur Präzisierung).

## 2026-09-22 · Runde 41: FA-11 — geänderter Bon ist ein Angebot, kein Zwang (Variante B)

- **Geänderter Bon (Sirat, entschieden — Variante B):** Der **Systemeintrag jeder Änderung bleibt Pflicht** (Runde 14 gilt weiter: Betrag und Abschluss kommen aus dem System). **Ob** die Annahme danach den geänderten Bon **druckt** oder den **alten Zettel in der Küche handschriftlich ergänzt**, entscheidet sie selbst — der Druck ist ein **Angebot** („Geänderten Bon drucken"), **kein automatischer Ausdruck**. Wird gedruckt, gelten die bisherigen Regeln (Kennzeichnung „GEÄNDERT", bei Lieferung zwei Exemplare, ADR 0008/0009). Bekanntes Risiko (von Jarvis benannt, von Sirat in Kauf genommen): Der Küchenzettel kann vom System abweichen, wenn das Nachschreiben vergessen wird — das Geld stimmt trotzdem. → FA-11 (Normalablauf Schritt 3, Nachbedingung, „Darf nicht", Regeln, Testszenarien), FA-06 (geänderter Bon: auf Anforderung), K10 (Schaltfläche).
- **FA-11 ist damit mit Sirat durchgegangen** (Runden 40–41). Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 42: Einzeldurchsicht FA-23 (Annahmestopp) — abgeschlossen

- **„Tagesende" (Sirat, entschieden):** Der Annahmestopp endet von selbst **beim Ladenschluss des Tages** (aus den Öffnungszeiten, FA-18) — nicht um Mitternacht. → FA-23 (Ende-Ablauf, Regel [OFFEN] → entschieden, Testszenario „Ende am Tagesende"), FA-18 (Ladenschluss als Bezugspunkt), K8 (Zeitpunkt als Zahl).
- **Sichtbarkeit für den Betreiber (Sirat, entschieden):** Der Betreiber **sieht** den aktiven Annahmestopp in den Gesundheitswerten (FA-22) — welcher Schalter, seit wann. Keine Einsicht in Bestellungen, nur der Betriebszustand. → FA-23 (Regel, Frage schließen), FA-22 (Gesundheitswert „Annahmestopp aktiv seit …").
- **Ist-Ablauf heute beim Piloten (Sirat):** In Stoßzeiten wird **nicht rangegangen** oder es wird rangegangen und gesagt: „Wir nehmen keine Bestellungen mehr entgegen." → FA-23 (Abschnitt „Ist-Ablauf heute" füllen).
- **FA-23 ist damit mit Sirat durchgegangen** (Runde 42). Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 43: Einzeldurchsicht FA-19 (Schicht beginnen) + FA-16 (Abschluss je Mitarbeiter)

- **Zwei Personen am Tresen (Sirat, entschieden):** **Ein Tablet**; wenn nötig wechselt die aktive Person per **PIN-Wechsel**. Genau **eine** Person ist am Gerät aktiv, die andere hat nur eine offene Schicht mit eigener Börse. → FA-19 (Ausnahme 2a, Frage „mehrere Personen gleichzeitig" schließen), FA-16 (1a), FA-15, K10.
- **Wechselgeld-Ausgabe (Sirat, entschieden — ändert ADR 0007):** Die Ausgabe des Wechselgelds **muss nicht bestätigt werden** — weder vorab noch nachträglich. Der Wechselgeld-Start ist ein eingestellter Wert je Restaurant (FA-16/FA-20), die Schicht startet damit ohne Inhaber-Handgriff; die Person darf sofort annehmen und kassieren. *Folge:* Das Geldrecht „Wechselgeld-Ausgabe am Schichtbeginn bestätigen" aus ADR 0007 **entfällt** → Nachtrag-ADR durch `architect` (zusammen mit den anderen Nachträgen von heute). → FA-19 (Normalablauf Schritt 4 streichen, Ausnahme 4a entfällt, Nachbedingung, Regeln, Testszenarien), FA-16 (Vorbedingung), FA-20.
- **Liste nicht kassierter Bestellungen (Sirat, entschieden — B7):** sieht **auch die Annahme**, nicht nur der Inhaber — passend dazu, dass die Annahme das Ende ohne Bezahlung mit Grund bestätigen darf (Runde 36). → FA-16 (Schritt 3, 3a, Frage B7 schließen), FA-15.
- **Abschluss-Bestätigung durch den Inhaber (Sirat, entschieden — ändert Runde 16 / ADR 0007):** Der Inhaber darf den Abschluss **auch vom Handy** bestätigen, nicht nur am Hauptgerät im Laden. *Folge:* Der Inhaber-Bereich ist nicht mehr an das Hauptgerät gebunden → Anmeldung des Inhabers am eigenen Handy wird ein eigener Zugang (Q11, `security-reviewer`: Gerätebindung/Registrierung des Inhaber-Handys, kein PIN allein). Nachtrag-ADR. Risiko (von Jarvis benannt): Der Inhaber bestätigt Geld, das er nicht in der Hand hat — Soll-Betrag, gemeldeter Betrag und Kommentar bleiben sichtbar, die Bestätigung ist protokolliert. → FA-16 (Schritt 5, 5d, Frage schließen), FA-19, FA-20 (Inhaber-Handy registrieren), K9 (Rollen/Rechte), K10.
- **Liegengebliebene Schicht (Sirat, bestätigt):** Vergisst eine Person, ihre Schicht zu beenden, bleibt sie eingeloggt; **die nächste angemeldete Annahme-Person** (oder der Inhaber) beendet die Schicht. Lesart „Annahme = jede angemeldete Annahme-Person" **bestätigt**. → FA-19, FA-16: Lesart-Markierung entfernen.
- **FA-19 und FA-16 sind damit mit Sirat durchgegangen** (Runde 43). Offen bleiben dort nur Q2 (Steuerberaterin), Q3 (benanntes Ende nicht kassierter Bestellungen), Q11 (Sperrschwelle, Offline-Anmeldung) und der Fahrer-bezogene Punkt „zwei Börsen" (zurückgestellt, ADR 0008). Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 44: Einzeldurchsicht FA-17 (Lieferzonen) + FA-18 (Öffnungszeiten)

- **Raster-Obergrenzen (Sirat, entschieden — ergänzt Runde 39):** Lieferzeit-Raster 15 Min … **2 Std** (15er-Schritte); Abholzeit-Raster 10 Min … **60 Min** (10er-Schritte). **Zusätzlich** muss man bei der Handannahme statt eines Rasterwerts eine **konkrete gewünschte Uhrzeit** wählen können (z. B. „um 18:30") — das ist der Vorbestellungs-Fall (Wunschzeit), auch am selben Tag. → FA-05 (Schritt 5: Raster **oder** Uhrzeit), FA-17 (Werteformat, Obergrenzen), FA-01 (Vorbestellung), K5, K10.
- **Änderung eines Zeitwerts / der Öffnungszeiten mitten im Gespräch (Sirat, bestätigt):** Das **laufende KI-Gespräch bleibt beim Stand vom Gesprächsbeginn**; der neue Wert gilt ab dem nächsten Anruf — gleiche Regel wie bei Preisen (FA-12). → FA-17 (2a, Frage schließen), FA-18 (2b, Frage schließen), K4.
- **Zone ohne Zeitwert (Sirat, entschieden):** Die KI nennt einen **Standardwert von einer Stunde** („ca. eine Stunde"), und die **Annahme bekommt einen Hinweis**, dass die Zone keinen Zeitwert hat (damit sie nachgetragen wird). Kein Übergeben an einen Menschen, keine Ablehnung. *Lesart Jarvis: Gilt nur für die fehlende **Lieferzeit**; fehlen **Liefergebühr oder Mindestbestellwert**, gibt es keinen sinnvollen Standard — bleibt bei „fehlender Wert muss auffallen", KI übergibt (FA-03). Bei Durchsicht bestätigen.* → FA-17 (1a, „Darf nicht" anpassen: Standardwert ist erlaubt, aber nie still — Hinweis Pflicht; Regeln, Testszenario), FA-01, FA-22? (nein — Hinweis an die Annahme, nicht an den Betreiber).
- **Zeit bei Vorbestellung (Sirat, bestätigt):** Die KI nennt bei einer Vorbestellung die **gewünschte Uhrzeit** als Zusage, nicht die Zonen-Lieferzeit; „muss flexibel sein". → FA-17 (Frage schließen), FA-01 (3b), K4.
- **FA-17 und FA-18 sind damit mit Sirat durchgegangen** (Runde 44). Offen bleiben dort nur Q6 (Geocoder, technisch) und Q15 (Durchklingeln außerhalb der Öffnungszeit, AP-001). Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 45: Einzeldurchsicht FA-13 (KI an/aus) + FA-14 (Internetausfall)

- **Befund Jarvis (korrigiert FA-14):** Ein Internetausfall **im Laden** stoppt die KI **nicht** — sie läuft in der Cloud, die Rufumleitung im Telefonnetz. Ohne Gegenmaßnahme nimmt die KI weiter an, während Tablet und Drucker (CloudPRNT braucht Internet) nichts davon sehen; der 2-Minuten-Notdruck greift auch nicht. Die Aussage „KI-Telefonie ruht während des Ausfalls, Telefon klingelt durch" (FA-14 Nachbedingung, 1a) ist falsch und wird ersetzt.
- **KI bei nicht erreichbarem Annahme-Gerät (Sirat, entschieden — Variante A):** Merkt der **Server**, dass das Annahme-Gerät des Restaurants nicht mehr erreichbar ist, wird die KI-Annahme **automatisch pausiert**: Sie geht ran und sagt freundlich ab („momentan nicht möglich"), wie beim Annahmestopp (FA-23), bis das Gerät wieder online ist. Keine unsichtbaren Zusagen. *Lesart Jarvis: Schwelle (wie lange „nicht erreichbar", z. B. wenige Minuten) → K8 als Zahl; ob die KI dabei eine Vorbestellung anbietet, wie beim Annahmestopp → K4; die Pause wird als Ereignis protokolliert und dem Betreiber im Monitoring (FA-22) angezeigt.* → FA-14 (Nachbedingung, 1a, „Darf nicht", Regeln, Testszenario), FA-13 (neue Ausnahme „automatische Pause"), FA-01, FA-22, FA-23 (Abgrenzung), K4, K8, K9 (Ausfall-Tabelle).
- **KI ausschalten während eines Gesprächs (Sirat, entschieden — „erstmal"):** Das laufende Gespräch wird **zu Ende geführt**; „aus" greift danach. [VORSCHLAG] Jarvis → [ENTSCHIEDEN Sirat 2026-09-22]. → FA-13 (1a, Frage schließen).
- **Bon ohne Internet (Sirat, bestätigt):** Falls der Drucker ohne Internet nicht lokal drucken kann (AP-002/Q8, Ende B): Die Bestellung bleibt am Tablet sichtbar, der Bon wird **nachgedruckt**, sobald das Netz zurück ist; die Küche bekommt solange einen **handgeschriebenen Zettel**. → FA-14 (2a, Frage schließen), FA-06.
- **Längerer Ausfall (Sirat, entschieden):** Bei einem längeren Ausfall steigt das Personal **sicherheitshalber ganz auf Papier um**. *Nicht gefragt (Frage an Sirat für die nächste Runde): ab wann („länger" = ?), und ob die Papier-Bestellungen und das dabei kassierte Bargeld nach dem Ausfall im System **nachgetragen** werden — sonst stimmen Abschluss je Mitarbeiter (FA-16) und Inhaber-Log für diesen Tag nicht.* → FA-14 (4a, Frage umformulieren), FA-16.
- **FA-13 und FA-14 sind damit mit Sirat durchgegangen** (Runde 45) — mit der einen offenen Rückfrage zum Papier-Nachtrag. Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 46: FA-14 — was beim Internetausfall praktisch passiert (Papier, kein Nachtrag)

- **Ablauf beim Ausfall (Sirat, entschieden):** Fällt das Internet aus, **schaltet das Personal die Annahme und die KI selbst aus** (Lesart Jarvis: über das Inhaber-/Mitarbeiter-Handy mit Mobilfunk, da das Tablet offline ist — FA-13 „KI aus" bzw. Annahmestopp FA-23) und **nimmt Bestellungen auf Papier auf**, bis das Internet zurück ist. Die automatische KI-Pause (Runde 45, Variante A) bleibt als **Sicherheitsnetz**, falls niemand schaltet.
- **Kein Nachtrag (Sirat, entschieden — Variante B):** Die Papier-Bestellungen werden **nicht** ins System nachgetragen — „das ist okay". Beim Abschluss/der Abrechnung dieses Tages **wartet man einfach** bzw. der Inhaber prüft die Zettel von Hand; das System muss nichts davon wissen. → FA-14 (4a, Rückfrage schließen), FA-16 (Hinweis: Tage mit Papier-Anteil — Abschluss deckt nur die im System kassierten Beträge; Papier-Bargeld liegt außerhalb), Q2/Steuerberaterin (Barumsätze auf Papier neben fluvo — Hinweis für die Frage), K11 (Pilot-Kriterien: Ausfalltage zählen nicht gegen fluvo).
- **„Ab wann länger":** Aus Sirats Beschreibung: praktisch **sofort** — es gibt keine Karenzzeit, in der man am Tablet in der Offline-Warteschlange weiterarbeitet. Die Offline-Warteschlange ([FEST 18]) bleibt technisch bestehen (laufende Bestellungen abrufbar, Nachspielen), ist aber im Piloten **nicht** der geplante Arbeitsweg. → FA-14 (Normalablauf Schritt 3 relativieren: „kann"; Ziel/Nachbedingung anpassen), K8, K11.
- **FA-14 ist damit ohne offene Rückfrage mit Sirat durchgegangen** (Runden 45–46).

## 2026-09-22 · Runde 47: Einzeldurchsicht FA-12 (Speisekarte und Preise)

- **Ist-Ablauf heute (Sirat):** Es gibt eine **neue (Papier-)Speisekarte**, und die wird **weitergegeben** — an Telefon und Küche. Kein weiterer Prozess. → FA-12 „Ist-Ablauf heute", Frage schließen.
- **„Gültig ab" (Sirat, entschieden):** ein **Datum** (gilt ab Tagesbeginn), keine Uhrzeit. → FA-12 (Schritt 3, Frage schließen), K5 (Feldtyp Datum).
- **Artikel ohne Preis (Sirat, entschieden — ändert die Lesart von Runde 27 B10):** Ein Artikel **ohne Preis wird nicht angelegt**; das System gibt den **Hinweis „Artikel konnte nicht angelegt werden, weil der Preis fehlt"**. *Folge (Lesart Jarvis, Sirat zur Bestätigung vorgelegt):* Da die Annahme keinen Preis setzen darf (Runde 20/27), kann sie damit **faktisch keinen Artikel anlegen** — Artikel anlegen wird zur Inhaber-Aufgabe; der Annahme bleiben **„momentan aus"** und das **Entfernen** von Artikeln/Optionen (dokumentiert für den Inhaber). Die Regel „Annahme darf Artikel/Optionen ohne Preis anlegen" (B10) wird entsprechend eingeschränkt. → FA-12 (Ziel, Akteur, Normalablauf/Ausnahme „Annahme legt Artikel an", Regeln, Testszenario, Frage schließen), K9 (Rechte-Matrix).
- **Haftung Allergene/Steuersatz:** nicht heute — bleibt Frage an den Anwalt (neben Q10).
- **K8-Frage „wie schnell kommt eine Änderung bei der KI an":** Sirat nicht gefragt (technisch); Vorschlag Jarvis für K8: spätestens beim nächsten Anruf, laufendes Gespräch bleibt beim Startstand (konsistent mit Runde 44).
- **FA-12 ist damit mit Sirat durchgegangen** (Runde 47), vorbehaltlich der Bestätigung der Folge „Annahme legt keine Artikel mehr an". Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 48: Bestätigungen (Runden 44, 47) und Einzeldurchsicht FA-21 + FA-22 (Betreiber)

- **Bestätigt (Sirat):** Runde 44 — Standardwert „ca. eine Stunde" gilt nur bei fehlender **Lieferzeit**; fehlen Liefergebühr oder Mindestbestellwert, übergibt die KI an einen Menschen (FA-03). Runde 47 — die Annahme legt faktisch **keine Artikel/Optionen** mehr an (kein Preisrecht); ihr bleiben „momentan aus" und Entfernen. → FA-17, FA-12: Lesart-Markierungen entfernen, [ENTSCHIEDEN Sirat 2026-09-22], Runde 48.
- **Modul-/Paketänderung (Sirat, entschieden):** wirkt **sofort** — Dazubuchen und Abbuchen gleich; Abrechnung tagesgenau. → FA-21 (Frage schließen, Regeln), K6 (Entitlements), Preismodell-Bezug.
- **Sperre (Sirat, bestätigt Vorschlag Jarvis):** Sperre = keine **neuen** Bestellungen (KI sagt ab, Handannahme gesperrt); **laufende** Bestellungen werden zu Ende geführt; der Inhaber sieht den Hinweis „gesperrt, bitte fluvo kontaktieren"; Gründe: Zahlungsrückstand, Vertragsende. → FA-21 (drei Fragen schließen: Umfang, laufende Bestellungen, Sichtbarkeit beim Inhaber), FA-13/FA-23 (Abgrenzung: Sperre ist Betreiber-Sache, nicht schaltbar vom Restaurant).
- **Störungs-Ampel (Sirat, bestätigt Vorschlag Jarvis):** **Rot** = KI nicht erreichbar, Annahme-Gerät offline (KI automatisch pausiert), Drucker offline — jeweils **während der Öffnungszeit**. **Gelb** = Minutenpaket fast verbraucht, Annahmestopp seit über einer Stunde. Übriges = Information. Aktualisierung im **Minutentakt**, nicht live. → FA-22 (zwei Fragen schließen), K8 (Zahlen: 1 Minute, „über eine Stunde", Schwelle „fast verbraucht" → Vorschlag 80 %, K8), K10.
- **Support ohne Einblick (Sirat, entschieden):** Der Betreiber sieht **keine Bestellungen** — auch nicht ausnahmsweise Bestellnummern. Support läuft über Gesundheitszustand plus Absprache mit dem Inhaber. → FA-22 (Frage schließen, „Darf nicht" schärfen), K9 (Rollen: Betreiber ohne Bestell-Lesezugriff), Compliance (Datensparsamkeit).
- **Onboarding-Reihenfolge (FA-20):** Sirat hat nach der Bedeutung von „Wechselgeld-Start" gefragt (erklärt: fester Startbetrag je Börse, einmal je Restaurant eingestellt, Grundlage des Abschlusses FA-16). Antwort zur Reihenfolge steht noch aus → Runde 49.
- **FA-21 und FA-22 sind damit mit Sirat durchgegangen** (Runde 48); offen bleiben dort nur Q2 (Testbestellung und TSE, Steuerberaterin). Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 49: Wechselgeld raus aus dem System (ändert Runde 12 / ADR 0007 / ADR 0011)

- **Wechselgeld (Sirat, entschieden):** Wechselgeld wird **nirgendwo im System eingerechnet** — kein Wechselgeld-Start, keine Einstellung je Restaurant, kein Bestandteil des Abschlusses. Wer Wechselgeld braucht (Fahrer, Annahme-Person), regelt das **separat und für sich**, außerhalb von fluvo. *Folgen (Lesart Jarvis, aus der Entscheidung abgeleitet):* Der Abschluss je Mitarbeiter (FA-16) zeigt nur noch die **Summe der bar kassierten Beträge** dieser Person — das ist der zurückzugebende Betrag; die „eigene Börse" bleibt als Zuordnung des Kassierens zur Person, ohne Startbetrag. Der Onboarding-Schritt „Wechselgeld-Start" (FA-20) entfällt. FA-19 eröffnet die Schicht ohne Startbetrag. Für den späteren Fahrer-Kassensturz (FA-08/FA-10, zurückgestellt) gilt dasselbe Muster (nur kassierte Beträge). → Nachtrag-ADR (0012) durch `architect`: ersetzt in ADR 0007 „Wechselgeld-Ausgabe bestätigen" endgültig, in ADR 0011 den Punkt „Wechselgeld ohne Bestätigung, Startwert je Restaurant" und in Runde 12 den „festen Wechselgeld-Start je Börse".
- **Onboarding-Reihenfolge (FA-20):** Sirat hat nur zum Wechselgeld Stellung genommen. *Lesart Jarvis: Die vorgeschlagene Reihenfolge gilt ohne den Wechselgeld-Schritt (Stammdaten → Module → Rufnummer/KI → Drucker → Öffnungszeiten → Liefergebiet → Speisekarte → Mitarbeiter/PINs → Geräte registrieren → Testbestellung → Übergabe per E-Mail-Link) — Sirat bei Gelegenheit bestätigen.*
- **FA-20 ist damit mit Sirat durchgegangen** (Runden 48–49), vorbehaltlich der Reihenfolge-Bestätigung. Kreuzverhör und Abnahme stehen aus.

## 2026-09-22 · Runde 50: Zwei Kleinigkeiten aus Runde 48 (FA-21, FA-22)

- **Modul abbuchen bei offenen Vorgängen (Sirat, entschieden):** Offene Vorgänge (z. B. offene Schicht/Abschluss) werden **zu Ende geführt** — wie bei der Sperre; das Modul ist ab dann nur für Neues weg. → FA-21 (Ausnahme 3a, Frage schließen, Testszenario).
- **Schwelle „Minutenpaket fast verbraucht" (Sirat, entschieden):** **80 %** des gebuchten Minutenpakets → Gelb. → FA-22 (Regel, Testszenario), K8 (Zahl).

## 2026-09-23 · Runde 51: Kreuzverhör FA-01 beginnt — Sonderwünsche, Notizfeld, Adressfelder

- **Extra-Zutaten (Sirat, entschieden):** Wünsche wie „extra Zwiebeln" sind **keine Notiz**, sondern **bepreiste Optionen** nach einer **Betriebsregel**: Der Aufpreis je Extra-Zutat hängt von der **Größe/Variante des Artikels** ab (Beispiel Sirat: kleine Pizza Margherita, Extra-Zutat Zwiebel = 50 Cent obendrauf). Der Server rechnet den Aufpreis, die KI nennt ihn mit. → FA-12 (Optionen-Modell: Aufpreis je Extra abhängig von Größe/Variante), FA-01 Schritt 5, K5 (Datenmodell Option/Variante), K4.
- **Notizfeld (Sirat, entschieden):** Ein **freies Notizfeld muss immer da sein** — für Anweisungen an Küche/Fahrer („beim Nachbarn klingeln", „ohne Zwiebeln" ohne Preisfolge). *Lesart Jarvis, noch zu bestätigen:* ein Feld je Bestellung; KI liest die Notiz in der Zusammenfassung mit vor; steht auf dem Bon; gehört zur Bestellung (nicht zum Kundeneintrag); reine Weitergabe, keine Zusage; Längenbegrenzung → K8. → FA-01, FA-05, FA-06 (Bon-Layout), K5, Compliance (Freitext = Personendaten-Klasse, LLM-Ausgabe ist Daten, keine Anweisung).
- **Adresse strukturiert (Sirat, entschieden):** **Stockwerk** und **Ort/Ortsteil** sind **eigene Felder** der Lieferadresse, nicht Teil der Notiz. *Lesart Jarvis:* Adresse = Straße, Hausnummer, PLZ, Ort/Ortsteil, Stockwerk (optional); der Ortsteil wird vom Geocoder gesetzt (Runde 28 B18), der Anrufer kann ihn nennen, die KI rät ihn nicht. → FA-01 Schritt 6, FA-05, FA-06 (Bon), K5 (Datenwörterbuch).
- **Notizfeld — Lesart bestätigt (Sirat, Runde 51):** ein Notizfeld je Bestellung; KI liest die Notiz in der Zusammenfassung mit vor und lässt sie bestätigen; Notiz steht auf dem Bon; kostenpflichtige Wünsche landen nicht in der Notiz, die KI verweist auf die bepreiste Option. [ENTSCHIEDEN Sirat 2026-09-23]
- **Zahlungsmöglichkeiten bei Lieferung (Sirat, entschieden, Runde 51):** Je Restaurant wird als **Stammdatum hinterlegt, welche Zahlungsmöglichkeiten** es bei Lieferung gibt (nur Bar / Bar und Karte beim Fahrer; Online-Zahlung später). Die KI **sagt die Zahlungsmöglichkeit in der Zusammenfassung von sich aus an** und beantwortet Fragen dazu nur aus dem Stammdatum; Sonderhinweise („habe nur einen Fünfziger") gehen in die Notiz (Wechselgeld außerhalb des Systems, ADR 0012). **Keine Zahlart je Bestellung** im ersten Piloten (ADR 0008 bleibt), Feld im Datenmodell vorgesehen (K5). [ENTSCHIEDEN Sirat 2026-09-23] → FA-01 (Schritt 10, Regeln, Testszenario), FA-05 (Anzeige bei Handannahme), FA-20 (Onboarding-Stammdatum), K4, K5. *Offen (Fakt vom Piloten, nicht entschieden):* ob der Fahrer des Piloten Karte annehmen kann — vor dem Pilotstart erfassen.
- **Adresse nicht auflösbar — neue Ausnahme 7b (Sirat, bestätigt Vorschlag Jarvis, Runde 51):** Findet der Geocoder die Adresse nicht, fragt die KI **einmal** nach (buchstabieren / Hausnummer / Ortsteil); bei Mehrdeutigkeit nennt sie die **Systemkandidaten** zur Auswahl (kein Raten, B18). Klappt es nach dem zweiten Anlauf nicht oder ist der Geocoder nicht erreichbar → **Übergabe an die Annahme** (FA-03, neuer Eskalationsgrund „Adresse nicht auflösbar"); die Annahme legt von Hand an und wählt die Zone (FA-05 4a). Die KI legt **nie** eine Liefer-Bestellung mit unaufgelöster Adresse an. [ENTSCHIEDEN Sirat 2026-09-23] → FA-01 (7b, Darf nicht, Testszenarien), FA-03 (Grund), K4, K9 (Ausfall Geocoder).
- **Bekannte Lieferorte (Sirat, entschieden, Runde 51):** Anrufer nennen oft **keinen Straßennamen**, sondern einen Ort, den das Restaurant kennt („Firma Soundso", „am See wie immer", „Baustelle Hauptstraße"). Dafür gibt es eine **Liste bekannter Lieferorte** je Restaurant als Stammdaten: **Name, Zone, Fahrer-Hinweis** (z. B. „Tor 2, beim Pförtner"), optional Adresse. Anlegen dürfen **Inhaber und Annahme**. Die KI gleicht genannte Orte mit der Liste ab — **Treffer aus der Liste, kein Raten** — bestätigt den Ort und braucht dann keine Adresse. Stammkunden (FA-02) können statt einer Adresse einen Ort hinterlegt haben. **Unbekannter Ort:** einmal nachfragen (Straße in der Nähe / Ortsteil), sonst Übergabe an die Annahme (7b); die Annahme kann den Ort beim Anlegen **sofort als bekannten Lieferort speichern**, damit die KI ihn künftig kennt. Die KI legt **nie** eine Liefer-Bestellung mit einem Ort an, der weder in der Liste noch im Kundeneintrag noch beim Geocoder auflösbar ist. [ENTSCHIEDEN Sirat 2026-09-23] → **neuer Fall FA-24 „Bekannte Lieferorte pflegen und nutzen"** (Akteur Inhaber, Annahme, KI), Verweise in FA-01 (Schritt 6/7, 7b), FA-02, FA-05, FA-06 (Fahrer-Hinweis auf dem Bon), FA-17 (Zone), FA-20 (Onboarding optional), K4 (Function Call), K5 (Datenwörterbuch), K9 (Rechte).
- **Großbestellung / Schwellenwert (Sirat, entschieden, Runde 51):** In der Realität werden große Bestellungen **vorbestellt auf einen Zeitraum**. Ein **Schwellenwert je Restaurant** ist erlaubt — für die **Ausnahmefälle** (Großbestellung *ohne* Vorlauf, Scherzanruf). *Lesart Jarvis, zu bestätigen:* (1) Schwelle als **Artikelanzahl** (einfacher für Küche und Anrufer als Warenwert), Startwert vom Inhaber im Onboarding, änderbar; (2) **Sofort-Bestellung über der Schwelle** → KI nimmt vollständig auf, legt nicht selbst an, **übergibt an die Annahme** (FA-03, Grund „Großbestellung"); erreicht sie niemanden → Bestellung als **„Rückruf nötig"** an der Annahme, kein Bon bis ein Mensch bestätigt; (3) **Vorbestellung über der Schwelle** mit ausreichend Vorlauf → KI nimmt sie **regulär** an (das ist der Normalfall der Praxis), die Annahme sieht sie wie jede Vorbestellung; was „ausreichend Vorlauf" ist → Zahl für K8 (Vorschlag: mindestens Zonen-Lieferzeit × 2 bzw. „nicht mehr heute"). → FA-01 (neue Ausnahme 9b, Regeln, Testszenarien), FA-03 (Grund), FA-05 (Hinweis bei Handannahme über Schwelle, keine Sperre), FA-20 (Stammdatum), K4, K8.
- **Großbestellung — Lesart bestätigt (Sirat, Runde 51):** Schwelle als Artikelanzahl; Sofort-Bestellung über Schwelle → Übergabe / „Rückruf nötig"; Vorbestellung über Schwelle mit genug Vorlauf → regulär angenommen; Vorlauf-Zahl → K8. [ENTSCHIEDEN Sirat 2026-09-23]
- **Anlegen scheitert nach Bestätigung — neue Ausnahme 13a (Sirat, bestätigt Vorschlag Jarvis, Runde 51):** Die KI sagt „aufgenommen" **nur nach Systembestätigung**. Jeder Anruf trägt einen **eindeutigen Schlüssel**; ein Wiederholungsversuch erzeugt **keine zweite Bestellung** (Idempotenz als fachliche Regel). Nach kurzem Wiederholen (Anzahl/Zeit → K8) sagt die KI ehrlich „konnte nicht speichern" und **verbindet an die Annahme** (FA-03, Grund „technischer Fehler"); niemand erreichbar → „bitte in wenigen Minuten erneut anrufen", **kein Rückruf-Versprechen**. Vorfall **rot im Monitoring** (FA-22). [ENTSCHIEDEN Sirat 2026-09-23] → FA-01 (13a, Darf nicht, Testszenarien), FA-03 (Grund), FA-22 (Rot-Kriterium), K4, K6 (Idempotenzschlüssel je Anruf), K8, K9 (Ausfall-Tabelle).
- **Sprachen (Sirat, entschieden, Runde 51):** Im Piloten spricht die KI **Deutsch** und **Englisch** (Umschalten, wenn der Anrufer erkennbar Englisch spricht); beide Sprachen werden in K4 mit Testanrufen abgenommen. Andere Sprachen: KI bleibt bei einfachem Deutsch, bietet nach dem zweiten Missverständnis **Übergabe an einen Menschen** an (FA-03, Grund „Sprache"); **kein** Umschalten in eine nicht abgenommene Sprache. Später je Restaurant freischaltbar (Stammdatum). [ENTSCHIEDEN Sirat 2026-09-23] → FA-01 (Regel, Testszenario), FA-03 (Grund), K4 (Gesprächsfluss zweisprachig, Testanrufe EN), K8 (Sprachen als Anforderung). *Offen (Fakt vom Piloten):* welche Sprachen tatsächlich anrufen — vor Pilotstart erfragen.
- **Einstieg: Bestellart als Pflichtangabe, nicht Pflichtreihenfolge (Sirat, entschieden, Runde 51 — präzisiert Runde 32/33):** Die KI nimmt auf, was der Anrufer in **beliebiger Reihenfolge** sagt (Gerichte, Adresse, Zeit), und **fragt nur nach, was fehlt**. Nennt der Anrufer von sich aus eine Adresse, ist die Bestellart Lieferung — die KI bestätigt das kurz statt es zu erfragen. Sagt der Anrufer nach dem KI-Hinweis nichts Konkretes, stellt die KI die Bestellart-Frage „Lieferung, Abholung oder Sonstiges?" wie bisher („Sonstiges" bleibt als Ausweg). **Vor der Zusammenfassung (Schritt 10) müssen alle Pflichtangaben vorliegen:** Bestellart, Gerichte (mit Optionen), bei Lieferung Adresse oder bekannter Lieferort (FA-24), Name, Rufnummer, Zahlungsmöglichkeit angesagt, ggf. Wunschzeit, ggf. Notiz. T2 umformulieren: „keine Zusammenfassung ohne Bestellart" statt „keine Gerichte ohne Bestellart". [ENTSCHIEDEN Sirat 2026-09-23] → FA-01 (Schritt 3, Regeln, T2), K4 (Pflichtangaben-Liste als Prüfregel, kein starrer Dialogbaum).
- **Vorbestellung am Wunschtag — kein zweiter Bon (Sirat, entschieden, Runde 51 — Vorschlag Jarvis abgelehnt):** Der Bon druckt **einmal** am Anruftag (wie entschieden, FA-06 1b). **Kein** erneuter Druck zur Fälligkeit. Stattdessen wird die Vorbestellung **am Annahme-Bildschirm angezeigt**: sie bleibt sichtbar, bis sie fällig ist bzw. abgeschlossen wird. *Lesart Jarvis, zu bestätigen bei FA-05/K10:* getrennte Liste „Vorbestellungen" (heute / später) am Annahme-Gerät, am Wunschtag mit Hinweis/Signal zur Fälligkeit (Vorlauf → K8); Nachdruck nur von Hand über die bestehende Nachdruck-Funktion (FA-06), wenn der Zettel verloren ist. [ENTSCHIEDEN Sirat 2026-09-23] → FA-01 (3b: Hinweis), FA-06 (Regel: einmaliger Druck bestätigt), FA-05/K10 (Anzeige Vorbestellungen), K8 (Vorlauf für Hinweis).

## 2026-09-23 · Runde 52: Vorgehen — Durchstich-Spur statt K2→K11 in Reihenfolge

- **Sirat, entschieden:** Agiler vorgehen und früher Code schreiben — aber **zuerst Datenmodell und Architekturbild**, damit klar ist, welche Technologien verwendet werden, wie es aussieht und wie es skaliert. Reihenfolge damit: (0) FA-01-Abnahme steht aus · **Architekturbild mit Skalierungsaussage** (aus Briefing §4/§5, aktualisiert um ADR 0008–0013) · **K5 Datenmodell für den Durchstich** (ER + Datenwörterbuch mit DSGVO/GoBD-Klasse) · **K3 Zustandsmodell** als eine Seite → (1) Kern als Code mit Tests aus K1 → (2) Voice-Adapter gegen Sandbox, K4 entsteht im Bau → (3) Annahme minimal + Bon → (4) zehn Testanrufe, Konzept nachziehen. K2, K8, K9, K10, K11 dünn, wachsen mit dem Code. Nicht in der Spur: FA-24, Großbestellung, Sprachen, Onboarding, Monitoring, Kasse. Code je AP weiterhin nur auf Ansage; Arbeitszyklus bleibt. → ADR (Vorgehen, `architect`), Roadmap, Konzept-README.
- **FA-01 abgenommen (Sirat, 2026-09-23, Runde 52).** Erster abgenommener Fall. Status in Datei und README gesetzt.
- **Ansatz (Sirat, entschieden, Runde 52):** **Implementieren zuerst, Konzept-Artefakte fallweise nebenbei** — je Fall entsteht, was zum Bauen nötig ist (Zustand, Schema, Vertrag, Test), nicht die Landkarte in Reihenfolge. Jarvis einverstanden mit Bedingungen: Kern-Qualität (Zustandsmaschine, RLS, Event-Log) von Anfang an; Arbeitszyklus je AP bleibt; Code je AP nur auf Ansage; Architekturbild + K5-Ausschnitt + K3 vor dem ersten Kern-Code (heute gestartet). → ADR 0014, CLAUDE.md §Konzeptphase, jarvis.md §4b, roadmap (doc-updater nach ADR).
- **Q13 — reduzierte Zustandskette für den Piloten (Sirat, entschieden, Runde 52):** `received` → `delivered` | `handed_over` | `cancelled` (Storno-Pfad), `ended_unpaid` bleibt [VORSCHLAG] bis Q3; Quittierung/Vorbestellung/Test/Zahlung sind Merkmale, keine Zustände; Küchen-/Fahrer-Zustände (`in_kitchen`, `ready`, `out_for_delivery`, `settled`) werden später **zwischen** `received` und `delivered` eingeschoben (Status als erweiterbare Literal-Union, kein DB-Enum). Storno-Recht hängt am Merkmal „bezahlt". Abweichung von Briefing §5.3 — Briefing-Änderung nur auf Ansage. [ENTSCHIEDEN Sirat 2026-09-23] → ADR 0015 (`architect`), Skill fluvo-core-domain nachziehen, Q13 schließen (Rest-Unterpunkte als eigene Fragen).
- **Dritte Datenklasse (c) „betrieblich" (Sirat, entschieden, Runde 52):** neben (a) DSGVO-löschbar und (b) GoBD 10 Jahre gibt es (c) betriebliche Stammdaten ohne Personenbezug und ohne Buchungscharakter (Speisekarte, Zonen, Öffnungszeiten, Geräte). Beschäftigtendaten (users, staff_shifts) sind **nicht** (c) und nicht der Kundenlöschung unterworfen (eigene Frist → Anwalt A5). Löschjobs tabellen-scharf. Abweichung von Briefing §5.2 — Briefing-Änderung nur auf Ansage. [ENTSCHIEDEN Sirat 2026-09-23] → ADR 0016 (`architect`), Skill fluvo-compliance nachziehen, Q10-Hinweis „drei Datenklassen" auflösen.
