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

export type PaymentMethodFees = {
  [method: string]: number;
};

export type PaymentPageData = {
  profile_img?: string;
  id: string;
  uid: string;
  description?: string;
  nick: string;
  payment_methods: string[];
  socials: Record<string, string>;
  connect_acc?: string;
};

export type StripeCustomerType = {
  email: string;
  name: string;
  address: Address;
};

export type Address = {
  city: string;
  country: string;
  line1: string;
  postal_code: string;
  state: string;
};
