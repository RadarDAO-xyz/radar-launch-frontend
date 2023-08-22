import { getCountdown } from "@/lib/utils";
import { useEffect, useState } from "react";

export function useGetCountdown(date?: Date) {
  const [countdownString, setCountdownString] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (date !== undefined) {
        setCountdownString(getCountdown(date));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return countdownString;
}
