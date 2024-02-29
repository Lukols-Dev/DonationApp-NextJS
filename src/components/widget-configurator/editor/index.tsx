"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import Recursive from "../components/recursive";
import { useEditor } from "@/hooks/useEditor";
import { ConfiguratorService } from "@/lib/firebase/firebase-actions";

interface Props {
  uid: string;
  liveMode?: boolean;
}

const WidgetEditor = ({ uid, liveMode }: Props) => {
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

  useEffect(() => {
    if (!uid) return;

    const fetchData = async () => {
      try {
        const data = await ConfiguratorService.getWidget(uid);

        dispatch({
          type: "LOAD_DATA",
          payload: {
            elements: data.content,
            withLive: !!liveMode,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div
      className={clsx(
        "use-automation-zoom-in w-full h-full overflow-scroll mr-[385px] bg-transparent transition-all rounded-md",
        {
          "!p-0 !mr-0": state.editor.liveMode === true,
        }
      )}
      onClick={handleClick}
    >
      {Array.isArray(state.editor.elements) &&
        state.editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} uid={uid} />
        ))}
    </div>
  );
};

export default WidgetEditor;
