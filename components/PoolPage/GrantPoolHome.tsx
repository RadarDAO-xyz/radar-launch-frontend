import Link from 'next/link';
import { PoolCard } from './PoolCard';
import { SetOwnBriefPoolCard } from './SetOwnBriefPoolCard';
import { Button } from '../ui/button';
import { useGetPool } from '@/hooks/useGetPool';

const FEATURED_POOL_ID = '64d501ee081e901b9fdfaea9';

export function GrantPoolHome() {
  const { data } = useGetPool(FEATURED_POOL_ID);

  return (
    <div className="mx-auto px-[5%] py-20 md:px-0">
      <div className="funding-pool-title pb-20">
        <h1 className="feature-heading pb-4">{'Grant Pools'}</h1>
        <p className="body-text larger ">
          Grant pools are set by visionary partners asking big questions around
          futures they believe in.
          <br />
          <br />
          Want to be first to know about new briefs and grant pools?
        </p>
        <div className="pt-8">
          <Button
            className="w-full max-w-[120px] font-bolded"
            variant={'ghost'}
            asChild
          >
            <Link href="https://t.me/+e97ms5e1fvJiMjhk" target="_blank">
              SIGN UP
            </Link>
          </Button>
        </div>
      </div>
      <div className="_20px-div" />
      <div className="mx-auto grid w-[80%] grid-cols-1 gap-10 lg:grid-cols-2">
        {data && <PoolCard {...data} />}
        <SetOwnBriefPoolCard />
      </div>
    </div>
  );
}
