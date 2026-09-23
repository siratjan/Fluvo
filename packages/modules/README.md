# packages/modules

Hier liegen die Fachmodule von fluvo (z. B. `intake`, `voice`, `kitchen`, `printing`, `fiscal`), je Modul ein Ordner `packages/modules/<name>/`. Noch gibt es keines.

## Grenzregel (maschinell geprüft)

- Ein Modul importiert **nur** `@fluvo/core`, `@fluvo/schemas` und `@fluvo/db` sowie npm-Pakete und Node-Builtins.
- Ein Modul importiert **nie** ein anderes Modul und nie etwas aus `apps/`.
- Module sprechen miteinander ausschließlich über **Events des Kerns**.

Geprüft wird das von dependency-cruiser (`.dependency-cruiser.cjs`, Regeln `no-cross-module` und `module-allowed-deps`) mit `pnpm depcruise`. Der Nachweis, dass die Regel greift, steht in `test/module-boundary.test.ts` mit den Beispielen unter `__fixtures__/`.
