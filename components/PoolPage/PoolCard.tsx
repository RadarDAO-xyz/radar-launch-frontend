import { useGetPoolProjects } from "@/hooks/useGetPoolProjects";
import { cn } from "@/lib/utils";
import { Pool, ProjectStatus } from "@/types/mongo";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export function PoolCard({
  title,
  _id,
  hero_image,
  pool_amount,
  sponsors,
}: Pool) {
  const { data } = useGetPoolProjects(_id);
  return (
    <div className="border px-5 py-10 rounded-lg relative">
      <Image
        alt="Pool image"
        width={342}
        height={150}
        src={hero_image || "/background1.png"}
        className={cn("what-if-block-image-header object-cover mx-auto mb-0")}
      />
      <h2
        className={cn(
          "text-xl text-center pt-4 uppercase max-w-[140px] mx-auto leading-5"
        )}
      >
        {title}
      </h2>
      <div className="flex justify-between w-full space-y-2 md:space-y-0 md:space-x-2 pt-2 px-2 flex-col md:flex-row">
        <div className="border rounded-lg p-4 w-full">
          <div className="small-text">{"Remaining Grant pool"}</div>
          <div className="_5px-div" />
          <div className={cn("funding-pool-numbers")}>
            <span className="small">{"$"}</span>
            {pool_amount.toLocaleString()}
          </div>
        </div>
        <div className="border rounded-lg p-4 w-full">
          <div className={"small-text"}>{"Projects Submitted "}</div>
          <div className={cn("funding-pool-numbers pt-1")}>
            {data?.filter((project) => project.status === ProjectStatus.LIVE)
              .length || 0}
          </div>
        </div>
      </div>{" "}
      <div className="w-full pt-6">
        <Button className={"w-full"} asChild>
          <Link href={`/pool/${_id}`}>SEE POOL</Link>
        </Button>
      </div>
      <div className="absolute top-[2%] flex space-x-2">
        {sponsors
          .filter(
            (sponsor) =>
              typeof sponsor.logo === "string" && sponsor.logo !== undefined
          )
          .map((sponsor) => (
            <Image
              key={sponsor.name}
              className={"rounded-full"}
              loading="lazy"
              alt={sponsor.name + " logo image"}
              width={77}
              height={77}
              src={sponsor.logo!}
            />
          ))}
      </div>
    </div>
  );
}
