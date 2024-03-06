import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";

const HomePageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="w-screen h-screen fixed z-[100] bg-black text-center font-2xl flex items-center justify-center text-white">
        Prace serwisowe...
      </div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default HomePageLayout;
