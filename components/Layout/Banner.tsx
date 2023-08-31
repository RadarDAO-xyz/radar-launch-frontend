import Link from 'next/link';

export function Banner() {
  return (
    <div className="w-full border-t bg-white px-[5%] py-3 text-center">
      <Link href="/pool/64d501ee081e901b9fdfaea9" className="hover:underline">
        THE NEW PLAYERS: $10,000 prize pool powered by OP Games & Future
        Primitive <span className="arrow-diagonal ml-0">{'↗'}</span>
      </Link>
    </div>
  );
}
