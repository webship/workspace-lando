#!/usr/bin/env bash
## The host side of the Lando plugin: the CLI on this machine. Run by core/scripts/plugins.sh
## --install lando, and by core/scripts/install.sh for every installed plugin that ships one.
## Idempotent: whatever is already there is reported, not redone; nothing is installed unasked.
set -u
BIN='';
for candidate in "$(command -v lando 2>/dev/null)" "${HOME}/.local/bin/lando" ; do
  [ -n "${candidate}" ] && [ -x "${candidate}" ] && { BIN="${candidate}"; break; }
done
if [ -n "${BIN}" ] ; then
  printf '  ✓ %-16s %s\n' "lando" "${BIN}" ;
else
  printf '  ✗ %-16s %s\n' "lando" "missing — the LANDO menu's verbs need it (docs.lando.dev/getting-started/installation.html)" ;
fi
