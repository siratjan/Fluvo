// Statuszeile: Agent · Modell · Arbeitspakete · Git-Zweig · Hook-Blockaden heute · Kontext.
// Bekommt Sitzungsdaten als JSON auf stdin und gibt genau eine Zeile aus.
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

let input = {};
try { input = JSON.parse(readFileSync(0, 'utf8') || '{}'); } catch { /* leere Eingabe */ }

const root = resolve(process.env.CLAUDE_PROJECT_DIR || input.workspace?.project_dir || input.cwd || process.cwd());
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), 'utf8') : '');
const c = (code, s) => `\x1b[${code}m${s}\x1b[0m`;
const parts = [];

parts.push(c('1;36', (input.agent?.name || 'kein Agent').replace(/^./, (x) => x.toUpperCase())));
if (input.model?.display_name) parts.push(c('2', input.model.display_name));

const rows = read('docs/arbeitspakete/README.md').split(/\r?\n/).filter((l) => /^\|\s*\[?AP-\d+/.test(l));
const working = rows.filter((l) => /in Arbeit/i.test(l)).map((l) => (l.match(/AP-\d+/) || [''])[0]);
const open = rows.filter((l) => !/fertig \(geprüft\)|verworfen/i.test(l)).length;
const blocked = rows.filter((l) => /blockiert/i.test(l)).length;
parts.push(working.length ? c('33', `${working.join(', ')} in Arbeit`) + c('2', ` (${open} offen)`) : c('2', `${open} AP offen`));
if (blocked) parts.push(c('31', `${blocked} blockiert`));

const branch = (spawnSync('git', ['symbolic-ref', '--short', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout || '').trim();
if (branch) parts.push(c('2', '⎇ ') + branch);

const today = new Date().toISOString().slice(0, 10);
const stops = read('.claude/state/events.jsonl').split(/\r?\n/).filter((l) => l.includes(`"ts":"${today}`) && l.includes('"event":"blocked"')).length;
if (stops) parts.push(c('31', `⛔ ${stops} heute`));

const ctx = input.context_window?.used_percentage;
if (typeof ctx === 'number') parts.push(c(ctx > 80 ? '31' : '2', `Kontext ${Math.round(ctx)} %`));

process.stdout.write(parts.join(c('2', ' · ')) + '\n');
