"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PaymentPageService } from "@/lib/firebase/firebase-actions";
import { FormEvent, useEffect, useState } from "react";

interface Props {
  pid: string;
}

const ConfigurationPageForm = ({ pid }: Props) => {
  const { toast } = useToast();
  const [value, setValue] = useState<string>("");

  const getFormData = async () => {
    const data = await PaymentPageService.getPaymentPageInfo(pid);
    setValue(data.description);
  };

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const curr: any = e.target;
    if (value.length <= 200) {
      setValue(curr.value);
    } else if (value.length > 200 && value.slice(0, 200) !== value) {
      setValue(curr.value.slice(0, 200));
    }
  };

  const onSubmit = async () => {
    try {
      await PaymentPageService.updatePaymentPageInfo(pid, {
        description: value,
      });
      toast({
        variant: "default",
        title: "Sukces",
        description: `Opis strony płatności został zaktualizowany.`,
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Wystąpił błąd podczas zapisu. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      });
      console.log("Error update paymen page desc: ", err);
    }
  };

  useEffect(() => {
    getFormData();
  }, [pid]);

  return (
    <div className="flex flex-col">
      <Card>
        <CardContent>
          <div className="w-full flex justify-between pb-4">
            <p>Opis strony zamówień</p>
            <p>{value ? value.length : 0}/200</p>
          </div>
          <Textarea
            className="h-[250px]"
            placeholder="Type your message here."
            value={value}
            onChange={(e) => handleInput(e)}
          />
        </CardContent>
      </Card>
      <Button
        className="w-full md:w-[200px] mt-4 mr-0 ml-auto bg-[#1814F3]"
        variant="default"
        onClick={onSubmit}
      >
        Zapisz
      </Button>
    </div>
  );
};

export default ConfigurationPageForm;
