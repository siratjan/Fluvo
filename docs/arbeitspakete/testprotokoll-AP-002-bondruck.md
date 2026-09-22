# Testprotokoll zu AP-002 · Bon-Druck: CloudPRNT und Druck ohne Internet

- **Gehört zu:** [AP-002](AP-002-drucker-test.md) · Roadmap R2 · offene Frage Q8
- **Angelegt:** 2026-09-21 · **Stand:** Anleitung fertig, Test noch nicht durchgeführt
- **Dauer:** Beschaffung (Tage) + ca. 3–4 Stunden Test zu Hause · **Ort:** dein Schreibtisch, **nicht** beim Piloten
- **Code:** Zwei Wegwerf-Hilfen nötig (Testserver, Testseite) — **nur nach deiner ausdrücklichen Ansage** (steht so in AP-002, Schritt 2)

> Dateiname beginnt absichtlich nicht mit `AP-`, damit das Cockpit die Datei nicht als eigenes Arbeitspaket liest.
> Protokolldetails stammen aus der Star-Dokumentation (abgerufen 2026-09-21, Links am Ende), nicht aus dem Gedächtnis.

## Worum es geht — in zwei Sätzen

fluvo druckt den Bon auf zwei Wegen: **Normalfall** = der Drucker fragt den fluvo-Server im Internet ab (CloudPRNT). **Notfall** = das Internet ist weg, das Tablet in der Annahme druckt direkt an den Drucker im selben WLAN (WebPRNT). Weg 1 ist erprobte Technik; **Weg 2 ist das Risiko**, weil Browser einer HTTPS-Seite normalerweise verbieten, mit einem Gerät unter `http://192.168.x.x` zu sprechen.

## Was der Test beantwortet

| # | Frage | Abnahmekriterium AP-002 |
|---|---|---|
| 1 | Welches Druckermodell kann beide Wege? | Kriterium 1 |
| 2 | CloudPRNT: Holt der Drucker einen Auftrag ab und bestätigt ihn? Wie viele Sekunden bis zum Druck? | Kriterium 2 |
| 3 | Lokaler Druck aus einer HTTPS-Seite ohne Internet: geht / geht nicht, genaue Fehlermeldung | Kriterium 3 |
| 4 | Falls nicht: welche Alternative trägt (TLS auf dem Drucker, Bluetooth, USB)? | Kriterium 4 |
| 5 | Ergebnis + Empfehlung als ADR-Entwurf, Q8 beantwortet | Kriterium 5 (macht Jarvis nach dem Test) |

## Wichtig vorab: neuer Stand bei Chrome (verändert die Erwartung)

Seit **Chrome 142** gibt es die Berechtigung **„Local Network Access"**: Eine HTTPS-Seite darf nach einmaliger Zustimmung des Nutzers Geräte im lokalen Netz ansprechen — und Anfragen an eine **private IP-Adresse** (z. B. `192.168.0.50`) oder einen `.local`-Namen sind dann **von der Mixed-Content-Sperre ausgenommen**. [C1]

Heißt: In Chrome (und Edge) könnte der lokale Druck **ohne TLS-Zertifikat auf dem Drucker** funktionieren — mit einem einmaligen Erlaubnis-Dialog. Ob das auch für Chrome auf **Android** und für installierte PWAs gilt, sagt die Quelle nicht → genau das misst der Test. **Safari (iPad/iPhone) hat diese Ausnahme nicht** → dort ist TLS auf dem Drucker oder ein anderer Weg nötig.

---

## Stufe 0 — Entscheiden und beschaffen

### 0.1 Druckermodell (Kriterium 1)

Anforderung: **CloudPRNT + WebPRNT + LAN**, möglichst zusätzlich **Bluetooth** (damit die Alternative aus Kriterium 4 ohne zweites Gerät testbar ist), 80 mm Bonbreite.

| Kandidat | CloudPRNT | WebPRNT | Schnittstellen | Anmerkung |
|---|---|---|---|---|
| **Star mC-Print3** (Variante mit LAN + Bluetooth) | ja [S1] | ja, inkl. TLS-Zertifikat auf dem Drucker [S2] | LAN, USB, Bluetooth, je nach Variante WLAN | **Empfehlung für den Test** |
| Star TSP100IV | ja [S3] | laut Hersteller ja — vor Kauf im Datenblatt prüfen | LAN, USB | günstiger, kein Bluetooth |

- [ ] Vor dem Kauf im Datenblatt der **konkreten Variante** prüfen: CloudPRNT ✔, WebPRNT ✔, LAN ✔, Bluetooth ✔
- [ ] Preis und Händler notieren (für die spätere Hardware-Einkaufsliste der Kunden) — Preis hier **nicht** aus dem Gedächtnis eintragen
- [ ] Bonrollen 80 mm Thermo dazu bestellen (eine liegt meist bei)

| Feld | Ergebnis |
|---|---|
| Gewähltes Modell / genaue Variante | |
| Preis / Händler | |
| Firmware-Version (steht auf dem Selbsttest-Ausdruck) | |

### 0.2 Was du sonst brauchst

- [ ] Router mit freiem LAN-Port + LAN-Kabel (WLAN-Variante: WLAN-Zugang)
- [ ] Laptop mit **Chrome** (aktuelle Version notieren) — dein Windows-Rechner reicht
- [ ] **Android-Gerät mit Chrome** (Handy reicht) — die Annahme im Laden wird eher ein Tablet sein
- [ ] Wenn vorhanden: **iPad oder iPhone** (Safari) — sonst Testfall als „nicht getestet" markieren
- [ ] Stoppuhr (Handy)

### 0.3 Deine Ansage an Jarvis (ohne die geht Stufe 2 und 3 nicht)

Beide Tests brauchen eine winzige Hilfe, die es nicht fertig gibt:

| Hilfe | Wofür | Umfang |
|---|---|---|
| **Wegwerf-Testserver** | spielt für den Drucker den „fluvo-Server": antwortet auf die Abfrage, gibt einen Testbon heraus, nimmt die Bestätigung an, schreibt Zeitstempel mit | eine Datei, ca. 60 Zeilen Node.js, keine Datenbank, kein fluvo-Code |
| **Wegwerf-Testseite** | eine HTTPS-Seite mit einem Knopf „Testbon drucken", die direkt an die IP des Druckers sendet; merkt sich selbst für den Offline-Betrieb | eine HTML-Datei mit dem Star-WebPRNT-Skript |

- [ ] Ansage an Jarvis: **„Wegwerf-Testskripte für AP-002 schreiben"** → Jarvis setzt „Entsteht Code?" im AP auf „ja (Wegwerf, nicht im Produkt)" und legt beides unter `tools/risikotests/ap-002/` ab. Nichts davon wandert später ins Produkt.

---

## Stufe 1 — Drucker in Betrieb nehmen (20 Minuten)

1. [ ] Auspacken, Bonrolle einlegen, Strom an, LAN-Kabel an den Router
2. [ ] **Selbsttest drucken:** Drucker ausschalten → FEED-Taste gedrückt halten → einschalten → loslassen, sobald er druckt. Auf dem Ausdruck steht die **IP-Adresse** und die Firmware-Version.
3. [ ] Am Laptop im Browser `http://<IP-des-Druckers>` öffnen → Weboberfläche des Druckers. Anmelden (Standard-Zugang steht im Handbuch des Modells) — **Passwort sofort ändern**.
4. [ ] Im Router der IP-Adresse des Druckers eine **feste Zuordnung** geben (DHCP-Reservierung) — sonst ändert sich die Adresse und Stufe 3 misst Unsinn.

| Feld | Ergebnis |
|---|---|
| IP-Adresse (nur letzte Stelle notieren, z. B. „.50") | |
| Firmware-Version | |
| Weboberfläche erreichbar? | |
| Feste IP vergeben? | |

---

## Stufe 2 — Weg 1: CloudPRNT (Kriterium 2)

**So läuft das Protokoll** [S4][S5]: Der Drucker schickt in einem festen Abstand ein **POST** an die Server-Adresse (mit seinem Status: Papier, Deckel, …). Antwortet der Server mit `jobReady: true`, holt der Drucker den Auftrag per **GET** ab, druckt, und bestätigt per **DELETE**. Erst das DELETE zählt als „gedruckt". Bei Ereignissen (Deckel auf/zu, Taste) fragt der Drucker sofort ab, nicht erst nach Ablauf des Abstands.

### A. Testserver starten (braucht Ansage aus 0.3)

1. [ ] Jarvis liefert `tools/risikotests/ap-002/cloudprnt-testserver.mjs` und den Startbefehl
2. [ ] Server auf dem Laptop starten — er zeigt die Adresse an, unter der er im Heimnetz erreichbar ist (`http://<IP-des-Laptops>:<Port>/cloudprnt`)
3. [ ] Windows-Firewall fragt beim ersten Start nach → für **private Netze** zulassen

> Für diesen Test reicht der Server im Heimnetz ohne HTTPS. Im Produkt läuft er im Internet mit HTTPS; ob der Drucker mit dem echten Zertifikat klarkommt, ist ein Punkt für Bauschritt 2, nicht für diesen Risikotest. Optionaler Zusatz siehe F.

### B. Drucker auf den Testserver zeigen lassen

1. [ ] Weboberfläche des Druckers → Menü **CloudPRNT** → Dienst **aktivieren**
2. [ ] **Server-URL** eintragen (aus A.2)
3. [ ] **Polling-Intervall** auf **5 Sekunden** stellen
4. [ ] Speichern → Drucker startet neu

### C. Abfrage beobachten

- [ ] Im Server-Fenster erscheint alle ~5 Sekunden eine Zeile „POST vom Drucker" mit Status

| Feld | Ergebnis |
|---|---|
| Abfragen kommen an? | |
| Gemessener Abstand zwischen zwei Abfragen (Sekunden) | |
| Welche Statusfelder schickt der Drucker (Papier, Deckel, …)? | |

### D. Testbon drucken und messen — 5 Durchgänge

Im Server-Fenster **Enter** drücken = „Auftrag bereitstellen" (Zeitstempel T0). Der Server schreibt mit: T1 = Drucker hat abgeholt (GET), T2 = Drucker hat bestätigt (DELETE). Du stoppst zusätzlich von Hand, wann das Papier **fertig geschnitten** ist.

| Durchgang | T0 → T1 Abholung (s) | T1 → T2 Bestätigung (s) | T0 → Papier fertig, von Hand (s) | Bon vollständig und lesbar? |
|---|---|---|---|---|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |
| 4 | | | | |
| 5 | | | | |

- [ ] Umlaute und €-Zeichen auf dem Testbon korrekt? (Testbon enthält „Käse, Größe, 12,50 €")
- [ ] QR-Code auf dem Testbon mit dem Handy lesbar?

### E. Intervall variieren und Fehlerfälle

| Test | Vorgehen | Ergebnis |
|---|---|---|
| Intervall 2 s | in der Weboberfläche umstellen, D einmal wiederholen | T0 → Papier: ___ s · angenommen? ___ |
| Intervall 10 s | ebenso | T0 → Papier: ___ s |
| Kleinstes angenommenes Intervall | herunterprobieren | ___ s |
| **Papier leer** | Rolle herausnehmen, Auftrag bereitstellen | Was meldet der Drucker im POST? Kommt ein DELETE mit Fehlercode oder gar keins? |
| **Deckel offen** | Deckel öffnen, Auftrag bereitstellen, nach 20 s schließen | Druckt er nach? Doppelt? |
| **Strom weg während Auftrag wartet** | Auftrag bereitstellen, sofort Stecker ziehen, nach 30 s wieder an | Holt er den Auftrag nach dem Start ab? Doppeldruck? |
| **Internet/Server weg** | Testserver beenden, 1 Minute warten, neu starten | Fragt der Drucker von selbst wieder ab? Nach wie vielen Sekunden? |

### F. Optional — Server im Internet mit HTTPS

Nur wenn du magst und Jarvis es einrichtet: Testserver über einen Tunnel-Dienst per HTTPS erreichbar machen, URL im Drucker eintragen, D einmal wiederholen. Beantwortet: Kommt der Drucker mit einem echten Zertifikat und dem Weg übers Internet klar, und wie viel langsamer ist es?

| Feld | Ergebnis |
|---|---|
| Über HTTPS/Internet getestet? | |
| T0 → Papier (s) | |

---

## Stufe 3 — Weg 2: Lokaler Druck ohne Internet (Kriterium 3) — **der eigentliche Risikotest**

### A. Vorbereiten

1. [ ] Weboberfläche des Druckers → **WebPRNT aktivieren** (beim mC-Print3 ab Werk aktiv [S2])
2. [ ] Jarvis liefert die Testseite und stellt sie unter einer **HTTPS-Adresse** bereit (braucht Ansage aus 0.3). Die Seite hat: Feld für die Drucker-IP, Knopf „Testbon drucken", Anzeige der **genauen Fehlermeldung**, und sie speichert sich für den Offline-Betrieb (Service Worker) — so wie später die echte Annahme-PWA.
3. [ ] Seite auf jedem Testgerät **einmal mit Internet** öffnen, Drucker-IP eintragen. Auf Android/iPad zusätzlich „Zum Startbildschirm hinzufügen" (= installierte PWA).

### B. Testmatrix — erst **mit** Internet, dann **ohne**

„Ohne Internet" heißt: **am Router das DSL-/Glasfaser-Kabel ziehen** (oder Internetzugang im Router sperren). WLAN und LAN bleiben an — genau wie im Laden, wenn der Anschluss ausfällt. **Nicht** den Flugmodus nehmen, sonst ist auch das WLAN weg.

| # | Gerät / Browser | Internet | Druckt? | Erlaubnis-Dialog „Geräte im lokalen Netz"? | Genaue Fehlermeldung (Seite + Browser-Konsole) |
|---|---|---|---|---|---|
| 1 | Laptop · Chrome (Version: ___) | an | | | |
| 2 | Laptop · Chrome | **aus** | | | |
| 3 | Android · Chrome im Tab | an | | | |
| 4 | Android · Chrome im Tab | **aus** | | | |
| 5 | Android · **installierte PWA** | **aus** | | | |
| 6 | iPad/iPhone · Safari | an | | | |
| 7 | iPad/iPhone · **installierte PWA** | **aus** | | | |
| 8 | Laptop · Firefox (optional) | **aus** | | | |

Zu jedem Fall notieren:
- [ ] Lädt die Seite ohne Internet überhaupt? (wenn nein: Service-Worker-Problem, nicht Drucker-Problem — getrennt vermerken)
- [ ] Bleibt die erteilte Erlaubnis nach Browser-Neustart erhalten?
- [ ] Zeit vom Knopfdruck bis Papier fertig: ___ s

**Fehlermeldung so holen:** Laptop: `F12` → Reiter „Console" → rote Zeile kopieren. Android: Handy per USB an den Laptop, in Chrome am Laptop `chrome://inspect` öffnen. iPad: nur die Meldung der Testseite notieren.

### C. Wenn B scheitert → Alternativen (Kriterium 4)

Nur die Zeilen testen, die nötig sind. Reihenfolge = aufsteigender Aufwand für den späteren Kunden.

| Alt. | Was | Vorgehen | Ergebnis | Aufwand je Kunde im echten Betrieb |
|---|---|---|---|---|
| **C1** | **TLS auf dem Drucker, selbst-signiert** [S2] | Weboberfläche → SSL/TLS → selbst-signiertes Zertifikat erzeugen (als Domain die **IP des Druckers**) → aktivieren → speichern. Zertifikat herunterladen und auf dem Testgerät als vertrauenswürdig installieren. Testseite auf `https://<IP>` umstellen, B wiederholen. | | Zertifikat auf **jedem** Gerät installieren — für Wirte ohne Techniker kritisch |
| **C2** | **TLS mit CA-signiertem Zertifikat** [S2] | Eigenes Zertifikat + privaten Schlüssel (PEM, RSA 2048) hochladen. Setzt einen Namen voraus, der auf die lokale IP zeigt — **Achtung:** ein öffentlicher Name, der auf eine lokale Adresse zeigt, bekommt in Chrome **keine** Mixed-Content-Ausnahme [C1], mit gültigem HTTPS braucht er sie aber auch nicht. Jarvis/`architect` bewerten, ob das je Kunde automatisierbar ist. | | hoch in der Einrichtung, null am Gerät |
| **C3** | **Bluetooth** | Drucker mit dem Android-Gerät koppeln. Druck aus dem Browser per Web Bluetooth (nur Chrome/Android, **nicht** iOS) oder über die Star-App „PassPRNT" (Browser ruft App auf). | | Kopplung einmalig; iOS-Weg nur über App |
| **C4** | **USB** | Drucker per USB ans Android-Tablet/Laptop; Druck per WebUSB (nur Chrome) | | Kabel, ein Gerät fest am Drucker |

### D. Gegenprobe — der Ernstfall am Stück

1. [ ] Internet an. Über CloudPRNT einen Bon drucken (Stufe 2 D).
2. [ ] Internet-Kabel am Router ziehen.
3. [ ] Aus der installierten PWA lokal drucken.
4. [ ] Internet wieder an. Prüfen: Fragt der Drucker von selbst wieder den Testserver ab? Druckt er etwas **doppelt**?

| Feld | Ergebnis |
|---|---|
| Wechsel Cloud → lokal ohne Eingriff am Drucker möglich? | |
| Müssen CloudPRNT und WebPRNT gleichzeitig aktiv sein — geht das? | |
| Doppeldruck nach Rückkehr des Internets? | |

---

## Ergebnisse lesen

| Beobachtung | Bedeutung | Folge |
|---|---|---|
| Stufe 2: Abholung + Bestätigung klappen, T0 → Papier ≤ Intervall + ~3 s | Weg 1 trägt | [STACK] Star CloudPRNT bestätigt; gemessene Zahl → K8 (NFA) |
| Kleinstes Intervall ≥ 5 s | Bon kommt spürbar verzögert | Zahl → K8; mit Pilot klären, ob akzeptabel |
| „Papier leer" / „Deckel offen" kommen im POST an | Drucker-Status ist auswertbar | Warnung „Bon nicht gedruckt" in der Annahme ist baubar (Skill `fluvo-printing`) |
| Doppeldruck nach Stromausfall | Idempotenz muss der **Server** sichern | Anforderung an Modul `printing` — steht schon im Skill, jetzt mit Beleg |
| Stufe 3, Fälle 2/4/5 drucken (Chrome) nach einmaliger Erlaubnis | lokaler Druck geht **ohne Zertifikat** in Chrome/Android | Q8 für Android/Chrome beantwortet; Empfehlung „Annahme-Gerät = Android/Chrome" prüfen |
| Fälle 6/7 (Safari) scheitern | erwartet | iPad als Annahme-Gerät nur mit C1/C2 oder App — Entscheidung für Sirat, berührt BYOD |
| Seite lädt ohne Internet gar nicht | Service Worker, nicht Drucker | an Skill `fluvo-offline-pwa` — getrennt vom Druck-Ergebnis festhalten |
| Alles in B scheitert, C1 geht | TLS auf dem Drucker ist Pflicht | Onboarding-Aufwand steigt — `architect` bewertet C2-Automatisierung gegen C3 |
| B und C1–C4 scheitern alle | [FEST] „Offline-First für den Bon" ist mit diesem Drucker/Weg nicht haltbar | **sofort an Sirat** — `architect` einschalten, Alternative: kleiner lokaler Druck-Helfer oder anderer Hersteller |

## Rahmen

- Testbons enthalten nur erfundene Daten (keine echten Namen, Adressen, Rufnummern).
- Wegwerf-Skripte bleiben unter `tools/risikotests/ap-002/`, kommen nie ins Produkt und enthalten keine Zugangsdaten.
- Passwort der Drucker-Weboberfläche ändern und **nicht** in diese Datei schreiben.
- Nach dem Test: CloudPRNT-URL im Drucker wieder leeren, damit er nicht dauerhaft einen toten Server abfragt.

## Nach dem Test

Ausgefüllte Tabellen an Jarvis. Daraus entstehen:

1. Ergebnis-Abschnitt in AP-002 und ADR-Entwurf (mit `architect`: CloudPRNT bestätigt? welcher lokale Weg? welche Annahme-Geräte?)
2. Q8 in `docs/open-questions.md` beantwortet oder mit nächstem Schritt versehen
3. Gemessene Zeiten → K8 (NFA), Ausfall-Verhalten → K9 (Ausfall-Tabelle), Gerätefrage → K10
4. Skill `fluvo-printing` um die belegten Befunde ergänzen (Chrome Local Network Access, Status-Felder, Verhalten nach Stromausfall)

## Quellen (abgerufen 2026-09-21)

- [S1] Star — mC-Print3 Online Manual, CloudPRNT: https://www.star-m.jp/products/s_print/mcprint3/manual/en/settings/settingsCloudPRNT.htm
- [S2] Star — mC-Print3 Online Manual, WebPRNT und SSL/TLS: https://www.star-m.jp/products/s_print/mcprint3/manual/en/settings/settingsWebPRNT.htm
- [S3] Star — TSP100IV Online Manual, CloudPRNT: https://www.star-m.jp/products/s_print/oml/tsp100iv/manual/en/convenientFunctions/settingsCloudPRNT.htm
- [S4] Star CloudPRNT Protocol Guide (POST/GET/DELETE, jobReady): https://star-m.jp/products/s_print/sdk/StarCloudPRNT/manual/en/protocol-guide.html
- [S5] Star CloudPRNT Protocol Guide — Polling Time: https://star-m.jp/products/s_print/sdk/StarCloudPRNT/manual/en/protocol-reference/http-method-reference/server-polling-post/polling-timing.html
- [S6] Star — WebPRNT vs. CloudPRNT: https://starmicronics.com/blog/webprnt-cloudprnt-comparison/
- [C1] Chrome for Developers — Local Network Access (Berechtigung ab Chrome 142, Mixed-Content-Ausnahme für private IP / `.local`): https://developer.chrome.com/blog/local-network-access

**Nicht aus Quellen belegt, im Test zu klären:** Standard- und Mindestwert des Polling-Intervalls · genaue Menüpfade der Weboberfläche je Firmware · ob Local Network Access auf Android und in installierten PWAs gleich funktioniert · WebPRNT-Unterstützung der konkreten TSP100IV-Variante · Tastenfolge für den Selbsttest (im Handbuch des Modells gegenprüfen).
