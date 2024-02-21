import { doc, updateDoc } from "firebase/firestore";
import { stripe } from ".";
import { firestore } from "../firebase";

export const createPaymentIntent = async (method: string) => {
  try {
    const intent = await stripe.paymentIntents.create({
      metadata: {
        // store: store,
      },
      amount: 2000,
      currency: "pln",
      description: "payment intent",
      payment_method_types: [method],
    });
    return { clientSecret: intent.client_secret };
  } catch (error) {
    console.error("Error creating payment intent: ", error);
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
