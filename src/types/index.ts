import { ReactNode } from "react";

export type MenuItem = {
  title: string;
  path: string;
};

export type DropDownMenuItem = {
  title: string;
  path?: string;
  element?: ReactNode;
};

export type News = {
  title: string;
  description: string;
  data: string;
};

export type PaymentMethod = {
  name: string;
  icon: string;
  isActive: boolean;
};

export type PaymentPageData = {
  profile_img?: string;
  id: string;
  uid: string;
  description?: string;
  nick: string;
  payment_methods: string[];
  socials: Record<string, string>;
};
