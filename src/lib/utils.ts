import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormattedDate() {
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  const months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];

  const now = new Date();
  const day = days[now.getDay()];
  const month = months[now.getMonth()];
  const date = now.getDate();
  const year = now.getFullYear();

  return `${day}, ${month} ${date}, ${year}`;
}

/* FONTS */
import { Dancing_Script } from "next/font/google";
import localFont from "next/font/local";

const dancing_script = Dancing_Script({ subsets: ["latin"] });
const merchant_copy = localFont({
  src: "../assets/fonts/Merchant_Copy.ttf",
});

export { dancing_script, merchant_copy };
