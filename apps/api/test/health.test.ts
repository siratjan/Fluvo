import { describe, expect, it } from 'vitest';

// apps/api Gesundheitsendpunkt. Rot, solange apps/api/src/app.ts (buildApp) fehlt:
// der Import ist nicht aufloesbar. Getestet wird ueber fastify.inject, ohne Netz.
import { buildApp } from '../src/app.js';

describe('apps/api /health', () => {
  it('answers 200 with { ok: true }', async () => {
    const app = buildApp();
    try {
      const response = await app.inject({ method: 'GET', url: '/health' });
      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ ok: true });
    } finally {
      await app.close();
    }
  });
});
