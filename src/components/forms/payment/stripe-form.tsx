import { createCheckout } from "@/lib/stripe/stripe-actions";
import { Send } from "lucide-react";

interface Props {
  method: string;
  amount: number;
  account: string;
  onSumbit: () => void;
}

const StripeForm = ({ method, amount, account, onSumbit }: Props) => {
  const handleSubmit = async () => {
    try {
      const url = await createCheckout(method, account, amount);
      console.log("url: ", url);
    } catch (err) {
      console.log("ERR: ", err);
    }
  };
  return (
    <div className="flex flex-col gap-9">
      <button
        onClick={handleSubmit}
        className="w-full sm:w-[160px] py-2 ml-auto mr-0 mt-auto mb-0 flex items-center justify-center gap-4 text-white bg-[#1814F3] rounded-md relative"
      >
        WYŚLIJ <Send className="w-6 h-6 absolute right-2" />
      </button>
    </div>
  );
};

export default StripeForm;
