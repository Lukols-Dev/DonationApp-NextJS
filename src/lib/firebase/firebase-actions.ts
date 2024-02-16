export class MessagesService {
  static async getAllMessages() {
    return (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/messages`)).json();
  }
}

export class PaymentService {
  static async getAllPayments() {
    return (await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments`)).json();
  }

  static async getCheckout() {
    return (
      await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payments/checkout`)
    ).json();
  }

  static async addPayment(
    data: { name?: string; isActive?: boolean },
    uid: string
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
}
