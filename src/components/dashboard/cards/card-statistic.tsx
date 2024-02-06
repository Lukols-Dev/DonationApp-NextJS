import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface Props {
  title?: string;
  icon?: string | ReactNode;
  value?: string;
  valueDesc?: string;
}

const CardStatistic = ({ title, icon, value, valueDesc }: Props) => {
  return (
    <Card className="min-w-[260px]">
      <CardHeader>
        <CardTitle className="text-[#343C6A]">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-2xl font-bold text-zinc-950">{value}</p>
        <p className="text-sm font-normal text-[#B1B1B1]">{valueDesc}</p>
        <span className="absolute top-4 right-6">{icon}</span>
      </CardContent>
    </Card>
  );
};

export default CardStatistic;
