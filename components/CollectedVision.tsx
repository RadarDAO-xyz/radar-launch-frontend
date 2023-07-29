import { ProjectWithOwnedAmount } from "@/pages/admin";
import { Project } from "@/types/mongo";
import { Button } from "./ui/button";
import Link from "next/link";

export function CollectedVision({
  brief,
  title,
  tldr,
  _id,
}: ProjectWithOwnedAmount) {
  return (
    <div className="p-2 col-span-1">
      <p className="text-xs pb-2">{brief}</p>
      {/* TODO: replace with video  */}
      <div className="w-full h-44 bg-black"></div>
      <h3 className="py-3 font-semibold">{title}</h3>
      <p className="text-xs pb-6">{tldr}</p>
      <Button className="w-full" asChild>
        <Link href={`/project/${_id}`}>View Updates</Link>
      </Button>
    </div>
  );
}
