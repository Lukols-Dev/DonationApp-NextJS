import { doc, updateDoc } from "firebase/firestore";
import { stripe } from ".";
import { firestore } from "../firebase";

export const createPaymentIntent = async (method: string, account: string) => {
  try {
    const intent = await stripe.paymentIntents.create(
      {
        metadata: {
          account: account,
        },
        amount: 5000,
        currency: "pln",
        description: `Wspardzie na dalszy rozwój działalności.`,
        payment_method_types: [method],
      },
      { stripeAccount: account }
    );
    return { secret: intent.client_secret, intent: intent.id };
  } catch (error) {
    console.error("Error creating payment intent: ", error);
    return null;
  }
};

export const updatePaymentIntent = async (
  intent: string,
  amount: number,
  account: string
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.update(
      intent,
      {
        amount: amount * 100,
      },
      { stripeAccount: account }
    );

    return paymentIntent;
  } catch (err) {
    console.error("Error updating payment intent: ", err);
    return null;
  }
};

// export function getStripeOAuthLink(
//   accountType: "individual" | "company",
//   state: string
// ) {
//   return `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
//     process.env.NEXT_PUBLIC_STRIPE_CLIEND_ID
//   }&scope=read_write&redirect_uri=${
//     process.env.NEXT_PUBLIC_URL
//   }/${"user/wallet"}&state=${state}`;
// }

export const getStripeOAuthLink = async (userData: any) => {
  if (!userData) return;
  try {
    const accCreate = await stripe.accounts.create({
      type: "custom",
      email: userData.email,
      capabilities: {
        card_payments: {
          requested: true,
        },
        transfers: {
          requested: true,
        },
      },
    });

    const accLink = await stripe.accountLinks.create({
      account: accCreate.id,
      refresh_url: "http://localhost:3000/user/monetisation",
      return_url: "http://localhost:3000/user/monetisation",
      type: "account_onboarding",
    });

    const docRef = doc(firestore, "users", userData.uid);
    await updateDoc(docRef, {
      connect_acc: accCreate.id,
      is_stripe_connect: true,
      stripe_connect_veryfication: false,
    });

    return accLink.url;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// export const createCustomer = async (customerData)
