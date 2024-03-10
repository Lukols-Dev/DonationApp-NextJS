import { PaymentMethod, PaymentMethodFees } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const assertValue = <T>(v: T | undefined, errorMessage: string): T => {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
};

export const formatTimestamp = ({
  seconds,
  nanoseconds,
}: {
  seconds: number;
  nanoseconds: number;
}): string => {
  const date = new Date(seconds * 1000 + nanoseconds / 1000000);

  const pad = (num: number) => num.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const secondsStr = pad(date.getSeconds());

  return `${day}.${month}.${year} ${hours}:${minutes}:${secondsStr}`;
};

interface Message {
  create_at: {
    seconds: number;
  };
  amount: number;
}

interface Props {
  messages: Message[];
  year?: number;
  month?: number;
}

interface Summaries {
  monthly: number | null;
  yearly: number | null;
  percentageChange: string | null;
}

export const calculateIncomeSummary = (
  props: Props
):
  | Summaries
  | { monthly: number; percentageChange: string }
  | { yearly: number } => {
  const { messages, year, month } = props;

  const summaries: Summaries = {
    monthly: null,
    yearly: null,
    percentageChange: null,
  };

  const currentYear: number = year || new Date().getFullYear();
  const currentMonth: number =
    month !== undefined ? month - 1 : new Date().getMonth();
  const previousMonth: number = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear: number =
    currentMonth === 0 ? currentYear - 1 : currentYear;

  const yearlyMessages: Message[] = messages.filter((message: Message) => {
    const messageDate = new Date(message.create_at.seconds * 1000);
    return messageDate.getFullYear() === currentYear;
  });

  summaries.yearly = yearlyMessages.reduce(
    (sum: number, message: Message) => sum + message.amount,
    0
  );

  const monthlyMessages: Message[] = yearlyMessages.filter(
    (message: Message) => {
      const messageDate = new Date(message.create_at.seconds * 1000);
      return messageDate.getMonth() === currentMonth;
    }
  );

  summaries.monthly = monthlyMessages.reduce(
    (sum: number, message: Message) => sum + message.amount,
    0
  );

  const previousMonthlyMessages: Message[] = messages.filter(
    (message: Message) => {
      const messageDate = new Date(message.create_at.seconds * 1000);
      return (
        messageDate.getMonth() === previousMonth &&
        messageDate.getFullYear() === previousYear
      );
    }
  );

  const previousMonthSum: number = previousMonthlyMessages.reduce(
    (sum: number, message: Message) => sum + message.amount,
    0
  );

  if (previousMonthSum > 0) {
    const change: number =
      ((summaries.monthly - previousMonthSum) / previousMonthSum) * 100;
    summaries.percentageChange = `${change >= 0 ? "+" : ""}${Math.round(
      change
    )}%`;
  } else if (summaries.monthly > 0) {
    summaries.percentageChange = "+100%"; // Jeśli poprzedni miesiąc był równy 0, a ten ma wartość, ustawiamy wzrost na 100%
  } else {
    summaries.percentageChange = "0%"; // Jeśli zarówno ten, jak i poprzedni miesiąc mają wartość 0, nie ma zmian procentowych
  }

  if (year === undefined && month === undefined) {
    return summaries;
  } else if (month !== undefined) {
    return {
      monthly: summaries.monthly,
      percentageChange: summaries.percentageChange,
    };
  } else {
    return { yearly: summaries.yearly };
  }
};

export const camelToSnake = (input: any): any => {
  if (typeof input === "string") {
    return camelToSnakeString(input);
  } else if (Array.isArray(input)) {
    return input.map((item) => camelToSnake(item));
  } else if (typeof input === "object" && input !== null) {
    const output: { [key: string]: any } = {};
    Object.entries(input).forEach(([key, value]) => {
      output[camelToSnakeString(key)] = camelToSnake(value);
    });
    return output;
  }
  return input;
};

const camelToSnakeString = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

export const toSnakeCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[\s\-]+/g, "_")
    .toLowerCase();
};

export const isEmpty = (obj: object): boolean => {
  if (obj == null) {
    return true;
  }
  return Object.keys(obj).length === 0;
};

export const formatNumber = (number: number) => {
  return number.toLocaleString("pl-PL");
};

export const validateRequiredData = (curr: any) => {
  const requiredFields = [
    "account_type",
    "email",
    "name",
    "surname",
    "nick",
    "address",
    "city",
    "country",
    "bank",
  ];

  const missingFields = requiredFields.filter(
    (field) => !curr[field] || curr[field] === ""
  );

  if (missingFields.length > 0) {
    return false;
  } else {
    return true;
  }
};
interface FeeCalculationResult {
  amountBeforeAppFee: number;
  amountAfterAppFee: number;
  appFee: number;
  methodFee: number;
  amountAppFee: number;
}

export const calculateApplicationFeeAmount = (
  totalAmount: number,
  applicationFeePercent: number,
  paymentMethod: string,
  paymentMethodFees: PaymentMethodFees,
  customElementsFees: { gif?: number; voice?: number }
): FeeCalculationResult => {
  let feeAmount = totalAmount * (applicationFeePercent / 100);
  if (paymentMethod in paymentMethodFees) {
    const additionalFeePercent = paymentMethodFees[paymentMethod];
    feeAmount += totalAmount * (additionalFeePercent / 100);
  }

  let customFee = 0;
  if (customElementsFees.gif) {
    customFee += totalAmount * (customElementsFees.gif / 100);
  }
  if (customElementsFees.voice) {
    customFee += totalAmount * (customElementsFees.voice / 100);
  }
  feeAmount += customFee;
  return {
    amountAppFee: Math.round((feeAmount + Number.EPSILON) * 100) / 100,
    amountBeforeAppFee: totalAmount,
    amountAfterAppFee:
      totalAmount - Math.round((feeAmount + Number.EPSILON) * 100) / 100,
    appFee: applicationFeePercent,
    methodFee: paymentMethodFees[paymentMethod],
  };
};

export function debounce(func: any, wait: number) {
  let timeout: any;

  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const calculateTotalPayout = (payments: any[]): number => {
  return payments.reduce((acc, payment) => {
    const payout = Number(payment.payout);
    if (!isNaN(payout)) {
      return acc + payout;
    }
    return acc;
  }, 0);
};

interface SpeakOptions {
  text: string;
  rate?: number; // speed
  volume?: number; // volume
  voice?: SpeechSynthesisVoice | string; // voice type
  pitch?: number; // pitch
  onEnd?: () => void; // callback
}

export const speakText = (options: SpeakOptions) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(options.text);

  utterance.rate = options.rate || 1;
  utterance.volume = options.volume || 1;
  utterance.pitch = options.pitch || 1;
  utterance.lang = "pl-PL";

  if (typeof options.voice === "string") {
    const voice = synth
      .getVoices()
      .find((voice) => voice.name === options.voice);
    utterance.voice = voice || null;
  } else if (options.voice instanceof SpeechSynthesisVoice) {
    utterance.voice = options.voice;
  }

  if (options.onEnd) {
    utterance.onend = options.onEnd;
  }

  console.log("Speech synthesis triggered");
  synth.speak(utterance);
};

export const cancelSpeaking = () => {
  const synth = window.speechSynthesis;
  synth.cancel();
};

export const formatAmountToText = (amount: number): string => {
  const zlote = Math.floor(amount);
  const grosze = Math.round((amount - zlote) * 100);

  let result = "";

  if (zlote > 0) {
    result += `${zlote} złot${zlote === 1 ? "y" : zlote < 5 ? "e" : "ych"}`;
  }

  if (grosze > 0) {
    if (result.length > 0) result += " i ";
    result += `${grosze} grosz${grosze === 1 ? "" : grosze < 5 ? "e" : "y"}`;
  } else if (zlote === 0) {
    result = "0 groszy";
  }

  return result;
};

export const getLibGifs = async (searchTerm: string) => {
  const apikey = "AIzaSyDeg-t8jWJU4ngd0GpYm-2L4dB-7tMBjlM";
  const clientkey = "tipey";
  const lmt = 20;
  const search_term = searchTerm;
  const search_url = `https://tenor.googleapis.com/v2/search?q=${search_term}&key=${apikey}&client_key=${clientkey}&limit=${lmt}`;

  try {
    const response = await fetch(search_url);
    if (response.ok) {
      const jsonResponse = await response.json();
      const gifs = jsonResponse.results.map((gif: any) => ({
        preview: gif.media_formats.nanogif.url,
        share: gif.media_formats.gif.url,
      }));
      return gifs;
    } else {
      console.error("HTTP Error:", response.statusText);
      return [];
    }
  } catch (error) {
    console.error("Fetching error:", error);
    return [];
  }
};
