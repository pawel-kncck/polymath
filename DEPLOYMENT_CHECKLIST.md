# Deployment Readiness Checklist

Use this checklist to verify your Polymath app is ready for deployment.

## Database Setup

- [ ] PostgreSQL is running (local or Railway)
- [ ] `.env` file has valid `DATABASE_URL`
- [ ] Database schema migrated: `npm run db:push`
- [ ] Database seeded with test data: `npm run db:seed`
- [ ] Can view data in Prisma Studio: `npm run db:studio`
- [ ] "English Plurals" module exists with 10 items

## Environment Variables

- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `AUTH_SECRET` - Generated with `openssl rand -base64 32` (not placeholder)
- [ ] `AUTH_URL` - Set to `http://localhost:3000` (dev) or production URL
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

### Google OAuth Setup

- [ ] Created project in Google Cloud Console
- [ ] Enabled Google+ API
- [ ] Created OAuth 2.0 credentials
- [ ] Added authorized redirect URI: `http://localhost:3000/api/auth/callback/google` (dev)
- [ ] Added production redirect URI (if deploying)

## Application Tests

- [ ] App starts without errors: `npm run dev`
- [ ] No TypeScript errors: `npm run build`
- [ ] No ESLint errors: `npm run lint`

## Unit Tests

Run `npm test` and verify:

- [ ] All useQuiz hook tests pass (16 tests)
- [ ] All modules action tests pass (9 tests)
- [ ] All results action tests pass (10 tests)
- [ ] All auth-utils tests pass (7 tests)
- [ ] **Total: 42 unit tests passing**

## E2E Tests

Run `npm run test:e2e` and verify:

- [ ] Auth flow tests pass (3 tests)
- [ ] Quiz UI tests pass (3 tests)
- [ ] Manual test scenarios documented

Note: Full quiz flow requires manual testing with real authentication.

## Manual Testing (Critical Path)

### Home Page
- [ ] Navigate to `http://localhost:3000`
- [ ] "English Plurals" module card displays
- [ ] Module shows: title, description, subject badge, question count
- [ ] Sign In button visible (when not authenticated)

### Authentication
- [ ] Click "Sign In" button
- [ ] Redirects to sign in page
- [ ] "Sign in with Google" button visible
- [ ] Click "Sign in with Google"
- [ ] Google OAuth flow completes successfully
- [ ] Redirects back to home page
- [ ] User name/email displays in header
- [ ] Sign Out button visible

### Quiz Flow
- [ ] Click on "English Plurals" module
- [ ] Quiz page loads with first question
- [ ] Input field is auto-focused
- [ ] Progress shows "1/10"
- [ ] Type correct answer (e.g., "cats" for "cat")
- [ ] Press Enter
- [ ] Green flash animation appears
- [ ] Automatically advances to question 2
- [ ] Progress updates to "2/10"
- [ ] Type incorrect answer
- [ ] Red shake animation appears
- [ ] Still advances to next question
- [ ] Complete all 10 questions
- [ ] Results screen appears

### Results Display
- [ ] Score shown as fraction (e.g., "8/10")
- [ ] Percentage shown (e.g., "80%")
- [ ] Time shown in MM:SS format
- [ ] Mistakes listed with correct answers
- [ ] "Try Again" button visible
- [ ] "Choose Another Module" button visible

### Retry Flow
- [ ] Click "Try Again"
- [ ] Quiz restarts from question 1
- [ ] Can complete quiz again
- [ ] New result displayed

### Navigation
- [ ] Click "Choose Another Module"
- [ ] Returns to home page
- [ ] Can select module again

### Database Verification
- [ ] Open Prisma Studio: `npm run db:studio`
- [ ] Navigate to "Result" model
- [ ] Verify result record created with:
  - Correct userId
  - Correct moduleId
  - Correct score and total
  - Time recorded
  - Mistakes array populated
  - createdAt timestamp

## Code Quality

- [ ] Build succeeds: `npm run build`
- [ ] No console errors during manual testing
- [ ] All dependencies installed
- [ ] `.gitignore` includes `.env`, `node_modules`, `.next`

## Railway Deployment (Production)

### Railway Setup
- [ ] Create Railway account
- [ ] Create new project
- [ ] Add PostgreSQL service
- [ ] Copy `DATABASE_URL` from Railway to production environment

### Environment Variables in Railway
- [ ] `DATABASE_URL` - Auto-configured by Railway
- [ ] `AUTH_SECRET` - Generated secure random string
- [ ] `AUTH_URL` - Your Railway app URL (e.g., `https://polymath-production.up.railway.app`)
- [ ] `GOOGLE_CLIENT_ID` - From Google Cloud Console
- [ ] `GOOGLE_CLIENT_SECRET` - From Google Cloud Console

### Google OAuth Production Setup
- [ ] Add production redirect URI in Google Cloud Console:
  - `https://your-railway-app.up.railway.app/api/auth/callback/google`

### Railway Deployment
- [ ] Connect GitHub repository to Railway
- [ ] Railway auto-deploys on push
- [ ] Build succeeds on Railway
- [ ] Run migrations on Railway: `npx prisma db push`
- [ ] Run seed on Railway: `npm run db:seed`

### Production Verification
- [ ] Visit production URL
- [ ] Home page loads
- [ ] Can sign in with Google
- [ ] Can complete quiz
- [ ] Results save to production database

## Final Checks

- [ ] All automated tests pass
- [ ] Manual testing complete
- [ ] Database has seed data
- [ ] Authentication works
- [ ] Quiz flow works end-to-end
- [ ] Results save correctly
- [ ] Ready for deployment! 🚀

## Troubleshooting

### Common Issues

**Database connection fails:**
- Verify `DATABASE_URL` is correct
- Check PostgreSQL is running
- Try connecting with `npx prisma studio`

**OAuth not working:**
- Verify Google credentials in `.env`
- Check redirect URI matches in Google Console
- Ensure `AUTH_URL` is correct

**Build fails:**
- Run `npm install` to ensure all dependencies installed
- Check for TypeScript errors: `npm run build`
- Clear `.next` folder and rebuild

**Tests fail:**
- Ensure database is seeded
- Check all mocks are properly configured
- Run tests individually to isolate failures

**Animations not working:**
- Verify Tailwind CSS is configured
- Check `globals.css` has animations
- Clear cache and reload browser
