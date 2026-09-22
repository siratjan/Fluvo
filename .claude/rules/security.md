# Sicherheit und Datenschutz im Code

- **Keine Geheimnisse im Repo.** Schlüssel nur über Umgebungsvariablen; `.env*` ist ignoriert; `.env.example` enthält nur Namen. Getrennte Schlüssel je Umgebung.
- **Keine Personendaten** (Rufnummer, Name, Adresse, Freitext, E-Mail) in Logs, Fehlermeldungen, URLs, Sentry, Job-Namen, Testdaten. Geloggt werden IDs.
- **Kein Audio**, keine Aufzeichnung, kein dauerhaftes Volltranskript.
- Jede Eingabe wird an der Grenze mit Zod geprüft — auch Webhooks und Function-Call-Argumente der KI.
- Webhooks: erst Signatur über den rohen Body prüfen, dann verarbeiten; idempotent über die Ereignis-ID.
- DB-Zugriff nur über `withTenant`. Keine zusammengesetzten SQL-Strings.
- `order_events` und Kassendaten: nur anfügen.
- Beträge, Preise und Berechtigungen kommen vom Server, nie vom Client.
- Tokens (QR, E-Mail-Link, Geräte): zufällig (mind. 128 Bit), gebunden an Tenant und Zweck, ablaufend, nur als Hash gespeichert, nie geloggt.
- PIN-Login nur zusammen mit registriertem Gerät, mit Rate-Limit und Sperre.
- Öffentliche Endpunkte haben Rate-Limits. CORS und Sicherheits-Header eng.
- Zahlung nur über gehostete Zahlseiten. Keine Kartendaten berühren.
- Ausgaben eines LLM sind nicht vertrauenswürdig und lösen nie unmittelbar etwas aus, das Geld kostet.
- Neuer externer Dienst = neuer Unterauftragsverarbeiter → Rückfrage an Sirat, Eintrag in `docs/open-questions.md`.
