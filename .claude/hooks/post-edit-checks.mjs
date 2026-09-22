// PostToolUse (Write|Edit|MultiEdit): formatiert, prüft Typen und Modulgrenzen und warnt vor
// Personendaten in Logs. Läuft still durch, solange es noch keinen Code bzw. keine Werkzeuge gibt.
// Exit 2 = Rückmeldung an das Modell (die Datei ist bereits geschrieben).
import { existsSync, readFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { readInput, projectDir, relPath, reject, findUp } from './lib.mjs';

const input = readInput();
const root = projectDir(input);
const filePath = (input.tool_input || {}).file_path;
if (!filePath) process.exit(0);
const abs = resolve(root, filePath);
const file = relPath(input, filePath);
if (!existsSync(abs) || file.startsWith('.claude/') || file.includes('node_modules/')) process.exit(0);

const isCode = /\.(ts|tsx|mts|cts|js|jsx|mjs)$/.test(file);
const isFormattable = isCode || /\.(json|css|astro|md|ya?ml)$/.test(file);
const isTest = /\.(test|spec)\.[cm]?[jt]sx?$/.test(file) || file.includes('/e2e/');
const findings = [];

const bin = (name) => {
  const p = join(root, 'node_modules', '.bin', process.platform === 'win32' ? `${name}.cmd` : name);
  return existsSync(p) ? p : null;
};
const run = (cmd, args, cwd, timeout) =>
  spawnSync(cmd, args, { cwd, encoding: 'utf8', timeout, shell: process.platform === 'win32' });

// 1) Formatierung — Prettier, falls installiert
const prettier = bin('prettier');
if (prettier && isFormattable) run(prettier, ['--write', '--log-level', 'silent', abs], root, 20000);

if (isCode) {
  const lines = readFileSync(abs, 'utf8').split(/\r?\n/);

  // 2) Personendaten in Logs / Fehlern / Sentry
  const logCall = /\b(console\.\w+|log(ger)?\.(trace|debug|info|warn|error|fatal)|request\.log\.\w+|req\.log\.\w+|Sentry\.(captureMessage|captureException|setContext|setExtra|setUser)|new\s+\w*Error)\s*\(/;
  const pii = /\b(phone(Number)?|rufnummer|telefon|caller(Id|Number)?|fromNumber|customerName|firstName|lastName|fullName|address|street|strasse|postalCode|zip|plz|email|transcript|notes?|body|payload)\b/i;
  lines.forEach((line, i) => {
    if (logCall.test(line) && pii.test(line) && !/fluvo-pii-ok/.test(line)) {
      findings.push(`${file}:${i + 1} — Log/Fehler enthält möglicherweise Personendaten oder ganze Payloads. Nur IDs loggen (rules/security.md). Falls unbedenklich: Kommentar "fluvo-pii-ok: <Grund>" in die Zeile.`);
    }
  });

  // 3) console.* im Produktivcode
  if (!isTest && !file.startsWith('scripts/')) {
    lines.forEach((line, i) => {
      if (/^\s*console\.(log|debug|info)\s*\(/.test(line)) findings.push(`${file}:${i + 1} — console.${line.match(/console\.(\w+)/)[1]} im Produktivcode. Den strukturierten Logger verwenden.`);
    });
  }

  // 4) Geld als Gleitkommazahl
  lines.forEach((line, i) => {
    if (/\b(price|total|amount|subtotal|tax|sum)\w*\s*[:=][^=].*(\.toFixed\(|parseFloat\(|\*\s*0?\.\d+|\/\s*100\b)/i.test(line) && !/fluvo-money-ok/.test(line)) {
      findings.push(`${file}:${i + 1} — sieht nach Gleitkomma-Rechnung mit Geld aus. Beträge sind Ganzzahlen in Cent; gerechnet wird nur im Kern.`);
    }
  });

  // 5) Typprüfung im nächstgelegenen Paket
  const tsc = bin('tsc');
  if (tsc && /\.(ts|tsx|mts|cts)$/.test(file)) {
    const pkgDir = findUp(dirname(abs), 'tsconfig.json', root);
    if (pkgDir) {
      const r = run(tsc, ['--noEmit', '--pretty', 'false', '-p', pkgDir], root, 90000);
      if (r.status && r.stdout) {
        const errs = r.stdout.split(/\r?\n/).filter((l) => /error TS\d+/.test(l));
        if (errs.length) findings.push(`TypeScript meldet ${errs.length} Fehler:\n      ` + errs.slice(0, 12).join('\n      '));
      }
    }
  }

  // 6) Modulgrenzen mit dependency-cruiser
  const depcruise = bin('depcruise');
  const hasConfig = ['.dependency-cruiser.cjs', '.dependency-cruiser.js', '.dependency-cruiser.mjs'].some((f) => existsSync(join(root, f)));
  if (depcruise && hasConfig && file.startsWith('packages/')) {
    const r = run(depcruise, ['--output-type', 'err', file], root, 60000);
    if (r.status) findings.push('dependency-cruiser meldet einen Verstoß gegen die Paketgrenzen:\n      ' + (r.stdout || r.stderr || '').trim().split(/\r?\n/).slice(0, 12).join('\n      '));
  }
}

if (findings.length) reject(`Prüfung nach Änderung an ${file}`, findings);
