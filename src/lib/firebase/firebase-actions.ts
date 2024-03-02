import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { toSnakeCase } from "../utils";
import { storage } from ".";
import { onSnapshot } from "firebase/firestore";

export class UserService {
  static async getUserData(uid: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${uid}`)
    ).json();
  }

  static async updateUserData(uid: string, data: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user/${uid}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
    ).json();
  }
}

export class MessagesService {
  static async getAllMessages(uid: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/messages/${uid}`)
    ).json();
  }

  static async addNewMessage(uid: string, data: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/messages`, {
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notification/${uid}`)
    ).json();
  }

  static async addNewNotification(uid: string, data: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notification`, {
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/notification/${uid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  }
}

export class QueueService {
  static async getQueue(uid: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/queue/${uid}`)
    ).json();
  }

  static async addToQueue(uid: string, data: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/queue/${uid}`, {
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/queue/${uid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();
  }

  static async deleteFromQueue(uid: string, qid: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/queue`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { qid: qid }, uid }),
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/controller`, {
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/${uid}`)
    ).json();
  }

  static async getCheckout(uid: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/checkout/${uid}`)
    ).json();
  }

  static async generateCheckout(uid: string, data: any) {
    return (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/payments/checkout/${uid}`,
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
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: data, uid }),
      })
    ).json();
  }

  static async addPaymentFees(uid: string, connect_acc: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/fees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ uid, connect_acc }),
      })
    ).json();
  }

  static async getAppFees(uid: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/fees/${uid}`)
    ).json();
  }
}

export class PaymentPageService {
  static async getPaymentPageInfo(id: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/user/${id}`)
    ).json();
  }

  static async updatePaymentPageInfo(id: string, data: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/user/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      })
    ).json();
  }
}

export class NewsService {
  static async getNews() {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/tipey/news`)
    ).json();
  }
}

export class ConfiguratorService {
  static async getWidget(uid: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/widgets/${uid}`, {
        method: "GET",
      })
    ).json();
  }

  static async updateWidget(uid: string, content: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/widgets`, {
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
}
