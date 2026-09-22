# FA-14: Internet fällt im Laden aus

- **Status:** mit Sirat durchgegangen (Runden 45–46, 2026-09-22)
- **Stand:** 2026-09-22

| | |
|---|---|
| **Ziel** | Fällt das Internet im Laden aus, bleiben die **laufenden Bestellungen immer abrufbar** und die Annahme von Hand läuft weiter. Nichts geht verloren, nichts wird doppelt, wenn das Netz zurückkommt. |
| **Akteur** | Annahme (die Küche arbeitet im Piloten auf Papier vom Bon; keine Küchen-Oberfläche) |
| **Auslöser** | Die Internetverbindung im Laden bricht ab (WLAN/Router/Provider). |
| **Vorbedingungen** | Die Annahme-Oberfläche ist auf einem Gerät im Laden geöffnet; die laufenden Bestellungen und die Speisekarte wurden zuvor auf das Gerät geladen. |
| **Nachbedingungen** | Die **laufenden Bestellungen sind weiter abrufbar** auf dem Gerät. Neue Bestellungen **können** technisch von Hand angenommen werden (Aktionen in der Warteschlange, bei Rückkehr des Netzes **einmalig** nachgespielt — nichts verloren, nichts doppelt); im Piloten läuft die Annahme beim Ausfall aber auf **Papier** und wird **nicht** nachgetragen (Runde 46). Der **Server** merkt, dass das **Annahme-Gerät nicht erreichbar** ist, und **pausiert die KI-Annahme automatisch**: Die KI geht weiter ran und **sagt freundlich ab** (wie beim Annahmestopp, FA-23), bis das Gerät wieder online ist — sie nimmt **keine** Bestellung an, die der Laden nicht sehen kann. *Lesart Jarvis: die Schwelle, ab wann „nicht erreichbar" gilt (z. B. wenige Minuten), legt K8 als Zahl fest; ob die KI dabei eine Vorbestellung anbietet, klärt K4; die Pause wird als Ereignis protokolliert und dem Betreiber im Monitoring (FA-22) angezeigt.* |

## Ist-Ablauf heute (aus der Mitschrift, Runde 3 und 5)

1. Heute läuft alles auf Papier: Der Zettel wird von Hand geschrieben, durch die Küche gereicht, der Fahrer bekommt die Boxen und den Zettel.
2. Ein Internetausfall trifft den Papier-Ablauf heute **nicht** — es gibt nichts Digitales, das ausfallen könnte.

> Mit fluvo läuft die Annahme über ein Gerät. Sirats Mindestanforderung: Die **laufenden Bestellungen müssen immer abrufbar** sein ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13). Internetausfall kommt selten vor (Runde 13).

## Geplante Reaktion im Piloten (Runde 46)

Fällt das Internet aus, **schaltet das Personal die Annahme und die KI selbst aus** und **nimmt Bestellungen auf Papier auf**, bis das Internet zurück ist ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 46). *Lesart Jarvis: das Ausschalten läuft über das Inhaber-/Mitarbeiter-Handy mit **Mobilfunk** — das Tablet im Laden ist offline; dort schaltet man die KI aus (FA-13) bzw. setzt einen Annahmestopp (FA-23).* Die **automatische KI-Pause** (Ausnahme 1a, Runde 45, Variante A) bleibt als **Sicherheitsnetz**, falls niemand von Hand schaltet — so oder so nimmt die KI keine Bestellung an, die der Laden nicht sehen kann.

Der Papier-Betrieb ist damit im Piloten der **geplante Arbeitsweg** beim Ausfall — nicht das Weiterarbeiten am Tablet in der Offline-Warteschlange. Die Warteschlange ([FEST 18]) bleibt technisch bestehen (laufende Bestellungen abrufbar, Nachspielen bei Netz-Rückkehr), sie ist aber nicht das, worauf sich der Betrieb im Piloten stützt. Die auf Papier angenommenen Bestellungen werden **nicht** ins System nachgetragen (siehe Ausnahme 4a).

## Normalablauf

1. Das Internet fällt aus. Die Annahme-Oberfläche merkt, dass sie **offline** ist, und zeigt das als **Push-Meldung in der App** an; diese Anzeige einer technischen Störung (hier: Verbindung) ist **Pflicht** — sie muss auf jeden Fall erscheinen ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 29, Störungsmeldung → auch FA-06, FA-13, FA-22). Wie genau die Oberfläche das erkennt und darstellt → K10.
2. Die zuvor geladenen **laufenden Bestellungen bleiben abrufbar** — die Annahme sieht weiter, was zu tun ist; die Küche arbeitet ohnehin auf Papier vom Bon ([FEST 18] Offline-First für Küche und Bon; [ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13).
3. Die Annahme **kann** neue Bestellungen technisch **von Hand** am Gerät weiter annehmen (FA-05); jede Aktion landet dann in einer **Warteschlange** auf dem Gerät. Im Piloten ist das jedoch **nicht** der geplante Arbeitsweg — dort steigt das Personal auf **Papier** um (siehe „Geplante Reaktion im Piloten" und Ausnahme 4a). Die Warteschlange ([FEST 18]) bleibt als technisches Sicherheitsnetz bestehen.
4. Kommt das Internet zurück, werden die Aktionen der Reihe nach **einmalig nachgespielt**; doppelte Aktionen werden ignoriert, nur gültige Vorwärts-Übergänge greifen ([FEST 18], Briefing §5.5). Nichts geht verloren, nichts wird doppelt.

## Ausnahmeabläufe

- **2a. Bon drucken ohne Internet** (zweigt von Schritt 2 ab): Ob der Bon während des Ausfalls **lokal** druckt, hängt an **Q8 / Risikotest AP-002** — hier **nicht** gelöst, beide Enden gelten:
  - **Ende A — druckt lokal** (lokaler Druck aus der Oberfläche im selben Netz, Briefing §5.5): Bon liegt vor wie sonst. **Bleibt bis AP-002 offen.**
  - **Ende B — druckt nicht** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 45): Es wird **kein** Bon still als gedruckt vermerkt; die Bestellung bleibt **am Tablet sichtbar** und der Bon wird **nachgedruckt, sobald das Netz zurück ist**. Die Küche bekommt in der Zwischenzeit einen **handgeschriebenen Zettel**.
  Endet in: Bon liegt vor (Ende A, lokal) **oder** Bestellung bleibt am Tablet sichtbar, Küche arbeitet vom handgeschriebenen Zettel, Bon wird bei Netz-Rückkehr nachgedruckt (Ende B); siehe FA-06.
- **1a. KI-Annahme während des Ausfalls — automatische Pause** (zweigt von Schritt 1 ab): Ein Internetausfall **im Laden** stoppt die KI **nicht** — sie läuft in der Cloud, die Rufumleitung im Telefonnetz (**Befund Jarvis, Runde 45**; korrigiert die frühere Aussage „KI-Telefonie ruht / Telefon klingelt durch"). Ohne Gegenmaßnahme würde die KI weiter annehmen, während Tablet und Drucker nichts davon sehen. Deshalb: Merkt der **Server**, dass das **Annahme-Gerät nicht erreichbar** ist, **pausiert er die KI-Annahme automatisch** — die KI geht ran und **sagt freundlich ab** (wie beim Annahmestopp, FA-23), bis das Gerät wieder online ist ([ENTSCHIEDEN Sirat 2026-09-22, Variante A], Mitschrift Runde 45). Endet in: keine KI-Bestellung, solange das Gerät offline ist; sobald das Gerät wieder online ist, nimmt die KI wieder an — **keine unsichtbare Bestellung**.
- **3a. Fahrer unterwegs ohne Netz** — **entfällt im ersten Piloten** (Fahrer-Teil zurückgestellt, ADR 0008; es gibt keinen Fahrer im System, der scannt/zustellt/erfasst). Der Fall kommt mit der Fahrer-App wieder (FA-08). Endet in: im ersten Piloten nicht anwendbar.
- **4a. Ausfall → Papier-Betrieb, kein Nachtrag** (zweigt von Schritt 4 ab): Beim Ausfall steigt das Personal **ganz auf Papier um** ([ENTSCHIEDEN Sirat 2026-09-22], Mitschrift Runde 45/46). **Ab wann:** praktisch **sofort** — es gibt **keine Karenzzeit**, in der man am Tablet in der Offline-Warteschlange weiterarbeitet (Runde 46). Die auf Papier angenommenen Bestellungen werden **nicht** ins System **nachgetragen** ([ENTSCHIEDEN Sirat 2026-09-22, Variante B], Mitschrift Runde 46 — „das ist okay"). Der **Abschluss/die Abrechnung dieses Tages wartet** bzw. läuft über die Zettel: Der Inhaber prüft die Papier-Bestellungen von Hand; das System muss davon nichts wissen. Das dabei kassierte **Papier-Bargeld liegt außerhalb** von fluvo — der Abschluss je Mitarbeiter (FA-16) deckt an solchen Tagen nur die im System kassierten Beträge. Endet in: Betrieb auf Papier wie früher; nichts wird still verworfen; kein Nachtrag, das Papier-Bargeld liegt außerhalb (FA-16, Q2).
- **4b. TSE ohne Internet** (zweigt von Schritt 4 ab): Die Cloud-TSE braucht Internet; die fiskalische Behandlung bei Ausfall (Nachsignatur, Hinweis auf dem Bon) hängt an **Q2** → hier **nicht** gelöst. Endet in: an Q2 / Steuerberaterin verwiesen.

## Darf nicht

- Die **laufenden Bestellungen** dürfen bei Internetausfall **nicht** verschwinden — sie bleiben immer abrufbar ([ENTSCHIEDEN Sirat 2026-09-18], Mitschrift Runde 13).
- Eine von Hand angenommene Bestellung geht **nicht** verloren, weil das Netz fehlt; sie wartet in der Warteschlange ([FEST 18], §5.5).
- Beim Nachspielen entsteht **keine doppelte** Bestellung und **keine** doppelt wirkende Aktion; doppelte Aktionen werden ignoriert (Idempotenz, §5.5).
- Die **KI nimmt keine Bestellung an, die der Laden nicht sehen kann**: Ist das Annahme-Gerät nicht erreichbar, sagt die KI ab, statt eine unsichtbare Bestellung anzulegen ([ENTSCHIEDEN Sirat 2026-09-22, Variante A], Mitschrift Runde 45; **Befund Jarvis, Runde 45**).
- Es wird **kein** Bon still als „gedruckt" vermerkt, wenn er nicht gedruckt wurde (siehe FA-06, Q8).
- Der Ausfall bei einem Restaurant betrifft **nicht** die Daten oder Bestellungen eines anderen Restaurants ([FEST 4]).
- Fiskalische Vorgänge werden **nicht** stillschweigend übergangen; die Behandlung bei Ausfall hängt an Q2 und wird nicht hier entschieden.

## Regeln und Zahlen

| Regel / Anforderung | Stufe | Quelle |
|---|---|---|
| Laufende Bestellungen müssen bei Internetausfall **immer abrufbar** sein (Mindestanforderung) | [ENTSCHIEDEN Sirat 2026-09-18] | Mitschrift Runde 13 |
| Der Offline-/Verbindungsausfall wird als **Push in der App** angezeigt; die Anzeige einer Störung (Drucker/KI/Verbindung) ist **Pflicht** | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 29 (Störungsmeldung) |
| Offline-First für Küche und Bon; beides muss einen Internetausfall überleben | [FEST 18] | Briefing §2 (18), §5.5 |
| Ein Ausfall **im Laden** stoppt die KI **nicht** (KI in der Cloud, Umleitung im Netz). Der Server erkennt das nicht erreichbare Annahme-Gerät und **pausiert die KI-Annahme automatisch** (KI sagt ab wie FA-23), bis das Gerät wieder online ist — keine unsichtbare Bestellung | [ENTSCHIEDEN Sirat 2026-09-22, Variante A] | Mitschrift Runde 45 (Befund Jarvis) |
| Schwelle für „Gerät nicht erreichbar" (Zahl); ob die KI dabei eine Vorbestellung anbietet | [OFFEN] | *Lesart Jarvis:* K8 (Schwelle) / K4 (Vorbestellung) |
| Pause der KI-Annahme wird als Ereignis protokolliert und im Betreiber-Monitoring angezeigt (FA-22) | [ENTSCHIEDEN Sirat 2026-09-22] *Ausgestaltung Lesart Jarvis* | Mitschrift Runde 45 |
| Beim Ausfall schaltet das Personal Annahme und KI selbst aus (Handy/Mobilfunk, FA-13/FA-23) und nimmt auf **Papier** auf; die automatische KI-Pause bleibt Sicherheitsnetz. **Sofortiges Umsteigen**, keine Karenzzeit in der Offline-Warteschlange | [ENTSCHIEDEN Sirat 2026-09-22] | Mitschrift Runde 46 |
| Die auf Papier angenommenen Bestellungen werden **nicht** nachgetragen (Variante B); Abschluss/Abrechnung des Tages wartet bzw. läuft über die Zettel, das Papier-Bargeld liegt außerhalb (FA-16, Q2) | [ENTSCHIEDEN Sirat 2026-09-22, Variante B] | Mitschrift Runde 46 |
| Aktionen in Warteschlange mit Idempotenz-Schlüssel; bei Verbindung nachspielen; nur gültige Vorwärts-Übergänge, doppelte ignoriert | [STACK] | Briefing §5.5 |
| Bon drucken ohne Internet (lokaler Druck) | [OFFEN] Q8 | open-questions.md Q8 / Risikotest AP-002 |
| Fiskalische Behandlung (TSE) bei Ausfall, Nachsignatur | [OFFEN] Q2 | open-questions.md Q2 / Steuerberaterin |
| Offline-Pufferdauer und Konfliktregeln im Detail | [OFFEN] | Briefing §8 (Start mit §5.5-Regel) |

## Testszenarien

| Szenario | Eingabe / Setup | Erwartetes Ergebnis | Darf nicht | Prüfung |
|---|---|---|---|---|
| Standardfall Ausfall | Gerät hat 3 laufende Bestellungen geladen, Netz getrennt | Die 3 Bestellungen bleiben abrufbar; **Push-Meldung** „offline" (Anzeige **Pflicht**) | Bestellungen verschwinden; kein Hinweis; Störung verschluckt | manuell am Gerät + automatisch |
| Annahme von Hand offline | Netz getrennt, neue Bestellung `#A-04` von Hand angenommen | Bestellung landet in der Warteschlange; nach Netz-Rückkehr einmal angelegt | Bestellung geht verloren; doppelt angelegt | manuell + automatisch |
| Nachspielen ohne Doppel (Grenzfall) | 2 Offline-Aktionen, Netz kommt zurück, Nachspielen (auch bei Wiederholung) | Jede Aktion genau einmal wirksam; doppelte ignoriert | Doppelte Bestellung / doppelt wirkende Aktion | automatisch |
| Bon druckt lokal (Q8-Ende A) | Netz getrennt, lokaler Druck möglich | Bon liegt vor wie sonst | Bon fälschlich als „gedruckt" ohne Ausdruck | manuell mit echtem Drucker (AP-002) |
| Bon druckt nicht (Q8-Ende B) | Netz getrennt, kein lokaler Druck | Kein „gedruckt"-Vermerk; Bestellung bleibt am Tablet sichtbar; Küche arbeitet vom **handgeschriebenen Zettel**; Nachdruck bei Netz-Rückkehr | Bestellung ohne Bon und ohne Hinweis | manuell mit echtem Drucker (AP-002) |
| KI-Pause bei offline-Gerät (Runde 45) | Annahme-Gerät offline, Anruf kommt | KI geht ran und **sagt freundlich ab** (wie FA-23); keine Bestellung angelegt; Pause protokolliert und im Monitoring (FA-22) sichtbar | KI legt eine Bestellung an, die der Laden nicht sieht | Testanruf + automatisch (hängt an AP-001) |
| Gerät wieder online → KI nimmt wieder an (Runde 45) | Gerät war offline (KI pausiert), Netz/Gerät kommt zurück, neuer Anruf | KI nimmt die Bestellung wieder regulär an; sie ist am Gerät sichtbar | Bestellung bleibt unsichtbar; KI bleibt fälschlich pausiert | Testanruf + automatisch |
| Fahrer unterwegs ohne Netz | — | **Entfällt im ersten Piloten** (kein Fahrer im System, ADR 0008); kommt mit der Fahrer-App wieder (FA-08) | — | — (zurückgestellt) |
| Langer Ausfall (Grenzfall) | Netz über längere Zeit weg | Personal steigt sofort auf Papier um; nichts still verworfen; Warteschlange bleibt technisch, wird im Piloten aber nicht als Arbeitsweg genutzt | Warteschlange läuft still über / verwirft Aktionen | manuell |
| Papiertag — kein Nachtrag (Runde 46) | Ausfall, Personal nimmt N Bestellungen auf Papier auf und kassiert dabei bar; Netz kommt später zurück | Nichts wird nachgetragen; das System kennt nur die vor/nach dem Ausfall im System erfassten Bestellungen und bleibt konsistent (keine Doppel, keine Geister); der Tresen-Abschluss (FA-16) deckt nur die im System kassierten Beträge, das Papier-Bargeld liegt außerhalb | Papier-Bestellungen still ins System kippen; Papier-Bargeld in den Abschluss ziehen; inkonsistenter Zustand | manuell + automatisch |
| Zwei-Restaurant-Fall | Restaurant A offline; Restaurant B `+49 30 23125 404` online | A puffert lokal; B läuft normal; kein Übergriff | A's Ausfall trifft B's Bestellungen | automatisch |

## Rückverfolgung

- **Prozessschritt:** P? „Betrieb bei Internetausfall" (querliegend zu Annahme/Bon/Küche; K2 noch offen)
- **Zustandsübergänge:** **keiner** direkt durch den Ausfall; Statuswechsel, die offline ausgelöst werden, greifen erst beim Nachspielen als gültige Vorwärts-Übergänge (Briefing §5.5)
- **Technische Anwendungsfälle:** TU-? (Offline-Cache laufender Bestellungen, Aktions-Warteschlange mit Idempotenz, Offline-Erkennung/Anzeige, Nachspielen; Zuordnung in K7). Abhängig von AP-002 (Druck) und AP-001 (Telefonie).
- **Verträge / Events:** Idempotenz-Schlüssel je Aktion, Nachspielen über die bestehenden Kern-Befehle (`createOrder`, Statuswechsel); Namen K6 noch offen
- **Testszenarien:** FA-14-T1 … FA-14-T10 (Tabelle oben)
- **Nachbar-Fälle:** FA-05 (Annahme von Hand — läuft offline weiter), FA-06 (Bon / lokaler Druck / Q8 / Nachdruck bei Netz-Rückkehr), FA-08 (Fahrer unterwegs ohne Netz — **zurückgestellt**, ADR 0008), FA-10 (Kassensturz-Bestätigung offline — **zurückgestellt**), FA-13 (KI an/aus — Personal schaltet beim Ausfall selbst aus; neue Ausnahme „automatische Pause" bei offline-Gerät), FA-16 (Abschluss je Mitarbeiter — deckt an Papiertagen **nur die im System kassierten Beträge**, Papier-Bargeld liegt außerhalb), FA-22 (Betreiber-Monitoring — Pause sichtbar), FA-23 (Annahmestopp — die KI-Pause sagt ab wie dort), Q2 (Barumsätze an Ausfalltagen auf Papier neben fluvo → Steuerberaterin), K11 (Pilot-Kriterien: Ausfalltage zählen nicht gegen fluvo), Risikotest AP-002 (Drucker), AP-001 (Rufumleitung)

## Offene Fragen

> **Frage an Sirat / K10:** **Woran merkt die Annahme**, dass sie offline ist — ein deutlicher Hinweis in der Oberfläche? Und was soll sie in diesem Moment sehen/tun dürfen?

> **Beantwortet (Runde 46):** **Ab wann** gilt ein Ausfall als „länger"? — praktisch **sofort**, keine Karenzzeit (Runde 46). Werden die auf Papier angenommenen Bestellungen samt **kassiertem Bargeld** nachgetragen? — **Nein** ([ENTSCHIEDEN Sirat 2026-09-22, Variante B], Mitschrift Runde 46). Der Abschluss/die Abrechnung des Tages wartet bzw. läuft über die Zettel; der Abschluss je Mitarbeiter (FA-16) deckt nur die im System kassierten Beträge, das **Papier-Bargeld liegt außerhalb**. Fiskalische Behandlung der Barumsätze auf Papier neben fluvo → Q2 / Steuerberaterin.

> **Frage an Sirat / Risikotest AP-002 (Q8):** Druckt der Bon **lokal ohne Internet** oder nicht? *(Ende B ist entschieden, Runde 45: druckt er nicht, bleibt die Bestellung am Tablet sichtbar, die Küche bekommt einen handgeschriebenen Zettel, der Bon wird bei Netz-Rückkehr nachgedruckt. Offen bleibt nur, ob **Ende A** — lokaler Druck — technisch geht; das klärt AP-002.)*

> **Beantwortet / gegenstandslos (Runde 45):** Die frühere Frage zur **Quittierung des KI-Bons bei Internetausfall** ist durch die **automatische KI-Pause** (Ausnahme 1a) weitgehend gegenstandslos — solange das Annahme-Gerät offline ist, kommen **keine KI-Bestellungen** an, die zu quittieren wären ([ENTSCHIEDEN Sirat 2026-09-22, Variante A], Mitschrift Runde 45). **Restfall** (Hinweis an K3/K8): Ein Ausfall trifft genau eine **gerade eingegangene, noch nicht quittierte** KI-Bestellung — wie diese behandelt wird (2-Minuten-Notdruck lokal? Quittierung nach Netz-Rückkehr?), ist mit FA-06/Q8 zu klären.

> **Frage an Steuerberaterin (Q2):** Wie wird die **TSE** ohne Internet behandelt (Nachsignatur, Hinweis auf dem Bon)? — hier nicht gelöst (open-questions.md Q2).

## Nicht Teil dieses Anwendungsfalls

- Der **lokale Bon-Druck** im Detail (technischer Weg) → FA-06, Q8, Risikotest AP-002.
- **Fiskalische** Ausfallregeln der TSE → K5/K6, hängt an Q2.
- Verhalten des **Fahrers** ohne Netz im Detail → FA-08 (**zurückgestellt** im ersten Piloten, ADR 0008).
- Die **KI-Annahme** an/aus als Bedienung → FA-13 (hier wird sie bei nicht erreichbarem Gerät nur **automatisch pausiert**, kein Schalter).
- Genaue **Offline-Pufferdauer** und Konfliktregeln beim Nachspielen → K8/K9 (Start mit der Regel aus §5.5).
