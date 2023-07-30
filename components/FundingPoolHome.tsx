import { Pool } from "@/types/mongo";
import Link from "next/link";
import { useQuery } from "wagmi";
import { FundingPoolTabs } from "./FundingPoolTabs";
import { PoolCard } from "./PoolCard";
import { Input } from "./ui/input";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

async function getPools(): Promise<Pool[]> {
  try {
    return fetch(`${process.env.BACKEND_URL}/pools`).then((res) => res.json());
  } catch (e) {
    console.log(e);
    return [];
  }
}

export function FundingPoolHome() {
  const { data } = useQuery<Pool[]>(["pools"], getPools);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="container py-20 mt-[80px]">
      <div className="funding-pool-title">
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
      <div className="funding-pool-wrapper">
        <PoolCard
          title={"BRIEF COMING SOON"}
          poolAmount={10000}
          projectSubmitted={0}
        />
      </div>
      <FundingPoolTabs />
    </section>
  );
}
