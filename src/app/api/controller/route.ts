import { firestore } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

// Add or update controller
export const POST = async (req: Request) => {
  const {
    uid,
    data,
    resetGoalAmount,
  }: { uid: string; data: any; resetGoalAmount?: boolean } = await req.json();

  if (!uid) {
    return NextResponse.json("Missing UID", { status: 400 });
  }

  const docRef = doc(firestore, "users", uid, "controller", "controller");

  try {
    if (resetGoalAmount) {
      await setDoc(docRef, { goal_amount: 0 }, { merge: true });
      return NextResponse.json("Goal amount reset to zero", {
        status: 200,
        statusText: "OK",
      });
    } else if (data) {
      const docSnapshot = await getDoc(docRef);
      if (
        docSnapshot.exists() &&
        data.hasOwnProperty("goal_amount") &&
        typeof data.goal_amount === "number"
      ) {
        const existingData = docSnapshot.data();
        const updatedGoalAmount =
          (existingData.goal_amount || 0) + data.goal_amount;

        await setDoc(
          docRef,
          { ...data, goal_amount: updatedGoalAmount },
          { merge: true }
        );
      } else {
        await setDoc(docRef, { ...data }, { merge: true });
      }
      return NextResponse.json("Document updated or created", {
        status: 200,
        statusText: "OK",
      });
    } else {
      return NextResponse.json("Missing data for update", { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(err, { status: 500, statusText: "Error" });
  }
};
