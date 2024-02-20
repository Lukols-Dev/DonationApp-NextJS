"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCheckout } from "@/hooks/useCheckout";
import { MessagesService } from "@/lib/firebase/firebase-actions";
import { getStripe } from "@/lib/stripe/stripe-client";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Send } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
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
};

const CheckoutForm = ({ paymentMethod }: Props) => {
  const { toast } = useToast();
  const [values, setValues] = useState<MessageData>({
    nick: "",
    amount: 5,
    currency: "PLN",
    description: "",
    payment_method: "card",
    payment_status: "pending",
    status: ["queue"],
  });

  const { loading, clientSecret } = useCheckout(values.payment_method);

  const onSubmit = async () => {
    try {
      await MessagesService.addNewMessage("hXOYYt9NQGw8aW4G2kUR", values);
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
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Wystąpił błąd podczas wysyłania. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      });
      console.log("Error update user setting page: ", err);
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
          {loading ? (
            <div className="h-[100px] w-full"></div>
          ) : (
            <Elements
              stripe={getStripe()}
              options={{ clientSecret: clientSecret }}
            >
              <div id="payment-form">
                {/* <LinkAuthenticationElement id="link-authentication-element" /> */}
                <PaymentElement id="payment-element" />
              </div>
            </Elements>
          )}
        </div>
        {/* <Input id="email" className="pr-9" label="Email" /> */}
      </div>
      <button
        className="w-full sm:w-[160px] py-2 ml-auto mr-0 mt-auto mb-0 flex items-center justify-center gap-4 text-white bg-[#1814F3] rounded-md relative"
        onClick={onSubmit}
      >
        WYŚLIJ <Send className="w-6 h-6 absolute right-2" />
      </button>
    </>
  );
};

export default CheckoutForm;
