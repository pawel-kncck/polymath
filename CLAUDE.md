# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Polymath is a subject-agnostic educational learning platform for home-learning. It uses a "Renderer Pattern" architecture that separates content data from display logic, allowing new subjects to be added without schema changes.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Actions)
- **Language:** TypeScript
- **Database:** PostgreSQL (managed by Coolify on the lr15a platform in production)
- **ORM:** Prisma 7 with JSON support for flexible payloads
- **Auth:** Auth.js v5 with a Credentials provider (email + bcrypt-hashed password). No OAuth — users are created by admins.
- **Styling:** Tailwind CSS
- **Math Rendering:** KaTeX for LaTeX equations

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start development server (localhost:3000)
npm test                 # Run unit tests
npm run test:e2e         # Run Playwright e2e tests
npx prisma migrate dev   # Create / apply a new migration
npm run db:seed          # Seed modules + bootstrap admin from env vars
npm run db:studio        # Open Prisma database UI
```

## Testing Requirements (MANDATORY)

**All tests must pass before progressing. Do not continue development if tests are failing.**

### Unit Tests

- Every function and method requires a unit test
- Run `npm test` and verify all tests pass before moving to the next task
- New code without corresponding unit tests is incomplete

### E2E Tests (Playwright)

- Every feature requires an end-to-end test
- Run `npm run test:e2e` and verify all tests pass before considering a feature complete
- E2E tests must cover the critical user flows for the feature

### Development Workflow

1. Write/modify code
2. Write unit tests for all new functions/methods
3. Run `npm test` - fix any failures before continuing
4. Write e2e test for the feature
5. Run `npm run test:e2e` - fix any failures before continuing
6. Only proceed to the next task when all tests pass

## Architecture: The Renderer Pattern

The core pattern uses a polymorphic `Item` model with a JSON `content` column and an `ItemType` enum:

- **TEXT**: Simple Q&A (vocabulary, translations) - `{prompt, answer, hint}`
- **SINGLE_CHOICE**: One correct option from a list - `{prompt, options, answer, hint?}`
- **MATH_EQ**: LaTeX formulas (algebra) - `{latex, instruction, answer}`
- **GEOMETRY**: SVG shapes - `{instruction, shapeType, props, labels, answer}`

The `QuizRunner` component reads `ItemType` and routes to the appropriate renderer component.

## Database Models

- **User**: Students/admins with `role` and `passwordHash`
- **Module**: Subject containers (e.g., "English Plurals", "Algebra 1")
- **Item**: Questions with flexible JSON `content` column
- **Result**: Analytics tracking (score, time, mistakes array)

## Adding New Content Types

1. Add new value to `ItemType` enum in Prisma schema
2. Define the JSON payload structure for the content column
3. Create a new renderer component in the frontend
4. Update the QuizRunner switch logic to route to the new renderer
5. Create seed data for the new content type

## Authentication

- Email + password Credentials provider (`src/lib/auth.ts`). Passwords are hashed with bcrypt (cost 12).
- No public signup form. Admins create users at `/admin/users`, which also supports delete and password reset.
- The seed script (`prisma/seed.ts`) bootstraps an initial admin from `ADMIN_EMAIL` / `ADMIN_PASSWORD` (idempotent upsert).
- `src/lib/auth.config.ts` is edge-safe (consumed by `middleware.ts`). The Credentials provider with its Node-only `authorize` callback lives only in `src/lib/auth.ts`.

## Environment Variables

Required in `.env` for development (see `.env.example`):

- `DATABASE_URL` — PostgreSQL connection string
- `AUTH_URL` — App URL (`http://localhost:3000` for dev)
- `AUTH_SECRET` — Random secret (`openssl rand -base64 32`)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — bootstrapped by `npm run db:seed`

In production these are set in the Coolify dashboard, never in code.

## Deployment

This app deploys to the lr15a.pl platform via Coolify (Hetzner). Pushing to `main` triggers an automatic production deploy. See `../lr15a/docs/adding-a-new-app.md` for the full platform guide.

### Before every push to main

Run `./deploy-test.sh --build-only` (requires Docker) to verify the image builds. Every push to main is a production deploy — there is no staging.

### Rules (from lr15a deployment-lessons)

- **`npm install` not `npm ci` in the Dockerfile** — `npm ci` fails across different npm versions/platforms. Do not change this.
- **`public/.gitkeep` must be committed** — Docker COPY fails if the directory doesn't exist, and git doesn't track empty directories.
- **`prisma/migrations/` must be committed** — runtime `prisma migrate deploy` needs the migration files in the image.
- **Secrets live in Coolify, never in code** — all vars set in the Coolify dashboard.
- **Container runs as non-root** — the Dockerfile switches to `USER nextjs`.
- **Node 24** — keep the Dockerfile's `FROM node:24-alpine` in sync with local Node version.

### Prisma 7 specifics

- `prisma.config.ts` is the single source of the database URL for the CLI.
- The Dockerfile overlays the full `node_modules` from the `deps` stage on top of the Next.js standalone output, because Prisma 7's CLI has too deep a dependency tree to cherry-pick.
- Migrations run on container startup via `npx prisma migrate deploy && node server.js`.
