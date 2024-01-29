import Link from "next/link";

import FooterMenu from "./FooterMenu";
import Logo from "../Header/Logo";
import { menu } from "@/lib/constans";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="text-sm text-neutral-500">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 xl:px-16 md:px-10 sm:px-2 px-4 py-12 text-sm md:flex-row md:gap-12">
        <Logo />
        <FooterMenu menu={menu} />
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            All rights reserved.
          </p>
          <hr className="mx-4 hidden h-4 w-[1px] border-l border-neutral-400 md:inline-block" />
          <p>Designed in Poland</p>
          <p className="md:ml-auto">
            <a href="https://lukols.com" className="text-black">
              Crafted by lukols.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
