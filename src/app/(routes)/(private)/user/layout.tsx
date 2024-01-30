import HeaderDashboard from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/sidebar";

const UserPageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-screen h-screen flex">
      <Sidebar />
      <main className="w-full h-full">
        <HeaderDashboard />
        {children}
      </main>
    </div>
  );
};

export default UserPageLayout;
