import { FundingPoolTabs, _Builtin } from "@/devlink";
import Link from "next/link";
import { Button } from "./ui/button";

export function FundingPoolHome() {
  return (
    <section className="container pt-16 mt-[80px]">
      <div className="funding-pool-title">
        <h1 className="feature-heading pb-4">{"Funding Pools"}</h1>
        <p className="body-text larger">
          Funding pools are set by visionary partners asking big questions
          around futures they believe in.
          <br />
          <br />
          If you&apos;re a future maker or want to support projects building
          these futures, see below.
          <Link href="#" target="_blank">
            <span className="underline">{""}</span>
          </Link>
          <br />
        </p>
      </div>
      <div className="_20px-div" />
      <div className="funding-pool-wrapper">
        <div className="funding-pool-block">
          <img
            src="/background1.png"
            className="what-if-block-image-header object-cover"
          />
          <div className="what-if-title">
            {"What if NPCs were autonomous beings?"}
            <br />
          </div>
          <div className="flex justify-between w-full space-x-2 px-6 pt-6">
            <div className="border rounded p-4 w-full">
              <div className="small-text">{"Remaining Funding pool"}</div>
              <div className="_5px-div" />
              <div className="funding-pool-numbers">
                <span className="small">{"$"}</span>
                {"7,324"}
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
          <_Builtin.Image
            className="sponsor-image _50 floating"
            loading="lazy"
            width={94}
            height="auto"
            src="https://uploads-ssl.webflow.com/64548f6f8feacfafa79c9592/64b6a86d9f0d6a0981e16e44_62051e643514d22dbaca1d3b_Apple%20Icon.png"
          />
        </div>
        <div className="funding-pool-block">
          <img
            src="/background2.png"
            className="what-if-block-image-header object-cover"
          />
          <p className="what-if-title">
            {"What if you funded a pool to inspire builders?"}
            <br />
          </p>
          <div className="flex justify-between w-full space-x-2 px-6 pt-6">
            <div className="border rounded p-4 w-full">
              <div className="small-text">{"Remaining Funding pool"}</div>
              <div className="_5px-div" />
              <div className="funding-pool-numbers">
                <span className="small">{"$"}</span>
                {"7,324"}
              </div>
            </div>
            <div className="border rounded p-4 w-full">
              <div className="small-text">
                {"Projects Submitted "}
                <br />
              </div>
              <div className="funding-pool-numbers pt-1">{"172"}</div>
            </div>
          </div>
          <div className="w-full px-6 pt-6">
            <Button
              className="w-full bg-gray-100 hover:bg-gray-200"
              variant={"ghost"}
              asChild
            >
              <Link href="/brief">FUND A BRIEF</Link>
            </Button>
          </div>
        </div>
      </div>
      <FundingPoolTabs />
    </section>
  );
}
