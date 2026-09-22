# 0012 · Wechselgeld wird nicht im System eingerechnet — Korrektur aus K1 vom 2026-09-22

- **Status:** entschieden (Sirat, im Gespräch) — ersetzt in ADR 0007 das Geldrecht „Wechselgeld-Ausgabe bestätigen" endgültig (in ADR 0011 bereits auf „keine Bestätigung" reduziert) und in ADR 0011 den Punkt „Wechselgeld ohne Bestätigung — Startwert je Restaurant" (der Startwert existiert nicht mehr); ersetzt außerdem den festen „Wechselgeld-Start je Börse" aus Runde 12. Alles Übrige aus 0007 und 0011 gilt weiter.
- **Datum:** 2026-09-22
- **Stufe:** [ENTSCHIEDEN Sirat] (fachlich, im Rahmen von K1 / AP-003) — nicht [FEST]
- **Entschieden von:** Sirat

## Anlass

Beim Durchgehen der Onboarding-Reihenfolge (FA-20) fragte Sirat, was der Schritt „Wechselgeld-Start" bedeutet (Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`, Runde 48). In Runde 49 hat er entschieden, das Wechselgeld ganz aus dem System zu nehmen. Das ändert die bisherige Linie: Runde 12 hatte einen **festen Wechselgeld-Start je Börse** eingeführt, ADR 0007 ein Geldrecht „Wechselgeld-Ausgabe am Schichtbeginn bestätigen", ADR 0011 hatte die Bestätigung gestrichen, den **Startwert je Restaurant** aber behalten. Dieser ADR hält fest, welche Sätze dadurch entfallen. Bestehende ADRs werden nicht umgeschrieben; die Fassung von heute gilt.

## Entscheidung

Wechselgeld wird **nirgendwo im System eingerechnet** — es gibt keinen Wechselgeld-Start, keine Einstellung je Restaurant und keinen Wechselgeld-Anteil in irgendeinem Abschluss (Runde 49). Wer Wechselgeld braucht (Annahme-Person, Fahrer), regelt das **separat und für sich, außerhalb von fluvo**. Das System kennt beim Bargeld nur die **von einer Person bar kassierten Beträge**.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Startwert je Restaurant, ohne Bestätigung (ADR 0011) | ein Wert einmal eingestellt; Abschluss rechnet Start + Kassiertes | zusätzliches Stammdaten-Feld und Onboarding-Schritt, den keiner erklären konnte; Startwert stimmt selten mit der realen Börse überein; Sirat: raus damit |
| Startwert je Schicht eintippen | Abschluss trifft den tatsächlichen Anfangsbestand der Schicht | Handgriff bei jedem Schichtstart; Fehleingaben verfälschen den Fehlbetrag; mehr bewegliche Teile für einen Solo-Gründer |
| Kein Wechselgeld im System (Sirats Wahl) | einfachster Weg: kein Feld, kein Schritt, kein Startbetrag; Abschluss = Summe des bar Kassierten | der ausgewiesene „zurückzugebende" Betrag enthält den Wechselgeld-Anfangsbestand nicht; Fehlbeträge lassen sich weniger genau zuordnen, weil der reale Kassenbestand einen Startbestand außerhalb des Systems hat |

Abwägung: Einfachheit gegen Nachvollziehbarkeit von Fehlbeträgen. Sirat hat der Einfachheit den Vorzug gegeben; die Nachvollziehbarkeit des Startbestands liegt damit außerhalb von fluvo.

## Folgen

Alle Folgen unten sind aus der Entscheidung abgeleitet (Lesart aus Runde 49), nicht selbst entschieden:

- **K1 · FA-16 (Abschluss je Mitarbeiter):** zeigt nur noch die **Summe der von dieser Person bar kassierten Beträge** — das ist der zurückzugebende Betrag; kein Wechselgeld-Start als Summand. Die „eigene Börse" bleibt als Zuordnung *Kassieren → Person*, aber **ohne Startbetrag**. Vorbedingung „Wechselgeld-Start" streichen.
- **K1 · FA-19 (Schicht beginnen):** eröffnet die Schicht **ohne Startbetrag**; kein Bezug mehr auf einen Wechselgeld-Start.
- **K1 · FA-20 (Onboarding):** der Schritt „Wechselgeld-Start" **entfällt** aus der Reihenfolge.
- **K1 · FA-15:** Bargeld-/Abschlusslogik ohne Startbetrag nachziehen (Zuordnung Kassieren → Person bleibt).
- **K1 · FA-10 / FA-08 (Fahrer-Kassensturz, zurückgestellt ADR 0008):** **vorgemerkt** — gleiches Muster (nur kassierte Beträge, kein Startbetrag), wenn der Fahrer-Teil wieder aufgegriffen wird.
- **K5 (Datenwörterbuch):** **kein Feld** für Wechselgeld-Start / Wechselgeld-Anfangsbestand anlegen; falls in einem Entwurf vorhanden, entfernen.
- **K9 (Rechte-Matrix):** das Geldrecht „Wechselgeld-Ausgabe bestätigen" ist damit endgültig gegenstandslos (in ADR 0011 bereits gestrichen).
- **K10 (Abschluss-Bildschirm):** zeigt nur bar kassierte Summe und die Bestätigung/Abweichung; keine Wechselgeld-Zeile, kein Startbetrag.
- **Q2 (Steuerberaterin) — Prüfpunkt, nicht entschieden:** Ein Kassenbuch muss unter Umständen den **Anfangsbestand der Kasse** (Wechselgeld) kennen. Da fluvo diesen Anfangsbestand nicht führt, ist mit der Steuerberaterin zu klären, ob das für die Kassenführung des Restaurants ausreicht oder der Anfangsbestand außerhalb von fluvo dokumentiert werden muss. Nur als Prüfpunkt aufnehmen, hier nicht entscheiden.

## Wann neu bewerten

Wenn im Piloten **Fehlbeträge nicht erklärbar** sind, weil der Anfangsbestand der Börse außerhalb des Systems liegt (dann Startwert je Restaurant oder je Schicht erneut erwägen) · wenn die **Steuerberaterin einen Anfangsbestand** in der Kassenführung verlangt (Q2).
