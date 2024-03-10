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
      ...{ create_at: Timestamp.fromDate(new Date()) },
    };

    const existingPaymentQuery = query(
      paymentsColl,
      where("name", "==", data.payment_method)
    );

    const existingPayments = await getDocs(existingPaymentQuery);
    if (!existingPayments.empty) {
      const paymentDoc = existingPayments.docs[0];
      const messageRes = await addDoc(collRef, messageData);

      const messageId = messageRes.id;
      await updateDoc(doc(firestore, "users", uid, "messages", messageId), {
        mid: messageId,
      });

      await updateDoc(doc(firestore, "users", uid, "payment", paymentDoc.id), {
        used: increment(1),
        current_amount: increment(data.amount),
        payout: increment(data.amount),
      });

      return NextResponse.json(
        { id: messageRes.id, message: "Message was sent." },
        {
          status: 200,
          statusText: "OK",
        }
      );
    } else {
      return NextResponse.json("Missing payment method", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
