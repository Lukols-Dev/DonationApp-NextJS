"use client";

import Modal from "@/components/modals/Modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Payment } from "@/components/ui/table";
import { PaypalPayment } from "@/lib/paypal/paypal-actions";
import { createPayout } from "@/lib/stripe/stripe-actions";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

interface Props {
  title?: string;
  icon?: string | ReactNode;
  value?: string | number;
  valueDesc?: string;
  payments?: any;
  user?: any;
}

const CardPayout = ({
  title,
  icon,
  value,
  valueDesc,
  payments,
  user,
}: Props) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card className="min-w-[260px]">
        <CardHeader>
          <CardTitle className="text-[#343C6A]">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-2xl font-bold text-zinc-950">{value}</p>
          <p className="text-sm font-normal text-[#B1B1B1]">{valueDesc}</p>
          <span className="absolute top-4 right-6">{icon}</span>
          <button
            onClick={() => setOpen(true)}
            className="absolute bottom-4 right-4 px-9 py-2 rounded-sm bg-[#1814F3] text-white font-semibold text-lg"
          >
            Wypłać
          </button>
        </CardContent>
      </Card>
      <Modal
        title="Wypałać pieniądze"
        body={<PayoutForm payments={payments} user={user} />}
        isOpen={isOpen}
        onClose={onClose}
        position="center"
      />
    </>
  );
};

export default CardPayout;

const PayoutForm = ({ payments, user }: { payments?: any; user: any }) => {
  const route = useRouter();
  const [loading, setLoading] = useState<{
    paypal: boolean;
    sms: boolean;
    stripe: boolean;
  }>({
    paypal: false,
    sms: false,
    stripe: false,
  });
  const [payouts, setPayouts] = useState<any>();
  if (!user) return;
  if (!payments)
    return (
      <div className="w-full min-h-[200px] flex items-center justify-center">
        Nie posiadasz jeszcze żadnych wpłat
      </div>
    );

  function calculatePayouts() {
    const payoutSummary: Record<string, number> = {
      paypal: 0,
      sms: 0,
      other: 0,
    };

    payments.payments.forEach((payment: any) => {
      if (payment.name === "paypal" || payment.name === "sms") {
        payoutSummary[payment.name] += payment.payout;
      } else {
        payoutSummary.other += payment.payout;
      }
    });
    setPayouts(payoutSummary);
  }

  const stripePayout = async (amount: number) => {
    if (amount === 0) return;
    setLoading((prev) => ({ ...prev, stripe: true }));
    try {
      // route.push("https://dashboard.stripe.com/test/balance/overview");
      const resp = await createPayout(5, user.connect_acc);
      console.log("resp stripe: ", resp);
    } catch (err) {
      setLoading((prev) => ({ ...prev, stripe: false }));
      console.log("Payout error: ", err);
    } finally {
      setLoading((prev) => ({ ...prev, stripe: false }));
    }
  };

  const paypalPayout = async (amount: number) => {
    if (amount === 0) return;
    setLoading((prev) => ({ ...prev, paypal: true }));
    try {
      await PaypalPayment.paypalPayout(user.uid, {
        email: user.email,
        amount: amount,
      });
      route.refresh();
    } catch (err) {
      setLoading((prev) => ({ ...prev, paypal: false }));
      console.log("Payout error: ", err);
    } finally {
      setLoading((prev) => ({ ...prev, paypal: false }));
    }
  };

  const smsPayout = (amount: number) => {
    if (amount === 0) return;
    setLoading((prev) => ({ ...prev, sms: true }));
    try {
    } catch (err) {
      setLoading((prev) => ({ ...prev, sms: false }));
      console.log("Payout error: ", err);
    } finally {
      setLoading((prev) => ({ ...prev, sms: false }));
    }
  };

  useEffect(() => {
    if (!payments) return;
    calculatePayouts();
  }, [payments]);

  return (
    <div className="w-full min-h-[200px] mt-4 flex flex-col gap-4 justify-center">
      <div className="flex items-center justify-between hover:bg-gray-300 p-4 rounded-md ">
        Blik, Card, Przelewy24
        <button
          className="border-2 border-[#1814F3] text-[#1814F3]  hover:bg-[#1814F3] hover:text-white rounded-md px-4 py-2"
          onClick={() =>
            stripePayout(payouts && payouts.other ? payouts.other : 0)
          }
          disabled={loading.stripe}
        >
          {!loading.stripe ? (
            <>{payouts && payouts.other ? payouts.other : 0} Wypłać</>
          ) : (
            <PulseLoader size={10} color="#1814F3" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between hover:bg-gray-300 p-4 rounded-md">
        Paypal
        <button
          className="border-2 border-[#1814F3] text-[#1814F3] hover:bg-[#1814F3] hover:text-white rounded-md px-4 py-2"
          onClick={() =>
            paypalPayout(payouts && payouts.paypal ? payouts.paypal : 0)
          }
          disabled={loading.paypal}
        >
          {!loading.paypal ? (
            <>{payouts && payouts.paypal ? payouts.paypal : 0} Wypłać</>
          ) : (
            <PulseLoader size={10} color="#1814F3" />
          )}
        </button>
      </div>
      <div className="flex items-center justify-between hover:bg-gray-300 p-4 rounded-md">
        SMS
        <button
          className="border-2 border-[#1814F3] text-[#1814F3] hover:bg-[#1814F3] hover:text-white rounded-md px-4 py-2"
          onClick={() => smsPayout(payouts && payouts.sms ? payouts.sms : 0)}
          disabled={loading.sms}
        >
          {!loading.sms ? (
            <>{payouts && payouts.sms ? payouts.sms : 0} Wypłać</>
          ) : (
            <PulseLoader size={10} color="#1814F3" />
          )}
        </button>
      </div>
    </div>
  );
};
