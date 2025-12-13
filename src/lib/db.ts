import { PrismaClient } from '@/generated/prisma/client';

// Prisma client singleton for Next.js
// Prevents multiple instances during hot reload in development

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const prisma = globalForPrisma.prisma ?? new (PrismaClient as any)();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
