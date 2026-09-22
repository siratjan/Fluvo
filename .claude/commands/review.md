---
description: Prüft die aktuellen Änderungen mit den passenden fluvo-Reviewern
argument-hint: [Pfad oder Zweig, optional]
---

Prüfe die aktuellen Änderungen ($ARGUMENTS, sonst `git diff` inkl. gestageter Dateien).

1. Immer: `code-reviewer`.
2. Zusätzlich, parallel, je nach betroffenen Dateien:
   - `packages/db`, Migrationen, Abfragen → `database-reviewer` **und** `tenant-isolation-guard`
   - Routen, Middleware, Jobs, Webhooks, WebSockets → `tenant-isolation-guard`, `security-reviewer`
   - `modules/voice` → `voice-integrator`, `compliance-guard`
   - `modules/fiscal`, `modules/privacy`, Logging, Personendaten, Website-Checkout → `compliance-guard`
   - Webhooks, Druck, Offline-Warteschlange, Adapter → `silent-failure-hunter`
3. Fasse zusammen: Blocker zuerst, dann Wichtiges, dann Hinweise — jeweils mit Datei:Zeile. Doppelte Befunde zusammenführen.
4. Sag klar, ob die Änderung so eingecheckt werden kann.

Ändere nichts, bevor ich es sage.
