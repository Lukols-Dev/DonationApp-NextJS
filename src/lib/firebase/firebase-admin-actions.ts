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
