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
//GET all doc from queue
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const notificationsColl = collection(firestore, "users", id, "queue");
    const notificationsDocs = await getDocs(notificationsColl);

    const notifications = notificationsDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const count = notifications.length;

    return NextResponse.json(
      { notifications: notifications, count: count },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

// Add new doc to queue
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

//Delete all docs from queue
export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("User ID is required", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    const notificationsColl = collection(firestore, "users", id, "queue");
    const notificationsDocs = await getDocs(notificationsColl);

    const batch = writeBatch(firestore);

    notificationsDocs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // Commit the batch
    await batch.commit();

    return NextResponse.json("All notifications deleted.", {
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
