#!/usr/bin/env bash
# Build do frontend para Render (Static Site).
set -euo pipefail
cd "$(dirname "$0")/.."

resolve_api_url() {
  local url=""

  if [[ -n "${VITE_API_BASE_URL:-}" ]]; then
    url="$VITE_API_BASE_URL"
    if [[ "$url" == /* ]]; then
      echo "${url%/}"
      return
    fi
  elif [[ -n "${API_PUBLIC_HOST:-}" ]]; then
    url="https://${API_PUBLIC_HOST}"
  elif [[ -n "${RENDER_EXTERNAL_URL:-}" ]]; then
    url="${RENDER_EXTERNAL_URL}"
  else
    echo "Defina VITE_API_BASE_URL=/api/v1 (unificado) ou API_PUBLIC_HOST." >&2
    exit 1
  fi

  url="${url%/}"
  case "$url" in
    */api/v1) ;;
    */api) url="${url}/v1" ;;
    *) url="${url}/api/v1" ;;
  esac
  echo "$url"
}

export VITE_API_BASE_URL="$(resolve_api_url)"
echo "VITE_API_BASE_URL=${VITE_API_BASE_URL}"

# Render define NODE_ENV=production — devDependencies necessárias para tsc/vite
npm install --include=dev
npm run build -w @smart-campus/shared-types
npm run build -w @smart-campus/validation
npm run build -w @smart-campus/api-client
npm run build -w @smart-campus/web

echo "Frontend build OK"
