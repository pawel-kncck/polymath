# 🧠 Polymath

**Polymath** is a scalable, subject-agnostic learning platform designed to help students master various domains—from English Vocabulary to Algebra and Geometry.

Built originally to teach English Plurals to B1 students, it utilizes a flexible architecture that allows new subjects (Math, Logic, Science) to be added without changing the database schema.

## ✨ Features

- **Email + Password Authentication** — admin-managed accounts, no OAuth
- **Admin panel** — create users, reset passwords, delete accounts at `/admin/users`
- **Interactive Quizzes** — English Plurals module with 10 practice questions
- **Real-time Feedback** — Green flash for correct, red shake for incorrect answers
- **Progress Tracking** — See your score, time, and review mistakes
- **Responsive Design** — Works on desktop and mobile devices
- **Dark Mode Support** — Automatic theme switching
- **Bilingual UI** — Polish / English with locale-aware content

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **Language:** TypeScript
- **Database:** PostgreSQL (managed by Coolify on the lr15a platform in production)
- **ORM:** [Prisma 7](https://www.prisma.io/)
- **Auth:** [Auth.js v5](https://authjs.dev/) with a Credentials provider (bcrypt)
- **Styling:** Tailwind CSS v4
- **Testing:** Vitest (unit) + Playwright (E2E)
- **Math Rendering:** KaTeX (for LaTeX equations)

---

## 🏗 Architecture: The "Renderer" Pattern

Polymath separates **Content Data** from **Display Logic**. Instead of rigid database columns for every question type, we use a polymorphic approach.

### Database Schema

We use a `JSON` column to store the content payload, defined by an `ItemType`.

```prisma
enum ItemType {
  TEXT           // Simple Q&A (e.g., Vocabulary)
  SINGLE_CHOICE  // One correct option from a list
  MATH_EQ        // LaTeX Formulas (e.g., Algebra)
  GEOMETRY       // SVG Shapes (e.g., Geometry)
}

model Item {
  id      String   @id @default(uuid())
  type    ItemType @default(TEXT)
  content Json     // Flexible payload
  // ...
}
```

### Content Payloads

The frontend `QuizRunner` component switches its rendering logic based on the `type`.

| Type              | Description                    | JSON Structure Example                                                  |
| :---------------- | :----------------------------- | :---------------------------------------------------------------------- |
| **TEXT**          | Standard string matching.      | `{"prompt": "Mouse", "answer": "Mice", "hint": "pl: Mysz"}`             |
| **SINGLE_CHOICE** | One correct option from a list | `{"prompt": "...", "options": [...], "answer": "..."}`                  |
| **MATH_EQ**       | Renders LaTeX via KaTeX.       | `{"latex": "2x + 4 = 12", "instruction": "Solve for x", "answer": "4"}` |
| **GEOMETRY**      | Renders SVG shapes.            | `{"shape": "rect", "props": {"w": 10, "h": 5}, "answer": "50"}`         |

---

## 🛠️ Quick Start

### Prerequisites

- Node.js 24+ installed
- PostgreSQL running locally

### 1. Clone & Install

```bash
git clone https://github.com/your-username/polymath.git
cd polymath
npm install
```

### 2. Database Setup

```bash
# Install PostgreSQL (macOS)
brew install postgresql@16
brew services start postgresql@16

# Create database
createdb polymath_dev
```

### 3. Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
# PostgreSQL connection string
DATABASE_URL="postgresql://postgres@localhost:5432/polymath_dev"

# Auth.js v5 — full URL of the deployed app (no trailing slash)
AUTH_URL="http://localhost:3000"

# Generate with: openssl rand -base64 32
AUTH_SECRET="your-random-secret-string"

# Admin bootstrapped by `npm run db:seed` (idempotent upsert)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="at-least-8-characters"
```

### 4. Initialize Database

```bash
# Apply migrations
npx prisma migrate dev

# Seed modules + bootstrap the admin user
npm run db:seed

# (Optional) View data in Prisma Studio
npm run db:studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with the admin credentials you set in `.env`.

Additional users are created from `/admin/users` (admin-only).

---

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npx prisma migrate dev` - Create and apply a new migration
- `npm run db:seed` - Seed modules + bootstrap admin from env vars
- `npm run db:reset` - Reset and reseed database (⚠️ destructive)
- `npm run db:studio` - Open Prisma Studio GUI

### Testing
- `npm test` - Run unit tests (Vitest)
- `npm run test:ui` - Open Vitest UI
- `npm run test:e2e` - Run E2E tests (Playwright)
- `npm run test:e2e:ui` - Open Playwright UI

---

## 🧪 Testing

Polymath has comprehensive test coverage with both unit and end-to-end tests.

### Unit Tests

```bash
npm test
```

Test suites cover the quiz state hook, server actions for modules and results, and auth helpers.

### E2E Tests

```bash
npm run test:e2e
```

---

## 📦 Project Structure

```
polymath/
├── prisma/
│   ├── schema.prisma             # Database schema
│   ├── migrations/               # Committed migration history
│   └── seed.ts                   # Modules + admin bootstrap
├── src/
│   ├── app/
│   │   ├── page.tsx              # Home (module listing)
│   │   ├── signin/               # Email + password login
│   │   ├── admin/users/          # Admin user management
│   │   └── quiz/[moduleId]/      # Quiz flow
│   ├── actions/                  # Server actions
│   ├── components/
│   │   ├── quiz/                 # Quiz UI components
│   │   └── renderers/            # Content type renderers
│   ├── hooks/useQuiz.ts          # Quiz state management
│   ├── i18n/                     # PL / EN messages
│   ├── lib/
│   │   ├── auth.ts               # Auth.js + Credentials provider
│   │   ├── auth.config.ts        # Edge-safe config for middleware
│   │   ├── auth-utils.ts         # requireAuth / requireAdmin
│   │   └── db.ts                 # Prisma client
│   └── middleware.ts             # Route protection + admin guard
├── e2e/                          # Playwright E2E tests
├── Dockerfile                    # Next.js + Prisma 7 production image
├── deploy-test.sh                # Local Docker build/run test
├── DEPLOYMENT_CHECKLIST.md       # Pre-deploy verification
└── CLAUDE.md                     # AI assistant instructions
```

---

## 🚢 Deployment

This app deploys to the lr15a.pl platform via Coolify (Hetzner). Pushing to `main` triggers an automatic production deploy — there is no staging.

See [`CLAUDE.md`](./CLAUDE.md) for the deployment rules and [`DEPLOYMENT_CHECKLIST.md`](./DEPLOYMENT_CHECKLIST.md) for the pre-push checklist.

### Quick reference

1. Create the database on the server: `./server/create-app-db.sh polymath <postgres-container>`
2. Add the app in the Coolify dashboard, Build Pack = Docker, domain = `polymath.lr15a.pl`
3. Set env vars in Coolify: `DATABASE_URL`, `AUTH_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
4. Deploy — startup runs `prisma migrate deploy` automatically
5. First time only: run `npm run db:seed` via Coolify exec to create the admin user

---

## 🔧 Development

### Adding New Question Types

1. Add new `ItemType` enum value in `prisma/schema.prisma`
2. Define content interface in `src/types/content.ts`
3. Create renderer component in `src/components/renderers/`
4. Update `QuizRunner` to use new renderer
5. Add seed data for new type
6. Write tests for new renderer

### Database Schema Changes

```bash
# Make changes to prisma/schema.prisma

# Create and apply a new migration (commit the generated files)
npx prisma migrate dev --name <description>

# Prisma client is regenerated automatically
```

---

## 🐛 Troubleshooting

### Database connection issues
- Verify `DATABASE_URL` in `.env`
- Check PostgreSQL is running: `brew services list`
- Test with Prisma Studio: `npm run db:studio`

### Can't sign in
- Make sure `npm run db:seed` ran and the admin user exists
- Verify the password in `.env` matches what you're typing
- Reset by editing `.env` and re-running `npm run db:seed` (upsert is idempotent)

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Tests failing
- Ensure database is migrated and seeded
- Run suites individually to isolate issues

---

## 🗺️ Roadmap

- [x] **Phase 1 (MVP):** English Plurals Module (Text Renderer)
- [x] **Auth + admin:** email/password + user management UI
- [ ] **Phase 2:** Math Module (KaTeX Integration)
- [ ] **Phase 3:** Analytics Dashboard for Admin/Parent
- [ ] **Phase 4:** Geometry Module (SVG Renderer)
- [ ] **Phase 5:** "Mistake Repeater" mode (train only on failed items)

---

## 📝 License

This project is for personal educational use.
