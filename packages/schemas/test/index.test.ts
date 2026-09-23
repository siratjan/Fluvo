import { describe, expect, it } from 'vitest';

// Pakethuelle @fluvo/schemas. Rot, solange packages/schemas kein package.json und
// keinen Platzhalter-Export hat: der Import ueber den Paketnamen ist nicht aufloesbar.
describe('@fluvo/schemas package hull', () => {
  it('is importable by its package name and exposes a placeholder export', async () => {
    const mod = await import('@fluvo/schemas');
    expect(mod.packageName).toBe('@fluvo/schemas');
  });
});
