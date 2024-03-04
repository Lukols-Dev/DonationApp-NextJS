"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { PaymentPageService } from "@/lib/firebase/firebase-actions";
import { FormEvent, useEffect, useState } from "react";
import { Label } from "recharts";

type CustomValues = {
  is_gif: boolean;
  is_voice: boolean;
  voice_price: number;
  gif_price: number;
};

interface Props {
  pid: string;
}

const ConfigurationPageForm = ({ pid }: Props) => {
  const { toast } = useToast();
  const [value, setValue] = useState<string>("");
  const [customValue, setCustomValue] = useState<CustomValues>({
    is_gif: false,
    is_voice: false,
    voice_price: 0,
    gif_price: 0,
  });
  const getFormData = async () => {
    const data = await PaymentPageService.getPaymentPageInfo(pid);
    setValue(data.description);
    setCustomValue({
      is_gif: data.is_gif || false,
      is_voice: data.is_voice || false,
      voice_price: data.voice_price || 0,
      gif_price: data.gif_price || 0,
    });
  };

  const handleInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const curr: any = e.target;
    if (value.length <= 200) {
      setValue(curr.value);
    } else if (value.length > 200 && value.slice(0, 200) !== value) {
      setValue(curr.value.slice(0, 200));
    }
  };

  const handleChangeCustomValues = (e: any) => {
    const settingProperty = e.target.id;
    let value = e.target.value;
    const object = {
      [settingProperty]: value,
    };

    setCustomValue((prevValues) => ({
      ...prevValues,
      ...object,
    }));
  };

  const onSubmit = async () => {
    try {
      const data = { description: value, ...customValue };
      await PaymentPageService.updatePaymentPageInfo(pid, data);
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
    <div className="flex flex-col gap-4">
      <Card>
        <CardContent className="flex flex-col gap-4">
          <div className="w-full flex justify-between">
            <p>Dodatkowe opcje</p>
          </div>
          <div className="flex gap-2 items-center">
            <div className="text-muted-foreground">Dodawanie gifów</div>
            <Switch
              id="is_gif"
              checked={customValue.is_gif}
              onCheckedChange={(e) =>
                handleChangeCustomValues({
                  target: {
                    id: "is_gif",
                    value: e,
                  },
                })
              }
            />
          </div>
          {customValue.is_gif && (
            <div>
              <div className="text-muted-foreground">Koszt gifa PLN</div>
              <Input
                id="gif_price"
                placeholder="0"
                onChange={handleChangeCustomValues}
                value={customValue.gif_price}
                className="max-w-[150px]"
              />
            </div>
          )}
          <div className="flex gap-2 items-center">
            <div className="text-muted-foreground">
              Dodawanie nagrań głosowych
            </div>
            <Switch
              id="is_voice"
              checked={customValue.is_voice}
              onCheckedChange={(e) =>
                handleChangeCustomValues({
                  target: {
                    id: "is_voice",
                    value: e,
                  },
                })
              }
            />
          </div>
          {customValue.is_voice && (
            <div>
              <div className="text-muted-foreground">Koszt 1s PLN</div>
              <Input
                id="voice_price"
                placeholder="0"
                onChange={handleChangeCustomValues}
                value={customValue.voice_price}
                className="max-w-[150px]"
              />
            </div>
          )}
        </CardContent>
      </Card>
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
