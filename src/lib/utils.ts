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

export const calculateIncomeSummary = (props: any) => {
  const { messages, year, month } = props;

  const summaries = {
    monthly: null,
    yearly: null,
  };

  const currentYear = year || new Date().getFullYear();
  const currentMonth = month !== undefined ? month - 1 : new Date().getMonth();

  const yearlyMessages = messages.filter((message: any) => {
    const messageDate = new Date(message.create_at.seconds * 1000);
    return messageDate.getFullYear() === currentYear;
  });

  summaries.yearly = yearlyMessages.reduce(
    (sum: any, message: any) => sum + message.amount,
    0
  );

  if (month !== undefined || year === undefined) {
    const monthlyMessages = yearlyMessages.filter((message: any) => {
      const messageDate = new Date(message.create_at.seconds * 1000);
      return messageDate.getMonth() === currentMonth;
    });

    summaries.monthly = monthlyMessages.reduce(
      (sum: any, message: any) => sum + message.amount,
      0
    );
  }

  if (year === undefined && month === undefined) {
    return summaries;
  } else if (month !== undefined) {
    return { monthly: summaries.monthly };
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
  return Object.keys(obj).length === 0;
};

export const formatNumber = (number: number) => {
  return number.toLocaleString("pl-PL");
};

export const validateRequiredData = (curr: any) => {
  const requiredFields = [
    "charges_enabled",
    "details_enabled",
    "payouts_enabled",
  ];

  const missingFields = requiredFields.filter((field) => !!curr[field]);

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
  paymentMethodFees: PaymentMethodFees
): FeeCalculationResult => {
  let feeAmount = totalAmount * (applicationFeePercent / 100);

  if (paymentMethod in paymentMethodFees) {
    const additionalFeePercent = paymentMethodFees[paymentMethod];
    feeAmount += totalAmount * (additionalFeePercent / 100);
  }

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
