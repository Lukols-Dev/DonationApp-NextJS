import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
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
