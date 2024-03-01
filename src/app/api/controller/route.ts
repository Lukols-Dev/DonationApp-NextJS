import { firestore } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Add or update controller
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid || !data) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const docRef = doc(firestore, "users", uid, "controller", "controller");

    await setDoc(docRef, { ...data }, { merge: true });

    return NextResponse.json("Document updated or created", {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 500, statusText: "Error" });
  }
};
