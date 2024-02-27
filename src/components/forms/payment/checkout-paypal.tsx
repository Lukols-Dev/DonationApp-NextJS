"use client";
import { PaypalPayment } from "@/lib/paypal/paypal-actions";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

interface Props {
  uid: string;
  amount: number;
  appFee: number;
  onSumbit: () => void;
}

const PaypalCheckout = ({ uid, amount, appFee, onSumbit }: Props) => {
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
            label: "donate",
            height: 50,
          }}
          createOrder={async (data, actions) => {
            let order_id = await PaypalPayment.paypalCreateOrder(uid, {
              amount: amount,
              appFee: appFee,
            });
            return order_id + "";
          }}
          onApprove={async (data, actions) => {
            console.log("data: ", data);
            let response = await PaypalPayment.paypalCaptureOrder(uid, {
              orderID: data.orderID,
            });
            if (response) {
              onSumbit();
            }
            // if (response) return true;
            console.log("response: ", response);
            return response;
          }}
        />
      </PayPalScriptProvider>

      <button type="submit"></button>
    </form>
  );
};

export default PaypalCheckout;
