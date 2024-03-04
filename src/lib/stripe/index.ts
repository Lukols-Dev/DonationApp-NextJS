import Stripe from "stripe";

export const stripe = new Stripe(
  "sk_test_51OG5rjFSmbAcuqgTD0dflHLV934cOro2eWjP2Sw3zaRPKnFmCZZNJSy9jPWu7ipcMrzcKxK3v7Tbtq6yFLpcd6S700XVowiFvS" ??
    "",
  {
    apiVersion: "2023-10-16",
    appInfo: {
      name: "Tipey App",
      version: "0.1.0",
    },
  }
);
