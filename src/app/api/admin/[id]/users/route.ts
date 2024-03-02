import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//GET ALL Users
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  try {
    const usersColl = collection(firestore, "users");
    const usersDocs = await getDocs(usersColl);

    const users = usersDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const count = users.length;

    return NextResponse.json(
      { data: users, count: count },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
