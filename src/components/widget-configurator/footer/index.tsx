"use client";

import { useEditor } from "@/hooks/useEditor";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import InputCopy from "@/components/ui/input-copy";
import { ConfiguratorService } from "@/lib/firebase/firebase-actions";
import Link from "next/link";

interface Props {
  uid: string;
}

const EditorFooter = ({ uid }: Props) => {
  const { state, dispatch } = useEditor();
  const router = useRouter();

  const { toast } = useToast();

  const handleOnSave = async () => {
    const body = {
      uid: uid,
      wid: "widget",
      content: state.editor.elements,
    };
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/widgets`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (resp.ok) {
        toast({
          variant: "default",
          title: "Sukces",
          description: "Widget został zapisany.",
        });
        router.refresh();
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Wystąpił błąd podczas zapisu. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      });
      console.log("Error Save");
    }
  };

  const handleOnDefault = async () => {
    const defaultComponent = [
      {
        content: [],
        id: "__body",
        name: "Body",
        styles: {},
        type: "__body",
      },
    ];

    try {
      await ConfiguratorService.updateWidget(uid, defaultComponent);
      toast({
        variant: "default",
        title: "Sukces",
        description: "Widget został zresetowany.",
      });
      window.location.reload();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          "Wystąpił błąd podczas resetu. Spróbuj jeszcze raz lub skontaktuj się z Tipey.",
      });
      console.log("Error Save");
    }
  };

  return (
    <div className="w-full h-[40px] mt-2 flex ">
      <div className="flex gap-4 absolute z-10 left-4">
        <button
          className=" px-9 py-2 rounded-sm border-2 border-[#1814F3] text-[#1814F3] hover:text-white hover:bg-[#1814F3] font-semibold text-lg"
          onClick={handleOnSave}
        >
          Zapisz
        </button>
        <Link
          href={`${process.env.NEXT_PUBLIC_URL}/widget/${uid}/controller`}
          target="_blank"
          rel="noopener noreferrer"
          className=" px-9 py-2 rounded-sm border-2 border-[#1814F3] text-[#1814F3] hover:text-white hover:bg-[#1814F3] font-semibold text-lg"
        >
          Kontroler Widgetu
        </Link>
        <button
          className=" px-9 py-2 rounded-sm border-2 border-[#1814F3] text-[#1814F3] hover:text-white hover:bg-[#1814F3] font-semibold text-lg"
          onClick={handleOnDefault}
        >
          Wyczyść
        </button>
        <div className="border-2 border-[#1814F3] rounded-sm w-[300px]">
          <InputCopy value={`${process.env.NEXT_PUBLIC_URL}/widget/${uid}`} />
        </div>
      </div>
    </div>
  );
};

export default EditorFooter;
