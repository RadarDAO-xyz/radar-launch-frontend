import { type ClassValue, clsx } from "clsx";
import differenceInDays from "date-fns/differenceInDays";
import { twMerge } from "tailwind-merge";
import differenceInHours from "date-fns/differenceInHours";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { getAddress } from "viem";
import { chains } from "@/components/Web3Provider";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const shortenAddress: (arg0: string) => string = (address) => {
  if (!address) return "no address provided";
  if (address.length < 6) {
    return address;
  }
  const start = address.slice(0, 6);
  const end = address.slice(address.length - 4);
  return `${start}...${end}`;
};

export function getCountdown(date: Date) {
  const today = new Date();

  const daysLeft = differenceInDays(date, today);
  const hoursLeft = differenceInHours(date, today) - daysLeft * 24;
  const minutesLeft =
    differenceInMinutes(date, today) - daysLeft * 24 * 60 - hoursLeft * 60;

  const daysLeftString = daysLeft < 10 ? `0${Math.max(daysLeft, 0)}` : daysLeft;
  const hoursLeftString =
    hoursLeft < 10 ? `0${Math.max(hoursLeft, 0)}` : hoursLeft;
  const minutesLeftString =
    minutesLeft < 10 ? `0${Math.max(minutesLeft, 0)}` : minutesLeft;

  return `${daysLeftString}d ${hoursLeftString}h ${minutesLeftString}m`;
}

// Objects and functions copied from "viem" below as there are some errors happening on Netlify functions

export const etherUnits = {
  gwei: 9,
  wei: 18,
};
export const gweiUnits = {
  ether: -9,
  wei: 9,
};
export const weiUnits = {
  ether: -18,
  gwei: -9,
};

export function parseEther(ether: string, unit: "wei" | "gwei" = "wei") {
  return parseUnits(ether, etherUnits[unit]);
}

export function parseUnits(value: string, decimals: number) {
  let [integer, fraction = "0"] = value.split(".");

  const negative = integer.startsWith("-");
  if (negative) integer = integer.slice(1);

  // trim leading zeros.
  fraction = fraction.replace(/(0+)$/, "");

  // round off if the fraction is larger than the number of decimals.
  if (decimals === 0) {
    if (Math.round(Number(`.${fraction}`)) === 1)
      integer = `${BigInt(integer) + 1n}`;
    fraction = "";
  } else if (fraction.length > decimals) {
    const [left, unit, right] = [
      fraction.slice(0, decimals - 1),
      fraction.slice(decimals - 1, decimals),
      fraction.slice(decimals),
    ];

    const rounded = Math.round(Number(`${unit}.${right}`));
    if (rounded > 9)
      fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, "0");
    else fraction = `${left}${rounded}`;

    if (fraction.length > decimals) {
      fraction = fraction.slice(1);
      integer = `${BigInt(integer) + 1n}`;
    }

    fraction = fraction.slice(0, decimals);
  } else {
    fraction = fraction.padEnd(decimals, "0");
  }

  return BigInt(`${negative ? "-" : ""}${integer}${fraction}`);
}

export function formatEther(wei: bigint, unit: "wei" | "gwei" = "wei") {
  return formatUnits(wei, etherUnits[unit]);
}

export function formatUnits(value: bigint, decimals: number) {
  let display = value.toString();

  const negative = display.startsWith("-");
  if (negative) display = display.slice(1);

  display = display.padStart(decimals, "0");

  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals),
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${
    fraction ? `.${fraction}` : ""
  }`;
}

export function convertAddressToChecksum(address?: string) {
  if (!address) {
    return address;
  }
  try {
    return getAddress(address, chains[0].id);
  } catch (e) {
    console.error(e);
  }
  return address;
}
