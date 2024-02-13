"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogOutBtn = () => {
  return (
    <button
      className="flex gap-2 items-center justify-center"
      onClick={() => signOut()}
    >
      <LogOut className="w-4 h-4 rotate-180" /> Wyloguj się
    </button>
  );
};

export default LogOutBtn;
