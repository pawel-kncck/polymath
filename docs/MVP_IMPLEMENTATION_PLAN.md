# Polymath MVP Implementation Plan

## Executive Summary

This document defines the Minimum Viable Product (MVP) for Polymath and provides a detailed, task-level implementation plan. The MVP focuses on delivering a functional English Plurals learning module with user authentication, quiz functionality, results tracking, and admin content management.

## Progress Tracking (Fast Deploy Strategy)

### Milestone 1: Foundation + Auth
| Order | Task | Description | Status |
|-------|------|-------------|--------|
| 1 | 0.1 | Initialize Next.js Project | ✅ Done |
| 2 | 0.3 | Setup Prisma & Database Schema | ✅ Done |
| 3 | 1.1 | Configure Auth.js with Google OAuth | ✅ Done |
| 4 | 1.3 | Route Protection + Role-based Redirects | ✅ Done |

### Milestone 2: Student Quiz Flow
| Order | Task | Description | Status |
|-------|------|-------------|--------|
| 5 | 2.2 | Server Actions for Modules | ✅ Done |
| 6 | 3.3 | Quiz Runner + useQuiz Hook | ✅ Done |
| 7 | 3.4 | TEXT Renderer Component | ✅ Done |
| 8 | 3.6 | Quiz Page + Result Saving | ✅ Done |

### 🚀 FIRST DEPLOY (after task 8)
Student can log in, take quiz, see score. Seed via Prisma CLI.

### Milestone 3: Parent-Child Interaction
| Order | Task | Description | Status |
|-------|------|-------------|--------|
| 9 | 5.2 | JSON Seeder UI (Parent adds questions) | ⬚ Pending |
| 10 | 4.1 | Results History (Parent views scores) | ⬚ Pending |
| 11 | 3.1 | Layout + Role-aware Navigation | ⬚ Pending |
| 12 | 3.2 | Module Selection UI | ⬚ Pending |

### Milestone 4: Polish
| Order | Task | Description | Status |
|-------|------|-------------|--------|
| 13 | 6.3 | Database Seeding Script | ⬚ Pending |
| 14 | 5.1 | Admin Dashboard | ⬚ Pending |
| 15 | 6.1 | Loading States & Error Boundaries | ⬚ Pending |
| 16 | 6.2 | CSS Animations | ⬚ Pending |

### Deferred (Add Later)
| Task | Description | Reason |
|------|-------------|--------|
| 0.2 | Testing Infrastructure | Add after first deploy |
| 1.2 | Custom Auth UI Components | Use Auth.js defaults |
| 2.1 | Type Definitions | Inline types work initially |
| 2.3 | Results Server Actions | Merged into 3.6 |
| 2.4 | Admin Server Actions | Merged into 5.2 |
| 4.2 | Result Detail View | Nice to have |
| 5.3 | Module Management (delete) | Nice to have |
| 6.4 | Environment Configuration | Document in README |
| 6.5 | E2E Test Suite | Add after MVP stable |

**Progress: 8/16 core tasks completed (50%) | 🚀 READY FOR FIRST DEPLOY**

### Role-based Access Summary
| Role | Capabilities |
|------|--------------|
| **Student** | Take quizzes, see own results |
| **Parent (Admin)** | Add questions via JSON seeder, view child's results |

---

## MVP Scope

### Included

- **Authentication**: Google OAuth via Auth.js
- **English Plurals Module**: TEXT renderer for vocabulary practice
- **Quiz Flow**: Question display, answer input, immediate feedback, results
- **Results Tracking**: Score, time, and mistakes stored per session
- **Admin Features**: JSON seeder UI for bulk question import

### Excluded (Future Phases)

- MATH_EQ renderer (KaTeX for algebra)
- GEOMETRY renderer (SVG shapes)
- Analytics dashboard with charts
- Gamification (streaks, personal bests)
- "Mistake Repeater" mode

---

## Tech Stack

> Original plan targeted Railway + Google OAuth. Current reality: Coolify on
> Hetzner with email/password auth. See `CLAUDE.md` for the current stack.

| Layer          | Technology                               |
| -------------- | ---------------------------------------- |
| Framework      | Next.js 16 (App Router, Server Actions)  |
| Language       | TypeScript                               |
| Database       | PostgreSQL (Coolify on Hetzner)          |
| ORM            | Prisma 7                                 |
| Authentication | Auth.js v5 + Credentials (bcrypt)        |
| Styling        | Tailwind CSS                             |
| Unit Testing   | Vitest + React Testing Library           |
| E2E Testing    | Playwright                               |
| Validation     | Zod                                      |

---

## Database Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      String   @default("STUDENT") // "ADMIN" or "STUDENT"
  results   Result[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Module {
  id          String   @id @default(uuid())
  title       String
  subject     String   // "LANGUAGE", "MATH", "LOGIC"
  description String
  items       Item[]
  results     Result[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

enum ItemType {
  TEXT
  MATH_EQ
  GEOMETRY
}

model Item {
  id        String   @id @default(uuid())
  moduleId  String
  type      ItemType @default(TEXT)
  content   Json
  module    Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Result {
  id        String   @id @default(uuid())
  score     Int
  total     Int
  time      Int      // seconds
  mistakes  Json     // array of mistake details
  createdAt DateTime @default(now())
  userId    String
  moduleId  String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  module    Module   @relation(fields: [moduleId], references: [id], onDelete: Cascade)
}
```

### TEXT Content Payload

```json
{
  "prompt": "Mouse",
  "answer": "Mice",
  "hint": "pol: Mysz"
}
```

---

## Implementation Phases

### Phase 0: Project Initialization & Infrastructure

#### Task 0.1: Initialize Next.js Project ✅

**Command:**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

**Files Created:**

- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `tailwind.config.ts`
- `postcss.config.mjs`
- `.gitignore`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`

**Acceptance Criteria:**

- `npm run dev` starts server on localhost:3000
- `npm run build` completes without errors

**Tests:** E2E smoke test that homepage loads

---

#### Task 0.2: Configure Testing Infrastructure

**Dependencies:**

```bash
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
npm install -D @playwright/test
npx playwright install
```

**Files to Create:**

- `vitest.config.ts`
- `playwright.config.ts`
- `src/tests/setup.ts`
- `e2e/example.spec.ts`

**package.json scripts:**

```json
{
  "test": "vitest",
  "test:e2e": "playwright test"
}
```

**Acceptance Criteria:**

- `npm test` runs Vitest
- `npm run test:e2e` runs Playwright

**Tests:** Sample unit test and E2E test that verify setup works

---

#### Task 0.3: Setup Prisma & Database Schema ✅

**Dependencies:**

```bash
npm install prisma @prisma/client
npx prisma init
```

**Files to Create:**

- `prisma/schema.prisma` (schema above)
- `src/lib/db.ts` (Prisma client singleton)

**src/lib/db.ts:**

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

**Acceptance Criteria:**

- `npx prisma db push` succeeds
- `npx prisma studio` opens database UI

**Tests:** Unit test for Prisma client instantiation

---

### Phase 1: Authentication

#### Task 1.1: Configure Auth.js with Google OAuth ✅

**Dependencies:**

```bash
npm install next-auth@beta @auth/prisma-adapter
```

**Files to Create:**

- `src/lib/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/types/next-auth.d.ts`

**Acceptance Criteria:**

- `/api/auth/signin` shows Google sign-in option
- Session created after successful sign-in
- User record created in database

**Tests:**

- Unit: Auth configuration exports correctly
- E2E: Sign-in redirects to Google (mocked)

---

#### Task 1.2: Create Auth UI Components

**Files to Create:**

- `src/components/auth/SignInButton.tsx`
- `src/components/auth/SignOutButton.tsx`
- `src/components/auth/UserAvatar.tsx`
- `src/app/(auth)/signin/page.tsx`

**Acceptance Criteria:**

- SignInButton triggers sign-in flow
- SignOutButton signs user out
- UserAvatar displays user info when authenticated

**Tests:**

- Unit: Each component renders correctly
- E2E: Sign-in/sign-out flow works

---

#### Task 1.3: Implement Route Protection Middleware

**Files to Create:**

- `src/middleware.ts`
- `src/lib/auth-utils.ts`

**src/lib/auth-utils.ts:**

```typescript
import { auth } from './auth';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect('/signin');
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== 'ADMIN') redirect('/');
  return session;
}
```

**Acceptance Criteria:**

- Unauthenticated users redirected from /quiz, /results, /admin
- Non-admin users cannot access /admin routes

**Tests:**

- Unit: requireAuth and requireAdmin functions
- E2E: Protected route redirects

---

### Phase 2: Core Data Layer

#### Task 2.1: Create Type Definitions

**Files to Create:**

- `src/types/content.ts`
- `src/types/quiz.ts`

**Key Types:**

```typescript
// content.ts
export interface TextContent {
  prompt: string;
  answer: string;
  hint?: string;
}

// quiz.ts
export interface QuizResult {
  score: number;
  total: number;
  time: number;
  mistakes: MistakeDetail[];
}

export interface MistakeDetail {
  itemId: string;
  prompt: string;
  correctAnswer: string;
  userAnswer: string;
}
```

**Acceptance Criteria:** Types compile without errors

**Tests:** Unit tests for type guards

---

#### Task 2.2: Create Server Actions for Modules

**File to Create:** `src/actions/modules.ts`

**Functions:**

- `getModules()` - List all modules with item counts
- `getModuleById(id)` - Get single module with items
- `getModuleWithRandomItems(moduleId, count)` - Get shuffled items for quiz

**Acceptance Criteria:** All functions return expected data shapes

**Tests:** Unit tests with mocked Prisma

---

#### Task 2.3: Create Server Actions for Results

**File to Create:** `src/actions/results.ts`

**Functions:**

- `saveResult(data)` - Save quiz result for authenticated user
- `getUserResults()` - Get current user's result history
- `getResultById(resultId)` - Get single result detail

**Acceptance Criteria:**

- Results saved with correct user association
- Unauthorized access throws error

**Tests:** Unit tests for each function

---

#### Task 2.4: Create Admin Server Actions

**Files to Create:**

- `src/actions/admin.ts`
- `src/lib/validators.ts`

**Dependencies:**

```bash
npm install zod
```

**Functions:**

- `createModuleWithItems(formData)` - Create module with bulk items from JSON
- `deleteModule(moduleId)` - Delete module (cascade deletes items/results)

**Acceptance Criteria:**

- JSON validation with clear error messages
- Only admins can call these actions

**Tests:** Unit tests with valid/invalid data

---

### Phase 3: UI Components

#### Task 3.1: Create Layout Components

**Files to Create:**

- `src/components/layout/Header.tsx`
- `src/components/layout/Navigation.tsx`

**Acceptance Criteria:**

- Header shows logo and navigation
- Navigation is role-aware (admin link only for admins)
- User avatar when authenticated, sign-in button when not

**Tests:**

- Unit: Components render with/without session
- E2E: Navigation works

---

#### Task 3.2: Create Module Selection UI

**Files to Create:**

- `src/components/modules/ModuleCard.tsx`
- `src/components/modules/ModuleList.tsx`
- `src/app/quiz/page.tsx`

**Acceptance Criteria:**

- Modules displayed as clickable cards
- Card shows title, description, question count
- Clicking navigates to quiz

**Tests:**

- Unit: ModuleCard renders correctly
- E2E: Module selection flow

---

#### Task 3.3: Create Quiz Runner Component

**Files to Create:**

- `src/components/quiz/QuizRunner.tsx`
- `src/components/quiz/QuizProgress.tsx`
- `src/components/quiz/QuizInput.tsx`
- `src/hooks/useQuiz.ts`

**Quiz Requirements:**

- Auto-focus input field
- Enter key submits answer
- Green flash on correct (0.8s)
- Red shake on incorrect (0.8s)
- Progress indicator (e.g., "3/20")
- Calls onComplete with results when finished

**Acceptance Criteria:**

- Quiz flows through all questions
- Answers checked case-insensitively
- Results calculated correctly

**Tests:**

- Unit: useQuiz hook state transitions
- Unit: Answer checking logic
- E2E: Complete quiz flow

---

#### Task 3.4: Create TEXT Renderer Component

**File to Create:** `src/components/renderers/TextRenderer.tsx`

**Acceptance Criteria:**

- Renders prompt text prominently (large, centered)
- Optionally shows hint
- Handles invalid content gracefully

**Tests:** Unit tests for rendering variations

---

#### Task 3.5: Create Quiz Results Display

**Files to Create:**

- `src/components/quiz/QuizResults.tsx`
- `src/components/quiz/MistakesList.tsx`

**Acceptance Criteria:**

- Shows score as fraction and percentage
- Shows total time (MM:SS format)
- Lists mistakes with correct answers
- Retry and "Choose Another Module" buttons

**Tests:**

- Unit: Score display, time formatting
- E2E: Retry functionality

---

#### Task 3.6: Integrate Quiz Page with Result Saving

**Files to Create:**

- `src/app/quiz/[moduleId]/page.tsx`
- `src/app/quiz/[moduleId]/QuizClient.tsx`

**Acceptance Criteria:**

- Quiz loads items from server
- Result saved to database on completion
- Results screen shows after quiz
- Retry resets quiz state

**Tests:** E2E: Complete quiz and verify result saved

---

### Phase 4: Results/Analytics

#### Task 4.1: Create Results History Page

**Files to Create:**

- `src/app/results/page.tsx`
- `src/components/results/ResultCard.tsx`
- `src/components/results/ResultsList.tsx`

**Dependencies:**

```bash
npm install date-fns
```

**Acceptance Criteria:**

- Results sorted by date (newest first)
- Shows score, percentage, time, module name
- Relative time (e.g., "2 hours ago")

**Tests:**

- Unit: ResultCard renders correctly
- E2E: Results page loads with data

---

#### Task 4.2: Create Result Detail View

**File to Create:** `src/app/results/[resultId]/page.tsx`

**Acceptance Criteria:**

- Shows full result data
- Lists all mistakes with correct answers
- Users can only view their own results

**Tests:** E2E: Result detail page

---

### Phase 5: Admin Features

#### Task 5.1: Create Admin Dashboard

**Files to Create:**

- `src/app/admin/page.tsx`
- `src/app/admin/layout.tsx`
- `src/components/admin/AdminModuleCard.tsx`

**Acceptance Criteria:**

- Only admins can access
- Shows list of all modules with item counts
- Link to create new module

**Tests:**

- E2E: Admin access control
- E2E: Admin dashboard loads

---

#### Task 5.2: Create JSON Seeder UI

**Files to Create:**

- `src/app/admin/modules/new/page.tsx`
- `src/components/admin/ModuleSeederForm.tsx`

**Form Fields:**

- Module title (text input)
- Module description (textarea)
- Questions JSON (textarea for JSON array)

**Acceptance Criteria:**

- Validates JSON format
- Shows clear error messages for invalid JSON
- Creates module with all items on success
- Redirects to admin dashboard

**Tests:**

- Unit: JSON parsing logic
- E2E: Creating module with JSON seeder

---

#### Task 5.3: Add Module Management Actions

**Files to Create:**

- `src/app/admin/modules/[moduleId]/page.tsx`
- `src/components/admin/DeleteModuleButton.tsx`

**Acceptance Criteria:**

- Admin can view module details
- Delete requires confirmation
- Cascade deletes items and results

**Tests:** E2E: Module deletion flow

---

### Phase 6: Polish & Final Testing

#### Task 6.1: Add Loading States & Error Boundaries

**Files to Create:**

- `src/app/loading.tsx`
- `src/app/error.tsx`
- `src/app/not-found.tsx`
- `src/components/ui/Spinner.tsx`
- `src/app/quiz/loading.tsx`
- `src/app/quiz/[moduleId]/loading.tsx`

**Acceptance Criteria:**

- Loading spinners during data fetches
- Error boundaries catch and display errors
- 404 page for invalid routes

**Tests:** E2E: Loading states visible during navigation

---

#### Task 6.2: Add CSS Animations

**Files to Modify:**

- `src/app/globals.css`
- `tailwind.config.ts`

**Animations:**

```typescript
// tailwind.config.ts
animation: {
  shake: 'shake 0.5s ease-in-out',
},
keyframes: {
  shake: {
    '0%, 100%': { transform: 'translateX(0)' },
    '25%': { transform: 'translateX(-5px)' },
    '75%': { transform: 'translateX(5px)' },
  },
},
```

**Acceptance Criteria:**

- Shake animation on incorrect answer
- Green background flash on correct answer

**Tests:** E2E: Verify animations trigger

---

#### Task 6.3: Database Seeding Script

**Files to Create:**

- `prisma/seed.ts`

**Dependencies:**

```bash
npm install -D ts-node
```

**Content:**

- 50 English irregular plural nouns
- Admin user account
- English Plurals module

**package.json:**

```json
{
  "prisma": {
    "seed": "npx ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
}
```

**Acceptance Criteria:** `npx prisma db seed` populates database

---

#### Task 6.4: Environment Configuration

**Files to Create:**

- `.env.example`

**Variables:**

```bash
DATABASE_URL="postgresql://..."
AUTH_URL="http://localhost:3000"
AUTH_SECRET="..."
ADMIN_EMAIL="..."
ADMIN_PASSWORD="..."
```

> **Note:** the app originally shipped with Google OAuth; it now uses an
> email + password Credentials provider and admin-seeded accounts. See
> `CLAUDE.md` for the current auth model.

---

#### Task 6.5: Comprehensive E2E Test Suite

**Files to Create:**

- `e2e/auth.spec.ts`
- `e2e/quiz.spec.ts`
- `e2e/results.spec.ts`
- `e2e/admin.spec.ts`

**Coverage:**

- Authentication flow
- Quiz selection to completion
- Results viewing
- Admin module creation and deletion

---

## Final File Structure

```
polymath/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   ├── globals.css
│   │   ├── api/auth/[...nextauth]/route.ts
│   │   ├── (auth)/signin/page.tsx
│   │   ├── quiz/
│   │   │   ├── page.tsx
│   │   │   └── [moduleId]/
│   │   │       ├── page.tsx
│   │   │       └── QuizClient.tsx
│   │   ├── results/
│   │   │   ├── page.tsx
│   │   │   └── [resultId]/page.tsx
│   │   └── admin/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── modules/
│   │           ├── new/page.tsx
│   │           └── [moduleId]/page.tsx
│   ├── components/
│   │   ├── auth/
│   │   ├── layout/
│   │   ├── modules/
│   │   ├── quiz/
│   │   ├── renderers/
│   │   ├── results/
│   │   ├── admin/
│   │   └── ui/
│   ├── actions/
│   │   ├── modules.ts
│   │   ├── results.ts
│   │   └── admin.ts
│   ├── hooks/
│   │   └── useQuiz.ts
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   ├── auth-utils.ts
│   │   └── validators.ts
│   ├── types/
│   │   ├── content.ts
│   │   ├── quiz.ts
│   │   └── next-auth.d.ts
│   ├── middleware.ts
│   └── tests/setup.ts
├── e2e/
│   ├── auth.spec.ts
│   ├── quiz.spec.ts
│   ├── results.spec.ts
│   └── admin.spec.ts
├── .env.example
├── vitest.config.ts
├── playwright.config.ts
└── package.json
```

---

## Task Execution Order (Fast Deploy)

### Milestone 1: Foundation + Auth
1. ✅ Task 0.1 - Initialize Next.js
2. ✅ Task 0.3 - Setup Prisma & Database Schema
3. ✅ Task 1.1 - Configure Auth.js with Google OAuth
4. Task 1.3 - Route Protection + Role-based Redirects

### Milestone 2: Student Quiz Flow
5. Task 2.2 - Server Actions for Modules
6. Task 3.3 - Quiz Runner + useQuiz Hook
7. Task 3.4 - TEXT Renderer Component
8. Task 3.6 - Quiz Page + Result Saving

### 🚀 FIRST DEPLOY HERE

### Milestone 3: Parent-Child Interaction
9. Task 5.2 - JSON Seeder UI (Parent adds questions)
10. Task 4.1 - Results History (Parent views scores)
11. Task 3.1 - Layout + Role-aware Navigation
12. Task 3.2 - Module Selection UI

### Milestone 4: Polish
13. Task 6.3 - Database Seeding Script
14. Task 5.1 - Admin Dashboard
15. Task 6.1 - Loading States & Error Boundaries
16. Task 6.2 - CSS Animations

### Deferred
- Task 0.2 - Testing Infrastructure
- Task 1.2 - Custom Auth UI Components
- Task 2.1 - Type Definitions
- Task 2.3 - Results Server Actions (merged into 3.6)
- Task 2.4 - Admin Server Actions (merged into 5.2)
- Task 3.5 - Quiz Results Display (merged into 3.6)
- Task 4.2 - Result Detail View
- Task 5.3 - Module Management
- Task 6.4 - Environment Config
- Task 6.5 - E2E Test Suite
