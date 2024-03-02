import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardLegend from "@/components/dashboard/cards/card-legend";
import CardTable from "@/components/dashboard/cards/card-table";
import { MessagesService } from "@/lib/firebase/firebase-actions";
import { getColumnsMessage } from "@/components/dashboard/columns/columns-message";
import getCurrentUser from "@/lib/auth-actions";
import { Clock, MessageCircleMore } from "lucide-react";
import CustomTable from "./table";

const MessagesPage = async () => {
  const currentUser: { uid: string } = await getCurrentUser();
  const messages: { count: number; messages: any[] } =
    await MessagesService.getAllMessages(currentUser.uid);

  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4 h-[144px]">
            <CardStatistic
              title="Liczba wiadomości"
              value={messages.count || 0}
              icon={<MessageCircleMore />}
            />
            <CardStatistic title="W kolejce" value="999" icon={<Clock />} />
            <CardLegend />
          </div>
        </div>
        <CustomTable uid={currentUser.uid} messages={messages} />
      </section>
    </Container>
  );
};

export default MessagesPage;
