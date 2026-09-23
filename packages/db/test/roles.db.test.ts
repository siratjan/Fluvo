import { Client } from 'pg';
import { z } from 'zod';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

// DB-Rauchtest gegen echtes PostgreSQL, verbunden als Laufzeitrolle `fluvo_app`.
// Laeuft nur ueber `pnpm test:db`. Ohne erreichbare DB schlaegt er mit einer
// klaren Meldung fehl, statt still zu ueberspringen (kein Mock — RLS laesst sich nicht mocken).

const EnvSchema = z.object({
  PGHOST: z.string().min(1).default('localhost'),
  PGPORT: z.coerce.number().int().positive().default(5432),
  PGDATABASE: z.string().min(1).default('fluvo_test'),
  FLUVO_APP_USER: z.string().min(1).default('fluvo_app'),
  // Nur fuer die lokale Test-DB; ohne .env leer — der Verbindungsversuch scheitert
  // dann bereits an der Erreichbarkeit, nicht an der Anmeldung.
  FLUVO_APP_PASSWORD: z.string().default(''),
});

const env = EnvSchema.parse(process.env);

const CONNECT_TIMEOUT_MS = 2000;

function newAppClient(): Client {
  return new Client({
    host: env.PGHOST,
    port: env.PGPORT,
    database: env.PGDATABASE,
    user: env.FLUVO_APP_USER,
    password: env.FLUVO_APP_PASSWORD,
    connectionTimeoutMillis: CONNECT_TIMEOUT_MS,
  });
}

async function connectAppOrFail(): Promise<Client> {
  const client = newAppClient();
  try {
    await client.connect();
    return client;
  } catch {
    // Aufraeumen nach fehlgeschlagenem connect(): der Client hat keine offene Verbindung,
    // end() kann daher noch fehlschlagen. Das ist beim Abbruch unschaedlich — der eigentliche,
    // aussagekraeftige Fehler ist der folgende throw; ein end()-Fehler wuerde ihn nur verdecken.
    await client.end().catch(() => {});
    // Bewusst ohne technische Details / Personendaten in der Meldung.
    throw new Error('DB nicht erreichbar — pnpm db:up');
  }
}

describe('db runtime role fluvo_app', () => {
  let client: Client;

  beforeAll(async () => {
    client = await connectAppOrFail();
  });

  afterAll(async () => {
    // Teardown: Verbindung schliessen. Ein Fehler hier (z. B. bereits geschlossen, weil
    // beforeAll scheiterte) darf den Testlauf nicht kippen — es gibt nichts mehr aufzuraeumen,
    // und eine Fehlermeldung beim Schliessen hat keinen Aussagewert. Deshalb bewusst geschluckt.
    if (client) await client.end().catch(() => {});
  });

  it('runs as a restricted role: rolsuper/rolbypassrls/rolcreaterole/rolcreatedb are all false', async () => {
    const res = await client.query<{
      rolsuper: boolean;
      rolbypassrls: boolean;
      rolcreaterole: boolean;
      rolcreatedb: boolean;
    }>(
      `select rolsuper, rolbypassrls, rolcreaterole, rolcreatedb
         from pg_roles where rolname = current_user`,
    );
    const row = res.rows[0];
    expect(row).toBeDefined();
    expect(row?.rolsuper).toBe(false);
    expect(row?.rolbypassrls).toBe(false);
    expect(row?.rolcreaterole).toBe(false);
    expect(row?.rolcreatedb).toBe(false);
  });

  it('is not the owner of the database', async () => {
    const res = await client.query<{ is_owner: boolean }>(
      `select (d.datdba = r.oid) as is_owner
         from pg_database d
         join pg_roles r on r.rolname = current_user
        where d.datname = current_database()`,
    );
    expect(res.rows[0]?.is_owner).toBe(false);
  });

  it('is not the owner of the public schema', async () => {
    const res = await client.query<{ is_owner: boolean }>(
      `select (n.nspowner = r.oid) as is_owner
         from pg_namespace n
         join pg_roles r on r.rolname = current_user
        where n.nspname = 'public'`,
    );
    expect(res.rows[0]?.is_owner).toBe(false);
  });

  it('has a separate migrator role fluvo_migrator', async () => {
    const res = await client.query(`select 1 from pg_roles where rolname = 'fluvo_migrator'`);
    expect(res.rowCount).toBe(1);
  });

  it('rejects reading app.tenant_id when it is not set (no missing_ok fallback)', async () => {
    await expect(client.query(`select current_setting('app.tenant_id')`)).rejects.toThrow();
  });

  it('has PostGIS available in the fluvo database (postgis_version returns a value)', async () => {
    const res = await client.query<{ version: string | null }>(
      `select postgis_version() as version`,
    );
    expect(res.rows[0]?.version).toBeTruthy();
  });

  it('cannot create a table in public — DDL denied (SQLSTATE 42501)', async () => {
    await expect(client.query(`create table public.t_probe (x int)`)).rejects.toMatchObject({
      code: '42501',
    });
  });

  it('cannot create a schema — DDL denied (SQLSTATE 42501)', async () => {
    await expect(client.query(`create schema x_probe`)).rejects.toMatchObject({
      code: '42501',
    });
  });

  it('has exactly the extensions plpgsql and postgis installed — no PostGIS extras', async () => {
    const res = await client.query<{ extname: string }>(
      `select extname from pg_extension order by extname`,
    );
    expect(res.rows.map((r) => r.extname)).toEqual(['plpgsql', 'postgis']);
  });

  it('has none of the PostGIS extra schemas tiger, tiger_data, topology', async () => {
    const res = await client.query<{ nspname: string }>(
      `select nspname from pg_namespace
        where nspname in ('tiger', 'tiger_data', 'topology')
        order by nspname`,
    );
    expect(res.rows.map((r) => r.nspname)).toEqual([]);
  });

  it('cannot write to public.spatial_ref_sys — write denied (SQLSTATE 42501)', async () => {
    await expect(
      client.query(`update public.spatial_ref_sys set srid = srid where false`),
    ).rejects.toMatchObject({ code: '42501' });
  });

  it('has a restricted migrator role fluvo_migrator (rolsuper/rolbypassrls/rolcreaterole all false)', async () => {
    const res = await client.query<{
      rolsuper: boolean;
      rolbypassrls: boolean;
      rolcreaterole: boolean;
    }>(
      `select rolsuper, rolbypassrls, rolcreaterole
         from pg_roles where rolname = 'fluvo_migrator'`,
    );
    const row = res.rows[0];
    expect(row).toBeDefined();
    expect(row?.rolsuper).toBe(false);
    expect(row?.rolbypassrls).toBe(false);
    expect(row?.rolcreaterole).toBe(false);
  });
});
