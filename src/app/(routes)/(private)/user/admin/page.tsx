import Container from "@/components/Container";
import CardStatistic from "@/components/dashboard/cards/card-statistic";
import getCurrentUser from "@/lib/auth-actions";
import CustomAdminTable from "./table";
import { AdminUsersService } from "@/lib/firebase/firebase-admin-actions";

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

  return (
    <Container>
      <span className="text-3xl font-bold">ADMIN</span>
      <section className="w-full h-full gap-4 flex flex-col mt-4">
        <div className="w-full h-full overflow-x-auto">
          <div className="flex gap-4 h-[144px]">
            <CardStatistic
              title="Łączny przychód z aplikacji"
              value={users.count || 0}
              icon={"PLN"}
            />
            <CardStatistic
              title="Łączny obrót aplikacji"
              value={users.count || 0}
              icon={"PLN"}
            />
            <CardStatistic
              title="Liczba użytkowników"
              value={users.count || 0}
              icon={"PLN"}
            />
          </div>
        </div>
        <CustomAdminTable uid={currentUser.uid} data={users.data} />
      </section>
    </Container>
  );
};

export default AdminPage;
