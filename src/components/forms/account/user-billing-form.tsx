"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UserService } from "@/lib/firebase/firebase-actions";
import { Dot } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  uid: string;
  data: any;
}

type UserBillingData = {
  account_type: string;
  name: string;
  surname: string;
  country: string;
  address: string;
  city: string;
  post_code: string;
  company_name: string;
  company_nip: string;
  company_address: string;
  bank: string;
};

const UserBillingForm = ({ uid, data }: Props) => {
  const { toast } = useToast();
  const [values, setValues] = useState<UserBillingData>({
    account_type: "",
    name: "",
    surname: "",
    country: "",
    address: "",
    city: "",
    post_code: "",
    company_name: "",
    company_address: "",
    company_nip: "",
    bank: "",
  });

  const initUserData = () => {
    setValues({ ...values, ...data });
  };

  const handleAccountTypeChange = (accountType: "company" | "individual") => {
    setValues({ ...values, account_type: accountType });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof UserBillingData
  ) => {
    if (field in values) {
      setValues({ ...values, [field]: e.target.value });
    }
  };

  const onSubmit = async () => {
    try {
      await UserService.updateUserData(uid, values);
      toast({
        variant: "default",
        title: "Sukces",
        description: `Dane zostały zaktualizowane.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Wystąpił błąd podczas zapisu. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      });
      console.log("Error update user setting page: ", err);
    }
  };

  useEffect(() => {
    initUserData();
  }, [data]);

  return (
    <>
      <div className="w-full max-w-[500px] flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div>
            Dane Rozliczeniowe
            <span className="text-xs ml-2">(private)</span>
          </div>
          <span className="text-sm max-w-[350px]">
            Dane potrzebne do rozliczeń. Nie będą widoczne dla osób trzecich.
          </span>
        </div>
        <div className="flex flex-col text-lg">
          <div>
            <p className="flex gap-2 items-center my-4">
              <Dot /> Rodzaj konta
            </p>
            <div className="flex flex-col mx-8 gap-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="company_acc"
                  checked={values.account_type === "company"}
                  onClick={() => handleAccountTypeChange("company")}
                />
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
                <Checkbox
                  id="individual_acc"
                  checked={values.account_type === "individual"}
                  onClick={() => handleAccountTypeChange("individual")}
                />
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
              <Input
                label="Imię"
                value={values.name}
                onChange={(e) => handleChange(e, "name")}
              />
              <Input
                label="Nazwisko"
                value={values.surname}
                onChange={(e) => handleChange(e, "surname")}
              />
              <Input
                label="Kraj"
                value={values.country}
                onChange={(e) => handleChange(e, "country")}
              />
              <Input
                label="Ulica i Numer Lokalu"
                value={values.address}
                onChange={(e) => handleChange(e, "address")}
              />
              <Input
                label="Miasto"
                value={values.city}
                onChange={(e) => handleChange(e, "city")}
              />
              <Input
                label="Kod Pocztowy"
                value={values.post_code}
                onChange={(e) => handleChange(e, "post_code")}
              />
            </div>
          </div>
          <div>
            <p className="flex gap-2 items-center mt-4 mb-2">
              <Dot /> Dane firmowe
            </p>
            <div className="flex flex-col gap-y-2 mx-8">
              <Input
                label="Nazwa Firmy"
                value={values.company_name}
                onChange={(e) => handleChange(e, "company_name")}
              />
              <Input
                label="NIP"
                value={values.company_nip}
                onChange={(e) => handleChange(e, "company_nip")}
              />
              <Input
                label="Adres"
                value={values.company_address}
                onChange={(e) => handleChange(e, "company_address")}
              />
            </div>
          </div>
          <div>
            <p className="flex gap-2 items-center mt-4 mb-2">
              <Dot /> Dane do wypłaty
            </p>
            <div className="mx-8">
              <Input
                label="Numer Konta Bankowego (IBAN)"
                value={values.bank}
                onChange={(e) => handleChange(e, "bank")}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="px-9 py-2 rounded-full bg-[#1814F3] text-white font-semibold text-lg mr-0 ml-auto"
        onClick={onSubmit}
      >
        ZAPISZ
      </button>
    </>
  );
};

export default UserBillingForm;
