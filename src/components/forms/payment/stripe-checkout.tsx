import { updatePaymentIntent } from "@/lib/stripe/stripe-actions";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Send } from "lucide-react";

interface Props {
  loadingForm: boolean;
  intent?: string;
  amount: number;
  account: string;
  onSumbit: () => void;
}

const StripeCheckoutForm = ({
  loadingForm,
  intent,
  amount,
  account,
  onSumbit,
}: Props) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!stripe || !elements || !intent) {
      return;
    }
    await onSumbit();
    await updatePaymentIntent(intent, amount, account);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: process.env.NEXT_PUBLIC_URL!,
      },
    });

    console.log("error: ", error);
  };
  return (
    <form onClick={handleSubmit} className="flex flex-col gap-9">
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
