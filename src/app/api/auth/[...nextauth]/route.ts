import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials?.username,
            },
          });

          if (!user) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials?.password || "",
            user.password
          );

          if (!isPasswordCorrect) {
            return null;
          }
          return {
            ...user,
            id: String(user.id),
            password: "",
            role: user.role,
          };
        } catch (error) {
          console.error("Error during user authorization:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
