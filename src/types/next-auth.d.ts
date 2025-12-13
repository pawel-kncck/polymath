import 'next-auth';
import '@auth/core/adapters';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser {
    role: string;
  }
}
