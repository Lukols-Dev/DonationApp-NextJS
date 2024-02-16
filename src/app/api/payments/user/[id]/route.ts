import { firestore } from "@/lib/firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
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
  //TODO:POPRAWIC NAZWE Kolekcji
  try {
    const docRef = doc(firestore, "paymet", `${id}`);
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

export const PUT = async (req: Request, { params }: { params: IParams }) => {
  const dataToUpdate = await req.json();
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const docRef = doc(firestore, "paymet", `${id}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json("Document does not exist", {
        status: 404,
      });
    }

    if (dataToUpdate.paymentMethods) {
      if (dataToUpdate.isActive) {
        await updateDoc(docRef, {
          payment_methods: arrayUnion(dataToUpdate.paymentMethods),
        });
      } else {
        await updateDoc(docRef, {
          payment_methods: arrayRemove(dataToUpdate.paymentMethods),
        });
      }
    } else {
      await updateDoc(docRef, dataToUpdate);
    }
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
