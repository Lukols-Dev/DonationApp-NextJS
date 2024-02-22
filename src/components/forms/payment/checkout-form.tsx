"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCheckout } from "@/hooks/useCheckout";
import { MessagesService } from "@/lib/firebase/firebase-actions";
import { getStripe } from "@/lib/stripe/stripe-client";
import { Elements } from "@stripe/react-stripe-js";
import Image from "next/image";
import { useEffect, useState } from "react";
import StripeCheckoutForm from "./stripe-checkout";
import { calculateApplicationFeeAmount } from "@/lib/utils";
import { PaymentMethodFees } from "@/types";

interface Props {
  uid: string;
  connectAcc?: string;
  appFees: { app_fee: number; fees: PaymentMethodFees };
  paymentMethod: string[];
}

type MessageData = {
  nick: string;
  amount: number;
  currency: string;
  description: string;
  payment_method: string;
  payment_status: string;
  status: string[];
  summaryPrice: number;
  amount_fees: {
    amount_after_app_fee: number;
    amount_app_fee: number;
    amount_before_app_fee: number;
  };
  fees: {
    app: number;
    method: number;
  };
};

const CheckoutForm = ({ uid, paymentMethod, connectAcc, appFees }: Props) => {
  const { toast } = useToast();
  const [values, setValues] = useState<MessageData>({
    nick: "",
    amount: 5,
    currency: "PLN",
    description: "",
    payment_method: "card",
    payment_status: "pending",
    status: ["queue"],
    summaryPrice: 0,
    amount_fees: {
      amount_after_app_fee: 0,
      amount_app_fee: 0,
      amount_before_app_fee: 0,
    },
    fees: {
      app: 0,
      method: 0,
    },
  });

  const [appFee, setAppFee] = useState<number>(0);

  if (!connectAcc) return;

  const { loading, clientSecret, intent } = useCheckout(
    values.payment_method,
    connectAcc
  );

  const onSubmit = async () => {
    try {
      await MessagesService.addNewMessage(uid, {
        ...values,
        ...{
          payment_intent: intent,
          amount_after_fees: values.amount_fees.amount_after_app_fee,
        },
      });
      toast({
        variant: "default",
        title: "Sukces",
        description: `Wiadomość została wysłana.`,
      });
      setValues({
        nick: "",
        amount: 5,
        currency: "PLN",
        description: "",
        payment_method: "card",
        payment_status: "",
        status: ["queue"],
        summaryPrice: 0,
        amount_fees: {
          amount_after_app_fee: 0,
          amount_app_fee: 0,
          amount_before_app_fee: 0,
        },
        fees: {
          app: 0,
          method: 0,
        },
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Wystąpił błąd podczas wysyłania. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      });
      console.log("Error add message: ", err);
    }
  };

  const handleSelectPaymentMethod = (method: string) => {
    setValues({ ...values, payment_method: method });
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    field: keyof MessageData
  ) => {
    const value =
      field === "amount" ? parseFloat(e.target.value) : e.target.value;
    setValues({ ...values, [field]: value });
  };

  const getTotalPrice = () => {
    setValues((prevValues) => ({
      ...prevValues,
      summaryPrice: prevValues.amount,
    }));
  };

  const getAppFees = () => {
    if (!appFees) return;
    const value = calculateApplicationFeeAmount(
      values.summaryPrice,
      appFees.app_fee,
      values.payment_method,
      appFees.fees
    );
    setValues((prevValues) => ({
      ...prevValues,
      ...{
        amount_fees: {
          amount_after_app_fee: value.amountAfterAppFee,
          amount_app_fee: value.amountAppFee,
          amount_before_app_fee: value.amountBeforeAppFee,
        },
        fees: {
          app: value.appFee,
          method: value.methodFee,
        },
      },
    }));
  };

  useEffect(() => {
    getTotalPrice();
  }, [values.amount]);

  useEffect(() => {
    getAppFees();
  }, [values.summaryPrice, appFees.app_fee, appFees.fees]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            id="nick"
            className="pr-9"
            label="Nick"
            value={values.nick}
            onChange={(e) => handleChange(e, "nick")}
          />
          <Input
            id="amount"
            className="pr-9"
            label="Kwota"
            type="number"
            value={values.amount}
            onChange={(e) => handleChange(e, "amount")}
          />
        </div>
        <Textarea
          id="message"
          label="Treść wiadomości"
          value={values.description}
          onChange={(e) => handleChange(e, "description")}
        />
        <div>Podsumowanie: {values.summaryPrice}</div>
        Metody Płatności
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {paymentMethod.map((item: string) => (
            <li
              key={item}
              className="w-full h-[80px] flex items-center justify-center p-2 border-2 rounded-md relative cursor-pointer"
              onClick={() => handleSelectPaymentMethod(item)}
            >
              <Image
                alt={item}
                src={`/assets/${item}-icon.svg`}
                width={80}
                height={80}
              />
            </li>
          ))}
        </ul>
        <div className="mt-9">
          {!loading ? (
            <Elements
              stripe={getStripe(connectAcc)}
              options={{ clientSecret: clientSecret }}
            >
              <StripeCheckoutForm
                loadingForm={loading}
                intent={intent}
                amount={values.summaryPrice}
                account={connectAcc}
                feesAmount={appFee}
                onSumbit={onSubmit}
              />
            </Elements>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
