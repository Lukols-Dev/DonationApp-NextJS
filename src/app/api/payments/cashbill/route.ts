import { NextResponse } from "next/server";

interface IParams {
  id?: string;
}

export const POST = async (req: Request, { params }: { params: IParams }) => {
  const { data }: { data: any } = await req.json();
  //   const { id } = params;

  const { amount, paymentMethod }: any = data;
  const paymentData = JSON.stringify({
    title: "Tipey payment",
    amount: {
      value: 5,
      currencyCode: "pln",
    },
    description: "Wspardzie na dalszy rozwój działalności.",
    returnUrl: "https://donation-app-next-js.vercel.app",
    // negativeReturnUrl,
    // paymentChannel,
    languageCode: "PL",
    // personalData: {
    //   firstName: personalData.firstName,
    //   surname: personalData.surname,
    //   email: personalData.email,
    //   country: personalData.country,
    //   city: personalData.city,
    //   postcode: personalData.postcode,
    //   street: personalData.street,
    //   house: personalData.house,
    //   flat: personalData.flat,
    //   ip: personalData.ip
    // },
    // referer,
    // options,
    sign: "1870021741.5aa4e00deb54d1b5735c42a1ab5765f02f88fceb",
  });

  try {
    const response = await fetch(
      `https://pay.cashbill.pl/ws/rest/payment/dc07c1e0da5f270b98e4675c84df2003`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + process.env.NEXT_PUBLIC_CASHBILL_API_KEY,
        },
        body: paymentData,
      }
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Error" }, { status: 404 });
    }

    return NextResponse.json(response, {
      status: 200,
      statusText: "OK",
    });
  } catch (err) {
    console.error("Error payment: ", err);
    return NextResponse.json(
      { error: "Error updating document" },
      { status: 500 }
    );
  }
};
