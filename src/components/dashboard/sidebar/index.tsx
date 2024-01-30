import {
  HandCoins,
  LayoutDashboard,
  MessageCircleMore,
  Rocket,
  Video,
  Wallet,
} from "lucide-react";
import MenuItems from "./menuItems";

const Sidebar = () => {
  return (
    <MenuItems
      defaultOpen={true}
      // sidebarLogo={sideBarLogo}
      sidebarOpt={sidebarMenu}
      // subAccounts={subaccounts}
      // user={user}
    />
  );
};

export default Sidebar;

const sidebarMenu = [
  {
    id: "1",
    name: "Dashboard",
    link: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: "2",
    name: "Wiadomości",
    link: "/message",
    icon: MessageCircleMore,
  },
  {
    id: "3",
    name: "Portfel",
    link: "/wallet",
    icon: Wallet,
  },
  {
    id: "4",
    name: "Monetyzacja",
    link: "/monetyzation",
    icon: HandCoins,
  },
  {
    id: "5",
    name: "Konfigurator",
    link: "/configurator",
    icon: Video,
  },
  {
    id: "6",
    name: "Cele",
    link: "/cele",
    icon: Rocket,
  },
];
