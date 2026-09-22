# Testprotokoll zu AP-001 · Rufumleitung am Pilot-Anschluss

- **Gehört zu:** [AP-001](AP-001-rufumleitung-test.md) · Roadmap R1 · offene Fragen Q1, Q4, Q15
- **Angelegt:** 2026-09-21 · **Stand:** Anleitung fertig, Test noch nicht durchgeführt · **Testumfang:** Variante X = Pflicht (Sirat, 2026-09-21), Variante Y = Kür
- **Dauer:** Vorbereitung zu Hause + ca. 45–60 Minuten beim Piloten · **Code:** keiner
- **Hintergrund:** Web-Recherche vom 2026-09-21 (Business Brain, Seite „Rufnummernumleitung Deutschland — Recherche")

> Dateiname beginnt absichtlich nicht mit `AP-`, damit das Cockpit die Datei nicht als eigenes Arbeitspaket liest.
> Keine echten Rufnummern, keinen Namen und keinen Ort des Piloten in diese Datei eintragen — Rufnummern nur als „Handy A", „Handy B", „Festnetz", „Restaurant", „Testnummer".

## Was der Test beantwortet

| # | Frage | Abnahmekriterium AP-001 |
|---|---|---|
| 1 | Welcher Anbieter, welche Anschlussart? | Kriterium 1 |
| 2 | Welche Nummer kommt bei der Voice-Plattform an — Anrufer oder Restaurant? | Kriterium 2 |
| 3 | Wie lange klingelt es, bis die KI abhebt? Kürzeste einstellbare Zeit? | Kriterium 3 |
| 4 | Greift die Umleitung auch bei „besetzt"? | Kriterium 4 |
| 5 | Ergebnis + Empfehlung als ADR-Entwurf, Q1 beantwortet | Kriterium 5 (macht Jarvis nach dem Test) |

## Tastencodes (Spickzettel)

| Zweck | Festnetz | Mobilfunk |
|---|---|---|
| Umleitung bei Nichtmelden **ein** | `*61*<Ziel>*<Sekunden>#` (5–60 s) | `**61*<Ziel>**<Sekunden>#` (5–30 s, 5er-Schritte) |
| Umleitung bei Nichtmelden **aus** | `#61#` | `##61#` |
| Umleitung bei Besetzt **ein** / **aus** | `*67*<Ziel>#` / `#67#` | `**67*<Ziel>#` / `##67#` |
| Sofort-Umleitung **ein** / **aus** („KI nimmt alles") | `*21*<Ziel>#` / `#21#` | `**21*<Ziel>#` / `##21#` |
| Eigene Nummer für **einen** Anruf unterdrücken | — | `#31#<Nummer>` |

## Testumfang: Variante X (Pflicht) und Variante Y (Kür)

**Variante X — der Netzbetreiber steuert.** Das ist der Plan für den Piloten und der Pflichtteil dieses Tests:

| Betriebszustand | Was am Anschluss eingestellt ist | Wer stellt um |
|---|---|---|
| **Normalbetrieb** | `*61*<Ziel>*15#` (KI nach 15 s) **und** `*67*<Ziel>#` (KI bei besetzt) — beides dauerhaft | einmal beim Onboarding |
| **„KI nimmt alles"** (Stoßzeit, Personalausfall) | zusätzlich `*21*<Ziel>#` | Mitarbeiter tippt den Code, fluvo zeigt ihn in der App an |
| **Zurück in den Normalbetrieb** | `#21#` | Mitarbeiter |
| **Wartezeit ändern** | `*61*<Ziel>*<neue Sekunden>#` | Mitarbeiter / Inhaber |
| **Notaus** (KI gestört) | `#21#`, `#61#`, `#67#` | Inhaber |

Vorteile: Gespräche, die ein Mensch annimmt, laufen gar nicht über fluvo (kostenlos, kein Nadelöhr); keine zweite Rufnummer nötig; einfacher SIP-Trunk reicht. Preis: Umschalten heißt Code tippen — fluvo kann den Code nicht selbst wählen, weil er nur vom Anschluss des Restaurants aus wirkt.

**Variante Y — fluvo steuert** (dauerhafte Sofort-Umleitung, Regler in der App, zweite Rufnummer nötig): nur als Kür mitprüfen (Abschnitt D4), falls Zeit bleibt. Hintergrund in `docs/open-questions.md`, Q15.

| Abschnitt in Stufe 3 | Variante X | Variante Y |
|---|---|---|
| A Einrichten · B Testanrufe · C Wartezeit · D Besetzt | **Pflicht** | — |
| D2 Gleichzeitige Anrufe | **Pflicht** | — |
| D3 Sofort-Umleitung „KI nimmt alles" | **Pflicht** | Pflicht |
| **D5 Betriebsablauf Variante X** (Umschalten im Alltag) | **Pflicht** | — |
| D4 Schleifen-Test / zweite Rufnummer | — | Kür |
| E Aufräumen | **Pflicht** | Pflicht |

**Wichtigste Regel:** Umleitung immer **beim Netzanbieter** einrichten (Tastencode am Telefon oder Kundenportal) — **nie in der Router-Oberfläche** (FRITZ!Box). Im Router geht die Nummer des Anrufers verloren.

---

## Stufe 0 — Vorab klären (ein Anruf beim Piloten, 5 Minuten)

- [ ] Telefonanbieter und Tarif erfragen — Festnetz-Flatrate vorhanden? (am einfachsten: Foto der letzten Rechnung)
- [ ] Router-Modell erfragen (FRITZ!Box, Speedport, anderes)
- [ ] Anzahl Leitungen / Telefone, Telefonanlage vorhanden?
- [ ] Hat der Inhaber Zugang zum Kundenportal des Anbieters? (Ausweichweg, falls Tastencodes nicht gehen)
- [ ] Termin **außerhalb der Stoßzeit** vereinbaren (z. B. werktags 15 Uhr)

| Feld | Ergebnis |
|---|---|
| Anbieter | |
| Tarif / Flatrate ins dt. Festnetz? | |
| Router | |
| Leitungen / Anlage | |
| Kundenportal-Zugang | |
| Termin | |

## Stufe 1 — Deutsche Testnummer an die Voice-Plattform (zu Hause)

Ziel der Umleitung muss eine **deutsche Festnetznummer** sein — eine Auslandsnummer kostet den Wirt Auslandsminuten, manche Anbieter sperren die Umleitung dorthin.

- [ ] Deutsche Nummer bei einem SIP-Anbieter buchen (fertige Retell-Anleitungen gibt es u. a. für Zadarma und DIDWW; Twilio geht auch).
      Für eine Ortsnetznummer ist ein **Adressnachweis aus dem eigenen Vorwahlbereich** nötig (Gewerbeanmeldung o. Ä.) — Prüfung kann 1–3 Tage dauern.
- [ ] Nummer in Retell per SIP-Trunk an den Test-Agenten anbinden (Phone Numbers → Import/Connect via SIP)
- [ ] **Kontrollanruf:** Testnummer direkt mit dem Handy anrufen → Agent hebt ab, im Dashboard (Call History) steht bei `from_number` die eigene Handynummer

Erst weiter, wenn der Kontrollanruf sauber ist.

| Feld | Ergebnis |
|---|---|
| SIP-Anbieter | |
| Nummer gebucht am / freigeschaltet am | |
| Kontrollanruf: Agent hebt ab? | |
| Kontrollanruf: `from_number` korrekt? | |

## Stufe 2 — Generalprobe mit dem eigenen Handy (zu Hause, 10 Minuten)

Übt den Ablauf, ohne den Piloten zu belasten. Geht das, ist die Plattform-Seite in Ordnung — alles, was danach schiefgeht, liegt am Anschluss des Piloten.

1. [ ] Am eigenen Handy wählen: `**61*<Testnummer>**20#` → Bestätigung erscheint
2. [ ] Von einem **zweiten Telefon** das eigene Handy anrufen, **nicht rangehen**
3. [ ] Zeit stoppen: erstes Klingeln → KI hebt ab
4. [ ] Im Dashboard `from_number` prüfen: Nummer des zweiten Telefons (richtig) oder eigene Nummer (falsch)?
5. [ ] Umleitung ausschalten: `##61#` → Kontrollanruf: Handy klingelt normal, keine KI

| Feld | Ergebnis |
|---|---|
| Sekunden bis KI abhebt | |
| `from_number` = Anrufer? | |
| Umleitung wieder aus, kontrolliert? | |

## Stufe 3 — Der echte Test beim Piloten

**Mitbringen:** Handy A (Nummer wird gesendet) · Handy B (Nummer unterdrückt per `#31#`) · wenn möglich ein Festnetzanschluss als dritter Anrufer · Laptop mit Retell-Dashboard · Stoppuhr · dieses Protokoll.

### A. Einrichten — im Netz, nicht im Router

1. [ ] Am Festnetztelefon des Restaurants wählen: `*61*<Testnummer>*20#` → Ansage oder Bestätigungston abwarten
2. [ ] Falls keine Bestätigung / Fehleransage: im **Kundenportal des Anbieters** einrichten („Rufumleitung bei Nichtmelden", 20 Sekunden)
3. [ ] **Nicht** in der Router-Oberfläche einrichten

| Feld | Ergebnis |
|---|---|
| Eingerichtet per | ☐ Tastencode ☐ Kundenportal |
| Bestätigung erhalten? | |

### B. Testanrufe — nach jedem Anruf sofort eintragen

| # | Anrufer | Szenario | Bei der Plattform angezeigte Nummer | Sekunden bis KI | Beobachtung |
|---|---|---|---|---|---|
| 1 | Handy A | niemand geht ran | ☐ Anrufer ☐ Restaurant ☐ anonym | | |
| 2 | Handy B (`#31#`) | niemand geht ran | ☐ Anrufer ☐ Restaurant ☐ anonym | | Wie reagiert der Agent? |
| 3 | Festnetz | niemand geht ran | ☐ Anrufer ☐ Restaurant ☐ anonym | | |
| 4 | Handy A | **Mitarbeiter geht nach 2× Klingeln ran** | — | — | Gespräch normal? KI darf **nicht** anspringen |
| 5 | Handy A | **Leitung besetzt** (anderes Gespräch läuft) | | | ☐ Besetztzeichen ☐ zweite Leitung klingelt ☐ KI hebt ab |

### C. Kürzeste Wartezeit (Kriterium 3)

1. [ ] `*61*<Testnummer>*5#` wählen — angenommen? Dann Anruf 1 wiederholen und stoppen
2. [ ] Falls abgelehnt: `*10#`, dann `*15#` probieren

| Feld | Ergebnis |
|---|---|
| Kleinster angenommener Wert (Sekunden) | |
| Gemessene Zeit bei diesem Wert | |
| Gemessene Zeit bei 20 s (aus Anruf 1) | |

### D. Besetzt-Umleitung (Kriterium 4) — für Variante X immer testen, auch wenn Anruf 5 kein Besetztzeichen brachte

1. [ ] `*67*<Testnummer>#` wählen
2. [ ] Anruf 5 wiederholen → KI muss abheben
3. [ ] Prüfen: Sind `*61*` und `*67*` gleichzeitig aktiv möglich?

| Feld | Ergebnis |
|---|---|
| Besetzt-Umleitung funktioniert? | |
| Beide Umleitungen gleichzeitig möglich? | |
| Angezeigte Nummer bei Besetzt-Umleitung | ☐ Anrufer ☐ Restaurant ☐ anonym |

### D2. Gleichzeitige Anrufe (ergänzt 2026-09-21)

Frage: Wie viele Anrufe leitet der Anschluss **gleichzeitig** zur KI um? Twilio begrenzt nicht, Retell hat ein Konto-Limit (im Retell-Konto nachsehen) — unbekannt ist der Anschluss des Restaurants.

1. [ ] Umleitung `*61*…*20#` (und `*67*`, falls D geklappt hat) aktiv lassen
2. [ ] Handy A ruft an, niemand geht ran → KI hebt ab, **Gespräch laufen lassen**
3. [ ] Währenddessen ruft Handy B an → kommt es ebenfalls bei der KI an?
4. [ ] Währenddessen ruft ein drittes Telefon an → ebenso?

| Feld | Ergebnis |
|---|---|
| Limit gleichzeitiger Anrufe laut Retell-Konto | |
| 2 gleichzeitig: beide bei der KI? | |
| 3 gleichzeitig: alle bei der KI? | |
| Was hört der Anrufer, der nicht durchkommt? | ☐ Besetzt ☐ Klingeln ohne Ende ☐ Ansage |

### D3. Sofort-Umleitung „KI zuerst" (ergänzt 2026-09-21)

1. [ ] `#61#` und `#67#` wählen (alte Umleitungen aus), dann `*21*<Testnummer>#`
2. [ ] Handy A ruft an → Restaurant-Telefon darf **nicht** klingeln, KI hebt sofort ab
3. [ ] D2 (drei gleichzeitige Anrufe) mit Sofort-Umleitung wiederholen
4. [ ] `#21#` wählen (Sofort-Umleitung aus)

| Feld | Ergebnis |
|---|---|
| Sekunden vom Wählen bis KI abhebt | |
| Angezeigte Nummer | ☐ Anrufer ☐ Restaurant ☐ anonym |
| Gleichzeitige Anrufe bei Sofort-Umleitung | |

### D4. Schleifen-Test — kann die KI ans Restaurant zurückstellen? (Kür, nur Variante Y · ergänzt 2026-09-21)

Hintergrund: Stellt die KI an **dieselbe** Nummer zurück, auf der die Umleitung liegt, landet der Anruf wieder bei der KI. Betrifft Eskalation (Q4) und „KI aus" (Q15). Nur testen, wenn der Retell-Agent eine Weiterleitung eingerichtet hat — sonst als „nicht getestet" markieren.

1. [ ] Umleitung `*61*…*20#` aktiv. Agent stellt an die **Hauptnummer** des Restaurants durch → Was passiert?
2. [ ] Agent stellt an eine **zweite Nummer ohne Umleitung** durch (zweite Rufnummer des Anschlusses oder Handy des Inhabers) → klingelt es dort, kommt das Gespräch zustande?

| Feld | Ergebnis |
|---|---|
| Hat der Anschluss eine zweite Rufnummer? | |
| Durchstellen an Hauptnummer | ☐ Schleife ☐ klingelt normal ☐ Besetzt ☐ bricht ab |
| Durchstellen an zweite Nummer | |
| Welche Nummer sieht das Restaurant beim Durchstellen? | ☐ Anrufer ☐ Testnummer |

### D5. Betriebsablauf Variante X — das Umschalten im Alltag (Pflicht, ergänzt 2026-09-21)

Frage: Funktioniert der Alltag eines Mitarbeiters — Normalbetrieb ↔ „KI nimmt alles" — nur mit Tastencodes, ohne dass etwas verloren geht? Entscheidend ist, ob die **Sofort-Umleitung die Normalbetrieb-Einstellungen überlagert, ohne sie zu löschen**.

**1. Normalbetrieb herstellen**
1. [ ] `*61*<Testnummer>*15#` wählen → Bestätigung?
2. [ ] `*67*<Testnummer>#` wählen → Bestätigung?
3. [ ] Kontrolle: Handy A ruft an, niemand geht ran → KI nach ca. 15 s

**2. Auf „KI nimmt alles" umschalten**
4. [ ] `*21*<Testnummer>#` wählen (ohne vorher `#61#`/`#67#` zu wählen) → angenommen oder Fehleransage?
5. [ ] Handy A ruft an → Restaurant-Telefon bleibt still, KI hebt sofort ab
6. [ ] Hört der Mitarbeiter beim Abheben des Hörers einen **Sonderwählton** (Hinweis „Umleitung aktiv")? Wichtig, damit niemand die Sofort-Umleitung vergisst.

**3. Zurück in den Normalbetrieb**
7. [ ] `#21#` wählen
8. [ ] Handy A ruft an, niemand geht ran → kommt die KI **wieder nach 15 s**, ohne dass `*61*` neu eingegeben wurde?
9. [ ] Besetzt-Fall wiederholen (Anruf 5) → greift `*67*` noch?

**4. Wartezeit im laufenden Betrieb ändern**
10. [ ] `*61*<Testnummer>*10#` wählen (ohne vorher `#61#`) → überschreibt der neue Wert den alten? Anruf stoppen.

**5. Bedienbarkeit — ehrlich einschätzen**
11. [ ] Einen Mitarbeiter des Piloten (nicht den Inhaber) die Schritte 4 und 7 **allein von einem Zettel** ausführen lassen. Zeit stoppen, Fehler notieren.
12. [ ] Frage an Inhaber und Mitarbeiter: „Wie oft würdet ihr zwischen Normalbetrieb und ‚KI nimmt alles' wechseln?" (mehrmals täglich / an festen Tagen / fast nie)

| Feld | Ergebnis |
|---|---|
| `*61*` und `*67*` gleichzeitig aktiv möglich? | |
| `*21*` zusätzlich setzbar, ohne die anderen zu löschen? | |
| Nach `#21#`: `*61*` noch aktiv (KI nach 15 s)? | ☐ ja ☐ nein, musste neu gesetzt werden |
| Nach `#21#`: `*67*` noch aktiv? | ☐ ja ☐ nein |
| Sonderwählton bei aktiver Sofort-Umleitung? | |
| Neue Wartezeit überschreibt alte ohne `#61#`? | |
| Mitarbeiter schafft Umschalten allein vom Zettel? Dauer / Fehler | |
| Gewünschte Umschalt-Häufigkeit (Aussage Pilot) | |
| Codes auch über das Kundenportal des Anbieters setzbar (Ausweichweg)? | |

**So liest du D5:** Bleiben `*61*`/`*67*` nach `#21#` erhalten, braucht der Alltag genau **zwei Codes** (`*21*…#` ein, `#21#` aus) — Variante X ist alltagstauglich. Gehen sie verloren, muss der Mitarbeiter nach jeder Stoßzeit drei Codes tippen — dann ist X fehleranfällig und Variante Y (oder das Kundenportal) wird wichtiger. Sagt der Pilot „mehrmals täglich", spricht das ebenfalls für Y.

### E. Aufräumen — Pflicht vor dem Gehen

1. [ ] `#61#` wählen
2. [ ] `#67#` wählen
2a. [ ] `#21#` wählen
3. [ ] **Kontrollanruf:** Restaurant klingelt wie vorher, nach 30 Sekunden springt **keine** KI an
4. [ ] Falls im Kundenportal eingerichtet: dort ebenfalls prüfen, dass nichts mehr aktiv ist

Den Piloten erst verlassen, wenn der Kontrollanruf sauber ist. Eine vergessene Umleitung in der Stoßzeit ist der schlimmste denkbare Fehler dieses Tests.

### F. Nachlauf

- [ ] Nächste Rechnung des Anschlusses ansehen: Posten für umgeleitete Minuten?

| Feld | Ergebnis |
|---|---|
| Kosten für Umleitung auf der Rechnung | |

---

## Ergebnisse lesen

| Beobachtung | Bedeutung | Folge |
|---|---|---|
| Anruf 1 + 3 zeigen die **Nummer des Anrufers** | Overflow-Modus trägt | Q1 beantwortet; A24 Richtung Validated |
| Plattform zeigt die **Nummer des Restaurants** | Umleitung läuft doch über den Router, oder der Anbieter reicht die Nummer nicht durch | Kundenportal probieren, Anbieter-Hotline fragen; sonst Alternative Portierung/SIP durch `architect` bewerten |
| Anruf 2 kommt **anonym** an | erwartet | KI muss nach der Nummer fragen → FA-02, K4 |
| Anruf 4: KI springt trotzdem an | Wartezeit zu kurz | höher stellen, Wert notieren |
| Kürzeste Zeit > 15 s | für Anrufer grenzwertig | Zahl geht in K8 (NFA) |
| D5: `*61*`/`*67*` überleben `#21#`, Mitarbeiter schafft es vom Zettel | **Variante X ist alltagstauglich** | Pilot startet mit X; Codes in die App (FA-13), Umschalt-Häufigkeit als Messgröße in K11 |
| D5: Einstellungen gehen bei `#21#` verloren oder Mitarbeiter scheitert | X ist fehleranfällig | Kundenportal als Weg prüfen; sonst Variante Y bewerten (`architect`, Q15) |
| D2: nur 1–2 gleichzeitige Anrufe kommen zur KI durch | Anschluss begrenzt die Parallelität | Kernversprechen „kein verlorener Anruf in der Stoßzeit" wackelt → mit Anbieter klären; spricht für Portierung/Variante Y |
| Anruf 5: Besetztzeichen **und** `*67*` geht nicht | Stoßzeit-Überlauf greift nicht | kritisch — Alternative Portierung/SIP bewerten |
| Rechnung zeigt Umleitungskosten | Tarif ohne passende Flatrate | in Onboarding-Checkliste (FA-20) und Preisgespräch aufnehmen |

## Zettel für das Restaurant (Variante X) — Vorlage

Nach bestandenem Test bekommt der Pilot diesen Zettel neben das Telefon; später zeigt die fluvo-App dieselben Codes an. `<Ziel>` durch die echte Zielnummer ersetzen — **nur auf dem Papier-Zettel, nicht in dieser Datei**.

| Ich will … | Am Restaurant-Telefon wählen |
|---|---|
| **KI nimmt ab sofort alles** | `*21*<Ziel>#` |
| **Zurück: erst klingelt es bei uns, dann KI** | `#21#` |
| Wartezeit ändern (z. B. 20 Sekunden) | `*61*<Ziel>*20#` |
| **Notfall: KI ganz aus** | `#21#` dann `#61#` dann `#67#` |
| KI wieder einschalten (Normalbetrieb) | `*61*<Ziel>*15#` dann `*67*<Ziel>#` |

## Rahmen

- Nur eigene Testanrufe, außerhalb der Stoßzeit — es landen keine echten Kunden bei der KI.
- Keine Aufzeichnung der Testanrufe aufbewahren.
- Inhaber ist beim Test dabei und mit jedem Schritt einverstanden; die Umleitung ist sein Anschluss.

## Nach dem Test

Ausgefüllte Tabellen an Jarvis. Daraus entstehen:

1. Ergebnis-Abschnitt in AP-001 und ADR-Entwurf (mit `architect`: Umleitung / Portierung / SIP)
2. Q1 und Q15 in `docs/open-questions.md` beantwortet oder mit nächstem Schritt versehen
3. Nachziehen von FA-02, FA-03, FA-04, FA-06, FA-13, FA-14
4. Im Business Brain (eigene Sitzung dort): A24 und Q2 per Ingest nachziehen
