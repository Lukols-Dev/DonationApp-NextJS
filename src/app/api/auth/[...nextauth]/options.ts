import { FirestoreAdapter } from "@auth/firebase-adapter";
import { cert } from "firebase-admin/app";
import GoogleProvider from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { assertValue } from "@/lib/utils";
import { Timestamp } from "firebase-admin/firestore";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: assertValue(
        "2013776465-ci2otl8o8bt6osn8kftcagubdg0tpim4.apps.googleusercontent.com",
        "Missing environment variable: google"
      ),
      clientSecret: assertValue(
        "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",
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
          create_at: Timestamp.now(),
          account_status: ["active"],
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
        "tipey-c631a",
        "Missing environment variable: firebase"
      ),
      clientEmail: assertValue(
        "firebase-adminsdk-el7nt@tipey-c631a.iam.gserviceaccount.com",
        "Missing environment variable: firebase"
      ),
      privateKey: assertValue(
        "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8LP4Ctqdl+V6j\nqdUDSiQigw0uKvrBNJVn/EFTMZkbTzT5L4JifvUTjVHGU8r+UPTXWEUQ3w0W2GaA\n1ygWr4opbLx8JCrDrg+TW6eDah2gp1GqVOSP0e+jRfvqHc1JtwEZLPkGhgR3RI+v\nWQZR6IjaA1ILDKU8IDfoe1IpTxEIRXbP7ojyfiTcAHMd7sD8UNlPzchIplTPXRQz\nAjzdxMuFqxp/9CeHzz3+ki+zPmnDM8CcHpyJ8adxSPYOh6B5IPIY1xs7uQaoeKu7\nTGD9b33FWpsuJ4JXP+Zucd90uctNRheFpz4NxGNe6VCijMaUxLR5AdRw/oVBYLhC\nrBfzjtfHAgMBAAECggEAV+bUiUP1kocYlG9DGBRMKOr6/zQIirQbjsWhZlFm6gDo\nB/cPex8/MHD1YCXIT2BV3zpWmPj4zlEsIMdg7Kf3bD5lFcB3UY0/rWBFMfgh+ufu\nGBkr45r3zFdmxAhD20lnc/E0Kr3z3Brk285ES4LKWrzuWEcB8MJEG49v4+gRVsD9\n52zJul6Jg+aTEFVxLaRTcQ6HbfulbgT/t4kZVbSppdMtUp7ljZYN//mMLG157qJy\nreIBMIMgLjFi+Kqgyb7wf6kx1ScL0kTV3YMw+bXlLWGuYnpZPNzGWTTzRfSfnsbZ\nZIjYOI29evE6Z5lLYRoArsx2K/dmlZn049vTr3l+4QKBgQD0vEZD6w9uMjJeXCCT\n2HY9jMOvR60yUiDAAi5nt/PITBe9tE1JSjTdfSf4yHi5jI3WbQ/PZBwI31Y+fy0a\n5cDmUCM2f6rznaeEoI0w5QrlYpabnLdGJo3yLVnEW9wlEy2pFoIvgCq6EyUdHLZ/\nd3CrKfi1FAhoU9eaEJf5R2CSHwKBgQDE1kXnabxzCwGeFwuXob4RTlH932GzTvBi\nvIk8EBMlbBOLk0WqI+JctXcGLrWlitomlukUNJDkpqPI8+/1aJAkrntAlPq/5PbZ\nLsYXSRZIyKj5Qv62YpV2XrxRhwNu6GBPsy1yN/0N0gpdj5tIYd6zMC+ykUdfQ9zA\nn9FktBCVWQKBgQCbUyrdTEB81cr17E6Yxtc0dTR0+G7J8ynp8vh0x2EnjHO86MPs\ncfZfZGGMGd/VE4mpv4o7O/Q3BVf9TkXYPl1RTycqHZjoCPUazbMOhy+FKi8gEDSZ\nhzqrq3C/mPV9alCecjSp5RQ5CJGTinehKrMNTxQUCOTVIfFCTKnHgi+eTQKBgQCe\nxv1ycz95SVqPrKVENks8aIIJGKUV38pWyyCkW48mM6z8fNrIKNQS1qphSVJra7sX\nP8pZ6yEp4CXkFqnsuuDzRe/UI5i1LDvW6z0NUX5xTbPIBbuzYYiRCFA+L3ucfkQa\nZj11kiZFfLWxzQKEe7YJswf2sevxs6shkol1Ay8RWQKBgDqFQHCN7K0mLZFbUZUB\nxBy1Pb4c69q4mRPZzxnBsO07J7UO9EvIeDCnISDg612Qijyqa/ZAJu15+pJb/6bh\nGfJyVJu9IR9xF4y7i+oF+/pReOohd/ad5yk+4nQvHsLFy8m3MQho6iUWC1maPTt8\n5H10SyVm/3rIem/wUUuZ8sbi\n-----END PRIVATE KEY-----\n".replace(
          /\\n/g,
          "\n"
        ),
        "Missing environment variable: firebase"
      ),
    }),
  }),
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user: any;
      trigger: any;
      session: any;
    }): Promise<any> {
      if (user) {
        token.uid = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any): Promise<any> {
      if (token.sub && session.user) {
        session.user.uid = token.sub;
      }

      return session;
    },
  },
  secret: "r603cSY7B4N5HkXlmUtYKzaBL3A43Fntdq6EbxmwPtI",
};
