import { describe, expect, it } from 'vitest';

// Pakethuelle @fluvo/core. Rot, solange packages/core kein package.json und
// keinen Platzhalter-Export hat: der Import ueber den Paketnamen ist nicht aufloesbar.
describe('@fluvo/core package hull', () => {
  it('is importable by its package name and exposes a placeholder export', async () => {
    const mod = await import('@fluvo/core');
    expect(mod.packageName).toBe('@fluvo/core');
  });
});
