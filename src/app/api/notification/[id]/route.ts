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
//GET ALL Notification
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const notificationsColl = collection(
      firestore,
      "users",
      id,
      "notifications"
    );
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

// Add new message
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid || !data) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const collRef = collection(firestore, "users", uid, "messages");
    const paymentsColl = collection(firestore, "users", uid, "payment");

    const messageData = {
      ...data,
      ...{ create_at: Timestamp.fromDate(new Date()), mid: collRef.id },
    };

    const existingPaymentQuery = query(
      paymentsColl,
      where("name", "==", data.payment_method)
    );

    const existingPayments = await getDocs(existingPaymentQuery);
    if (!existingPayments.empty) {
      const paymentDoc = existingPayments.docs[0];
      await addDoc(collRef, messageData);
      await updateDoc(doc(firestore, "users", uid, "payment", paymentDoc.id), {
        used: increment(1),
        current_amount: increment(data.amount),
      });

      return NextResponse.json("Message was sent.", {
        status: 200,
        statusText: "OK",
      });
    } else {
      return NextResponse.json("Missing payment method", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

export const DELETE = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("User ID is required", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    const notificationsColl = collection(
      firestore,
      "users",
      id,
      "notifications"
    );
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
