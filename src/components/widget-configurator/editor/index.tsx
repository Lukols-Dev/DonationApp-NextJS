"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import Recursive from "../components/recursive";
import { useEditor } from "@/hooks/useEditor";
import { EditorElement } from "@/types/configurator";

type Props = { widgetId: string; liveMode?: boolean };

const WidgetEditor = ({ widgetId, liveMode }: Props) => {
  const { dispatch, state } = useEditor();

  const handleClick = () => {
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {},
    });
  };

  useEffect(() => {
    if (liveMode) {
      dispatch({
        type: "TOGGLE_LIVE_MODE",
        payload: { value: true },
      });
    }
  }, [liveMode]);

  return (
    <div
      className={clsx(
        "use-automation-zoom-in w-full h-full overflow-scroll mr-[385px] bg-background transition-all rounded-md",
        {
          "!p-0 !mr-0": state.editor.liveMode === true,
        }
      )}
      onClick={handleClick}
    >
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default WidgetEditor;

const testOBJ: EditorElement = {
  id: "02306",
  styles: {
    color: "black",
    backgroundColor: "red",
    width: "100px",
  },
  name: "Text",
  type: "text",
  content: {
    innerText: "Hello Element Text",
  },
};
