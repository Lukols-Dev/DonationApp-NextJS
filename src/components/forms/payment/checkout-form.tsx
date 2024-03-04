"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  FileService,
  MessagesService,
  NotificationService,
  PaymentPageService,
  QueueService,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VoiceRecorder from "@/components/ui/voice-recorder";

interface Props {
  uid: string;
  connectAcc?: string;
  pid: string;
  appFees: { app_fee: number; fees: PaymentMethodFees };
  paymentMethod: string[];
  custom_elements: {
    is_gif?: boolean;
    gif_price?: number;
    is_voice?: boolean;
    voice_price?: number;
  };
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
  gif_url?: string;
};

const CheckoutForm = ({
  uid,
  pid,
  paymentMethod,
  connectAcc,
  appFees,
  custom_elements,
}: Props) => {
  const url = uuidv4();
  const { toast } = useToast();
  const [recordingLength, setRecordingLength] = useState(0); // Dodajemy stan dla długości nagrania
  const [values, setValues] = useState<MessageData>({
    nick: "",
    amount: 5,
    currency: "PLN",
    description: "",
    payment_method: "card",
    payment_status: "complete",
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
    gif_url: "",
  });

  const [appFee, setAppFee] = useState<number>(0);
  const [voiceFile, setVoiceFile] = useState<Blob | null>(null);
  const [gifs, setGifs] = useState<{ name: string; url: string }[]>([]);

  const onSubmit = async () => {
    let audioUrl: any = "";
    try {
      if (voiceFile) {
        audioUrl = await FileService.addAudio(uid, voiceFile); // Załóżmy, że addAudio przyjmuje Blob
      }
      const res = await MessagesService.addNewMessage(uid, {
        ...values,
        ...{
          amount_after_fees: values.amount_fees.amount_after_app_fee,
          url: url,
          voice_url: audioUrl || "",
        },
      });

      if (
        values.payment_method === "paypal" ||
        values.payment_method === "smspremium" ||
        values.payment_method === "paysafecard"
      ) {
        await QueueService.addToQueue(uid, {
          mid: res.id,
          nick: values.nick,
          description: values.description,
          amount: values.summaryPrice,
          amount_after_fees: values.amount_fees.amount_after_app_fee,
          currency: "PLN",
          gif_url: values.gif_url,
          voice_url: audioUrl || "",
        });
      }

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
        payment_status: "complete",
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
        gif_url: "",
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

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;

    const object = {
      [settingProperty]: value,
    };

    setValues((prevValues) => ({
      ...prevValues,
      ...object,
    }));
  };

  // const getTotalPrice = async () => {
  //   let totalPrice = values.amount; //default amount
  //   //gif
  //   if (custom_elements.is_gif && values.gif_url) {
  //     totalPrice += custom_elements.gif_price || 0;
  //   }

  //   // voice
  //   if (custom_elements.is_voice && recordingLength > 0) {
  //     totalPrice += recordingLength * (custom_elements.voice_price || 0);
  //   }

  //   setValues((prevValues) => ({
  //     ...prevValues,
  //     summaryPrice: totalPrice,
  //   }));
  // };

  const getTotalPrice = useCallback(() => {
    let totalPrice = values.amount; // default amount

    // Add gif price
    if (custom_elements.is_gif && values.gif_url) {
      totalPrice += Number(custom_elements.gif_price) || 0;
    }

    // Add voice price
    if (custom_elements.is_voice && recordingLength > 0) {
      totalPrice +=
        recordingLength * (Number(custom_elements.voice_price) || 0);
    }

    setValues((prevValues) => ({
      ...prevValues,
      summaryPrice: totalPrice,
    }));
  }, [
    values.amount,
    values.gif_url,
    recordingLength,
    custom_elements.is_gif,
    custom_elements.is_voice,
    custom_elements.gif_price,
    custom_elements.voice_price,
  ]);

  // const handleRecordingComplete = (length: number) => {
  //   setRecordingLength(length);
  // };

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

  const getGifsLib = async () => {
    const resp = await PaymentPageService.getAllGifs();
    if (resp && resp.count > 0) {
      setGifs(resp.data);
    }
  };

  const handleRecordingComplete = async (
    audioBlob: Blob,
    recordingLength: number
  ) => {
    console.log("recordingLength: ", recordingLength);
    await setRecordingLength(recordingLength);
    await setVoiceFile(audioBlob);
    await getTotalPrice();
  };

  // useEffect(() => {
  //    if (!values.amount) return;
  //   getTotalPrice();
  //   // console.log("values: ", values);
  // }, [values.amount, values.gif_url]);

  useEffect(() => {
    getTotalPrice();
  }, [getTotalPrice]);

  useEffect(() => {
    getAppFees();
  }, [
    values.summaryPrice,
    appFees.app_fee,
    appFees.fees,
    values.payment_method,
  ]);

  useEffect(() => {
    if (!values.summaryPrice) return;
    setValues({ ...values, payment_method: "" });
  }, [values.summaryPrice]);

  useEffect(() => {
    // if(true) return
    getGifsLib();
  }, []);

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
        {custom_elements.is_gif && (
          <div>
            <Label className="text-muted-foreground">
              Gif donejta (koszt: {custom_elements.gif_price} PLN)
            </Label>
            <Select
              onValueChange={(e) =>
                handleChangeCustomValues({
                  target: {
                    id: "gif_url",
                    value: e,
                  },
                })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Wybierz gif" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {gifs.map((item, index) => (
                    <SelectItem key={index} value={item.url}>
                      <div className="flex gap-2 items-center">
                        <img
                          alt="GIF DONATE"
                          width={30}
                          height={30}
                          src={item.url}
                        />
                        {item.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        {custom_elements.is_voice && (
          <div>
            <VoiceRecorder
              maxRecordingTime={10}
              price={custom_elements.voice_price}
              onRecordingComplete={handleRecordingComplete}
            />
          </div>
        )}
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
              account={"connectAcc"}
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
