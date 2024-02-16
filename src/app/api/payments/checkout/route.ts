import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

//GET Checkout Id
export const GET = async (req: Request) => {
  try {
    const checkoutDoc = doc(
      firestore,
      "users",
      "hXOYYt9NQGw8aW4G2kUR",
      "checkout",
      "checkout"
    );
    const res = await getDoc(checkoutDoc);
    if (res.exists()) {
      const data = res.data();

      return NextResponse.json(data.pid, {
        status: 200,
        statusText: "OK",
      });
    } else {
      return NextResponse.json("Not Found", {
        status: 404,
        statusText: "Not Found",
      });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
