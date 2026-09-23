---
name: fluvo-ui-design
description: Design-Richtung für fluvo-Oberflächen vor dem ersten Screen festlegen — Zweck, Zielgruppe, Ton, ein prägendes Detail, Constraints; Vorgaben je Oberfläche (Annahme-Tablet im Stress, Inhaber-Bereich am Handy, Betreiber-Zentrale, Restaurant-Website); Tokens statt Einzelfarben; Checkliste. Laden bei jeder Arbeit an Oberflächen in apps/web-staff, apps/site oder an K10.
---

# Design-Richtung für fluvo-Oberflächen

> Abgeleitet aus affaan-m/ECC (MIT), `skills/frontend-design-direction/SKILL.md`, angepasst für fluvo 2026-09-23.

fluvo-Oberflächen sind **Werkzeuge**, keine Schaufenster. Wer sie bedient, tut das mehrmals pro Minute, oft unter Zeitdruck, ohne Schulung, mit wechselndem Personal (Briefing §1, §9.9). Bevor ein Screen entsteht, wird die Richtung festgelegt — sonst entsteht das, was Generatoren immer bauen: Karten in Karten, Verläufe, Hero-Texte.

## Vor dem Bauen: fünf Fragen

1. **Zweck** — Welche eine Aufgabe erledigt dieser Screen? („Bestellung in unter 60 Sekunden anlegen", nicht „Bestellungen verwalten".)
2. **Zielgruppe** — Wer wiederholt diesen Ablauf, und was muss er **zuerst** sehen? Annahme-Person, Inhaber, Betreiber, Endkunde — jede Gruppe hat einen anderen Blick.
3. **Ton** — ausdrücklich benennen: dicht, ruhig, scannbar für Werkzeuge; freundlich, klar, provisionsfrei für die Website. Kein „modern" ohne Inhalt.
4. **Ein prägendes Detail** — genau eine bewusste Gestaltungsidee, die den Screen wiedererkennbar macht (z. B. die Bestellart als farbige Kante je Karte, die Zeit-Raster-Auswahl als eine Zeile großer Kacheln). Nicht mehr als eine.
5. **Constraints** — React + Vite PWA (`apps/web-staff`) oder Astro (`apps/site`); Offline-Zustände (Skill `fluvo-offline-pwa`); WCAG 2.2 AA (Skill `fluvo-accessibility`); bestehende Tokens (Skill `fluvo-design-system`); Tablet quer, Handy hoch, alte Geräte.

Die Antworten stehen in zwei bis fünf Sätzen im AP oder im K10-Artefakt, bevor die erste Komponente entsteht.

## Vorgaben je Oberfläche

### Annahme-Tablet (`apps/web-staff`, FA-05, FA-19, FA-14)

Die Annahme-Person hält das Telefon am Ohr, ein Gast steht am Tresen, die Küche ruft. Der Screen muss das aushalten.

- **Dicht, ruhig, scannbar.** Alles Wesentliche ohne Scrollen sichtbar; eine klare Leserichtung; keine Dekoration, kein Weißraum um seiner selbst willen.
- **Große Tippflächen:** mindestens 48 px (Skill `fluvo-offline-pwa`), lieber mehr für die Hauptaktionen. Abstand zwischen Zielen, damit Fehltipps nicht die Nachbaraktion auslösen.
- **Ein Fingertipp je Aktion.** Bestellart wählen, Artikel antippen, Rasterzeit wählen (15er/10er-Raster als Kacheln, kein Freitext — FA-05), anlegen. Keine versteckten Gesten, kein langes Drücken, keine Menüs zweiter Ebene für Kernaktionen.
- **Ein Hauptknopf je Ansicht**, unten rechts erreichbar, stabil an derselben Stelle.
- **Offline-Zustand sichtbar**, dauerhaft, nicht als Toast: „Offline — 3 Aktionen warten". Wartende Aktionen sind in der Liste als „wartet" erkennbar; vorläufige Summen sind als vorläufig markiert (FA-14).
- **Signal „neue Bestellung" ist nicht übersehbar:** eine KI-Bestellung, die quittiert werden muss (FA-01), kündigt sich mit Ton **und** deutlicher, bleibender optischer Markierung an — nicht nur mit Farbe (Skill `fluvo-accessibility`). Von Hand angelegte Bestellungen erzeugen kein Signal (FA-05).
- **Hinweise, keine Sperren:** Mindestbestellwert, Liefergebiet, Annahmestopp erscheinen als klarer Hinweis mit „trotzdem anlegen" (FA-05) — sichtbar, aber ohne den Ablauf zu blockieren. Abgelehnte Aktionen des Servers verschwinden nie lautlos.
- **Aktive Person immer sichtbar** (FA-19: ein Tablet, Wechsel per PIN) — wer gerade angemeldet ist, steht oben, der Wechsel ist ein Tipp.
- **Beträge in Cent formatiert anzeigen**, aber nie im Client rechnen (Regel 5; `.claude/rules/security.md`).

### Inhaber-Bereich am Handy (ADR 0011)

Der Inhaber bestätigt Abschlüsse auch vom eigenen Handy, oft unterwegs. Hochformat, eine Hand, kleine Fläche.

- Soll-Betrag, gemeldeter Betrag, Kommentar und Bestätigung in **einer Spalte**, groß, ohne Scrollen zwischen Zahl und Knopf (ADR 0007/0011: Abschluss in zwei Schritten).
- Bestätigen ist eine bewusste Handlung: deutlicher Knopf, klare Beschriftung, kein Wischen.
- Log und Tagesübersicht als Listen, chronologisch, mit Person und Uhrzeit — lesbar, nicht als Dashboard-Kacheln.

### Betreiber-Zentrale (FA-22)

- **Ampel je Restaurant** (Rot / Gelb / Information) mit Grund im Klartext („Drucker offline"), Werte darunter, Minutentakt. Farbe nie allein — immer Text und Symbol dazu.
- **Keine Bestellinhalte, keine Kundendaten** — die Zentrale zeigt Zustand, nicht Inhalt. Wer hier ein „Bestellungen öffnen" entwirft, verstößt gegen FA-22.
- Störungs-Push ist Pflichtanzeige: sichtbar, bis bestätigt.

### Restaurant-Website (`apps/site`, Astro)

- Provisionsfrei bestellen in wenigen Schritten: Karte → Warenkorb → Angaben → „zahlungspflichtig bestellen" (Button-Lösung, Skill `fluvo-compliance`).
- Erste Ansicht ist die **Speisekarte**, nicht ein Hero-Bild. Allergene je Artikel vor dem Kauf sichtbar (LMIV).
- Ein Template für alle Tenants; Restaurant-Identität über Tokens (Farbe, Logo, Schrift) — nicht über eigene Layouts je Restaurant.
- Keine extern geladenen Schriften, keine Tracker, nur technisch notwendige Cookies.

## Umsetzungsregeln

- **Tokens statt Einzelfarben:** jede Farbe, jeder Abstand, jede Schriftgröße kommt aus den CSS-Variablen des Design-Systems (Skill `fluvo-design-system`). Kein Hex-Wert in einer Komponente.
- **Bestehende Komponenten zuerst.** Ein neues Muster erst, wenn das vorhandene nachweislich nicht trägt.
- **Stabile Maße:** Listen, Kacheln, Zähler, Werkzeugleisten springen nicht, wenn Texte länger werden oder Zustände wechseln. Lange Artikelnamen umbrechen sauber.
- **Bewegung nur als Signal:** Zustandswechsel (Bestellung angelegt, Aktion gesendet) darf kurz sichtbar sein; Dekorationsanimation gibt es nicht. `prefers-reduced-motion` beachten.
- **Keine Landingpage-Optik für Werkzeuge:** keine Verläufe, keine Blobs, keine Karten in Karten, keine übergroßen Überschriften, kein Text, der erklärt, was der Knopf daneben tut.
- **Keine neue Abhängigkeit** für eine Gestaltungsidee ohne Rückfrage (`.claude/rules/typescript.md`).

## Checkliste „vor dem ersten Screen"

- [ ] Die fünf Fragen sind beantwortet und im AP oder K10 notiert.
- [ ] Der erste Blick zeigt die Aufgabe (Bestellliste, Speisekarte, Ampel) — nicht eine Begrüßung.
- [ ] Die Hauptaktion ist mit einem Fingertipp erreichbar und steht stabil an einer Stelle.
- [ ] Offline-, Lade- und Fehlerzustand sind entworfen, nicht nur der Schönwetterfall.
- [ ] Jeder Zustand (neu, wartet, abgelehnt, storniert, Vorbestellung) hat Text oder Symbol — nicht nur Farbe.
- [ ] Alle Werte kommen aus Tokens; hell und dunkel sind beide bedacht.
- [ ] Der Screen wurde in Gedanken bei Sonnenlicht, mit fettigen Fingern und mit einem Anrufer am Ohr durchgespielt.
- [ ] Keine Personendaten an Stellen, die geloggt oder in URLs landen könnten (`.claude/rules/security.md`).

## Abgrenzung zu K10

Dieser Skill legt die **Richtung** fest. Was konkret **wo** auf dem Screen steht — Wireframes für Annahme, Inhaber, Zentrale, Bon-Layout — gehört nach **K10** (`docs/konzept/oberflaechen/`, AP-012) und wird mit Sirat erarbeitet (`/konzept`, `requirements-engineer`). Nichts erfinden, was nur der Pilot weiß (Tresen-Situation, Lichtverhältnisse, Gerät): fragen.

## Verwandt

- `fluvo-accessibility` — Barrierefreiheit als Bauvorgabe
- `fluvo-design-system` — Tokens, Prüfliste für Styling-PRs
- `fluvo-offline-pwa` — Offline-Zustände, Warteschlange, Bedienbarkeit
- Agenten `a11y-architect`, `react-reviewer`
