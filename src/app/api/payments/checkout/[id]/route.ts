import { firestore } from "@/lib/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//GET Checkout Id
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const checkoutDoc = doc(firestore, "users", id, "checkout", "checkout");
    const res = await getDoc(checkoutDoc);
    if (res.exists()) {
      const data = res.data();

      return NextResponse.json(data.pid, {
        status: 200,
        statusText: "OK",
      });
    } else {
      return NextResponse.json(null, {
        status: 404,
        statusText: "Not Found",
      });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

// Add new message
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();
  if (!uid) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const checkoutRef = doc(firestore, "users", uid, "checkout", "checkout");
    const paymentPageRef = collection(firestore, "payments");
    const userDoc = doc(firestore, "users", uid);

    const respPaymentPageDoc = await addDoc(paymentPageRef, {
      create_at: Timestamp.fromDate(new Date()),
      id: "",
      description:
        "Witaj ma mojej stronie płatności! Doceniam twoje wsparcie. Dziękuję!",
      uid: uid,
      payment_methods: [],
      nick: data.nick || "",
      profile_img: data.picture || "",
      socials: {
        twitch: "",
        twitter: "",
        youtube: "",
      },
      connect_acc: data.connect_acc || "",
    });

    const dataPayment = {
      create_at: Timestamp.fromDate(new Date()),
      pid: respPaymentPageDoc.id,
    };

    await setDoc(checkoutRef, dataPayment);
    await updateDoc(userDoc, { pid: respPaymentPageDoc.id });

    return NextResponse.json("Payment page is created.", {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
