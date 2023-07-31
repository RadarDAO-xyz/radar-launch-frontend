import { cn, getCountdown } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface Props {
  title: string;
  poolAmount: number;
  projectSubmitted: number;
  dropDate?: Date;
}

export function PoolCard({
  title,
  poolAmount,
  projectSubmitted,
  dropDate,
}: Props) {
  return (
    <div className="border px-5 py-10 rounded-lg relative">
      <Image
        alt="Pool image"
        width={342}
        height={150}
        src="/background1.png"
        className={cn(
          "what-if-block-image-header object-cover mx-auto mb-0",
          dropDate ? "grayscale" : ""
        )}
      />
      <h2 className={cn("text-xl text-center pt-4", dropDate ? "text-gray-400" : "")}>
        {title}
      </h2>
      <div className="flex justify-between w-full space-y-2 md:space-y-0 md:space-x-2 pt-2 px-2 flex-col md:flex-row">
        <div className="border rounded-lg p-4 w-full">
          <div className="small-text">{"Remaining Funding pool"}</div>
          <div className="_5px-div" />
          <div
            className={cn(
              "funding-pool-numbers",
              dropDate ? "text-gray-400" : ""
            )}
          >
            <span className="small">{"$"}</span>
            {poolAmount.toLocaleString()}
          </div>
        </div>
        <div className="border rounded-lg p-4 w-full">
          <div className={"small-text"}>{"Projects Submitted "}</div>
          <div
            className={cn(
              "funding-pool-numbers pt-1",
              dropDate ? "text-gray-400" : ""
            )}
          >
            {projectSubmitted}
          </div>
        </div>
      </div>
      <div className="w-full pt-6">
        {dropDate === undefined ? (
          <Button className={"w-full"} asChild>
            <Link href="/pool">SEE POOL</Link>
          </Button>
        ) : (
          <Button disabled className="w-full text-gray-500" variant={"ghost"}>
            BRIEF DROPPING IN {getCountdown(dropDate)}
          </Button>
        )}
      </div>
      <Image
        className="sponsor-image _50 floating"
        loading="lazy"
        alt="OP Games sponsor image"
        width={77}
        height={77}
        src="/op-games.png"
      />
      <Image
        className="sponsor-image absolute rounded-full top-[2%] left-[calc(2%+80px)] floating"
        loading="lazy"
        alt="OP Games sponsor image"
        width={77}
        height={77}
        src="/hand.jpg"
      />
    </div>
  );
}
