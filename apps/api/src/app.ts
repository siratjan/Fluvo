import { fastify, type FastifyInstance } from 'fastify';

// Baut die App ohne zu lauschen, damit Tests über inject() ohne Netz laufen.
// Logger bleibt aus, bis ein Logger ohne Personendaten konfiguriert ist.
export function buildApp(): FastifyInstance {
  const app = fastify({ logger: false });

  app.get('/health', async () => ({ ok: true }));

  return app;
}
