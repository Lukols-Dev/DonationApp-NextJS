import Avatar from "@/components/ui/avatar";
import DropDownWrapper from "@/components/ui/dropdown-menu";
import { DropDownMenuItem } from "@/types";
import LogOutBtn from "./LogoutBtn";

interface Props {
  src: string;
}

const AvatarDropDown = ({ src }: Props) => {
  return (
    <DropDownWrapper items={items}>
      <Avatar src={src} />
    </DropDownWrapper>
  );
};

export default AvatarDropDown;

const items: DropDownMenuItem[] = [
  {
    title: "Ustawienia konta",
    path: "/user/settings",
  },
  {
    title: "Zostań partnerem",
  },
  {
    title: "Wyloguj się",
    element: <LogOutBtn />,
  },
];
