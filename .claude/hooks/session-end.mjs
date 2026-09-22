// SessionEnd: hält mechanisch fest, was sich in der Sitzung geändert hat (Journal).
// Das ersetzt nicht die inhaltliche Übergabe — die schreibt der Agent mit /handoff.
import { appendFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readInput, projectDir } from './lib.mjs';

const input = readInput();
const root = projectDir(input);
const dir = join(root, 'docs', 'handoffs');
if (!existsSync(join(root, 'docs'))) process.exit(0);
mkdirSync(dir, { recursive: true });

const git = (args) => (spawnSync('git', args, { cwd: root, encoding: 'utf8' }).stdout || '').trim();
const changed = git(['status', '--short']).split(/\r?\n/).filter(Boolean);
if (!changed.length) process.exit(0);

const stamp = new Date().toISOString().replace('T', ' ').slice(0, 16) + ' UTC';
const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']) || '-';
const today = new Date().toISOString().slice(0, 10);
const hasNote = existsSync(dir) && spawnSync('git', ['ls-files', '--others', '--cached', `docs/handoffs/${today}*`], { cwd: root, encoding: 'utf8' }).stdout.trim();

const entry = [
  `## ${stamp} · Zweig ${branch} · Sitzung ${String(input.session_id || '').slice(0, 8)}`,
  hasNote ? '' : '_Keine Übergabe-Notiz von heute gefunden — beim nächsten Mal /handoff ausführen._',
  ...changed.slice(0, 40).map((l) => `- \`${l}\``),
  changed.length > 40 ? `- … ${changed.length - 40} weitere` : '',
  '',
].filter((l) => l !== '').join('\n') + '\n\n';

appendFileSync(join(dir, '_journal.md'), entry, 'utf8');
