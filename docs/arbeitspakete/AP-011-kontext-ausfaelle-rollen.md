# AP-011 · Konzept K9: Kontext und Datenfluss, Ausfall-Tabelle, Rollen und Rechte

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K9
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Es ist sichtbar, welches fremde System welche Daten bekommt (Grundlage für AVV und Verarbeitungsverzeichnis), was bei jedem Ausfall passiert und wer im System was darf.

## Einordnung

- **Berührt:** [FEST] Datensparsamkeit in der Voice-Kette, Telefon klingelt bei Ausfall durch, Offline-First · [OFFEN] Q6, Q8, Q11
- **Business Brain:** `Rechts- & Compliance-Landkarte`, `DSGVO & Regulierung Deutschland — Tiefenrecherche`
- **Nicht Teil dieses Pakets:** Die Rechtsdokumente selbst (AVV, DSFA)

## Abnahmekriterien

- [ ] Kontextdiagramm mit allen Fremdsystemen; Datenfluss-Tabelle mit Personenbezug, Zweck, Anbieter/Standort
- [ ] Abschnitt „bewusst weggelassene Komponenten“
- [ ] Ausfall-Tabelle: je Ausfall, was sofort passiert, was Personal und Kunde sehen, was nachgeholt wird
- [ ] Rollen-Rechte-Matrix inkl. Anmeldung und Sicht auf Personendaten
- [ ] Von `compliance-guard` und `security-reviewer` gegengelesen, von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | konzept-diagramme (Skill) | Kontext und Datenfluss |
| 2 | konzept-vertraege (Skill) | Ausfälle, Rollen |
| 3 | requirements-engineer | Entwurf |
| 4 | compliance-guard | Datenflüsse prüfen |
| 5 | security-reviewer | Rollen und Anmeldung |
| 6 | silent-failure-hunter | Ausfall-Tabelle auf lautlose Fälle prüfen |

## Schritte

1. `/konzept K9` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

Ergebnis von AP-002 (Drucker offline) · Entscheidung Geocoder (Q6) — ggf. `/council Q6`

## Ergebnis

_Noch offen._
