import { firestore } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//GET ALL Users
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const usersColl = collection(firestore, "users");
    const usersDocs = await getDocs(usersColl);

    const users = usersDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const count = users.length;

    return NextResponse.json(
      { data: users, count: count },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

//Update user data
export const PUT = async (req: Request, { params }: { params: IParams }) => {
  const { uid, data }: { uid: string; data: any } = await req.json();
  const { id } = params;

  if (!id || !uid) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const docRef = doc(firestore, "users", `${uid}`);
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
