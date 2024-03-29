"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminPaymentService } from "@/lib/firebase/firebase-admin-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  id: string;
  custom?: boolean;
  payments?: boolean;
}

export const InputFees = ({ id, custom, payments }: Props) => {
  const route = useRouter();
  const [feesValue, setFeesValue] = useState<number>(0);

  const handleChangeGoalValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeesValue(parseFloat(e.target.value));
  };

  const updateFeesAmount = async () => {
    let data;
    if (id === "app_fee" && !payments && !custom) {
      data = {
        app_fee: feesValue,
      };
    }

    if (id !== "app_fee" && payments && !custom) {
      data = {
        fees: {
          [id]: feesValue,
        },
      };
    }

    if (id !== "app_fee" && !payments && custom) {
      data = {
        custom_elements: {
          [id]: feesValue,
        },
      };
    }

    try {
      await AdminPaymentService.updateAppFees(
        "AfaKosCBYUxTnUzrRBz26cvAFfBH7j",
        data
      );
      route.refresh();
    } catch (err) {
      console.log("App Fees Err: ", err);
    }
  };
  return (
    <div className="flex items-end gap-4">
      <div>
        <Input
          className="w-[80px]"
          id="fees_value"
          placeholder="0"
          type="number"
          onChange={handleChangeGoalValue}
          value={feesValue}
        />
      </div>
      <Button onClick={updateFeesAmount}>Zapisz</Button>
    </div>
  );
};
