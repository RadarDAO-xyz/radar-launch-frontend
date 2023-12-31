import { useGetPoolProjects } from '@/hooks/useGetPoolProjects';
import { cn } from '@/lib/utils';
import { Pool, ProjectStatus } from '@/types/mongo';
import Link from 'next/link';
import { Button } from '../ui/button';

export function PoolCard({
  title,
  _id,
  hero_image,
  pool_amount,
  sponsors,
}: Pool) {
  const { data } = useGetPoolProjects(_id);
  return (
    <div className="relative rounded-lg border px-5 py-10">
      <img
        alt="Pool image"
        width={342}
        height={150}
        src={hero_image || '/background1.png'}
        className={cn('what-if-block-image-header mx-auto mb-0 object-cover')}
      />
      <h2
        className={cn(
          'mx-auto line-clamp-2 w-4/5 pt-4 text-center text-xl uppercase leading-5',
        )}
      >
        {title}
      </h2>
      <div className="flex w-full flex-col justify-between space-y-2 px-2 pt-2 md:flex-row md:space-x-2 md:space-y-0">
        <div className="w-full rounded-lg border p-4">
          <div className="small-text">{'Remaining Prize pool'}</div>
          <div className="_5px-div" />
          <div className={cn('funding-pool-numbers')}>
            <span className="small">{'$'}</span>
            {pool_amount !== undefined ? pool_amount.toLocaleString() : '-'}
          </div>
        </div>
        <div className="w-full rounded-lg border p-4">
          <div className={'small-text'}>{'Projects Submitted '}</div>
          <div className={cn('funding-pool-numbers pt-1')}>
            {data?.filter((project) => project.status === ProjectStatus.LIVE)
              .length || 0}
          </div>
        </div>
      </div>{' '}
      <div className="w-full pt-6">
        <Button className={'w-full'} asChild>
          <Link href={`/pool/${_id}`}>SEE POOL</Link>
        </Button>
      </div>
      <div className="absolute top-[2%] flex space-x-2">
        {sponsors
          .filter(
            (sponsor) =>
              typeof sponsor.logo === 'string' && sponsor.logo !== undefined,
          )
          .map((sponsor) => (
            <img
              key={sponsor.name}
              className={'aspect-square rounded-full bg-white object-contain'}
              loading="lazy"
              alt={sponsor.name + ' logo image'}
              width={77}
              height={77}
              src={sponsor.logo!}
            />
          ))}
      </div>
    </div>
  );
}
