/**
 * Lando, as a container runtime: a project with a .lando.yml.
 */

import fs from 'fs';
import path from 'path';
import { detectByFiles } from '@webship/workspace-container';
import type { ContainerProject, ContainerRuntime } from '@webship/workspace-container';

export function readLando(file: string, fallbackName: string): { name: string; proxy?: string } {
  let text = '';
  try { text = fs.readFileSync(file, 'utf8'); } catch (_) { return { name: fallbackName }; }
  const name = (text.match(/^name:\s*["']?([\w.-]+)/m) || [])[1] || fallbackName;
  const proxyAt = text.indexOf('\nproxy:');
  const proxy = proxyAt >= 0 ? (text.slice(proxyAt).match(/^\s+-\s*["']?([\w.-]+\.[a-z]+)/m) || [])[1] : undefined;
  return { name, proxy };
}

export const landoRuntime: ContainerRuntime = {
  id: 'lando',
  label: 'LANDO',
  title: 'Lando',
  cli: 'lando',
  cliHint: 'https://docs.lando.dev/getting-started/installation.html',
  detect: (dir): ContainerProject | null => {
    const p = detectByFiles(dir, ['.lando.yml', '.lando.yaml']);
    if (!p) return null;
    const l = readLando(path.join(dir, p.file), path.basename(dir));
    return { file: p.file, name: l.name, url: `https://${l.proxy || `${l.name}.lndo.site`}` };
  },
  state: async (p, dir, lib) => {
    const out = await lib.run('lando', ['list', '--format', 'table', '--filter', `app=${p.name}`], dir, { timeoutMs: 20 * 1000 });
    if (!out.ok) return 'unknown';
    return /running/i.test(String(out.stdout)) ? 'up' : 'down';
  },
  verbs: {
    start: { label: 'Start', icon: 'play', kind: 'start', cmd: () => 'lando start' },
    stop: { label: 'Stop', icon: 'ban', kind: 'stop', cmd: () => 'lando stop' },
    restart: { label: 'Restart', icon: 'refresh', kind: 'restart', cmd: () => 'lando restart' },
    rebuild: { label: 'Rebuild', icon: 'cog', kind: 'other', cmd: () => 'lando rebuild -y' },
    status: { label: 'Info', icon: 'info', kind: 'status', cmd: () => 'lando info' },
    logs: { label: 'Logs (follow)', icon: 'file-text', kind: 'logs', cmd: () => 'lando logs -f' },
    shell: { label: 'Shell (lando ssh)', icon: 'terminal', kind: 'shell', cmd: () => 'lando ssh' },
    destroy: { label: 'Destroy (containers and data)', icon: 'trash', kind: 'other', danger: true, cmd: () => 'lando destroy -y' },
  },
  init: { label: 'Scaffold a .lando.yml here (lando init)', cmd: () => 'lando init --source cwd --recipe drupal11 --webroot web --name "$(basename "$PWD")"', help: 'A Drupal 11 recipe with web/ as the webroot; edit .lando.yml after.' },
  menuNote: 'Every verb opens a terminal in the project; lando asks its own questions there',
};
