import { firestore } from "@/lib/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

// Add new notification
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const collRef = collection(firestore, "users", uid, "notifications");

    const notificationData = {
      ...data,
      description: "Nowa wpłata",
      create_at: Timestamp.fromDate(new Date()),
    };

    await addDoc(collRef, notificationData);

    return NextResponse.json("Notification was sent.", {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
