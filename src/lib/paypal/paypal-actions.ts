export class PaypalPayment {
  static async paypalCreateOrder(uid: string, data: any) {
    return (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/payments/paypal/create-order`,
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

  static async paypalCaptureOrder(uid: string, data: any) {
    return (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/payments/paypal/capture-order`,
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

  static async paypalPayout(uid: string, data: any) {
    return (
      await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/payments/paypal/payouts`,
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
