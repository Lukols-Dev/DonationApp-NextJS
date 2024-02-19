import { firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export const GET = async (
  request: Request,
  { params }: { params: IParams }
) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }
  try {
    const docRef = doc(firestore, "user", `${id}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json("Document no exist", {
        status: 400,
      });
    }

    return NextResponse.json(docSnap.data(), {
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
};
