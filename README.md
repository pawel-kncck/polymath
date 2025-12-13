# 🧠 Polymath

**Polymath** is a scalable, subject-agnostic learning platform designed to help students master various domains—from English Vocabulary to Algebra and Geometry.

Built originally to teach English Plurals to B1 students, it utilizes a flexible architecture that allows new subjects (Math, Logic, Science) to be added without changing the database schema.

## ✨ Features

- **Google OAuth Authentication** - Secure sign-in with Google accounts
- **Interactive Quizzes** - English Plurals module with 10 practice questions
- **Real-time Feedback** - Green flash for correct, red shake for incorrect answers
- **Progress Tracking** - See your score, time, and review mistakes
- **Responsive Design** - Works on desktop and mobile devices
- **Dark Mode Support** - Automatic theme switching
- **Full Test Coverage** - 42 unit tests + E2E tests with Playwright

## 🚀 Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **Language:** TypeScript
- **Database:** PostgreSQL (Hosted on [Railway](https://railway.app/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Auth:** [Auth.js v5](https://authjs.dev/) (Google Provider)
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
  TEXT      // Simple Q&A (e.g., Vocabulary)
  MATH_EQ   // LaTeX Formulas (e.g., Algebra)
  GEOMETRY  // SVG Shapes (e.g., Geometry)
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

| Type         | Description               | JSON Structure Example                                                  |
| :----------- | :------------------------ | :---------------------------------------------------------------------- |
| **TEXT**     | Standard string matching. | `{"prompt": "Mouse", "answer": "Mice", "hint": "pol: Mysz"}`            |
| **MATH_EQ**  | Renders LaTeX via KaTeX.  | `{"latex": "2x + 4 = 12", "instruction": "Solve for x", "answer": "4"}` |
| **GEOMETRY** | Renders SVG shapes.       | `{"shape": "rect", "props": {"w": 10, "h": 5}, "answer": "50"}`         |

---

## 🛠️ Quick Start

### Prerequisites

- Node.js 20+ installed
- PostgreSQL database (local or Railway)
- Google OAuth credentials

### 1. Clone & Install

```bash
git clone https://github.com/your-username/polymath.git
cd polymath
npm install
```

### 2. Database Setup

**Option A: Local PostgreSQL**

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# Create database
createdb polymath
```

**Option B: Railway (Cloud - Recommended)**

1. Go to [railway.app](https://railway.app)
2. Create new project → Add PostgreSQL
3. Copy the `DATABASE_URL` from Railway dashboard

### 3. Environment Variables

Create a `.env` file in the root directory:

```bash
# Database (Local or Railway)
DATABASE_URL="postgresql://postgres@localhost:5432/polymath"

# Auth.js (Generate secret: openssl rand -base64 32)
AUTH_SECRET="your-random-secret-string"
AUTH_URL="http://localhost:3000"

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID
5. Add authorized redirect URI:
   - `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

### 5. Initialize Database

```bash
# Apply schema to database
npm run db:push

# Seed with English Plurals module (10 questions)
npm run db:seed

# (Optional) View data in Prisma Studio
npm run db:studio
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 📜 Available Scripts

### Development
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Database
- `npm run db:push` - Apply Prisma schema to database
- `npm run db:seed` - Seed database with test data
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

### Unit Tests (42 tests)

Run all unit tests:
```bash
npm test
```

Test suites:
- `src/hooks/useQuiz.test.ts` - 16 tests (Quiz state management, answer validation, timing)
- `src/actions/modules.test.ts` - 9 tests (Module fetching, shuffling)
- `src/actions/results.test.ts` - 10 tests (Result saving, user isolation)
- `src/lib/auth-utils.test.ts` - 7 tests (Authentication helpers)

### E2E Tests

Run end-to-end tests:
```bash
npm run test:e2e
```

Test suites:
- `e2e/auth.spec.ts` - Authentication flow
- `e2e/quiz.spec.ts` - Quiz taking flow
- `e2e/results.spec.ts` - Results verification

**Note:** Full authenticated quiz flow requires manual testing due to Google OAuth. See `DEPLOYMENT_CHECKLIST.md` for manual testing steps.

---

## 📦 Project Structure

```
polymath/
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed data (English Plurals)
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── page.tsx        # Home page (module listing)
│   │   ├── signin/         # Sign in page
│   │   └── quiz/[moduleId]/ # Quiz page
│   ├── actions/            # Server actions
│   │   ├── modules.ts      # Module CRUD
│   │   └── results.ts      # Result CRUD
│   ├── components/         # React components
│   │   ├── quiz/           # Quiz UI components
│   │   └── renderers/      # Content type renderers
│   ├── hooks/              # Custom React hooks
│   │   └── useQuiz.ts      # Quiz state management
│   ├── lib/                # Utilities
│   │   ├── auth.ts         # Auth.js configuration
│   │   ├── auth-utils.ts   # Auth helpers
│   │   └── db.ts           # Prisma client
│   └── types/              # TypeScript types
├── e2e/                    # Playwright E2E tests
├── vitest.config.ts        # Vitest configuration
├── playwright.config.ts    # Playwright configuration
├── DEPLOYMENT_CHECKLIST.md # Deployment verification
└── CLAUDE.md               # AI assistant instructions
```

---

## 🚢 Deployment

### Deploy to Railway

1. **Create Railway Project**
   ```bash
   # Install Railway CLI (optional)
   npm install -g @railway/cli

   # Or use web dashboard
   ```

2. **Add PostgreSQL**
   - In Railway dashboard, add PostgreSQL service
   - `DATABASE_URL` is auto-configured

3. **Connect GitHub Repository**
   - Push your code to GitHub
   - In Railway, deploy from GitHub repo
   - Railway auto-deploys on push

4. **Set Environment Variables**

   In Railway dashboard, add:
   ```
   AUTH_SECRET=<generate-with-openssl-rand-base64-32>
   AUTH_URL=https://your-app.up.railway.app
   GOOGLE_CLIENT_ID=<your-client-id>
   GOOGLE_CLIENT_SECRET=<your-client-secret>
   ```

5. **Update Google OAuth**
   - Add production redirect URI in Google Cloud Console:
     `https://your-app.up.railway.app/api/auth/callback/google`

6. **Run Database Migrations**
   ```bash
   # Via Railway CLI or dashboard
   railway run npm run db:push
   railway run npm run db:seed
   ```

7. **Verify Deployment**

   Use the [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) to verify everything works.

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

# Apply changes
npm run db:push

# Generate Prisma client
npx prisma generate
```

---

## 🐛 Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` in `.env`
- Check PostgreSQL is running: `brew services list`
- Test connection: `npm run db:studio`

### OAuth Not Working
- Verify credentials in `.env`
- Check redirect URI matches in Google Console
- Ensure `AUTH_URL` is correct for your environment

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run build`

### Tests Failing
- Ensure database is seeded: `npm run db:seed`
- Check all mocks are properly configured
- Run tests individually to isolate issues

---

## 🗺️ Roadmap

- [x] **Phase 1 (MVP):** English Plurals Module (Text Renderer)
- [x] **Testing:** Full unit and E2E test coverage
- [ ] **Phase 2:** Math Module (KaTeX Integration)
- [ ] **Phase 3:** Analytics Dashboard for Admin/Parent
- [ ] **Phase 4:** Geometry Module (SVG Renderer)
- [ ] **Phase 5:** "Mistake Repeater" mode (Train only on failed items)

---

## 📝 License

This project is for personal educational use.

---

## 🙏 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new functionality
5. Ensure all tests pass: `npm test && npm run test:e2e`
6. Submit a pull request

For issues and questions, please open an issue on GitHub.
