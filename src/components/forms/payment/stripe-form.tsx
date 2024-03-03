import { useToast } from "@/components/ui/use-toast";
import { createCheckout } from "@/lib/stripe/stripe-actions";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  method: string;
  amount: number;
  account: string;
  onSumbit: () => void;
}

const StripeForm = ({ method, amount, account, onSumbit }: Props) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleSubmit = async () => {
    if (!method || !amount || amount === 0) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Spradź czy wprowadziłeś kwotę i wybrałeś metodę płatności.",
      });

      return;
    }

    try {
      await onSumbit();
      const url = await createCheckout(method, account, amount);
      router.push(url);
    } catch (err) {
      console.log("ERR: ", err);
    }
  };
  return (
    <div className="flex flex-col gap-9">
      <button
        onClick={handleSubmit}
        className="w-full py-2 ml-auto mr-0 mt-auto mb-0 flex items-center justify-center gap-4 text-white bg-[#1814F3] rounded-md relative"
      >
        WYŚLIJ <Send className="w-6 h-6 absolute right-2" />
      </button>
    </div>
  );
};

export default StripeForm;
