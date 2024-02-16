import Container from "@/components/Container";
import CardPayActive from "@/components/dashboard/cards/card-payActive";
import { Card, CardContent } from "@/components/ui/card";
import MailTo from "@/components/ui/mail-to";
import InputCopy from "@/components/ui/input-copy";
import { PaymentService } from "@/lib/firebase/firebase-actions";
import { PAYMENT_METHODS } from "@/lib/constans";
import { PaymentMethod } from "@/types";
import ConfigurationPageForm from "@/components/forms/payment/configuration-page-form";

const MonetisationPage = async () => {
  const url = await PaymentService.getCheckout();
  const fetchedPayments: { count: number; payments: any[] } =
    await PaymentService.getAllPayments();

  const paymentMethods = PAYMENT_METHODS.map((defaultMethod: PaymentMethod) => {
    const isActive = fetchedPayments.payments.some(
      (payment: { name: string; isActive: boolean; is_active: boolean }) =>
        payment.name === defaultMethod.name &&
        (payment.isActive || payment.is_active)
    );
    return { ...defaultMethod, isActive };
  });

  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col py-6">
        <Card className="max-w-[300px]">
          <CardContent>
            <InputCopy
              value={`${process.env.NEXT_PUBLIC_URL}/payment/${url}`}
            />
          </CardContent>
        </Card>
        <div className="w-[320px] flex flex-col text-2xl text-[#333B69] my-2 font-semibold">
          Metody płatności
          <span className="text-sm">
            Wybierz metody płątności jakich mogą użyć Twoi klienci
          </span>
        </div>
        <div className="w-full gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {paymentMethods.map((item: PaymentMethod) => (
            <CardPayActive
              key={item.name}
              pid={url}
              icon={item.icon}
              name={item.name}
              checked={item.isActive}
            />
          ))}
          <Card className="h-[100px] w-[330px]">
            <CardContent>
              <div className="w-full h-full flex justify-between">
                <p className="text-sm font-normal w-[150px]">
                  Brakuje Ci metody płatności?
                </p>
                <MailTo>
                  <div className="border-2 border-[#1814F3] text-[#1814F3] rounded-md px-4 py-2">
                    Napisz
                  </div>
                </MailTo>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full h-full">
          <div className="flex gap-2 text-2xl text-[#333B69] my-2 font-semibold">
            <p>Konfiguracja strony z płatnościami</p>
          </div>
          <ConfigurationPageForm pid={url} />
        </div>
      </section>
    </Container>
  );
};

export default MonetisationPage;
