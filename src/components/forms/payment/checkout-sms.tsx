"use client";

const PaypalCheckout = () => {
  return (
    <form className="bg-red-500 w-full h-[100px] rounded-md">
      <div>
        Po zaakceptowaniu formularza zostaniesz przekierowany do płatności
        Paypal
      </div>
      <button type="submit"></button>
    </form>
  );
};

export default PaypalCheckout;
