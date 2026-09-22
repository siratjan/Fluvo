// PreToolUse (Bash|PowerShell): hält gefährliche Befehle auf und prüft vor einem Commit
// die vorgemerkten Änderungen auf Geheimnisse. Exit 2 = blockieren.
import { spawnSync } from 'node:child_process';
import { readInput, projectDir, reject, findSecrets } from './lib.mjs';

const input = readInput();
const cmd = String((input.tool_input || {}).command || '');
if (!cmd) process.exit(0);
const findings = [];

if (/\bgit\b[^|;&]*\b(commit|push|merge|rebase)\b[^|;&]*--no-verify/i.test(cmd)) {
  findings.push('--no-verify umgeht die Prüfungen. Ursache beheben statt Hooks überspringen (rules/git.md).');
}
if (/\bgit\b[^|;&]*\bpush\b[^|;&]*(--force(?!-with-lease)|\s-f\b)/i.test(cmd)) {
  findings.push('git push --force ist gesperrt. Wenn es wirklich nötig ist, macht Sirat das selbst.');
}
if (/\bgit\b[^|;&]*\b(reset\s+--hard|clean\s+-[a-z]*f)/i.test(cmd)) {
  findings.push('Dieser Befehl verwirft Arbeit unwiederbringlich. Erst Sirat fragen.');
}
if (/\b(update|delete\s+from|truncate(\s+table)?|drop\s+table(\s+if\s+exists)?)\s+("?public"?\.)?"?order_events"?\b/i.test(cmd)) {
  findings.push('order_events ist unveränderlich (GoBD-Audit-Trail) — auch nicht per Kommandozeile ändern.');
}
if (/\b(drizzle-kit\s+push|db:push)\b/i.test(cmd)) {
  findings.push('drizzle-kit push ändert das Schema ohne Migration. Immer eine Migration erzeugen und einchecken.');
}
if (/\b(drop\s+database|dropdb)\b/i.test(cmd)) {
  findings.push('Datenbank löschen: nur durch Sirat.');
}

// Business Brain: von hier aus nur lesen
if (/Business_Brain/i.test(cmd)) {
  const writes =
    /(^|[\s;&|(])(rm|mv|cp|touch|mkdir|rmdir|tee|sed\s+-i|truncate|del|move|copy|ren|rename)\s/i.test(cmd) ||
    /\b(Remove-Item|Move-Item|Copy-Item|Rename-Item|New-Item|Set-Content|Add-Content|Out-File|Clear-Content)\b/i.test(cmd) ||
    /(^|[^0-9&>])>{1,2}\s*["']?[^\s"']*Business_Brain/i.test(cmd) ||
    /\bgit\b[^|;&]*\b(commit|add|reset|checkout|restore|clean|stash|push|merge|rebase)\b/i.test(cmd);
  if (writes) findings.push('Dieser Befehl würde den Business Brain verändern. Aus dem fluvo-Repo wird er nur gelesen — Änderungen als Auftrag für Sirat formulieren.');
}

// Vor einem Commit: vorgemerkte Änderungen auf Geheimnisse und .env-Dateien prüfen
if (/\bgit\b[^|;&]*\bcommit\b/i.test(cmd) && !findings.length) {
  const cwd = projectDir(input);
  const names = spawnSync('git', ['diff', '--cached', '--name-only'], { cwd, encoding: 'utf8' }).stdout || '';
  for (const n of names.split(/\r?\n/).filter(Boolean)) {
    if (/(^|\/)\.env(\.(?!example$)[\w.-]+)?$/.test(n)) findings.push(`${n} ist zum Commit vorgemerkt. .env-Dateien gehören nicht ins Repo.`);
    if (/\.(wav|mp3|ogg|m4a|flac|webm)$/i.test(n)) findings.push(`${n}: Audiodateien gehören nicht ins Repo (kein Audio speichern).`);
  }
  const diff = spawnSync('git', ['diff', '--cached', '-U0', '--', '.', ':(exclude).claude'], { cwd, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }).stdout || '';
  const added = diff.split(/\r?\n/).filter((l) => l.startsWith('+') && !l.startsWith('+++')).join('\n');
  for (const name of findSecrets(added)) findings.push(`${name} in den vorgemerkten Änderungen erkannt. Entfernen, Schlüssel beim Anbieter erneuern.`);
}

if (findings.length) reject('Befehl blockiert', findings);
