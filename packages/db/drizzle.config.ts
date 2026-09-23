import { defineConfig } from 'drizzle-kit';
import { z } from 'zod';

// Nur Konfiguration für drizzle-kit, noch ohne Tabellen und Migrationen (kommen mit AP-015).
// drizzle-kit arbeitet als Eigentümer-Rolle (Migrationen/DDL), nie als Laufzeitrolle.
// Die Werte kommen aus der Umgebung und werden beim Start einmal geprüft.
const MigratorEnvSchema = z.object({
  PGHOST: z.string().min(1),
  PGPORT: z.coerce.number().int().positive(),
  PGDATABASE: z.string().min(1),
  FLUVO_MIGRATOR_USER: z.string().min(1),
  FLUVO_MIGRATOR_PASSWORD: z.string().min(1),
});

const env = MigratorEnvSchema.parse(process.env);

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema',
  out: './migrations',
  dbCredentials: {
    host: env.PGHOST,
    port: env.PGPORT,
    database: env.PGDATABASE,
    user: env.FLUVO_MIGRATOR_USER,
    password: env.FLUVO_MIGRATOR_PASSWORD,
    ssl: false,
  },
});
