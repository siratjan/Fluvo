---
name: fluvo-design-system
description: Design-Tokens von fluvo als eine Quelle — Farbe, Abstand, Typografie, Radius, Schatten als CSS-Variablen, hell und dunkel; Prüfliste für PRs, die Styling berühren; kurzer Audit-Ablauf. Laden, sobald mehr als eine Ansicht existiert oder ein PR Styling berührt.
---

# Design-System: Tokens als eine Quelle

> Abgeleitet aus affaan-m/ECC (MIT), `skills/design-system/SKILL.md`, angepasst für fluvo 2026-09-23.

Wie es **eine** Speisekarte gibt (Regel 9) und **eine** Definition je Datenform (`.claude/rules/typescript.md`), gibt es **eine** Quelle für Gestaltungswerte. Komponenten kennen keine Hex-Werte, keine Pixelzahlen für Abstände, keine eigenen Schriftgrößen — nur Tokens.

## Wo die Tokens liegen

- **Ein Paket** für die Staff-PWA: `packages/ui` (falls angelegt) oder `apps/web-staff/src/styles/tokens.css`, solange es nur eine App gibt. Entscheidung beim ersten Styling-PR festhalten; danach nicht wandern lassen.
- Die Website (`apps/site`) übernimmt dieselben **semantischen** Token-Namen; je Tenant werden nur wenige Werte überschrieben (Akzentfarbe, Logo, Schrift) — nie das Layout.
- Tokens sind **CSS-Custom-Properties** auf `:root`, semantisch benannt (Zweck, nicht Farbe): `--color-surface`, `--color-text`, `--color-action`, `--color-state-waiting`, `--color-state-error` — nicht `--blue-500`.
- Skalen, nicht Einzelwerte: Abstand `--space-1 … --space-8` (4-px-Raster), Typo `--text-sm … --text-2xl`, Radius `--radius-sm/md/lg`, Schatten `--shadow-1/2`. Was nicht auf der Skala liegt, gibt es nicht.

```css
:root {
  --color-surface: #ffffff;
  --color-text: #171717;
  --color-action: #0b5cad;
  --color-state-error: #b42318;
  --space-2: 8px;
  --touch-target: 48px;
}
:root[data-theme="dark"] {
  --color-surface: #121212;
  --color-text: #f2f2f2;
  --color-action: #6aa9ff;
}
```

## Hell und dunkel

- Beide Themen sind **vollständig** oder es gibt nur eines. Ein halbes Dunkel-Thema ist schlechter als keins.
- Umschaltung über `data-theme` auf `:root`, Vorgabe folgt `prefers-color-scheme`. Küchen- und Tresen-Geräte stehen oft dauerhaft auf dunkel (Blendung) — die Annahme muss auch dort Kontrast bei Sonnenlicht halten (Skill `fluvo-accessibility`).
- Jeder Zustands-Token (wartet, abgelehnt, storniert, Vorbestellung, Ampel) hat in beiden Themen mind. 3:1 gegen die Fläche; Text 4,5:1. Kontrast wird beim Anlegen eines Tokens geprüft, nicht später in der Komponente.
- Zustände brauchen zusätzlich Text oder Symbol — Tokens ersetzen keine Beschriftung.

## Prüfliste für PRs, die Styling berühren

- [ ] Kein Hex-, `rgb`- oder `hsl`-Wert außerhalb der Token-Datei.
- [ ] Keine Abstände, Schriftgrößen oder Radien außerhalb der Skala („13px" ist ein Befund).
- [ ] Neue Tokens sind semantisch benannt und in **beiden** Themen definiert.
- [ ] Tippziele nutzen `--touch-target` (48 px) oder größer; kein Ziel darunter ohne Begründung.
- [ ] Ähnliche Elemente sehen gleich aus (zwei Knöpfe derselben Bedeutung, zwei Karten derselben Art) — sonst gehört die Abweichung in die Komponente, nicht in die Ansicht.
- [ ] Lade-, Leer-, Fehler- und Offline-Zustand sind gestaltet.
- [ ] Bewegung nur als Zustandssignal; `prefers-reduced-motion` beachtet.
- [ ] Keine neue Styling-Abhängigkeit (CSS-Framework, Icon-Paket, Animationsbibliothek) ohne Rückfrage.
- [ ] Nichts, was nach Landingpage aussieht (Verlauf, Blob, Karte in Karte, übergroße Überschrift) — Skill `fluvo-ui-design`.

## Audit-Ablauf (wenn es „irgendwie falsch aussieht")

Kurz, mit Datei:Zeile, ohne Punktetabellen:

1. **Token-Streuner finden:** `rg -n "#[0-9a-fA-F]{3,8}|rgb\(|hsl\(" apps packages --glob '!**/tokens.css'` — jeder Treffer ist ein Kandidat.
2. **Skalenbrüche finden:** Abstände und Schriftgrößen außerhalb der Skala (`rg -n "\b(1[0-9]|2[0-9]|3[0-9])px"`), dann prüfen, ob ein Token fehlt oder falsch gewählt ist.
3. **Zustände vergleichen:** dieselbe Bedeutung (wartet, abgelehnt, storniert) in allen Ansichten mit demselben Token und derselben Beschriftung?
4. **Dunkel durchklicken:** jede Ansicht einmal im Dunkel-Thema, Kontrast der Zustands-Tokens prüfen (axe, Skill `fluvo-accessibility`).
5. **Befund je Punkt:** was, wo, welcher Token oder welche Komponente behebt es. Entscheidungen, die ein Token ändern, stehen im AP; ein Token wird nicht in einer Komponente „lokal korrigiert".

## Nicht Teil dieses Skills

- Wettbewerber-Recherche und automatisch erzeugte Vorschau-Seiten — nicht nötig; Tokens entstehen aus den Vorgaben in `fluvo-ui-design` und K10.
- Konkrete Farbwerte je Tenant der Website — Konfiguration, nicht Code.

## Verwandt

- `fluvo-ui-design` — Richtung vor dem Bauen
- `fluvo-accessibility` — Kontrast, Zustände ohne Farbe
- Agenten `react-reviewer`, `a11y-architect`
