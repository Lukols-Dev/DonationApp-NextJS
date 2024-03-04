import { firestore } from "@/lib/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

//Add new payout
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid || !data.methods || data.methods.length === 0) {
    return NextResponse.json("Missing or invalid data", { status: 400 });
  }

  try {
    const payoutsRef = collection(firestore, "payouts");
    await addDoc(payoutsRef, {
      ...data,
      uid: uid,
      create_at: Timestamp.fromDate(new Date()),
    });

    for (const method of data.methods) {
      const paymentsColl = collection(firestore, "users", uid, "payment");
      const existingPaymentQuery = query(
        paymentsColl,
        where("name", "in", data.methods)
      );
      const existingPayments = await getDocs(existingPaymentQuery);

      existingPayments.forEach(async (paymentDoc) => {
        await updateDoc(
          doc(firestore, "users", uid, "payment", paymentDoc.id),
          {
            payout: 0,
          }
        );
      });
    }

    return NextResponse.json(
      { message: "Payout and payment updates added successfully." },
      { status: 200, statusText: "OK" }
    );
  } catch (err) {
    console.error("Error adding payout or updating payments: ", err);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
};
