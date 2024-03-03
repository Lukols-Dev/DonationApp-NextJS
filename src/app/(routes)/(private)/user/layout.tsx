import { BlockAccInfo } from "@/components/blockedAcc";
import HeaderDashboard from "@/components/dashboard/Header";
import getCurrentUser from "@/lib/auth-actions";

const UserPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser: { uid: string; role: string; picture: string } =
    await getCurrentUser();
  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-100">
      <HeaderDashboard
        uid={currentUser.uid}
        picture={currentUser.picture}
        role={currentUser.role}
      />
      <main className="w-full h-full py-6 overflow-y-auto pb-40">
        {children}
      </main>
      <BlockAccInfo />
    </div>
  );
};

export default UserPageLayout;
