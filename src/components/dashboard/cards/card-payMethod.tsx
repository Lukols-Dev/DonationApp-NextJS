import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  value: number;
  descValue: number;
  icon: string;
}

const CardPayMethod = ({ value, descValue, icon }: Props) => {
  return (
    <Card className="h-[100px] w-[330px]">
      <CardContent>
        <div className="w-full h-full flex justify-between">
          <div className="w-20 relative">
            <Image
              alt="Pyment Blik"
              fill
              className="object-contain object-center"
              src={icon}
            />
          </div>
          <div className="flex flex-col justify-center items-end">
            <p className="text-2xl font-bold">{value || 0}</p>
            <p className="text-[#B1B1B1] text-sm">
              zarobiłeś: {descValue || 0} PLN
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPayMethod;
