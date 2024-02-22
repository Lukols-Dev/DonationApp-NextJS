import { firestore } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//GET App fees by user id
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const appFeesDoc = doc(firestore, "app_fees", "app_fees");
    const userFeesColl = collection(firestore, "app_fees", "app_fees", "users");
    const existingUserFeesQuery = query(userFeesColl, where("uid", "==", id));
    const existingUserFees = await getDocs(existingUserFeesQuery);
    const userFees = existingUserFees.docs[0];
    const appFees = await getDoc(appFeesDoc);

    const summaryFees = { ...userFees.data(), ...appFees.data() };
    return NextResponse.json(summaryFees, {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
