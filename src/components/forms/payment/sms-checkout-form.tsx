"use client";
import { CashbillService } from "@/lib/cashbill/cashbill-actions";
import { Send } from "lucide-react";

interface Props {
  uid: string;
  amount: number;
  appFee: number;
  isblock: boolean;
  onSumbit: () => void;
}

const SMSCheckout = ({ uid, amount, appFee, isblock, onSumbit }: Props) => {
  // const router = useRouter();

  const onClick = async () => {
    if (isblock) return;
    const finalAmount = (amount = appFee);
    try {
      const resp = await CashbillService.paysafecardPaymemnt(uid, {
        amount: finalAmount,
      });
      onSumbit();
      // router.push(resp)
    } catch (err) {
      console.log("Paysafecard err: ", err);
    }
  };

  return (
    <div className="w-full h-[100px] rounded-md">
      <button
        onClick={onClick}
        className="w-full py-2 ml-auto mr-0 mt-auto mb-0 flex items-center justify-center gap-4 text-white bg-[#1814F3] rounded-md relative"
      >
        WYŚLIJ <Send className="w-6 h-6 absolute right-2" />
      </button>
    </div>
  );
};

export default SMSCheckout;
