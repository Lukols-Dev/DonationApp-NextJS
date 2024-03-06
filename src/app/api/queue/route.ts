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
  writeBatch,
} from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//Delete one element from queue by qid
export const POST = async (req: Request, { params }: { params: IParams }) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid || !data || !data.qid || !data.mid) {
    return NextResponse.json("Missing data", {
      status: 400,
      statusText: "Bad Request",
    });
  }

  try {
    // const queueItemRef = doc(firestore, "users", uid, "queue", data.qid);

    // await deleteDoc(queueItemRef);
    // await updateDoc(doc(firestore, "users", uid, "messages", data.mid), {
    //   status: ["displayed"],
    // });

    if (data.qid === "skip") {
      const queueCollectionRef = collection(firestore, "users", uid, "queue");
      const q = query(queueCollectionRef, where("mid", "==", data.mid));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await deleteDoc(docRef);
      } else {
        return NextResponse.json("Document not found for skip operation", {
          status: 404,
          statusText: "Not Found",
        });
      }
    } else if (data.qid !== "skip") {
      const queueItemRef = doc(firestore, "users", uid, "queue", data.qid);
      await deleteDoc(queueItemRef);
    }

    await updateDoc(doc(firestore, "users", uid, "messages", data.mid), {
      status: ["displayed"],
    });

    return NextResponse.json("Element from queue deleted.", {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
