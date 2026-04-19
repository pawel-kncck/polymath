import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';
import { authConfig } from './auth.config';

// Dev-only Credentials provider — email-only login that upserts a user.
// Never included in production builds.
const devProviders =
  process.env.NODE_ENV !== 'production'
    ? [
        Credentials({
          credentials: {
            email: { label: 'Email', type: 'email' },
          },
          async authorize(credentials) {
            const email =
              typeof credentials?.email === 'string'
                ? credentials.email.trim().toLowerCase()
                : '';
            if (!email) return null;

            const role = email.startsWith('admin@') ? 'ADMIN' : 'STUDENT';
            const user = await prisma.user.upsert({
              where: { email },
              update: {},
              create: {
                email,
                name: email.split('@')[0],
                role,
              },
            });

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role,
            };
          },
        }),
      ]
    : [];

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [...authConfig.providers, ...devProviders],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user?.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { role: true },
        });
        token.role = dbUser?.role ?? 'STUDENT';
      }
      return token;
    },
  },
});
