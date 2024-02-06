import HeaderDashboard from "@/components/dashboard/Header";

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-100">
      <HeaderDashboard />
      <main className="w-full h-full py-6 overflow-y-auto pb-40">
        {children}
      </main>
    </div>
  );
};

export default UserPageLayout;
