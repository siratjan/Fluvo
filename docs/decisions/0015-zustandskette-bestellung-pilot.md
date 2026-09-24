# 0015 · Zustandskette der Bestellung im Piloten — reduzierte Kette, Merkmale statt Zustände, Storno am Merkmal „bezahlt"

- **Status:** entschieden (Sirat, im Gespräch) — dokumentierte Abweichung vom Briefing §5.3 für den ersten Piloten; **keine** Änderung des [FEST]-Punkts selbst. Gleiches Muster wie ADR 0008 (Fahrer-Teil) und ADR 0013 (Internetausfall): das Briefing gilt, der Pilot nutzt eine Teilmenge und ergänzt zwei Enden. Schließt **Q13** für den Bestell-Durchstich.
- **Datum:** 2026-09-23
- **Stufe:** [ENTSCHIEDEN Sirat 2026-09-23] (fachlich/technisch, K3 / Durchstich-Spur) — nicht [FEST], das bleibt dem Briefing vorbehalten. Berührt Briefing §5.3 und [FEST 2] (Zustandsmaschine); das **Prinzip** von [FEST 2] bleibt unangetastet, siehe unten.
- **Entschieden von:** Sirat

## Anlass

Die feste Statuskette aus Briefing §5.3 (`Eingegangen → In Küche → Fertig → Unterwegs → Geliefert → Abgerechnet` mit Storno als eigenem Pfad) ist auf die volle Lieferung mit Küchendisplay und Fahrer-App zugeschnitten. Der Piloten-Schnitt hat davon Teile gestrichen: ADR 0006 die Küchen-Status (kein `in_kitchen`/`ready` von Hand), ADR 0008 den Fahrer-Teil (kein `out_for_delivery`, keine Zahlart-Erfassung bei Lieferung). Damit passte die Kette nicht mehr, was in `open-questions.md` als **Q13** („Statuskette und Bestellarten", berührt [FEST 2]) festgehalten war.

Im Rahmen der Durchstich-Spur (ADR 0014) hat `requirements-engineer` den K3-Entwurf `docs/konzept/modelle/zustand-bestellung.md` als eine Seite mit Übergangstabelle vorgelegt, `architect` hat ihn gegen [FEST 2] gegengelesen (`docs/konzept/modelle/_gegenlesen-K3.md`) und zwei Korrekturen empfohlen (bezahltes „Mitnehmen"; Storno-Recht am Merkmal statt am Zustand). Sirat hat den reduzierten Weg im Gespräch entschieden (Mitschrift `docs/konzept/anwendungsfaelle/_gespraechsnotizen-K1.md`, Runde 52).

## Entscheidung

1. **Reduzierte Zustandskette im Piloten:** `received` → `delivered` | `handed_over` | `cancelled`, dazu `ended_unpaid` **[VORSCHLAG]** (per Nachtrag 2026-09-23, Runde 53, als eigener Endzustand entschieden — [VORSCHLAG] bleibt zur Nachvollziehbarkeit stehen, siehe „Nachtrag 2026-09-23 (Runde 53)"; fiskalische Behandlung weiter Q3). Die Bedeutungen:
   - `received` / Eingegangen — Startzustand jeder Bestellung, jeder Bestellart. Küchen-Status werden im Piloten **nicht** gesetzt; die Bestellung bleibt hier bis zum Endübergang.
   - `delivered` / Geliefert — Lieferung: die Annahme hat „geliefert" gedrückt (kein Fahrer, keine Zahlart im System, ADR 0008). Terminal — **Ende der Lieferung im Piloten, kein „Abgerechnet" danach** (Nachtrag 2026-09-23, Runde 53; `settled` wird später mit der Fahrer-App eingeschoben).
   - `handed_over` / Übergeben und bezahlt — Abholung/Mitnehmen am Tresen übergeben **und** bezahlt (FA-15). Terminal.
   - `ended_unpaid` / Ohne Bezahlung beendet **[VORSCHLAG]** — Bon gedruckt, nie kassiert/abgeholt; Ende mit Pflichtgrund. Als **eigenes Ereignis** `order.ended_unpaid` (append-only) fixiert, weil wirtschaftlich verschieden von Storno (produzierte Ware → Schwund, nicht Annullierung — die Auswertung soll Storno-Quote und Schwund-Quote trennen). **Als eigener Endzustand entschieden (Nachtrag 2026-09-23, Runde 53), kein Storno mit Grund; das [VORSCHLAG]-Kennzeichen für das Statuslabel entfällt damit.** Die fiskalische Behandlung bleibt an **Q3** offen. Terminal.
   - `cancelled` / Storniert — Storno als eigener, protokollierter Pfad mit Grund und Akteur (FA-11). Terminal.

2. **Merkmale statt Zustände.** Quittierung (quittiert / unquittiert / unquittiert-gedruckt), Vorbestellung mit Wunschzeit, Test-Kennzeichen und Zahlung („Zahlung erfasst") sind **Merkmale** an der Bestellung, **keine** Zustände — sie bewegen die Bestellung nicht vorwärts. `order.amended` (Inhalt geändert) ist ein neues Ereignis **ohne** Statuswechsel. Jedes Merkmal wird als append-only Ereignis protokolliert (`order.acknowledged`, der 2-Minuten-Notdruck als **eigenes** `order.printed_unacknowledged`, `order.paid` / ggf. `payment.captured` entkoppelt von der Erfüllungskante).

3. **Storno-Recht hängt am Merkmal „bezahlt", nicht am Zustand.** Die Annahme storniert frei, **solange keine Zahlung erfasst und kein Endzustand erreicht** ist; sobald eine Zahlung erfasst ist **oder** die Bestellung in einem Endzustand steht, darf **nur der Inhaber** stornieren (ADR 0007/0010/0011). Grenzfall: ein bezahltes **Mitnehmen** ist bereits in `received` bezahlt (FA-15) → sein Storno ist ein Storno nach Zahlung → **nur Inhaber**, obwohl der Zustand `received` ist. Eine **Lieferung** in `delivered` hat im Piloten keine erfasste Zahlung (ADR 0008); ihr Storno gehört trotzdem dem Inhaber, weil sie in einem Endzustand steht. Grund ist immer Pflicht.

4. **Spätere Zustände werden eingeschoben, nicht angehängt.** Die FEST-Zustände `in_kitchen` / `ready` / `out_for_delivery` / `settled` werden später **zwischen** `received` und die heutigen Enden eingeschoben, sobald Küchendisplay und Fahrer-App kommen. Das ist unkritisch, weil das Event-Log **Tatsachen** protokolliert, nicht den Graphen ([FEST 7]): historische `order_events` bleiben gültig, egal wie die Übergangstabelle später aussieht.

5. **Umsetzungsvorgaben aus dem Gegenlesen (verbindlich für K5/Code):**
   - `OrderStatus` als **String-Literal-Union aus dem Zod-Schema** plus **Textspalte** (ggf. CHECK-Constraint, per neuer Migration ersetzbar) — **kein** Postgres-`ENUM`-Typ (deckt sich mit `typescript.md` „keine enums").
   - **„offen" vs. „terminal" nicht an einzelne Statuswerte binden.** Abgeleitete Mengen `OPEN_STATES` / `TERMINAL_STATES` an **einer** Stelle im Kern definieren, damit Monitoring/Listen beim Einschieben neuer Zustände nicht brechen.
   - **Ereignisnamen laut K3** und bedeutungsstabil (`order.delivered` heißt „Lieferung abgeschlossen", bleibt gültig, auch wenn später `out_for_delivery → delivered` davorsteht); jedes Übergangs-Event trägt `from`/`to` im Payload.

## Berührt [FEST] — Prinzip gewahrt, Kette abweichend

Das **Prinzip** von [FEST 2] bleibt vollständig: ein zentrales Bestellobjekt als Zustandsmaschine, **der Server entscheidet jeden Übergang, nur vorwärts, Storno als eigener protokollierter Pfad**, jeder Statuswechsel schreibt ein Event in `order_events` (append-only, [FEST 6/7]). Die KI löst **keinen** Statusübergang aus — sie ruft nur `createOrder` nach Bestätigung auf und eskaliert ([FEST 11]). Abweichend ist allein die **konkrete Sechser-Kette** aus Briefing §5.3: der Pilot benutzt eine Teilmenge (`received`) und ergänzt zwei Enden (`handed_over`, `ended_unpaid`), die über die namentlich feste Kette hinausgehen. **Briefing §5.3 wird nicht geändert** — die Änderung des Briefings ist Sirats Sache und bleibt ein offener Punkt; bis dahin gilt dieser ADR als dokumentierte Abweichung.

## Betrachtete Alternativen

| Alternative | Dafür | Dagegen |
|---|---|---|
| **Volle Kette jetzt bauen** (`received → in_kitchen → ready → out_for_delivery → delivered → settled`) | näher am Zielbild §5.3; keine spätere Umstellung | Küchen-Status (ADR 0006) und Fahrer-Teil (ADR 0008) sind im Piloten gestrichen — niemand setzt diese Zustände; sie würden leer mitlaufen oder müssten automatisch übersprungen werden; mehr bewegliche Teile ohne Nutzen im Durchstich |
| **Zustände als Postgres-`ENUM`** | referenzielle Sauberkeit in der DB | schwer erweiter- und umsortierbar (das spätere Einschieben zwischen `received` und `delivered` würde teuer); widerspricht `typescript.md` „keine enums"; die Wahrheit liegt ohnehin im Zod-Schema |
| **`ended_unpaid` in `cancelled` einfalten** (Storno mit Grund „nie abgeholt") | eine Kante weniger, gleiche Mechanik (Pflichtgrund, Log) | wirtschaftlich verschieden (Schwund vs. Annullierung); der append-only Trail soll das tragen, nicht in einem Grund-Freitext verstecken — sonst geht Storno-Quote ↔ Schwund-Quote verloren |
| **„quittiert" als eigener Zustand** | expliziter im Diagramm | bläht den Zustandsraum auf (Quittier-Varianten × alles Übrige), Handannahme überspringt ihn — Merkmal passt besser zu Gehirn-vs-Hände und zum Trail |
| **Storno-Recht am Zustand festmachen** (`received` = Annahme frei) | einfache Regel | falsch für bezahltes Mitnehmen (`paid` in `received`) und für `delivered` ohne erfasste Zahlung — das Recht muss am Merkmal „bezahlt" bzw. „Endzustand" hängen |

## Folgen

- **Briefing §5.3 weicht ab** — Änderung nur auf Sirats Ansage; bleibt als **offener Punkt** geführt (nicht in dieser Spur ins Briefing geschrieben).
- **Skill `fluvo-core-domain` nachziehen** (`doc-updater`): der Skill kodiert derzeit die volle Sechser-Kette als maßgebliche `transitions`-Konstante und kennt weder `handed_over` noch `ended_unpaid`; da er bei jeder Arbeit in `packages/core` geladen wird, würde er die Umsetzung in die Irre führen. An die Piloten-Übergangstabelle anpassen, volle Kette als Zielbild vermerken.
- **K5/K6 übernehmen die Namen** (Status-Union, Ereignisnamen, Merkmale) aus K3; das K5-Datenmodell sieht die vollen FEST-Zustände als Zielbild vor, auch wenn der Pilot sie nicht setzt.
- **`doc-updater` zieht `open-questions.md` und das Briefing nach** (Briefing nur auf Sirats Ansage): Q13 wird **für den Bestell-Durchstich** geschlossen.
- **Rest-Unterpunkte von Q13 werden NICHT mitgeschlossen**, sondern als eigene Fragen weitergeführt (sonst wird Q13 fälschlich als erledigt verbucht):
  - ✅ **Erledigt (Nachtrag 2026-09-23, Runde 53):** Verhältnis `delivered` ↔ „Abgerechnet" für Lieferungen ohne erfasste Zahlung — `delivered` ist das Ende der Lieferung im Piloten, es folgt kein „Abgerechnet"; `settled` wird später mit der Fahrer-App eingeschoben (Q27).
  - ✅ **Erledigt (Nachtrag 2026-09-23, Runde 53 + Runde 55):** „Niemand drückt geliefert" — der Tagesabschluss (FA-16) zeigt alle Bestellungen in `received`, Inhaber oder Annahme schließen sie einzeln und bewusst ab, das System ändert keinen Status automatisch. Die Detailfrage, ob offene Bestellungen den Tagesabschluss blockieren oder nur angezeigt werden, ist in **Runde 55 als „blockieren" entschieden** (Q31, siehe „Nachtrag 2026-09-23 (Runde 55)").
  - Fahrer-Enden (Scan lösen, „nicht zustellbar", Bargeld-Kassensturz) → mit dem Fahrer-Teil zurückgestellt (ADR 0008).
  - Lebenszyklus des Restaurants (in Einrichtung → startklar ↔ gesperrt) → gehört zu **K9 / FA-20 / FA-21**, nicht in dieses Bestell-Zustandsmodell.
- **Fiskalische Seite bleibt Q3** (Steuerberaterin): bis zu welchem Zustand Storno zulässig ist, Erstattung, Signatur, Teilstorno, DSFinV-K, und die Behandlung von `ended_unpaid` — unabhängig von Q13.
- **„Rückruf nötig" (FA-01 9b)** bleibt als eigene offene Frage: Vor-Anlage außerhalb der FSM (Empfehlung des Gegenlesens: eigene kleine Tabelle mit `tenant_id`+RLS, nicht `orders`) vs. eigener Status `pending_callback` — nicht in diesem ADR entschieden, außerhalb der Durchstich-Spur (ADR 0014).

## Nachtrag 2026-09-23 (Runde 53)

Beim Durchgang durch das K3-Zustandsmodell hat Sirat drei Punkte entschieden, die im ursprünglichen Entscheidungsteil noch offen oder als [VORSCHLAG] geführt waren. Der Entscheidungsteil oben bleibt unverändert; die betroffenen Stellen verweisen auf diesen Nachtrag.

1. **`delivered` ist das Ende der Lieferung im Piloten — kein „Abgerechnet" danach.** Auf `delivered` folgt kein weiterer Zustand. Der Zustand `settled` („Abgerechnet") wird **später mit der Fahrer-App eingeschoben** (siehe Entscheidung Punkt 4). Damit ist der Rest-Unterpunkt Q27 für den Piloten geklärt: `delivered` ist terminal.

2. **Vergessene offene Bestellungen („niemand drückt geliefert"):** Der **Tagesabschluss (FA-16)** zeigt alle Bestellungen in `received`. Inhaber oder Annahme schließen sie **einzeln und bewusst** ab. Das System **ändert keinen Status automatisch** (kein stilles Schließen, keine Auto-Terminierung). **Noch offen und Frage an Sirat:** Ob offene Bestellungen den Tagesabschluss **blockieren** oder nur **angezeigt** werden (neue Frage in `open-questions.md`, siehe unten).

3. **`ended_unpaid` ist ein eigener Endzustand, kein Storno mit Grund.** Das **[VORSCHLAG]-Kennzeichen für das Statuslabel entfällt** — der Endzustand steht. Das append-only Ereignis `order.ended_unpaid` bleibt wie im Entscheidungsteil beschrieben. **Die fiskalische Behandlung bleibt Q3** (Steuerberaterin): unberührt von dieser Statuslabel-Entscheidung.

## Nachtrag 2026-09-23 (Runde 55)

**Tagesabschluss blockiert bei offenen Bestellungen (Q31 entschieden — „blockieren").** Die in Runde 53 (Nachtrag oben, Punkt 2) ausdrücklich offen gelassene Detailfrage — ob offene Bestellungen (`received`) den Tagesabschluss **blockieren** oder nur **angezeigt** werden — hat Sirat als **blockieren** entschieden: Der Tagesabschluss (FA-16) ist gesperrt, solange noch eine Bestellung in `received` steht; er wird erst möglich, wenn **jede** offene Bestellung bewusst beendet wurde (`delivered` / `cancelled` / `ended_unpaid`, jeweils mit den bestehenden Rechten und Pflichtgründen). Das System ändert weiterhin **keinen** Status automatisch. Damit ist **Q31 geschlossen**; die fiskalische Seite von `ended_unpaid`/Storno bleibt Q3. Umsetzungshinweis unverändert: offene Bestellungen über die abgeleitete Menge `OPEN_STATES` ermitteln, nicht über `status = 'received'` verdrahten. → K3, FA-16, `open-questions.md` (Q31).

## Wann neu bewerten

Wenn Küchendisplay oder Fahrer-App gebaut werden (dann die eingeschobenen Zustände `in_kitchen`/`ready`/`out_for_delivery`/`settled` einführen) · wenn die Steuerberaterin zu Q3 Vorgaben macht, die die Enden oder den Storno-Pfad verändern · wenn der Pilot zeigt, dass `received` als einziger Vor-Endzustand zu überladen ist (dann Merkmale in Sichten sauberer ableiten oder Zustände vorziehen).
