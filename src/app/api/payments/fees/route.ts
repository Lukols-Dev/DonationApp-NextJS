import { firestore } from "@/lib/firebase";
import {
  addDoc,
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

//Add App fees by user id
export const POST = async (req: Request, { params }: { params: IParams }) => {
  const { uid, connect_acc }: { uid: string; connect_acc: string } =
    await req.json();

  if (!uid) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const appFeesDoc = doc(firestore, "app_fees", "app_fees");
    const userFeesColl = collection(firestore, "app_fees", "app_fees", "users");
    const appFees = (await getDoc(appFeesDoc)).data();
    const data = appFees?.fees;
    await addDoc(userFeesColl, {
      data,
      uid: uid,
      connect_acc: connect_acc,
    });

    return NextResponse.json("New payment method added.", {
      status: 201,
      statusText: "Created",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
