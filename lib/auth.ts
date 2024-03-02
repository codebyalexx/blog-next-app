import { prisma } from "@/lib/prisma";
import { getFeatureFlag } from "@/src/features/features-flag/features-utils";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions, getServerSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { Writers } from "./utils";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({ session, user }: any) {
      if (!session.user) return session;
      session.user.id = user.id;
      return session;
    },
    async signIn({ user }) {
      const isWriter = Writers.includes(user?.email || "");
      const isAuthEnabled = (await getFeatureFlag("auth")).enabled;

      if (isAuthEnabled || isWriter) {
        return true;
      } else {
        return "/fun/auth-disabled";
      }
    },
  },
};

export const getAuthSession = async () => await getServerSession(authOptions);
