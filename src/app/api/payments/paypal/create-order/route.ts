import client from "@/lib/paypal";
import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { uid, data }: { uid: string; data: any } = await req.json();
  if (!uid && !data.amount && !data.appFee) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers["Prefer"] = "return=representation";
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          // payment_instruction:{
          //   platform_fees: [
          //     {
          //       amount:{
          //         currency_code:"PLN",
          //         value:`${data.appFee}`
          //       },
          //       payee:{
          //         email_address:"",
          //         merchant_id:""
          //       }
          //     }
          //   ],
          //   disbursement_mode:"INSTANT",
          //   payee_pricing_tier_id:""
          // },
          amount: {
            currency_code: "PLN",
            value: `${data.amount}` + "",
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);

    if (response.statusCode !== 201) {
      return NextResponse.json({
        status: 500,
        success: false,
        message: "Some Error Occured at backend",
      });
    }

    // Your Custom Code for doing something with order
    // Usually Store an order in the database like MongoDB
    return NextResponse.json(response.result.id, {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
