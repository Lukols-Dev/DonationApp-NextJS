import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardLegend from "@/components/dashboard/cards/card-legend";
import CardTable from "@/components/dashboard/cards/card-table";
import { MessagesService, QueueService } from "@/lib/firebase/firebase-actions";
import { getColumnsMessage } from "@/components/dashboard/columns/columns-message";
import getCurrentUser from "@/lib/auth-actions";
import { Clock, MessageCircleMore } from "lucide-react";
import CustomTable from "./table";
import Link from "next/link";

const MessagesPage = async () => {
  const currentUser: { uid: string } = await getCurrentUser();

  if (!currentUser) return;

  const messages: { count: number; messages: any[] } =
    await MessagesService.getAllMessages(currentUser.uid);
  const queue: { count: number; notifications: any[] } =
    await QueueService.getQueue(currentUser.uid);

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
            <CardStatistic
              title="W kolejce"
              value={queue.count}
              icon={<Clock />}
            />
            <CardLegend />
          </div>
        </div>
        <Link
          href={`${process.env.NEXT_PUBLIC_URL}/widget/${currentUser.uid}/controller`}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[250px] flex items-center justify-center px-4 py-2 rounded-md border-2 border-[#1814F3] text-[#1814F3] hover:text-white hover:bg-[#1814F3] font-semibold text-lg"
        >
          Kontroler Widgetu
        </Link>
        <CustomTable uid={currentUser.uid} messages={messages} />
      </section>
    </Container>
  );
};

export default MessagesPage;
