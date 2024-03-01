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

interface Props {
  element: EditorElement;
  uid: string;
}

const DonateComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [listItems, setListItems] = useState<any[]>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState<number | null>(
    null
  );
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isRead, setRead] = useState<boolean>(false);

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
    ? Number(props.element.content.donate_delay) * 1000
    : 1000;
  const donateActivationAmount = !Array.isArray(props.element.content)
    ? props.element.content.donate_activation_amount
    : 1;
  const donateLector = !Array.isArray(props.element.content)
    ? props.element.content.donate_lector
    : false;
  const amountType = !Array.isArray(props.element.content)
    ? props.element.content.amount_type
    : "amount";

  useEffect(() => {
    if (!donateLector) return;
    const speechSynthesisSupported = "speechSynthesis" in window;
    if (!speechSynthesisSupported) {
      console.warn("Synteza mowy nie jest dostępna w tej przeglądarce.");
    } else {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        console.warn("Nie znaleziono głosów syntezy mowy.");
      }
    }
  }, [donateLector]);

  useEffect(() => {
    if (state.editor.liveMode) {
      const messagesQuery = query(
        collection(firestore, "users", props.uid, "queue"),
        orderBy("create_at", "desc")
      );
      const unsubscribe = onSnapshot(
        messagesQuery,
        (snapshot) => {
          const fetchedItems = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setListItems(fetchedItems);
          setCurrentMessageIndex(0);
        },
        (error) => {
          console.error("Error fetching live messages: ", error);
        }
      );

      return () => unsubscribe();
    } else {
      setListItems(testMessages);
      setCurrentMessageIndex(0);
    }
  }, [state.editor.liveMode, props.uid]);

  useEffect(() => {
    const readMessage = () => {
      if (
        currentMessageIndex !== null &&
        currentMessageIndex < listItems.length
      ) {
        const message = listItems[currentMessageIndex];

        if (message[String(amountType)] >= Number(donateActivationAmount)) {
          setRead(true);
          speakText({
            text: `Użytkownik ${message.nick} wysłał wiadomość ${message.description}`,
            rate: 0.9,
            volume: 0.8,
            pitch: 1.2,
            voice: "Google polski",
            onEnd: () => {
              setRead(false);
              setCurrentMessageIndex((currentIndex) =>
                currentIndex !== null && currentIndex + 1 < listItems.length
                  ? currentIndex + 1
                  : null
              );
            },
          });
        }
      }
    };

    if (donateLector && state.editor.liveMode && listItems.length > 0) {
      readMessage();
    }
  }, [currentMessageIndex, listItems, state.editor.liveMode]);

  useEffect(() => {
    if (
      !isRead &&
      currentMessageIndex !== null &&
      currentMessageIndex < listItems.length
    ) {
      const timeoutId = setTimeout(() => {
        setCurrentMessageIndex((currentIndex) =>
          currentIndex !== null && currentIndex + 1 < listItems.length
            ? currentIndex + 1
            : null
        );
      }, donateDelay || 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [currentMessageIndex, listItems, isRead]);

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
      <div className="text-center relative z-10">
        {!state.editor.liveMode ? (
          <>
            <h1 className="font-bold text-4xl text-green-500">500 PLN</h1>
            <h2 className="font-bold text-xl">Nick</h2>
            <p className="font-bold text-lg">Opis wpłaty</p>
            {donateUrl && (
              <img
                className="absolute transform left-1/2 -translate-x-1/2"
                alt="GIF DONATE"
                width={200}
                height={200}
                src={donateUrl}
              />
            )}
          </>
        ) : currentMessageIndex !== null ? (
          <>
            <h1 className="font-bold text-4xl text-green-500">
              {amountType
                ? listItems[currentMessageIndex][amountType]
                : listItems[currentMessageIndex].amount}{" "}
              PLN
            </h1>
            <h2 className="font-bold text-xl text-black">
              {listItems[currentMessageIndex].nick}
            </h2>
            <p className="font-bold text-lg text-black">
              {listItems[currentMessageIndex].description}
            </p>
            {donateUrl && (
              <img
                className="absolute transform left-1/2 -translate-x-1/2"
                alt="GIF DONATE"
                width={200}
                height={200}
                src={donateUrl}
              />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
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
  },
];
