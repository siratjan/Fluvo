# 0013 · Internetausfall im Piloten — Papier statt Offline-Warteschlange, KI-Annahme pausiert automatisch

- **Status:** entschieden (Sirat, im Gespräch) — dokumentierte Abweichung vom Briefing für den ersten Piloten; **keine** Änderung des [FEST]-Punkts selbst. Gleiches Muster wie ADR 0008 (Fahrer-Teil): das Briefing gilt, der Pilot nutzt eine Teilmenge.
- **Datum:** 2026-09-22
- **Stufe:** [ENTSCHIEDEN Sirat] (fachlich, K1 / AP-003) — nicht [FEST]. Berührt Briefing [FEST 18] und §5.5 (Offline-First, Warteschlange, Nachspielen) sowie §5.4 (Voice-Fallback); [FEST 18] wird **nicht** geändert, siehe unten.
- **Entschieden von:** Sirat

## Anlass

Bei der Einzeldurchsicht von FA-14 (Internet fällt im Laden aus) sind zwei Fragen aufgeschlagen, die das Briefing so nicht beantwortet (Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`, Runden 45 und 46):

- **Befund Jarvis (Runde 45):** Ein Internetausfall **im Laden** stoppt die KI **nicht** — sie läuft in der Cloud, die Rufumleitung im Telefonnetz. Ohne Gegenmaßnahme nähme die KI weiter Bestellungen an, während Annahme-Tablet und Drucker (CloudPRNT braucht Internet) nichts davon sehen. Die Annahme aus Briefing §5.4 und dem FA-14-Entwurf „das Telefon klingelt normal durch" / „KI-Telefonie ruht" ist damit falsch.
- **Runde 46:** Wie arbeitet das Personal beim Ausfall praktisch — am Tablet in der Offline-Warteschlange ([FEST 18], §5.5) oder ganz auf Papier? Und werden die auf Papier angenommenen Bestellungen samt Bargeld nachgetragen?

Sirat hat den ADR ausdrücklich angefordert, weil die zweite Entscheidung eine Abweichung vom im Briefing beschriebenen Arbeitsweg ist.

## Entscheidung

1. **Automatische KI-Pause statt „klingelt durch" (Runde 45, Variante A):** Merkt der **Server**, dass das Annahme-Gerät eines Restaurants nicht mehr erreichbar ist, **pausiert er die KI-Annahme automatisch** — die KI geht ran und **sagt freundlich ab** (wie beim Annahmestopp, FA-23), bis das Gerät wieder online ist. Sie nimmt **keine** Bestellung an, die der Laden nicht sehen kann. Das **korrigiert** die Annahme im Briefing §5.4 / [FEST 18] („Fallback: das Telefon klingelt normal durch") und im FA-14-Entwurf. Die Schwelle, ab wann „nicht erreichbar" gilt, ist eine Zahl → K8; ob die KI dabei eine Vorbestellung anbietet → K4; die Pause wird als Ereignis protokolliert und im Betreiber-Monitoring (FA-22) gezeigt.

2. **Papier statt Warteschlange im Piloten (Runde 46, Variante B):** Beim Ausfall schaltet das Personal Annahme und KI **selbst** aus (über das Inhaber-/Mitarbeiter-Handy mit Mobilfunk, da das Tablet offline ist — FA-13 „KI aus" bzw. Annahmestopp FA-23) und nimmt Bestellungen **sofort auf Papier** auf — **keine Karenzzeit**, in der man am Tablet in der Warteschlange weiterarbeitet. Die auf Papier angenommenen Bestellungen **und das dabei kassierte Bargeld werden nicht ins System nachgetragen**; der Abschluss/die Abrechnung dieses Tages wartet bzw. läuft über die Zettel (der Inhaber prüft sie von Hand). Die automatische KI-Pause aus Punkt 1 bleibt als **Sicherheitsnetz**, falls niemand von Hand schaltet.
   - **[FEST 18] wird nicht geändert; §5.5-Satz „neue manuelle Bestellung wird nachgespielt" gilt im Piloten nicht als Arbeitsweg.** Die Offline-Warteschlange ([FEST 18], §5.5) **bleibt gebaut**: laufende Bestellungen bleiben abrufbar, Aktionen landen mit Idempotenz-Schlüssel in der Warteschlange und werden bei Netz-Rückkehr einmalig nachgespielt. Sie ist im ersten Piloten aber **nicht der geplante Arbeitsweg**, sondern technisches Sicherheitsnetz. Dieselbe Logik wie ADR 0008 (Fahrer-Teil): Briefing gilt, Pilot nutzt eine Teilmenge.

3. **Bon ohne lokalen Druck (AP-002/Q8, Ende B):** Kann der Drucker ohne Internet nicht lokal drucken, bleibt die Bestellung am Tablet sichtbar, der Bon wird **nachgedruckt**, sobald das Netz zurück ist; die Küche bekommt in der Zwischenzeit einen **handgeschriebenen Zettel**. Es wird **kein** Bon still als „gedruckt" vermerkt. Ob lokaler Druck ohne Internet technisch geht (Ende A), bleibt an AP-002 offen.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Offline-Warteschlange als Arbeitsweg mit Nachspielen (Briefing §5.5 wörtlich) | ein durchgängiger digitaler Weg; Bon, Summen und Abschluss stimmen automatisch; nichts geht verloren | im Piloten viele neue Teile auf einmal (Offline-PWA, Konfliktregeln, Nachspielen) müssten belastbar sein, bevor überhaupt jemand fluvo im Alltag nutzt; Sirat: beim Ausfall lieber wie früher auf Papier, kein Vertrauen ins Tablet in genau diesem Moment |
| Papier-Bestellungen und Bargeld später nachtragen (Variante A, Runde 46) | Abschluss je Mitarbeiter (FA-16) und Inhaber-Log stimmen auch für Ausfalltage | zusätzlicher, fehleranfälliger Nacherfassungs-Schritt unter Zeitdruck; doppelte Wahrheit (Papier + System) mit Risiko von Geister-/Doppelbestellungen; Sirat: „das ist okay", nicht nachtragen |
| KI beim Ausfall weiter annehmen lassen (Variante B aus Runde 45) | kein Umschalten nötig, KI läuft ja in der Cloud weiter | die KI legte Bestellungen an, die Tablet und Drucker im Laden nicht sehen — unsichtbare Zusagen, kein Bon, nichts in der Küche; von Sirat verworfen zugunsten der automatischen Pause (Variante A) |

## Folgen

- **Bauaufwand Offline-PWA im Piloten kleiner priorisieren, aber nicht streichen:** Die Warteschlange, der Offline-Cache laufender Bestellungen und das Nachspielen ([FEST 18], §5.5) bleiben gebaut, weil laufende Bestellungen bei Ausfall abrufbar sein müssen (Mindestanforderung Sirat, Runde 13). Sie müssen im Piloten aber nicht der belastbare Alltags-Arbeitsweg sein — der Reifegrad „Personal arbeitet stundenlang produktiv in der Warteschlange" ist im Piloten nicht gefordert. Priorität entsprechend niedriger, nicht null.
- **Die automatische KI-Pause ist neu und muss gebaut werden:** Server-seitige Erkennung des nicht erreichbaren Annahme-Geräts, automatisches Absagen der KI wie FA-23, Protokoll-Ereignis, Anzeige im Monitoring. Abhängig von AP-001 (Telefonie). Schwelle → K8, Vorbestellungs-Frage → K4.
- **K1:** FA-14 (Nachbedingung, Normalablauf Schritt 3 „kann", Ausnahmen 1a/4a, „Darf nicht", Regeln, Testszenarien — bereits im Entwurf abgebildet). FA-13 (neue Ausnahme „automatische Pause" bei offline-Gerät; Personal schaltet beim Ausfall selbst aus). FA-16 (an Papiertagen deckt der Abschluss je Mitarbeiter nur die im System kassierten Beträge; Papier-Bargeld liegt außerhalb). FA-22 (KI-Pause im Betreiber-Monitoring sichtbar).
- **K8 (Zahlen):** Schwelle „Gerät nicht erreichbar" (z. B. wenige Minuten) und Offline-Pufferdauer als Zahl festlegen.
- **K9 (Ausfall-Tabelle):** Verhalten bei Internetausfall (KI-Pause, Papier-Betrieb, kein Nachtrag) in die Ausfall-/Fehlerbehandlungstabelle aufnehmen.
- **K11 (Pilot-Kriterien):** Ausfalltage zählen **nicht** gegen fluvo — an Tagen mit Papier-Betrieb wird die Alltagstauglichkeit nicht an fluvo gemessen.
- **Q2 (Steuerberaterin) — Prüfpunkt, nicht entschieden:** An Ausfalltagen laufen Barumsätze auf **Papier neben fluvo**; sie sind im System nicht erfasst. Ob das für die Kassenführung des Restaurants zulässig ist und wie die TSE ohne Internet zu behandeln ist (Nachsignatur, Hinweis auf dem Bon), klärt **nur die Steuerberaterin** — hier nicht entschieden.
- **Q8 / AP-002 (Risikotest Drucker):** Ende B (kein lokaler Druck → Nachdruck + handgeschriebener Zettel) ist entschieden; ob Ende A (lokaler Druck ohne Internet) technisch geht, klärt AP-002.
- **Briefing §5.5 — Vorschlag, nicht ins Briefing geschrieben:** Ein erläuternder Hinweis könnte dort lauten: *„Die Warteschlange und das Nachspielen sind gebaut und garantieren, dass laufende Bestellungen abrufbar bleiben und nichts verloren geht. Im ersten Piloten ist beim Internetausfall der Papier-Betrieb der geplante Arbeitsweg; die Warteschlange dient als technisches Sicherheitsnetz, nicht als produktiver Alltagsweg. Die KI-Annahme wird bei nicht erreichbarem Annahme-Gerät automatisch pausiert (statt ‚Telefon klingelt durch')."* Das Briefing ändert nur Sirat; bis dahin gilt dieser ADR als dokumentierte Abweichung.

## Wann neu bewerten

Nach dem Piloten (Warteschlange als produktiver Arbeitsweg erneut erwägen) · wenn Ausfälle beim Pilot-Restaurant häufig sind (dann lohnt der Ausbau des Offline-Arbeitswegs, damit nicht regelmäßig auf Papier gewechselt wird) · wenn die Steuerberaterin den Nachtrag der Papier-Bestellungen/-Barumsätze oder eine bestimmte TSE-Ausfallbehandlung verlangt (dann Variante A statt „kein Nachtrag").
