import "../styles/globals.css";

import LoginModal from "@/components/modals/LoginModal";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/providers/AuthProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Tipey - Strona do donejtów. Przyjmuj i wysyłaj donejty na streamie. Dołącz do społeczności stream!",
  description:
    "Witaj na naszej platformie do donejtów! Wspieraj ulubione streamy - na żywo, po przez darowizny dla tworców, lub przyjmuj płatności od swoich widzów na swoim streamie. Dołącz do naszej społeczności i uczestnicz w emocjonujących transmisjach na żywo, obsługując płatności za pomocą najlepszej platformy donejtowej.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LoginModal />
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
