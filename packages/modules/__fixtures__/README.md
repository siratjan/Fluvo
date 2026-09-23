# Fixtures fuer die Modulgrenzen-Pruefung

Diese Dateien sind **kein** Produktionscode. Sie dienen nur dem Test
`packages/modules/test/module-boundary.test.ts`, der die dependency-cruiser-Regel
`no-cross-module` gegen absichtlich verbotene und erlaubte Importe prueft.

- `alpha/` importiert `bravo/` — ein Modul importiert ein anderes Modul → **verboten** (`no-cross-module`).
- `delta/` importiert eine Repo-Datei ausserhalb der Modulwelt (stellvertretend fuer z. B. `apps/`) → **verboten** (`module-allowed-deps`).
- `charlie/` importiert `@fluvo/core` — Modul importiert den Kern → **erlaubt**, und der Import loest sauber auf.

Dieser Ordner ist ausgenommen von:

- `tsconfig.json` (typecheck) — die Importe sind absichtlich nicht aufloesbar/regelwidrig,
- der normalen `pnpm depcruise`-Prueflaeufe (via `--exclude __fixtures__` im Skript in `package.json`;
  `options.exclude` in der Konfiguration wuerde die Fixtures auch dem Test entziehen),
- Prettier (`.prettierignore`).

Damit die Regel `no-cross-module` diese Fixtures dennoch als Module erkennt, muss ihr
Pfadmuster den `__fixtures__/`-Zwischenschritt zulassen, z. B.
`packages/modules/(?:__fixtures__/)?([^/]+)/`. Reale Module liegen nie unter
`__fixtures__`, die Regel fuer Produktionscode wird dadurch nicht schwaecher.
