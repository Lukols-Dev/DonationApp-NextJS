"use client";

import clsx from "clsx";
import { Badge } from "@/components/ui/badge";
import { Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { EditorElement } from "@/types/configurator";
import { useEditor } from "@/hooks/useEditor";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { cancelSpeaking, formatAmountToText, speakText } from "@/lib/utils";
import {
  ControllerService,
  QueueService,
} from "@/lib/firebase/firebase-actions";

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
  const [donateActive, setDonateActive] = useState<boolean>(false);
  const [donateSkip, setDonateSkip] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

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

  const goToNextMessage = () => {
    setCurrentMessageIndex((currentIndex) =>
      currentIndex !== null && currentIndex + 1 < listItems.length
        ? currentIndex + 1
        : null
    );
    // Resetowanie stanu `donateSkip` na `false` po wymuszeniu zmiany
    setDonateSkip(false);
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

  const is_controller = !Array.isArray(props.element.content)
    ? props.element.content.donate_controller
    : false;

  const playSound = (src: string, callback: any) => {
    const sound = new Audio(src);
    sound.play();
    sound.onended = callback;
    setAudio(sound);
  };

  const stopSound = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const readMessage = () => {
    if (
      currentMessageIndex !== null &&
      currentMessageIndex < listItems.length
    ) {
      const message = listItems[currentMessageIndex];

      setRead(true);
      speakText({
        text: `Użytkownik ${
          message.nick || ""
        } wysłał wiadomość za ${formatAmountToText(
          message[String(amountType)]
        )} o treści ${message.description}`,
        rate: 0.9,
        volume: 0.8,
        pitch: 1.2,
        voice: "Google polski",
        onEnd: () => {
          setRead(false);
          if (!donateSkip) {
            goToNextMessage();
          }
        },
      });
    }
  };

  useEffect(() => {
    if (!donateLector) return;
    const speechSynthesisSupported = "speechSynthesis" in window;
    if (!speechSynthesisSupported) {
      console.warn("Speech synthesis is not available in this browser.");
    } else {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) {
        console.warn("No speech synthesis voices found.");
      }
    }
  }, [donateLector]);

  useEffect(() => {
    if (state.editor.liveMode && !donateActive) {
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
  }, [state.editor.liveMode, props.uid, donateActive]);

  // useEffect(() => {
  //   const readMessage = () => {
  //     if (
  //       currentMessageIndex !== null &&
  //       currentMessageIndex < listItems.length
  //     ) {
  //       const message = listItems[currentMessageIndex];
  //       console.log("read object message: ", {
  //         index: currentMessageIndex,
  //         message: message,
  //       });
  //       // if (donateSkip) {
  //       //   // Natychmiast przechodzi do następnej wiadomości bez odczytywania aktualnej
  //       //   setCurrentMessageIndex((currentIndex) =>
  //       //     currentIndex !== null && currentIndex + 1 < listItems.length
  //       //       ? currentIndex + 1
  //       //       : null
  //       //   );
  //       //   return; // Zapobiega odczytaniu wiadomości jeśli skip jest aktywny
  //       // }

  //       if (message[String(amountType)] >= Number(donateActivationAmount)) {
  //         setRead(true);
  //         speakText({
  //           text: `Użytkownik ${message.nick} wysłał wiadomość ${message.description}`,
  //           rate: 0.9,
  //           volume: 0.8,
  //           pitch: 1.2,
  //           voice: "Google polski",

  //           onEnd: () => {
  //             setRead(false);
  //             if (!donateSkip) {
  //               setCurrentMessageIndex((currentIndex) =>
  //                 currentIndex !== null && currentIndex + 1 < listItems.length
  //                   ? currentIndex + 1
  //                   : null
  //               );
  //             }
  //           },
  //         });
  //       }
  //     }
  //   };

  //   if (
  //     donateLector &&
  //     state.editor.liveMode &&
  //     listItems.length > 0 &&
  //     !donateActive
  //   ) {
  //     readMessage();
  //   }
  // }, [currentMessageIndex, listItems, state.editor.liveMode, donateActive]);

  // useEffect(() => {
  //   if (
  //     !isRead &&
  //     currentMessageIndex !== null &&
  //     currentMessageIndex < listItems.length
  //   ) {
  //     console.log("displayed object message: ", {
  //       index: currentMessageIndex,
  //       message: listItems[currentMessageIndex],
  //     });
  //     const timeoutId = setTimeout(() => {
  //       console.log("donateSkip setter: ", donateSkip);
  //       if (donateSkip) {
  //         console.log("robimy skips: ", donateSkip);
  //         // Pominięcie aktualnej wiadomości i przejście do kolejnej
  //         setCurrentMessageIndex((currentIndex) =>
  //           currentIndex !== null && currentIndex + 1 < listItems.length
  //             ? currentIndex + 1
  //             : null
  //         );
  //         return; // Zatrzymuje dalsze działania jeśli skip jest aktywny
  //       }
  //       const currentMessage = listItems[currentMessageIndex];

  //       setCurrentMessageIndex((currentIndex) => {
  //         const nextIndex =
  //           currentIndex !== null && currentIndex + 1 < listItems.length
  //             ? currentIndex + 1
  //             : null;
  //         //Potem zajme sie usuwaniem z kolejki
  //         if (currentMessage && currentMessage.id && currentMessage.mid) {
  //           //   QueueService.deleteFromQueue(
  //           //     props.uid,
  //           //     currentMessage.id,
  //           //     currentMessage.mid
  //           //   )
  //           //     .then(() => console.log("delete"))
  //           //     .catch((error) => console.error("Delete queue:", error));
  //         }
  //         console.log("nextIndex: ", nextIndex);
  //         return nextIndex;
  //       });

  //       return () => clearTimeout(timeoutId);
  //     }, donateDelay || 2000);
  //   }
  // }, [currentMessageIndex, listItems, isRead, donateSkip]);

  useEffect(() => {
    if (
      !isRead &&
      currentMessageIndex !== null &&
      currentMessageIndex < listItems.length
    ) {
      console.log("displayed object message: ", {
        index: currentMessageIndex,
        message: listItems[currentMessageIndex],
      });

      // if controller have set Skip donate, skip and end display current message go to next
      if (donateSkip) {
        stopSound(); // Zatrzymaj odtwarzanie dźwięku
        cancelSpeaking();
        goToNextMessage();
        return; //end without delay
      }

      if (!donateLector || isRead) {
        if (
          listItems[currentMessageIndex].voice_url &&
          listItems[currentMessageIndex].voice_url.lenght > 0
        ) {
          playSound(listItems[currentMessageIndex].voice_url, () => {
            const timeoutId = setTimeout(() => {
              const currentMessage = listItems[currentMessageIndex];

              goToNextMessage();

              // Display and delete from queue
              console.log("nextIndex after delay and audio");

              return () => clearTimeout(timeoutId);
            }, donateDelay || 2000);
          }); // Set auto switch message after delay
        } else {
          const timeoutId = setTimeout(() => {
            const currentMessage = listItems[currentMessageIndex];

            goToNextMessage();

            // Display and delete from queue
            console.log("nextIndex after delay");

            return () => clearTimeout(timeoutId);
          }, donateDelay || 2000);
        }
      } else if (
        donateLector &&
        !isRead &&
        currentMessageIndex !== null &&
        currentMessageIndex < listItems.length
      ) {
        if (
          !!listItems[currentMessageIndex].voice_url &&
          listItems[currentMessageIndex].voice_url.length > 0
        ) {
          playSound(listItems[currentMessageIndex].voice_url, () => {
            readMessage();
          });
        } else {
          readMessage();
        }
      }
    } else if (isRead && donateSkip) {
      //if donate i reading and we need skip donate and end reading i the same time
      cancelSpeaking();
      setRead(false);
      goToNextMessage();
      return; //end without delay
    }
  }, [
    currentMessageIndex,
    listItems,
    isRead,
    donateSkip,
    donateDelay,
    setDonateSkip,
  ]);

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
        setDonateActive(data.donate_active ?? false);
      }
    });

    return () => unsubscribe();
  }, [props.uid]);

  useEffect(() => {
    if (!is_controller) return;

    ControllerService.updateController(props.uid, {
      donate_active: false,
      donate_skip: false,
    });
  }, [is_controller]);

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
        setDonateSkip(data.skip_donate);
      } else {
        console.log("Nie znaleziono dokumentu!");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div
      style={styles}
      className={clsx(
        "p-[2px] w-full m-[5px] absolute text-[16px] transition-all",
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
            <h2 className="font-bold text-xl">Nick</h2>
            <h1 className="font-bold text-4xl text-green-500">500 PLN</h1>
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
        ) : !donateActive &&
          listItems &&
          listItems.length > 0 &&
          currentMessageIndex !== null ? (
          <>
            <h2 className="font-bold text-xl text-black">
              {listItems[currentMessageIndex]?.nick}
            </h2>
            <h1 className="font-bold text-4xl text-green-500">
              {listItems[currentMessageIndex] && amountType
                ? listItems[currentMessageIndex][amountType]
                : listItems[currentMessageIndex]?.amount}{" "}
              PLN
            </h1>
            <p className="font-bold text-lg text-black">
              {listItems[currentMessageIndex]?.description}
            </p>
            {donateUrl && (
              <img
                className="absolute transform left-1/2 -translate-x-1/2"
                alt="GIF DONATE"
                width={200}
                height={200}
                src={listItems[currentMessageIndex]?.gif_url || donateUrl}
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
