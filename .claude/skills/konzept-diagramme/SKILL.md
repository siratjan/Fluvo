---
name: konzept-diagramme
description: Diagramme der fluvo-Konzeptphase als versionierbarer Text (Mermaid) — Gesamtprozess und Sub-Prozesse, Zustandsmodell der Bestellung mit Übergangstabelle, Kontext- und Datenflussdiagramm mit Personendaten-Markierung, ER-Diagramm, Abhängigkeiten. Laden, wenn ein Modell unter docs/konzept/modelle/ entsteht oder geändert wird.
---

# Diagramme

Diagramme liegen als **Mermaid-Codeblöcke in Markdown** unter `docs/konzept/modelle/`. Grund: Sie sind im Git vergleichbar, Agenten können sie lesen und ändern, und das Cockpit zeichnet sie. Ein Bild allein ist keine Quelle.

Jede Datei: kurzer Zweck → Diagramm → **Tabelle, die dasselbe in Worten sagt** → Verknüpfungen → offene Fragen. Die Tabelle ist maßgeblich, wenn Diagramm und Tabelle auseinanderlaufen — und genau das ist dann ein Befund.

Mermaid-Hinweise: Knoten-IDs ohne Umlaute und Leerzeichen (`in_kitchen`), Beschriftung in Anführungszeichen (`A["In Küche"]`), keine Klammern oder Doppelpunkte in unquotierten Texten, ein Diagramm je Codeblock, lieber zwei kleine als ein unlesbares.

## 1. Prozessmodell (`prozess-gesamt.md`, `prozess-ki-gespraech.md`)

Entspricht Advansure Kap. 2.3. Als `flowchart LR` mit `subgraph` je Beteiligtem (Bahnen): Anrufer · KI-Assistent · Annahme · Küche · Fahrer · fluvo-System. Übergaben zwischen Bahnen sind das Wichtigste — dort passieren heute die Zettel-Fehler.

- Jeder Schritt trägt eine ID (`P07`) und verweist auf seinen Anwendungsfall.
- Entscheidungen als Raute mit beschrifteten Ausgängen; jeder Ausgang führt irgendwohin.
- Darunter die **Zuordnungstabelle** Prozessschritt → FA → TU (Advansure 2.3.3).

Braucht Sirat echtes BPMN für sein Modellierungswerkzeug (er hat `.bpmn`-Dateien aus dem Projektsemester): zusätzlich eine `.bpmn`-Datei ablegen, aber die Markdown-Datei bleibt die gepflegte Quelle. Das nur auf Ansage tun.

## 2. Zustandsmodell der Bestellung (`zustand-bestellung.md`)

Das wichtigste Einzelartefakt. `stateDiagram-v2` plus **Übergangstabelle**:

| Von | Nach | Auslöser (Befehl) | Wer darf | Bedingungen | Wirkung (Events, Druck, TSE) | Wenn offline |
|---|---|---|---|---|---|---|

Pflichtfragen, die die Tabelle beantwortet:
- Storno aus **jedem** Status: erlaubt? durch wen? was passiert mit Bon, Zahlung, TSE, Fahrer?
- Zwei Geräte lösen denselben Übergang aus → wirkungslos, kein Fehler.
- Verspätete Offline-Aktion trifft auf inzwischen stornierte Bestellung → Ablehnung, sichtbar für das Personal.
- Abholung statt Lieferung: eigener Pfad oder Überspringen? ([OFFEN], falls nicht im Briefing)
- Wer setzt `settled`, und was ist mit online bezahlten Bestellungen?

Status-Namen englisch wie im Code (`received`, `in_kitchen`, …), deutsche Bezeichnung daneben. Nur Vorwärts-Übergänge [FEST]; Storno als eigener protokollierter Pfad [FEST].

## 3. Kontext- und Datenfluss (`kontext-datenfluss.md`)

Entspricht Advansure Kap. 2.5. `flowchart`: fluvo in der Mitte, außen Menschen und Fremdsysteme (Voice-Plattform, LLM, Zahlungsanbieter, TSE, Drucker, Geocoder, E-Mail, Hosting, Sentry).

Dazu die **Datenfluss-Tabelle** — sie ist zugleich Grundlage für Verarbeitungsverzeichnis, AVV und DSFA:

| Von → Nach | Welche Daten | Personenbezug? | Zweck | Anbieter / Standort | Speicherdauer dort | Stufe |
|---|---|---|---|---|---|---|

Regel: In die Voice-/LLM-Kette nur Bestellinhalt und pseudonymisierte Kennung. Jeder Pfeil mit Personenbezug braucht eine Begründung. Wie bei Advansure: Abschnitt „Bewusst weggelassene Komponenten".

## 4. Datenmodell (`datenmodell.md`)

`erDiagram` mit den Tabellen aus Briefing §5.2 — nur Schlüssel und tragende Felder im Bild. Die Details gehören ins **Datenwörterbuch** (Skill `konzept-vertraege`). Beziehungen mit Kardinalität; `tenant_id` überall mitdenken, im Bild aber nur einmal als Hinweis, sonst wird es unlesbar.

## 5. Abhängigkeiten (`abhaengigkeiten.md`)

Entspricht Advansure 2.5.4. Module → Kern → Adapter → Anbieter. Pfeile nur in erlaubter Richtung; ein Pfeil von Modul zu Modul darf nicht vorkommen. Dazu je Anbieter: Was passiert bei Ausfall? → Verweis auf die Ausfall-Tabelle.

## Checkliste

- [ ] Diagramm und Tabelle sagen dasselbe
- [ ] Jeder Knoten hat eine ID und eine Verknüpfung (FA/TU/Vertrag)
- [ ] Jede Verzweigung hat alle Ausgänge; kein Zustand ohne Ausweg außer Endzuständen
- [ ] Storno- und Offline-Verhalten sind beantwortet oder als [OFFEN] mit Qn markiert
- [ ] Personendaten-Pfeile sind markiert und begründet
- [ ] Mermaid rendert (im Cockpit ansehen)
