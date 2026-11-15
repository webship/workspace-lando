/**
 * Lando for Webship Workspace.
 *
 * The LANDO menu on every project folder that carries a .lando.yml: the runtime's verbs as terminal
 * sessions in the project, the up/down caption, the site link, and "Scaffold a .lando.yml here (lando init)" when a new folder
 * is made. All of it is the container family's surface (@webship.co/workspace-container); this
 * package is the Lando runtime plus its host install.
 */

import type { PluginApi } from '@webship.co/workspace-plugin-api';
import { registerContainer } from '@webship.co/workspace-container';

import { landoRuntime } from './lib/runtime';

export { landoRuntime };

/** The AI items the installer places: agents in ai-agents/, skills in ai-skills/, commands in ai-commands/, prompts in ai-prompts/. */
export const AGENTS: string[] = ['lando-operator'];
export const SKILLS: string[] = ['lando-menu'];
export const AI_COMMANDS: string[] = ['lando-status'];
export const PROMPTS: string[] = ['lando-up-and-check'];

export function register(api: PluginApi): void {
  registerContainer(api, landoRuntime);
}
