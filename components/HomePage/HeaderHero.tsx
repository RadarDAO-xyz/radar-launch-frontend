import dynamic from "next/dynamic";
import Link from "next/link";
import { ReactNode } from "react";
import { HeroSectionAmount } from "./HeroSectionAmount";

const HeroSectionAmountNoSSR = dynamic(
  () => Promise.resolve(HeroSectionAmount),
  {
    ssr: false,
  },
);

interface Props {
  visionOfTheWeekSlot: ReactNode;
}

export function HeaderHero({ visionOfTheWeekSlot }: Props) {
  return (
    <section className="header-featured z-20 bg-transparent pt-10">
      <div className="floating-down-arrow absolute right-[5%] top-[calc(100vh-200px)] hidden items-center justify-between lg:flex">
        <p className="body-text text-base">
          {'Curated projects dropping weekly ↓'}
          <br />
        </p>
        <Link href="https://www.culture3.xyz/" target="_blank" className="flex">
          <span className="curator-text">
            august curated by
            <br />
          </span>
          <img
            className="logo h-5"
            loading="lazy"
            width={56}
            height={20}
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a6a82851e7ea1f12599225_62c421c68db31c451cbecc30_c3full_off_black.svg"
          />
          <div className="arrow-diagonal">{'↗'}</div>
        </Link>
      </div>
      <div className="featured-project-tabs space-x-4 md:w-[80%] lg:w-[80%] lg:space-x-8">
        <div className="about-div home px-[5%]">
          <h1 className="heading-5">
            {'SUPPORT IDEAS AND BUILDERS OF FUTURES YOU BELIEVE IN'}
          </h1>
          <div className="_10px-div" />
          <p className="body-text larger">
            {
              'We believe the future is multiplayer and we need future makers, future adopters and future backers to accelerate adoption.'
            }
            <br />
            <br />{' '}
            {
              'Launch is where you can support future makers, unlock benefits as a patron and build reputation as an future adopter.'
            }
            <Link href="/">
              <span className="underline">{''}</span>
            </Link>
            <br />
          </p>
          <div className="div-block-99">
            <HeroSectionAmountNoSSR />
            <p className="body-text larger">
              {'already committed to build better futures'}
            </p>
          </div>
        </div>
        <div className="visionoftheweek hidden md:flex">
          {visionOfTheWeekSlot}
        </div>
      </div>
      <div className="flex justify-center px-[5%] pt-6 lg:hidden">
        <Link href="https://www.culture3.xyz/" target="_blank" className="flex">
          <p className="curator-text">
            august curated by
            <br />
          </p>
          <img
            className="logo"
            loading="lazy"
            width={56}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64a6a82851e7ea1f12599225_62c421c68db31c451cbecc30_c3full_off_black.svg"
          />
          <div className="arrow-diagonal">{'↗'}</div>
        </Link>
      </div>
    </section>
  );
}
