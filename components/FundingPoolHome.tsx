import Link from "next/link";
import { PoolCard } from "./PoolCard";
import { SetOwnBriefPoolCard } from "./SetOwnBriefPoolCard";
import { Button } from "./ui/button";

export function FundingPoolHome() {

  return (
    <div className="py-20">
      <div className="funding-pool-title pb-20">
        <h1 className="feature-heading pb-4">{"Funding Pools"}</h1>
        <p className="body-text larger px-[5%] md:px-0">
          Funding pools are set by visionary partners asking big questions
          around futures they believe in.
          <br />
          <br />
          Want to be first to know about new briefs and funding pools?
        </p>
        <div className="pt-8">
          <Button
            className="max-w-[120px] w-full font-bolded"
            variant={"ghost"}
            asChild
          >
            <Link href="https://airtable.com/appGvDqIhUSP0caqo/shrkX6fnUJrcYreUy" target="_blank">
              SIGN UP
            </Link>
          </Button>
        </div>
      </div>
      <div className="_20px-div" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-[80%] mx-auto">
        <PoolCard
          title={"BRIEF COMING SOON"}
          poolAmount={10000}
          projectSubmitted={0}
          dropDate={new Date("2023-08-11")}
        />
        <SetOwnBriefPoolCard />
      </div>
    </div>
  );
}
