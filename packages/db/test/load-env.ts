// Setup-Datei nur für das Vitest-Projekt `db` (`pnpm test:db`).
// Lädt die lokale Umgebungsdatei aus dem Repo-Wurzelordner (Node-Standardpfad relativ zum
// Arbeitsverzeichnis, pnpm startet an der Wurzel), bevor die DB-Tests ihre Umgebung prüfen.
// Fehlt die Datei, bricht der Lauf mit klarer Meldung ab, statt still mit Standardwerten zu laufen.
try {
  process.loadEnvFile();
} catch (error) {
  throw new Error('Umgebungsdatei im Repo-Wurzelordner fehlt — Vorlage siehe .env.example', {
    cause: error,
  });
}
