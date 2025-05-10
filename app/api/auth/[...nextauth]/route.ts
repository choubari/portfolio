import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

if (!process.env.GITHUB_ID) {
  throw new Error("Missing GITHUB_ID environment variable");
}
if (!process.env.GITHUB_SECRET) {
  throw new Error("Missing GITHUB_SECRET environment variable");
}
// NEXTAUTH_SECRET is also checked by NextAuth internally

export const authOptions: import("next-auth").AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const githubProfile = profile as { login?: string; [key: string]: any };
      if (githubProfile.login === "choubari") {
        return true;
      }
      return false;
    },
    // Potentially add a jwt callback to include github username (profile.login) in the session token
    // async jwt({ token, profile }) {
    //   if (profile) {
    //     token.login = (profile as { login?: string }).login;
    //   }
    //   return token;
    // },
    // And session callback to make it available in useSession()
    // async session({ session, token }) {
    //   if (token.login && session.user) {
    //     (session.user as any).login = token.login;
    //   }
    //   return session;
    // },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
