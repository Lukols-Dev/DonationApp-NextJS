import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { UserService } from "./firebase/firebase-actions";

export const getSession = async () => {
  //@ts-ignore
  return await getServerSession(authOptions);
};

export default async function getCurrentUser() {
  try {
    const session = await getSession();
    if (!session) return null;

    const { email, uid }: any = session.user;

    if (!email || !uid) return null;

    const currentUser = await UserService.getUserData(uid);

    if (!currentUser) return null;

    return {
      ...currentUser,
      uid: uid,
    };
  } catch (error: any) {
    console.log("Auth error: ", error);
    return null;
  }
}
