import { _Builtin } from "@/devlink";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export function FundingPoolTabs() {
  return (
    <div className={"funding-pool-header"}>
      <div className={"funding-pool-title"}>
        <h1 className={"feature-heading center"}>
          FUNDING THE FUTURE THROUGH FUNDING POOLS
        </h1>
      </div>
      <div className={"_20px-div"} />
      <div className="">
        <Tabs defaultValue="why-funding-pools">
          <TabsList className="grid w-full grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
            <TabsTrigger
              className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal border-b-0"
              value="why-funding-pools"
            >
              Why funding pools
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal border-b-0"
              value="getting-funded"
            >
              Getting funded
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal border-b-0"
              value="creating-pool"
            >
              Creating a pool
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="why-funding-pools"
            className="max-w-5xl w-full mx-auto text-center border p-16 rounded-lg"
          >
            {
              "To accelerate the better futures we believe in, we’re collaborating with visionary partners: investors, individuals, blockchains, and brands who have deep conviction in an opportunity space that’s inherently linked to one of our futures."
            }
            <br />
            <br />
            {
              "Together, we’ll set bespoke briefs with dedicated funding pools to inspire and attract builders to build in answer to the briefs and distribute the funds via RADARLaunch."
            }
            <br />
            <br />
            {
              "Unlike traditional hackathons where only a few projects receive prizes, on Launch 100% of the funding pool will be dispersed among participating builders — with funders able to support as many projects as they’d like until the funding pool is closed."
            }
          </TabsContent>
          <TabsContent
            value="getting-funded"
            className="max-w-5xl w-full mx-auto text-center border p-16 rounded-lg"
          >
            <div className={"pricing-grid"}>
              <div
                className={"pricing-card-three"}
                id={"w-node-_49230e1b-43ad-541c-866d-cdfa85fdae69-85fdae53"}
              >
                <Image
                  className={"image-29"}
                  width={100}
                  height={100}
                  alt="Be inspired by a brief"
                  loading="lazy"
                  src="/inspired.svg"
                />
                <p className={"body-text center"}>{"Be inspired by a brief"}</p>
              </div>
              <div
                className={"pricing-card-three"}
                id={"w-node-_49230e1b-43ad-541c-866d-cdfa85fdae6d-85fdae53"}
              >
                <Image
                  className={"image-29"}
                  width={100}
                  height={100}
                  alt="Submit your vision"
                  loading="lazy"
                  src="/vision.svg"
                />
                <p className={"body-text center"}>{"Submit your vision"}</p>
              </div>
              <div
                className={"pricing-card-three"}
                id={"w-node-_49230e1b-43ad-541c-866d-cdfa85fdae71-85fdae53"}
              >
                <Image
                  className={"image-29"}
                  width={100}
                  height={100}
                  alt="Be inspired by a brief"
                  loading="lazy"
                  src="/inspired.svg"
                />
                <p className={"body-text center"}>{"Launch on the platform"}</p>
              </div>
              <div
                className={"pricing-card-three"}
                id={"w-node-_49230e1b-43ad-541c-866d-cdfa85fdae75-85fdae53"}
              >
                <Image
                  className={"image-29"}
                  width={100}
                  height={100}
                  alt="Get funded from the pool and public"
                  loading="lazy"
                  src="/leaves.svg"
                />
                <p className={"body-text center"}>
                  {"Get funded from the pool and public"}
                </p>
              </div>
            </div>
            <div className={"_20px-div"} />
            <Link
              className={"link-block-6"}
              href="https://radarxyz.notion.site/Funding-Pools-Partner-Briefs-07b0753b0f6f401f9249fe8e0537ef03?pvs=4"
              target="_blank"
            >
              <Link
                href="https://radarxyz.notion.site/Funding-Pools-Partner-Briefs-07b0753b0f6f401f9249fe8e0537ef03?pvs=4"
                target="_blank"
                className={"body-text center hover:underline"}
              >
                {"Learn more about pools "}
                <span className={"arrow-diagonal"}>{"↗"}</span>
              </Link>
            </Link>
          </TabsContent>
          <TabsContent
            value="creating-pool"
            className="max-w-5xl w-full mx-auto text-center border p-16 rounded-lg"
          >
            <p className={"body-text center"}>
              {
                "If you’re a visionary builder, investor, individual, blockchain, or brand with deep conviction in an opportunity space you’ve identified and want to influence the energy that’s bubbling up around it, "
              }
              <Link className={"underline"} href="mailto:admin@radardao.xyz">
                {"reach out to us."}
              </Link>
              <br />
              <br />
              {
                "In this partnership you bring technical expertise and innovation, we bring deep cultural insight by researching the past, present, and future. It’s this combo that makes the partnership magic, and results in ideas that are poised for adoption."
              }
              <br />
              <br />
              <Link className={"underline"} href="/brief">
                {"Read some examples of our community inspired briefs"}
              </Link>
            </p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
