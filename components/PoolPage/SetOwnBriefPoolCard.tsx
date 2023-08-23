import Image from 'next/image';
import Link from 'next/link';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function SetOwnBriefPoolCard() {
  return (
    <div className="relative rounded-lg border px-5 pt-10">
      <Image
        alt="Pool image"
        width={342}
        height={150}
        src="/background2.png"
        className={'what-if-block-image-header mx-auto mb-0 object-cover'}
      />
      <h2 className={cn('pt-4 text-center text-xl uppercase leading-5')}>
        WANT TO SET YOUR <br />
        OWN BRIEF?
      </h2>
      <div className="flex w-full flex-col justify-between space-y-2 px-2 pt-2 md:flex-row md:space-x-2 md:space-y-0">
        <div className="w-full rounded-lg border p-4">
          <div className="small-text">{'Remaining Grant pool'}</div>
          <div className="_5px-div" />
          <div className={'funding-pool-numbers'}>
            <span className="small">{'$'}</span>
            LOADING
          </div>
        </div>
        <div className="w-full rounded-lg border p-4">
          <div className={'small-text'}>{'Projects Submitted'}</div>
          <div className={'funding-pool-numbers pt-1'}>LOADING</div>
        </div>
      </div>
      <div className="w-full pt-6">
        <Button className={'mb-6 w-full'} asChild>
          <Link
            href="https://radarxyz.notion.site/Funding-Pools-Partner-Briefs-07b0753b0f6f401f9249fe8e0537ef03?pvs=4"
            target="_blank"
          >
            CREATE A BRIEF
          </Link>
        </Button>
      </div>
    </div>
  );
}
