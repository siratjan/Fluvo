// VERBOTEN: ein Modul importiert eine Datei ausserhalb der erlaubten Abhaengigkeiten
// (`@fluvo/core`, `@fluvo/schemas`, `@fluvo/db`, npm-Pakete, Node-Builtins). Hier eine
// beliebige Repo-Datei ausserhalb der Modulwelt — stellvertretend fuer z. B. einen Import
// aus `apps/`. Die Regel `module-allowed-deps` (nicht `no-cross-module`) muss das melden.
import config from '../../../../vitest.config.js';

export const deltaValue = typeof config;
