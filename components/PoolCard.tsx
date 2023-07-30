import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

interface Props {
  title: string;
  poolAmount: number;
  projectSubmitted: number;
}

export function PoolCard({ title, poolAmount, projectSubmitted }: Props) {
  return (
    <div className="funding-pool-block">
      <img
        src="/background1.png"
        className="what-if-block-image-header object-cover"
      />
      <h2 className="what-if-title">
        {title}
        <br />
      </h2>
      <div className="flex justify-between w-full space-x-2 px-6 pt-2">
        <div className="border rounded p-4 w-full">
          <div className="small-text">{"Remaining Funding pool"}</div>
          <div className="_5px-div" />
          <div className="funding-pool-numbers">
            <span className="small">{"$"}</span>
            {poolAmount.toLocaleString()}
          </div>
        </div>
        <div className="border rounded p-4 w-full">
          <div className="small-text">
            {"Projects Submitted "}
            <Link href="#" target="_blank">
              <span className="underline">{""}</span>
            </Link>
            <br />
          </div>
          <div className="funding-pool-numbers pt-1">{projectSubmitted}</div>
        </div>
      </div>
      <div className="w-full px-6 pt-6">
        <Button className="w-full" asChild>
          <Link href="/pool">SEE POOL</Link>
        </Button>
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
        className="sponsor-image absolute rounded-full top-[2%] left-[20%] floating"
        loading="lazy"
        alt="OP Games sponsor image"
        width={77}
        height={77}
        src="/hand.jpg"
      />
    </div>
  );
}
