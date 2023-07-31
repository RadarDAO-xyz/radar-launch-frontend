import { useRef } from "react";
import { PoolCard } from "./PoolCard";
import { SetOwnBriefPoolCard } from "./SetOwnBriefPoolCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function FundingPoolHome() {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="container py-20">
      <div className="funding-pool-title pb-20">
        <h1 className="feature-heading pb-4">{"Funding Pools"}</h1>
        <p className="body-text larger">
          Funding pools are set by visionary partners asking big questions
          around futures they believe in.
          <br />
          <br />
          Want to be first to know about new briefs and funding pools?
        </p>
        <div className="flex max-w-[400px] mx-auto space-x-2 pt-8">
          <Input className="" ref={inputRef} placeholder="Email" />
          <Button
            className="max-w-[120px] w-full font-bolded"
            variant={"ghost"}
          >
            SIGN UP
          </Button>
        </div>
      </div>
      <div className="_20px-div" />
      <div className="grid grid-cols-2 gap-10 w-[80%] mx-auto">
        <PoolCard
          title={"BRIEF COMING SOON"}
          poolAmount={10000}
          projectSubmitted={0}
          dropDate={new Date("2023-08-01")}
        />
        <SetOwnBriefPoolCard />
      </div>
    </div>
  );
}
