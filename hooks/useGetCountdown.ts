import { getCountdown } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function useGetCountdown(date?: Date) {
  const [countdownString, setCountdownString] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval', date);
      if (date !== undefined) {
        setCountdownString(getCountdown(date));
      }
    }, 1000);

    if (date !== undefined && date < new Date()) {
      clearInterval(interval);
      setCountdownString('CLOSED');
    }

    return () => {
      clearInterval(interval);
    };
  }, [date]);

  return countdownString;
}
