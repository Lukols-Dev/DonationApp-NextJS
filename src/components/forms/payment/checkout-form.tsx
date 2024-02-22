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

interface Props {
  uid: string;
  connectAcc?: string;
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
};

const CheckoutForm = ({ uid, paymentMethod, connectAcc }: Props) => {
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
  });

  if (!connectAcc) return;

  const { loading, clientSecret, intent } = useCheckout(
    values.payment_method,
    connectAcc
  );

  const onSubmit = async () => {
    try {
      await MessagesService.addNewMessage(uid, values);
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

  useEffect(() => {
    getTotalPrice();
  }, [values.amount]);

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
