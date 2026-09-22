// Schreibt Arbeitsereignisse für das Cockpit mit (tools/cockpit). Blockiert nie, gibt nichts aus.
// Protokolliert werden nur Metadaten: Agent, Werkzeug, Dateipfad, gekürzter Befehl — keine Prompts, keine Inhalte.
import { readInput, relPath, logEvent } from './lib.mjs';

const input = readInput();
const ev = input.hook_event_name;
const t = input.tool_input || {};
const short = (s, n) => String(s || '').replace(/\s+/g, ' ').trim().slice(0, n);

// Geheimnisse und der Business Brain haben im Log nichts verloren.
const safeCmd = (cmd) =>
  short(cmd, 160)
    .replace(/((?:key|token|secret|password|passwd)\w*\s*[=:]\s*)\S+/gi, '$1***')
    .replace(/(Bearer\s+)\S+/gi, '$1***');

switch (ev) {
  case 'SessionStart':
    logEvent(input, { event: 'session_start', source: input.source });
    break;
  case 'SessionEnd':
    logEvent(input, { event: 'session_end', reason: input.reason });
    break;
  case 'UserPromptSubmit':
    logEvent(input, { event: 'prompt' }); // nur der Zeitpunkt, nie der Text
    break;
  case 'Stop':
    logEvent(input, { event: 'turn_end' });
    break;
  case 'SubagentStart':
    logEvent(input, { event: 'agent_start' });
    break;
  case 'SubagentStop':
    logEvent(input, { event: 'agent_stop' });
    break;
  case 'PostToolUseFailure':
    logEvent(input, { event: 'tool_failed', tool: input.tool_name, file: t.file_path ? relPath(input, t.file_path) : undefined });
    break;
  case 'PostToolUse': {
    const tool = input.tool_name;
    if (/^(Write|Edit|MultiEdit|NotebookEdit)$/.test(tool)) {
      logEvent(input, { event: 'file_changed', tool, file: relPath(input, t.file_path) });
    } else if (/^(Bash|PowerShell)$/.test(tool)) {
      logEvent(input, { event: 'command', tool, cmd: safeCmd(t.command), note: short(t.description, 100) || undefined });
    } else if (/^(Agent|Task)$/.test(tool)) {
      logEvent(input, { event: 'delegated', to: t.subagent_type || 'general-purpose', note: short(t.description, 100) });
    } else if (tool === 'Skill') {
      logEvent(input, { event: 'skill', skill: t.skill });
    }
    break;
  }
  default:
    break;
}
