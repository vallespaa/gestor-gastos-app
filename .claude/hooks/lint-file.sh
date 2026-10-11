#!/usr/bin/env bash
# PostToolUse (Edit|Write): auto-fix lint/Prettier on the edited JS file.
f=$(jq -r '.tool_input.file_path // empty')
case "$f" in
  *.js) cd "$CLAUDE_PROJECT_DIR" && npx eslint --fix "$f" >&2 || exit 2 ;;
esac
