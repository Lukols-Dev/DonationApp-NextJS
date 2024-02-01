import HeaderDashboard from "@/components/dashboard/Header";

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-slate-100">
      <HeaderDashboard />
      <main className="w-full h-full py-4 px-6 overflow-auto">{children}</main>
    </div>
  );
};

export default UserPageLayout;
