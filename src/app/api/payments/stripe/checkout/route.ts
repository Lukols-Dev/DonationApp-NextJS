import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { data }: { data: any } = await req.json();

  if (
    !data ||
    !data.amount ||
    !data.method ||
    !data.account ||
    !data.uid ||
    !data.pid ||
    !data.url
  ) {
    return NextResponse.json("No products in cart", { status: 400 });
  }

  try {
    const line_items = [
      {
        price_data: {
          product_data: {
            name: "Donation",
            description: `Wspardzie na dalszy rozwój działalności.`,
          },
          currency: "pln",
          unit_amount: Math.round(data.amount * 100),
        },
        quantity: 1,
      },
    ];

    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: process.env.NEXT_PUBLIC_URL,
      cancel_url: process.env.NEXT_PUBLIC_URL,
      payment_method_types: [data.method],
      mode: "payment",
      billing_address_collection: "auto",
      line_items: line_items,
      metadata: {
        account: data.account,
        pid: data.pid,
        uid: data.uid,
        url: data.url,
      },
    });

    return NextResponse.json(checkoutSession.url, { status: 200 });
  } catch (err) {
    return NextResponse.json(err, { status: 400 });
  }
};
