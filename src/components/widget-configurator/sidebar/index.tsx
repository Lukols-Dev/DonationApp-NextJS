"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
// import { useEditor } from '@/providers/editor/editor-provider'
import clsx from "clsx";
import React, { useEffect, useState } from "react";
// import TabList from './tabs'
// import SettingsTab from './tabs/settings-tab'
// import MediaBucketTab from './tabs/media-bucket-tab'
// import ComponentsTab from './tabs/components-tab'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import TabList from "./tab-list";
import ComponentsTab from "./tabs/components-tab";

type Props = {
  subaccountId?: string;
};

const EditorSidebar = ({ subaccountId }: Props) => {
  //   const { state, dispatch } = useEditor()
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <Sheet open={isReady} modal={false}>
      <Tabs className="w-full" defaultValue="Component">
        <SheetContent
          side="right"
          className={clsx(
            "mt-[97px] w-16 z-[80] shadow-none  p-0 focus:border-none transition-all overflow-hidden"
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          side="right"
          className={clsx(
            "mt-[97px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden"
          )}
        >
          <div className="grid gap-4 h-full pb-36 overflow-scroll">
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
            </TabsContent>
            <TabsContent value="Components">
              <SheetHeader className="text-left p-6 ">
                <SheetTitle>Components</SheetTitle>
                <SheetDescription>
                  You can drag and drop components on the canvas
                </SheetDescription>
              </SheetHeader>
              <ComponentsTab />
            </TabsContent>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default EditorSidebar;
