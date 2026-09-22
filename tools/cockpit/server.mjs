// fluvo Cockpit — lokale Übersicht über das Agentic Operating System.
// Start: node tools/cockpit/server.mjs   →   http://localhost:4777
// Keine Abhängigkeiten. Liest nur Dateien dieses Repos, schreibt nichts, lauscht nur auf 127.0.0.1.
// Der Business Brain wird bewusst NICHT ausgelesen (Vertraulichkeit).
import { createServer } from 'node:http';
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve, dirname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { connect } from 'node:net';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..');
const PORT = Number(process.env.PORT || process.env.COCKPIT_PORT || 4777);

const read = (p) => (existsSync(join(ROOT, p)) ? readFileSync(join(ROOT, p), 'utf8') : '');
const list = (p, re) => (existsSync(join(ROOT, p)) ? readdirSync(join(ROOT, p)).filter((f) => re.test(f)).sort() : []);

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const out = {};
  if (m) for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (kv) out[kv[1]] = kv[2].trim();
  }
  return out;
}

function sections(text) {
  const out = {};
  let current = '_';
  for (const line of text.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.*)$/);
    if (h) { current = h[1].trim(); out[current] = []; } else (out[current] ||= []).push(line);
  }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join('\n').trim()]));
}

const tableRows = (text) =>
  text.split(/\r?\n/).filter((l) => /^\|/.test(l) && !/^\|\s*:?-{2,}/.test(l)).map((l) => l.split('|').slice(1, -1).map((c) => c.trim()));

const STATUSES = ['vorgeschlagen', 'freigegeben', 'in Arbeit', 'blockiert', 'fertig (geprüft)', 'verworfen'];

function team() {
  const agents = list('.claude/agents', /\.md$/).map((f) => {
    const text = read(`.claude/agents/${f}`);
    const fm = frontmatter(text);
    return { name: fm.name || f.replace(/\.md$/, ''), description: fm.description || '', color: fm.color || 'gray', model: fm.model || 'inherit', tools: fm.tools || 'alle', file: `.claude/agents/${f}` };
  });
  const skills = list('.claude/skills', /./).filter((d) => existsSync(join(ROOT, '.claude/skills', d, 'SKILL.md'))).map((d) => {
    const fm = frontmatter(read(`.claude/skills/${d}/SKILL.md`));
    return { name: fm.name || d, description: fm.description || '', file: `.claude/skills/${d}/SKILL.md` };
  });
  // Welcher Agent nennt welchen Skill? (aus den Agenten-Texten und der Jarvis-Tabelle)
  for (const a of agents) a.skills = skills.filter((s) => read(a.file).includes('`' + s.name + '`')).map((s) => s.name);
  const commands = list('.claude/commands', /\.md$/).map((f) => ({ name: '/' + f.replace(/\.md$/, ''), description: frontmatter(read(`.claude/commands/${f}`)).description || '', file: `.claude/commands/${f}` }));
  const rules = list('.claude/rules', /\.md$/).map((f) => ({ name: f.replace(/\.md$/, ''), file: `.claude/rules/${f}` }));
  let hooks = [];
  let mainAgent = null;
  try {
    const s = JSON.parse(read('.claude/settings.json') || '{}');
    mainAgent = s.agent || null;
    for (const [event, groups] of Object.entries(s.hooks || {})) for (const g of groups) for (const h of g.hooks || []) {
      const script = (h.command.match(/hooks\/([\w.-]+\.mjs)/) || [])[1] || h.command;
      const doc = (read(`.claude/hooks/${script}`).match(/^\/\/\s*(.*)$/m) || [])[1] || '';
      hooks.push({ event, matcher: g.matcher || '*', script, description: doc.replace(/^[\w ()|]+:\s*/, ''), file: `.claude/hooks/${script}` });
    }
  } catch { /* settings unlesbar → leere Liste */ }
  return { agents, skills, commands, rules, hooks, mainAgent };
}

function workPackages() {
  return list('docs/arbeitspakete', /^AP-\d+.*\.md$/).map((f) => {
    const text = read(`docs/arbeitspakete/${f}`);
    const sec = sections(text);
    const meta = {};
    // Kopfzeilen: "- **Status:** wert" und "- **Entsteht Code?** wert" (Doppelpunkt oder Fragezeichen am Ende des Namens)
    for (const [, k, v] of (sec._ || '').matchAll(/^- \*\*(.+?)[:?]\*\*\s*(.*)$/gm)) meta[k.trim()] = v.trim();
    // "Angelegt: … · Zuletzt geändert: …" steht in einer Zeile
    const changed = (text.match(/\*\*Zuletzt geändert:\*\*\s*([\d-]+)/) || [])[1] || (text.match(/\*\*Angelegt:\*\*\s*([\d-]+)/) || [])[1] || '';
    const status = STATUSES.find((s) => (meta.Status || '').toLowerCase().startsWith(s.toLowerCase())) || 'vorgeschlagen';
    const criteria = [...(sec.Abnahmekriterien || '').matchAll(/^- \[( |x|X)\]\s*(.*)$/gm)].map(([, c, t]) => ({ done: c !== ' ', text: t }));
    const PHASES = ['Planen', 'Testen zuerst', 'Bauen', 'Prüfen', 'Verifizieren', 'Sichern'];
    const phase = PHASES.find((p) => (meta.Phase || '').trim().toLowerCase() === p.toLowerCase()) || null;
    const cycle = [...(sec.Arbeitszyklus || '').matchAll(/^- \[( |x|X)\]\s*(\d)\s*·\s*([^—\n]+?)\s*(?:—\s*(.*))?$/gm)].map(([, c, n, name, note]) => ({ n: Number(n), name: name.trim(), done: c !== ' ', note: note || '' }));
    const teamRows = tableRows(sec.Team || '').slice(1).filter((r) => r[1]).map((r) => ({ order: r[0], who: r[1].replace(/`/g, ''), why: r[2] || '' }));
    return {
      id: (f.match(/^AP-\d+/) || [f])[0], file: `docs/arbeitspakete/${f}`,
      title: ((text.match(/^#\s+(.*)$/m) || [])[1] || f).replace(/^AP-\d+\s*[·:-]\s*/, ''),
      status, changed, origin: meta.Herkunft || '', roadmap: meta['Roadmap-Schritt'] || '', code: /^ja/i.test(meta['Entsteht Code'] || ''),
      phase, cycle, goal: sec.Ziel || '', criteria, team: teamRows, needs: sec['Braucht von Sirat'] || '', result: sec.Ergebnis || '', blockedBy: status === 'blockiert' ? (sec.Ergebnis || sec['Braucht von Sirat'] || '') : '',
    };
  });
}

function docs() {
  const roadmap = tableRows(read('docs/roadmap.md')).filter((r) => r.length >= 3 && !/^#$|^Test$|^Schritt$/.test(r[1]) && r[0] !== '#').map((r) => ({ id: r[0], title: r[1], status: r[2], note: r[3] || '' }));
  const questions = [...read('docs/open-questions.md').matchAll(/^###\s+(.*)$/gm)].map(([, t]) => ({ title: t, open: !/✅|erledigt|geschlossen/i.test(t) }));
  const decisions = list('docs/decisions', /^\d{4}-.*\.md$/).filter((f) => !f.startsWith('0000')).map((f) => {
    const text = read(`docs/decisions/${f}`);
    return { file: `docs/decisions/${f}`, title: (text.match(/^#\s+(.*)$/m) || [])[1] || f, status: (text.match(/\*\*Status:\*\*\s*(.*)$/m) || [])[1] || '', date: (text.match(/\*\*Datum:\*\*\s*(.*)$/m) || [])[1] || '' };
  });
  const handoffs = list('docs/handoffs', /^\d{4}-\d{2}-\d{2}.*\.md$/).reverse().slice(0, 10).map((f) => ({ file: `docs/handoffs/${f}`, title: f.replace(/\.md$/, '') }));
  return { roadmap, questions, decisions, handoffs };
}

// Konzept: Artefakt-Landkarte aus docs/konzept/README.md + vorhandene Dateien je Ordner
function concept() {
  const text = read('docs/konzept/README.md');
  if (!text) return null;
  const sec = sections(text);
  const cell = (c) => { const m = c.match(/\[([^\]]+)\]\(([^)]+)\)/); return m ? { label: m[1], href: m[2] } : { label: c, href: '' }; };
  const artifacts = tableRows(sec.Artefakte || '').slice(1).filter((r) => /^K\d+/.test(r[0])).map((r) => ({ id: r[0], title: r[1], place: cell(r[2] || '').label, status: r[3] || 'leer', ap: r[4] || '', origin: r[5] || '' }));
  const useCasesKey = Object.keys(sec).find((k) => /fachliche Anwendungsf/i.test(k));
  const useCases = tableRows(sec[useCasesKey] || '').slice(1).filter((r) => /^FA-\d+/.test(r[0])).map((r) => ({ id: r[0], title: r[1], actor: r[2] || '', status: r[3] || 'leer' }));
  const files = [];
  for (const dir of ['anwendungsfaelle', 'modelle', 'vertraege', 'gespraech', 'oberflaechen', '']) {
    for (const f of list(`docs/konzept/${dir}`, /\.md$/)) {
      if (f.startsWith('_') || (dir === '' && f === 'README.md')) continue;
      const p = `docs/konzept/${dir ? dir + '/' : ''}${f}`;
      const t = read(p);
      files.push({ file: p, dir: dir || '.', title: (t.match(/^#\s+(.*)$/m) || [])[1] || f, status: (t.match(/\*\*Status:\*\*\s*([^|\n]+)/) || [])[1]?.trim() || '', diagrams: (t.match(/```mermaid/g) || []).length });
    }
  }
  return { artifacts, useCases, files };
}

function events() {
  const text = read('.claude/state/events.jsonl');
  const all = text.split(/\r?\n/).filter(Boolean).slice(-1500).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const now = Date.now();
  const today = new Date().toISOString().slice(0, 10);
  // Aktive Fachagenten: gestartet, noch nicht beendet, jünger als 2 Stunden
  const running = new Map();
  for (const e of all) {
    const key = e.agentId || e.agent;
    if (e.event === 'agent_start') running.set(key, e);
    if (e.event === 'agent_stop' || e.event === 'session_end') e.event === 'session_end' ? running.clear() : running.delete(key);
  }
  const active = [...running.values()].filter((e) => now - Date.parse(e.ts) < 2 * 3600e3).map((e) => {
    const lastFile = [...all].reverse().find((x) => (x.agentId || x.agent) === (e.agentId || e.agent) && x.file);
    return { agent: e.agent, since: e.ts, lastFile: lastFile?.file };
  });
  const todays = all.filter((e) => e.ts.startsWith(today));
  const count = (arr, key) => Object.entries(arr.reduce((m, e) => ((m[e[key]] = (m[e[key]] || 0) + 1), m), {})).sort((a, b) => b[1] - a[1]);
  const lastTs = all.at(-1)?.ts;
  return {
    recent: all.slice(-250).reverse(),
    active,
    jarvisActive: lastTs ? now - Date.parse(lastTs) < 5 * 60e3 : false,
    today: {
      files: count(todays.filter((e) => e.event === 'file_changed'), 'file').slice(0, 25),
      agents: count(todays.filter((e) => e.event === 'agent_start'), 'agent'),
      blocked: todays.filter((e) => e.event === 'blocked').length,
      warnings: todays.filter((e) => e.event === 'warning').length,
      failed: todays.filter((e) => e.event === 'tool_failed').length,
      blockReasons: count(todays.filter((e) => e.event === 'blocked' || e.event === 'warning').flatMap((e) => (e.findings || []).map((f) => ({ f: f.replace(/^[^—]*—\s*/, '').slice(0, 90) }))), 'f').slice(0, 8),
    },
    total: all.length,
  };
}

const SERVICES = [
  { name: 'API (Fastify)', port: 3000 }, { name: 'Staff-PWA (Vite)', port: 5173 }, { name: 'Website (Astro)', port: 4321 },
  { name: 'PostgreSQL', port: 5432 }, { name: 'Cockpit', port: PORT },
];
const portOpen = (port) => new Promise((res) => {
  const s = connect({ port, host: '127.0.0.1' });
  const done = (v) => { s.destroy(); res(v); };
  s.setTimeout(400); s.on('connect', () => done(true)); s.on('error', () => done(false)); s.on('timeout', () => done(false));
});

async function operations() {
  const git = (args) => (spawnSync('git', args, { cwd: ROOT, encoding: 'utf8' }).stdout || '').trim();
  const status = git(['status', '--short']).split(/\r?\n/).filter(Boolean);
  const services = await Promise.all(SERVICES.map(async (s) => ({ ...s, up: await portOpen(s.port) })));
  return {
    hasCode: existsSync(join(ROOT, 'package.json')),
    services,
    git: { branch: git(['symbolic-ref', '--short', 'HEAD']) || git(['rev-parse', '--short', 'HEAD']) || '—', changed: status.length, lastCommit: git(['log', '-1', '--format=%h %s (%cr)']) || '—' },
    tooling: ['prettier', 'tsc', 'vitest', 'depcruise', 'playwright'].map((b) => ({ name: b, installed: existsSync(join(ROOT, 'node_modules', '.bin', process.platform === 'win32' ? `${b}.cmd` : b)) })),
  };
}

// Nur Markdown/JSON/Skripte aus docs/ und .claude/ (ohne state) und die README/CLAUDE.md sind einsehbar.
function safeFile(p) {
  const abs = resolve(ROOT, p || '');
  const rel = abs.startsWith(ROOT + sep) ? abs.slice(ROOT.length + 1).split(sep).join('/') : null;
  if (!rel || !/\.(md|mjs|json)$/.test(rel) || /(^|\/)\.env|\/state\/|node_modules/.test(rel)) return null;
  if (!/^(docs\/|\.claude\/|README\.md$|CLAUDE\.md$)/.test(rel)) return null;
  return existsSync(abs) && statSync(abs).isFile() ? abs : null;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const send = (code, type, body) => { res.writeHead(code, { 'content-type': type + '; charset=utf-8', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' }); res.end(body); };
  try {
    if (url.pathname === '/') return send(200, 'text/html', readFileSync(join(HERE, 'index.html'), 'utf8'));
    if (url.pathname === '/api/state') {
      return send(200, 'application/json', JSON.stringify({ generatedAt: new Date().toISOString(), root: ROOT, team: team(), packages: workPackages(), concept: concept(), docs: docs(), events: events(), ops: await operations() }));
    }
    if (url.pathname === '/api/file') {
      const abs = safeFile(url.searchParams.get('path'));
      return abs ? send(200, 'text/plain', readFileSync(abs, 'utf8')) : send(404, 'text/plain', 'nicht gefunden');
    }
    send(404, 'text/plain', 'nicht gefunden');
  } catch (err) {
    send(500, 'text/plain', 'Fehler: ' + (err && err.message));
  }
});

server.listen(PORT, '127.0.0.1', () => console.log(`fluvo Cockpit läuft: http://localhost:${PORT}`));
