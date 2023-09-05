import { Pool } from '@/types/mongo';
import Link from 'next/link';
import { HTMLParsedComponent } from '../Layout/HTMLParsedComponent';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

export function PoolProjectHeader({
  title,
  description,
  pool_amount,
  sponsors,
  hero_image,
  subtitle,
  video,
  brief_button_link,
  event_button_link,
  brief_button_text,
  event_button_text,
}: Pool) {
  return (
    <section className="pl-[5%] pr-[5%] lg:border-b-2 lg:pr-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
        <div
          className={cn(
            'pr-6 pt-20 lg:border-r lg:pb-20',
            pool_amount !== undefined ? 'col-span-3' : 'col-span-4',
          )}
        >
          <div className="pb-5">
            <h2 className="mb-1 font-base text-xl text-gray-500">{subtitle}</h2>
            <h1 className="heading-trending-launch-page text-4xl uppercase">
              {title}
            </h1>
            <div className="_20px-div" />
            {<HTMLParsedComponent text={description} />}
          </div>
          <div>
            <Button asChild className="mb-3 w-full">
              <Link target="_blank" href={brief_button_link}>
                {brief_button_text}
              </Link>
            </Button>
            <Button variant={'ghost'} className="w-full" asChild>
              <Link target="_blank" href={event_button_link}>
                {event_button_text}
              </Link>
            </Button>
          </div>
        </div>
        {pool_amount !== undefined && (
          <div className="col-span-2 py-20 lg:mx-auto lg:px-5">
            <div className="div-block-99 no-line">
              <h1 className="heading-5 text-gray-500">
                ${pool_amount.toLocaleString()}
              </h1>
            </div>
            {sponsors.length > 0 && (
              <>
                <p className="small-text">{'FUNDED BY:'}</p>
                <div className="grid divide-y">
                  {sponsors.map((sponsor) => (
                    <div
                      className="flex items-center gap-4 py-3"
                      key={sponsor.name}
                    >
                      <div className="">
                        <img
                          className="aspect-square object-contain"
                          loading="lazy"
                          width="64"
                          height="64"
                          src={sponsor.logo}
                        />
                      </div>
                      <div className="">
                        <p>
                          {sponsor.name}
                          <br />${sponsor.contribution.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <div
          className={cn(
            'max-h-[520px] overflow-hidden text-center',
            pool_amount !== undefined ? 'col-span-3' : 'col-span-4',
          )}
        >
          <img
            src={hero_image}
            className="min-h-full w-full min-w-full max-w-none rounded-none lg:shadow-lg"
            alt="Pool hero"
          />
        </div>
      </div>
    </section>
  );
}
