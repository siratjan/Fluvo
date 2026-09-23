---
name: fluvo-accessibility
description: Barrierefreiheit als Bauvorgabe für fluvo — WCAG 2.2 AA für Website und Staff-PWA, Tablet-Besonderheiten (Sonnenlicht, Touch, Ampel ohne reine Farbcodierung), die häufigsten React-Fehler als Prüfliste, axe als Werkzeug, Muster für Testszenarien. Laden bei jeder Oberfläche, vor Review und vor jedem Release der Website.
---

# Barrierefreiheit als Bauvorgabe

> Abgeleitet aus affaan-m/ECC (MIT), `skills/accessibility/SKILL.md` und `skills/frontend-a11y/SKILL.md`, angepasst für fluvo 2026-09-23.

Maßstab ist **WCAG 2.2 Level AA** — für die Restaurant-Website (Skill `fluvo-compliance` nennt 2.1 AA als Pflicht; 2.2 schließt das ein) **und** für die Staff-PWA. Die PWA ist ein Arbeitsplatz: Wer dort nicht bedienen kann, kann nicht arbeiten. Barrierefreiheit ist deshalb keine Politur am Ende, sondern gilt ab der ersten Komponente.

## Die vier Grundsätze, auf fluvo gewendet

| Grundsatz | Bedeutet bei fluvo |
|---|---|
| **Wahrnehmbar** | Text 4,5:1 Kontrast, große Schrift und Bedienelemente 3:1; Zustände nie nur durch Farbe; Alternativtexte für Symbole; Layout überlebt 200 % Zoom und Textvergrößerung |
| **Bedienbar** | alles per Tastatur erreichbar, sichtbarer Fokus; Tippziele mind. 24 × 24 px (WCAG 2.5.8) — fluvo-Vorgabe **48 px** (Skill `fluvo-offline-pwa`); kein Wischen oder Ziehen ohne Tipp-Alternative; keine Tastaturfalle |
| **Verständlich** | gleiche Elemente an gleicher Stelle; Fehlertexte sagen, was zu tun ist; nichts zweimal abfragen, was schon eingegeben wurde |
| **Robust** | natives HTML vor ARIA; Name, Rolle, Wert für jedes Bedienelement; Statusmeldungen als Live-Region |

## Tablet und Handy im Laden

Die Annahme steht am Tresen, oft neben dem Fenster; das Inhaber-Handy ist irgendwo unterwegs (ADR 0011).

- **Kontrast bei Sonnenlicht:** Mindestwerte sind das Minimum, nicht das Ziel. Hauptaktionen und Beträge deutlich über 4,5:1; graue Schrift auf grau gibt es nicht.
- **Tastatur und Fokus auch am Tablet:** Bluetooth-Tastaturen, Scanner und Switch-Steuerung senden Tastenereignisse. Fokus-Reihenfolge folgt dem Ablauf (Bestellart → Artikel → Angaben → Zeit → Anlegen). Fokus-Ring ist sichtbar, hoher Kontrast, nie `outline: none` ohne Ersatz.
- **Screenreader-Labels** für jedes Symbol-Bedienelement („Bestellung anlegen", „Person wechseln", „Geänderten Bon drucken").
- **Ampel nie nur Farbe** (FA-22, Betreiber-Zentrale; ebenso Zustände in der Bestellliste): Rot/Gelb/Information immer mit Text („Drucker offline") und Symbol. Wer nur Grau sieht, muss dasselbe wissen.
- **Signal „neue Bestellung"** mit Ton **und** sichtbarer, bleibender Markierung **und** Live-Region — jede Person nimmt mindestens einen Kanal wahr.
- **Bewegung:** `prefers-reduced-motion` beachten; nichts blinkt dauerhaft.

## Die häufigsten React-Fehler — Prüfliste

Was in Reviews am häufigsten auffällt, in absteigender Häufigkeit:

- [ ] **Label fehlt:** jedes `<input>`, `<select>`, `<textarea>` hat ein `<label htmlFor>` mit passender `id`. Placeholder ist kein Label.
- [ ] **Fehlertext nicht verbunden:** `aria-describedby` zeigt auf die Fehlermeldung, `aria-invalid` ist gesetzt, die Meldung hat `role="alert"`.
- [ ] **Div als Knopf:** `onClick` auf `<div>`/`<span>` → stattdessen `<button type="button">`. Navigation ist `<a href>`.
- [ ] **Symbol ohne Namen:** Icon-Knopf braucht `aria-label`; das Symbol selbst `aria-hidden="true"`.
- [ ] **ARIA falsch:** `aria-label` auf Elementen ohne Rolle; `role` überschreibt native Semantik; `aria-expanded`/`aria-controls` fehlen bei Auf-/Zuklappen. Falsches ARIA ist schlechter als keins.
- [ ] **Überschriften springen** (h1 → h4).
- [ ] **Dialoge:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby`; Fokus wandert beim Öffnen hinein, bleibt drin (Tab/Shift+Tab kreisen), `Escape` schließt, Fokus kehrt zum Auslöser zurück.
- [ ] **Positiver `tabIndex`** erzeugt unvorhersehbare Reihenfolge — nur `0` oder `-1`.
- [ ] **`aria-hidden` auf fokussierbarem Element** → Tastaturfalle.
- [ ] **Dynamische Inhalte stumm:** neue Bestellung, „Aktion abgelehnt", „Offline — 3 Aktionen warten" landen in einer Live-Region (`role="status"` polite; `role="alert"` nur für Dringendes).
- [ ] **Bilder:** dekorativ `alt=""`; inhaltlich beschreibend, ohne „Bild von".
- [ ] **Farbe allein** trägt Bedeutung (rote Kante = Fehler ohne Text).

Muster für das Signal „neue Bestellung" (zeigt nur das Prinzip):

```tsx
<div role="status" aria-live="polite" aria-atomic="true">
  {pendingCount > 0 ? `${pendingCount} neue Bestellungen warten auf Quittierung` : ''}
</div>
```

## Werkzeuge

- **axe** (`@axe-core/playwright` bzw. `vitest-axe`) läuft in Komponententests und in den Playwright-Abläufen — steht in `.claude/rules/testing.md`. Kein Release der Website ohne grünen axe-Lauf.
- **ESLint `jsx-a11y`** fängt Label-, Alt- und Rollen-Fehler beim Schreiben. Fehlt das Plugin, ist das ein Befund.
- **Einmal von Hand** (Pflicht vor jedem Website-Release, Skill `fluvo-compliance`): nur Tastatur durch den Bestellablauf; Screenreader (NVDA oder VoiceOver) über Speisekarte, Warenkorb, „zahlungspflichtig bestellen"; 200 % Zoom.
- Werkzeuge finden etwa die Hälfte der Probleme. Fokus-Reihenfolge, sinnvolle Labels und Kontrast bei Sonnenlicht prüft ein Mensch.

## Testszenarien-Muster

Barrierefreiheit wird wie jedes Verhalten getestet — zuerst rot, dann grün (`.claude/rules/testing.md`). Muster je Screen, in die Testtabelle des Anwendungsfalls (Skill `konzept-anwendungsfall`) oder in den Komponententest:

| Szenario | Setup | Erwartet | Darf nicht |
|---|---|---|---|
| A11y-T1 · Nur Tastatur | Ablauf FA-05 ohne Maus/Touch | Bestellung angelegt; Fokus sichtbar an jeder Station | Fokus verschwindet; Element unerreichbar |
| A11y-T2 · Screenreader-Namen | Alle Bedienelemente der Ansicht | Jedes hat einen sinnvollen Namen | Knopf „Button" ohne Text |
| A11y-T3 · axe-Lauf | Ansicht gerendert | 0 Verstöße (impact serious/critical) | Ausnahmen ohne begründeten Kommentar |
| A11y-T4 · Zustand ohne Farbe | Ampel / Bestellliste in Graustufen | Rot, Gelb, „wartet", „storniert" unterscheidbar | Nur Farbton unterscheidet |
| A11y-T5 · Dialog | Warnung „Annahmestopp — trotzdem anlegen?" | Fokus im Dialog, Escape schließt, Fokus zurück | Hintergrund per Tab erreichbar |
| A11y-T6 · Live-Region | Neue KI-Bestellung trifft ein | Screenreader meldet; Zähler sichtbar | Nur Ton, nur Farbe |
| A11y-T7 · Zoom 200 % | Annahme-Ansicht am Tablet | Alles erreichbar, kein horizontales Scrollen für Kernaktionen | Hauptknopf außerhalb des Bildes |

Testdaten sind erfunden (Rufnummern `+49 30 23125 xxx`); keine Personendaten in Snapshots oder Fehlermeldungen.

## Verwandt

- `fluvo-ui-design` — Design-Richtung je Oberfläche
- `fluvo-design-system` — Kontrast-Tokens hell/dunkel
- `fluvo-compliance` — Website-Pflichten (WCAG, LMIV, Button-Lösung)
- Agent `a11y-architect` (Wächter), `react-reviewer` (Grundcheck im Code-Review)
