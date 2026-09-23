#!/usr/bin/env bash
# Ersteinrichtung der lokalen fluvo-Datenbank. Läuft einmalig beim ersten Containerstart
# (leeres Volume) als Superuser `postgres` über docker-entrypoint-initdb.d.
#
# Legt an:
#   - Eigentümer-Rolle (FLUVO_MIGRATOR_USER): besitzt Datenbank und Schema, führt DDL/Migrationen aus.
#     Kein Superuser, darf RLS nicht umgehen, darf keine Rollen oder Datenbanken anlegen.
#   - Laufzeitrolle (FLUVO_APP_USER): kein Superuser, darf RLS nicht umgehen, darf keine Rollen oder
#     Datenbanken anlegen, Eigentümer von nichts. Bekommt nur CONNECT auf die Datenbank und USAGE
#     auf das Schema. Tabellenrechte vergibt jede Migration selbst (AP-015), damit RLS immer greift.
#   - Datenbank (FLUVO_DB_NAME) mit Eigentümer FLUVO_MIGRATOR_USER.
#   - Schema `public` im Besitz von FLUVO_MIGRATOR_USER, ohne Rechte für PUBLIC.
#
# Werte kommen ausschließlich aus Umgebungsvariablen. psql-Variablen (:"…" für Namen, :'…' für
# Literale) quoten sauber, es werden keine SQL-Strings zusammengesetzt.
set -euo pipefail

: "${FLUVO_DB_NAME:?}" "${FLUVO_APP_USER:?}" "${FLUVO_APP_PASSWORD:?}"
: "${FLUVO_MIGRATOR_USER:?}" "${FLUVO_MIGRATOR_PASSWORD:?}"

psql --no-psqlrc -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname postgres \
  -v db_name="$FLUVO_DB_NAME" \
  -v app_user="$FLUVO_APP_USER" \
  -v app_password="$FLUVO_APP_PASSWORD" \
  -v migrator_user="$FLUVO_MIGRATOR_USER" \
  -v migrator_password="$FLUVO_MIGRATOR_PASSWORD" <<'SQL'
CREATE ROLE :"migrator_user" LOGIN PASSWORD :'migrator_password'
  NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS;

CREATE ROLE :"app_user" LOGIN PASSWORD :'app_password'
  NOSUPERUSER NOCREATEDB NOCREATEROLE NOREPLICATION NOBYPASSRLS NOINHERIT;

-- Aus dem PostGIS-Template geklont, damit die fluvo-DB PostGIS (Liefergebiete/Geodaten) mitbringt.
-- Das Image legt `template_postgis` (mit installierter Extension postgis) beim ersten Start an;
-- entstuende die DB aus dem Standard-template1, fehlte PostGIS. postgis_version() ist per PUBLIC
-- ausfuehrbar, die Laufzeitrolle braucht dafuer kein eigenes Recht.
CREATE DATABASE :"db_name" OWNER :"migrator_user" TEMPLATE template_postgis;

REVOKE ALL ON DATABASE :"db_name" FROM PUBLIC;
GRANT CONNECT ON DATABASE :"db_name" TO :"app_user";

\connect :"db_name"

-- Das PostGIS-Template bringt neben dem Kern-PostGIS noch Zusatz-Extensions mit, die fluvo nicht
-- braucht: postgis_tiger_geocoder (Schemas tiger, tiger_data), postgis_topology (Schema topology)
-- und fuzzystrmatch. Als Superuser (nach \connect noch die Einrichtungssitzung) wieder entfernen,
-- damit nur plpgsql und postgis bleiben. CASCADE raeumt abhaengige Objekte mit ab.
DROP EXTENSION IF EXISTS postgis_tiger_geocoder CASCADE;
DROP EXTENSION IF EXISTS postgis_topology CASCADE;
DROP EXTENSION IF EXISTS fuzzystrmatch CASCADE;

-- Die Extensions lassen ihre (nun leeren) Schemas zurueck; die gehoeren nicht zu fluvo.
DROP SCHEMA IF EXISTS tiger CASCADE;
DROP SCHEMA IF EXISTS tiger_data CASCADE;
DROP SCHEMA IF EXISTS topology CASCADE;

-- Schema public gehoert dem Migrator; PUBLIC hat darauf keinerlei Rechte (kein USAGE, kein CREATE).
-- Die PostGIS-Referenzobjekte (spatial_ref_sys, geometry_columns, geography_columns) behalten
-- bewusst ihr per Extension gesetztes SELECT-Recht fuer PUBLIC: reine Nachschlagetabellen, nur
-- lesbar, ohne Personenbezug und ohne Tenant. Schreibrechte fuer PUBLIC gibt es darauf keine.
ALTER SCHEMA public OWNER TO :"migrator_user";
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO :"app_user";
SQL
