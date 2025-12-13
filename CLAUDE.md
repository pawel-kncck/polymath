# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Polymath is a subject-agnostic educational learning platform for home-learning. It uses a "Renderer Pattern" architecture that separates content data from display logic, allowing new subjects to be added without schema changes.

## Tech Stack

- **Framework:** Next.js 14+ (App Router, Server Actions)
- **Language:** TypeScript
- **Database:** PostgreSQL on Railway
- **ORM:** Prisma with JSON support for flexible payloads
- **Auth:** Auth.js with Google OAuth
- **Styling:** Tailwind CSS
- **Math Rendering:** KaTeX for LaTeX equations

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Start development server (localhost:3000)
npm test                 # Run unit tests
npm run test:e2e         # Run Playwright e2e tests
npx prisma db push       # Push schema changes to database
npx prisma db seed       # Seed initial data
npx prisma studio        # Open Prisma database UI
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
- **MATH_EQ**: LaTeX formulas (algebra) - `{latex, instruction, answer}`
- **GEOMETRY**: SVG shapes - `{instruction, shapeType, props, labels, answer}`

The `QuizRunner` component reads `ItemType` and routes to the appropriate renderer component.

## Database Models

- **User**: Students/admins with role field
- **Module**: Subject containers (e.g., "English Plurals", "Algebra 1")
- **Item**: Questions with flexible JSON `content` column
- **Result**: Analytics tracking (score, time, mistakes array)

## Adding New Content Types

1. Add new value to `ItemType` enum in Prisma schema
2. Define the JSON payload structure for the content column
3. Create a new renderer component in the frontend
4. Update the QuizCard switch logic to route to the new renderer
5. Create seed data for the new content type

## Environment Variables

Required in `.env`:

- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_URL` - App URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Random secret string
- `GOOGLE_CLIENT_ID` - From Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

## Deployment

Deployed on Railway with zero-config from GitHub. Railway provides `DATABASE_URL` automatically when PostgreSQL is added.
