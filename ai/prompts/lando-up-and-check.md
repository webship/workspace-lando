Start a Lando project of the workspace and say whether it came up, with the commands of the LANDO menu.

```
claude --permission-mode bypassPermissions """
Start the Lando project <project> and tell me whether it came up
# ~/workspace/<folder>/<project> · container-based (DDEV by default) · lando runs on the machine, in the project's folder
# only the commands below; nothing that removes containers or data; if a command fails, show why and stop

1. cd ~/workspace/<folder>/<project> ; ls .lando.yml .lando.yaml 2>/dev/null
   stop if none of those files is there: it is not a Lando project
2. cd ~/workspace ; bash core/scripts/plugins.sh --check lando ; cd ~/workspace/<folder>/<project>
   stop if lando is missing, and tell me where to get it
3. start it:
   lando start
4. read its state:
   lando info

Tell me what is running and what is not.
If it did not come up, show me the lines that say why. Do not try other flags, and remove nothing.
"""
```

The text between the triple quotes is plain: it can be given to another AI command-line assistant as it is.
