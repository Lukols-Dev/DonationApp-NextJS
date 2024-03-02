import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import getCurrentUser from "@/lib/auth-actions";
import CustomAdminTable from "./table";
import {
  AdminMessagesService,
  AdminUsersService,
} from "@/lib/firebase/firebase-admin-actions";
import { MessageCircleMore } from "lucide-react";

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

  //   console.log("users: ", users);
  //   console.log("revenueSummary: ", revenueSummary);

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
          </div>
        </div>
        <CustomAdminTable data={users.data} />
      </section>
    </Container>
  );
};

export default AdminPage;
