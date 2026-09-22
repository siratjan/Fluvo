# Roadmap

Stand: 2026-09-22 · Quelle: [briefing.md](briefing.md) §7 · Gepflegt vom Agenten `doc-updater`.

Ziel ist ein dünner Durchstich für den Piloten: **Anruf → Bestellung → gedruckter Bon.**

Status-Werte: `offen` · `als Nächstes` · `in Arbeit` · `fertig (geprüft)` · `blockiert`

## Vor dem ersten Code: zwei Risikotests

Beide können die Architektur noch kippen und kosten wenig. Details in [open-questions.md](open-questions.md).

| # | Test | Status | Ergebnis |
|---|---|---|---|
| R1 | Rufumleitung bei Nichtmelden mit dem echten Pilot-Anschluss: Kommt die Nummer des Anrufers an? Wie lange klingelt es? | als Nächstes | AP-001 **freigegeben**; Termin beim Piloten **Freitag 2026-09-25** |
| R2 | Star-Drucker: CloudPRNT-Abfrage und lokaler Druck aus einer HTTPS-PWA ohne Internet | als Nächstes | AP-002 weiter **vorgeschlagen**. Hinweis: durch ADR 0008 druckt der Pilot bei **Lieferung zwei Exemplare** — für den Druckertest einplanen |

## Konzeptphase — vor dem ersten Code

Von Sirat am 2026-09-18 festgelegt: erst konzipieren, dann entwickeln. Elf Artefakte K1–K11 für den Piloten-Durchstich; Landkarte und Status in [konzept/README.md](konzept/README.md), je Artefakt ein Arbeitspaket (AP-003 … AP-013). Läuft parallel zu R1 und R2.

| # | Schritt | Status | Anmerkung |
|---|---|---|---|
| K | Konzept für den Piloten-Durchstich (K1–K11) | in Arbeit | K1 fast durchgegangen (16 von 22 Fällen mit Sirat besprochen); K2–K11 offen — `/konzept` |
| K1 | Fachliche Anwendungsfälle (AP-003) | in Arbeit | **22 Entwürfe**, davon **3 zurückgestellt** (FA-08/09/10, Fahrer-Teil, ADR 0008). Einzeldurchsicht: **16 von 22 Fällen mit Sirat durchgegangen** (FA-01, 05, 06, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23; Runden 32–50). **FA-02/03/04** warten auf AP-001 (Rufumleitungs-Test, Freitag **2026-09-25**), danach nachziehen. Heute neu: ADR **0011** (Wechselgeld ohne Bestätigung, Inhaber-Abschluss auch vom Handy, keine eigene Storno-Anzeige, geänderter Bon als Angebot) ADR **0012** (Wechselgeld ganz aus dem System) und ADR **0013** (Internetausfall: KI pausiert automatisch, Papier statt Warteschlange, kein Nachtrag — Abweichung von [FEST 18] nur für den Piloten). **Kein Kreuzverhör, keine Abnahme.** Nächster Schritt: Kreuzverhör (`grilling`) der 16 Fälle, Testszenario-Labels bereinigen (Befund A3), FA-02/03/04 nach dem Freitag-Test |

## Bauschritte

| # | Schritt | Status | Anmerkung |
|---|---|---|---|
| 0 | Agentic Operating System (dieses Repo: Agenten, Skills, Hooks, Regeln, Doku) | fertig (geprüft) | 2026-09-18 |
| 0b | Monorepo-Gerüst: pnpm-Workspace, TypeScript-Basis, Vitest, Prettier, dependency-cruiser-Regeln | offen | Erst auf Ansage und nach der Konzeptphase. pnpm ist noch nicht installiert |
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
