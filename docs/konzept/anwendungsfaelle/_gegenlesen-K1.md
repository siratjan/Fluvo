# Gegenlesen K1 — Befunde und Fragenliste

Stand: 2026-09-21 · Jarvis hat alle 20 FA-Entwürfe Zeile für Zeile gegen die Mitschrift (`_gespraechsnotizen-K1.md`), ADR 0006 und Briefing §2 gelesen. Kein Artefakt, sondern Arbeitsliste: Teil A geht an `requirements-engineer` (Korrekturen ohne Entscheidung), Teil B ist die nach Wirkung sortierte Fragenliste für Sirat, Teil C sind Vormerkungen für spätere Artefakte.

Gesamturteil: Die Entwürfe sind nah an der Mitschrift, Vorschläge sind fast überall als `[VORSCHLAG]` markiert, das Geld-Muster (FA-10/FA-16) ist durchgängig gleich. Die Schwächen liegen an den **Nähten zwischen den Fällen** und in **Resten des Stands vor Runde 9** (Küche im System).

## A · Korrekturen ohne Entscheidung (an `requirements-engineer`)

### A1 · Reste „Küche im System" (widerspricht Runde 9 / ADR 0006)

Im Piloten gibt es keine Küchen-Status und keine Küchen-Oberfläche. Trotzdem:

- **FA-08:** Vorbedingung „Status **Fertig**", Übergang „Fertig → Unterwegs", Testfälle „fertige Liefer-Bestellung", Nachbar „FA-07 (Küche → Fertig)". Richtig ist: Die Bestellung steht beim Scan auf **Eingegangen** (wie FA-15 es schon schreibt); der Weg Eingegangen → Unterwegs gehört zu Q13/K3.
- **FA-14:** Akteur „Koch", „Annahme- und Küchen-Oberfläche", „die Küche sieht weiter", „Statusfortschritt", „Konfliktregeln der Küche". Im Piloten gibt es nur die Annahme-Oberfläche; die Küche arbeitet vom Bon.
- **FA-06:** Schritt 5 und Nachbar-Fälle verweisen auf FA-07; „Nicht Teil" ebenso. Koch als Leser des Bons bleibt, der Verweis auf FA-07 wird zu „entfällt im Piloten".
- **FA-01, FA-05:** Verweise „Küche → FA-07" in „Nicht Teil" / Nachbar-Fälle.
- **FA-13:** Ausnahme 1b und Testfall „Fahrer oder Koch" — eine Rolle Koch mit Anmeldung gibt es im Piloten nicht.

### A2 · Überholte offene Fragen

- **FA-05, Offene Frage 1** („beim Bestellen oder beim Abholen, wer kassiert?"): für Abholung nach Anruf entschieden (Runde 9/10: bei der Übergabe, zuständige Person). Offen ist nur noch Mitnehmen → auf FA-15 verweisen, dort steht es richtig.
- **FA-18:** Regel-Zeile „Was ein Anrufer außerhalb der Öffnungszeit hört — [OFFEN]" und Offene Frage 3: In Runde 14 entschieden (klingelt durch, keine Ansage). Offen ist nur die technische Machbarkeit → Verweis auf **Q15**, nicht auf FA-13.
- **Vorbestellung über Preiswechsel:** dieselbe Frage steht in FA-01, FA-05 und FA-12. Einmal führen (FA-12), in den anderen nur verweisen.

### A3 · Falsche Verweise und Stufen

- **[FEST]-Nummern gemischt:** Die Entwürfe mischen die Nummern des Briefings (§2, 1–21) mit den „zehn Regeln" aus CLAUDE.md. `[FEST 7]` wird für das unveränderliche Ereignisprotokoll benutzt (FA-08, FA-09, FA-10, FA-16) — im Briefing ist das **§2.6**; §2.7 ist die Modulgrenze. FA-18 nutzt `[FEST 4]` für den Storno-Pfad, überall sonst ist `[FEST 4]` die Mandantentrennung. FA-08/FA-15 schreiben `[FEST 2/4]`. Regel: nur Briefing-Nummern (`[FEST 2]` Zustandsmaschine, `[FEST 4]` Multi-Tenant, `[FEST 6]` Ereignisprotokoll, `[FEST 8]` Gehirn/Hände, `[FEST 18]` Offline).
- **FA-20:** „TSE ab wann scharf → Q5/Q11" ist falsch. Q5 = große Speisekarten, Q11 = Login. Richtig: **Q2** (und Steuerberaterin).
- **FA-09, „Darf nicht" Punkt 4:** als `[FEST]` markiert, Quelle ist aber die Mitschrift → `[ENTSCHIEDEN Sirat 2026-09-18]`.
- **FA-01, Regel „Vorbestellung über Preiswechsel":** als `[FEST]` geführt und zugleich „Bestätigung steht aus". Stufe: `[VORSCHLAG]` aus Briefing §5.2, bis Sirat bestätigt.
- **Zählung der Testszenarien** stimmt nicht: FA-01 (T9, 10 Zeilen), FA-09 (T6, 7 Zeilen), FA-10 (T9, 13 Zeilen), FA-15 (T10, 9 Zeilen).
- **Reihenfolge der Ausnahmen:** FA-10 (4a, 4c, 4b), FA-15 (2a steht nach 4b), FA-16 (5a vor 4a) — nach Schritt sortieren.
- **Landkarte:** Titel FA-16 heißt im Entwurf „Abschluss je Mitarbeiter am Tresen", in der Landkarte „Tagesabschluss für Abholung, Mitnehmen und Hier essen" → angleichen.

### A4 · Erfundener Ist-Ablauf

- **FA-04:** „Heute schreibt der Kollege erst mit, wenn wirklich bestellt wird …" steht nicht in der Mitschrift.
- **FA-13:** „Nimmt niemand ab, klingelt es ins Leere — es gibt keine Vertretung" steht nicht in der Mitschrift.
Beides als „nicht besprochen" kennzeichnen oder streichen (wie FA-02 und FA-18 es richtig machen).

### A5 · Widersprüche innerhalb eines Falls

- **FA-10 / FA-16, „nur ein Betrag" gegen „Liste":** „Darf nicht: zeigt nichts über den zurückzugebenden Betrag hinaus" — aber Schritt 2a (FA-10) bzw. Schritt 3 (FA-16) zeigen im selben Abschluss eine Liste nicht zugeordneter / nicht kassierter Bestellungen. Auflösung ohne neue Entscheidung: Der **Fahrer/Mitarbeiter** sieht nur den Betrag; die **Liste sieht der Inhaber** (und die Annahme). Wem genau → Frage B7.
- **FA-06, Schritt 2:** Bon enthält „Zahlart". Bei Bestellung ist die Zahlart nicht bekannt (bar/Gutschein entscheidet sich an der Tür bzw. am Tresen). Streichen.
- **FA-11, „Darf nicht" Punkt 7** („nicht ohne Küchen-Abklärung wirksam") und Testfälle „Küche: schon im Ofen" / „zugerufen, aber Eintrag vergessen" mit Prüfung „automatisch": Das System kann die Abklärung nicht erkennen (keine Küchen-Status). Als **organisatorische Regel** kennzeichnen, Prüfung „manuell".
- **FA-15, 1b:** „… übergibt das Essen und der Bon geht in die Küche" — Reihenfolge verdreht; der Bon geht bei der Bestellung in die Küche (FA-05/FA-06).

## B · Fragen an Sirat — nach Wirkung sortiert

### Große Wirkung (verändern mehrere Fälle)

**B1 · Wo ist der Inhaber, wenn er bestätigen muss?** Kassensturz (FA-10), Tresen-Abschluss (FA-16), „nicht zustellbar" (FA-09), „nie abgeholt" (FA-15), Storno (FA-11) — alles wartet auf den Inhaber. Ist er beim Piloten jeden Abend bis Schichtende im Laden? Bestätigt er am Gerät im Laden (eigene Anmeldung am geteilten Tablet) oder von unterwegs am eigenen Handy? Gibt es eine Vertretung (z. B. Schichtleiter mit Geldrechten)? Ohne Antwort bleibt jeden Abend etwas offen — und ein Kunde, der storniert, während der Inhaber nicht da ist, bekommt trotzdem geliefert.

**B2 · Der Inhaber kassiert selbst — wer bestätigt seinen Abschluss?** Steht er am Tresen oder fährt selbst aus, würde er sich selbst bestätigen. Möglichkeiten: Inhaber hat keine Börse im System · er bestätigt sich selbst (wird so protokolliert) · gar kein Abschluss für ihn.

**B3 · Schichtbeginn fehlt als Fall.** FA-08, FA-10 und FA-16 setzen eine „offene Schicht mit Wechselgeld-Start" voraus, aber kein Fall beschreibt, wie sie entsteht. Wer öffnet sie (die Person selbst beim Anmelden)? Bestätigt jemand die Ausgabe des Wechselgelds? Kann eine Person am selben Abend **fahren und am Tresen kassieren** — eine Börse oder zwei? Vorschlag: neuer kleiner Fall **FA-19 „Schicht beginnen"**.

**B4 · Wann entsteht ein Stammkunde?** FA-02 sagt „Kundenstamm wird durch diesen Fall nicht verändert" und „Anlegen/Pflegen des Kundenstamms → später, nicht im Piloten". FA-01 und FA-05 legen auch keinen Kunden an. Dann gibt es im Piloten **nie** einen Stammkunden, und FA-02 kann nicht eintreten. Entscheidung: Legt die erste Bestellung automatisch einen Kundeneintrag an (Rufnummer + Adresse)? Wenn ja: Hinweis am Telefon nötig? → danach Anwalt (Q10).

**B5 · Name und Rufnummer des Kunden.** Heute schreibt der Kollege den **Namen** auf (Runde 3). In FA-01 fragt die KI weder nach Name noch nach Rufnummer; FA-05 erfasst den Namen nur bei Abholung; FA-06 druckt keinen Namen. Aber FA-15 beginnt mit „Der Kunde nennt sich (Name/Bestellung)". Fragen: Fragt die KI immer nach dem Namen? Was tut sie bei **unterdrückter Nummer** — nachfragen (der Fahrer braucht sie laut Runde 6 auf dem Bon)? Steht der Name auf dem Bon?

**B6 · „Wo bleibt mein Essen?"** Status-Auskunft ist laut Briefing V2. Der Anruf kommt trotzdem — vermutlich oft. In FA-03 fehlt er als Eskalationsgrund. Vorschlag: sechster Grund „Frage zu einer laufenden Bestellung" → Übergabe an einen Menschen (Weg nach Q4). Einverstanden? Gleiche Frage für **Allergen-Auskunft** am Telefon: Darf die KI aus der Karte antworten, oder gibt sie ab?

**B7 · Vorbestellungen in den Abschluss-Listen.** FA-10 listet „Liefer-Bestellungen ohne Fahrer", FA-16 „Tresen-Bestellungen, die niemand kassiert hat". Eine Vorbestellung für nächste Woche stünde jeden Abend in beiden Listen. Vorschlag: In die Listen kommt nur, was **fällig** war (Wunschzeit bzw. Bestelltag = heute). Und: Wer sieht die Listen — nur der Inhaber, oder auch die Annahme?

**B8 · Braucht „Hier essen" einen zweiten Handgriff?** Hier essen wird beim Bestellen bezahlt (Runde 7). FA-15 verlangt danach noch ein Erfassen der Übergabe — vergisst man es, steht die Bestellung abends als „nicht abgeschlossen" in FA-16. Vorschlag: Hier essen ist **mit der Zahlung fertig**, kein zweiter Schritt. Gleiches für Mitnehmen, falls dort beim Bestellen bezahlt wird (hängt an der offenen Frage aus FA-15). Außerdem fehlt in FA-05: Die Sofortzahlung muss der **angemeldeten Person** zugeordnet werden (sonst stimmt FA-16 nicht).

**B9 · Betrag nach einer Änderung.** FA-08 sagt „kassiert den auf dem Bon stehenden Betrag" und „der Betrag auf dem Bon wird nicht verändert". FA-11 sagt: Änderung → neuer Preis → neuer Bon. Hat der Fahrer schon gescannt und den alten Bon in der Tasche, stimmt der Bon nicht mehr. Vorschlag: Maßgeblich ist immer der **Betrag in der Fahrer-App**, nicht der Bon; die App zeigt eine Änderung deutlich an. Dazu die schon gestellte Frage: Bis wann darf geändert werden (bis zum Scan / bis kassiert ist)?

### Mittlere Wirkung (ein Fall, klare Entscheidung)

**B10 · Was darf die Annahme an der Speisekarte?** Runde 11 nennt „Speisekarte" als Betriebsrecht der Annahme, Runde 13 nimmt Preise, Allergene und Steuersatz aus. FA-12 hat daraus „Annahme darf **nur** heute aus" gemacht — das ist enger als gesagt. Darf die Annahme Artikel/Optionen anlegen oder entfernen (ohne Preis)?

**B11 · Liefergebühr und Mindestbestellwert sind auch Geld.** FA-17 lässt die Annahme alle drei Zonenwerte ändern (Betriebsrecht „Zonen", Runde 11). Runde 13 sagt „Preise nur Inhaber". Vorschlag: Annahme ändert nur die **Lieferzeit** (und Abholzeit); Liefergebühr, Mindestbestellwert und Zonen anlegen/entfernen nur der Inhaber.

**B12 · „Heute aus" — wer setzt zurück?** FA-12: „bis der Inhaber ihn zurücksetzt". Darf die Annahme zurücksetzen? Springt „heute aus" am nächsten Geschäftstag **von selbst** zurück (der Name legt es nahe)?

**B13 · Storno: Begründung und Bon.** Beim Abschluss mit Abweichung ist eine Begründung Pflicht. Beim Storno nicht beschrieben — soll der Inhaber auch dort einen Grund angeben? Und: Bekommt die Küche einen **Storno-Bon**, damit sie aufhört zu kochen (heute Zuruf)?

**B14 · Änderung, die mehr ist als „eine Pizza dazu".** Nicht beschrieben: Adresse ändern (andere Zone → andere Gebühr/Mindestbestellwert), Lieferung ↔ Abholung wechseln, Änderung drückt die Summe **unter den Mindestbestellwert**, Änderung **nach** Bezahlung (Hier essen: Gast bestellt ein Getränk nach — neue Bestellung oder Nachzahlung?).

**B15 · Bestellschluss — worauf bezieht er sich?** FA-18 prüft die **Wunschzeit** gegen den Bestellschluss. Gemeint war (Runde 13) vermutlich der Zeitpunkt, zu dem **bestellt wird** („letzte Bestellung vor Ladenschluss"). Beispiel: Bestellschluss 21:30, jemand bestellt um 15:00 für 21:45 — annehmen? Und: Zwischen Bestellschluss und Ladenschluss — geht die KI noch ran und sagt „heute nicht mehr", nimmt sie Vorbestellungen für morgen an?

**B16 · Pausenzeiten.** FA-18 kennt je Tag ein „Von–Bis". Hat der Pilot eine Mittagspause (z. B. 11–14:30 und 17–22)? Dann braucht es mehrere Zeitfenster je Tag.

**B17 · Mindestbestellwert — worauf?** Warenwert ohne Liefergebühr (üblich) oder Gesamtsumme?

**B18 · Wie beschreibt der Inhaber eine Zone?** „Stadtteile bzw. Orte" (Runde 6) — als Liste von Postleitzahlen/Ortsteilnamen oder als gezeichnete Fläche auf der Karte? Am Handy ist Zeichnen mühsam. (Technik danach: Q6.)

**B19 · Offene „nicht zustellbar"-Meldung und Kassensturz.** Hat der Fahrer gemeldet, der Inhaber aber noch nicht bestätigt: Kann der Kassensturz trotzdem abgeschlossen werden (der Betrag ist ohnehin nicht drin)? Gleiches für Bestellungen, die beim Öffnen des Kassensturzes noch **Unterwegs** sind — Vorschlag: Kassensturz erst möglich, wenn nichts mehr Unterwegs ist.

**B20 · Testanruf beim Onboarding erzeugt eine echte Bestellung.** FA-20 verlangt eine Testbestellung. Sie landet in Bestellungen, Bon, Zählung (FA-22 „Anzahl Bestellungen") und später in der Kasse/TSE. Wie wird sie als Test gekennzeichnet bzw. wieder entfernt?

### Kleine Wirkung / beim Durchgehen (stehen schon in den Entwürfen)

Läuft ein KI-Gespräch beim Ausschalten zu Ende (FA-13) · „das Übliche" für Stammkunden, mehrere Adressen, neue Adresse merken (FA-02) · abgebrochene Anrufe sichtbar (FA-04) · Feiertage/Einzeltage (FA-18) · Mitnehmen: Zahlung beim Bestellen (FA-15) · Papier-Gutschein mit Nummer/Entwertung (FA-08/15) · Wartezeit an der Tür, zweiter Versuch, korrigierte Adresse (FA-09) · Kundenrufnummer auf dem Abhol-Bon (FA-06) · „gültig ab" mit Uhrzeit (FA-12) · Reihenfolge Onboarding (FA-20) · Benachrichtigungsweg und Dringlichkeit (FA-22) · Wirkung von Modulwechsel und Sperre (FA-21) · Vorbestellung: Preis vom Bestelltag (FA-12).

## C · Vormerkungen (keine Frage an Sirat jetzt)

- **Nach AP-001 (Variante X):** FA-13 geht von einem Schalter in der App aus. Bei Variante X steuert der Netzbetreiber die Umleitung (GSM-Codes am Telefon) — die App kann „aus" dann nicht erzwingen, und „außerhalb der Öffnungszeit klingelt es durch" (Runde 14) ist technisch fraglich (Q15). FA-13, FA-18 (7a), FA-20 (Schritt 3: Rufnummer je Restaurant als eigenes Bundle, Einverständnis + Gewerbeanmeldung) und FA-22 („KI erreichbar" prüft nur den Agenten, nicht die Umleitung) nach dem Test neu fassen.
- **K7 / `architect`:** Offline-Annahme (FA-14/FA-05) gegen [FEST 8] „Summen rechnet der Server": Was nennt die Annahme dem Kunden offline als Summe, und was gilt, wenn der Server beim Nachspielen anders rechnet? Dazu Liefergebiets-Prüfung offline. Und: Bestellung offline angelegt, Laden-Internet weg, Fahrer hat Mobilfunk → der Scan kennt die Bestellung noch nicht.
- **FA-20 / Recht:** AVV-Abschluss mit dem Restaurant fehlt als Vorbedingung von „startklar"; Geräte-Registrierung (Tablet, Fahrer-Handys) fehlt als Onboarding-Schritt.
- **K3 (Q13):** unverändert die sechs Punkte; zusätzlich aus A1: Übergang Eingegangen → Unterwegs ohne Küchen-Zustände.
- **K10:** Fahrer-App zeigt Betrag und Änderungen (B9); Personenwechsel per PIN; Anzeige „KI an/aus"; Offline-Hinweis.
