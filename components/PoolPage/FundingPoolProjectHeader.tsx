import { Pool } from "@/types/mongo";
import Link from "next/link";
import { HTMLParsedComponent } from "../Layout/HTMLParsedComponent";
import { Button } from "../ui/button";

export function FundingPoolProjectHeader({
  title,
  description,
  pool_amount,
  sponsors,
  hero_image,
  subtitle,
  video,
}: Pool) {
  return (
    <section className="pl-[5%]">
      <div className="grid grid-cols-8 gap-6">
        <div className="col-span-3 border-r pr-6 py-20">
          <div>
            <h2 className="text-xl text-gray-500 font-base mb-1">{subtitle}</h2>
            <h1 className="heading-trending-launch-page text-4xl">{title}</h1>
            <div className="_20px-div" />
            {<HTMLParsedComponent text={description} />}
          </div>
          <div>
            <Button asChild className="w-full mb-3">
              <Link href="/">{"READ THE BRIEF"}</Link>
            </Button>
            <Button variant={"ghost"} className="w-full" asChild>
              <Link href="/">{"SIGN UP TO NPC DAY"}</Link>
            </Button>
          </div>
        </div>
        <div className="col-span-2 px-5 py-20">
          <div className="div-block-99 no-line">
            <h1 className="heading-5 text-gray-500">
              ${pool_amount.toLocaleString()}
            </h1>
          </div>
          <p className="small-text">{"FUNDED BY:"}</p>
          {sponsors.map((sponsor) => (
            <div className="columns-27" key={sponsor.name}>
              <div>
                <img
                  className="image-26"
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
        <div className="col-span-3">
          <img src={hero_image} className="w-full h-full object-fill rounded-none shadow-lg" alt="Pool hero" />
        </div>
      </div>
    </section>
  );
}
