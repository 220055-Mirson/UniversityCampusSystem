#!/usr/bin/env bash
# Build unificado: API + frontend (mesma origem — sem CORS).
set -euo pipefail
cd "$(dirname "$0")/.."

bash .scripts/render-build-api.sh
VITE_API_BASE_URL=/api/v1 bash .scripts/render-build-web.sh

echo "Build unificado OK — aceder a /login no mesmo URL da API"
