"use client";

import {
  HandCoins,
  LayoutDashboard,
  MessageCircleMore,
  Rocket,
  Video,
  Wallet,
} from "lucide-react";
import TooltipWrapper from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { generalSans } from "@/fonts";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const MenuItems = async () => {
  return (
    <nav className="flex items-center">
      <ul className="text-sm flex items-center">
        {menuItems.map((item: any) => (
          <Item item={item} />
        ))}
      </ul>
    </nav>
  );
};

export default MenuItems;

const Item = ({ item }: { item: any }) => {
  const pathname = usePathname();
  const [isActive, setActive] = useState<boolean>(false);

  const font = generalSans.bold.className;

  const DynamicTag = isActive ? "p" : Link;

  useEffect(() => {
    setActive(pathname === item.link);
  }, [pathname]);

  return (
    <li
      key={item.title}
      className="group flex flex-col relative  bg-transparent"
    >
      <TooltipWrapper description={item.name}>
        <DynamicTag
          href={item.link}
          className={cn(
            font,
            "text-[#B1B1B1] text-base p-4 z-10 group-hover:text-blue-700",
            { "text-blue-700": isActive }
          )}
        >
          <item.icon className="w-7 h-7" />
        </DynamicTag>
      </TooltipWrapper>
      <span
        className={cn(
          "w-[80%] h-[80%] absolute top-1/2 left-1/2  z-0 transform scale-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-custom bg-[#cee2fe] rounded-md group-hover:scale-100",
          { "scale-100": isActive }
        )}
      />
    </li>
  );
};

const menuItems = [
  {
    id: "1",
    name: "Dashboard",
    link: "/user",
    icon: LayoutDashboard,
  },
  {
    id: "2",
    name: "Wiadomości",
    link: "/user/messages",
    icon: MessageCircleMore,
  },
  {
    id: "3",
    name: "Portfel",
    link: "/user/wallet",
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
