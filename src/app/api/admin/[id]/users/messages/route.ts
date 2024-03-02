import { firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

//GET ALL Messages
export const GET = async (req: Request, { params }: { params: IParams }) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json("Not Found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  let totalMessagesCount = 0;
  let totalAmount = 0;
  let totalAmountAfterFees = 0;

  try {
    const usersRef = collection(firestore, "users");
    const usersSnapshot = await getDocs(usersRef);

    for (const userDoc of usersSnapshot.docs) {
      const messagesRef = collection(firestore, `users/${userDoc.id}/messages`);
      const messagesSnapshot = await getDocs(messagesRef);

      totalMessagesCount += messagesSnapshot.docs.length;

      messagesSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        const amount = data.amount ?? 0;
        const amountAfterFee = data.amount_after_fees ?? 0;

        totalAmount += amount;
        totalAmountAfterFees += amountAfterFee;
      });
    }

    const responseData = {
      total_messages_count: totalMessagesCount,
      total_amount: parseFloat(totalAmount.toFixed(2)),
      total_amount_after_fees: parseFloat(totalAmountAfterFees.toFixed(2)),
      total_fee: parseFloat((totalAmount - totalAmountAfterFees).toFixed(2)),
    };

    return NextResponse.json(
      { data: responseData, count: totalMessagesCount },
      {
        status: 200,
        statusText: "OK",
      }
    );
  } catch (err) {
    return NextResponse.json(err, { status: 404, statusText: "Not Found" });
  }
};
