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
