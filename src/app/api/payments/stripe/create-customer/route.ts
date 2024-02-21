import { stripe } from "@/lib/stripe";
import { StripeCustomerType } from "@/types";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { address, email, name }: StripeCustomerType = await req.json();

  if (!email || !address || !name)
    return new NextResponse("Missing data", {
      status: 400,
    });
  try {
    const customer = await stripe.customers.create({
      email,
      name,
      address,
    });

    return Response.json({ customerId: customer.id });
  } catch (error) {
    console.log("🔴 Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
