import Container from "@/components/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Dot } from "lucide-react";

const UserSettingPage = () => {
  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="w-full h-full flex flex-col text-2xl text-[#333B69] font-semibold gap-y-6">
          Ustawienia konta
          {/* card 1 */}
          <Card>
            <CardContent className="flex flex-col gap-y-4">
              <div className="flex gap-x-9 text-lg">
                <div className="w-full flex flex-col gap-4">
                  <p>Dane użytkownika</p>
                  <Input label="Nick" />
                  <Input label="Email" />
                  <Input label="Zdjęcie konta" />
                </div>
                <div className="w-full flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    Media społecznościowe
                    <span className="text-sm">
                      Pokaż swoją twórczość na innych mediach społecznościowych.
                      <br />
                      Będą to dane publiczne widoczne na stronie płatności.
                    </span>
                  </div>
                  <Input label="Youtube" />
                  <Input label="Twitch" />
                  <Input label="Twitter" />
                </div>
              </div>
              <button className="px-9 py-2 rounded-full bg-[#1814F3] text-white font-semibold text-lg mr-0 ml-auto">
                ZAPISZ
              </button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col gap-y-4">
              <div className="w-full max-w-[500px] flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <div>
                    Dane Rozliczeniowe
                    <span className="text-xs ml-2">(private)</span>
                  </div>
                  <span className="text-sm max-w-[350px]">
                    Dane potrzebne do rozliczeń. Nie będą widoczne dla osób
                    trzecich.
                  </span>
                </div>
                <div className="flex flex-col text-lg">
                  <div>
                    <p className="flex gap-2 items-center my-4">
                      <Dot /> Rodzaj konta
                    </p>
                    <div className="flex flex-col mx-8 gap-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="company_acc" />
                        <label
                          htmlFor="company_acc"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Firmowe
                        </label>
                      </div>
                      <p className="text-xs font-normal">
                        Wybierz jeśli prowadzisz działalność gospodarczą
                      </p>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="individual_acc" />
                        <label
                          htmlFor="individual_acc"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Prywatne
                        </label>
                      </div>
                      <p className="text-xs font-normal">
                        Wybierz jeśli nie prowadzisz działalności gospodarczej
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="flex gap-2 items-center mt-4 mb-2">
                      <Dot /> Dane osobowe
                    </p>
                    <div className="flex flex-col gap-y-2 mx-8">
                      <Input label="Imię" />
                      <Input label="Nazwisko" />
                      <Input label="Kraj" />
                      <Input label="Ulica i Numer Lokalu" />
                      <Input label="Miasto" />
                      <Input label="Kod Pocztowy" />
                    </div>
                  </div>
                  <div>
                    <p className="flex gap-2 items-center mt-4 mb-2">
                      <Dot /> Dane firmowe
                    </p>
                    <div className="flex flex-col gap-y-2 mx-8">
                      <Input label="Nazwa Firmy" />
                      <Input label="NIP" />
                      <Input label="Adres" />
                    </div>
                  </div>
                  <div>
                    <p className="flex gap-2 items-center mt-4 mb-2">
                      <Dot /> Dane do wypłaty
                    </p>
                    <div className="mx-8">
                      <Input label="Numer Konta Bankowego (IBAN)" />
                    </div>
                  </div>
                </div>
              </div>
              <button className="px-9 py-2 rounded-full bg-[#1814F3] text-white font-semibold text-lg mr-0 ml-auto">
                ZAPISZ
              </button>
            </CardContent>
          </Card>
          <Card className="max-w-[500px]">
            <CardContent className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2 text-sm max-w-[300px]">
                Jeśli nie chcesz już korzystać z narzędzia możesz usunąć konto w
                tym miejscu.
                <span className="text-xs">
                  Pamiętaj, konto zostanie usunięte trwale!
                </span>
              </div>
              <button className="px-9 py-2 rounded-md bg-red-500 text-white font-semibold text-lg mr-0 ml-auto">
                USUŃ
              </button>
            </CardContent>
          </Card>
        </div>
        <div className="w-full h-full">{/* card 2 */}</div>
      </section>
    </Container>
  );
};

export default UserSettingPage;
