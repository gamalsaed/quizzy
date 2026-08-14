import { type NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "./lib/prisma_client";
import { loginSchema } from "./lib/schema/login.schema";
import { joinSchema } from "./lib/schema/join.schema";
import { generatePlayerName } from "./lib/game/player-names";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      id: "credentials",
      name: "Account",
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email.trim().toLowerCase() },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
          },
        });
        if (!user?.password) return null;

        const ok = await bcrypt.compare(parsed.data.password, user.password);
        if (!ok) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
    Credentials({
      id: "guest",
      name: "Guest",
      credentials: { code: {} },
      async authorize(credentials) {
        const parsed = joinSchema.safeParse(credentials);
        if (!parsed.success) return null;

        const gameSession = await prisma.gameSession.findUnique({
          where: { code: Number(parsed.data.code) },
          select: { id: true, status: true },
        });

        if (!gameSession) return null;
        if (gameSession.status !== "LOBBY") return null;

        const player = await prisma.player.create({
          data: {
            name: generatePlayerName(),
            sessionId: gameSession.id,
          },
          select: { id: true, name: true, sessionId: true },
        });

        return {
          id: player.id,
          name: player.name,
          sessionId: player.sessionId,
          isGuest: true,
          code: Number(parsed.data.code),
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isGuest = user.isGuest ?? false;
        token.sessionId = user.sessionId;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.isGuest = token.isGuest ?? false;
      session.user.sessionId = token.sessionId;
      return session;
    },
  },
};
