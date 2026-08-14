import { User } from "next-auth";

/**
 * Module augmentation to extend NextAuth's built-in types with the backend
 * API token and user profile so they are available on the session object.
 */
declare module "next-auth" {
  interface User {
    isGuest?: boolean;
    sessionId?: string;
  }
  interface Session {
    user: {
      id: string;
      isGuest: boolean;
      sessionId?: string;
      name?: string | null;
      email?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {}
}
