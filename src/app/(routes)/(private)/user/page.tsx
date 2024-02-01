import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardImage from "@/components/dashboard/cards/card-image";
import { MessageCircleMore } from "lucide-react";
import BarChart from "@/components/barChart";
import { Card } from "@/components/ui/card";

const UserPage = () => {
  return (
    <Container>
      <section className="w-full h-full grid grid-rows-6 grid-flow-col gap-4">
        <div className="flex row-span-1 space-x-4">
          <CardStatistic
            title="Aktualny przychód"
            value="45,231.89"
            valueDesc="+20.1% ostatni miesiąc"
            icon="PLN"
          />
          <CardStatistic
            title="Liczba wiadomości"
            value="45,231.89"
            icon={<MessageCircleMore className="text-[#B1B1B1]" />}
          />
          <CardImage />
        </div>
        <div className="w-full h-full row-span-3">
          <CardStatistic title="Aktualny przychód" />
        </div>
        <div className="w-full h-full row-span-2">
          <CardStatistic title="Aktualny przychód" />
        </div>
        <div className="w-full h-full  row-span-2">
          <CardStatistic title="Aktualny przychód" />
        </div>
        <div className="w-full h-full row-span-4">
          <CardStatistic title="Aktualny przychód" />
        </div>
      </section>
    </Container>
  );
};

export default UserPage;
