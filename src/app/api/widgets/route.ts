//GET: 200(ok), 404(Not Found)
//POST:
//PUT: 200(ok), 404(Not Found), 409(Conflict)

import { firestore } from "@/lib/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

//Update widget
export const PUT = async (req: Request) => {
  const { uid, wid, content }: { uid: string; wid: string; content: any } =
    await req.json();

  if (!uid || !wid) {
    return NextResponse.json("Missing data", { status: 400 });
  }

  try {
    const docUser = doc(firestore, "users", uid);
    const docWidget = doc(docUser, "widgets", wid);

    const checkDoc = await getDoc(docWidget);
    if (checkDoc.exists()) {
      await updateDoc(docWidget, {
        content: content,
      });
      return NextResponse.json("The widget has been updated.", {
        status: 200,
        statusText: "OK",
      });
    } else {
      await setDoc(docWidget, {
        content: content,
      });
      return NextResponse.json("The widget has been created and updated.", {
        status: 200,
        statusText: "OK",
      });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};

// export const POST = async (req: Request) => {
//   const { uid, wid }: { uid: string; wid: string; content: any } =
//     await req.json();

//   if (!uid || !wid) {
//     return NextResponse.json("Missing data", { status: 400 });
//   }

//   try {
//     const docUser = doc(firestore, "users", uid);
//     const collWidget = doc(docUser, "widgets", wid);

//     const res = await getDoc(collWidget);
//     const data = res.data();

//     //TODO: IS ok? to check
//     const content: EditorElement = data ? data.content : {};

//     return NextResponse.json(
//       { content: content },
//       {
//         status: 200,
//         statusText: "OK",
//       }
//     );
//   } catch (err) {
//     return NextResponse.json(err, { status: 404, statusText: "Not Found" });
//   }
// };
