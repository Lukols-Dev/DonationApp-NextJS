import HeaderDashboard from "@/components/dashboard/Header";

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden bg-slate-100">
      <HeaderDashboard />
      <main className="w-full h-full">{children}</main>
    </div>
  );
};

export default UserPageLayout;
