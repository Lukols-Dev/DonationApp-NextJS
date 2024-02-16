"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { PaymentService } from "@/lib/firebase/firebase-actions";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  icon: string;
  name: string;
  checked?: boolean;
}

const CardPayActive = ({ icon, name, checked }: Props) => {
  const [isActive, setIsActive] = useState(checked);

  const onChange = async () => {
    const newIsActive = !isActive;

    setIsActive(newIsActive);

    const data = {
      name,
      isActive: newIsActive,
    };
    try {
      await PaymentService.addPayment(data, "hXOYYt9NQGw8aW4G2kUR");
    } catch (err) {
      setIsActive(!newIsActive);
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
