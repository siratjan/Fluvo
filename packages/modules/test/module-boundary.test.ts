import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { cruise, type IConfiguration } from 'dependency-cruiser';
import { beforeAll, describe, expect, it } from 'vitest';

// Modulgrenze: `modules/*` darf nur core/schemas/db (plus npm/Node-Builtins) importieren,
// nie ein anderes Modul und nichts ausserhalb der Modulwelt (z. B. `apps/`).
// Dieser Test wendet die dependency-cruiser-Regeln `no-cross-module` und `module-allowed-deps`
// auf die Fixtures an. Rot, solange `.dependency-cruiser.cjs` fehlt: das Laden der Konfiguration wirft.

const require = createRequire(import.meta.url);
const configPath = fileURLToPath(new URL('../../../.dependency-cruiser.cjs', import.meta.url));
// alpha importiert ein anderes Modul (bravo) → Verstoss `no-cross-module`.
const crossModuleFixture = fileURLToPath(new URL('../__fixtures__/alpha', import.meta.url));
// delta importiert eine Repo-Datei ausserhalb der erlaubten Deps → Verstoss `module-allowed-deps`.
const disallowedDepFixture = fileURLToPath(new URL('../__fixtures__/delta', import.meta.url));
// charlie importiert @fluvo/core → erlaubt, muss sauber aufloesen.
const allowedFixture = fileURLToPath(new URL('../__fixtures__/charlie', import.meta.url));

interface Violation {
  readonly rule: { readonly name: string };
}

interface Dependency {
  readonly module: string;
  readonly resolved?: string;
  readonly couldNotResolve?: boolean;
}

interface Module {
  readonly source: string;
  readonly dependencies: readonly Dependency[];
}

interface CruiseOutput {
  readonly summary: { readonly violations: readonly Violation[] };
  readonly modules: readonly Module[];
}

function loadConfig(): IConfiguration {
  // Wirft jetzt (Datei fehlt) → Test rot aus dem richtigen Grund.
  // require liefert unknown-artig; die Form ist die dokumentierte Konfigurationsform von dependency-cruiser.
  return require(configPath) as IConfiguration;
}

async function cruiseFixture(target: string): Promise<CruiseOutput> {
  const { options, ...ruleSet } = loadConfig();
  const result = await cruise(
    [target],
    {
      ...options,
      // Die cruise-API prueft Regeln nur mit validate: true (die CLI setzt das selbst).
      validate: true,
      ruleSet,
    },
    // Auf die im Konfig hinterlegten Resolver-Optionen zurueckfallen.
    options?.enhancedResolveOptions,
  );
  const output = result.output;
  if (typeof output === 'string') {
    throw new Error('unexpected string output from dependency-cruiser');
  }
  // Bekannter Ergebnis-Shape von dependency-cruiser; wir lesen summary.violations und modules.
  return output as CruiseOutput;
}

async function violationNamesFor(target: string): Promise<readonly string[]> {
  const output = await cruiseFixture(target);
  return output.summary.violations.map((v) => v.rule.name);
}

describe('module boundary rules', () => {
  let configExists = false;
  beforeAll(() => {
    try {
      loadConfig();
      configExists = true;
    } catch {
      configExists = false;
    }
  });

  it('config .dependency-cruiser.cjs exists', () => {
    expect(configExists).toBe(true);
  });

  it('flags a module importing another module (no-cross-module)', async () => {
    const names = await violationNamesFor(crossModuleFixture);
    expect(names).toContain('no-cross-module');
  });

  it('flags a module importing outside the allowed deps (module-allowed-deps)', async () => {
    const names = await violationNamesFor(disallowedDepFixture);
    expect(names).toContain('module-allowed-deps');
  });

  it('allows a module importing @fluvo/core and resolves the import', async () => {
    const output = await cruiseFixture(allowedFixture);
    // Kein einziger Regelverstoss fuer den erlaubten Import.
    expect(output.summary.violations).toHaveLength(0);
    // Der Import ist tatsaechlich aufgeloest — nicht nur regelkonform, sondern real vorhanden.
    const coreDep = output.modules
      .flatMap((m) => m.dependencies)
      .find((d) => d.module === '@fluvo/core');
    expect(coreDep).toBeDefined();
    expect(coreDep?.couldNotResolve).not.toBe(true);
    expect(coreDep?.resolved).toBeTruthy();
  });
});
