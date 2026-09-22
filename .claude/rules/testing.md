# Tests

- Tests zuerst für: Zustandsmaschine, Preise/Summen, `createOrder`, Mandantentrennung, Idempotenz, Event-Log, Kassensturz, Webhooks. Ohne Test kein Code in diesen Bereichen.
- Werkzeuge: Vitest (Einheit/Integration), Playwright (Ende-zu-Ende), axe (Barrierefreiheit der Website).
- Datenbank-Tests laufen gegen echtes PostgreSQL mit der Laufzeitrolle `fluvo_app` — nie gegen Mocks, nie mit der Eigentümer-Rolle (sonst greift RLS nicht).
- Jede neue Route und jede neue Abfrage hat einen Zwei-Tenant-Test (Skill `fluvo-multi-tenant`).
- Externe Anbieter werden am Adapter ersetzt, nicht tiefer. Tests gegen Sandbox-Umgebungen sind getrennt markiert und laufen nicht standardmäßig.
- Ein Test prüft Verhalten, nicht Umsetzung. Er muss zuerst rot gewesen sein.
- Keine festen Wartezeiten, keine Abhängigkeit von Reihenfolge oder Uhrzeit (Uhr wird hereingereicht).
- Testdaten sind erfunden und erkennbar unecht (Rufnummern aus dem Bereich `+49 30 23125 xxx` o. Ä., keine echten Adressen von Kunden).
- Ein roter Test wird nicht gelöscht, übersprungen oder angepasst, um grün zu werden — außer die Anforderung hat sich geändert, dann mit Begründung im Commit.
- Vor „fertig": `pnpm typecheck`, `pnpm test`, `pnpm depcruise` grün. Ergebnis ehrlich berichten, auch wenn etwas rot ist.
