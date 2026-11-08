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
bash core/scripts/plugins.sh --activate lando
bash core/scripts/plugins.sh --install lando
```

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
