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
}
