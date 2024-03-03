import getCurrentUser, { getSession } from "@/lib/auth-actions";
import { firestore } from "@/lib/firebase";
import { QueueService, UserService } from "@/lib/firebase/firebase-actions";
import { stripe } from "@/lib/stripe";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeWebhookEvents = new Set([
  "account.updated",
  "person.created",
  "charge.succeeded",
  "checkout.session.completed",
  "payment_intent.succeeded",
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
  console.log("stripeEvent webhook: ", stripeEvent.type);

  try {
    if (stripeWebhookEvents.has(stripeEvent.type)) {
      switch (stripeEvent.type) {
        // case "account.updated": {
        //   const accountUpdatedData = stripeEvent.data.object as Stripe.Account;
        //   const userColl = collection(firestore, "users");
        //   const existingQuery = query(
        //     userColl,
        //     where("connect_acc", "==", accountUpdatedData.id)
        //   );
        //   const existingUser = await getDocs(existingQuery);

        //   const paymentDoc = existingUser.docs[0];
        //   await updateDoc(doc(firestore, "users", paymentDoc.id), {
        //     account_type: accountUpdatedData.business_type,
        //     charges_enabled: !!accountUpdatedData.charges_enabled,
        //     payouts_enabled: !!accountUpdatedData.payouts_enabled,
        //     details_enabled: !!accountUpdatedData.details_submitted,
        //   });
        //   break;
        // }
        // case "person.created": {
        //   const createdPersonData = stripeEvent.data.object as Stripe.Person;
        //   const userColl = collection(firestore, "users");
        //   const existingQuery = query(
        //     userColl,
        //     where("connect_acc", "==", createdPersonData.account)
        //   );
        //   const existingUser = await getDocs(existingQuery);

        //   const paymentDoc = existingUser.docs[0];
        //   await updateDoc(doc(firestore, "users", paymentDoc.id), {
        //     person_id: createdPersonData.id,
        //   });
        //   break;
        // }

        // case "account.external_account.created": {
        //   const createdBankData = stripeEvent.data
        //     .object as Stripe.ExternalAccount;
        //   const userColl = collection(firestore, "users");
        //   const existingQuery = query(
        //     userColl,
        //     where("connect_acc", "==", createdBankData.account)
        //   );
        //   const existingUser = await getDocs(existingQuery);

        //   const paymentDoc = existingUser.docs[0];
        //   await updateDoc(doc(firestore, "users", paymentDoc.id), {
        //     bank_id: createdBankData.id,
        //   });
        //   break;
        // }

        case "payment_intent.succeeded": {
          const dataPaymentIntentSucceeded = stripeEvent.data
            .object as Stripe.PaymentIntent;
          console.log(
            "dataPaymentIntentSucceeded: ",
            dataPaymentIntentSucceeded
          );
          //   const userColl = collection(firestore, "users");
          //   const existingQuery = query(
          //     userColl,
          //     where("pid", "==", dataPaymentIntentSucceeded.metadata.pid)
          //   );
          //   const existingUser = await getDocs(existingQuery);
          //   const userDoc = existingUser.docs[0];
          //   const messagecColl = collection(
          //     firestore,
          //     "users",
          //     userDoc.id,
          //     "messages"
          //   );
          //   const existingQueryMes = query(
          //     messagecColl,
          //     where("url", "==", dataPaymentIntentSucceeded.metadata.url)
          //   );
          //   const existingMes = await getDocs(existingQueryMes);
          //   const messDoc = existingMes.docs[0];
          //   await updateDoc(
          //     doc(firestore, "users", userDoc.id, "messages", messDoc.id),
          //     {
          //       payment_status: dataPaymentIntentSucceeded.status,
          //     }
          //   );
          //   await QueueService.addToQueue(userDoc.id, {
          //     mid: messDoc.id,
          //     nick: messDoc.get("nick"),
          //     description: messDoc.get("description"),
          //     amount: messDoc.get("amount"),
          //     amount_after_fees: messDoc.get("amount_after_fees"),
          //     currency: messDoc.get("currency"),
          // });
          break;
        }
        case "checkout.session.completed": {
          const dataPaymentIntentSucceeded = stripeEvent.data.object as any;
          console.log(
            "dataPaymentIntentSucceeded: ",
            dataPaymentIntentSucceeded
          );
          const userColl = collection(firestore, "users");
          const existingQuery = query(
            userColl,
            where("pid", "==", dataPaymentIntentSucceeded.metadata.pid)
          );
          const existingUser = await getDocs(existingQuery);
          const userDoc = existingUser.docs[0];
          const messagecColl = collection(
            firestore,
            "users",
            userDoc.id,
            "messages"
          );
          const existingQueryMes = query(
            messagecColl,
            where("url", "==", dataPaymentIntentSucceeded.metadata.url)
          );
          const existingMes = await getDocs(existingQueryMes);
          const messDoc = existingMes.docs[0];
          await updateDoc(
            doc(firestore, "users", userDoc.id, "messages", messDoc.id),
            {
              payment_status: dataPaymentIntentSucceeded.status,
            }
          );
          await QueueService.addToQueue(userDoc.id, {
            mid: messDoc.id,
            nick: messDoc.get("nick"),
            description: messDoc.get("description"),
            amount: messDoc.get("amount"),
            amount_after_fees: messDoc.get("amount_after_fees"),
            currency: messDoc.get("currency"),
          });

          break;
        }

        //   break;
        // }

        // case "charge.succeeded": {
        //   const dataChargeSucceded = stripeEvent.data.object as Stripe.Charge;
        //   const userColl = collection(firestore, "users");
        //   const existingQuery = query(
        //     userColl,
        //     where("connect_acc", "==", dataChargeSucceded.metadata.account)
        //   );
        //   const existingUser = await getDocs(existingQuery);
        //   const userDoc = existingUser.docs[0];
        //   const messagecColl = collection(
        //     firestore,
        //     "users",
        //     userDoc.id,
        //     "messages"
        //   );
        //   const existingQueryMes = query(
        //     messagecColl,
        //     where("payment_intent", "==", dataChargeSucceded.payment_intent)
        //   );
        //   const existingMes = await getDocs(existingQueryMes);
        //   const messDoc = existingMes.docs[0];
        //   await updateDoc(
        //     doc(firestore, "users", userDoc.id, "messages", messDoc.id),
        //     {
        //       charge_id: dataChargeSucceded.id,
        //       charge_paid: dataChargeSucceded.paid,
        //       recipt_url: dataChargeSucceded.receipt_url,
        //     }
        //   );
        //   break;
        // }

        default:
          console.log("👉🏻 Unhandled relevant event!", stripeEvent.type);
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
