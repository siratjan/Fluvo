// Gemeinsame Helfer für die fluvo-Hooks. Keine Abhängigkeiten außer Node.
import { readFileSync, existsSync, appendFileSync, mkdirSync, statSync, renameSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';

let lastInput = {};

export function readInput() {
  try {
    lastInput = JSON.parse(readFileSync(0, 'utf8') || '{}');
  } catch {
    lastInput = {};
  }
  return lastInput;
}

// Ereignis-Log für das Cockpit: eine JSON-Zeile je Ereignis in .claude/state/events.jsonl (nicht im Git).
// Enthält nur Metadaten (wer, was, welche Datei) — keine Prompts, keine Dateiinhalte.
export function logEvent(input, event) {
  try {
    const dir = join(projectDir(input), '.claude', 'state');
    mkdirSync(dir, { recursive: true });
    const file = join(dir, 'events.jsonl');
    if (existsSync(file) && statSync(file).size > 5 * 1024 * 1024) renameSync(file, join(dir, 'events.1.jsonl'));
    const base = {
      ts: new Date().toISOString(),
      session: String(input.session_id || '').slice(0, 8),
      agent: input.agent_type || 'jarvis',
      agentId: input.agent_id ? String(input.agent_id).slice(0, 12) : undefined,
    };
    appendFileSync(file, JSON.stringify({ ...base, ...event }) + '\n', 'utf8');
  } catch {
    // Das Log darf nie die Arbeit blockieren.
  }
}

export function projectDir(input) {
  return resolve(process.env.CLAUDE_PROJECT_DIR || input.cwd || process.cwd());
}

// Pfad relativ zum Projekt, immer mit "/" — damit Muster auf Windows und Unix gleich greifen.
export function relPath(input, filePath) {
  const root = projectDir(input);
  const abs = resolve(root, filePath || '');
  const rel = abs.startsWith(root + sep) ? abs.slice(root.length + 1) : abs;
  return rel.split(sep).join('/');
}

// Der Text, der durch Write/Edit/MultiEdit neu in die Datei kommt.
export function newText(input) {
  const t = input.tool_input || {};
  if (typeof t.content === 'string') return t.content;
  if (Array.isArray(t.edits)) return t.edits.map((e) => e.new_string || '').join('\n');
  return t.new_string || '';
}

export function isFullWrite(input) {
  return typeof (input.tool_input || {}).content === 'string';
}

// Blockiert den Werkzeugaufruf (PreToolUse) bzw. meldet an das Modell zurück (PostToolUse).
export function reject(title, findings) {
  const blocked = (lastInput.hook_event_name || 'PreToolUse') === 'PreToolUse';
  logEvent(lastInput, {
    event: blocked ? 'blocked' : 'warning',
    tool: lastInput.tool_name,
    title,
    findings: findings.map((f) => String(f).split('\n')[0].slice(0, 200)),
  });
  process.stderr.write(`fluvo-Hook: ${title}\n` + findings.map((f) => `  - ${f}`).join('\n') + '\n');
  process.exit(2);
}

export function findUp(startDir, fileName, stopDir) {
  let dir = startDir;
  for (;;) {
    if (existsSync(join(dir, fileName))) return dir;
    const parent = dirname(dir);
    if (parent === dir || dir === stopDir) return null;
    dir = parent;
  }
}

export const SECRET_PATTERNS = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'privater Schlüssel'],
  [/\b(sk|rk)_(live|test)_[A-Za-z0-9]{16,}/, 'Stripe-Schlüssel'],
  [/\bwhsec_[A-Za-z0-9]{16,}/, 'Stripe-Webhook-Geheimnis'],
  [/\b(live|test)_[A-Za-z0-9]{30,}\b/, 'Mollie-Schlüssel'],
  [/\bkey_[a-f0-9]{24,}\b/, 'Retell-Schlüssel'],
  [/\bsk-ant-[A-Za-z0-9_-]{20,}/, 'Anthropic-Schlüssel'],
  [/\bsk-[A-Za-z0-9]{32,}\b/, 'API-Schlüssel (sk-…)'],
  [/\bgh[pousr]_[A-Za-z0-9]{30,}/, 'GitHub-Token'],
  [/\bAKIA[0-9A-Z]{16}\b/, 'AWS-Schlüssel'],
  [/postgres(?:ql)?:\/\/[^:\s/]+:[^@\s${}<>]{6,}@(?!localhost|127\.0\.0\.1|db[:/]|postgres[:/])/i, 'Datenbank-URL mit Passwort'],
  [/\b(?:api[_-]?key|secret|token|password|passwd)\b\s*[:=]\s*['"][A-Za-z0-9+/_\-]{24,}['"]/i, 'fest eingetragenes Geheimnis'],
];

export function findSecrets(text) {
  return SECRET_PATTERNS.filter(([re]) => re.test(text)).map(([, name]) => name);
}
