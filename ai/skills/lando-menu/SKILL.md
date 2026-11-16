---
name: lando-menu
description: Run a project of a Webship Workspace on Lando through the Lando plugin (`@webship.co/workspace-lando`) — which folder is a Lando project, every entry of the LANDO menu and the `lando` command behind it, the up or down caption, the site link, the option the New folder form offers, and how to check that `lando` is on the machine. Use when asked "is this a Lando project", "what does the LANDO menu do", "start this project", "why is there no LANDO menu on this project", "the caption says ?", or when a project of the workspace that carries a `.lando.yml`.
argument-hint: '<project>'
---

# lando-menu

Lando for a project of a Webship Workspace (`~/workspace`, container-based, DDEV by default). It
comes with the Lando plugin (`@webship.co/workspace-lando`), a runtime of the container family
(`@webship.co/workspace-container`), like the agent `lando-operator`, the command `/lando-status` and
the prompt `lando-up-and-check`.

The workspace builds its own sites on DDEV. This plugin is for a project that runs on Lando
instead: it gives that project a menu of its own, beside the others.

## Which project gets the menu

A project is a Lando app when its folder carries `.lando.yml` (or `.lando.yaml`). The name of the app is the `name:` of that file, or the folder's name.

```bash
cd ~/workspace/<folder>/<project>
ls .lando.yml .lando.yaml 2>/dev/null
```

## The LANDO menu

On top the menu shows the name of the project and the file it was recognised by, and **Open the site**: the first proxy host of the file, or `https://<name>.lndo.site` when the file has no proxy block. Every
other entry opens a terminal session in the project's folder and runs one command there, so what
`lando` prints is what is seen, and a question it asks can be answered.

| Menu entry | The command, in the project's folder |
| --- | --- |
| **Start** | `lando start` |
| **Stop** | `lando stop` |
| **Restart** | `lando restart` |
| **Rebuild** | `lando rebuild -y` |
| **Info** | `lando info` |
| **Logs (follow)** | `lando logs -f` |
| **Shell (lando ssh)** | `lando ssh` |
| **Destroy (containers and data)** | `lando destroy -y` |

The menu ends with the note "Every verb opens a terminal in the project; lando asks its own questions there".

### The caption beside the menu

| Caption | What it means |
| --- | --- |
| `up` | `lando list --format table --filter app=<name>` shows the app running |
| `down` | It answered, and nothing of the project is running |
| `?` | `lando` could not answer: it is not installed where the dashboard runs, or it failed |

### A new folder

The New folder form offers **Scaffold a .lando.yml here (lando init)**: it runs `lando init` in the new folder with a Drupal 11 recipe and `web` as the webroot; edit `.lando.yml` after.

## Turn it on, and check it

```bash
cd ~/workspace
bash core/scripts/plugins.sh --require @webship.co/workspace-lando
bash core/scripts/plugins.sh --activate lando --with-needs     # adds the AI folders its items land in
bash core/scripts/plugins.sh --install lando
bash core/scripts/plugins.sh --check lando                     # lando: found, with its version, or missing
```

The plugin has no settings file. `lando` is installed outside the workspace: https://docs.lando.dev/getting-started/installation.html

## Traps

- **Lando asks its own questions** in the terminal session a verb opens: answer them there.
- **Rebuild** runs `lando rebuild -y`: the containers are made again, and the `-y` answers lando's question for you. The data of the app stays.
- **Destroy** is the only entry that loses data, and it is drawn in red.
- **A verb answers "lando is not installed"**: the terminal session of the menu checks for `lando`
  first, and says where to get it.
- **A project on DDEV** keeps the workspace's own menus; this one is not drawn for it unless it
  also carries a `.lando.yml`.

## The book

For any automated functional testing in this work (a Gherkin feature, a step definition, choosing a
step, a test run and its failures), read the book *Automated Functional Testing Recipes* first.

- **Where.** Use the first that exists: `.claude/automated-functional-testing-recipes/` in the project,
  `~/.claude/automated-functional-testing-recipes/` (installed by webship/webship-js-ai-agent,
  webship/webship-js-skills or webship/ai-agents), or
  https://github.com/webship/webship-js-ai-agent/tree/2.0.x/automated-functional-testing-recipes
- **How.** Its `README.md` first, then the chapter that matches the task (one file per chapter,
  named by its subject), not the single complete file.
- **Which wins.** The installed webship-js package and the step pack are the source of truth for
  step phrasing. When they differ from the book, follow them and say so.
