import { createPaymentIntent } from "@/lib/stripe/stripe-actions";
import { useEffect, useState } from "react";

export const useCheckout = (method: string, account: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [clientSecret, setClientSecret] = useState<string | undefined>();
  const [intent, setIntent] = useState<string | undefined>();

  const createIntent = async () => {
    setLoading(true);
    try {
      const result = await createPaymentIntent(method, account);

      if (result && result.secret && result.intent) {
        setClientSecret(result.secret);
        setIntent(result.intent);
      } else {
        console.error(
          "Failed to receive clientSecret from createPaymentIntent"
        );
      }
    } catch (error) {
      console.error("Error in createIntent:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    createIntent();
  }, [method]);

  return { loading, clientSecret, intent };
};
