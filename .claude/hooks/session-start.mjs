// SessionStart: gibt dem Agenten den aktuellen Stand mit — Bauschritt, offene Fragen, letzte Übergabe.
// Die Ausgabe (stdout) landet im Kontext der Sitzung. Bewusst kurz gehalten.
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { readInput, projectDir } from './lib.mjs';

const root = projectDir(readInput());
const read = (p) => (existsSync(join(root, p)) ? readFileSync(join(root, p), 'utf8') : '');
const out = ['# fluvo — Stand zu Sitzungsbeginn', ''];

out.push(existsSync(join(root, 'package.json'))
  ? 'Arbeitsmodus: Code existiert. Produktionscode trotzdem nur auf ausdrückliche Ansage von Sirat.'
  : 'Arbeitsmodus: Discovery-Phase — es gibt noch keinen Code. Produktionscode nur auf ausdrückliche Ansage von Sirat.');

const roadmap = read('docs/roadmap.md');
const current = roadmap.split(/\r?\n/).filter((l) => /^\|/.test(l) && /(in Arbeit|als Nächstes)/i.test(l));
if (current.length) out.push('', '## Aktuell laut docs/roadmap.md', ...current.slice(0, 5));

const packages = read('docs/arbeitspakete/README.md')
  .split(/\r?\n/)
  .filter((l) => /^\|\s*\[?AP-\d+/.test(l) && !/fertig \(geprüft\)|verworfen/i.test(l));
out.push('', `## Offene Arbeitspakete (${packages.length}) — docs/arbeitspakete/README.md`, ...(packages.length ? packages.slice(0, 10) : ['- keine']));

// Konzeptphase: Stand der Artefakte K1–K11 und das nächste, das dran ist
const artifacts = read('docs/konzept/README.md').split(/\r?\n/).filter((l) => /^\|\s*K\d+\s*\|/.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));
if (artifacts.length) {
  const done = artifacts.filter((a) => /abgenommen/i.test(a[3])).length;
  const next = artifacts.find((a) => !/abgenommen/i.test(a[3]));
  out.push('', `## Konzeptphase — ${done} von ${artifacts.length} Artefakten abgenommen (docs/konzept/README.md)`,
    next ? `Als Nächstes: ${next[0]} ${next[1]} — Status „${next[3]}", Paket ${next[4]}. Arbeitsweise: jarvis.md §4b, Start mit /konzept ${next[0]}.` : 'Alle Artefakte abgenommen — Übergang zur Entwicklung mit Sirat klären.',
    'Konzipiert wird im Gespräch mit Sirat; nichts erfinden, was nur er, der Pilot, Anwalt oder Steuerberaterin wissen.');
}

const questions = read('docs/open-questions.md');
const open = questions.split(/\r?\n/).filter((l) => /^###\s/.test(l) && !/✅|erledigt|geschlossen/i.test(l));
if (open.length) {
  out.push('', `## Offene Fragen (${open.length}) — nicht raten, Sirat fragen`, ...open.slice(0, 12).map((l) => '- ' + l.replace(/^###\s*/, '')));
  if (open.length > 12) out.push(`- … und ${open.length - 12} weitere in docs/open-questions.md`);
}

const handoffDir = join(root, 'docs', 'handoffs');
if (existsSync(handoffDir)) {
  const notes = readdirSync(handoffDir).filter((f) => /^\d{4}-\d{2}-\d{2}.*\.md$/.test(f)).sort();
  const last = notes.at(-1);
  if (last) {
    const body = readFileSync(join(handoffDir, last), 'utf8').split(/\r?\n/).slice(0, 40).join('\n');
    out.push('', `## Letzte Übergabe: docs/handoffs/${last}`, body);
  }
}

// Business Brain: die letzten Operationen (nur Überschriften — keine Inhalte, keine Zahlen)
const vault = process.env.FLUVO_BUSINESS_BRAIN || 'C:/Users/sirat/Business_Brain/Business_Brain';
if (existsSync(join(vault, 'log.md'))) {
  const ops = readFileSync(join(vault, 'log.md'), 'utf8').split(/\r?\n/).filter((l) => /^## \[/.test(l));
  out.push('', `## Business Brain (${vault}) — nur lesen, Einstieg über index.md`, ...ops.slice(-4).map((l) => '- ' + l.replace(/^##\s*/, '')));
} else {
  out.push('', `## Business Brain nicht gefunden unter ${vault} — Sirat fragen, bevor du Geschäftliches behauptest.`);
}

const git = spawnSync('git', ['status', '--short', '--branch'], { cwd: root, encoding: 'utf8' }).stdout || '';
if (git.trim()) {
  const lines = git.trim().split(/\r?\n/);
  out.push('', '## Git', ...lines.slice(0, 15), ...(lines.length > 15 ? [`… ${lines.length - 15} weitere`] : []));
}

out.push('', 'Quelle der Wahrheit: docs/briefing.md. [FEST] nicht neu diskutieren. Sitzung mit /handoff abschließen.');
process.stdout.write(out.join('\n') + '\n');
