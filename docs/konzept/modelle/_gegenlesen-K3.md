# Gegenlesen K3 · Zustandsmodell der Bestellung (Piloten-Durchstich)

**Prüfer:** architect · **Datum:** 2026-09-23 · **Vorlage:** `docs/konzept/modelle/zustand-bestellung.md` (requirements-engineer, 2026-09-23)
**Gelesen:** Briefing §2/§5.3/§5.4, CLAUDE-Regel 4 und 7, ADR 0006/0008/0010/0011/0013/0014, Skill `fluvo-core-domain`, FA-01 (9b), FA-06, FA-11, FA-15, FA-16, open-questions Q3/Q13.
**Rolle dieses Berichts:** Vorbereitung zur Entscheidung. **Entscheidungen trifft Sirat.** Nichts hierin ändert einen [FEST]-Punkt.

**Gesamturteil:** Der Entwurf ist tragfähig und geht sauber mit [FEST 2] um (Vorschlag zu Q13, nicht still überschrieben). Er ist **abnahmefähig, sobald zwei Korrekturen eingearbeitet sind** (Punkt 6: bezahltes „Mitnehmen"; Storno-Recht an „bezahlt" statt an den Zustand koppeln) und vier Rest-Unterpunkte von Q13 **nicht** mitgeschlossen, sondern weitergeführt werden.

---

## 1. Verletzt die Reduktion [FEST 2]?

**Zustimmung — ja, deine Lesart ist richtig, mit einer Präzisierung.**

[FEST 2] hat zwei Ebenen. Das **Prinzip** (ein zentrales Bestellobjekt als Zustandsmaschine, **der Server entscheidet jeden Übergang, nur vorwärts, Storno als eigener protokollierter Pfad** — Briefing §2.2/§5.3, CLAUDE-Regel 4) bleibt **unangetastet**. Die konkrete **Sechser-Kette** (`Eingegangen → In Küche → Fertig → Unterwegs → Geliefert → Abgerechnet`) ist zwar in §2.2 namentlich als [FEST] notiert — aber ADR 0006 hat genau diese Kette bereits ausdrücklich als „berührt [FEST], **nicht** entschieden → K3/architect/Sirat" (Q13) markiert. Das Reduzieren **in einem gekennzeichneten Vorschlag** ist damit der **vorgesehene Weg**, kein Bruch. ADR 0006 strich die Küche (kein `in_kitchen`/`ready` von Hand), ADR 0008 den Fahrer (kein `out_for_delivery`).

| Befund | Schwere | Empfehlung |
|---|---|---|
| Prinzip von [FEST 2] (Server, nur vorwärts, Storno-Pfad) vollständig gewahrt | Kein Befund | So lassen. |
| `handed_over` und `ended_unpaid` sind **Ergänzungen** über die Kette hinaus, nicht bloß eine Teilmenge | Niedrig | Der Entwurf nennt sie korrekt „ergänzt zwei Enden". Weil es echte **Erweiterungen** der namentlich festen Kette sind, brauchen genau sie Sirats **ausdrückliches Ja** — das ist der Kern von Q13. So kennzeichnen, nicht als „nur Teilmenge" verharmlosen. |

---

## 2. Zukunftssicher, die späteren Zustände später einzuschieben?

**Ja — mit Vorkehrungen, die jetzt getroffen werden, aber leichtgewichtig sind.** Das spätere Einschieben von `in_kitchen`/`ready`/`out_for_delivery`/`settled` **zwischen** `received` und `delivered` ist unkritisch, **weil das Event-Log Tatsachen protokolliert, nicht den Graphen.** Die Übergangstabelle ist Code; historische `order_events` bleiben gültig, egal wie die Tabelle später aussieht. Kein Daten-Rückbau nötig.

| Befund | Schwere | Empfehlung |
|---|---|---|
| Statuswert-Menge muss erweiterbar sein | Niedrig | `OrderStatus` als **String-Literal-Union aus dem Zod-Schema** + Textspalte (ggf. CHECK-Constraint, per neuer Migration ersetzbar) — **kein Postgres-`ENUM`-Typ** (schwer erweiter-/umsortierbar; deckt sich mit typescript.md „keine enums"). Formulierung im Entwurf „bleibt im Enum vorgesehen" entsprechend als Union/Textspalte präzisieren, nicht als DB-Enum. |
| Ereignisnamen müssen **stabil und bedeutungsdauerhaft** sein | Niedrig | Genau so wie im Entwurf (`order.delivered` heißt „Lieferung abgeschlossen" — bleibt gültig, auch wenn später `out_for_delivery → delivered` davorsteht). Beibehalten. |
| „offen vs. terminal" darf nicht an einzelne Statuswerte gebunden werden | Mittel | Nicht `status = 'received'` als „offen" verdrahten (sonst brechen Monitoring/Listen beim Einschieben neuer Zustände). Zentrale abgeleitete Mengen `OPEN_STATES` / `TERMINAL_STATES` an **einer** Stelle im Kern definieren. |
| Event-Nutzlast selbstbeschreibend | Niedrig | Jedes Übergangs-Event trägt `from`/`to` im Payload (Skill-Feld `payload`), damit der Trail auch bei wachsender Tabelle lesbar bleibt. |

---

## 3. `ended_unpaid` als eigenes Ende vs. Storno-Pfad „nicht abgeholt"

**Empfehlung: eigenes Ende mit eigenem Ereignis `order.ended_unpaid` — nicht in `order.cancelled` einfalten.** Begründung aus Event-Log/GoBD/Auswertung:

- **Wirtschaftlich verschieden:** Storno = annulliert (oft **vor** Produktion, keine Ware). „Nie abgeholt" = **Ware wurde produziert** (Bon gedruckt, Küche hat gekocht), aber nie kassiert → **Schwund/Verlust**. Das ist ein anderer Sachverhalt.
- **GoBD-Audit-Trail** (Regel 7, append-only): Der unveränderliche Trail soll diese Unterscheidung **tragen**, nicht in einem Grund-Freitext von `cancelled` verstecken. Sonst geht die Trennung Storno-Quote ↔ Schwund-Quote in der Auswertung verloren.
- **Rechte stimmen mit dem Muster „vor Zahlung" überein:** `ended_unpaid` ist per Definition **ohne** Zahlung; sowohl Annahme (mit Pflichtgrund) als auch Inhaber dürfen bestätigen (ADR 0010) — gleiches Rechteprofil wie Storno vor Zahlung, nicht wie Storno nach Zahlung.

| Befund | Schwere | Empfehlung |
|---|---|---|
| Gleiche Mechanik (Pflichtgrund, Protokoll, Log) verleitet zum Zusammenlegen | Mittel | **Trennen.** Eigenes, append-only `order.ended_unpaid` ist nicht verhandelbar (Trail muss unterscheiden); eigener terminaler Statuslabel ist zusätzlich sinnvoll für die Liste „nicht abgeschlossen" (FA-16). Fiskalische Behandlung bleibt **Q3** (Steuerberaterin) — der **Name/das Modell** kann Sirat jetzt entscheiden, die **Fiskal-Frage** nicht. |

---

## 4. „Rückruf nötig" (FA-01 9b): Vor-Anlage außerhalb der FSM vs. `pending_callback` vor `received`

**Empfehlung: Vor-Anlage-Zustand außerhalb der Bestell-Zustandsmaschine (Variante A des Entwurfs).**

- **[FEST] Briefing §5.4: „kein Datensatz in den Bestellungen vor Bestätigung."** In 9b hat zwar der **Anrufer** bestätigt, aber FA-01 9b sagt ausdrücklich: die KI „**legt sie nicht selbst an**, sondern übergibt". Die **maßgebliche** Bestätigung, die aus der Aufnahme eine Bestellung macht, ist hier die des **Menschen** ([FEST 11]: die KI sagt nichts zu, was Geld kostet). Also entsteht korrekterweise **kein `orders`-Datensatz**, bis ein Mensch `createOrder` auslöst.
- `pending_callback` **vor** `received` würde einen Nicht-Auftrag in `orders` und in die FSM legen → widerspricht §5.4, verunreinigt den Start-Invarianten (`received` = echte, bestätigte Bestellung) und den Trail (ein `order.created` für etwas, das noch keine Bestellung ist).
- **Konsistent** mit dem Eskalationsmodell: `escalate_to_human` (FA-03) ist ein Function Call, kein `createOrder`. „Rückruf nötig" gehört fachlich zur **Aufnahme-/Eskalationswelt**, nicht zum Bestell-Lebenszyklus.

| Befund | Schwere | Empfehlung |
|---|---|---|
| Vormerkung muss trotzdem dauerhaft, mandantengebunden und an der Annahme sichtbar sein | Niedrig | Variante A empfehlen. Die Vormerkung braucht eine **eigene kleine Tabelle** (z. B. `intake_drafts`/`call_handoffs`) mit `tenant_id` + RLS (Regel 6) — **nicht** `orders`. Erst die menschliche Bestätigung ruft `createOrder` → `received`. |
| Zeitpunkt | Niedrig | ADR 0014 stellt „Großbestellung" **außerhalb der Durchstich-Spur**. Nicht jetzt bauen — aber die **Modellhaltung** (außerhalb der FSM) jetzt festhalten, damit das Schema später nicht kontaminiert wird. Entscheidung Sirat. |

---

## 5. „quittiert" als Merkmal (ADR 0010): richtig oder Zustand?

**Merkmal — bestätigt, der Entwurf liegt richtig.**

Die Quittierung ist **orthogonal** zum Erfüllungs-Lebenszyklus: Sie bewegt die Bestellung nicht vorwärts (quittiert/unquittiert sind beide `received`), sondern löst den **Bon-Druck** aus (FA-06). Als Zustand modelliert würde sie den Zustandsraum aufblähen (Quittier-Varianten × alles Übrige; Asymmetrie, weil Handannahme sie überspringt). Als Merkmal passt sie zu Gehirn-vs-Hände (deterministischer Server-Fakt, Uhr hereingereicht) und zum append-only-Trail.

| Befund | Schwere | Empfehlung |
|---|---|---|
| Quittierung ändert keinen Bestellstatus, ist aber protokollpflichtig | Kein Befund | Als Merkmal führen (`acknowledged_at`, `acknowledged_by`, `acknowledged_via: user \| timeout`) **plus** append-only `order.acknowledged` — der 2-Minuten-Notdruck ist beweispflichtig („unquittiert gedruckt"). **Nicht** in `OrderStatus` aufnehmen. Das kleine 3-Wert-Merkmal (unquittiert → quittiert \| unquittiert-gedruckt) ist ein Sub-Attribut, kein FSM-Zustand. |

---

## 6. Übergangstabelle vollständig gegen FA-06/11/15/16?

**Weitgehend vollständig — aber ein echter Fehler bei bezahltem „Mitnehmen" und eine unscharfe Storno-Bedingung.**

| Befund | Schwere | Empfehlung |
|---|---|---|
| **Mitnehmen ist bereits bei Anlage bezahlt** (FA-15 1a: „sofort beim Bestellen bar"), also `paid` **im Zustand `received`** — nicht erst auf der Kante `received → handed_over`. Ein Storno einer solchen Bestellung ist ein Storno **nach erfasster Zahlung** → **nur Inhaber** (FA-15 4c, FA-11 4a). Die Tabelle bietet dafür aber nur „`received → cancelled` (Annahme, **vor** Zahlung, frei)" — **falsch** für ein bezahltes Mitnehmen. | **Hoch** | Storno-**Recht** an das Merkmal **„Zahlung erfasst"** koppeln, **nicht** an den Zustand. Regel: Annahme storniert frei, solange **keine Zahlung erfasst und kein Endzustand**; sonst **nur Inhaber**. `order.paid` muss auch in `received` auftreten können (Mitnehmen). |
| `delivered` (Lieferung) hat **keine erfasste Zahlung** (ADR 0008). Die Kante `delivered/handed_over → cancelled` trägt aber die Bedingung „**nach erfasster Zahlung**" — für Lieferung gegenstandslos. | Mittel | Bedingung entkoppeln: Storno **aus einem Endzustand → nur Inhaber**, unabhängig von der Zahlung. Zusammen mit Befund 1 ergibt das **eine** saubere Regel statt zweier verwaschener. |
| `received` ist stark **überladen**: neu/unquittiert, Vorbestellung wartend, quittiert/Küche kocht, wartet auf Abholung — alles derselbe Status. | Niedrig | Keine fehlende Kante, aber Annahme-/Monitoring-Sichten müssen die Unterlage aus **Merkmalen** ableiten (quittiert? Vorbestellung fällig? Bon gedruckt?). Für den Piloten akzeptabel (ADR 0006: keine Küchen-Status), aber im Datenmodell (K5) die Merkmale sauber vorsehen. |
| **Liefer-Bestellung, bei der niemand „geliefert" drückt** → bliebe für immer in `received` (FA-06/ADR 0008/Q13). | Niedrig | Der Entwurf führt das korrekt als offene Frage. Für den Piloten braucht es einen sichtbaren Abschlussweg am Tagesende (sonst Halden in `received`) — als Rest-Unterpunkt von Q13 weiterführen, nicht stillschweigend schließen. |
| Abgedeckt und korrekt: `order.amended` ohne Statuswechsel (FA-11: Teilstorno/Position streichen/Adress- & Bestellart-Wechsel), Storno vor/nach, `ended_unpaid` (FA-15/16), Abschluss ändert **keinen** Bestellstatus (FA-16), Doppelquittierung idempotent (FA-06 4c), Storno+Neuanlage statt Rücksprung (FA-11 3f). | Kein Befund | So lassen. |

---

## 7. Ereignisnamen (englisch) konsistent und K6-/code-tauglich?

**Ja — konsistente Konvention (`order.<partizip>`, punkt-namensräumig, Vergangenheit), passt zum Skill-Feld `type` und zur String-Literal-Union in `schemas`.** Drei Präzisierungen:

| Befund | Schwere | Empfehlung |
|---|---|---|
| `order.paid` wird im Entwurf an die Kante `received → handed_over` gebunden („+ `order.paid`"). Zahlung fällt aber zeitlich auseinander (Mitnehmen: bei Anlage; Abholung: bei Übergabe; Lieferung: nie im Piloten). | Mittel | `order.paid` als **eigenständiges**, an einen Zahlungssatz gebundenes Ereignis führen, **entkoppelt** von der Erfüllungskante — stützt zugleich Teilzahlungen je Zahlart (Briefing §5.2, Gutschein+bar FA-15). Erwägen: `payment.captured` statt `order.paid`. Löst zusammen mit Punkt 6 das Recht-an-Zahlung-Problem. |
| `order.acknowledged` bezeichnet **beides**: menschliche Quittierung **und** 2-Minuten-Notdruck („unquittiert gedruckt") — semantisch gegensätzlich. | Niedrig | Über `actor` (`user`/`system`) **plus** Payload-Flag (`printed_unacknowledged: true`) unterscheiden, oder eigenes `order.print_forced_unacknowledged`. Nicht denselben Namen „acknowledged" für „gerade **nicht** acknowledged" tragen lassen. |
| `order.ended_unpaid` eigener Name | Kein Befund | Beibehalten (siehe Punkt 3). Namensräume `print.*` (FA-06) und `counter.*` (FA-16) korrekt getrennt vom `order.*`-Lebenszyklus — gut. Alle Namen bleiben **vorläufig bis K6** (Entwurf kennzeichnet das bereits). |

---

## Abschluss

**Kann Q13 mit dieser Reduktion geschlossen werden? — Bedingt ja, Entscheidung Sirat.** Für die im Durchstich enthaltenen Bestellarten (Lieferung, Abholung nach Anruf, Mitnehmen ohne Anruf) klärt der Entwurf die Unterpunkte:
- (a) Weg ohne „Unterwegs" → gelöst (`handed_over`); (b) „In Küche"/„Fertig" nicht von Hand → gelöst (bleibt `received`); (g) „quittiert" Merkmal → gelöst; (e) Storno-Pfad → gelöst **nach** Einarbeitung der Punkt-6-Korrektur; (d) „nie abgeholt" → gelöst (`ended_unpaid`).

**Nicht mitschließen, sondern weiterführen** (sonst wird Q13 fälschlich als erledigt verbucht):
- Verhältnis `delivered` ↔ „Abgerechnet" für Lieferungen ohne erfasste Zahlung **und** „niemand drückt geliefert" (der Entwurf führt beides selbst als offen);
- (c) Fahrer-Scan lösen und (d) „nicht zustellbar" → mit dem Fahrer-Teil **zurückgestellt** (ADR 0008);
- (f) **Lebenszyklus des Restaurants** (in Einrichtung → startklar ↔ gesperrt) → **nicht** dieses Artefakt, gehört zu K9/FA-20/21;
- **Fiskalische** Seite von Storno und `ended_unpaid` → bleibt **Q3** (Steuerberaterin), unabhängig von Q13.

Empfehlung: Sirat schließt Q13 **für den Bestell-Durchstich** ab, sobald die zwei Punkt-6-Korrekturen eingearbeitet sind, und die obigen Rest-Unterpunkte werden als **eigene** offene Punkte weitergeführt (durch `doc-updater` in `open-questions.md` nachziehen).

**Muss der Skill `fluvo-core-domain` nachgezogen werden? — Ja (nur benennen, nicht hier ändern).** Der Skill kodiert derzeit die **volle Sechser-Kette** als maßgebliche `transitions`-Konstante (`received → in_kitchen → ready → out_for_delivery → delivered → settled`) und kennt weder `handed_over` noch `ended_unpaid`. Da der Skill „bei jeder Arbeit in `packages/core`" geladen wird, würde er die Umsetzung in die Irre führen. Nach Sirats Entscheidung durch `doc-updater` an die Piloten-Übergangstabelle anpassen (volle Kette als Zielbild vermerkt). Ebenso: Briefing §2.2/§5.3 tragen die namentlich feste Kette — Briefing-Änderung nur auf Sirats Wort; bis dahin gelten K3 + ein neuer ADR (Status `vorgeschlagen`) als dokumentierte Abweichung, Muster wie ADR 0008/0013.
