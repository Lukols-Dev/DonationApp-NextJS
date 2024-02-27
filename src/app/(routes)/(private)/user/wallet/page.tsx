import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardTable from "@/components/dashboard/cards/card-table";
import CardPayMethod from "@/components/dashboard/cards/card-payMethod";
import {
  MessagesService,
  PaymentService,
} from "@/lib/firebase/firebase-actions";
import { columnsWallet } from "@/components/dashboard/columns/columns-wallet";
import {
  calculateIncomeSummary,
  calculateTotalPayout,
  formatNumber,
} from "@/lib/utils";
import getCurrentUser from "@/lib/auth-actions";
import { Card } from "@/components/ui/card";
import CardPayout from "@/components/dashboard/cards/card-payout";

const WalletPage = async () => {
  let summary: any;
  const currentUser: { uid: string; email: string } = await getCurrentUser();
  const messages: { count: number; messages: any[] } =
    await MessagesService.getAllMessages(currentUser.uid);
  const payments: { count: number; payments: any[] } =
    await PaymentService.getAllPayments(currentUser.uid);

  if (messages.messages.length > 0) {
    summary = calculateIncomeSummary({ messages: messages.messages });
    console.log("summ: ", summary);
  } else {
    summary = {
      monthly: 0,
      yearly: 0,
    };
  }

  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4 h-[144px]">
            <CardStatistic
              title="Aktualny przychód"
              value={formatNumber(summary.monthly)}
              valueDesc={`${summary.percentageChange} ostatni miesiąc`}
              icon="PLN"
            />
            <CardStatistic
              title="W tym roku"
              value={formatNumber(summary.yearly)}
              icon="PLN"
            />
            <CardPayout
              title="Do wypłaty"
              value={calculateTotalPayout(payments.payments)}
              icon="PLN"
              payments={payments}
              user={currentUser}
            />
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
            {payments.count > 0 ? (
              payments.payments.map((item: any, index: any) => (
                <CardPayMethod
                  key={index}
                  icon={`/assets/${item.name}-icon.svg`}
                  value={item.used}
                  descValue={item.current_amount}
                />
              ))
            ) : (
              <Card>
                <div className="w-screen max-w-screen-md h-[100px] flex items-center justify-center">
                  Aktualnie nie wybrałeś żadnych metod płatności
                </div>
              </Card>
            )}
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
