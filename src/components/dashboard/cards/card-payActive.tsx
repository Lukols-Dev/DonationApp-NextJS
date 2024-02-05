import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import Image from "next/image";

interface Props {
  icon: string;
  onClick?: () => void;
}

const CardPayActive = ({ icon, onClick }: Props) => {
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
          <p>Aktywne</p>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPayActive;
