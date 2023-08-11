import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function SetOwnBriefPoolCard() {
  return (
    <div className="border px-5 pt-10 rounded-lg relative">
      <Image
        alt="Pool image"
        width={342}
        height={150}
        src="/background2.png"
        className={"what-if-block-image-header object-cover mb-0 mx-auto"}
      />
      <h2 className={cn("text-xl text-center pt-4 uppercase")}>
        WANT TO SET YOUR <br />
        OWN BRIEF?
      </h2>
      <div className="flex justify-between w-full space-y-2 md:space-y-0 md:space-x-2 pt-2 px-2 flex-col md:flex-row">
        <div className="border rounded-lg p-4 w-full">
          <div className="small-text">{"Remaining Funding pool"}</div>
          <div className="_5px-div" />
          <div className={"funding-pool-numbers"}>
            <span className="small">{"$"}</span>
            LOADING
          </div>
        </div>
        <div className="border rounded-lg p-4 w-full">
          <div className={"small-text"}>{"Projects Submitted"}</div>
          <div className={"funding-pool-numbers pt-1"}>LOADING</div>
        </div>
      </div>
      <div className="w-full pt-6">
        <Button className={"w-full mb-6"} asChild>
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
