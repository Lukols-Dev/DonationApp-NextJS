import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Send } from "lucide-react";

interface Props {
  loadingForm: boolean;
  onSumbit: () => void;
}

const StripeCheckoutForm = ({ loadingForm, onSumbit }: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    try {
      await onSumbit();

      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `https://donation-app-next-js.vercel.app`,
        },
      });

      if (error) {
        console.log("Payment Error: ", error);
      }
    } catch (err) {
      console.log("ERR: ", err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-9">
      {loadingForm ? (
        <div className="h-[100px] w-full"></div>
      ) : (
        <div className="min-h-[100px] w-full">
          <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        </div>
      )}
      <button
        type="submit"
        className="w-full sm:w-[160px] py-2 ml-auto mr-0 mt-auto mb-0 flex items-center justify-center gap-4 text-white bg-[#1814F3] rounded-md relative"
      >
        WYŚLIJ <Send className="w-6 h-6 absolute right-2" />
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
