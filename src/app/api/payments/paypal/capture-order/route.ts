import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();

  if (!uid && !data.orderID) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    //Capture order to complete payment
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCaptureRequest(data.orderID);

    request.requestBody({} as any);
    const response = await PaypalClient.execute(request);
    if (!response) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Some Error Occured at backend",
      });
    }
    // Your Custom Code to Update Order Status
    // And Other stuff that is related to that order, like wallet
    // Here I am updateing the wallet and sending it back to frontend to update it on frontend

    return NextResponse.json(response, {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
