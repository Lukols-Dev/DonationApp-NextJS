import paypal from "@paypal/payouts-sdk";
import { NextResponse } from "next/server";

const environment = new paypal.core.SandboxEnvironment(
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_SECRET!
);
const client = new paypal.core.PayPalHttpClient(environment);

// Add Paypal order
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
          note: "Prowizja za usługę",
          sender_item_id: "item_1",
        },
      ],
    });

    const response = await client.execute(request);
    console.log("response payouts: ", response);
    if (response.statusCode !== 201) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Some Error Occured at backend",
      });
    }

    // Your Custom Code for doing something with order
    // Usually Store an order in the database like MongoDB
    return NextResponse.json(response, {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
