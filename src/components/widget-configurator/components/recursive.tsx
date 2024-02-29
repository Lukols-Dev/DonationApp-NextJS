import React from "react";
import TextComponent from "./text";
import Container from "./container";
import { EditorElement } from "@/types/configurator";
import ListComponent from "./list";
import DonateComponent from "./donate";

interface Props {
  element: EditorElement;
  uid: string;
}

const Recursive = ({ element, uid }: Props) => {
  switch (element.type) {
    case "text":
      return <TextComponent element={element} />;
    case "list":
      return <ListComponent element={element} uid={uid} />;
    case "donate":
      return <DonateComponent element={element} uid={uid} />;
    case "container":
      return <Container element={element} uid={uid} />;
    case "__body":
      return <Container element={element} uid={uid} />;
    default:
      return null;
  }
};

export default Recursive;
