import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await prisma.user.findUnique({
            where: {
              username: credentials?.username,
            },
          });

          if (!user) return null;

          const matchPassword = credentials?.password === user.password;

          if (!matchPassword) return null;

          return {
            id: user.id,
            name: user.username,
          } /* Type error bug fix ---> */ as any;
          // More info: https://github.com/nextauthjs/next-auth/issues/2701
        } catch (e) {
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
