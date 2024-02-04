import Container from "@/components/Container";
import { Bell, HelpCircle } from "lucide-react";
import MenuItems from "./menuItems";
import { cn } from "@/lib/utils";
import { generalSans } from "@/fonts";
import TooltipWrapper from "@/components/ui/tooltip";
import MailTo from "@/components/ui/mail-to";
import AvatarDropDown from "@/components/common/Buttons/AvatarDropdown";

const font = generalSans.bold.className;

const HeaderDashboard = () => {
  return (
    <header className="w-full bg-transparent">
      <Container>
        <div className="flex justify-between items-center mt-4 py-2 px-6 bg-white rounded-full">
          <p className={cn(font, "text-2xl text-[#18181A]")}>TIPEY</p>
          <MenuItems />
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
              <AvatarDropDown />
              {/* <Avatar /> */}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default HeaderDashboard;
