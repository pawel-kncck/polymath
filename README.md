# 🧠 Polymath

**Polymath** is a scalable, subject-agnostic learning platform designed to help students master various domains—from English Vocabulary to Algebra and Geometry.

Built originally to teach English Plurals to B1 students, it utilizes a flexible architecture that allows new subjects (Math, Logic, Science) to be added without changing the database schema.

## 🚀 Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router, Server Actions)
- **Language:** TypeScript
- **Database:** PostgreSQL (Hosted on [Railway](https://railway.app/))
- **ORM:** [Prisma](https://www.prisma.io/)
- **Auth:** [Auth.js](https://authjs.dev/) (formerly NextAuth) - Google Provider
- **Styling:** Tailwind CSS
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

## 🛠️ Local Development Setup

### 1\. Clone & Install

```bash
git clone https://github.com/your-username/polymath.git
cd polymath
npm install
```

### 2\. Environment Variables

Create a `.env` file in the root directory. You need Google OAuth credentials (from Google Cloud Console).

```bash
# Database (Local or Railway connection string)
DATABASE_URL="postgresql://postgres:password@localhost:5432/polymath"

# Auth (Generate a random string for secret)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-random-secret-string"

# Google Auth Provider
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3\. Database Setup (Prisma)

Initialize the database and push the schema.

```bash
# Push schema to DB
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4\. Seed Initial Data

Populate the database with the default modules (English Plurals & Simple Math).

```bash
# Run the seed script defined in package.json
npx prisma db seed
```

### 5\. Run the App

```bash
npm run dev
```

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser.

---

## 🚄 Deployment (Railway)

Polymath is optimized for deployment on [Railway](https://railway.app/).

1.  **Push to GitHub:** Ensure your latest code is on GitHub.
2.  **New Project on Railway:** Select "Deploy from GitHub repo".
3.  **Add Database:** In Railway, right-click the canvas → Add Service → Database → PostgreSQL.
4.  **Connect:** Railway provides a `DATABASE_URL` automatically.
5.  **Variables:** Go to the App Settings in Railway and add:
    - `NEXTAUTH_SECRET`
    - `NEXTAUTH_URL` (Your production domain, e.g., `https://polymath-production.up.railway.app`)
    - `GOOGLE_CLIENT_ID`
    - `GOOGLE_CLIENT_SECRET`

---

## 🗺️ Roadmap

- [ ] **Phase 1 (MVP):** English Plurals Module (Text Renderer).
- [ ] **Phase 2:** Math Module (KaTeX Integration).
- [ ] **Phase 3:** Analytics Dashboard for Admin/Parent.
- [ ] **Phase 4:** Geometry Module (SVG Renderer).
- [ ] **Phase 5:** "Mistake Repeater" mode (Train only on failed items).

---

## 📝 License

This project is for personal educational use.
