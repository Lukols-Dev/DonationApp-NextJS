export class AdminUsersService {
  static async getAllUsers(id: string) {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/${id}/users`)
    ).json();
  }
}

// export class AdminMessagesService {
//   static async getAllMessages(id:string, uid?:string) {
//     return (
//       await fetch(`${process.env.NEXT_PUBLIC_URL}/api/admin/${uid}/users/messages`)
//       ).json();
//     )
//   }
// }
