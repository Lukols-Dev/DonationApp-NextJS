import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from ".";
import { toSnakeCase } from "../utils";

export class AdminUsersService {
  static async getAllUsers(id: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/${id}/users`)
    ).json();
  }

  static async updateUserData(id: string, uid: string, data: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/${id}/users`, {
        method: "PUT",
        body: JSON.stringify({ uid: uid, data: data }),
      })
    ).json();
  }

  static async deleteUser(id: string, uid: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/${id}/users`, {
        method: "POST",
        body: JSON.stringify({ uid: uid }),
      })
    ).json();
  }
}

export class AdminMessagesService {
  static async getAllMessages(id: string, uid?: string) {
    return (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/${id}/users/messages`
      )
    ).json();
  }
}

export class AdminPaymentService {
  static async getAppFees(id: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/${id}/users/fees`)
    ).json();
  }

  static async updateAppFees(id: string, data: any) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/${id}/users/fees`, {
        method: "PUT",
        body: JSON.stringify({ data: data }),
      })
    ).json();
  }
}

export class AdminPayoutService {
  static async getAllUsers(id: string) {
    return (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/${id}/users/payments/payout`
      )
    ).json();
  }
}

export class AdminFileService {
  static async addFile(file: File | null | undefined, fileName: string) {
    if (!file || !fileName) return;

    try {
      const storageRef = ref(storage, `tipey/dokumenty/${fileName}`);
      const upload = await uploadBytesResumable(storageRef, file);
      const url = await getDownloadURL(upload.ref);
      return url;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
