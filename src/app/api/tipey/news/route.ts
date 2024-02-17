import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

//GET ALL Tipey News
export const GET = async (req: Request) => {
  try {
    const newsColl = collection(firestore, "news");
    const newsDocs = await getDocs(newsColl);

    const news = newsDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(news, {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
