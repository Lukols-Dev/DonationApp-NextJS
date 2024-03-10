import { firestore } from "@/lib/firebase";
import paypal from "@paypal/payouts-sdk";
import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

const environment = new paypal.core.SandboxEnvironment(
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET!
);
const client = new paypal.core.PayPalHttpClient(environment);

// Send paypal money to client acc
export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();
  if (!uid && !data.amount && !data.email) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const senderBatchId = Math.random().toString(36).substring(9);
    const request = new paypal.payouts.PayoutsPostRequest();
    request.requestBody({
      sender_batch_header: {
        sender_batch_id: senderBatchId,
        email_subject: "Otrzymałeś płatność!",
      },
      items: [
        {
          recipient_type: "EMAIL",
          amount: {
            value: data.amount,
            currency: "PLN",
          },
          receiver: data.email,
          note: "Wypłata środków z Tipey",
          sender_item_id: "item_1",
        },
      ],
    });

    const response = await client.execute(request);

    if (response.statusCode !== 201) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Some Error Occured at backend",
      });
    }
    const paymentsColl = collection(firestore, "users", uid, "payment");
    const existingPaymentQuery = query(
      paymentsColl,
      where("name", "==", "paypal")
    );
    const existingPayments = await getDocs(existingPaymentQuery);
    if (!existingPayments.empty) {
      const paymentDoc = existingPayments.docs[0];
      await updateDoc(doc(firestore, "users", uid, "payment", paymentDoc.id), {
        payout: increment(-data.amount),
      });
    } else {
      return NextResponse.json({
        status: 404,
        statusText: "Not Found payment doc",
      });
    }
    return NextResponse.json(response, {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
