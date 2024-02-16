import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
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
