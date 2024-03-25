import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import CardPayMethod from "@/components/dashboard/cards/card-payMethod";
import {
  MessagesService,
  PaymentService,
} from "@/lib/firebase/firebase-actions";
import {
  calculateIncomeSummary,
  calculateTotalPayout,
  formatNumber,
} from "@/lib/utils";
import getCurrentUser from "@/lib/auth-actions";
import { Card } from "@/components/ui/card";
import CardPayout from "@/components/dashboard/cards/card-payout";
import { AdminPayoutService } from "@/lib/firebase/firebase-admin-actions";
import CustomWalletTable from "./table";

const WalletPage = async () => {
  let summary: any;
  const currentUser: { uid: string; email: string } = await getCurrentUser();

  if (!currentUser) return;

  const messages: { count: number; messages: any[] } =
    await MessagesService.getAllMessages(currentUser.uid);
  const payments: { count: number; payments: any[] } =
    await PaymentService.getAllPayments(currentUser.uid);

  if (messages.messages.length > 0) {
    summary = calculateIncomeSummary({ messages: messages.messages });
  } else {
    summary = {
      monthly: 0,
      yearly: 0,
    };
  }

  const getPayouts = await AdminPayoutService.getAllUsers(
    "AfaKosCBYUxTnUzrRBz26cvAFfBH7j"
  );
  let filteredPayouts: any[] = [];

  if (getPayouts && getPayouts.data) {
    filteredPayouts = getPayouts.data.filter(
      (payout: any) => payout.uid === currentUser.uid
    );
  }
  let totalPayout = 0;
  if (payments && payments.payments.length > 0) {
    totalPayout = calculateTotalPayout(payments.payments);
  }

  return (
    <Container>
      <section className="w-full h-full gap-4 flex flex-col">
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4 h-[144px]">
            <CardStatistic
              title="Aktualny przychód"
              value={formatNumber(summary.yearly)}
              icon="PLN"
            />
            <CardStatistic
              title="W tym miesiącu"
              value={formatNumber(summary.monthly)}
              valueDesc={
                summary.percentageChange
                  ? `${summary.percentageChange} ostatni miesiąc`
                  : ""
              }
              icon="PLN"
            />
            <CardPayout
              title="Do wypłaty"
              value={totalPayout.toFixed(2)}
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
          <CustomWalletTable
            data={filteredPayouts}
            type="payout"
            title="Historia wypłat"
          />
        </div>
      </section>
    </Container>
  );
};

export default WalletPage;

const exportCol = [
  {
    accessorKey: "mid",
    header: "id",
  },
  {
    accessorKey: "description",
    header: "Treść",
  },
  {
    accessorKey: "create_at",
    header: "Data",
  },
  {
    accessorKey: "nick",
    header: "Nick",
  },
  {
    accessorKey: "payment_method",
    header: "Metoda",
  },
  {
    accessorKey: "amount",
    header: "Ktowa",
  },
];
