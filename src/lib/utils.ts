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
