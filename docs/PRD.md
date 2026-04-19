# Product Requirements Document (PRD): Polymath

## 1\. Executive Summary

**Polymath** is a subject-agnostic educational web application designed for home-learning. It facilitates rapid-fire practice drills across different domains (Language, Mathematics, Logic). The system features a generic "Quiz Runner" that dynamically adapts its interface based on the type of content (Text, Formula, or Geometric Shape) served from the database.

## 2\. Technical Stack

> The stack below reflects the current implementation. Earlier drafts of this
> PRD targeted Railway with Google OAuth; both were swapped for a self-hosted
> Coolify deploy with email/password auth. See `CLAUDE.md` for the source of
> truth.

- **Framework:** **Next.js 16** (App Router). Handles Frontend, API, and Server Actions.
- **Database:** **PostgreSQL** (managed by Coolify on the lr15a platform).
- **ORM:** **Prisma 7**. Uses strongly typed schemas with `JSON` support for flexible content payloads.
- **Authentication:** **Auth.js v5** with a Credentials provider (email + bcrypt). Admin-managed accounts, no public signup.
- **Math Rendering:** **KaTeX**. For rendering LaTeX equations (e.g., $\frac{x}{2} + 5$).
- **Deployment:** **Coolify on Hetzner** (lr15a platform). Push-to-deploy from GitHub.

---

## 3\. Architecture: The "Renderer" Pattern

The core innovation of Polymath is the separation of **Content Data** from **Display Logic**. The database stores a generic JSON payload, and the Frontend uses a "Switch" component to decide how to render it.

### 3.1 Data Flow

1.  **Fetch:** The Quiz Runner requests 20 items from the "Math: Algebra 1" module.
2.  **Identify:** The app reads the `ItemType` (e.g., `MATH_EQ`).
3.  **Render:** The `<QuizCard />` component loads the `<MathRenderer />`.
4.  **Display:** The renderer parses the JSON content (e.g., converts LaTeX strings to visual math) and displays the input field.

---

## 4\. Database Schema (Prisma)

This schema is critical. The `Item` table uses a `Json` column (`content`) to store data specific to the subject.

```prisma
// 1. Users
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      String   @default("STUDENT") // "ADMIN" or "STUDENT"
  results   Result[]
}

// 2. Modules (e.g., "English Plurals", "Geometry Basics")
model Module {
  id          String @id @default(uuid())
  title       String
  subject     String // "LANGUAGE", "MATH", "LOGIC"
  description String
  items       Item[]
  results     Result[]
}

// 3. The Flexible Item
enum ItemType {
  TEXT      // Standard string Q&A
  MATH_EQ   // LaTeX rendering
  GEOMETRY  // SVG rendering
}

model Item {
  id        String   @id @default(uuid())
  moduleId  String
  type      ItemType @default(TEXT)

  // THE MAGIC COLUMN
  // Stores { question: "...", answer: "..." }
  // OR { latex: "...", variables: {...} }
  // OR { shape: "triangle", points: [...] }
  content   Json

  module    Module   @relation(fields: [moduleId], references: [id])
}

// 4. Analytics
model Result {
  id        String   @id @default(uuid())
  score     Int
  total     Int
  time      Int      // Seconds
  mistakes  Json     // Array of failed Item IDs or details
  createdAt DateTime @default(now())

  userId    String
  moduleId  String
  user      User     @relation(fields: [userId], references: [id])
  module    Module   @relation(fields: [moduleId], references: [id])
}
```

---

## 5\. Content Payload Definitions

To ensure the app "scales" to new subjects, we define strict JSON structures for the `content` column.

### Type A: `TEXT` (English, History, Geography)

- **Use Case:** Plural nouns, translations, capitals.
- **JSON Structure:**
  ```json
  {
    "prompt": "Mouse",
    "answer": "Mice",
    "hint": "pol: Mysz"
  }
  ```

### Type B: `MATH_EQ` (Algebra, Arithmetic)

- **Use Case:** Solve for X, mental math.
- **JSON Structure:**
  ```json
  {
    "latex": "2x + 4 = 12",
    "instruction": "Solve for x",
    "answer": "4"
  }
  ```

### Type C: `GEOMETRY` (Visual Math)

- **Use Case:** Calculate area, identify shapes.
- **JSON Structure:**
  ```json
  {
    "instruction": "Calculate the area",
    "shapeType": "rect",
    "props": { "width": 10, "height": 5, "fill": "blue" },
    "labels": { "top": "10", "left": "5" },
    "answer": "50"
  }
  ```

---

## 6\. Functional Requirements

### 6.1 Admin (Parent) Features

- **Module Library:** View all active modules.
- **Seeder Interface:** (MVP) A simple text area to paste a JSON array of questions to bulk-create a new module.
- **Analytics Dashboard:**
  - Filter by Subject (Math vs. Language).
  - "Problem Areas": List items with a high failure rate (e.g., "She fails 80% of Geometry questions involving Triangles").

### 6.2 Student (Daughter) Features

- **Subject Select:** Large cards for "English", "Math", "Logic".
- **The Quiz Interface:**
  - **Auto-Focus:** Input field is always active.
  - **Hotkeys:** `Enter` to submit/advance.
  - **Visual Feedback:** Green flash for correct, Red shake for incorrect.
  - **The "Why":** For Math/Geometry errors, show a brief explanation step (optional field in JSON).
- **Gamification:**
  - "Streak" counter (days in a row).
  - "Personal Best" time for each module.

---

## 7\. Deployment Plan (Coolify on lr15a)

> Originally planned for Railway with Google OAuth; moved to self-hosted
> Coolify with email/password auth. See `CLAUDE.md` and the lr15a platform
> docs for the current setup.

### Phase 1: Setup

1.  **Repo:** Create `polymath` on GitHub.
2.  **Database:** `ssh` to the lr15a server and run `./server/create-app-db.sh polymath <postgres-container>` to provision an isolated DB + user.
3.  **Env (Coolify dashboard):** Set `DATABASE_URL`, `AUTH_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.

### Phase 2: The Logic (MVP)

1.  Implement Prisma Schema.
2.  Build the `TEXT` renderer.
3.  Seed the database with 50 English Plurals.
4.  **Milestone:** Daughter can practice English.

### Phase 3: The Expansion (Math)

1.  Install `react-katex` and `katex` (css).
2.  Build the `MATH_EQ` renderer component.
3.  Seed 20 simple algebra equations.
4.  **Milestone:** App now supports two distinct subjects.

### Phase 4: Visuals (Geometry)

1.  Build a generic SVG component that accepts `props` from the JSON.
2.  Seed Geometry questions.

---

## 8\. Next Step: Actionable

To get you started, I can provide the **Prisma Schema** file and a **seed script** that includes:

1.  20 English Plural Nouns (Type: TEXT).
2.  10 Simple Algebra Equations (Type: MATH_EQ).

This will allow you to deploy the architecture immediately and see both English and Math working side-by-side in your database.
