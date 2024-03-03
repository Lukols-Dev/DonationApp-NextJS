"use client";
import { CashbillService } from "@/lib/cashbill/cashbill-actions";
import { PaypalPayment } from "@/lib/paypal/paypal-actions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Send } from "lucide-react";
import { useRouter } from "next/router";

interface Props {
  uid: string;
  amount: number;
  appFee: number;
  onSumbit: () => void;
}

const PaysafecardCheckout = ({ uid, amount, appFee, onSumbit }: Props) => {
  // const router = useRouter();

  const onClick = async () => {
    const finalAmount = (amount = appFee);
    console.log("finalAmount: ", finalAmount);
    try {
      const resp = await CashbillService.paysafecardPaymemnt(uid, {
        amount: finalAmount,
      });
      console.log("resp: ", resp);
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
        className="w-full sm:w-[160px] py-2 ml-auto mr-0 mt-auto mb-0 flex items-center justify-center gap-4 text-white bg-[#1814F3] rounded-md relative"
      >
        WYŚLIJ <Send className="w-6 h-6 absolute right-2" />
      </button>
    </div>
  );
};

export default PaysafecardCheckout;
