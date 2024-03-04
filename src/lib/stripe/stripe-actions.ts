import { doc, updateDoc } from "firebase/firestore";
import { stripe } from ".";
import { firestore } from "../firebase";

export const createPaymentIntent = async (
  method: string,
  account: string,
  amount: number,
  appFee: number
) => {
  try {
    if (!method || !amount || !appFee) return null;
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "pln",
      description: `Wspardzie na dalszy rozwój działalności.`,
      payment_method_types: [method],
      application_fee_amount: Math.round(appFee * 100),
      metadata: {
        account: account,
      },
      transfer_data: {
        destination: account,
      },
    });

    return { secret: intent.client_secret, intent: intent.id };
  } catch (error) {
    console.error("Error creating payment intent: ", error);
    return null;
  }
};

export const createCheckout = async (
  method: string,
  account: string,
  amount: number,
  uid: string,
  pid: string,
  url: string
) => {
  try {
    if (!method || !amount || !account || !uid || !pid || !url) return null;

    return (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/payments/stripe/checkout`,
        {
          method: "POST",
          body: JSON.stringify({
            data: {
              amount: amount,
              method: method,
              account: account,
              uid: uid,
              pid: pid,
              url: url,
            },
          }),
        }
      )
    ).json();
  } catch (error) {
    console.error("Error creating payment intent: ", error);
    return null;
  }
};

export const updatePaymentIntent = async (
  intent: string,
  amount: number,
  method: string,
  appFee: number
) => {
  try {
    const paymentIntent = await stripe.paymentIntents.update(intent, {
      amount: Math.round(amount * 100),
      application_fee_amount: Math.round(appFee * 100),
      payment_method_types: [method],
    });

    return paymentIntent;
  } catch (err) {
    console.error("Error updating payment intent: ", err);
    return null;
  }
};

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

export const updateAccPaymentMeth = async () => {
  // const account = await stripe.accounts.update("acct_1OmKklFafy5qD2Ia", {
  //   capabilities: {
  //     blik_payments: { requested: false },
  //   },
  // });
  const capabilities = await stripe.accounts.listCapabilities(
    "acct_1OmKklFafy5qD2Ia"
  );
};

export const createPayout = async (
  amount: number,
  account: string
  // bankAccountId: string
) => {
  try {
    // const balance = await stripe.balance.retrieve({ stripeAccount: account });
    // console.log("balance: ", balance);

    const payout = await stripe.payouts.create(
      {
        amount: 500,
        currency: "PLN",
        // destination: bankAccountId,
      },
      {
        stripeAccount: account,
      }
    );

    return payout;
  } catch (err) {
    console.log(`Payout failed: `, err);
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
