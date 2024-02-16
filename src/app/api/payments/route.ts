import { firestore } from "@/lib/firebase";
import { camelToSnake } from "@/lib/utils";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

//GET ALL Payments Method
export const GET = async (req: Request) => {
  try {
    const paymentsColl = collection(
      firestore,
      "users",
      "hXOYYt9NQGw8aW4G2kUR",
      "payment"
    );
    const paymentDocs = await getDocs(paymentsColl);

    const payments = paymentDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const count = payments.length;

    return NextResponse.json(
      { payments: payments, count: count },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

//POST: Create New Payments Method if missing
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid || !data || !data.name) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const paymentsColl = collection(firestore, "users", uid, "payment");
    const existingPaymentQuery = query(
      paymentsColl,
      where("name", "==", data.name)
    );
    const existingPayments = await getDocs(existingPaymentQuery);

    if (!existingPayments.empty) {
      const paymentDoc = existingPayments.docs[0];
      await updateDoc(
        doc(firestore, "users", uid, "payment", paymentDoc.id),
        camelToSnake(data)
      );

      return NextResponse.json("Payment method updated.", {
        status: 200,
        statusText: "OK",
      });
    } else {
      await addDoc(paymentsColl, camelToSnake(data));

      return NextResponse.json("New payment method added.", {
        status: 201,
        statusText: "Created",
      });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
