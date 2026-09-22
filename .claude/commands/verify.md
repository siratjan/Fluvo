---
description: Phase 5 des Arbeitszyklus — Standards, Sicherheit und Testabdeckung verifizieren
argument-hint: [AP-Nummer, optional]
---

Verifiziere den aktuellen Stand (Arbeitspaket: $ARGUMENTS). Das ist Phase 5 des Arbeitszyklus; sie kommt nach `/review` und vor `/handoff`.

1. Falls im Repo-Wurzelverzeichnis noch kein `package.json` liegt: Sag, dass es noch nichts zu verifizieren gibt, und höre auf.
2. **Standards** — der Reihe nach ausführen, Ausgabe sammeln: `pnpm typecheck`, `pnpm lint` (falls vorhanden), `pnpm prettier --check .`, `pnpm depcruise`.
3. **Tests und Abdeckung** — `pnpm test --coverage`. Prüfe zusätzlich von Hand gegen `.claude/rules/testing.md`: Gibt es für jeden in diesem Paket berührten Pflichtbereich Tests (Zustandsmaschine, Preise, `createOrder`, Mandantentrennung mit Zwei-Tenant-Test, Idempotenz, Event-Log, Kassensturz, Webhooks)? Eine Prozentzahl allein genügt nicht.
4. **Sicherheit** — Agent `security-reviewer` auf die Änderungen dieses Pakets; dazu `pnpm audit --prod`. Bei DB/Routen/Jobs zusätzlich `tenant-isolation-guard`, bei Personendaten/Voice/Kasse `compliance-guard` — sofern sie in Phase 4 nicht schon auf genau diesem Stand gelaufen sind.
5. **Bericht** als Tabelle: Prüfung · grün/rot · relevante Ausgabe. Danach: Was blockiert den Abschluss, was ist eine benannte Abweichung, die Sirat akzeptieren müsste.
6. Trage das Ergebnis in die Zyklus-Checkliste des Arbeitspakets ein. Ist alles grün: Phase auf `Sichern` setzen. Sonst: zurück in Phase 2 oder 3, mit Begründung.

Nichts reparieren, bevor berichtet wurde. Nichts beschönigen.
