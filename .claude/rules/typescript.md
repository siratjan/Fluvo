# TypeScript

- `strict: true`, dazu `noUncheckedIndexedAccess` und `exactOptionalPropertyTypes`. ESM überall.
- Kein `any`. Kein `as`-Cast, kein `@ts-ignore`/`@ts-expect-error` ohne Kommentar mit Begründung. Unbekanntes ist `unknown` und wird mit Zod geprüft.
- **Eine Definition je Datenform:** Zod-Schema in `packages/schemas`, Typ per `z.infer`. Keine handgeschriebenen Doppel-Typen in Apps oder Modulen.
- Validierung an jeder Systemgrenze: HTTP-Eingang, Webhook, Function-Call-Argumente der KI, Job-Payload, IndexedDB-Inhalt, Umgebungsvariablen (einmal beim Start).
- Geld: Ganzzahl in Cent, Typname `Cents`. Zeit: `Date`/ISO-String in UTC, Anzeige in der Zeitzone des Tenants. Dauer: Sekunden.
- Status und Arten als String-Literal-Unions aus dem Schema, keine `enum`s, keine freien Strings.
- Fehler: erwartbare Fälle (Artikel nicht verfügbar, außerhalb Liefergebiet) als typisiertes Ergebnis zurückgeben, nicht werfen. Geworfen wird nur Unerwartetes. Kein leeres `catch`.
- Kein Promise ohne `await` oder ausdrückliche Fehlerbehandlung.
- Funktionen im Kern sind möglichst rein: Eingabe → Ergebnis + Events. Uhrzeit und Zufall werden hereingereicht (testbar).
- Importe: Pakete über ihren Namen (`@fluvo/core`), nie über relative Pfade in ein anderes Paket. Module importieren nur `core`, `schemas`, `db`.
- Externe SDKs (Retell, fiskaly, Stripe, Mollie, Star) nur innerhalb ihres Adapters.
- Neue Abhängigkeit nur mit Rückfrage. Bevorzugt: was Postgres oder die Plattform schon kann.
- Benennung: Code und Bezeichner Englisch, Domänenbegriffe einheitlich (`order`, `tenant`, `menu`, `shift`, `settlement`). Kommentare erklären das Warum, nicht das Was.
- Formatierung macht Prettier, nicht der Mensch und nicht der Agent.
