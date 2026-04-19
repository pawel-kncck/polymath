import type { NextAuthConfig } from 'next-auth';

/**
 * Edge-safe Auth.js configuration. This file MUST NOT import Prisma, bcrypt,
 * or anything that depends on Node built-ins — it's consumed by `middleware.ts`
 * which runs in the Edge runtime.
 *
 * The Credentials provider (with its Node-only `authorize` callback) lives in
 * `./auth.ts`. The middleware only decodes the JWT session cookie, so it does
 * not need the full provider list here.
 */
export const authConfig = {
  session: { strategy: 'jwt' },
  providers: [],
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
