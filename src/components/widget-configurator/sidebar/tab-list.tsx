import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MousePointerSquareDashed, Palette } from "lucide-react";

type Props = {};

const TabList = (props: Props) => {
  return (
    <TabsList className="flex items-center flex-col justify-evenly w-full bg-transparent h-fit gap-4 ">
      <TabsTrigger
        value="Components"
        className="data-[state=active]:bg-muted w-10 h-10 p-0"
      >
        <MousePointerSquareDashed />
      </TabsTrigger>
      <TabsTrigger
        value="Styles"
        className="data-[state=active]:bg-muted w-10 h-10 p-0"
      >
        <Palette />
      </TabsTrigger>
    </TabsList>
  );
};

export default TabList;
