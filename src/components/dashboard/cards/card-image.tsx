import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const CardImage = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex gap-4 justify-between">
          <div className="max-w-[135px] flex flex-col gap-2">
            <p className="text-xl font-bold text-[#343C6A]">
              Rozwijamy się dla Ciebie
            </p>
            <p className="text-sm font-normal text-[#343C6A]">
              Wkrótce otrzymasz jeszcze więcej
            </p>
          </div>
          <div className="w-[180px] h-[100px] relative">
            <Image
              src="/assets/image-card.png"
              alt="Card Image"
              fill
              className="rounded-xl object-cover"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardImage;
