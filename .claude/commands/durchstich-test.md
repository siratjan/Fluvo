---
description: Führt alle Prüfungen und den Durchstich-Test Anruf → Bestellung → Bon aus
---

Prüfe den Gesamtstand von fluvo.

1. Falls noch kein `package.json` im Repo-Wurzelverzeichnis liegt: Sag, dass es noch keinen Code gibt, und höre auf.
2. Der Reihe nach ausführen und die Ausgabe sammeln: `pnpm typecheck`, `pnpm test`, `pnpm depcruise`.
3. Agent `e2e-runner`: Ablauf 1 (Durchstich) und, soweit schon gebaut, die weiteren Abläufe seiner Liste.
4. Bericht: je Prüfung grün/rot mit der relevanten Ausgabe, welche Abläufe noch fehlen. Nichts beschönigen.

Bei roten Prüfungen nicht selbst reparieren — erst berichten.
