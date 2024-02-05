import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardImage from "@/components/dashboard/cards/card-image";
import { Card, CardContent } from "@/components/ui/card";
import CardNews from "@/components/dashboard/cards/card-news";
import Avatar from "@/components/ui/avatar";
import InputCopy from "@/components/ui/input-copy";
import { Clock, Eye, Hand, Pencil } from "lucide-react";
import CardLegend from "@/components/dashboard/cards/card-legend";
import CardTable from "@/components/dashboard/cards/card-table";

const MessagesPage = () => {
  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="flex gap-4 h-[144px]">
          <CardStatistic title="Liczba wiadomości" value="999" icon="?" />
          <CardStatistic title="W kolejce" value="999" icon="?" />
          <CardLegend />
        </div>
        <div className="w-full h-full">
          <CardTable />
        </div>
      </section>
    </Container>
  );
};

export default MessagesPage;
