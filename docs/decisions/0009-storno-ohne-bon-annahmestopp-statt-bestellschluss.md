# 0009 · Kein Storno-Bon, Storno-Grund Pflicht, kein Bestellschluss-Feld, geänderter Bon in zwei Exemplaren — Korrekturen aus K1 vom 2026-09-22

- **Status:** angenommen (Sirat, im Gespräch) — ersetzt Teile von ADR 0007 (Storno-Bon, Bestellschluss) und ergänzt ADR 0008 (geänderter Bon bei Lieferung). Alles Übrige aus 0007 und 0008 gilt weiter.
- **Datum:** 2026-09-22
- **Stufe:** [ENTSCHIEDEN Sirat] (fachlich, im Rahmen von K1 / AP-003) — nicht [FEST]
- **Entschieden von:** Sirat

## Anlass

Beim weiteren Gegenlesen der Anwendungsfälle (Mitschrift in `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`, Runden 27–31) hat Sirat vier Punkte präzisiert. Zwei davon kehren Festlegungen aus dem Nachtrag zu ADR 0007 (Runden 20–21 vom 2026-09-21) um bzw. schärfen sie; einer ergänzt ADR 0008. Bestehende ADRs werden nicht geändert; dieser ADR hält fest, welche Sätze er ersetzt. Die Fassung von heute gilt.

## Entscheidung

- **Kein Storno-Bon** (Runden 27, 31 — ersetzt in ADR 0007 den Satz aus dem Nachtrag „die Küche bekommt einen deutlich gekennzeichneten **Storno-Bon**" (Runde 20)): Bei einem Storno wird **kein Bon** gedruckt. An der **Annahme** erscheint stattdessen ein **Hinweis / eine Anzeige**, dass storniert wurde; die **Küche wird wie heute per Zuruf** informiert. fluvo druckt zum Storno nichts.
- **Storno-Grund bei jedem Storno Pflicht** (Runde 28 — präzisiert ADR 0007, wo der Grund als „kurze Auswahl" beim Storno genannt war): Ein Storno lässt sich ohne Angabe eines Grundes nicht abschließen — bei jedem Storno, unabhängig vom Zustand und davon, wer storniert.
- **Kein eigenes Bestellschluss-Feld** (Runde 29 — ersetzt in ADR 0007 den Satz aus dem Nachtrag „**Bestellschluss = Ladenschluss** als Standard" (Runde 21)): Es gibt **keinen eigenen Bestellschluss** und keine eigene Einstellung dafür. Solange geöffnet ist, wird angenommen. Ein früher Schluss läuft über den **Annahmestopp** (FA-23), der nur **neue** Bestellungen betrifft; bereits angenommene Vorbestellungen werden zur Wunschzeit gemacht.
- **Geänderter Bon bei Lieferung in zwei Exemplaren** (Runde 31 — ergänzt ADR 0008): Ändert sich eine Liefer-Bestellung, wird der neu berechnete Bon ebenfalls in **zwei Exemplaren** gedruckt (Stationsexemplar und Fahrer-/Kundenexemplar), konsistent mit dem Zwei-Bon-Druck aus ADR 0008.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| Storno-Bon an die Küche (ADR 0007, Nachtrag Runde 20) | Küche hat einen Papierbeleg über das Storno | Zusätzliches Papier; im heutigen Ablauf wird per Zuruf storniert; Sirat: Anzeige an der Annahme reicht, Zuruf wie gewohnt |
| Eigenes Bestellschluss-Feld je Zone/Tag (ADR 0007, Nachtrag Runde 21) | feiner steuerbar als Ladenschluss | zweite Wahrheit neben Öffnungszeiten und Annahmestopp; mehr bewegliche Teile; Sirat: solange offen ist, wird angenommen — früher Schluss = Annahmestopp |
| Storno-Grund optional | schneller im Stoßbetrieb | ohne Grund fehlt dem Inhaber die Nachvollziehbarkeit im Log/Tagesübersicht; Sirat: Grund immer Pflicht |
| Geänderter Bon nur ein Exemplar | weniger Papier | inkonsistent mit dem Zwei-Bon-Druck aus ADR 0008; Station wüsste sonst nicht Bescheid |

## Folgen

- **Risiko Küche ohne Storno-Bon:** Ohne gedruckten Storno-Beleg besteht das Risiko, dass die Küche eine bereits in Zubereitung befindliche Bestellung **weiterkocht**, weil der Zuruf untergeht. Gegenmittel: klarer, nicht übersehbarer **Hinweis an der Annahme** und ein festgelegter **Ausnahmeablauf** (Zuruf an die Küche, Quittieren des Hinweises). Dieser Ausnahmeablauf gehört in **FA-06** (Bondruck) und **FA-11** (Änderung/Storno mit Neuberechnung); K3 (Storno-Pfad) hält fest, bis zu welchem Zustand storniert werden darf und dass ab diesem Punkt der Zuruf der einzige Weg zur Küche ist.
- **Storno-Grund Pflicht:** K3 und K9 (Rechte-Matrix) setzen die Pflichtangabe um; der Grund erscheint in Log und Tagesübersicht des Inhabers (ADR 0007). Datenmodell K5: Storno trägt ein Pflichtfeld „Grund" (Auswahl), ohne Personendaten im freien Text.
- **Annahmestopp statt Bestellschluss:** Es entsteht **kein** zusätzlicher Zustand und keine zusätzliche Einstellung „Bestellschluss". Der Annahmestopp (FA-23, in ADR 0007 Nachtrag / Runde 23 entschieden) bleibt der einzige Weg, früh zu schließen; er betrifft nur neue Annahmen, bestehende Vorbestellungen laufen weiter. K1/FA-23 und das Zustandsmodell K3 sind entsprechend zu halten — kein eigenes Bestellschluss-Feld anlegen.
- **Zwei Exemplare bei Änderung:** FA-11 (geänderter Bon) folgt dem Zwei-Bon-Druck aus ADR 0008/FA-06; Nachdruck- und Doppeldruck-Regeln gelten je Exemplar.
- **Testszenarien:** (1) Storno löst keinen Druckauftrag aus, erzeugt aber genau einen Hinweis an der Annahme; (2) Storno ohne Grund wird abgelehnt, mit Grund abgeschlossen; (3) kein Bestellschluss-Feld — bei gesetztem Annahmestopp werden neue Bestellungen abgelehnt, bestehende Vorbestellungen bleiben unberührt; (4) Änderung einer Liefer-Bestellung druckt zwei Exemplare des neu berechneten Bons.

## Wann neu bewerten

Wenn im Piloten Stornos zu weitergekochten Bestellungen führen (dann Ausnahmeablauf/Anzeige nachschärfen oder Storno-Bon erneut erwägen) · wenn die Steuerberaterin zum Storno-Grund oder zur Nichtausgabe eines Storno-Belegs Vorgaben macht · wenn sich zeigt, dass der Annahmestopp einen feineren Bestellschluss nicht ersetzen kann.

**Nachtrag 2026-09-22:** siehe ADR 0011 (keine eigene Storno-Anzeige — der Storno ist in Bestellübersicht/Log sichtbar, Küche per Zuruf; Präzisierung. Geänderter Bon wird der Annahme als Angebot angeboten, nicht automatisch gedruckt; Systemeintrag bleibt Pflicht — Ergänzung).
