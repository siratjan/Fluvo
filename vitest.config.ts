import { defineConfig } from 'vitest/config';

// Zwei getrennte Projekte:
//   unit — schnelle Tests ohne Netz/DB (*.test.ts, aber nicht *.db.test.ts)
//   db   — Tests gegen echtes PostgreSQL (*.db.test.ts), nur ueber `pnpm test:db`
// `pnpm test` laeuft nur das unit-Projekt und schliesst DB-Tests aus.
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['{apps,packages}/**/*.test.ts'],
          exclude: ['**/*.db.test.ts', '**/node_modules/**', '**/dist/**', '**/__fixtures__/**'],
        },
      },
      {
        test: {
          name: 'db',
          include: ['{apps,packages}/**/*.db.test.ts'],
          exclude: ['**/node_modules/**', '**/dist/**'],
          // Zugangsdaten kommen aus der lokalen Umgebungsdatei, nie aus dem Repo.
          setupFiles: ['packages/db/test/load-env.ts'],
        },
      },
    ],
  },
});
