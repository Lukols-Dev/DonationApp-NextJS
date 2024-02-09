import React from "react";
import TextComponent from "./text";
import Container from "./container";
import { EditorElement } from "@/types/configurator";

interface Props {
  element: EditorElement;
}

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "container":
      return <Container element={element} />;
    case "__body":
      return <Container element={element} />;
    default:
      return null;
  }
};

export default Recursive;
