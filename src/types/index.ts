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
