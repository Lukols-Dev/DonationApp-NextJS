"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminPaymentService } from "@/lib/firebase/firebase-admin-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const InputFees = () => {
  const route = useRouter();
  const [feesValue, setFeesValue] = useState<number>(0);

  const handleChangeGoalValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeesValue(parseFloat(e.target.value));
  };

  const updateFeesAmount = async () => {
    try {
      await AdminPaymentService.updateAppFees(
        "AfaKosCBYUxTnUzrRBz26cvAFfBH7j",
        {
          app_fee: feesValue,
        }
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