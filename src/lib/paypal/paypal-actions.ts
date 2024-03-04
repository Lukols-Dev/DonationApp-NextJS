export class PaypalPayment {
  static async paypalCreateOrder(uid: string, data: any) {
    return (
      await fetch(
        `https://donation-app-next-js.vercel.app/api/payments/paypal/create-order`,
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
        `https://donation-app-next-js.vercel.app/api/payments/paypal/capture-order`,
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
        `https://donation-app-next-js.vercel.app/api/payments/paypal/payouts`,
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
