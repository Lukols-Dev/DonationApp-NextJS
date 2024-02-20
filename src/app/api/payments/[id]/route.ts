import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//GET ALL Payments Method
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const paymentsColl = collection(firestore, "users", id, "payment");
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
