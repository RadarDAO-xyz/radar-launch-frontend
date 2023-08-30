import { Pool } from '@/types/mongo';
import Link from 'next/link';
import { HTMLParsedComponent } from '../Layout/HTMLParsedComponent';
import { Button } from '../ui/button';

export function GrantPoolProjectHeader({
  title,
  description,
  pool_amount,
  sponsors,
  hero_image,
  subtitle,
  video,
  brief_button_link,
  event_button_link,
}: Pool) {
  return (
    <section className="pl-[5%] pr-[5%] lg:border-b-2 lg:pr-0">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-8">
        <div className="col-span-3 pr-6 pt-20 lg:border-r lg:pb-20">
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
                {'READ THE BRIEF'}
              </Link>
            </Button>
            <Button variant={'ghost'} className="w-full" asChild>
              <Link target="_blank" href={event_button_link}>
                {'SIGN UP TO NPC DAY'}
              </Link>
            </Button>
          </div>
        </div>
        <div className="col-span-2 py-20 lg:mx-auto lg:px-5">
          <div className="div-block-99 no-line">
            <h1 className="heading-5 text-gray-500">
              ${pool_amount.toLocaleString()}
            </h1>
          </div>
          <p className="small-text">{'FUNDED BY:'}</p>
          {sponsors.map((sponsor) => (
            <div
              className="columns-27 border-b-0 lg:border-b-2"
              key={sponsor.name}
            >
              <div>
                <img
                  className="image-26 aspect-square object-contain"
                  loading="lazy"
                  width="auto"
                  height="auto"
                  src={sponsor.logo}
                />
              </div>
              <div>
                <p>
                  {sponsor.name}
                  <br />${sponsor.contribution.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-3 max-h-[520px] overflow-hidden text-center">
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
