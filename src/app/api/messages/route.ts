import { firestore } from "@/lib/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

//GET ALL MESSAGES
export const GET = async (req: Request) => {
  try {
    const messagesColl = collection(
      firestore,
      "users",
      "hXOYYt9NQGw8aW4G2kUR",
      "messages"
    );
    const messagesDocs = await getDocs(messagesColl);

    const messages = messagesDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const count = messages.length;

    return NextResponse.json(
      { messages: messages, count: count },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

// Add new message
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid || !data) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const docRef = doc(firestore, "users", uid, "messages", "messages");
    // const collRef = collection(docRef,"messages")
    await setDoc(docRef, data);

    return NextResponse.json("Message was sent.", {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
