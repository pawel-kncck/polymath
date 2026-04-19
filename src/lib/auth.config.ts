import type { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';

/**
 * Edge-safe Auth.js configuration. This file MUST NOT import Prisma or
 * anything that depends on Node built-ins — it's consumed by `middleware.ts`
 * which runs in the Edge runtime.
 *
 * Full config with the Prisma adapter lives in `./auth.ts`.
 */
export const authConfig = {
  session: { strategy: 'jwt' },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = (token.sub as string) ?? '';
        session.user.role = (token.role as string) ?? 'STUDENT';
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
