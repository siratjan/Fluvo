# 0007 · Storno durch die Annahme, Abschluss in zwei Schritten, Kundenstamm — Entscheidungen aus K1 vom 2026-09-21

- **Status:** entschieden (Sirat, im Gespräch) — ersetzt in ADR 0006 den Punkt „Storno nur Inhaber" der Rechte-Trennung; alles Übrige aus 0006 gilt weiter
- **Datum:** 2026-09-21
- **Stufe:** [ENTSCHIEDEN Sirat] (fachlich, im Rahmen von K1 / AP-003) — nicht [FEST]
- **Entschieden von:** Sirat

## Anlass

Beim Gegenlesen der 20 FA-Entwürfe (`docs/konzept/anwendungsfaelle/_gegenlesen-K1.md`, Teil B) fielen Lücken an den Nähten zwischen den Fällen auf. Sirat hat sie im Gespräch beantwortet (Mitschrift Runden 15–18). Eine Antwort ändert eine Entscheidung aus ADR 0006 (Storno), deshalb dieser ADR.

## Entscheidung

- **Ändern und Stornieren** (Runden 17, 18 — ändert Runde 11): Die **Annahme** darf Bestellungen ändern **und stornieren**; eine Vorab-Bestätigung des Inhabers ist nicht nötig. Abgesichert wird das durch ein **Log für den Inhaber** (wer, was, wann) statt durch ein Vier-Augen-Prinzip. **Fahrer** dürfen weder ändern noch stornieren. Die KI ändert und storniert weiterhin nie ([FEST 11]).
- **Storno nach erfasster Zahlung** (Runde 19): nur der **Inhaber**. Vor der Zahlung storniert die Annahme frei. Fiskalische Behandlung weiter Q3 / Steuerberaterin.
- **Abweichung beim Abschluss** (Runde 19): Meldet der Mitarbeiter einen anderen Betrag als angezeigt, ist ein **Kommentar Pflicht**.
- **Geldrechte bleiben beim Inhaber:** Kassensturz und Tresen-Abschluss bestätigen, Schicht mit Abweichung begründet beenden, Ende ohne Bezahlung („nicht zustellbar", „nie abgeholt") bestätigen, Wechselgeld-Ausgabe am Schichtbeginn bestätigen. Preise, Allergene, Steuersatz: weiter nur der Inhaber.
- **Inhaber-Bereich** (Runde 16): keine Vertretung. Der Inhaber öffnet mit seinem Code am Hauptgerät im Laden einen eigenen Bereich und bestätigt dort. Ist er nicht da, bleibt der Vorgang offen. Kassiert oder fährt der Inhaber selbst, bestätigt er sich selbst; das wird als Selbstbestätigung protokolliert (Runde 15).
- **Abschluss in zwei Schritten** (Runden 17, 18): Das System zeigt den zurückzugebenden Betrag. Der Mitarbeiter bestätigt ihn **oder** meldet einen abweichenden Betrag mit Kommentar; danach bestätigt der Inhaber. Der vom Server gerechnete Betrag wird nie überschrieben.
- **Tagesübersicht für den Inhaber** (Runde 16): je Tag sichtbar, was wann bestellt und was wann von wem geändert oder storniert wurde.
- **Kundenstamm** (Runden 15, 17, 18 — vorbehaltlich Bestätigung durch den Anwalt, Q10): Bei der Bestellung wird je Restaurant ein Kundeneintrag (Rufnummer, Name, Adresse) gespeichert. Die KI **fragt** bei der ersten Bestellung, ob sie sich die Adresse merken soll (Einwilligung); gleiches bei der Annahme von Hand. Löschfrist vorerst **12 Monate** nach der letzten Bestellung. Bei der Wiedererkennung nennt die KI die **volle Adresse** zur Bestätigung.
- **Gespräch** (Runde 15): Die KI fragt immer nach dem Namen; ohne übermittelte Rufnummer fragt sie nach der Nummer. Fragen zu einer laufenden Bestellung („Wo bleibt mein Essen?") gibt sie an einen Mitarbeiter weiter.
- **Betrag** (Runde 15): Maßgeblich ist, was in der App steht, nicht der Bon.
- **Übergabe** (Runde 16): Auch eine bezahlte Bestellung bleibt sichtbar, bis sie bei der Übergabe als fertig markiert wird.
- **Vorbestellungen** sind in den Abschluss-Listen als solche markiert (Runde 15).

### Nachtrag vom selben Tag (Runden 20–21)

- **Storno verlangt einen Grund** (kurze Auswahl); die Küche bekommt einen deutlich gekennzeichneten **Storno-Bon** (Runde 20).
- **Rechte der Annahme präzisiert** (Runde 20, schärft „Speisekarte" und „Zonen" aus ADR 0006): An der Speisekarte nur **„heute aus"** an/ab; an den Zonen nur **Lieferzeit und Abholzeit**. Artikel/Optionen, Liefergebühr, Mindestbestellwert, Zonen anlegen/entfernen: nur Inhaber.
- **„Heute aus"** setzen Annahme und Inhaber zurück; es springt am nächsten Geschäftstag von selbst zurück (Runden 20, 21).
- **Änderungen** (Runde 21): Adresse ändern und Lieferung ↔ Abholung wechseln ist erlaubt (Neuberechnung, neuer Bon); fällt die Summe unter den Mindestbestellwert, warnt das System nur; Nachbestellung nach bezahltem „Hier essen" ist eine neue Bestellung.
- **Bestellschluss = Ladenschluss** als Standard (Runde 21).
- **Annahmestopp** („wir nehmen nichts mehr an", von Hand geschaltet; Runde 21 benannt, **Runde 23 entschieden**): zwei Schalter — „keine Lieferung mehr" und „gar nichts mehr"; die KI geht ran, sagt freundlich ab und bietet eine Vorbestellung an, wenn zur Wunschzeit Betrieb ist; schalten dürfen Annahme und Inhaber; Ende von Hand, spätestens am Tagesende von selbst. Abgrenzung: „KI aus" = Personal nimmt selbst an. Entwurf: FA-23.
- **Mindestbestellwert** bezieht sich auf den **Warenwert ohne Liefergebühr** (Runde 23).

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Storno nur Inhaber (ADR 0006) | Vier-Augen-Prinzip bei Geld | Inhaber nicht immer da → Kunde storniert, es wird trotzdem gekocht und geliefert; Sirat: operative Aufgaben macht der Kollege am Telefon |
| Annahme hält nur an, Inhaber storniert später (Vorschlag Jarvis) | behält die Vorab-Kontrolle | zusätzlicher Zustand, zusätzlicher Handgriff; von Sirat nicht gewählt |
| Vertretung mit Geldrechten | Abschlüsse nie über Nacht offen | Sirat: nur der Inhaber mit Code |
| Adresse erst nach Namensabgleich, ohne Hausnummer (Empfehlung Hausjurist) | schützt bei geteilter, neu vergebener oder gefälschter Nummer | Sirat: volle Adresse, einfacher für den Kunden |
| Hinweis mit Widerspruch statt Frage (Weg A) | kein Zusatzsatz beim Erstkontakt | Aufsichtsbehörden verlangen für dauerhafte Kundenkonten eine bewusste Entscheidung; Sirat folgt der Empfehlung (Weg B) |

## Folgen

- **Risiko Storno ohne Vorab-Kontrolle:** Ein Storno nach dem Kassieren wäre ein Weg, Bargeld zu unterschlagen. Gegenmittel: Log und Tagesübersicht, und seit Runde 19 die Regel, dass **nach erfasster Zahlung nur der Inhaber** storniert. K3 (Storno-Pfad, bis zu welchem Zustand) und K9 (Rechte-Matrix) setzen das um; die fiskalische Seite bleibt bei der Steuerberaterin (Q3).
- **Risiko volle Adresse:** vom Hausjuristen als zu offen eingeschätzt → als Frage an den Anwalt (Q10). Technisch so bauen, dass der Umfang der Ausgabe eine Einstellung ist, kein Umbau.
- **K1:** FA-01, FA-02, FA-05 (Frage „Adresse merken?", Löschfrist), FA-09, FA-11, FA-15 (Storno-Recht), FA-10, FA-16 (Schritt des Mitarbeiters mit abweichendem Betrag und Kommentar), FA-20 (AVV und Datenschutz-Pflichten des Restaurants vor „startklar").
- **K4:** fester Satz für die Einwilligungsfrage; Name/Nummer erfragen; sechster Eskalationsgrund.
- **K5:** Kundenstamm mit Einwilligungs-Protokoll (Anruf-ID, Zeit, Fragetext, Antwort — ohne Audio) und Löschlauf; Vorschlag des Hausjuristen „drei Datenklassen" (Kundenstamm, Lieferdaten, Fiskaldaten ohne Klarnamen) berührt Briefing §5.2 (zwei Klassen) → `architect` + Steuerberaterin, nicht entschieden.
- **K9:** Rechte-Matrix: Storno bei Annahme und Inhaber; Fahrer nur lesen; Inhaber-Bereich mit Code.
- **K10:** Inhaber-Bereich, Tagesübersicht/Log, Abschluss-Bildschirm mit „bestätigen / abweichend melden + Kommentar".

## Wann neu bewerten

Wenn der Anwalt zu Q10 anders rät (Einwilligung, Löschfrist, Vorlesen der Adresse), wenn die Steuerberaterin zu Storno nach Zahlung (Q3) Vorgaben macht, oder wenn im Piloten Fehlbeträge mit Stornos zusammenfallen.

**Nachtrag 2026-09-22:** siehe ADR 0009 (kein Storno-Bon — Küche per Zuruf; Storno-Grund bei jedem Storno Pflicht; kein eigenes Bestellschluss-Feld — früher Schluss über den Annahmestopp).

**Nachtrag 2026-09-22:** siehe ADR 0010 („Ende ohne Bezahlung" darf auch die Annahme bestätigen — mit Pflichtgrund, protokolliert, im Inhaber-Log; im Piloten der Fall „nie abgeholt").

**Nachtrag 2026-09-22:** Speisekarte-Rechte der Annahme präzisiert (Mitschrift Runden 27, 47, 48): Artikel/Optionen **entfernen** und „momentan aus" ja, **anlegen** faktisch nein (kein Preisrecht) — siehe FA-12.

**Nachtrag 2026-09-22:** siehe ADR 0011 (Wechselgeld-Ausgabe muss nicht bestätigt werden — Geldrecht entfällt; Inhaber-Bereich auch vom Handy statt nur am Hauptgerät, „keine Vertretung" bleibt).

**Nachtrag 2026-09-22:** siehe ADR 0012 (Wechselgeld außerhalb des Systems)

**Nachtrag 2026-09-23:** siehe ADR 0016 (Drei Datenklassen a/b/c). Der oben unter „Folgen · K5" genannte Hausjuristen-Vorschlag „drei Datenklassen" (Kundenstamm · Lieferdaten · Fiskaldaten ohne Klarnamen) ist **nicht** das, was jetzt entschieden wurde: ADR 0016 ergänzt die zwei Briefing-Klassen um eine dritte für **personen- und buchungsfreie Betriebsstammdaten** (c) — eine andere Dreiteilung, klar davon abzugrenzen. Der Kundenstamm bleibt Klasse (a); das Einwilligungs-Protokoll bleibt offen (Anwalt A1, Compliance-Blocker B5/B6).
