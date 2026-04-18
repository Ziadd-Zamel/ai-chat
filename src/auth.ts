import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginService } from "@/lib/services/auth.service";

// Extend the User type to include tokens
interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      // Credentials provider using our existing loginService
      async authorize(credentials): Promise<AuthUser | null> {
        // Guard against undefined credentials
        if (!credentials?.email || !credentials?.password) return null;

        // New form data
        const formData = new FormData();

        // Create form data
        formData.append("email", credentials.email as string);
        formData.append("password", credentials.password as string);

        // Call login service
        const result = await loginService(formData);

        // Return null if login failed
        if (!result.status) return null;

        // Return user object with tokens
        return {
          id: result.data.id,
          name: result.data.name as string,
          email: result.data.email as string,
          accessToken: result.data.token as string,
          refreshToken: result.data.refreshToken as string,
        };
      },
    }),
  ],

  callbacks: {
    // Persist tokens and user info into the JWT
    async jwt({ token, user }) {
      if (user) {
        const authUser = user as AuthUser;
        token.name = authUser.name || "";
        token.email = authUser.email || "";
        token.accessToken = authUser.accessToken;
        token.refreshToken = authUser.refreshToken;
      }

      return token;
    },

    // Expose JWT data on the session object
    async session({ session, token }) {
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;

      return session;
    },
  },

  pages: {
    // Custom login page
    signIn: "/auth/login",
  },

  session: {
    strategy: "jwt",
  },
});
