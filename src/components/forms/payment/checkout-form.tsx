"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  MessagesService,
  NotificationService,
} from "@/lib/firebase/firebase-actions";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { calculateApplicationFeeAmount, cn } from "@/lib/utils";
import { PaymentMethodFees } from "@/types";
import PaypalCheckout from "./checkout-paypal";
import PaysafecardCheckout from "./checkout-paysafecard";
import StripeForm from "./stripe-form";
import SMSCheckout from "./sms-checkout-form";
import { v4 as uuidv4 } from "uuid";

interface Props {
  uid: string;
  connectAcc?: string;
  pid: string;
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

const CheckoutForm = ({
  uid,
  pid,
  paymentMethod,
  connectAcc,
  appFees,
}: Props) => {
  const url = uuidv4();
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

  const onSubmit = async () => {
    try {
      await MessagesService.addNewMessage(uid, {
        ...values,
        ...{
          amount_after_fees: values.amount_fees.amount_after_app_fee,
          url: url,
        },
      });
      await NotificationService.addNewNotification(uid, {
        amount: values.summaryPrice,
        mount_after_app_fee: values.amount_fees.amount_after_app_fee,
        method: values.payment_method,
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

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      field: keyof MessageData
    ) => {
      const newValue =
        field === "amount" ? parseFloat(e.target.value) : e.target.value;
      setValues((prevValues) => ({ ...prevValues, [field]: newValue }));
    },
    []
  );

  const getTotalPrice = async () => {
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
    setAppFee(value.amountAppFee);
  };

  useEffect(() => {
    if (!values.amount) return;
    getTotalPrice();
  }, [values.amount]);

  useEffect(() => {
    getAppFees();
  }, [values.summaryPrice, appFees.app_fee, appFees.fees]);

  useEffect(() => {
    if (!values.summaryPrice) return;
    setValues({ ...values, payment_method: "" });
  }, [values.summaryPrice]);

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
              className={cn(
                "w-full h-[80px] flex items-center justify-center p-2 border-2 rounded-md relative cursor-pointer bg-white",
                item === values.payment_method &&
                  "border-2 border-blue-500 shadow-md"
              )}
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
          {values.payment_method === "card" ||
          values.payment_method === "blik" ||
          values.payment_method === "p24" ? (
            <StripeForm
              amount={values.summaryPrice}
              method={values.payment_method}
              account={connectAcc}
              onSumbit={onSubmit}
              uid={uid}
              pid={pid}
              urlID={url}
            />
          ) : (
            <></>
          )}
          {values.payment_method === "paypal" ? (
            <PaypalCheckout
              uid={uid}
              amount={values.summaryPrice}
              appFee={appFee}
              onSumbit={onSubmit}
            />
          ) : (
            <></>
          )}
          {values.payment_method === "paysafecard" ? (
            <PaysafecardCheckout
              uid={uid}
              amount={values.summaryPrice}
              appFee={appFee}
              onSumbit={onSubmit}
            />
          ) : (
            <></>
          )}
          {values.payment_method === "smspremium" ? (
            <SMSCheckout
              uid={uid}
              amount={values.summaryPrice}
              appFee={appFee}
              onSumbit={onSubmit}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default CheckoutForm;
