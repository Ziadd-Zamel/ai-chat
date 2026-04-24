/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "@/lib/services/auth.service";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const result = await loginService({
          email: credentials.email as string,
          password: credentials.password as string,
        });

        if (!result.status) return null;

        return {
          id: result.result.user?.id,
          name: result.result.user?.fullName,
          email: result.result.user?.email,
          accessToken: result.result.accessToken,
          refreshToken: result.result.refreshToken,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as any;
        token.name = authUser.name || "";
        token.email = authUser.email || "";
        token.accessToken = authUser.accessToken;
        token.refreshToken = authUser.refreshToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },
};

export default NextAuth(authOptions);
