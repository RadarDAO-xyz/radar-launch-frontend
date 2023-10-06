import { THE_NEW_PLAYERS_POOL_ID } from '@/constants/database';
import { useGetPool } from '@/hooks/useGetPool';
import Link from 'next/link';
import { Button } from '../ui/button';
import { PoolCard } from './PoolCard';

const FEATURED_POOL_TWO_ID = '64ee74a442d2582b74e47f83';
const FEATURED_POOL_THREE_ID = '651d789e6f9cf9ad89552101'

export function PoolHome() {
  const { data: featuredPoolOneData } = useGetPool(THE_NEW_PLAYERS_POOL_ID);
  const { data: featuredPoolTwoData } = useGetPool(FEATURED_POOL_TWO_ID);
  const { data: featuredPoolThreeData } = useGetPool(FEATURED_POOL_THREE_ID);

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
        {featuredPoolThreeData && <PoolCard {...featuredPoolThreeData} />}
        {featuredPoolOneData && <PoolCard {...featuredPoolOneData} />}
        {featuredPoolTwoData && <PoolCard {...featuredPoolTwoData} />}
      </div>
    </div>
  );
}
