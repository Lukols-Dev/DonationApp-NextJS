import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { toSnakeCase } from "../utils";
import { storage } from ".";
import { onSnapshot } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  static async getUserData(uid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/user/${uid}`)
    ).json();
  }

  static async updateUserData(uid: string, data: any) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/user/${uid}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
    ).json();
  }

  static async deleteUser(uid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/user/${uid}`, {
        method: "POST",
        body: JSON.stringify({ uid: uid }),
      })
    ).json();
  }
}

export class MessagesService {
  static async getAllMessages(uid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/messages/${uid}`)
    ).json();
  }

  static async addNewMessage(uid: string, data: any) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, uid }),
      })
    ).json();
  }
}

export class NotificationService {
  static async getAllNotifications(uid: string) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/notification/${uid}`
      )
    ).json();
  }

  static async addNewNotification(uid: string, data: any) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/notification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, uid }),
      })
    ).json();
  }

  static async deleteAllNotifications(uid: string) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/notification/${uid}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
    ).json();
  }
}

export class QueueService {
  static async getQueue(uid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/queue/${uid}`)
    ).json();
  }

  static async addToQueue(uid: string, data: any) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/queue/${uid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, uid }),
      })
    ).json();
  }

  static async clearQueue(uid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/queue/${uid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  }

  static async deleteFromQueue(uid: string, qid: string, mid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/queue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { qid: qid, mid: mid }, uid }),
      })
    ).json();
  }
}

export class ControllerService {
  static async updateController(
    uid: string,
    data: any,
    resetGoalAmount?: boolean
  ) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/controller`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, resetGoalAmount, uid }),
      })
    ).json();
  }
}

export class PaymentService {
  static async getAllPayments(uid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/payments/${uid}`)
    ).json();
  }

  static async getCheckout(uid: string) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/payments/checkout/${uid}`
      )
    ).json();
  }

  static async generateCheckout(uid: string, data: any) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/payments/checkout/${uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data, uid }),
        }
      )
    ).json();
  }

  static async addPayment(
    uid: string,
    data: { name?: string; isActive?: boolean }
  ) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, uid }),
      })
    ).json();
  }

  static async addPaymentFees(uid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/payments/fees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid }),
      })
    ).json();
  }

  static async getAppFees(uid: string) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/payments/fees/${uid}`
      )
    ).json();
  }
}

export class PaymentPageService {
  static async getPaymentPageInfo(id: string) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/payments/user/${id}`
      )
    ).json();
  }

  static async updatePaymentPageInfo(id: string, data: any) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/payments/user/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      )
    ).json();
  }

  static async getAllGifs() {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/tipey/gifs`)
    ).json();
  }

  static async getLastPayments(uid: string) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/messages/${uid}`)
    ).json();
  }
}

export class NewsService {
  static async getNews() {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/tipey/news`)
    ).json();
  }
}

export class ConfiguratorService {
  static async getWidget(uid: string) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/widgets/${uid}`,
        {
          method: "GET",
        }
      )
    ).json();
  }

  static async updateWidget(uid: string, content: any) {
    return (
      await fetch(`https://donation-app-next-js.vercel.app/api/widgets`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, wid: "widget", content: content }),
      })
    ).json();
  }

  // static async createNewWidget(uid: string) {
  //   return (
  //     await fetch(`${process.env.NEXT_PUBLIC_URL}/api/widgets`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ uid }),
  //     })
  //   ).json();
  // }
}

export class FileService {
  static async addFile(uid: string, file: File | null | undefined) {
    if (!file || !uid) return;
    const fileName = `${toSnakeCase("profile")}_${uid}`;

    try {
      const storageRef = ref(storage, `users/${uid}/profile/${fileName}`);
      const upload = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(upload.ref);
      return url;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  static async addAudio(uid: string, blob: Blob | null | undefined) {
    if (!blob || !uid) return;
    const vid = uuidv4();

    const fileName = `${toSnakeCase("voice")}_${vid}`;
    const file = new File([blob], "recording.mp3", { type: "audio/mp3" });

    try {
      const storageRef = ref(storage, `messages/${uid}/files/${fileName}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export class PayoutService {
  static async addNewPayout(uid: string, data: any) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/payments/payout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: data, uid }),
        }
      )
    ).json();
  }
}
