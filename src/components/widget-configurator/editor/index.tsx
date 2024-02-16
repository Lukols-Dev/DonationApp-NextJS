"use client";

import clsx from "clsx";
import React, { useEffect } from "react";
import Recursive from "../components/recursive";
import { useEditor } from "@/hooks/useEditor";

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

  useEffect(() => {
    const body = {
      uid: "hXOYYt9NQGw8aW4G2kUR",
      wid: "FBMmngenBs8dZgS8SU8Z",
    };

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/widgets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();

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
