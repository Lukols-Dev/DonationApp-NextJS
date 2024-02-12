import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
// import ContainerPlaceholder from "./container-placeholder";
import { EditorBtns } from "@/types/configurator";
import TextPlaceholder from "./components/text-placeholder";
import ContainerPlaceholder from "./components/container-placeholder";
import MailTo from "@/components/ui/mail-to";

type Props = {};

const ComponentsTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: EditorBtns;
    group: "layout" | "elements";
  }[] = [
    {
      Component: <TextPlaceholder />,
      label: "Text",
      id: "text",
      group: "elements",
    },
    {
      Component: <ContainerPlaceholder />,
      label: "Container",
      id: "container",
      group: "layout",
    },
  ];

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="Layout" className="px-6 py-0 border-y-[1px]">
        <AccordionTrigger className="!no-underline">Layout</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2">
          {elements
            .filter((element) => element.group === "layout")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Elements" className="px-6 py-0">
        <AccordionTrigger className="!no-underline">Elements</AccordionTrigger>
        <AccordionContent className="flex flex-wrap gap-2 ">
          {elements
            .filter((element) => element.group === "elements")
            .map((element) => (
              <div
                key={element.id}
                className="flex-col items-center justify-center flex"
              >
                {element.Component}
                <span className="text-muted-foreground">{element.label}</span>
              </div>
            ))}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="More" className="px-6 py-4">
        <div className="px-6 py-0 flex flex-col gap-4 text-sm">
          Wkrótce otrzymasz jeszcze więcej zaawansowanych funkcji. Chciałbyś
          jakieś?
          <MailTo>
            <div className="w-full py-2 flex items-center justify-center rounded-md bg-[#1814F3] text-white">
              Napisz
            </div>
          </MailTo>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default ComponentsTab;
