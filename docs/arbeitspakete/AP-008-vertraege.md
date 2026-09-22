# AP-008 · Konzept K6: Kern-Befehle, Ereignis-Katalog, API und Webhooks

- **Status:** vorgeschlagen
- **Angelegt:** 2026-09-18 · **Zuletzt geändert:** 2026-09-18
- **Herkunft:** Vorschlag Jarvis
- **Roadmap-Schritt:** K6
- **Entsteht Code?** nein
- **Phase:** —

## Ziel

Die Grenzen des Systems sind als Verträge festgelegt, bevor eine Seite gebaut ist: Kern-Befehle, Ereignis-Katalog, API-Endpunkte für den Durchstich und die Webhook-Verträge zu Voice-Plattform, TSE und Drucker.

## Einordnung

- **Berührt:** [FEST] Module sprechen nur über Kern-Events, ein `createOrder`, Anbieter hinter Adaptern · [STACK] Retell, fiskaly, Star CloudPRNT · [OFFEN] Q7
- **Business Brain:** `Modularer Monolith`, `Gehirn vs. Hände`
- **Nicht Teil dieses Pakets:** Zahlungs-Webhooks und Website-API (erst mit Roadmap-Schritt 6), Zod-Schemas

## Abnahmekriterien

- [ ] Je Kern-Befehl: Eingabe, Prüfungen in Reihenfolge, Ergebnis, typisierte Fehler, Events, Idempotenz
- [ ] Ereignis-Katalog: Nutzlasten ohne Personendaten, Reagierende, Wirkung
- [ ] API-Endpunkte für Annahme und Fahrer mit Rolle, Fehlerform, Tenant-Herkunft
- [ ] Webhook-Verträge aus der aktuellen Anbieter-Doku, nur genutzte Felder
- [ ] Bedeutung von leer/null/fehlend überall festgelegt
- [ ] Von `architect` und `security-reviewer` gegengelesen, von Sirat abgenommen

## Team

| Reihenfolge | Agent / Skill | Wofür |
|---|---|---|
| 1 | konzept-vertraege (Skill) | Vertrag-zuerst-Regeln |
| 2 | requirements-engineer | Entwurf |
| 3 | voice-integrator | Voice-Webhook aus aktueller Doku |
| 4 | architect | Gegenlesen |
| 5 | security-reviewer | Signaturen, Idempotenz, Tenant-Zuordnung |

## Schritte

1. `/konzept K6` — nachlesen, was Briefing und Business Brain schon sagen.
2. Im Gespräch mit Sirat klären, was nur er weiß.
3. Entwurf, Gegenprüfung gegen Nachbar-Artefakte, Kreuzverhör, Abnahme.

## Braucht von Sirat

—

## Ergebnis

_Noch offen._
