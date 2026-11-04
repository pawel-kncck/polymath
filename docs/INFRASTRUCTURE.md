# Polymath infrastructure handoff

This repository is public. Hostnames, identifiers, access routes, audit findings,
and dated deployment state belong in the private sibling `../infra-lr15a`
checkout, not here. Recheck live state there before changes.

## Local operation and access

Use this app checkout for code and the sibling `../infra-lr15a` checkout for
infrastructure operations. Start with its `AGENTS.md`, `README.md`,
`docs/STATUS.md`, and `inventory/estate.json`; record production findings and
changes there. That private inventory is the canonical estate handoff for both
Codex and Claude Code. If it is unavailable on another machine, obtain access
from the owner before production work; do not infer missing credentials.

Run SSH and API clients locally. Coolify remains the deployment manager.
Calling an operation read-only does not restrict the credential used for it.
Prefer scoped read-only access for discovery. Do not print tokens, DATABASE_URL
values, environment dumps, private keys, or application data. Never bypass SSH
host verification or TLS verification.

## Shared database boundaries

Polymath owns its application data in `polymath_db`; it does not own the shared
PostgreSQL service or its volume, which also serve other apps. Coolify's own
database is a different PostgreSQL instance and must not be used as the app
database.

For Polymath work, never stop, recreate, upgrade, or delete the shared service
or volume without separate authorization and a review of all consumers. Never
run a cluster-wide restore or cleanup to repair a single app. Recheck the exact
database and effective role privileges before any authorized database change.

Development and tests require a separate local database. Never copy the production
connection URL into local test commands. `prisma migrate dev`, `db:push`,
`db:reset`, seeds, and integration tests must not target production. The full
`deploy-test.sh` run starts the container and applies migrations to its supplied
DATABASE_URL; use a disposable local database. `--build-only` builds without
starting that container.

## Deploying an existing app

Treat a push to `main` as a production deployment, and confirm auto-deploy
settings in Coolify before relying on automation. There is no staging deployment.
Do not rerun first-time provisioning.

1. Check the current branch, local changes, remote main, and ongoing Coolify
   deployments. Use one agent at a time for production changes.
2. Run the relevant app tests and `./deploy-test.sh --build-only` locally.
3. Review committed `prisma/migrations/`. Container startup runs
   `npx prisma migrate deploy && node server.js`, including on restart.
4. Before an update, verify a current recoverable backup of `polymath_db` and
   restoration steps; record the deployed commit/image digest and a rollback
   plan in the infrastructure handoff. Reverting an image does not undo a
   database migration.
5. Deploy through the existing Coolify application. Keep production environment
   values in Coolify. Do not routinely rerun seed/admin bootstrap on production.
6. Verify deployment completion, runtime health, sign-in, loading a lesson, and
   saving a result with an owner-approved test account. Inspect only necessary,
   redacted logs; use Coolify deployment history for build logs.
