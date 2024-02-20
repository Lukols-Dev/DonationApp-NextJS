import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { assertValue } from "@/lib/utils";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: assertValue(
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        "Missing environment variable: google"
      ),
      clientSecret: assertValue(
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
        "Missing environment variable: google"
      ),
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: "",
          surname: "",
          nick: "user" + crypto.randomUUID(),
          email: profile.email,
          email_verified: profile.email_verified,
          picture: "",
          role: "user",
          pid: "",
          account_type: "individual",
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  adapter: FirestoreAdapter({
    credential: cert({
      projectId: assertValue(
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        "Missing environment variable: firebase"
      ),
      clientEmail: assertValue(
        process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
        "Missing environment variable: firebase"
      ),
      privateKey: assertValue(
        process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
        "Missing environment variable: firebase"
      ),
    }),
  }),
  callbacks: {
    async session({ session, token }: any): Promise<any> {
      if (token.sub && session.user) {
        session.user.uid = token.sub;
      }

      return session;
    },
    async jwt({ token }: any) {
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
