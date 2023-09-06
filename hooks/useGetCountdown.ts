import { getCountdown } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function useGetCountdown(date?: Date, enabled = true) {
  const [countdownString, setCountdownString] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      if (date !== undefined && enabled) {
        setCountdownString(getCountdown(date));
      }
    }, 1000);

    if (date !== undefined && date < new Date() && enabled) {
      clearInterval(interval);
      setCountdownString('CLOSED');
    }

    return () => {
      clearInterval(interval);
    };
  }, [date, enabled]);

  return countdownString;
}
