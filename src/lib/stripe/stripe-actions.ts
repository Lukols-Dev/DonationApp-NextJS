import { stripe } from ".";

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
