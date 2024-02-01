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
          ...profile,
          id: profile.sub,
          name: profile.name,
          user_name: profile.user_name ?? "user" + crypto.randomUUID(),
          email: profile.email,
          image: "",
          role: "user",
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
  //   callbacks: {
  //     async jwt({
  //       token,
  //       user,
  //       trigger,
  //       session,
  //     }: {
  //       token: any;
  //       user: any;
  //       trigger: any;
  //       session: any;
  //     }): Promise<any> {
  //       if (user) {
  //         token.uid = user.id;
  //         token.role = user.role;
  //         token.is_seller = user.is_seller;
  //         token.seller_acc = user.seller_acc;
  //         token.user_name = user.user_name;
  //         token.email_verified = user.email_verified;
  //       }

  //       if (
  //         trigger === "update" &&
  //         (session.user_name || session.is_seller || session.seller_acc)
  //       ) {
  //         token.user_name = session.user_name;
  //         token.is_seller = session.is_seller;
  //         token.seller_acc = session.seller_acc;
  //       }

  //       return token;
  //     },
  // async session({ session, token }: any): Promise<any> {
  //   if (session?.user) {
  //     session.user.uid = token.uid;
  //     session.user.role = token.role;
  //     session.is_seller = token.is_seller;
  //     session.seller_acc = token.seller_acc;
  //     session.user.user_name = token.user_name;
  //     session.email_verified = token.email_verified;
  //   }

  //   return session;
  // },
  //   },
  secret: process.env.NEXTAUTH_SECRET,
};
