import { MenuItem, PaymentMethod } from "@/types";

export const MENU: MenuItem[] = [
  {
    title: "NO-CODE SYSTEM",
    path: "/",
  },
  {
    title: "UNIWERSYTET",
    path: "/",
  },
  {
    title: "KONTAKT",
    path: "/",
  },
];

export const FOOTER_MENU: MenuItem[] = [
  {
    title: "Strona Główna",
    path: "/",
  },
  {
    title: "No-Code System",
    path: "/",
  },
  {
    title: "Uniwersytet",
    path: "/",
  },
  {
    title: "Kontakt",
    path: "/",
  },
  {
    title: "Regulamin aplikacji",
    path: "/docs/Regulamin.pdf",
  },
  {
    title: "Polityka prywatności",
    path: "/docs/Polityka.pdf",
  },
];

export const SOCIAL = [
  {
    title: "linkedin",
    path: "/",
  },
  {
    title: "github",
    path: "/",
  },
  {
    title: "instagram",
    path: "/",
  },
];

export const defaultStyles: React.CSSProperties = {
  backgroundPosition: "center",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",
  textAlign: "left",
  opacity: "100%",
};

export const PAYMENT_METHODS: PaymentMethod[] = [
  { name: "blik", icon: "/assets/blik-icon.svg", isActive: false },
  { name: "p24", icon: "/assets/p24-icon.svg", isActive: false },
  { name: "card", icon: "/assets/card-icon.svg", isActive: false },
  { name: "paypal", icon: "/assets/paypal-icon.svg", isActive: false },
  {
    name: "paysafecard",
    icon: "/assets/paysafecard-icon.svg",
    isActive: false,
  },
  { name: "smspremium", icon: "/assets/smspremium-icon.svg", isActive: false },
];
