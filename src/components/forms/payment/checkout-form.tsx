"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCheckout } from "@/hooks/useCheckout";
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

const CheckoutForm = ({ paymentMethod }: Props) => {
  const [method, setMethod] = useState<string>("card");
  const { loading, clientSecret } = useCheckout(method);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const handleMethod = (paymentMethod: string) => {
    setMethod(paymentMethod);
  };

  useEffect(() => {
    console.log(method);
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <Input id="nick" className="pr-9" label="Nick" />
          <Input id="price" className="pr-9" label="Kwota" />
        </div>
        <Textarea id="message" label="Treść wiadomości" />
        Metody Płatności
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {paymentMethod.map((item: string) => (
            <li
              key={item}
              className="w-full h-[80px] flex items-center justify-center p-2 border-2 rounded-md relative cursor-pointer"
              onClick={() => handleMethod(item)}
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
              <form id="payment-form" onSubmit={handleSubmit}>
                {/* <LinkAuthenticationElement id="link-authentication-element" /> */}
                <PaymentElement id="payment-element" />
              </form>
            </Elements>
          )}
        </div>
        {/* <Input id="email" className="pr-9" label="Email" /> */}
      </div>
      <button className="w-full sm:w-[160px] py-2 ml-auto mr-0 mt-auto mb-0 flex items-center justify-center gap-4 text-white bg-[#1814F3] rounded-md relative">
        WYŚLIJ <Send className="w-6 h-6 absolute right-2" />
      </button>
    </>
  );
};

export default CheckoutForm;
