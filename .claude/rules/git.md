# Git

- **Zentrales Repo:** https://github.com/siratjan/Fluvo.git (`origin`), Hauptzweig `main`. Aller Code, die Doku und das Operating System liegen dort.
- Vor jedem Push prüfen, dass nichts Vertrauliches mitgeht — keine Geheimnisse, keine Kundendaten, nichts aus dem Business Brain (auch nicht in Commit-Nachrichten, PR-Texten, Issues).

- Commit und Push nur, wenn Sirat es ansagt. Nie direkt auf `main` arbeiten, sobald Code existiert — Zweig je Aufgabe (`feat/…`, `fix/…`, `docs/…`).
- Kleine Commits, ein Thema. Format: `<typ>(<bereich>): <was>` — Typen `feat`, `fix`, `test`, `refactor`, `docs`, `chore`; Bereich = Paket oder Modul (`core`, `voice`, `db`, `web-staff`, `os`). Nachricht auf Deutsch oder Englisch, aber einheitlich je Repo: **Englisch**.
- Vor dem Commit: `pnpm typecheck`, `pnpm test`, `pnpm depcruise` grün; `code-reviewer` gelaufen.
- Nie Hooks umgehen (`--no-verify`), nie `push --force` auf geteilte Zweige, keine Historie umschreiben ohne Ansage.
- Migrationen werden nie nachträglich geändert, sobald sie eingecheckt sind — neue Migration schreiben.
- Nicht ins Repo: `.env*`, Schlüssel, Datenbank-Dumps, echte Kundendaten, Audiodateien, `node_modules`, Build-Ausgaben.
