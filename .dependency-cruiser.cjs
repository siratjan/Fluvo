// Modulgrenze nach Briefing §5.1: `packages/modules/*` importiert nur `@fluvo/core`,
// `@fluvo/schemas`, `@fluvo/db` sowie npm-Pakete und Node-Builtins — nie ein anderes Modul.
// Module sprechen miteinander ausschließlich über Events des Kerns.
//
// Das Pfadmuster lässt den Zwischenschritt `__fixtures__/` zu, damit der Test
// `packages/modules/test/module-boundary.test.ts` die Regel an absichtlich verbotenen
// Importen nachweisen kann. Echte Module liegen nie unter `__fixtures__/`; für sie gilt die
// Regel unverändert. `pnpm depcruise` schließt `__fixtures__` per `--exclude` aus.
const MODULE = '^packages/modules/(?:__fixtures__/)?([^/]+)/';
const SAME_MODULE = '^packages/modules/(?:__fixtures__/)?$1/';

/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-cross-module',
      comment:
        'Ein Modul importiert ein anderes Modul. Module sprechen nur über Events des Kerns miteinander.',
      severity: 'error',
      from: { path: MODULE },
      to: { path: MODULE, pathNot: SAME_MODULE },
    },
    {
      name: 'module-allowed-deps',
      comment:
        'Module dürfen nur @fluvo/core, @fluvo/schemas, @fluvo/db, npm-Pakete und Node-Builtins importieren.',
      severity: 'error',
      from: { path: MODULE },
      to: {
        dependencyTypesNot: ['core'],
        pathNot: [SAME_MODULE, '^packages/(?:core|schemas|db)/', '(?:^|/)node_modules/'],
      },
    },
  ],
  options: {
    doNotFollow: { path: 'node_modules' },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default', 'types'],
      extensions: ['.ts', '.js', '.mjs', '.cjs', '.json'],
      mainFields: ['main', 'types', 'typings'],
    },
    skipAnalysisNotInRules: true,
  },
};
