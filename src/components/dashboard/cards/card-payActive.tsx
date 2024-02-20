"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import {
  PaymentPageService,
  PaymentService,
} from "@/lib/firebase/firebase-actions";
import Image from "next/image";
import { useState } from "react";

interface Props {
  icon: string;
  name: string;
  checked?: boolean;
  pid: string;
  uid: string;
}

const CardPayActive = ({ pid, uid, icon, name, checked }: Props) => {
  const { toast } = useToast();
  const [isActive, setIsActive] = useState(checked);

  const onChange = async () => {
    const newIsActive = !isActive;

    setIsActive(newIsActive);

    const data = {
      name,
      isActive: newIsActive,
    };
    try {
      await PaymentService.addPayment(uid, data);
      await PaymentPageService.updatePaymentPageInfo(pid, {
        paymentMethods: name,
        isActive: newIsActive,
      });
      toast({
        variant: "default",
        title: "Sukces",
        description: `Metoda płatności "${name}" została zapisana.`,
      });
    } catch (err) {
      setIsActive(!newIsActive);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Wystąpił błąd podczas zapisu. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      });
      console.log("Error add payment method: ", err);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className="w-full h-[50px] flex justify-between items-center">
          <div className="w-20 h-20 relative">
            <Image
              alt="Pyment Blik"
              fill
              className="object-contain object-center"
              src={icon}
            />
          </div>
          {isActive ? <p>Aktywne</p> : <></>}
          <Switch checked={isActive} onCheckedChange={onChange} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPayActive;
