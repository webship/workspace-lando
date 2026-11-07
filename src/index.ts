/**
 * Lando for Webship Workspace.
 *
 * The LANDO menu on every project folder that carries a .lando.yml: the runtime's verbs as terminal
 * sessions in the project, the up/down caption, the site link, and "Scaffold a .lando.yml here (lando init)" when a new folder
 * is made. All of it is the container family's surface (@webship/workspace-container); this
 * package is the Lando runtime plus its host install.
 */

import type { PluginApi } from '@webship/workspace-plugin-api';
import { registerContainer } from '@webship/workspace-container';

import { landoRuntime } from './lib/runtime';

export { landoRuntime };

export function register(api: PluginApi): void {
  registerContainer(api, landoRuntime);
}
