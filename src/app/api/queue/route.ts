import { firestore } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  writeBatch,
} from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//Delete one element from queue by qid
export const POST = async (req: Request, { params }: { params: IParams }) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid || data.qid) {
    return NextResponse.json("Missing data", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    const queueItemRef = doc(firestore, "users", uid, "queue", data.qid);

    await deleteDoc(queueItemRef);

    return NextResponse.json("Element from queue deleted.", {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
