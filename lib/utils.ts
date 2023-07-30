import { type ClassValue, clsx } from "clsx";
import differenceInDays from "date-fns/differenceInDays";
import { twMerge } from "tailwind-merge";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCountdown(date: Date) {
  const today = new Date();

  const daysLeft = differenceInDays(date, today);
  const hoursLeft = differenceInHours(date, today) - daysLeft * 24;
  const minutesLeft =
    differenceInMinutes(date, today) - daysLeft * 24 * 60 - hoursLeft * 60;

  return `${daysLeft < 10 ? `0${daysLeft}` : daysLeft}d ${
    hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft
  }h ${minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}m`;
}
