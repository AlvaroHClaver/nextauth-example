import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    username: string;
    role: string;
  }
}
