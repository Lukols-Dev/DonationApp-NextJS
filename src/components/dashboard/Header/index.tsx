import Container from "@/components/Container";

import {
  Bell,
  HandCoins,
  HelpCircle,
  LayoutDashboard,
  MessageCircleMore,
  Rocket,
  Video,
  Wallet,
} from "lucide-react";
import MenuItems from "./menuItems";
import { cn } from "@/lib/utils";
import { generalSans } from "@/fonts";
import Avatar from "@/components/ui/avatar";
import TooltipWrapper from "@/components/ui/tooltip";
import MailTo from "@/components/ui/mail-to";

const font = generalSans.bold.className;

const HeaderDashboard = () => {
  return (
    <header className="w-full bg-transparent absolute z-10 top-0">
      <Container>
        <div className="flex justify-between items-center mt-4 py-2 px-6 bg-white rounded-full">
          <p className={cn(font, "text-2xl text-[#18181A]")}>TIPEY</p>
          <MenuItems menuItems={sidebarMenu} />
          <div>
            <div className="flex items-center gap-5">
              <TooltipWrapper description="Pomoc">
                <MailTo subject="Pomoc" body="Opisz nam swój problem">
                  <HelpCircle className="w-7 h-7 text-[#343C6A] hover:text-blue-700" />
                </MailTo>
              </TooltipWrapper>
              <TooltipWrapper description="Powiadomienia">
                <Bell className="w-7 h-7 cursor-pointer text-[#343C6A] hover:text-blue-700" />
              </TooltipWrapper>
              <Avatar />
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderDashboard;
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
