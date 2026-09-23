import { describe, expect, it } from 'vitest';

// Pakethuelle @fluvo/db. Rot, solange packages/db kein package.json und
// keinen Platzhalter-Export hat: der Import ueber den Paketnamen ist nicht aufloesbar.
describe('@fluvo/db package hull', () => {
  it('is importable by its package name and exposes a placeholder export', async () => {
    const mod = await import('@fluvo/db');
    expect(mod.packageName).toBe('@fluvo/db');
  });
});
