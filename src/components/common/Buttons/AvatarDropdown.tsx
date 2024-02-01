import Avatar from "@/components/ui/avatar";
import DropDownWrapper from "@/components/ui/dropdown-menu";
import { DropDownMenuItem } from "@/types";
import { LogOut } from "lucide-react";

const AvatarDropDown = () => {
  return (
    <DropDownWrapper items={items}>
      <Avatar />
    </DropDownWrapper>
  );
};

export default AvatarDropDown;

const items: DropDownMenuItem[] = [
  {
    title: "Ustawienia konta",
    path: "/account",
  },
  {
    title: "Zostań partnerem",
  },
  {
    title: "Wyloguj się",
    element: (
      <button className="flex gap-2 items-center justify-center">
        <LogOut className="w-4 h-4 rotate-180" /> Wyloguj się
      </button>
    ),
  },
];
