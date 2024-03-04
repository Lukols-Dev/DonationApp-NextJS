import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import getCurrentUser from "@/lib/auth-actions";
import CustomAdminTable from "./table";
import {
  AdminMessagesService,
  AdminPaymentService,
  AdminPayoutService,
  AdminUsersService,
} from "@/lib/firebase/firebase-admin-actions";
import { Banknote, MessageCircleMore } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputFees } from "./components/inputFees";
import { getColumnsUsers } from "./_columns/user";
import { getColumnsPayouts } from "./_columns/payout";
import Link from "next/link";
import { ExportBtn } from "@/components/dashboard/buttons/export-btn";

const AdminPage = async () => {
  const currentUser: {
    uid: string;
    nick: string;
    picture: string;
    role: string;
  } = await getCurrentUser();

  if (currentUser.role !== "admin") return;

  const users: { data: any[]; count: number } =
    await AdminUsersService.getAllUsers("AfaKosCBYUxTnUzrRBz26cvAFfBH7j");

  const revenueSummary: { data: any; count: number } =
    await AdminMessagesService.getAllMessages("AfaKosCBYUxTnUzrRBz26cvAFfBH7j");

  const getAppFee = await AdminPaymentService.getAppFees(
    "AfaKosCBYUxTnUzrRBz26cvAFfBH7j"
  );

  const getPayouts = await AdminPayoutService.getAllUsers(
    "AfaKosCBYUxTnUzrRBz26cvAFfBH7j"
  );

  console.log("getPayouts: ", getPayouts);

  return (
    <Container>
      <span className="text-3xl font-bold">ADMIN</span>
      <section className="w-full h-full gap-4 flex flex-col mt-4">
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4 h-[144px]">
            <CardStatistic
              title="Łączny przychód z aplikacji"
              value={revenueSummary.data.total_fee || 0}
              icon={"PLN"}
            />
            <CardStatistic
              title="Łączny obrót aplikacji"
              value={revenueSummary.data.total_amount || 0}
              icon={"PLN"}
            />
            <CardStatistic
              title="Liczba użytkowników"
              value={users.count || 0}
              icon={"PLN"}
            />
            <CardStatistic
              title="Łączna liczba wiadomości"
              value={revenueSummary.count || 0}
              icon={<MessageCircleMore />}
            />
            <CardStatistic
              title="Oczekuje na wypłatę"
              value={getPayouts.count || 0}
              icon={<Banknote />}
            />
          </div>
        </div>
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4">
            <Card className="max-w-[260px]">
              <CardHeader>
                <CardTitle className="text-[#343C6A]">
                  Ustaw prowizje aplikacji
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-xl font-bold text-zinc-950">
                  Aktualna: {getAppFee.app_fee || 0}%
                </p>
                <p className="text-sm font-normal text-[#B1B1B1]">
                  Prowizja od kadej transakcji
                </p>
                <InputFees id="app_fee" />
              </CardContent>
            </Card>
            <Card className="max-w-[260px]">
              <CardHeader>
                <CardTitle className="text-[#343C6A]">
                  Ustaw prowizje od GIF
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-xl font-bold text-zinc-950">
                  Aktualna: {getAppFee.custom_elements["gif"] || 0}%
                </p>
                <p className="text-sm font-normal text-[#B1B1B1]">
                  Prowizja od kadej transakcji
                </p>
                <InputFees id="gif" />
              </CardContent>
            </Card>
            <Card className="max-w-[260px]">
              <CardHeader>
                <CardTitle className="text-[#343C6A]">
                  Ustaw prowizje od nagrania
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-xl font-bold text-zinc-950">
                  Aktualna: {getAppFee.custom_elements["voice"] || 0}%
                </p>
                <p className="text-sm font-normal text-[#B1B1B1]">
                  Prowizja od kadej transakcji
                </p>
                <InputFees id="voice" />
              </CardContent>
            </Card>
            <Card className="max-w-[260px]">
              <CardHeader>
                <CardTitle className="text-[#343C6A]">
                  Linki do stron wypłat
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-4 flex flex-col gap-2">
                <Link
                  href={"https://dashboard.stripe.com/balance/overview"}
                  className="text-xl font-bold text-zinc-950"
                >
                  {">>"} Stripe
                </Link>
                <Link
                  href={"https://www.paypal.com/mep/dashboard"}
                  className="text-xl font-bold text-zinc-950"
                >
                  {">>"} Paypal
                </Link>
                <Link
                  href={"https://panel.cashbill.pl/dashboard"}
                  className="text-xl font-bold text-zinc-950"
                >
                  {">>"} Cashbill
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        <CustomAdminTable data={users.data} type="users" title="Konta" />
        <CustomAdminTable
          data={getPayouts.data}
          type="payout"
          title="Prośby o wypłatę"
        />
      </section>
    </Container>
  );
};

export default AdminPage;
