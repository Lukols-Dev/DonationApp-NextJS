import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

export const getStripe = (connectedAccountId?: string) => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51OG5rjFSmbAcuqgT6CrMA7i1IJNIAPLWRDuFEmqFyxDFADBzDBqh7VJLX4otVjDiZtACEw9MePNBYtINgGlTz89700vAtnccSc" ??
        ""
      // { stripeAccount: connectedAccountId }
    );
  }
  return stripePromise;
};
