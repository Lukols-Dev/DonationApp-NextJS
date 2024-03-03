import { MenuItem, PaymentMethod } from "@/types";

export const MENU: MenuItem[] = [
  {
    title: "NO-CODE SYSTEM",
    path: "/nocode",
  },
  {
    title: "UNIWERSYTET",
    path: "/uniwersytet",
  },
  {
    title: "KONTAKT",
    path: "/kontakt",
  },
];

export const FOOTER_MENU: MenuItem[] = [
  {
    title: "Strona Główna",
    path: "/",
  },
  {
    title: "No-Code System",
    path: "/nocode",
  },
  {
    title: "Uniwersytet",
    path: "/uniwersytet",
  },
  {
    title: "Kontakt",
    path: "/kontakt",
  },
  {
    title: "Regulamin aplikacji",
    path: "/regulamin",
  },
  {
    title: "Polityka prywatności",
    path: "/polityka",
  },
];

export const SOCIAL = [
  {
    title: "linkedin",
    path: "https://www.linkedin.com/in/lukols/",
  },
  {
    title: "github",
    path: "https://github.com/Lukols-Dev",
  },
  {
    title: "instagram",
    path: "https://github.com/Lukols-Dev",
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
