import { MenuItem } from "@/types/layout";
import Link from "next/link";

const FooterMenuItem = ({ item }: { item: MenuItem }) => {
  return (
    <li>
      <Link
        href={item.path}
        className={
          "block p-2 text-lg underline-offset-4 text-black hover:underline md:inline-block md:text-sm"
        }
      >
        {item.title}
      </Link>
    </li>
  );
};

export default function FooterMenu({ menu }: { menu: MenuItem[] }) {
  if (!menu.length) return null;

  return (
    <nav>
      <ul>
        {menu.map((item: MenuItem) => {
          return <FooterMenuItem key={item.title} item={item} />;
        })}
      </ul>
    </nav>
  );
}
