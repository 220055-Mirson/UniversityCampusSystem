#!/usr/bin/env bash
set -euo pipefail

PATTERN='Co-authored-by: Cursor|Made-with: Cursor|Made with Cursor|Built by Cursor'

if git log --format=%B | grep -qiE "$PATTERN"; then
  echo "ERRO: Histórico contém atribuição Cursor (Co-authored-by / Made-with / Built by)."
  echo "Execute: git config core.hooksPath .githooks && chmod +x .githooks/commit-msg"
  git log --format=%B | grep -iE "$PATTERN" | head -5 || true
  exit 1
fi

echo "OK: sem atribuição Cursor no histórico."
