import localFont from "next/font/local";

const generalSansBold = localFont({
  src: "./GeneralSans/GeneralSans-Bold.ttf",
  display: "swap",
});

const generalSansMedium = localFont({
  src: "./GeneralSans/GeneralSans-Medium.ttf",
  display: "swap",
});

export const generalSans = {
  bold: generalSansBold,
  medium: generalSansMedium,
};
