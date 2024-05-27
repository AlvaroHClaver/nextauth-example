import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
    username: string;
    role: string;
  }
}
interface User {
  id: string;
  username: string;
  role: string;
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username: string;
      role: string;
    };
  }
}
