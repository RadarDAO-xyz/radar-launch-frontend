import Link from "next/link";
import { Button } from "../ui/button";
import { useGetPool } from "@/hooks/useGetPool";
import { Pool } from "@/types/mongo";
import { HTMLParsedComponent } from "../Layout/HTMLParsedComponent";

export function FundingPoolProjectHeader({
  title,
  description,
  pool_amount,
  sponsors,
  subtitle,
  video,
}: Pool) {
  return (
    <section className="project-page-header">
      <div className="columns-28">
        <div className="column-86">
          <div>
            <h1 className="heading-trending-launch-page text-3xl">{title}</h1>
            <div className="_20px-div" />
            {<HTMLParsedComponent text={description} />}
          </div>
          <div>
            <Button asChild className="w-full mb-3">
              <Link href="/">{"READ THE BRIEF"}</Link>
            </Button>
            <Button variant={"ghost"} className="w-full" asChild>
              <Link href="/">{"SEE UP COMING EVENTS FOR THIS BRIEF"}</Link>
            </Button>
          </div>
        </div>
        <div className="column-80">
          <div className="div-block-99 no-line">
            <h1 className="heading-5">${pool_amount.toLocaleString()}</h1>
            <p className="body-text larger">
              {"pool to build"}
              <span className="arrow-diagonal">{""}</span>
              <br />
            </p>
          </div>
          <p className="small-text">{"Supported by:"}</p>
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
      </div>
      <div className="funding-pool-image" />
    </section>
  );
}
