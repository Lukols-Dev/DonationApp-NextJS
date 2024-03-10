"use client";
import { QueueService } from "@/lib/firebase/firebase-actions";
import { PaypalPayment } from "@/lib/paypal/paypal-actions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  uid: string;
  amount: number;
  appFee: number;
  isblock?: boolean;
  onSumbit: () => void;
}

const PaypalCheckout = ({ uid, amount, appFee, isblock, onSumbit }: Props) => {
  return (
    <form className="w-full h-[100px] rounded-md">
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          currency: "PLN",
          intent: "capture",
        }}
      >
        <PayPalButtons
          fundingSource={"paypal"}
          style={{
            color: "white",
            shape: "rect",
            label: "paypal",
            height: 50,
          }}
          createOrder={async (data, actions) => {
            if (isblock) return "";

            let order_id = await PaypalPayment.paypalCreateOrder(uid, {
              amount: amount,
              appFee: appFee,
            });
            return order_id + "";
          }}
          onApprove={async (data, actions) => {
            let response = await PaypalPayment.paypalCaptureOrder(uid, {
              orderID: data.orderID,
            });
            if (response) {
              await onSumbit();
            }
            return response;
          }}
        />
      </PayPalScriptProvider>

      <button type="submit"></button>
    </form>
  );
};

export default PaypalCheckout;
