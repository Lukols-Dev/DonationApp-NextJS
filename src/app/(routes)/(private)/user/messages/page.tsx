import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardLegend from "@/components/dashboard/cards/card-legend";
import CardTable from "@/components/dashboard/cards/card-table";
import { MessagesService } from "@/lib/firebase/firebase-actions";
import { columnsMessage } from "@/components/dashboard/columns/columns-message";

const MessagesPage = async () => {
  const messages: { count: number; messages: any[] } =
    await MessagesService.getAllMessages();

  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4 h-[144px]">
            <CardStatistic
              title="Liczba wiadomości"
              value={messages.count || 0}
              icon="?"
            />
            <CardStatistic title="W kolejce" value="999" icon="?" />
            <CardLegend />
          </div>
        </div>
        <div className="w-full h-full">
          <CardTable data={messages.messages} columns={columnsMessage} />
        </div>
      </section>
    </Container>
  );
};

export default MessagesPage;
