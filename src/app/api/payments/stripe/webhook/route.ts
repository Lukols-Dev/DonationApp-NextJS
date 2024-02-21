import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeWebhookEvents = new Set([
  "account.updated",
  "product.created",
  "customer.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(req: NextRequest) {
  let stripeEvent: Stripe.Event;
  const body = await req.text();
  const sig = headers().get("Stripe-Signature");
  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET_LIVE ?? process.env.STRIPE_WEBHOOK_SECRET;
  try {
    if (!sig || !webhookSecret) {
      console.log(
        "🔴 Error Stripe webhook secret or the signature does not exist."
      );
      return;
    }
    stripeEvent = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error: any) {
    console.log(`🔴 Error ${error.message}`);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }
  console.log("stripeEvent: ", stripeEvent.type);
  //
  try {
    if (stripeWebhookEvents.has(stripeEvent.type)) {
      const subscription = stripeEvent.data.object as Stripe.Subscription;
      if (
        !subscription.metadata.connectAccountPayments &&
        !subscription.metadata.connectAccountSubscriptions
      ) {
        switch (stripeEvent.type) {
          case "customer.subscription.created":
          case "customer.subscription.updated": {
            if (subscription.status === "active") {
              // await subscriptionCreated(
              //   subscription,
              //   subscription.customer as string
              // )
              console.log("CREATED FROM WEBHOOK 💳", subscription);
            } else {
              console.log(
                "SKIPPED AT CREATED FROM WEBHOOK 💳 because subscription status is not active",
                subscription
              );
              break;
            }
          }
          case "customer.created":
            console.log("Konto zostało utworzone webhook info!!!!");
            break;

          case "account.updated":
            console.log("account.updated");
            // Then define and call a function to handle the event account.updated
            break;
          case "account.application.authorized":
            console.log("account.application.authorized");
            // Then define and call a function to handle the event account.application.authorized
            break;
          case "account.application.deauthorized":
            // Then define and call a function to handle the event account.application.deauthorized
            break;
          case "account.external_account.created":
            // Then define and call a function to handle the event account.external_account.created
            break;
          case "account.external_account.deleted":
            // Then define and call a function to handle the event account.external_account.deleted
            break;
          case "account.external_account.updated":
            // Then define and call a function to handle the event account.external_account.updated
            break;
          default:
            console.log("👉🏻 Unhandled relevant event!", stripeEvent.type);
        }
      } else {
        console.log(
          "SKIPPED FROM WEBHOOK 💳 because subscription was from a connected account not for the application",
          subscription
        );
      }
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("🔴 Webhook Error", { status: 400 });
  }
  return NextResponse.json(
    {
      webhookActionReceived: true,
    },
    {
      status: 200,
    }
  );
}
