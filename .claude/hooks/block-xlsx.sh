#!/usr/bin/env bash
# PreToolUse (Bash): xlsx is banned (known vulnerability, see CLAUDE.md).
cmd=$(jq -r '.tool_input.command // empty')
if echo "$cmd" | grep -Eq '(npm|npx|yarn|pnpm|expo)[^|;&]*(install|add|i)[^|;&]*xlsx'; then
  echo "Bloqueado: 'xlsx' no debe instalarse (vulnerabilidad conocida; ver CLAUDE.md)." >&2
  exit 2
fi
