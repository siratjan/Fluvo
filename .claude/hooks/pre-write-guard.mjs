// PreToolUse (Write|Edit|MultiEdit): blockiert Verstöße gegen die nicht verhandelbaren fluvo-Regeln,
// bevor sie in einer Datei landen. Exit 2 = blockieren, Begründung geht an das Modell.
import { readInput, relPath, newText, isFullWrite, reject, findSecrets } from './lib.mjs';

const input = readInput();
const file = relPath(input, (input.tool_input || {}).file_path);
const text = newText(input);
const findings = [];

// 0) Business Brain ist von hier aus nur lesbar — er hat einen eigenen Agenten mit eigener Buchführung.
if (/Business_Brain/i.test(file) || /Business_Brain/i.test(String((input.tool_input || {}).file_path || ''))) {
  reject(`Schreibzugriff auf den Business Brain blockiert (${file})`, [
    'Aus dem fluvo-Repo wird der Business Brain nur gelesen. Änderungen dort als fertigen Auftrag für Sirat formulieren; er führt sie im Vault aus (index.md/log.md-Buchführung, raw/ ist unveränderlich).',
  ]);
}

const isDoc = /\.(md|mdx|txt)$/i.test(file);
const isHookOrSkill = file.startsWith('.claude/');

// 1) Geheimnisse — überall außer in .env.example-artigen Platzhaltern
if (!isHookOrSkill) {
  for (const name of findSecrets(text)) {
    findings.push(`${name} im Inhalt erkannt. Geheimnisse gehören in Umgebungsvariablen, nie ins Repo (rules/security.md).`);
  }
}
if (/(^|\/)\.env(\.(?!example$)[\w.-]+)?$/.test(file)) {
  findings.push(`${file}: .env-Dateien legt Sirat selbst an. Erlaubt ist nur .env.example mit Namen ohne Werte.`);
}

if (!isDoc && !isHookOrSkill) {
  // 2) Event-Log ist unveränderlich (GoBD-Audit-Trail)
  const eventLogMutation =
    /\b(update|delete\s+from|truncate(\s+table)?|drop\s+table(\s+if\s+exists)?|alter\s+table)\s+("?public"?\.)?"?order_events"?\b/i.test(text) ||
    /\.(update|delete)\(\s*(schema\.)?orderEvents\s*\)/.test(text);
  if (eventLogMutation && !/alter\s+table\s+("?public"?\.)?"?order_events"?\s+(enable|force)\s+row\s+level\s+security/i.test(text)) {
    findings.push('order_events darf nur per INSERT beschrieben werden — kein UPDATE/DELETE/TRUNCATE/DROP/ALTER. Korrekturen sind neue Events (CLAUDE.md Regel 7).');
  }

  // 3) Modulgrenze: modules/<a> importiert nie modules/<b>
  const m = file.match(/^packages\/modules\/([^/]+)\//);
  if (m) {
    const own = m[1];
    const importRe = /(?:from\s+|import\s*\(\s*|require\s*\(\s*)['"]([^'"]+)['"]/g;
    for (const [, spec] of text.matchAll(importRe)) {
      const pkg = spec.match(/^@fluvo\/module-([\w-]+)/);
      if (pkg && pkg[1] !== own) findings.push(`Modul "${own}" importiert Modul "${pkg[1]}" (${spec}). Module hängen nur von core, schemas, db ab — Logik in den Kern oder über ein Kern-Event lösen.`);
      const rel = spec.match(/^(?:\.\.\/)+(?:modules\/)?([\w-]+)\//);
      if (rel && spec.startsWith('../../') && rel[1] !== own && !['core', 'schemas', 'db'].includes(rel[1])) {
        findings.push(`Modul "${own}" greift per relativem Pfad auf "${rel[1]}" zu (${spec}). Pakete nur über ihren Namen importieren, und nie ein anderes Modul.`);
      }
    }
    if (file.endsWith('/package.json')) {
      for (const [, dep] of text.matchAll(/"@fluvo\/module-([\w-]+)"\s*:/g)) {
        if (dep !== own) findings.push(`package.json von Modul "${own}" trägt Modul "${dep}" als Abhängigkeit ein. Verboten (CLAUDE.md Regel 2).`);
      }
    }
  }

  // 4) Neue Tabelle braucht tenant_id + RLS in derselben Migration (nur bei vollständigem Write prüfbar)
  if (isFullWrite(input) && /\.sql$/i.test(file)) {
    const exempt = new Set(['tenants']);
    for (const [, rawName, body] of text.matchAll(/create\s+table\s+(?:if\s+not\s+exists\s+)?([\w."]+)\s*\(([\s\S]*?)\)\s*;/gi)) {
      const name = rawName.replace(/"/g, '').split('.').pop();
      if (exempt.has(name) || name.startsWith('pgboss')) continue;
      if (!/\btenant_id\b/i.test(body)) findings.push(`Tabelle "${name}" hat keine Spalte tenant_id.`);
      const rls = new RegExp(`alter\\s+table\\s+[\\w."]*"?${name}"?\\s+enable\\s+row\\s+level\\s+security`, 'i');
      const policy = new RegExp(`create\\s+policy\\s+[\\w"]+\\s+on\\s+[\\w."]*"?${name}"?\\b`, 'i');
      if (!rls.test(text)) findings.push(`Tabelle "${name}": ENABLE (und FORCE) ROW LEVEL SECURITY fehlt in dieser Migration.`);
      if (!policy.test(text)) findings.push(`Tabelle "${name}": CREATE POLICY für die Mandantentrennung fehlt in dieser Migration.`);
    }
  }

  // 5) RLS nie abschalten, Tenant nie ohne LOCAL setzen
  if (/disable\s+row\s+level\s+security|\bbypassrls\b/i.test(text)) {
    findings.push('RLS wird abgeschaltet bzw. BYPASSRLS vergeben. Die Anwendung arbeitet immer mit aktiver RLS.');
  }
  if (/\bset\s+(?!local\b)(session\s+)?app\.tenant_id\b/i.test(text) || /set_config\(\s*'app\.tenant_id'\s*,[^)]*,\s*false\s*\)/i.test(text)) {
    findings.push('app.tenant_id wird ohne LOCAL gesetzt. Im Verbindungs-Pool leckt das zum nächsten Request — nur SET LOCAL bzw. set_config(…, true) in einer Transaktion (Skill fluvo-multi-tenant).');
  }
}

if (findings.length) reject(`Änderung an ${file} blockiert`, findings);
