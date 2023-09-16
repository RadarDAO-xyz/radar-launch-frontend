import { THE_NEW_PLAYERS_POOL_ID } from '@/constants/database';
import Link from 'next/link';

export function Banner() {
  return (
    <div className="w-full border-t bg-white px-[5%] py-3 text-center">
      <Link
        href={`/pool/${THE_NEW_PLAYERS_POOL_ID}`}
        className="hover:underline"
      >
        THE NEW PLAYERS: $10,000 prize pool powered by OP Games & Future
        Primitive <span className="arrow-diagonal ml-0">{'↗'}</span>
      </Link>
    </div>
  );
}
