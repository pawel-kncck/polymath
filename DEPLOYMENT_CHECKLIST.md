# Deployment Readiness Checklist

Use this checklist before pushing to `main` (every push to `main` is a production deploy via Coolify).

## Local environment

- [ ] `.env` populated from `.env.example` with real values
- [ ] `AUTH_SECRET` generated with `openssl rand -base64 32`
- [ ] PostgreSQL running locally, `DATABASE_URL` points to it
- [ ] Migrations applied: `npx prisma migrate dev`
- [ ] Seed ran: `npm run db:seed` — admin user exists and can sign in

## Application health

- [ ] `npm run build` succeeds
- [ ] `npm run lint` clean
- [ ] `npm test` — unit tests pass
- [ ] `npm run test:e2e` — e2e tests pass

## Docker image (catches 90% of deploy issues before they reach Coolify)

- [ ] `./deploy-test.sh --build-only` succeeds (requires Docker Desktop or OrbStack)
- [ ] `prisma/migrations/` is committed (runtime `prisma migrate deploy` needs these files)
- [ ] `public/.gitkeep` is committed (Docker `COPY` fails on missing directory)

## Manual smoke (after deploy to `polymath.lr15a.pl`)

### Auth

- [ ] `/` shows Sign In link when logged out
- [ ] Signing in with admin credentials succeeds and redirects home
- [ ] Wrong password shows the red error banner, no runtime errors
- [ ] Admin sees the "Admin" link in header; students don't
- [ ] Visiting `/admin/users` as a student redirects to `/`

### Admin

- [ ] `/admin/users` lists users
- [ ] Creating a new user succeeds; new user can log in
- [ ] Resetting a user's password works; the new password lets them log in
- [ ] Deleting a user removes the row; self-delete is blocked

### Quiz flow

- [ ] Home lists modules for the current locale
- [ ] English Plurals module loads, progresses, and saves a Result
- [ ] Mistakes appear in the results screen

## Coolify-side (first deploy only)

- [ ] App created in Coolify, linked to GitHub repo, Build Pack = Docker
- [ ] Domain `polymath.lr15a.pl` set, SSL issued
- [ ] Env vars set: `DATABASE_URL`, `AUTH_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
- [ ] First deploy completed — startup ran `prisma migrate deploy` without errors
- [ ] `npm run db:seed` executed once (via Coolify exec) to bootstrap the admin
