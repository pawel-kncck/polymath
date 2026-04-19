# Next.js + Prisma 7 Dockerfile for the lr15a.pl Coolify platform.
# See ../lr15a/docs/deployment-lessons.md for the reasoning behind each choice.
#
# Prerequisites:
#   - next.config: output: "standalone"
#   - public/.gitkeep committed (git doesn't track empty dirs)
#   - prisma/migrations committed (Prisma 7 requires migration files at runtime)

FROM node:24-alpine AS base

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
# Use npm install, NOT npm ci. npm ci fails when the lockfile was generated
# by a different npm version or platform (e.g., macOS vs alpine), because
# optional platform-specific packages differ. npm install still respects
# locked versions but tolerates these differences.
RUN npm install

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate the Prisma client into src/generated/prisma (per schema.prisma
# generator config). This directory is gitignored, so Coolify's fresh
# clone doesn't have it and next build would fail without this step.
# prisma.config.ts calls env("DATABASE_URL") and throws if unset, so pass
# a dummy URL — the generated client reads the real URL at runtime.
RUN DATABASE_URL="postgresql://build:build@localhost:5432/build" npx prisma generate
RUN npm run build

# --- Production ---
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# 1. Standalone output (server.js + minimal traced node_modules)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# 2. Static assets built by Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# 3. Public directory — ensure public/.gitkeep is committed in your repo
COPY --from=builder /app/public ./public
# 4. Prisma 7: full node_modules overlay + schema + config for `prisma migrate deploy`.
#    The standalone output has a minimal node_modules; Prisma 7's CLI has too deep
#    a dependency tree to cherry-pick, so we overlay the full install on top.
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
# 5. Files needed by `npm run db:seed` (tsx/prisma/seed.ts). The seed imports
#    the generated Prisma client via the `@/` alias, so we need both the
#    generated sources and tsconfig.json (for tsx's path-alias resolution).
#    Next.js's standalone output strips everything under src/, so we have
#    to copy these explicitly.
COPY --from=builder /app/src/generated ./src/generated
COPY --from=builder /app/tsconfig.json ./tsconfig.json

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run Prisma migrations on startup, then start the app.
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
