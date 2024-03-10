"use client";

import React, { useState } from "react";

const SMSCheckout = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Klient został poinformowany ze musi dla paysafecard i sms przejsc autoryzacje z cashbill
    // Logika do integracji z CashBill dla płatności SMS
    // Tutaj należy zaimplementować wysyłanie żądania do API CashBill zgodnie z dokumentacją,
    // np. poprzez wywołanie funkcji, która generuje kod SMS i instrukcje dla użytkownika.

    console.log("PhoneNumber for SMS Premium payment: ", phoneNumber);
    // Poniżej przykładowy sposób użycia fetch do wysyłania danych (zastąp 'your_cashbill_endpoint' odpowiednim endpointem CashBill)
    // fetch('your_cashbill_endpoint', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     phoneNumber: phoneNumber,
    //     // Tutaj dodatkowe parametry zgodnie z API CashBill
    //   }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   // Obsługa odpowiedzi, np. wyświetlenie kodu SMS do wysłania przez użytkownika
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    // });
  };

  return (
    <form className="bg-blue-500 w-full p-4 rounded-md" onSubmit={handleSubmit}>
      <div className="mb-4 text-white">
        Wprowadź numer telefonu, na który zostanie wysłany kod SMS do realizacji
        płatności:
      </div>
      <input
        className="mb-4 p-2"
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Numer telefonu"
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded">
        Wyślij
      </button>
    </form>
  );
};

export default SMSCheckout;
