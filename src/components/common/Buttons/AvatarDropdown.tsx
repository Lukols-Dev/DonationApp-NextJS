import Avatar from "@/components/ui/avatar";
import DropDownWrapper from "@/components/ui/dropdown-menu";
import { DropDownMenuItem } from "@/types";
import LogOutBtn from "./LogoutBtn";

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
    element: <LogOutBtn />,
  },
];
