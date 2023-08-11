import { ProjectWithOwnedAmount } from "@/pages/profile/[id]";
import { Project } from "@/types/mongo";
import { Button } from "./ui/button";
import Link from "next/link";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";
import { HTMLParsedComponent } from "./Layout/HTMLParsedComponent";

export function CollectedVision({
  brief,
  title,
  tldr,
  video_url,
  _id,
}: ProjectWithOwnedAmount) {
  return (
    <div className="p-2 col-span-1">
      <HTMLParsedComponent text={brief} className="text-xs pb-2" />
      <img
        src={generateVideoThumbnail(video_url)}
        alt={title + " thumbnail"}
      />{" "}
      <h3 className="py-3 font-semibold">{title}</h3>
      <div className="flex">
        <HTMLParsedComponent
          className="text-xs overflow-hidden h-8  text-ellipsis whitespace-nowrap"
          text={tldr}
        />
        {tldr.length > 60 && (
          <span className="text-sm relative -top-1">...</span>
        )}
      </div>
      <Button className="w-full" asChild>
        <Link href={`/project/${_id}`}>View Updates</Link>
      </Button>
    </div>
  );
}
