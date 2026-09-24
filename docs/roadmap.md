# Roadmap

Stand: 2026-09-23 · Quelle: [briefing.md](briefing.md) §7 · Gepflegt vom Agenten `doc-updater`.

Ziel ist ein dünner Durchstich für den Piloten: **Anruf → Bestellung → gedruckter Bon.**

Status-Werte: `offen` · `als Nächstes` · `in Arbeit` · `fertig (geprüft)` · `blockiert`

## Vor dem ersten Code: zwei Risikotests

Beide können die Architektur noch kippen und kosten wenig. Details in [open-questions.md](open-questions.md).

| # | Test | Status | Ergebnis |
|---|---|---|---|
| R1 | Rufumleitung bei Nichtmelden mit dem echten Pilot-Anschluss: Kommt die Nummer des Anrufers an? Wie lange klingelt es? | als Nächstes | AP-001 **freigegeben**; Termin beim Piloten **Freitag 2026-09-25** |
| R2 | Star-Drucker: CloudPRNT-Abfrage und lokaler Druck aus einer HTTPS-PWA ohne Internet | als Nächstes | AP-002 weiter **vorgeschlagen**. Hinweis: durch ADR 0008 druckt der Pilot bei **Lieferung zwei Exemplare** — für den Druckertest einplanen |

## Durchstich-Spur — Konzept und Code (ADR 0014)

Seit 2026-09-23 (ADR [0014](decisions/0014-vorgehen-durchstich-spur.md), ersetzt das Vorgehen „erst konzipieren, dann entwickeln" vom 2026-09-18): Der Piloten-Durchstich wird als **eine Spur** aus Konzept und Code gebaut, statt K2–K11 vollständig vor dem ersten Code abzunehmen. Implementieren zuerst, Konzept-Artefakte fallweise nebenbei; Kern-Qualität (Zustandsmaschine, RLS, Event-Log) von Anfang an voll. **Code je Stufe nur auf Sirats Ansage** — diese Spur ist ein Plan, keine Blanko-Freigabe. Läuft parallel zu R1 und R2.

| Stufe | Schritt | Status | Anmerkung |
|---|---|---|---|
| 0 | Fundament (Konzept, kein Code): Architekturbild mit Skalierungsaussage, K5-Ausschnitt Datenmodell, K3 Zustandsmodell als eine Seite | in Arbeit | Entwürfe vorhanden 2026-09-23: `konzept/modelle/architektur.md` (Architekturbild), K5-Ausschnitt (`konzept/modelle/er-durchstich.md`) und `konzept/modelle/zustand-bestellung.md` (K3). **Gegenlesen `architect`/`database-reviewer`/`compliance-guard` alle eingearbeitet.** Q13 (Zustandskette, ADR 0015) und die drei Datenklassen (ADR 0016) am 2026-09-23 von Sirat **entschieden**. **K3 und K5-Ausschnitt mit Sirat durchgegangen** (Runden 52–55: Nachträge zu ADR 0015 — `delivered` terminal ohne „Abgerechnet", `ended_unpaid` als eigener Endzustand, Tagesabschluss blockiert bei offenen `received`; Options-/Varianten-Modell `menu_option_variant_prices`, keine geplanten Preise, jeder Artikel mind. eine Variante). Offen: **Durchgang Architekturbild mit Sirat**; **Kreuzverhör und Abnahme von K3 und K5-Ausschnitt** stehen aus |
| 1 | Kern als Code mit Tests aus den K1-Durchstich-Fällen (Zustandsmaschine, Preise, `createOrder`, Mandantentrennung, Event-Log) | in Arbeit | Code nur auf Ansage. **AP-014 (Monorepo-Gerüst) fertig (geprüft) 2026-09-23** — Gerüst steht, per Fast-Forward in `main` gemergt und nach GitHub gepusht. AP-015 (Kern-Durchstich) **vorgeschlagen** — wartet auf **Abnahme K3/K5-Ausschnitt** und Sirats **Code-Ansage** |
| 2 | Voice-Adapter gegen die Sandbox; K4 (Gesprächsdesign) entsteht im Bau | offen | Code nur auf Ansage; hängt an R1 |
| 3 | Annahme minimal + Bon-Druck | offen | Code nur auf Ansage; hängt an R2 |
| 4 | Zehn Testanrufe, danach Konzept an der Realität nachziehen | offen | Code nur auf Ansage |

**K2, K8, K9, K10, K11 bleiben „dünn" und wachsen mit dem Code** — nicht vorab ausgearbeitet, sondern gefüllt, sobald der Durchstich sie berührt. Konzept-Abnahmen (`abgenommen`) gibt es in dieser Stufe nur für die K1-Durchstich-Fälle, K3 und den K5-Ausschnitt. Nicht in der Spur (zurückgestellt): FA-24, Großbestellung, Sprachen über Deutsch/Englisch hinaus, Onboarding, Betreiber-Monitoring, Kassen-/Tresen-Abschluss.

### Konzept-Fortschritt (K1–K11)

Landkarte und Status je Artefakt in [konzept/README.md](konzept/README.md), je Artefakt ein Arbeitspaket (AP-003 … AP-013).

| # | Schritt | Status | Anmerkung |
|---|---|---|---|
| K | Konzept für den Piloten-Durchstich (K1–K11) | in Arbeit | Fallweise nach ADR 0014; K3 und K5-Ausschnitt als Entwurf, K2/K8/K9/K10/K11 dünn — `/konzept` |
| K1 | Fachliche Anwendungsfälle (AP-003) | in Arbeit | **23 Entwürfe** (inkl. **FA-24 neu**, „bekannte Lieferorte", aus Kreuzverhör FA-01 Runde 51), davon **3 zurückgestellt** (FA-08/09/10, Fahrer-Teil, ADR 0008). **FA-01 abgenommen 2026-09-23** — erster abgenommener Fall, Kreuzverhör Runde 51 (bepreiste Extra-Optionen je Größe, Notizfeld, strukturierte Adresse, bekannte Lieferorte, Zahlungsmöglichkeit, Großbestellungs-Schwelle, Ausnahmen 7b/9b/13a, Sprachen DE/EN; Nachträge in FA-03/05/06/12/20/22). 16 weitere Fälle mit Sirat durchgegangen (Runden 32–50). **FA-02/03/04** warten auf AP-001 (Rufumleitungs-Test, **2026-09-25**), danach nachziehen. Nächster Schritt: Kreuzverhör der übrigen durchgegangenen Fälle, Testszenario-Labels bereinigen (Befund A3) |

## Bauschritte

| # | Schritt | Status | Anmerkung |
|---|---|---|---|
| 0 | Agentic Operating System (dieses Repo: Agenten, Skills, Hooks, Regeln, Doku) | fertig (geprüft) | 2026-09-18 |
| 0b | Monorepo-Gerüst: pnpm-Workspace, TypeScript-Basis, Vitest, Prettier, dependency-cruiser-Regeln | fertig (geprüft) | **AP-014 abgeschlossen 2026-09-23:** pnpm-Monorepo (§5.1), Pakethüllen `core`/`schemas`/`db`/`apps/api`, Modulgrenz-Regeln (per Gegenprobe rot), lokale PostgreSQL (`postgis/postgis:17-3.5`) mit Rollen `fluvo_migrator`/`fluvo_app` ohne BYPASSRLS, Prüfkette an der Wurzel, `docs/entwicklung.md`. Zweig per Fast-Forward in `main` gemergt und gepusht. Nächster Bauschritt: **AP-015** (Kern-Durchstich `createOrder`), wartet auf **Abnahme K3/K5-Ausschnitt** und Code-Ansage |
| 1 | Kern: Tenant/Entitlements, Speisekarte, Bestellung, Zustandsmaschine, Event-Log, RLS, TSE-Grundgerüst im Datenmodell | offen | |
| 2 | Basis: manuelle Annahme + Bon-Druck (CloudPRNT) inkl. Offline-Test | offen | hängt an R2 |
| 3 | Anrufmanager KI: Retell an denselben Endpunkt, Function Calls, Metering, Eskalation | offen | hängt an R1 |
| 4 | Fahrer-PWA: QR-Scan, Geliefert/Zahlart, Kassensturz | offen | der Teil, der fluvo abhebt. **Abweichung von der Baureihenfolge:** kommt **nach dem ersten Piloten** als eigene App (ADR 0008), nicht mehr vor dem Piloten — siehe Hinweis unter der Tabelle |
| 5 | Küchendisplay | offen | |
| 6 | Website mit Online-Zahlung und Kundendomains | offen | |
| 7 | Abrechnung der fluvo-Kunden (Stripe Meters) und Speisekarten-Digitalisierung | offen | |

**Dokumentierte Abweichung von Briefing §7 (ADR 0008, 2026-09-21):** Der **Fahrer-Teil (Bauschritt 4) kommt nach dem ersten Piloten** und wird eine eigene App. Der erste Pilot läuft **Anruf → Bestellung → Bon** (plus Tresen: Abholung, Mitnehmen, Hier essen mit Kassieren im System); bei Lieferung druckt fluvo zwei Bon-Exemplare, das Tür-Bargeld läuft wie heute auf Papier. Das Briefing selbst ändert nur Sirat — bis dahin gilt ADR 0008 als Abweichung. Berührt zudem [FEST 17] (Fahrer-App im App-Store, → Q19), nicht entschieden.

## Vor dem Pilot (nicht technisch)

AVV, Verarbeitungsverzeichnis und DSFA; Prüfung durch Anwalt und Steuerberaterin.
