# Entwicklung — starten, testen, prüfen

Diese Seite erklärt, wie du fluvo auf deinem Rechner zum Laufen bringst, die Tests startest und vor „fertig" alles prüfst. Sie ist für dich geschrieben, nicht für einen Profi-Entwickler. Jeder Fachbegriff bekommt beim ersten Mal einen kurzen Halbsatz Erklärung.

Stand: 2026-09-23. Grundlage ist AP-014 (das Gerüst des Projekts).

---

## 1. Was vorher da sein muss

- **Windows 11** — dein Rechner.
- **Node 24** — die Laufzeit, die JavaScript/TypeScript außerhalb des Browsers ausführt. Das Projekt verlangt mindestens Version 24.
- **pnpm 12.6.0** — der Paket-Manager, der die Programmbausteine (Abhängigkeiten) herunterlädt und die Befehle bündelt. Die Version ist im Projekt fest hinterlegt.
- **WSL 2** — „Windows-Subsystem für Linux", eine Linux-Umgebung innerhalb von Windows. Docker braucht sie.
- **Docker Desktop** — das Programm, das die Datenbank in einem abgeschlossenen Container startet (ein Container ist eine kleine, gekapselte Umgebung, in der ein Programm sauber für sich läuft).

### pnpm einschalten

pnpm kommt über **corepack** (ein Node-Werkzeug, das den richtigen Paket-Manager in der richtigen Version bereitstellt). Der normale Befehl `corepack enable` braucht Administrator-Rechte. Ohne Admin-Rechte schaltest du pnpm so ein — der Befehl legt es in deinem Benutzerordner ab statt systemweit:

```bash
corepack enable pnpm --install-directory "%APPDATA%\npm"
```

---

## 2. Einmalig einrichten

Alle Abhängigkeiten holen (einmal nach dem Klonen, danach nur bei Änderungen):

```bash
pnpm install
```

### Die Datei `.env` anlegen

`.env` ist die lokale Datei mit deinen Zugangsdaten (Passwörter für die Datenbank). Sie liegt im Wurzelordner des Projekts und ist von git ausgeschlossen — sie landet also **nie** im Repo.

Vorgehen:

1. Kopiere `.env.example` zu `.env`. Die Vorlage enthält nur die Namen der Werte, keine Werte selbst.
2. Trage bei jedem Namen deinen eigenen lokalen Wert ein. Für die Passwörter nimm lange Zufallswerte.

Diese Namen stehen darin:

| Name | Wofür |
|---|---|
| `PGHOST` | Adresse der Datenbank (lokal `127.0.0.1`) |
| `PGPORT` | Port, über den die Datenbank erreichbar ist |
| `PGDATABASE` | Name der Datenbank |
| `POSTGRES_PASSWORD` | Passwort des Superusers — nur für die Ersteinrichtung im Container, die Anwendung nutzt ihn nie |
| `FLUVO_APP_USER` | Name der Laufzeitrolle (siehe Abschnitt 4) |
| `FLUVO_APP_PASSWORD` | Passwort der Laufzeitrolle |
| `FLUVO_MIGRATOR_USER` | Name der Eigentümer-Rolle (siehe Abschnitt 4) |
| `FLUVO_MIGRATOR_PASSWORD` | Passwort der Eigentümer-Rolle |

> **Wichtig:** `.env`-Dateien fasst nur du an. Agenten dürfen sie nie lesen oder schreiben.

---

## 3. Die Prüfkette — was jeder Befehl macht

Vor „fertig" oder vor einem Commit muss die ganze Kette grün sein. Grün heißt: der Befehl läuft ohne Fehler durch.

**Typprüfung** — kontrolliert, ob die Typen (die Festlegung, welche Form ein Datenwert hat) zusammenpassen, ohne etwas auszuführen:

```bash
pnpm typecheck
```

**Tests** — die schnellen Tests ohne Datenbank und ohne Netz:

```bash
pnpm test
```

**Datenbank-Tests** — die Tests, die sich mit der echten Datenbank verbinden. Dafür muss die Datenbank laufen (siehe Abschnitt 4):

```bash
pnpm test:db
```

**Modulgrenze prüfen** — kontrolliert mit dependency-cruiser (ein Werkzeug, das die Import-Beziehungen im Code prüft), dass kein Modul heimlich ein anderes Modul benutzt. Das ist Regel 2 aus `CLAUDE.md`: Module reden nur über den Kern:

```bash
pnpm depcruise
```

**Format schreiben** — Prettier (das Werkzeug, das den Code einheitlich einrückt und formatiert) bringt alle Dateien in die richtige Form:

```bash
pnpm format
```

**Format prüfen** — kontrolliert nur, ob alles formatiert ist, ändert nichts. Das läuft in der Prüfkette:

```bash
pnpm format:check
```

Reihenfolge in der Praxis: erst `pnpm format`, dann `pnpm typecheck`, `pnpm test`, `pnpm test:db` (bei laufender DB) und `pnpm depcruise`. Wenn etwas rot ist, erst das reparieren — nichts wird passend gemacht, damit es grün wird (siehe `.claude/rules/testing.md` und der Arbeitsablauf in `CLAUDE.md`).

---

## 4. Die Datenbank

Die Datenbank ist PostgreSQL 17 mit PostGIS (die Erweiterung für Geodaten, z. B. Liefergebiete). Sie läuft in Docker.

**Starten:**

```bash
pnpm db:up
```

**Stoppen** (die Daten bleiben erhalten):

```bash
pnpm db:down
```

**Zurücksetzen** — ⚠️ **zerstörerisch:** löscht alle lokalen Datenbank-Daten und baut die Datenbank frisch auf:

```bash
pnpm db:reset
```

Zurücksetzen brauchst du, wenn sich das Einrichtungs-Skript `docker/postgres/init/20-fluvo-roles.sh` geändert hat. Dieses Skript läuft nämlich **nur bei einer leeren Datenbank**. Solange alte Daten da sind, greift eine Änderung darin nicht — deshalb der Neuaufbau.

### Zwei Rollen (getrennt, mit Absicht)

Eine „Rolle" ist ein Datenbank-Benutzer mit bestimmten Rechten.

- **`fluvo_migrator`** — die **Eigentümer-Rolle**. Ihr gehört die Datenbank, sie legt Tabellen an und führt Migrationen aus (Migration = ein Schritt, der die Struktur der Datenbank verändert).
- **`fluvo_app`** — die **Laufzeitrolle**, mit der die Anwendung im Betrieb arbeitet. Sie hat bewusst keine Sonderrechte und darf die Zeilen-Sicherheit (Row-Level-Security, die jede Zeile einem Tenant zuordnet) **nicht** umgehen. So ist sichergestellt, dass die Mandantentrennung wirklich greift.

PostGIS ist aktiv. Die Datenbank ist nur von deinem eigenen Rechner erreichbar (Adresse `127.0.0.1`), nie aus dem Netz.

### Wenn die Datenbank nicht läuft

`pnpm test:db` schlägt dann **laut** fehl, mit einer klaren Meldung — die Tests werden nicht stillschweigend übersprungen. Fehlt außerdem die `.env`-Datei, bricht der Lauf ebenfalls mit einem klaren Hinweis auf `.env.example` ab.

### drizzle-kit

drizzle-kit ist das Werkzeug für die Migrationen. Es erwartet die oben genannten Variablen bereits in der Umgebung und lädt die `.env` **nicht** selbst. Gebraucht wird es erst ab AP-015; im Gerüst von AP-014 ist noch keine Tabelle und keine Migration vorhanden.

---

## 5. Wo was liegt

| Ordner | Inhalt |
|---|---|
| `apps/api` | die Server-Anwendung (aktuell nur eine Hülle mit einem `/health`-Endpunkt) |
| `packages/core` | der Kern — die Fachlogik (Zustandsmaschine, Regeln) |
| `packages/schemas` | die Datenformen, einmal zentral definiert (mit Zod, dem Werkzeug zum Prüfen von Eingaben) |
| `packages/db` | der Datenbank-Zugang |
| `packages/modules/*` | die Fachmodule (z. B. `intake`, `voice`, `kitchen`). Ein Modul importiert nur `core`, `schemas`, `db` — nie ein anderes Modul (die Grenzregel, geprüft mit `pnpm depcruise`) |

Genaueres zur Struktur steht im Briefing, Abschnitt §5.1 (`docs/briefing.md`).

---

## 6. Wenn etwas klemmt

**„Datenbank nicht erreichbar" oder `pnpm test:db` bricht ab:**
Starte Docker Desktop und dann die Datenbank:

```bash
pnpm db:up
```

**Meldung „Virtualization support not detected":**
Dann fehlt WSL 2. Öffne PowerShell als Administrator und installiere es, danach den Rechner neu starten:

```bash
wsl --install --no-distribution
```

**Eine Datei zeigt im git-Status nur Änderungen, obwohl du nichts geändert hast (nur Zeilenenden):**
Das regelt `.gitattributes` — es erzwingt einheitliche LF-Zeilenenden (die unsichtbaren Zeichen am Zeilenende; Windows und Linux setzen sie unterschiedlich). Wenn eine Datei trotzdem auffällt, hilft in aller Regel `pnpm format`.
