import { Pool } from "@/types/mongo";
import Link from "next/link";
import { useQuery } from "wagmi";
import { FundingPoolTabs } from "./FundingPoolTabs";
import { PoolBlock } from "./PoolBlock";

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
        {data?.map((pool, index) => (
          <PoolBlock
            title={pool.title}
            pool_amount={pool.pool_amount}
            key={index}
          />
        ))}
      </div>
      <FundingPoolTabs />
    </section>
  );
}
