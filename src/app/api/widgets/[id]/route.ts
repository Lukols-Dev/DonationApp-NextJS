import { firestore } from "@/lib/firebase";
import { EditorElement } from "@/types/configurator";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const docUser = doc(firestore, "users", id);
    const collWidget = doc(docUser, "widgets", "widget");

    const res = await getDoc(collWidget);
    const data = res.data();
    const content: EditorElement = data ? data.content : null;

    return NextResponse.json(
      { content: content },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
