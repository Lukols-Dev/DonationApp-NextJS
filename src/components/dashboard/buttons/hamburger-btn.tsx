"use client";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Crown,
  HandCoins,
  LayoutDashboard,
  Menu,
  MessageCircleMore,
  Video,
  Wallet,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { generalSans } from "@/fonts";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  role: string;
}

const HamburgerBtn = ({ role }: Props) => {
  const [open, setOpen] = useState<boolean>(false);

  const filteredMenuItems = menuItems.filter(
    (item) => role === "admin" || item.id !== "6"
  );

  useEffect(() => {
    const handleResize = () => {
      setOpen(false);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="relative" onClick={() => setOpen((prev) => !prev)}>
        {!open && (
          <Menu className="w-7 h-7 absolute -top-3 -left-6 z-[100] cursor-pointer text-[#343C6A]" />
        )}
      </div>
      <Sheet open={open} modal={false}>
        <SheetContent
          side="right"
          className="w-[100px] z-[90] shadow-none  p-0 focus:border-none transition-all overflow-hidden"
        >
          <X
            className="w-7 h-7 absolute top-4 left-4 cursor-pointer text-[#343C6A]"
            onClick={() => setOpen((prev) => !prev)}
          />
          <nav className="mt-28 flex items-center justify-center">
            <ul className="text-sm flex flex-col items-center">
              {filteredMenuItems.map((item: any) => (
                <Item key={item.id} item={item} />
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default HamburgerBtn;

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
    link: "/user/monetisation",
    icon: HandCoins,
  },
  {
    id: "5",
    name: "Konfigurator",
    link: "/user/configurator",
    icon: Video,
  },
  {
    id: "6",
    name: "Admin Portalu",
    link: "/user/admin",
    icon: Crown,
  },
];
