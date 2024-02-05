import Container from "@/components/Container";
import CardPayActive from "@/components/dashboard/cards/card-payActive";
import { Card, CardContent } from "@/components/ui/card";
import MailTo from "@/components/ui/mail-to";
import { Textarea } from "@/components/ui/textarea";
import InputCopy from "@/components/ui/input-copy";

const MonetisationPage = () => {
  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col py-6">
        <Card>
          <CardContent>
            <InputCopy />
          </CardContent>
        </Card>
        <div className="w-[320px] flex flex-col text-2xl text-[#333B69] my-2 font-semibold">
          Metody płatności
          <span className="text-sm">
            Wybierz metody płątności jakich mogą użyć Twoi klienci
          </span>
        </div>
        <div className="w-full gap-4 grid grid-cols-3">
          <CardPayActive icon="/assets/blik-icon.svg" />
          <CardPayActive icon="/assets/blik-icon.svg" />
          <CardPayActive icon="/assets/blik-icon.svg" />
          <CardPayActive icon="/assets/blik-icon.svg" />
          <CardPayActive icon="/assets/blik-icon.svg" />
          <CardPayActive icon="/assets/blik-icon.svg" />
          <CardPayActive icon="/assets/blik-icon.svg" />
          <CardPayActive icon="/assets/blik-icon.svg" />
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
          <Card>
            <CardContent>
              <div className="w-full flex justify-between pb-4">
                <p>Opis strony zamówień</p>
                <p>0/200</p>
              </div>
              <Textarea
                className="h-[250px]"
                placeholder="Type your message here."
              />
            </CardContent>
          </Card>
        </div>
      </section>
    </Container>
  );
};

export default MonetisationPage;
