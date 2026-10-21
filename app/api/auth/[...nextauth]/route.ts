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
      // GitHub returns an `iss` param on the authorization response (RFC 9207).
      // openid-client validates it against the issuer, which next-auth v4 leaves
      // undefined for GitHub, so the token exchange fails with
      // "issuer must be configured on the issuer" unless we set it explicitly.
      issuer: "https://github.com",
    }),
  ],
  callbacks: {
    async signIn({ profile }) {
      const githubProfile = profile as { login?: string; [key: string]: any };
      const admin = (process.env.GITHUB_ADMIN_USERNAME || "choubari").trim();
      const login = (githubProfile?.login || "").trim();
      if (login.toLowerCase() === admin.toLowerCase()) {
        return true;
      }
      console.error(
        `[auth] access denied: login=${JSON.stringify(login)} admin=${JSON.stringify(
          admin
        )} adminEnvSet=${Boolean(process.env.GITHUB_ADMIN_USERNAME)} profileKeys=${JSON.stringify(
          Object.keys(githubProfile || {})
        )}`
      );
      return false;
    },
    // Add jwt callback to include github username in the token
    async jwt({ token, profile }) {
      if (profile) {
        token.login = (profile as { login?: string }).login;
      }
      return token;
    },
    // Make github username available in useSession()
    async session({ session, token }) {
      if (token.login && session.user) {
        (session.user as any).login = token.login;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
