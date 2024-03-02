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
}

export class AdminMessagesService {
  static async getAllMessages(id: string, uid?: string) {
    return (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/admin/${uid}/users/messages`
      )
    ).json();
  }
}
