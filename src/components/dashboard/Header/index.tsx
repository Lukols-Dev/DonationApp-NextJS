import Container from "@/components/Container";
import { Bell, HelpCircle } from "lucide-react";
import MenuItems from "./menuItems";
import { cn } from "@/lib/utils";
import { generalSans } from "@/fonts";
import TooltipWrapper from "@/components/ui/tooltip";
import MailTo from "@/components/ui/mail-to";
import AvatarDropDown from "@/components/common/Buttons/AvatarDropdown";
import getCurrentUser from "@/lib/auth-actions";
import NotificationBtn from "../buttons/notification-dropdown";
import HamburgerBtn from "../buttons/hamburger-btn";

const font = generalSans.bold.className;

interface Props {
  uid: string;
  picture: string;
  role: string;
}

const HeaderDashboard = ({ uid, role, picture }: Props) => {
  return (
    <header className="w-full bg-transparent">
      <Container>
        <div className="flex justify-between items-center mt-4 py-2 px-6 bg-white rounded-full">
          <p className={cn(font, "text-2xl text-[#18181A] p-4")}>TIPEY</p>
          <div className="hidden md:flex">
            <MenuItems role={role} />
          </div>
          <div className="hidden md:flex items-center gap-5">
            <TooltipWrapper description="Pomoc">
              <MailTo subject="Pomoc" body="Opisz nam swój problem">
                <HelpCircle className="w-7 h-7 text-[#343C6A] hover:text-blue-700" />
              </MailTo>
            </TooltipWrapper>
            <NotificationBtn uid={uid} />
            <AvatarDropDown src={picture} />
          </div>
          <div className="flex items-center gap-5 md:hidden">
            <HamburgerBtn role={role} />
            <AvatarDropDown src={picture} />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderDashboard;
