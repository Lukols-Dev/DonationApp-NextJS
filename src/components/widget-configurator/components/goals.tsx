"use client";

import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EditorElement } from "@/types/configurator";
import { useEditor } from "@/hooks/useEditor";
import {
  Timestamp,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { Progress } from "@/components/ui/progress";

interface Props {
  element: EditorElement;
  uid: string;
}

const GoalsComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [value, setValue] = useState<any>();
  const [goalActive, setGoalActive] = useState<boolean>(false);
  const [goalAmount, setGoalAmount] = useState<number>(0);

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

  useEffect(() => {
    if (!state.editor.liveMode || !goalActivation) return;

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const dateTime = Timestamp.fromDate(currentDate);

    const messagesQuery = query(
      collection(firestore, "users", props.uid, "messages"),
      where("create_at", ">=", dateTime),
      where("payment_status", "==", "succeeded"),
      orderBy("create_at", "desc")
    );

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const fetchedItems = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            amount: data.amount,
            amount_after_fees: data.amount_after_fees,
            // create_at: data.create_at
          };
        });
        const amountValue: "amount" | "amount_after_fees" = amountType
          ? (amountType as "amount" | "amount_after_fees")
          : "amount";

        const summary = sumAmounts(fetchedItems, amountValue);
        setValue(summary);
      },
      (error) => {
        console.error("Error fetching live messages: ", error);
      }
    );

    return () => unsubscribe();
  }, [state.editor.liveMode, props.uid, goalActivation]);

  useEffect(() => {
    const controllerRef = doc(
      firestore,
      "users",
      props.uid,
      "controller",
      "controller"
    );

    const unsubscribe = onSnapshot(controllerRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setGoalActive(data.goal_active ?? false);
        setGoalAmount(data.goal_amount ?? 0);
      }
    });

    return () => unsubscribe();
  }, [props.uid]);

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
        {!goalActive &&
          !Array.isArray(props.element.content) &&
          props.element.content.innerText}
      </span>
      {!goalActive && (
        <Progress
          value={!state.editor.liveMode ? 10 : value + goalAmount}
          maxValue={goalMaxValue}
          className="h-[40px]"
        />
      )}
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

interface Transaction {
  id: string;
  amount: number;
  amount_after_fees: number;
}

const sumAmounts = (data: Transaction[], key: keyof Transaction): number => {
  return data.reduce((total, item) => total + Number(item[key]), 0);
};
