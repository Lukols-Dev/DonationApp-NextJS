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
    returnUrl: process.env.NEXT_PUBLIC_URL,
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
    sign: process.env.NEXT_PUBLIC_CASHBILL_API_KEY,
  });

  try {
    const response = await fetch(
      `https://pay.cashbill.pl/ws/rest/payment/${process.env.NEXT_PUBLIC_CASHBILL_POS_ID}`,
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
