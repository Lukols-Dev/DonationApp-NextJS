import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardTable from "@/components/dashboard/cards/card-table";
import CardPayMethod from "@/components/dashboard/cards/card-payMethod";
import {
  MessagesService,
  PaymentService,
} from "@/lib/firebase/firebase-actions";
import { columnsWallet } from "@/components/dashboard/columns/columns-wallet";
import { calculateIncomeSummary, formatNumber } from "@/lib/utils";

const WalletPage = async () => {
  let summary: any;
  const messages: { count: number; messages: any[] } =
    await MessagesService.getAllMessages();
  const payments: { count: number; payments: any[] } =
    await PaymentService.getAllPayments();

  if (messages.messages.length > 0) {
    summary = calculateIncomeSummary({ messages: messages.messages });
  }

  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4 h-[144px]">
            <CardStatistic
              title="Aktualny przychód"
              value={formatNumber(summary.monthly)}
              valueDesc="+20.1% ostatni miesiąc"
              icon="PLN"
            />
            <CardStatistic
              title="W tym roku"
              value={formatNumber(summary.yearly)}
              icon="PLN"
            />
            <CardStatistic title="Do wypłaty" value="45,231.89" icon="PLN" />
          </div>
        </div>
        <div className="flex flex-col text-2xl text-[#333B69] my-2 font-semibold">
          Metody płatności
          <span className="text-sm">
            Sprawdź jakiej metody najczęściej użyto
          </span>
        </div>
        <div className="w-full flex gap-4 overflow-x-auto">
          <div className="flex gap-4">
            {payments.payments.map((item: any, index: any) => (
              <CardPayMethod
                key={index}
                icon={`/assets/${item.name}-icon.svg`}
                value={item.used}
                descValue={item.current_amount}
              />
            ))}
          </div>
        </div>
        <div className="w-full h-full">
          <div className="flex gap-2 text-2xl text-[#333B69] my-2 font-semibold">
            <p>Historia płatności</p>
            <button>Eksportuj tabelę</button>
          </div>
          <CardTable data={messages.messages} columns={columnsWallet} />
        </div>
      </section>
    </Container>
  );
};

export default WalletPage;
