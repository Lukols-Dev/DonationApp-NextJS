import { firestore } from "@/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { NextResponse } from "next/server";

// Retrieve payouts
export const GET = async (req: Request) => {
  try {
    const payoutsRef = collection(firestore, "payouts");
    const q = query(payoutsRef, orderBy("create_at", "desc"));
    const querySnapshot = await getDocs(q);

    const payouts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const response = {
      count: payouts.length,
      data: payouts,
    };

    return NextResponse.json(response, { status: 200, statusText: "OK" });
  } catch (err) {
    console.error("Error retrieving payouts: ", err);
    return NextResponse.json(
      { error: "Error retrieving payouts" },
      { status: 500, statusText: "Internal Server Error" }
    );
  }
};
