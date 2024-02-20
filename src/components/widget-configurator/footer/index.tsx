"use client";

import { useEditor } from "@/hooks/useEditor";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

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

  return (
    <div className="w-full bg-red-300">
      <button className="p-3 bg-slate-400 absolute z-50" onClick={handleOnSave}>
        Zapisz
      </button>
    </div>
  );
};

export default EditorFooter;
