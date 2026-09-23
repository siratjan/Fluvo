# 0014 · Vorgehen — Durchstich-Spur statt K1…K11 in fester Reihenfolge

- **Status:** entschieden (Sirat, im Gespräch) — Änderung der Arbeitsweise, ergänzt ADR [0004](0004-arbeitszyklus.md) (Arbeitszyklus) und ADR [0006](0006-piloten-schnitt-k1.md) (Piloten-Schnitt); hebt keinen [FEST]-Punkt auf
- **Datum:** 2026-09-23
- **Stufe:** [ENTSCHIEDEN Sirat] (Arbeitsweise / Konzeptphase) — nicht [FEST], das bleibt dem Briefing vorbehalten
- **Entschieden von:** Sirat

## Anlass

Die Konzeptphase (K1–K11, ADR [0005](0005-konzeptphase.md)) war als **feste Reihenfolge** angelegt: erst alle elf Artefakte abnehmen, dann bauen. K1 (fachliche Anwendungsfälle) hat sich über **51 Gesprächsrunden** gezogen (Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`). In Runde 52 hat Sirat entschieden, **agiler** vorzugehen und **früher Code** zu schreiben — aber **nicht blind**: Zuerst will er ein **Architekturbild mit Skalierungsaussage** und das **Datenmodell** sehen, „damit man weiß, welche Technologien man verwendet, wie es aussieht und wie es skaliert". Danach soll am **echten Anruf** gelernt werden, statt das Konzept vollständig vorab zu Ende zu schreiben.

## Entscheidung

fluvo baut den Piloten-Durchstich als **eine Spur** aus Konzept und Code, statt K2…K11 vollständig vor dem ersten Code abzunehmen. Die Reihenfolge:

- **Stufe 0 — Fundament (Konzept, kein Code):**
  - **Architekturbild** mit Technologie- und Skalierungsaussage → [`docs/konzept/modelle/architektur.md`](../konzept/modelle/architektur.md) (aus Briefing §4/§5, aktualisiert um ADR 0008–0013).
  - **K5-Ausschnitt Datenmodell** für den Durchstich (ER-Diagramm + Datenwörterbuch mit DSGVO/GoBD-Klasse).
  - **K3 Zustandsmodell** der Bestellung als **eine Seite** (Übergangstabelle).
- **Stufe 1 — Kern als Code** mit Tests aus den K1-Durchstich-Fällen (Zustandsmaschine, Preise, `createOrder`, Mandantentrennung, Event-Log).
- **Stufe 2 — Voice-Adapter** gegen die **Sandbox** (Testumgebung des Anbieters); **K4** (Gesprächsdesign) entsteht **im Bau**, nicht vorab fertig.
- **Stufe 3 — Annahme minimal + Bon-Druck.**
- **Stufe 4 — zehn Testanrufe**, danach das Konzept an der Realität **nachziehen**.

**K2, K8, K9, K10, K11 bleiben „dünn"** und **wachsen mit dem Code** — sie werden nicht vorab ausgearbeitet, sondern gefüllt, sobald der Durchstich sie berührt. **Konzept-Abnahmen** (Status `abgenommen` nach Kreuzverhör und Sirats Ja) gibt es in dieser Stufe **nur** für die **K1-Durchstich-Fälle**, **K3** und den **K5-Ausschnitt** — nicht für die dünnen Artefakte.

**Nicht in der Spur** (bewusst zurückgestellt): FA-24 (bekannte Lieferorte), Großbestellung, Sprachen über Deutsch/Englisch hinaus, Onboarding, Betreiber-Monitoring, Kassen-/Tresen-Abschluss. Sie bleiben im Konzept dokumentiert und kommen nach dem Durchstich.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| **Konzept vollständig zu Ende** (K1…K11 in fester Reihenfolge abnehmen, dann bauen) | maximale Klarheit vor dem Code; ADR 0005 wörtlich | 51 Runden allein für K1 zeigen: zu langsam; viele Fragen (Telefonie Q1, Druck Q8, Voice-Latenz/Karte Q5) lassen sich **nur am echten Anruf** beantworten, nicht am Schreibtisch |
| **Reiner Wegwerf-Prototyp ohne Kern** (schnell etwas Anrufbares zusammenstecken) | am schnellsten ein „es klingelt und druckt" | verletzt die zehn Regeln (kein Event-Log, keine RLS, keine Zustandsmaschine); das Ergebnis wäre nicht tragfähig und müsste komplett neu gebaut werden |
| **Durchstich-Spur** (gewählt) | früh am echten Anruf lernen, **ohne** die Kern-Qualität aufzugeben; Architektur und Datenmodell zuerst | Ränder bleiben zunächst dünn; Disziplin nötig, damit der Durchstich kein Wegwerf-Prototyp wird (siehe Folgen) |

## Folgen

- **Der Arbeitszyklus bleibt verbindlich (ADR [0004](0004-arbeitszyklus.md)).** Sobald Code entsteht, gelten die sechs Phasen (Planen → Testen zuerst → Bauen → Prüfen → Verifizieren → Sichern) unverändert. „Agiler" heißt **früher** Code, **nicht** weniger Sorgfalt.
- **Code je Arbeitspaket nur auf Sirats ausdrückliche Ansage** (Discovery-Phase, CLAUDE.md). Diese Spur ist ein Plan, keine Blanko-Freigabe zum Losbauen.
- **Kern-Qualität ist nicht verhandelbar.** Zustandsmaschine, Row-Level-Security (`tenant_id` + RLS) und das unveränderliche Event-Log sind **von Anfang an** vollständig — genau hier wird nicht „dünn" gebaut. Die zehn Regeln gelten ohne Ausnahme.
- **Die Ränder dürfen dünn sein.** Betreiber-Monitoring, Onboarding, Oberflächen jenseits der Annahme, NFA-Zahlen und Pilot-Kriterien wachsen mit dem Code statt vorab.
- **Das Datenmodell wird vollständig angelegt, auch wo der Pilot Felder leer lässt** (K5): `fiscal_transactions`, Teilzahlungen je Zahlart, Fahrer-Zuordnung — damit die Rückfälle aus ADR 0008 (Variante C) und die spätere Fahrer-App ohne Umbau möglich bleiben.
- **Risiko „der Prototyp wird nie weggeworfen".** Weil der Durchstich echten Kern-Code enthält, besteht die Gefahr, dünn gebaute Ränder später als „fertig" zu behandeln. **Begrenzt wird das so:** (1) Der **Kern** ist von Beginn an voll und getestet — er *ist* das Produkt, kein Wegwerfteil. (2) Nur die **Ränder** sind dünn und tragen im Konzept sichtbar den Status „dünn/wächst mit dem Code", nicht `abgenommen`. (3) Jede dünne Stelle bleibt eine offene Aufgabe in Roadmap/Konzept, bis sie den vollen Arbeitszyklus durchlaufen hat. (4) Nach den zehn Testanrufen (Stufe 4) wird das Konzept nachgezogen — die Lernpunkte gehen in K2/K4/K8–K11 zurück, nichts bleibt stillschweigend „so wie hingehackt".
- **Externe Konten und Unterauftragsverarbeiter brauchen Sirats Entscheidung.** Retell-Sandbox, Geocoder (Q6), Hosting-/DB-Konten, Sentry: jeder neue externe Dienst ist ein Unterauftragsverarbeiter → Rückfrage an Sirat und Eintrag in `open-questions.md` (security.md). Die Spur legt das nicht selbst an.
- **Nachzuziehen (durch `doc-updater`):** `docs/roadmap.md` (Bauschritte in die Durchstich-Stufen fassen), `docs/konzept/README.md` (K2/K8/K9/K10/K11 als „dünn, wächst mit dem Code" kennzeichnen; Abnahme-Umfang benennen).

## Wann neu bewerten

- Wenn die zehn Testanrufe (Stufe 4) zeigen, dass die dünnen Ränder den Durchstich blockieren (dann das betroffene Artefakt vorziehen und voll ausarbeiten).
- Wenn sich herausstellt, dass ein „dünn" gebauter Rand doch Kern-Qualität braucht (dann in den vollen Arbeitszyklus heben, nicht nachbessern).
- Nach dem ersten Piloten: ob die Spur für den nächsten Ausbau (Fahrer-App, Website, Abrechnung) weiter taugt oder wieder ein festeres Konzept vorausgehen soll.

**Nachtrag 2026-09-23:** siehe ADR 0015 (Zustandskette der Bestellung im Piloten). Der in Stufe 0 verlangte K3-Entwurf ist gegengelesen und für den Bestell-Durchstich entschieden (reduzierte Kette, Merkmale statt Zustände, Storno am Merkmal „bezahlt").

**Nachtrag 2026-09-23:** siehe ADR 0016 (Drei Datenklassen a/b/c). Der in Stufe 0 verlangte K5-Ausschnitt (Datenwörterbuch mit DSGVO/GoBD-Klasse) stützt sich auf drei Datenklassen; deren Struktur ist damit entschieden (schließt Compliance-Befund B1).
