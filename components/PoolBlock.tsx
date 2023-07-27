import Link from "next/link";
import { Button } from "./ui/button";
import { Pool } from "@/types/mongo";

interface Props {
    title: string;
    pool_amount: number;
}
export function PoolBlock({
    title,
    pool_amount
}: Props) {

    return (
        <div className="funding-pool-block">
          <img
            src="/background1.png"
            className="what-if-block-image-header object-cover"
          />
          <div className="what-if-title">
            {title}
            <br />
          </div>
          <div className="flex justify-between w-full space-x-2 px-6 pt-6">
            <div className="border rounded p-4 w-full">
              <div className="small-text">{"Remaining Funding pool"}</div>
              <div className="_5px-div" />
              <div className="funding-pool-numbers">
                <span className="small">{"$"}</span>
                {pool_amount}
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
              <div className="funding-pool-numbers pt-1">{"172"}</div>
            </div>
          </div>
          <div className="w-full px-6 pt-6">
            <Button className="w-full" asChild>
              <Link href="/pool">SEE POOL</Link>
            </Button>
          </div>
          <img
            className="sponsor-image _50 floating"
            loading="lazy"
            width={94}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64b6a86d9f0d6a0981e16e44_62051e643514d22dbaca1d3b_Apple%20Icon.png"
          />
        </div>
    )
}