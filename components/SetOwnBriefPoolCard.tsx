import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

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
      <h2 className={"text-xl text-center pt-4 leading-6"}>
        WANT TO SET YOUR <br />
        OWN BRIEF?
      </h2>
      <div className="flex justify-between w-full space-x-2 pt-2">
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
        <Button className={"w-full"} asChild>
          <Link href="/pool">FUND A BRIEF</Link>
        </Button>
      </div>
    </div>
  );
}
