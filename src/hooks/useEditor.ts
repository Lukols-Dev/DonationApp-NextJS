"use client";

import { EditorContext } from "@/providers/widget-configurator/configurator-provider";
import { useContext } from "react";

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error("useEditor Hook must be used within the editor Provider");
  }
  return context;
};
