# Offene Fragen [OFFEN]

Stand: 2026-09-23 · Gepflegt vom Agenten `doc-updater`.

Regel: **Nicht raten.** So bauen, dass beide Antworten möglich bleiben, und Sirat fragen. Beantwortete Fragen bekommen ein ✅ in der Überschrift, das Datum und einen Verweis auf das ADR — sie werden nicht gelöscht.

Die Fragen Q1–Q8 stammen aus der Analyse des Briefings vom 2026-09-18 und sind noch nicht mit Sirat durchgesprochen.

---

### Q1 · Rufumleitung: Kommt die Nummer des Anrufers an?
**Warum wichtig:** Der Overflow-Modus nutzt „Rufumleitung bei Nichtmelden". Je nach Netzbetreiber wird dabei die Nummer des Restaurants statt der des Anrufers übermittelt — dann funktioniert die Stammkunden-Erkennung per Rufnummer nicht. Außerdem hört der Kunde erst 15–20 Sekunden Klingeln.
**Klären durch:** Test mit dem echten Anschluss des Piloten (Roadmap R1).
**Beide Wege offen halten:** `get_customer_by_phone` muss mit „keine Nummer" umgehen können. Alternative wäre Portierung der Nummer bzw. SIP-Anbindung.
**Wer:** Sirat + Netzbetreiber des Piloten.

### Q2 · TSE bei Internetausfall und Signaturzeitpunkt
**Warum wichtig:** Küche und Bon sollen offline laufen, die Cloud-TSE braucht Internet. Offen: Ausfallregeln (Dokumentation, Hinweis auf dem Bon, Nachsignatur) und wann signiert wird — bei Bestellung oder bei Zahlung (bei Barzahlung an der Tür liegen beide auseinander). Ebenso: Online-Zahlungen, Trinkgeld.
**Beide Wege offen halten:** `fiscal_transactions` mit Status `pending / signed / failed_outage`, verknüpft mit einem Event statt mit einem festen Bestellstatus.
**Wer:** Steuerberaterin.

**Ergänzung 2026-09-21 (ADR 0008):** Im ersten Piloten erfasst fluvo bei **Lieferungen** die Bestellung samt Summe, aber **nicht die Barzahlung an der Tür** (Fahrer-Teil kommt später; zwei Bons, Bargeld auf Papier wie heute). Frage an die Steuerberaterin, **vor Pilotstart**: Ist das zulässig? Muss die Barzahlung einer Lieferung im System erfasst werden — und wenn ja, genügt ein Nachtrag bei Rückkehr des Fahrers oder am Schichtende? **Beide Wege offen halten:** Fahrer-Zuordnung und Teilzahlungen je Zahlart im Datenmodell vorsehen; der Mittelweg aus dem Rat (Annahme trägt Fahrer und Zahlart nach) ist der vorbereitete Rückfall.

**Ergänzung 2026-09-22 (K1, Runden 36–37):** Der Pilot hat **bereits ein Kassensystem** (für den Tischbetrieb). fluvo läuft daneben und erfasst im Piloten **nur** Lieferung, Abholung nach Anruf und Mitnehmen — das Bargeld von Abholung/Mitnehmen wird **in fluvo** kassiert, nicht in der bestehenden Kasse; „Hier essen" bleibt komplett bei der bestehenden Kasse. **Frage an die Steuerberaterin (Wortlaut zum Weiterleiten):**

> Ein Liefer-Restaurant nutzt heute ein Kassensystem mit TSE für den Gastraum. Zusätzlich soll eine Software eingeführt werden, die Telefon- und Abholbestellungen erfasst, Bons druckt und für Abhol- und Mitnahmebestellungen die Barzahlung am Tresen aufzeichnet (Betrag, Zeitpunkt, kassierende Person). Lieferungen werden in der Software erfasst, die Barzahlung an der Haustür aber vorerst nicht. Drei Fragen: (1) Darf diese Software Barzahlungen aufzeichnen, während daneben die bestehende TSE-Kasse läuft — oder muss jede Barzahlung ausschließlich in die bestehende Kasse, und die Software hält nur „bezahlt: ja"? (2) Wenn die Software Barzahlungen aufzeichnet: braucht sie dann selbst eine TSE, und ab wann — ab dem ersten Tag des Pilotbetriebs? (3) Ist es zulässig, dass Lieferbestellungen im System stehen, deren Barzahlung an der Tür nicht im System erfasst wird (nur auf Papier)?

**Ergänzung 2026-09-22 (K1, Runde 46 — Internetausfall):** An Tagen mit Internetausfall nimmt das Personal Bestellungen **auf Papier** an und kassiert das Bargeld auf Papier; diese Umsätze werden **nicht** in fluvo nachgetragen ([ENTSCHIEDEN Sirat 2026-09-22, Variante B], FA-14). Damit entstehen an Ausfalltagen **Barumsätze auf Papier neben fluvo**, die weder in fluvo noch (mangels Netz) in der Cloud-TSE erfasst sind. Für die Steuerberaterin: Wie sind solche Bar-Aufzeichnungen auf Papier fiskalisch zu behandeln, und was muss über den Ausfallzeitraum dokumentiert werden?

**Prüfpunkt 2026-09-22 (K1, Runde 49 — ADR 0012, Wechselgeld außerhalb des Systems):** fluvo führt **keinen Wechselgeld-Anfangsbestand** der Kasse/Börse — kein Wechselgeld-Start, keine Einstellung je Restaurant, kein Anteil im Abschluss; der Abschluss je Mitarbeiter zeigt nur die bar kassierten Beträge. Für die Steuerberaterin: **Braucht das Kassenbuch einen Anfangsbestand** (Wechselgeld)? Reicht es, dass fluvo den Anfangsbestand nicht führt, oder muss er außerhalb von fluvo dokumentiert werden? Nur Prüfpunkt, nicht hier entscheiden (ADR 0012).

**Ergänzung 2026-09-23 (K5-Gegenlesen):** Aus dem Datenmodell kommen drei fertig formulierte Steuerberaterin-Fragen hinzu — **S1** (Brutto-Führung des eingefrorenen Positionspreises + `tax_cents` je Position, DSFinV-K-Pflichtangaben nach Löschung der Personendaten), **S2** (darf eine als Test markierte Bestellung `orders.is_test` an die TSE?), **S3** (sind die Freitextfelder des Tresen-Abschlusses `comment`/`discrepancy_reason` fiskalisch aufbewahrungspflichtig und personenbezugsfrei zu halten?). Wortlaut siehe `docs/konzept/vertraege/datenwoerterbuch.md`, Abschnitt „Fragen zur Weiterleitung".

**Wer:** Steuerberaterin, **vor Pilotstart**. Sirat leitet weiter.

### Q3 · Storno und Teilstorno nach Signatur bzw. nach Lieferung
**Warum wichtig:** Der Storno-Pfad ist im Briefing erwähnt, aber nicht modelliert. Unklar: bis zu welchem Status ist Storno möglich, wie läuft er fiskalisch, wer darf ihn auslösen, was passiert mit bereits bezahlten Online-Bestellungen (Erstattung)?
**Ergänzung 2026-09-21 (ADR 0007):** Der **Rechte-Teil ist entschieden.** Vor erfasster Zahlung storniert die **Annahme** frei (abgesichert durch Log/Tagesübersicht, kein Vier-Augen-Prinzip vorab); nach erfasster Zahlung storniert **nur der Inhaber**. Ein **Storno-Grund** ist Pflicht (kurze Auswahl), die Küche bekommt einen deutlich gekennzeichneten **Storno-Bon**. Fahrer dürfen nicht stornieren. **Offen bleibt die fiskalische Seite** (bis zu welchem Zustand, TSE-Behandlung, Erstattung bezahlter Online-Bestellungen) → Steuerberaterin; bis zu welchem Zustand fachlich → K3.
**Ergänzung 2026-09-22 (ADR 0009):** Der Satz „die Küche bekommt einen deutlich gekennzeichneten **Storno-Bon**" ist **überholt.** Bei einem Storno wird **kein Bon** gedruckt; stattdessen erscheint an der **Annahme** ein Hinweis/eine Anzeige, die Küche wird wie heute per Zuruf informiert. Der **Storno-Grund** ist bei **jedem** Storno Pflicht — unabhängig vom Zustand und davon, wer storniert (nicht nur „kurze Auswahl beim Storno"). Risiko: Küche kocht ohne gedruckten Beleg weiter → nicht übersehbarer Hinweis an der Annahme + festgelegter Ausnahmeablauf (FA-06/FA-11).
**Wer:** Sirat (Ablauf, für den Rechte-Teil erledigt) + Steuerberaterin (fiskalisch).

### Q4 · Eskalation, wenn niemand abnimmt
**Warum wichtig:** Die KI geht ran, *weil* niemand abnimmt. Eine Weiterleitung an das Restaurant läuft dann oft ins Leere — die ≈ 15 % Eskalationen wären verloren.
**Mögliche Wege:** Rückruf-Ticket in der Annahme-Oberfläche, SMS/Push an den Inhaber, zweite Nummer. Im MVP vermutlich Rückruf-Ticket.
**Ergänzung 2026-09-18 (K1, Runde 6):** Sirat hat bestätigt, dass Änderungs- und Stornowünsche nach dem Auflegen die KI nie selbst entscheidet, sondern immer an einen Menschen vor Ort weitergibt. Damit wird diese Frage dringender: Nimmt dort niemand ab, hängt der Kunde ohne Weg. FA-03 enthält beide Varianten (Rückruf-Ticket / direkte Weiterleitung) als Vorschlag.
**Ergänzung 2026-09-21 (K1, Runde 15, B6):** Ein **sechster Eskalationsgrund „Frage zu einer laufenden Bestellung"** („Wo bleibt mein Essen?") ist **entschieden** — die KI gibt solche Anrufe an einen Mitarbeiter weiter (ADR 0007, Gespräch). **Offen bleibt der Weg** (Rückruf-Ticket / direkte Weiterleitung, siehe oben) und **ob die Allergen-Auskunft am Telefon eskaliert** (darf die KI aus der Karte antworten oder gibt sie ab?) — von Sirat nicht getrennt beantwortet, nachfragen.
**Wer:** Sirat, mit dem Piloten besprechen.

### Q5 · Sehr große Speisekarten im Voice-Prompt
**Warum wichtig:** Karten mit 150+ Artikeln und vielen Optionen können Prompt-Größe, Kosten und Latenz sprengen.
**Mögliche Wege:** nur Kategorien und Artikelnamen in den Prompt, Details per `check_menu_item`; oder Suche komplett per Function Call.
**Klären durch:** Messung mit der echten Karte des Piloten.

### Q6 · Geocoder für `validate_address`
**Warum wichtig:** Fehlt im Stack. Er liegt im Latenz-kritischen Pfad des Gesprächs und verarbeitet Adressen (Unterauftragsverarbeiter, EU-Standort, Kosten).
**Kandidaten prüfen:** EU-gehostete Dienste auf OpenStreetMap-Basis, selbst betriebenes Nominatim/Photon, kommerzielle Anbieter. Zeitlimit und Cache sind in jedem Fall nötig.
**Ergänzung 2026-09-22 (K1, Runde 28, B18):** Der Inhaber beschreibt **Zonen als Ortsteile** (Namen), nicht als gezeichnete Fläche. Der Geocoder muss also **Adresse → Ortsteil** zuordnen, damit deterministischer Code die Zone (Gebühr, Mindestbestellwert, Lieferzeit) bestimmen kann. Die **KI rät nie** eine Zone; bei Unsicherheit oder Adresse außerhalb aller Zonen entscheidet die Annahme (→ Q22).
**Wer:** Sirat entscheidet nach Vorschlag des `architect`.

### Q7 · Online-Zahlung: Mollie oder Stripe
**Warum wichtig:** Stripe ist für die SaaS-Abrechnung ohnehin gesetzt — Stripe (Connect) auch für Kundenzahlungen wäre ein Anbieter weniger. Mollie hat EU-Sitz und ist im DACH-Raum verbreitet. Auszahlung direkt an das Restaurant muss in beiden Fällen geklärt werden.
**Beide Wege offen halten:** `PaymentProvider`-Adapter.
**Wer:** Sirat.

### Q8 · Lokaler Bon-Druck ohne Internet
**Warum wichtig:** Eine per HTTPS geladene PWA darf einen Drucker unter lokaler HTTP-Adresse nicht ohne Weiteres ansprechen (Mixed Content / Private Network Access).
**Klären durch:** Test mit echtem Star-Drucker (Roadmap R2). Wege: TLS auf dem Drucker, Bluetooth/USB, oder kleines lokales Hilfsprogramm (widerspräche „keine Software im Laden").
**Ergänzung 2026-09-22 (ADR 0010):** Der Bon einer KI-Bestellung druckt jetzt **erst nach Quittierung** am Annahme-Gerät (nach 2 Minuten ohne Quittierung Notdruck mit Hinweis; von Hand angelegte Bestellungen drucken sofort). **Offen:** das Verhalten der Quittierung und der 2-Minuten-Frist bei **Internet-/Geräteausfall** — signalisiert und quittiert das lokale Gerät auch offline, läuft die Frist lokal? Gehört zu FA-14 (Offline-Verhalten).
**Ergänzung 2026-09-22 (Runde 45):** **Ende B geklärt** — druckt der Bon offline nicht, bleibt die Bestellung am Tablet sichtbar, der Bon wird **nach Netz-Rückkehr nachgedruckt**, und die Küche bekommt solange einen **handgeschriebenen Zettel** ([ENTSCHIEDEN Sirat 2026-09-22], FA-14 Ausnahme 2a). Offen bleibt nur, ob **Ende A** (lokaler Druck) technisch geht → AP-002. Die Quittierungsfrage ist durch die automatische KI-Pause (FA-14, 1a) weitgehend gegenstandslos; Restfall bleibt als Hinweis an K3/K8.

### Q9 · Kostenampel: Was steckt in den gemessenen 0,13 €/Min?
**Warum wichtig:** Test vom 2026-09-18 ergab 0,13 €/Min bei einer Grenze von 0,15 €. Unklar, ob Telefonie-Minuten, Eskalationsanrufe und LLM-Kosten der Function Calls enthalten sind.
**Wer:** Sirat.

### Q10 · Löschfristen
**Warum wichtig:** Das Löschkonzept braucht konkrete Fristen für Kundenstamm, Lieferadresse an der Bestellung und `voice_calls`.
**Ergänzung 2026-09-21 (K1, ADR 0007):** Sirat hat entschieden, dass je Restaurant ein Kundeneintrag (Rufnummer, Name, Adresse) gespeichert wird — vorbehaltlich Anwalt: (1) **Einwilligungsfrage** der KI bei der Erstbestellung („Soll ich mir Ihre Adresse merken?"), auch bei Handannahme; Nachweis als Protokolleintrag ohne Audio. (2) Löschfrist vorerst **12 Monate** nach der letzten Bestellung. (3) Bei der Wiedererkennung nennt die KI die **volle Adresse** zur Bestätigung — der Hausjurist (Recherche, keine Rechtsberatung) hält das für zu offen und empfiehlt Namensabgleich + Straße ohne Hausnummer. Vom Anwalt zu bestätigen: Rechtsgrundlage und Wortlaut der Frage, Frist, Zulässigkeit des Vorlesens, AVV-Formulierung (fluvo bleibt Auftragsverarbeiter), DSFA-/DSB-Pflicht des Restaurants, Identifizierung bei Auskunft/Löschung per Rufnummer. Der ausformulierte Fragenkatalog liegt im Business Brain (dort Q8.1–Q8.9, Q14–Q16).
**Beide Wege offen halten:** Umfang der vorgelesenen Adresse, Modus (Frage / Hinweis) und Löschfrist als Einstellung je Restaurant bauen, nicht fest verdrahten.
**Datenklassen entschieden (Sirat, 2026-09-23, Runde 52 — ADR 0016 (drei Datenklassen)):** Die dritte Klasse (c) „betrieblich" ist beschlossen: (a) DSGVO-löschbar · (b) GoBD 10 Jahre · (c) betriebliche Stammdaten ohne Personenbezug/Buchungscharakter (Speisekarte, Zonen, Öffnungszeiten, Geräte). Beschäftigtendaten sind nicht (c) und nicht der Kundenlöschung unterworfen (eigene Frist → A5); Löschjobs tabellen-scharf. Abweichung von Briefing §5.2 — Briefing-Änderung nur auf Ansage. Skill `fluvo-compliance` nachgezogen. **Offen bleiben nur die konkreten Fristen/Rechtsfragen an den Anwalt A1–A6** (Wortlaut siehe `docs/konzept/vertraege/datenwoerterbuch.md`, Abschnitt „Fragen zur Weiterleitung").
**Wer:** Anwalt (Fristen A1–A6).

### Q11 · Login-Details für Küche und Fahrer
**Warum wichtig:** PIN bzw. QR-Token sind gesetzt; offen sind Gerätebindung, Sperre nach Fehlversuchen, Gültigkeit des QR-Tokens (Vorschlag: bis „Geliefert", an Schicht gebunden, statt echtem Einmal-Token — sonst scheitert der zweite Scan nach App-Neustart).
**2026-09-22 (Runde 43):** Inhaber-Zugang auch vom Handy → Gerätebindung des Inhaber-Handys, Absicherung durch `security-reviewer` zu klären.
**Wer:** Sirat nach Vorschlag.

### Q12 · Original des Briefings
Das Briefing liegt als Arbeitskopie in `docs/briefing.md`; das Original im Business-Brain-Vault (`outputs/fluvo/technik/fluvo Umsetzungs-Briefing.md`). Welche Datei ist künftig führend, und wie werden Änderungen zurückgespielt?
**Wer:** Sirat.

---

Die Fragen Q13–Q18 stammen aus der Konzeptarbeit K1 (AP-003) vom 2026-09-18; Quelle ist die Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`.

### Q13 · Statuskette und Bestellarten ✅ beantwortet (Sirat, 2026-09-23, ADR 0015 — für den Bestell-Durchstich)
**Warum wichtig:** Die feste Statuskette `… Fertig → Unterwegs → Geliefert → Abgerechnet` [FEST 2] ist auf Lieferung zugeschnitten. K1 hat vier Bestellarten bestätigt (Lieferung, Abholung nach Anruf, Mitnehmen ohne Anruf, Hier essen) und im Piloten keine Küchen-Status. Damit passt die Kette nicht mehr überall und muss überarbeitet werden. **Berührt [FEST 2]** → in K3 durch `architect` vorbereiten, Sirat entscheidet. Nichts davon ist entschieden.
Zu klären als **eine** Frage mit Unterpunkten:
- (a) Ein Weg **ohne** „Unterwegs" für Abholung, Mitnehmen und Hier essen.
- (b) „In Küche" und „Fertig" werden im Piloten **nicht von Hand** gesetzt (keine Küchen-Status, Runde 9) — wie geht die Kette damit um: überspringen, automatisch setzen?
- (c) Fahrer-Scan wieder lösen können (Runde 6) vs. der Grundsatz „nur Vorwärts-Übergänge" — Lösen als neues Ereignis, kein Rücksprung.
- (d) Benannte Enden „nicht zustellbar" und „nie abgeholt" (Runden 6, 10).
- (e) Storno-Pfad (ergänzt Q3) — Storno bestätigt nur der Inhaber (Runde 11).
- (f) Lebenszyklus des Restaurants selbst: in Einrichtung → startklar ↔ gesperrt (Runden 1, 10).
- (g) Zustand/Merkmal **„quittiert"** (ADR 0010): eine KI-Bestellung ist bis zur Quittierung „neu/unquittiert", der Bon-Druck wird erst durch die Quittierung ausgelöst (2-Minuten-Notdruck sonst) — K3 hält fest, ob eigener Zustand oder Merkmal.
**Ergänzung 2026-09-21 (ADR 0008):** Für den **ersten Piloten** ist die Liefer-Bestellung jetzt schärfer umrissen und muss in die Kette eingepasst werden: (a) **kein „Unterwegs"** — der Fahrer-Teil kommt später, es gibt keinen Fahrer-Scan; (b) das **Ende setzt die Annahme durch „geliefert"** (Runde 26, entschieden), sobald sie weiß, dass geliefert wurde — nicht automatisch beim Bon-Druck; dabei wird **keine Zahlart und kein Bar-Eingang** erfasst; (c) offen ist das **Verhältnis zu „Abgerechnet"** (gibt es das für eine Lieferung ohne erfasste Zahlung noch?) und (d) der Fall, dass **niemand „geliefert" drückt** (die Bestellung bliebe offen). Das **Wieder-Lösen des Fahrer-Scans** aus (c) der ursprünglichen Liste ist mit FA-08 **zurückgestellt** (ADR 0008), bleibt aber für die spätere Fahrer-App vorgemerkt. **Storno-Pfad** (ergänzt Q3): vor Zahlung die Annahme, nach Zahlung der Inhaber, immer mit Grund (ADR 0007).
**Ergänzung 2026-09-23 (ADR 0014, Durchstich-Spur):** Ein **K3-Entwurf liegt vor** (`docs/konzept/modelle/zustand-bestellung.md`, requirements-engineer, Übergangstabelle als eine Seite). `architect` liest ihn gegen [FEST 2] gegen; der Durchgang mit Sirat steht aus. Die offenen Unterpunkte (a)–(g) sind darin als Vorschlag beantwortet, aber **nicht entschieden** — die Abnahme des K3-Durchstich-Ausschnitts erfolgt erst nach Kreuzverhör und Sirats Ja.
**Antwort (Sirat, 2026-09-23, Runde 52 — ADR 0015 (Zustandskette im Piloten)):** Reduzierte Kette für den Piloten bestätigt: `received` → `delivered` | `handed_over` | `cancelled` (Storno-Pfad), `ended_unpaid` bleibt [VORSCHLAG] bis Q3. Quittierung, Vorbestellung, Test und Zahlung sind **Merkmale**, keine Zustände (klärt (a) ohne „Unterwegs", (b) „In Küche"/„Fertig" nicht von Hand → bleibt `received`, (g) „quittiert" als Merkmal, (e) Storno-Recht am Merkmal „bezahlt", (d) „nie abgeholt" → `ended_unpaid`). Küchen-/Fahrer-Zustände (`in_kitchen`, `ready`, `out_for_delivery`, `settled`) werden später **zwischen** `received` und `delivered` eingeschoben; Status als erweiterbare Literal-Union, kein DB-Enum. Abweichung von Briefing §5.3 — Briefing-Änderung nur auf Sirats Ansage. Skill `fluvo-core-domain` nachgezogen. **Rest-Unterpunkte nicht mitgeschlossen** → Q27–Q30. Die fiskalischen Storno-Grenzen bleiben Q3 (Steuerberaterin).
**Wer:** Sirat entscheidet nach Vorbereitung durch `architect` (K3). Erledigt für den Bestell-Durchstich.

### Q14 · Zahlart Gutschein (Papier-Gutschein des Restaurants)
**Warum wichtig:** Das Briefing kennt als Zahlarten Bar/Karte/Storno; der Papier-Gutschein des Restaurants fehlt dort. In K1 bestätigt: Gutschein ist eine kleine Zahlart beim Kassieren, und eine Bestellung kann **zwei** Zahlarten haben (Gutscheinbetrag + Rest bar, Runde 8). In den Kassensturz des Fahrers geht nur der bar kassierte Teil ein; den Gutschein gibt der Fahrer ab. Offen: fiskalische Behandlung des Gutscheins und ob eine Nummer/Entwertung nötig ist oder „Gutschein über X €" reicht.
**Ergänzung 2026-09-21 (ADR 0008):** Für **Lieferungen im ersten Piloten gegenstandslos** — dort erfasst fluvo weder Bar-Eingang noch Zahlart (Tür-Bargeld läuft wie heute auf Papier, Fahrer-Teil kommt später). Für den **Tresen** (Abholung, Mitnehmen, Hier essen) bleibt der Gutschein als Zahlart relevant, dort wird im System kassiert.
**Beide Wege offen halten:** Zahlung an einer Bestellung als Liste von Teilzahlungen je Zahlart, nicht als eine feste Zahlart.
**Wer:** fiskalische Behandlung → Steuerberaterin. (Der **kundengebundene** Gutschein im System ist eine eigene, spätere Funktion — von Sirat auf später verschoben, Runde 10, nicht im Piloten-Schnitt.)

### Q15 · KI außerhalb der Öffnungszeit vs. Rufumleitung
**Warum wichtig:** Sirat will, dass das Telefon außerhalb der Öffnungszeit **durchklingelt wie heute** — die KI geht dann nicht ran (Runde 14). Die Rufumleitung bei Nichtmelden greift aber unabhängig von der Uhrzeit; technisch muss verhindert werden, dass die KI außerhalb der Öffnungszeit trotzdem übernimmt. Ergänzt Q1.
**Beide Wege offen halten:** Die KI ist nur aktiv, wenn (a) eingeschaltet **und** (b) innerhalb der Öffnungszeit — die Prüfung liegt im deterministischen Code, nicht bei der KI.
**Technische Grenze (Jarvis, 2026-09-21, ungeprüft bis AP-001):** Die Umleitung liegt beim Netzbetreiber des Restaurants, fluvo kann sie nicht per Software schalten. Ist die Umleitung aktiv und die KI laut fluvo „aus", kann fluvo den Anruf **nicht** so zurückgeben, dass es im Restaurant „klingelt wie heute": Zurückstellen an dieselbe Nummer läuft wieder in die Umleitung (Schleife). Wege: (A) Inhaber schaltet die Umleitung selbst ab (`#61#`/`#21#` oder Kundenportal) — fehleranfällig; (B) Zurückstellen an eine **zweite Nummer ohne Umleitung** — kostet abgehende Minuten; (C) KI nimmt außerhalb der Öffnungszeit ab und sagt nur die Öffnungszeiten an — **weicht von Sirats Entscheidung Runde 14 ab, braucht sein Ja**; (D) Portierung der Nummer — volle Steuerung, hohe Hürde. Testfälle D2–D4 im `testprotokoll-AP-001-rufumleitung.md`.
**Wunsch Sirat (2026-09-21):** Der Mitarbeiter am Telefon schaltet in der Annahme selbst zwischen drei Modi: „KI nimmt alles" · „erst klingeln, dann KI" · „KI aus". **Lösungsvorschlag Jarvis (nicht entschieden, berührt [STACK] → ADR + `architect`):** Umleitung umdrehen — dauerhafte **Sofort-Umleitung** der Hauptnummer auf die fluvo-Zielnummer; fluvo entscheidet je Anruf per deterministischem Code (`call_mode: ai_first | overflow | off` + Öffnungszeit) und klingelt das Restaurant über eine **zweite Rufnummer ohne Umleitung** (oder Router per SIP beim Telefonie-Anbieter angemeldet) an. Erfüllt zugleich „außerhalb der Öffnungszeit klingelt es durch wie heute". Haken: (1) jede Minute läuft über den Telefonie-Anbieter, auch Mensch-Gespräche — Mehrkosten grob 40–75 $/Restaurant/Monat beim Piloten-Volumen, gehört ins Preismodell; (2) fluvo wird Nadelöhr → Fallback beim Telefonie-Anbieter direkt auf die zweite Nummer, Notfall-Code `#21#`, Alarm in der Betreiber-Zentrale, Eintrag in K9; (3) Anzeige der Anrufernummer am Restaurant-Telefon ungeprüft. Eigener Adapter `TelephonyProvider` (Regel 10), neuer Unterauftragsverarbeiter. Vorbedingungen aus AP-001: zweite Rufnummer vorhanden? D3 (Sofort-Umleitung) und D4 (Durchwahl zweite Nummer) bestanden? Betrifft FA-13, FA-20, K4, K8, K9.
**Überlegung Sirat (2026-09-21, noch keine Entscheidung):** statt drei Modi ein Regler „KI übernimmt nach X Sekunden" (sofort / 10 / 15 / 20 / 30 s), und die KI evtl. **nie ganz abschalten** (immer Sicherheitsnetz; außerhalb der Öffnungszeit nur Ansage der Öffnungszeiten). **Würde ADR 0006 ändern** („KI jederzeit an/aus", „klingelt durch wie heute") — nur auf Sirats ausdrückliche Ansage nachziehen. Folge: Ist die KI nie aus und wird die Wartezeit selten geändert, genügt **Variante X** (Netzbetreiber steuert: `*61*Ziel*Sek#` + `*67*`, „KI nimmt alles" per `*21*`, Codes in der App anzeigen) — Mensch-Minuten kostenlos, kein Nadelöhr, keine zweite Nummer, billiger Trunk reicht. **Variante Y** (fluvo steuert, Regler in der App) nur, wenn im Piloten häufig umgeschaltet wird. Empfehlung Jarvis: Pilot mit X starten, Umschalt-Häufigkeit messen (→ K11 Pilot-Kriterien). Technischer Hinweis zu Y: Timeout zählt ab Wählbeginn, 2–4 s Aufbau → sinnvolles Minimum ca. 8–10 s, in AP-001 messen. Notausschalter für den Inhaber bleibt in beiden Varianten nötig.
**Ergänzung 2026-09-21 (K1, Runde 22 — Pilot-Öffnungszeiten):** Der Pilot-Typ hat werktags eine **Mittagspause** — also **mehrere Zeitfenster je Tag** (grob vormittags bis früher Nachmittag und später Nachmittag bis spät abends), am Wochenende ein durchgehendes Fenster mit späterem Beginn (öffentliche Quellen, von Sirat vor Ort zu bestätigen, Termin 2026-09-25). Folge: **In der Mittagspause gilt „außerhalb der Öffnungszeit"** — das Telefon klingelt durch wie heute (Runde 14), die KI übernimmt nicht. FA-18 braucht dafür mehrere Zeitfenster je Tag. **Abgrenzung zum Annahmestopp (FA-23):** Beim Annahmestopp ist geöffnet, aber es wird nichts mehr angenommen — dort **geht die KI ran und sagt ab** (bietet ggf. eine Vorbestellung an, Runde 23); in der Pause geht sie gar nicht ran. Beides deterministisch trennen.
**Ergänzung 2026-09-22 (ADR 0009 / K1, Runde 29):** Es gibt **keinen eigenen Bestellschluss** mehr (kein Feld, keine Einstellung) — solange geöffnet ist, wird angenommen; früh schließen läuft über den Annahmestopp (FA-23). **Offen bleibt:** ob die KI **außerhalb der Öffnungszeit** doch rangeht und dabei **Vorbestellungen** annimmt (zur nächsten Öffnung), oder ob das Telefon dann wie heute nur durchklingelt. Hängt an derselben deterministischen Trennung (KI aktiv nur bei eingeschaltet **und** innerhalb der Öffnungszeit) und an AP-001.
**Wer:** mit AP-001 (Risikotest Rufumleitung) und K4 klären; Sirat + Netzbetreiber des Piloten.

### Q16 · Betreiber-Zentrale und Mandantentrennung
**Warum wichtig:** Der Betreiber (fluvo) sieht in der Zentrale je Restaurant nur Gesundheitswerte (KI erreichbar, Drucker online, Fehler, verbrauchte Minuten, Anzahl Bestellungen) — **keine** einzelnen Bestellungen und keine Kundendaten fremder Tenants (Runde 1). Zusätzlich gewünscht: **aktive Benachrichtigung** bei Störung, nicht nur eine Ansicht (Runde 10, Weg offen). Zu klären: Wie werden Überwachung und Benachrichtigung gebaut, ohne die doppelte Mandantentrennung (Regel 6) zu umgehen.
**Beide Wege offen halten:** Gesundheitswerte als getrennte, personenfreie Kennzahlen je Tenant; Benachrichtigungsweg (SMS/Push/E-Mail) noch offen, welche Störungen dringend sind ebenfalls.
**Wer:** in K9 (Rollen und Rechte) mit `tenant-isolation-guard` ausarbeiten; Sirat entscheidet den Benachrichtigungsweg.

### Q17 · Haftung bei selbst gepflegten Allergenen und Steuersatz
**Warum wichtig:** Nur der Inhaber darf Preise, Allergene und Steuersatz ändern (Runde 13), mit deutlicher Warnung und Protokoll (Runde 3). Offen ist die Haftung, wenn der Inhaber selbst falsche Allergen- oder Steuerangaben pflegt.
**Wer:** Anwalt.

### Q18 · Abschluss je Mitarbeiter am Tresen und mehrere Börsen
**Warum wichtig:** Am Tresen kassiert die zuständige Person (Annahme/Tresen); abends können **zwei Leute gleichzeitig** kassieren (Runde 12). Der Abschluss erfolgt **je Mitarbeiter**, jeder mit **eigener Börse** und eigenem Wechselgeld; zurückzugeben = Wechselgeld-Start + Summe der von dieser Person bar kassierten Beträge, der Inhaber bestätigt (Runden 8, 10, 12). Voraussetzung: Jedes Kassieren ist der kassierenden Person zugeordnet (Personenwechsel per PIN am geteilten Gerät → K10, Q11). Neben Lieferung fällt auch das Tagesgeschäft Abholung/Mitnehmen/Hier essen an. Ergänzt Q2. **Hinweis:** Mit fluvo wird jede Bestellung erstmals elektronisch erfasst — die fiskalische Behandlung muss **vor** Pilotstart geklärt sein. (Neutral: keine Aussage über die heutige Kassenführung.)
**Ergänzung 2026-09-21 (ADR 0007):** Der **Ablauf ist entschieden:** Abschluss **in zwei Schritten** — das System zeigt den zurückzugebenden Soll-Betrag (Server rechnet, wird nie überschrieben); der Mitarbeiter bestätigt ihn **oder** meldet einen abweichenden Betrag, und bei Abweichung ist ein **Kommentar Pflicht**; danach bestätigt der Inhaber in seinem Bereich (Code am Hauptgerät, keine Vertretung). Kassiert oder fährt der Inhaber selbst, **bestätigt er sich selbst** (als Selbstbestätigung protokolliert). **Offen bleibt die fiskalische Seite** → Steuerberaterin.
**Wer:** fiskalische Behandlung → Steuerberaterin.

---

Die Fragen Q19–Q21 stammen aus der Konzeptarbeit K1 (AP-003) vom 2026-09-21; Quellen sind die Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md` (Runden 15–26 und der Rat), das Gegenlesen `docs/konzept/anwendungsfaelle/_gegenlesen-K1.md` und ADR 0007 / 0008.

### Q19 · [FEST 17] und die Fahrer-App im App-Store
**Warum wichtig:** [FEST 17] sagt „PWA auf dem Privathandy, kein App-Store". Sirat will die spätere, eigene Fahrer-App (ADR 0008 — Fahrer-Teil nach dem ersten Piloten) im **App-Store** anbieten (Runde 26, Absicht, keine Entscheidung im Sinne des Briefings). Das kann nicht stillschweigend übernommen werden: Store-Hülle für eine Codebasis oder native App, Entwicklerkonten, Freigabeprozess, Update-Wege, Offline-Verhalten hängen daran.
**Beide Wege offen halten:** Kern-Befehle kanalneutral halten; die Fahrer-Oberfläche als **eigene App getrennt von der Annahme** bauen, damit sie später als PWA **oder** als Store-App ausgeliefert werden kann, ohne Umbau des Kerns.
**Wer:** `architect` bereitet die Folgen vor, Sirat entscheidet ausdrücklich (dann Briefing anpassen, eigener ADR). Fällig, **wenn die Arbeit an der Fahrer-App beginnt** — nicht vor dem ersten Piloten.

### Q20 · Stations-Exemplar des Liefer-Bons (Papier mit Name, Adresse, Rufnummer)
**Warum wichtig:** Im ersten Piloten druckt fluvo bei Lieferung zwei Bons (ADR 0008); ein Exemplar bleibt an der Annahmestation und trägt **Name, Adresse und Rufnummer**. Dieses Papier liegt **außerhalb der Löschfunktion** von fluvo — Aufbewahrungsdauer und Vernichtung müssen ins Löschkonzept und in die Einweisung des Restaurants, sonst sammeln sich Personendaten unkontrolliert.
**Ergänzung 2026-09-22 (K1, Runde 35):** Sirat: Die Stations-Zettel werden heute **abends gesammelt, nicht weggeworfen** — es entsteht also ein wachsender Papierstapel mit Name, Adresse, Rufnummer außerhalb der fluvo-Löschung. Damit wird eine **Aufbewahrungs- und Vernichtungsregel** zwingend (Frist, Wegschließen, Vernichtungsweg), sonst sammeln sich Personendaten unkontrolliert. Gemeinsam mit Q10 durch den Anwalt.
**Beide Wege offen halten:** Aufbewahrungsfrist und Vernichtungsweg als Vorgabe an das Restaurant formulieren, nicht in fluvo verdrahtet.
**Wer:** Anwalt (gemeinsam mit Q10), Umsetzung in der Einweisung des Restaurants (FA-20).

### Q21 · Offene Punkte aus dem Gegenlesen K1, die Sirat noch nicht beantwortet hat
**Warum wichtig:** Beim Gegenlesen der 20 Entwürfe blieben Fragen offen, die einzelne Fälle betreffen, aber noch keine Entscheidung haben. Gesammelt, damit keine beim Durchgehen verloren geht:
- **B18** — Wie beschreibt der Inhaber eine **Zone** (Liste von PLZ/Ortsteilnamen oder gezeichnete Fläche auf der Karte)? Am Handy ist Zeichnen mühsam. Technik danach: Q6.
- **B19** — **entfällt weitgehend durch ADR 0008:** Es gibt im ersten Piloten keinen Fahrer-Kassensturz und kein „Unterwegs", die ursprüngliche Frage (offene „nicht zustellbar"-Meldung / Bestellungen noch Unterwegs beim Kassensturz) hat damit keinen Gegenstand mehr; für die spätere Fahrer-App vorgemerkt.
- **B20** — Die **Testbestellung beim Onboarding** (FA-20) landet in Bestellungen, Bon, Zählung (FA-22) und später Kasse/TSE: Wie wird sie als Test gekennzeichnet bzw. wieder entfernt?
- ✅ **Eigener früherer Bestellschluss (FA-18):** entfällt — es gibt kein Bestellschluss-Feld mehr, früh schließen läuft über den Annahmestopp (ADR 0009, Runde 29).
- ✅ **Geänderter Bon / Storno-Bon bei Lieferung (FA-06/FA-11):** beantwortet — kein Storno-Bon (ADR 0009); der geänderte Bon wird der Annahme angeboten, nicht automatisch gedruckt, und kommt bei Lieferung in zwei Exemplaren, wenn gedruckt (Runden 31, 41).
- ✅ **Hand-Annahme während „gar nichts mehr" (FA-23):** beantwortet — Warnung mit „trotzdem anlegen", keine Sperre (Q23, Runde 39).
- ✅ **Neuer Fall „Schicht beginnen" (B3):** beantwortet — eigener Fall FA-19, im Schnitt (Runde 30).
- **Tagesübersicht / Log des Inhabers:** eigener Fall oder Teil von K10 (Inhaber-Bereich)?
- **Bestellhistorie „das Übliche" (FA-02):** mehrere Adressen, neue Adresse merken, „das Übliche" für Stammkunden.
- ✅ **Papier-Nachtrag nach Internetausfall (FA-14, Runde 45):** beantwortet (Runde 46) — es gibt **keine Karenzzeit** (Umstieg auf Papier praktisch sofort), und die auf Papier angenommenen **Bestellungen und das kassierte Bargeld** werden **nicht** nachgetragen ([ENTSCHIEDEN Sirat 2026-09-22, Variante B]). Abschluss/Abrechnung des Tages wartet bzw. läuft über die Zettel; der Abschluss je Mitarbeiter (FA-16) deckt nur die im System kassierten Beträge, das Papier-Bargeld liegt außerhalb. Fiskalische Seite → Q2. Pilot-Kriterien: Ausfalltage zählen nicht gegen fluvo → K11.
- **Onboarding-Reihenfolge ohne Wechselgeld-Schritt (FA-20, Runde 49):** Lesart Jarvis — Reihenfolge Stammdaten → Module → Rufnummer/KI → Drucker → Öffnungszeiten → Liefergebiet → Speisekarte → Mitarbeiter/PINs → Geräte registrieren → Testbestellung → **Übergabe an den Inhaber per E-Mail-Link**; der Wechselgeld-Schritt entfällt (ADR 0012). **Von Sirat zu bestätigen.** (Haftung bei selbst gepflegten Allergenen/Steuersatz aus FA-12 → siehe Q17, Anwalt.)
- **Schwelle „Annahme-Gerät nicht erreichbar → automatische KI-Pause" (FA-14/FA-13, Runde 45):** Ab welcher Dauer „nicht erreichbar" pausiert der Server die KI-Annahme automatisch? Als **Zahl festzulegen → K8** (technisch, nicht von Sirat); die Pause wird protokolliert und dem Betreiber im Monitoring (FA-22) angezeigt.
**Wer:** Sirat, beim Durchgehen der Fälle.

---

Die Fragen Q22–Q24 stammen aus der Einzeldurchsicht von FA-05 (K1, Runde 38 vom 2026-09-22); Quelle ist die Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`. Alle drei am 2026-09-22 (Runde 39) beantwortet und in FA-05, FA-17, FA-23 eingearbeitet.

### Q22 · Liefergebühr und Lieferzeit bei Adresse außerhalb aller Zonen ✅ beantwortet (Sirat, 2026-09-22, Runde 39)
**Warum wichtig:** Legt die Annahme per Ausnahme eine Lieferung an eine Adresse **außerhalb aller Zonen** an (Runde 33/38), fehlen die sonst zonengebundenen Werte Liefergebühr und Lieferzeit. Ohne Regel bleibt unklar, was auf Bon und Bestellung steht.
**Antwort (Sirat, 2026-09-22, Runde 39):** Die **Liefergebühr** gibt die Annahme **von Hand** ein; die **Lieferzeit** wird **nie frei getippt**, sondern **aus dem 15-Minuten-Raster** (15 · 30 · 45 · 1 Std …) gewählt, die Abholzeit aus dem 10-Minuten-Raster — das Raster gilt bei jeder Handannahme (in einer Zone ist der Zonenwert vorausgewählt). → FA-05, FA-17, K5, K10.
**Wer:** Sirat.

### Q23 · Manuelle Annahme bei Annahmestopp „gar nichts mehr" ✅ beantwortet (Sirat, 2026-09-22, Runde 39)
**Warum wichtig:** Ist der Annahmestopp auf „gar nichts mehr" gesetzt (FA-23) und die Annahme will trotzdem von Hand eine Bestellung anlegen (Runde 38): harte **Sperre** oder nur eine **Warnung** mit „trotzdem anlegen"?
**Antwort (Sirat, 2026-09-22, Runde 39):** **Warnung** mit „trotzdem anlegen" — **keine harte Sperre**; das Übersteuern wird protokolliert (Person, Zeit, Bestellung; Protokollteil Lesart Jarvis). → FA-05 (Ausnahme 1d), FA-23.
**Wer:** Sirat.

### Q24 · Pflichtangabe „Adresse merken?" bei manueller Annahme ✅ beantwortet (Sirat, 2026-09-22, Runde 39)
**Warum wichtig:** Bei der Handannahme muss die Einwilligung „Kunde nach dem Merken der Adresse gefragt?" festgehalten werden (Q10, ADR 0007). Offen (Runde 38): **streng** (ohne Antwort kein Anlegen) oder **Standard „Nein"**, nur bei „Ja" antippen?
**Antwort (Sirat, 2026-09-22, Runde 39):** Es bleibt bei **Weg B**: Der Mitarbeiter **fragt den Kunden immer** und merkt die Adresse **nur bei „Ja"** (kein pauschales Merken). FA-05 bleibt wie entworfen, ADR 0007 unverändert; ob die Pflichtangabe streng ist, wurde nicht eigens entschieden (Lesart Jarvis: streng wie im Entwurf). Rechtsgrundlage weiter über den Anwalt (Q10).
**Wer:** Sirat.

---

Die Fragen Q25–Q26 stammen aus dem Kreuzverhör von FA-01 (K1, Runde 51 vom 2026-09-23); Quelle ist die Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`.

### Q25 · Pilot-Fakten für den Vor-Ort-Termin 2026-09-25 (keine Entscheidungen)
**Warum wichtig:** Aus dem Kreuzverhör FA-01 sind zwei Angaben offen, die **nur der Pilot** kennt und die als **Fakten** vor dem Pilotstart zu erfassen sind — sie ändern keine Entscheidung, aber sie füllen Stammdaten und Testanrufe:
- **(a) Nimmt der Fahrer des Piloten Karte an?** Die Zahlungsmöglichkeit bei Lieferung ist ein Stammdatum je Restaurant (nur Bar / Bar und Karte beim Fahrer; Online später), das die KI in der Zusammenfassung ansagt (Runde 51, entschieden). Eine Zahlart je Bestellung erfasst der erste Pilot nicht (ADR 0008), das Feld ist im Datenmodell vorgesehen (K5).
- **(b) Welche Sprachen rufen tatsächlich an?** Die KI spricht im Piloten Deutsch und Englisch (Runde 51, entschieden); weitere Sprachen sind je Restaurant später freischaltbar. Welche Sprachen beim Piloten real vorkommen, bestimmt die Testanrufe (K4) und ob eine dritte Sprache früh nötig wird.
**Beide Wege offen halten:** Zahlungsmöglichkeit und Sprachen als Stammdaten je Restaurant bauen, nicht fest verdrahten.
**Wer:** Sirat, beim Termin beim Piloten am **2026-09-25** erfassen.

### Q26 · Optionen-/Varianten-Modell: Extra-Aufpreis je Größe/Variante ✅ beantwortet (Sirat, 2026-09-23, Runde 54, ADR 0015 K5-Ausschnitt)
**Warum wichtig:** Extra-Zutaten sind bepreiste Optionen, deren **Aufpreis von der Größe/Variante** des Artikels abhängt (Sirat, Runde 51, entschieden — Beispiel: kleine Pizza, Extra Zwiebel = 50 Cent). Der Server rechnet den Aufpreis, die KI nennt ihn. Offen war das **Datenmodell dahinter**: Wird der Aufpreis je (Option × Variante) als Matrix gepflegt, je Option mit Variantenfaktor, oder je Größenklasse — und wie viel Pflegeaufwand entsteht dem Inhaber. Das berührt FA-12 (Speisekarte), K5 (Datenmodell Option/Variante) und die Function-Call-Argumente in K4.
**Antwort (Sirat, 2026-09-23, Runde 54 — K5-Durchgang):** Der **Aufpreis je Extra hängt an der Kombination (Option × Variante)** und wird als eigene Tabelle `menu_option_variant_prices` geführt — nicht am Artikel allein. **Keine geplanten Preise** („gültig ab"-Preisstand): `price_valid_from` entfällt, eine Preisänderung wirkt sofort und wird über das eingefrorene `order_items` je Bestellung historisiert. **Runde 55 (Nachtrag):** Jeder Artikel hat **mindestens eine Variante** (variantenlose Artikel bekommen eine Standardvariante), damit der Preis immer an der Variante hängt; `base_price_cents` entfällt. → FA-12, `konzept/modelle/er-durchstich.md`, `konzept/vertraege/datenwoerterbuch.md`. Wie der Pilot Extras real bepreist, bleibt ein Pilot-Fakt (mit Q25 beim Termin 2026-09-25).
**Wer:** `architect`/`database-reviewer` haben das Modell in K5 vorbereitet; Sirat hat das Modell bestätigt. Kreuzverhör/Abnahme des K5-Ausschnitts stehen noch aus.

---

Die Fragen Q27–Q30 sind die vier bei der Q13-Entscheidung (Runde 52, ADR 0015) **ausdrücklich nicht mitgeschlossenen** Rest-Unterpunkte aus dem K3-Zustandsmodell (`docs/konzept/modelle/zustand-bestellung.md`, Gegenlesen `_gegenlesen-K3.md`). Sie werden getrennt weitergeführt, damit Q13 nicht fälschlich als vollständig erledigt gilt.

### Q27 · Verhältnis `delivered` ↔ „Abgerechnet" für Lieferungen ohne erfasste Zahlung ✅ beantwortet (Sirat, 2026-09-23, Runde 53, ADR 0015 Nachtrag)
**Warum wichtig:** Im Piloten erfasst fluvo bei einer Lieferung keine Zahlart und keinen Bar-Eingang (ADR 0008); das Tür-Bargeld läuft auf Papier. Offen: Ist `delivered` das **Ende** der Bestellung, oder folgt für eine Lieferung noch ein „Abgerechnet" (der spätere `settled`-Zustand), obwohl im System nie eine Zahlung steht?
**Antwort (Sirat, 2026-09-23, Runde 53 — ADR 0015 Nachtrag, Punkt 1):** `delivered` ist im Piloten das **Ende der Lieferung** — es folgt **kein „Abgerechnet"**. Der Zustand `settled` wird später **mit der Fahrer-App eingeschoben** (ADR 0015 Punkt 4). `delivered` bleibt terminal (`TERMINAL_STATES`), Status als erweiterbare Literal-Union.
**Beide Wege offen halten:** `delivered` als terminal führen (`TERMINAL_STATES`), aber `settled` als später einschiebbaren Zustand vorsehen (Status als erweiterbare Literal-Union, kein DB-Enum).
**Wer:** Sirat (erledigt für den Piloten); fiskalisch → Steuerberaterin (Q2); `settled` fällig mit dem Fahrer-Teil (nach dem ersten Piloten).

### Q28 · „Niemand drückt geliefert" — sichtbarer Abschlussweg am Tagesende ✅ beantwortet (Sirat, 2026-09-23, Runde 53, ADR 0015 Nachtrag)
**Warum wichtig:** Eine Liefer-Bestellung, bei der niemand „geliefert" auslöst, bliebe für immer in `received` — es entstehen Halden offener Bestellungen. Der Pilot braucht einen **sichtbaren Abschlussweg am Tagesende** (nicht still schließen).
**Antwort (Sirat, 2026-09-23, Runde 53 — ADR 0015 Nachtrag, Punkt 2):** Der **Tagesabschluss (FA-16)** zeigt alle Bestellungen in `received`. Inhaber oder Annahme schließen sie **einzeln und bewusst** ab; das System **ändert keinen Status automatisch** (kein stilles Schließen). Der sichtbare Abschlussweg ist damit entschieden. **Verbleibende Detailfrage** (blockieren vs. nur anzeigen) → Q31.
**Beide Wege offen halten:** Monitoring/Listen über die abgeleitete Menge `OPEN_STATES`, nicht über `status = 'received'` verdrahten; einen bewussten Endübergang am Tagesende vorsehen, ohne ihn jetzt zu automatisieren.
**Wer:** Sirat (Ablauf am Tagesende, erledigt); Detailfrage Q31; ausarbeiten in K3/K10.

### Q29 · Fahrer-Enden (Scan lösen, „nicht zustellbar", Bargeld-Kassensturz)
**Warum wichtig:** Die Fahrer-bezogenen Endübergänge und das Wieder-Lösen des Fahrer-Scans sind mit dem Fahrer-Teil **zurückgestellt** (ADR 0008) und gehören nicht in das Piloten-Zustandsmodell. Vorgemerkt für die spätere Fahrer-App (FA-08/09/10).
**Beide Wege offen halten:** Kern-Befehle kanalneutral; `orders.driver_id`/`payment_method` sind vorbereitet und bleiben im Piloten leer.
**Wer:** Sirat/`architect`, **wenn die Arbeit an der Fahrer-App beginnt** — nicht vor dem ersten Piloten.

### Q30 · Lebenszyklus des Restaurants (in Einrichtung → startklar ↔ gesperrt)
**Warum wichtig:** `tenants.status` (in Einrichtung / startklar / gesperrt) ist ein eigenes Zustandsmodell, **nicht** das der Bestellung — es gehört zu **K9 / FA-20 / FA-21**, nicht in das Bestell-Zustandsmodell K3. Im Datenwörterbuch ist `tenants.status` als Platzhalter geführt.
**Beide Wege offen halten:** Status als erweiterbare Literal-Union je Objekt; nicht mit dem Bestellstatus vermengen.
**Wer:** Sirat, ausarbeiten in K9 (Rollen/Rechte, FA-20/FA-21).

---

Q31 ist die bei der Runde-53-Entscheidung (ADR 0015 Nachtrag) ausdrücklich als offen belassene Detailfrage aus Q28.

### Q31 · Tagesabschluss mit offenen Bestellungen — blockieren oder nur anzeigen? ✅ beantwortet (Sirat, 2026-09-23, Runde 55, ADR 0015 Nachtrag)
**Warum wichtig:** Der Tagesabschluss (FA-16) zeigt alle noch offenen Bestellungen in `received`; Inhaber oder Annahme schließen sie einzeln und bewusst ab, das System ändert keinen Status automatisch (ADR 0015 Nachtrag, Runde 53, Punkt 2 — klärt Q28). **Offen war:** Sollen offene Bestellungen den Tagesabschluss **blockieren** (kein Abschluss, solange etwas in `received` steht), oder werden sie nur **angezeigt** und der Abschluss ist trotzdem möglich?
**Antwort (Sirat, 2026-09-23, Runde 55 — ADR 0015 Nachtrag):** **Blockieren.** Der Tagesabschluss ist gesperrt, solange noch eine Bestellung in `received` steht; er wird erst möglich, wenn **jede** offene Bestellung bewusst beendet wurde (`delivered` / `cancelled` / `ended_unpaid`, jeweils mit den bestehenden Rechten und Pflichtgründen). Das System ändert weiterhin **keinen** Status automatisch. → K3, FA-16 (Regel + Testszenario FA-16-T25). Die fiskalische Seite von `ended_unpaid`/Storno bleibt Q3 (Steuerberaterin).
**Beide Wege offen halten:** Die offenen Bestellungen über die abgeleitete Menge `OPEN_STATES` ermitteln (nicht über `status = 'received'` verdrahten).
**Wer:** Sirat (erledigt); ausarbeiten in K3/K10 (FA-16).
