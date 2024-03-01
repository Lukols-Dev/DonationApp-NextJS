"use client";

import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EditorElement } from "@/types/configurator";
import { useEditor } from "@/hooks/useEditor";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { speakText } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface Props {
  element: EditorElement;
  uid: string;
}

const GoalsComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [goalItem, setGoalItem] = useState<any>();

  const [isVisible, setIsVisible] = useState(true);

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };
  const styles = props.element.styles;

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  const goalMaxValue = !Array.isArray(props.element.content)
    ? props.element.content.goal_max_value
    : 100;

  const goalActivation = !Array.isArray(props.element.content)
    ? props.element.content.goal_activation
    : false;
  const amountType = !Array.isArray(props.element.content)
    ? props.element.content.amount_type
    : "amount";

  // useEffect(() => {
  //   if (state.editor.liveMode) {
  //     const messagesQuery = query(
  //       collection(firestore, "users", props.uid, "queue"),
  //       orderBy("create_at", "desc")
  //     );
  //     const unsubscribe = onSnapshot(
  //       messagesQuery,
  //       (snapshot) => {
  //         const fetchedItems = snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }));
  //         setListItems(fetchedItems);
  //         setCurrentMessageIndex(0);
  //       },
  //       (error) => {
  //         console.error("Error fetching live messages: ", error);
  //       }
  //     );

  //     return () => unsubscribe();
  //   } else {
  //     setListItems(testMessages);
  //     setCurrentMessageIndex(0);
  //   }
  // }, [state.editor.liveMode, props.uid]);

  return (
    <div
      style={styles}
      className={clsx(
        "p-[2px] m-[5px] relative text-[16px] transition-all w-full",
        {
          "!border-blue-500":
            state.editor.selectedElement.id === props.element.id,

          "!border-solid": state.editor.selectedElement.id === props.element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}
      <span
        className="text-2xl font-bold"
        contentEditable={!state.editor.liveMode}
        onBlur={(e) => {
          const spanElement = e.target as HTMLSpanElement;
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              elementDetails: {
                ...props.element,
                content: {
                  innerText: spanElement.innerText,
                },
              },
            },
          });
        }}
      >
        {!Array.isArray(props.element.content) &&
          props.element.content.innerText}
      </span>
      <Progress
        value={!state.editor.liveMode ? 10 : 0}
        maxValue={goalMaxValue}
        className="h-[40px]"
      />

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default GoalsComponent;

const testMessages: any = [
  {
    nick: "User1",
    description: "Dziękuję za stream!",
    amount: 50,
  },
];
