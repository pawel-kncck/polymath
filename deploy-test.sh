#!/usr/bin/env bash
# deploy-test.sh — Build and run the Docker image locally before pushing.
# Catches the majority of deployment issues before they reach Coolify.
#
# Usage:
#   ./deploy-test.sh              # build and run
#   ./deploy-test.sh --build-only # just verify the image builds
#
# Notes:
#   - --build-only is enough to catch most issues (missing files, bad deps,
#     build errors). Use it when you don't have a local database.
#   - Full run requires PostgreSQL accessible from Docker. The default
#     DATABASE_URL uses host.docker.internal (works on Docker Desktop).
#     Override with: DATABASE_URL="..." ./deploy-test.sh

set -euo pipefail

APP_NAME="${APP_NAME:-$(basename "$(pwd)")-test}"
PORT="${PORT:-3000}"

echo "==> Building Docker image: $APP_NAME"
docker build -t "$APP_NAME" .

if [[ "${1:-}" == "--build-only" ]]; then
  echo ""
  echo "==> Build succeeded. Image ready: $APP_NAME"
  echo "    To also test runtime: ./deploy-test.sh"
  exit 0
fi

echo ""
echo "==> Starting container on http://localhost:$PORT (Ctrl+C to stop)"
echo ""

docker run --rm -p "$PORT:3000" \
  -e DATABASE_URL="${DATABASE_URL:-postgresql://user:pass@host.docker.internal:5432/testdb}" \
  -e AUTH_SECRET="${AUTH_SECRET:-local-test-secret-not-for-production}" \
  -e AUTH_URL="http://localhost:$PORT" \
  -e NODE_ENV=production \
  "$APP_NAME"
