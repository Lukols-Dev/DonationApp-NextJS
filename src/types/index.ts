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
  create_at: { seconds: number; nanoseconds: number };
};

export type PaymentMethod = {
  name: string;
  icon: string;
  isActive: boolean;
};

export type PaymentPageData = {
  picture?: string;
  id: string;
  uid: string;
  description?: string;
  nick: string;
  payment_methods: string[];
  socials: Record<string, string>;
};
