"use client";

import { useCheckout } from "@/hooks/useCheckout";
import { getStripe } from "@/lib/stripe/stripe-client";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  paymentMethod: { icon: string; name: string }[];
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
    <div className="flex flex-col">
      Metody Płatności
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {paymentMethod.map((item: { icon: string; name: string }) => (
          <li
            key={item.name}
            className="w-full h-[80px] flex items-center justify-center p-2 border-2 rounded-md relative"
            onClick={() => handleMethod(item.name)}
          >
            <Image alt={item.name} src={item.icon} width={80} height={80} />
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
    </div>
  );
};

export default CheckoutForm;
