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
} from "firebase/firestore";
import { NextResponse } from "next/server";

//GET ALL MESSAGES
export const GET = async (req: Request) => {
  try {
    const messagesColl = collection(
      firestore,
      "users",
      "hXOYYt9NQGw8aW4G2kUR",
      "messages"
    );
    const messagesDocs = await getDocs(messagesColl);

    const messages = messagesDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const count = messages.length;

    return NextResponse.json(
      { messages: messages, count: count },
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
