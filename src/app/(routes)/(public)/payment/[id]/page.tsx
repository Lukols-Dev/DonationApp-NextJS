import Logo from "@/components/Header/Logo";
import Magnetic from "@/components/common/Magnetic";
import CheckoutForm from "@/components/forms/payment/checkout-form";
import {
  PaymentPageService,
  PaymentService,
} from "@/lib/firebase/firebase-actions";
import { formatTimestamp, isEmpty } from "@/lib/utils";
import { PaymentPageData } from "@/types";
import { Page } from "@/types/page";
import Image from "next/image";
import { notFound } from "next/navigation";

const PaymentPage = async (props: Page) => {
  const { params } = props;

  if (isEmpty(params) || !params.id) {
    return notFound();
  }
  const {
    nick,
    socials,
    description,
    payment_methods,
    picture,
    uid,
    connect_acc,
    is_gif,
    is_voice,
    voice_price,
    gif_price,
  }: PaymentPageData = await PaymentPageService.getPaymentPageInfo(params.id);
  const fees = await PaymentService.getAppFees(uid);
  const lastPayments: { count: number; messages: any[] } =
    await PaymentPageService.getLastPayments(uid);

  return (
    <main className="w-screen min-h-screen flex flex-col relative">
      <Image
        fill
        alt="Payment background"
        src="/assets/images/payment-bg-3.jpg"
        className="-z-10"
      />
      <header className="p-10 w-full flex items-center justify-center sm:justify-start">
        <Logo className="text-white" />
      </header>
      <section className="w-full h-full flex items-center justify-center pb-10">
        <div className="flex flex-col-reverse sm:flex-row gap-4 mx-2">
          <div className="bg-white w-full max-w-[700px] sm:w-3/4 sm:max-h-screen min-h-[700px] flex flex-col rounded-lg p-4 gap-6 overflow-y-auto">
            {description ? (
              <div className="flex flex-col w-full ">
                <p className="text-[#18181A] text-lg font-medium">Od twórcy</p>
                <p className="text-[#18181A] text-sm font-normal">
                  {description}
                </p>
              </div>
            ) : (
              <></>
            )}
            {payment_methods && payment_methods.length > 0 ? (
              <CheckoutForm
                paymentMethod={payment_methods}
                uid={uid}
                connectAcc={connect_acc}
                appFees={fees}
                pid={params.id}
                custom_elements={{
                  is_gif: is_gif,
                  is_voice: is_voice,
                  voice_price: voice_price,
                  gif_price: gif_price,
                }}
              />
            ) : (
              <div className="mx-auto my-auto">
                Dodaj metody płatności na swoim profilu
              </div>
            )}
          </div>
          <div className="w-full h-auto sm:w-[250px] sm:h-screen sm:min-h-[700px] flex flex-col gap-4 items-center">
            {picture ? (
              <div className="bg-white w-full h-[200px] sm:w-[250px] sm:h-[350px] rounded-lg overflow-hidden relative">
                <Image
                  className="object-cover object-center"
                  alt="Payment User"
                  fill
                  src={picture || ""}
                />
              </div>
            ) : (
              <></>
            )}
            {nick ? (
              <div className="bg-white w-full h-[60px] p-4 rounded-lg flex items-center justify-center">
                <p>{nick}</p>
              </div>
            ) : (
              <></>
            )}
            {!isEmpty(socials) ? (
              <div className="bg-white w-full h-[60px] p-4 rounded-lg flex justify-center items-center gap-x-8">
                {socialOrder.map((key) => {
                  const href = socials[key];
                  return href ? (
                    <Magnetic key={key}>
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        <Image
                          alt={key}
                          width={30}
                          height={30}
                          src={`/assets/${key}-icon.svg`}
                        />
                      </a>
                    </Magnetic>
                  ) : null;
                })}
              </div>
            ) : (
              <></>
            )}
            <div className="bg-white w-full h-full p-4 rounded-lg hidden sm:flex flex-col">
              <div className="relative ml-auto mr-4">
                <div className="w-4 h-4 rounded-full bg-red-500 animate-ping absolute top-0 left-0" />
                <div className="w-4 h-4 rounded-full bg-red-500 absolute top-0 left-0" />
              </div>
              <ul className="w-full h-full max-h-[350px] mt-4 flex flex-col gap-y-2 overflow-auto">
                {lastPayments &&
                  lastPayments.messages
                    .sort((a, b) => b.create_at - a.create_at)
                    .slice(0, 15)
                    .map((item, index) => (
                      <li className="flex flex-col m-0" key={index}>
                        <p className="text-xs text-[#B1B1B1]">
                          {formatTimestamp(item.create_at)}
                        </p>
                        <p className="text-sm text-[#B1B1B1]">
                          <span className="text-bold text-black mr-2">
                            {item.nick}
                          </span>
                          wysłał wiadomość
                        </p>
                      </li>
                    ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PaymentPage;

const socialOrder = ["youtube", "twitch", "twitter"];
