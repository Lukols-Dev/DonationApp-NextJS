import { firestore } from "@/lib/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
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
  try {
    const docRef = doc(firestore, "users", `${id}`);
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
    const docRef = doc(firestore, "users", `${id}`);
    // const docSnap = await getDoc(docRef);

    // if (!docSnap.exists()) {
    //   return NextResponse.json("Document does not exist", {
    //     status: 404,
    //   });
    // }

    const updates = Object.keys(dataToUpdate).reduce((acc: any, key) => {
      if (key === "socials" && dataToUpdate[key]) {
        Object.keys(dataToUpdate[key]).forEach((socialKey) => {
          acc[`socials.${socialKey}`] = dataToUpdate[key][socialKey];
        });
      } else {
        acc[key] = dataToUpdate[key];
      }
      return acc;
    }, {});

    await updateDoc(docRef, updates);
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

//Delete user data
export const POST = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const userDocRef = doc(firestore, "users", id);
    const subcollections = [
      "messages",
      "payments",
      "checkout",
      "controller",
      "notifications",
      "payment",
      "widgets",
    ];

    for (const subcollection of subcollections) {
      const subcollectionRef = collection(userDocRef, subcollection);
      const subcollectionSnapshot = await getDocs(subcollectionRef);

      for (const doc of subcollectionSnapshot.docs) {
        await deleteDoc(doc.ref);
      }
    }

    const paymentsRef = collection(firestore, "payments");
    const paymentsQuery = query(paymentsRef, where("uid", "==", id));
    const paymentsSnapshot = await getDocs(paymentsQuery);

    for (const paymentDoc of paymentsSnapshot.docs) {
      await deleteDoc(paymentDoc.ref);
    }

    const accountsRef = collection(firestore, "accounts");
    const accountsQuery = query(accountsRef, where("userId", "==", id));
    const accountsSnapshot = await getDocs(accountsQuery);

    for (const accountDoc of accountsSnapshot.docs) {
      await deleteDoc(accountDoc.ref);
    }

    const feesRef = collection(firestore, "app_fees", "app_fees", "users");
    const feesQuery = query(feesRef, where("uid", "==", id));
    const querySnapshot = await getDocs(feesQuery);

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    await deleteDoc(userDocRef);

    return NextResponse.json(
      { message: "User and all related data deleted successfully" },
      {
        status: 200,
        statusText: "OK",
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
