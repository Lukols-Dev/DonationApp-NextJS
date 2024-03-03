import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase";

export class CashbillService {
  static async paysafecardPaymemnt(uid: string, data: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/cashbill`, {
        method: "POST",
        body: JSON.stringify({ uid: uid, data: data }),
      })
    ).json();
  }
}
