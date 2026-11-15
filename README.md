# @webship.co/workspace-lando

Lando for the [Webship Workspace](https://github.com/webship/workspace) dashboard: the **LANDO**
menu on every project folder that carries a .lando.yml, with the runtime's verbs as terminal sessions in
the project, the up/down caption and the site link, and "Scaffold a .lando.yml here (lando init)" when a new folder is made.
A runtime of [`@webship.co/workspace-container`](https://github.com/webship/workspace-container).

A project is a Lando app when it carries `.lando.yml`; the name is the file's `name:`, the site link its first proxy host (`https://<name>.lndo.site` when the file has no proxy block).

## Use it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require github:webship/workspace-lando
bash core/scripts/plugins.sh --activate lando --with-needs
bash core/scripts/plugins.sh --install lando
```

## The items it carries

The workspace is container-based (DDEV by default). Each item lands in the folder of its kind, when
that folder is an active workspace folder, is listed there like any other item, and is installed
into Claude Code from there:

| What | Lands in | What it is for |
| --- | --- | --- |
| The agent `lando-operator` | `ai-agents/` | Says whether a Lando project is up, starts, stops and restarts it with the commands of the LANDO menu, and never runs the destroying one on its own |
| The skill `lando-menu` | `ai-skills/` | Which folder is a Lando project, every entry of the LANDO menu and its `lando` command, the caption, the site link, the New folder option |
| The command `/lando-status` | `ai-commands/` | `/lando-status <project>`: whether it is a Lando project and whether it is up. Read-only |
| The prompt `lando-up-and-check` | `ai-prompts/` | The launch command of a session that starts a Lando project and says whether it came up |

The plugin places no `cmd-*.sh`: every entry of the menu is one `lando` command in the project's folder, and a wrapper would add nothing to it. The item bodies are plain Markdown any AI command-line assistant can follow; Claude Code is the default shape (frontmatter, the launch command of the prompt).

How the items are laid out and checked: [docs/plugin-items-pattern.md](docs/plugin-items-pattern.md).

## What it needs

On the machine this plugin needs `lando` (https://docs.lando.dev/install/), and its manifest says so (`needs.commands`). The workspace reports it and never installs it:

```bash
bash core/scripts/plugins.sh --check lando      # found, with its version, or missing, with how to install it
webship-workspace doctor                        # the same for the core and every plugin
```

It also needs the AI folders its items are placed in (`needs`): `ai-agents`, `ai-skills`, `ai-commands` and `ai-prompts`. `--require` says so, `--activate` and `--install` stop until the workspace has them, and `--with-needs` adds what is missing first. A kind whose folder is not an active workspace folder is skipped, and the install says so. It needs no sites folder: its menu is on the project rows of whatever folders the workspace has.

## The verbs

| Verb | Command |
| --- | --- |
| Start | `lando start` |
| Stop | `lando stop` |
| Restart | `lando restart` |
| Rebuild | `lando rebuild -y` |
| Info | `lando info` |
| Logs | `lando logs -f` |
| Shell | `lando ssh` |
| Destroy | `lando destroy -y` (containers and data: marked in red) |

Every verb opens a terminal session in the project folder, so what the CLI prints is what you see,
and a verb that asks a question can be answered.

The `workspacePlugin` block in `package.json` is the manifest the installer reads.

## What the package holds of them

| Path | What it is |
| --- | --- |
| `ai/agents/lando-operator.md` | The agent `lando-operator` |
| `ai/skills/lando-menu/` | The skill `lando-menu` |
| `ai/commands/lando-status.md` | The command `/lando-status` |
| `ai/prompts/lando-up-and-check.md` | The prompt `lando-up-and-check` |
| `tests/items.test.ts` | The shape of every item, and that it names nothing the plugin does not have |
