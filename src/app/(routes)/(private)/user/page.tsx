import CardImage from "@/components/dashboard/cards/card-image";
import CardNews from "@/components/dashboard/cards/card-news";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardTable from "@/components/dashboard/cards/card-table";
import { columnsLastMessage } from "@/components/dashboard/columns/columns-last-message";
import Avatar from "@/components/ui/avatar";
import BarChartComponent from "@/components/ui/barchart";
import { Card, CardContent } from "@/components/ui/card";
import InputCopy from "@/components/ui/input-copy";
import {
  MessagesService,
  NewsService,
  PaymentService,
} from "@/lib/firebase/firebase-actions";
import {
  calculateIncomeSummary,
  formatNumber,
  formatTimestamp,
} from "@/lib/utils";

const UserPage = async () => {
  let summary: any;
  let barchatSummary: any;
  const url = await PaymentService.getCheckout();
  const news = await NewsService.getNews();
  const messages: { count: number; messages: any[] } =
    await MessagesService.getAllMessages();

  if (messages.messages.length > 0) {
    summary = calculateIncomeSummary({ messages: messages.messages });
    barchatSummary = barchartData(messages.messages);
  }

  return (
    <section className="flex flex-col w-full items-center justify-center px-4">
      <div className="w-full flex flex-col  item-center justify-center gap-4 lg:flex-row">
        <div className="max-w-[900px] w-full h-full flex flex-col gap-4 lg:w-2/3">
          <div className="w-full h-full overflow-x-auto">
            <div className="flex gap-4 w-full h-[140px]">
              <CardStatistic
                title="Aktualny przychód"
                value={formatNumber(summary.monthly)}
                valueDesc="+20.1% ostatni miesiąc"
                icon="PLN"
              />
              <CardImage />
            </div>
          </div>
          <div className="flex w-full h-[330px] bg-white p-6 border rounded-lg shadow-sm">
            <BarChartComponent
              data={barchatSummary}
              axis={{ x: "name", y: "total" }}
            />
          </div>
          <div>
            <p className="my-4 text-[#333B69] font-semibold">Ostatnie Wpłaty</p>
            <CardTable
              data={messages.messages}
              columns={columnsLastMessage}
              displayHeader
              displayFooter
            />
          </div>
        </div>
        <div className="w-full lg:w-[350px] h-full flex flex-col gap-4">
          <div className="hidden lg:flex w-full h-[300px]">
            <Card>
              <CardContent className="h-full">
                <div className="w-full h-full flex flex-col items-center justify-between">
                  <div className="h-24 w-24">
                    <Avatar fill />
                  </div>
                  <p className="text-2xl text-[#343C6A]">Jan Nowak</p>
                  <InputCopy
                    value={`${process.env.NEXT_PUBLIC_URL}/payment/${url}`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="flex w-full h-full">
            <CardNews title="Aktualności Tipey" items={news} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserPage;

const barchartData = (payments: any) => {
  const monthlyTotals = Array(12).fill(0);

  payments.forEach((payment: any) => {
    const date = new Date(payment.create_at.seconds * 1000);
    const month = date.getMonth();
    monthlyTotals[month] += payment.amount;
  });

  return monthlyTotals.map((total, index) => ({
    name:
      (index + 1).toString().padStart(2, "0") + "." + new Date().getFullYear(),
    total,
  }));
};
