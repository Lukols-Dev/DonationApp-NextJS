import { Card, CardContent } from "@/components/ui/card";
import { Clock, Eye, Hand, Pencil } from "lucide-react";

const CardLegend = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col justify-between">
          <div className="flex gap-3 text-sm items-center">
            <Eye className="w-4 h-4" /> wyświetlona
          </div>
          <div className="flex gap-3 text-sm items-center">
            <Clock className="w-4 h-4" /> w kolejce
          </div>
          <div className="flex gap-3 text-sm items-center blur-[2px]">
            <Pencil className="w-4 h-4" /> moderacja
          </div>
          <div className="flex gap-3 text-sm items-center blur-[2px]">
            <Hand className="w-4 h-4" /> zablokowana
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardLegend;
