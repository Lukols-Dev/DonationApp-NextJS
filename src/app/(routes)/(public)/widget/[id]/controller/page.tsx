"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ControllerService } from "@/lib/firebase/firebase-actions";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ControllerWidget = () => {
  const pathname = usePathname();
  const [uid, setId] = useState<string>("");
  const [donateActive, setDonateActive] = useState<boolean>(true);
  const [goalActive, setGoalActive] = useState<boolean>(true);
  const [goalValue, setGoalValue] = useState<number>(0);

  const onClickGoal = async () => {
    setGoalActive((prev) => !prev);

    try {
      ControllerService.updateController(uid, { goal_active: goalActive });
    } catch (err) {
      console.log("Controller Err: ", err);
    }
  };

  const onClickDonate = () => {
    setDonateActive((prev) => !prev);

    try {
      ControllerService.updateController(uid, { donate_active: donateActive });
    } catch (err) {
      console.log("Controller Err: ", err);
    }
  };

  const handleChangeGoalValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoalValue(parseFloat(e.target.value));
  };

  const updateGoalAmount = () => {
    try {
      ControllerService.updateController(uid, { goal_amount: goalValue });
    } catch (err) {
      console.log("Controller Err: ", err);
    }
  };

  useEffect(() => {
    const segments = pathname.split("/");
    const id = segments[2];
    if (id) {
      setId(id);
    }
  }, [pathname]);

  return (
    <div className="w-screen h-screen grid grid-rows-6 gap-4 bg-gray-300">
      <div
        className={cn(
          "bg-white w-full h-full flex items-center justify-center",
          donateActive && "bg-green-500"
        )}
        onClick={onClickDonate}
      >
        {donateActive ? "Zatrzymaj Donejty" : "Wznów Donejty"}
      </div>
      <div
        className={cn(
          "bg-white w-full h-full flex items-center justify-center",
          goalActive && "bg-green-500"
        )}
        onClick={onClickGoal}
      >
        {goalActive ? "Ukryj Cel" : "Pokaż Cel"}
      </div>
      <div className="bg-white w-full h-full flex items-center justify-center">
        <div className="flex items-end gap-4">
          <div>
            <Label className="text-muted-foreground">Dodaj kwotę do celu</Label>
            <Input
              id="goal_max_value"
              placeholder="10 PLN"
              type="number"
              onChange={handleChangeGoalValue}
              value={goalValue}
            />
          </div>
          <Button onClick={updateGoalAmount}>Wślij</Button>
        </div>
      </div>
      <div className="bg-white w-full h-full"></div>
      <div className="bg-white w-full h-full"></div>
      <div className="bg-white w-full h-full"></div>
    </div>
  );
};

export default ControllerWidget;
