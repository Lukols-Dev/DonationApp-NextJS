import { firestore } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//GET App fees
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const appFeesDoc = doc(firestore, "app_fees", "app_fees");
    const appFees = (await getDoc(appFeesDoc)).data();

    return NextResponse.json(appFees, {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

//Update App fees data
export const PUT = async (req: Request, { params }: { params: IParams }) => {
  const { data }: { data: any } = await req.json();
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const docRef = doc(firestore, "app_fees", "app_fees");
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json("Document does not exist", {
        status: 404,
      });
    }

    await setDoc(docRef, data, { merge: true });

    return NextResponse.json(
      { message: "Document updated successfully" },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error("Error updating document: ", err);
    return NextResponse.json(
      { error: "Error updating document" },
      { status: 500 }
    );
  }
};
