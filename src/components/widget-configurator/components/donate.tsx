"use client";

import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EditorElement } from "@/types/configurator";
import { useEditor } from "@/hooks/useEditor";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { firestore } from "@/lib/firebase";

interface Props {
  element: EditorElement;
  uid: string;
}

const DonateComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [listItems, setListItems] = useState<any[]>();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
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
  const donateUrl = !Array.isArray(props.element.content)
    ? props.element.content.donate_url
    : "";
  const donateDelay = !Array.isArray(props.element.content)
    ? props.element.content.donate_delay
    : 1000;
  const donateActivationAmount = !Array.isArray(props.element.content)
    ? props.element.content.donate_activation_amount
    : 1;
  const amountType = !Array.isArray(props.element.content)
    ? props.element.content.amount_type
    : "amount";

  const getListItem = async () => {
    if (!state.editor.liveMode) {
      return;
    }

    const messagesQuery = query(
      collection(firestore, "users", props.uid, "queue"),
      orderBy("create_at", "desc")
      // limit(Number(numberOfItems))
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
  }, [state.editor.liveMode, props.uid]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, Number(donateDelay) * 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const messageChangeInterval = setInterval(() => {
      setCurrentMessageIndex(
        (prevIndex) =>
          (prevIndex + 1) %
          (!state.editor.liveMode || !listItems
            ? testMessages.length
            : listItems.length)
      );
    }, Number(donateDelay) * 1000 * (!state.editor.liveMode || !listItems ? testMessages.length : listItems.length));

    return () => clearInterval(messageChangeInterval);
  }, []);

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
        className={`transition-opacity duration-700 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {!state.editor.liveMode ? (
          <div className="text-center relative z-10">
            <h1 className="font-bold text-4xl text-green-500">500 PLN</h1>
            <h2 className="font-bold text-xl">Nick</h2>
            <p className="font-bold text-lg">Opis wpłaty</p>
            {donateUrl && (
              <img
                className="absolute transform left-1/2 -translate-x-1/2 "
                alt={"GIF DONATE"}
                width={200}
                height={200}
                src={donateUrl}
              />
            )}
          </div>
        ) : (
          listItems &&
          listItems.map(
            (message: any, index: any) =>
              index === currentMessageIndex && (
                <div key={index} className="text-center relative z-10">
                  <h1 className="font-bold text-4xl text-green-500">
                    {!state.editor.liveMode ? 500 : message[String(amountType)]}{" "}
                    PLN
                  </h1>
                  <h2 className="font-bold text-xl">
                    {!state.editor.liveMode ? "Nick" : message.nick}
                  </h2>
                  <p className="font-bold text-lg">
                    {!state.editor.liveMode
                      ? "Opis wpłaty"
                      : message.description}
                  </p>
                  {donateUrl && (
                    <img
                      className="absolute transform left-1/2 -translate-x-1/2 "
                      alt={"GIF DONATE"}
                      width={200}
                      height={200}
                      src={donateUrl}
                    />
                  )}
                </div>
              )
          )
        )}
      </span>

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

export default DonateComponent;

const testMessages: any = [
  {
    nick: "User1",
    description: "Dziękuję za stream!",
    amount: 50,
    gif: "https://media.tenor.com/CW2KRhVyPJoAAAAi/asd88bet-daftar-gif.gif",
  },
  {
    nick: "User2",
    description: "Super robota!",
    amount: 500,
    gif: "https://media.tenor.com/CW2KRhVyPJoAAAAi/asd88bet-daftar-gif.gif",
  },
  {
    nick: "User3",
    description: "Super robota!",
    amount: 1000,
    gif: "https://media.tenor.com/CW2KRhVyPJoAAAAi/asd88bet-daftar-gif.gif",
  },
  {
    nick: "User4",
    description: "Super robota!",
    amount: 200,
    gif: "https://media.tenor.com/CW2KRhVyPJoAAAAi/asd88bet-daftar-gif.gif",
  },
  {
    nick: "User5",
    description: "Super robota!",
    amount: 500,
    gif: "https://media.tenor.com/CW2KRhVyPJoAAAAi/asd88bet-daftar-gif.gif",
  },
  {
    nick: "User6",
    description: "Super robota!",
    amount: 100,
    gif: "https://media.tenor.com/CW2KRhVyPJoAAAAi/asd88bet-daftar-gif.gif",
  },
  {
    nick: "User7",
    description: "Super robota!",
    amount: 100,
    gif: "https://media.tenor.com/CW2KRhVyPJoAAAAi/asd88bet-daftar-gif.gif",
  },
];
