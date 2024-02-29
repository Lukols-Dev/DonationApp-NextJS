"use client";

import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EditorElement } from "@/types/configurator";
import { useEditor } from "@/hooks/useEditor";
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";

interface Props {
  element: EditorElement;
  uid: string;
}

const ListComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [listItems, setListItems] = useState<any>();

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

  const numberOfItems = !Array.isArray(props.element.content)
    ? props.element.content.number_list_elements
    : 0;
  const amountType = !Array.isArray(props.element.content)
    ? props.element.content.amount_type
    : "amount";
  const listDataSetting = !Array.isArray(props.element.content)
    ? props.element.content.list_data_setting
    : "amount";

  const getListItem = async () => {
    const defaultNumberOfItems = !state.editor.liveMode ? numberOfItems : 0;
    const defaultItems = Array.from(
      { length: Number(defaultNumberOfItems) },
      (_, index) => ({
        id: String(index + 1),
        text: `Item ${index + 1}`,
      })
    );

    if (!state.editor.liveMode) {
      setListItems(defaultItems);
      return;
    }

    const messagesQuery = query(
      collection(firestore, "users", props.uid, "messages"),
      orderBy(String(listDataSetting), "desc"),
      limit(Number(numberOfItems))
    );

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const fetchedItems = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListItems(fetchedItems);
      },
      (error) => {
        console.error("Error fetching live messages: ", error);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    getListItem();
  }, [state.editor.liveMode, props.uid, numberOfItems]);

  return (
    <div
      style={styles}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
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
                  number_list_elements: Number(numberOfItems),
                  amount_type: String(amountType),
                  list_data_setting: String(listDataSetting),
                },
              },
            },
          });
        }}
      >
        {!Array.isArray(props.element.content) &&
          props.element.content.innerText}
      </span>
      {listItems &&
        listItems.map((item: any, index: any) => (
          <div key={item.id}>
            <span>
              {!state.editor.liveMode
                ? item.text
                : `${index + 1}. ${item.nick} ${item[String(amountType)]}`}
            </span>
          </div>
        ))}
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

export default ListComponent;
