import { firestore } from "@/lib/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}
//GET all doc from gifs
export const GET = async (req: Request, { params }: { params: IParams }) => {
  try {
    const gifsColl = collection(firestore, "gifs");
    const gifsDocs = await getDocs(gifsColl);

    const gifs = gifsDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const count = gifs.length;

    return NextResponse.json(
      { data: gifs, count: count },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

// Add new doc to gifs
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid || !data) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const collRef = collection(firestore, "users", uid, "queue");

    const queueData = {
      create_at: data.create_at || Timestamp.fromDate(new Date()),
      mid: data.mid,
      nick: data.nick,
      description: data.description,
      amount: data.amount,
      amount_after_fees: data.amount_after_fees,
      currency: data.currency,
    };

    const doc = await addDoc(collRef, queueData);
    await updateDoc(doc, { id: doc.id });

    return NextResponse.json("Add message to queue.", {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
