import { cn } from "@/lib/utils";
import { Project, ProjectStatus } from "@/types/mongo";
import { VisionCardActions } from "./VisionCardActions";
import { Badge } from "./ui/badge";
import { ProjectWithBalance } from "@/pages/profile/[id]";
import { formatEther } from "viem";
import Link from "next/link";
import { generateVideoThumbnail } from "@/lib/generateVideoThumbnail";

function convertStatusName(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.IN_REVIEW:
      return "In review";
    case ProjectStatus.APPROVED:
      return "Approved";
    case ProjectStatus.LIVE:
      return "Live";
    case ProjectStatus.BUILDING:
      return "Closed & Building";
    case ProjectStatus.REJECTED:
      return "Rejected";
    case ProjectStatus.CANCELLED:
      return "Cancelled";
    default:
      return "Unknown status";
  }
}

function convertStatusToColour(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.IN_REVIEW:
      return "bg-yellow-300";
    case ProjectStatus.APPROVED:
      return "bg-orange-500";
    case ProjectStatus.LIVE:
      return "bg-green-400";
    case ProjectStatus.BUILDING:
      return "bg-purple-800";
    case ProjectStatus.REJECTED:
      return "bg-red-700";
    case ProjectStatus.CANCELLED:
      return "bg-gray-900";
    default:
      return "Unknown status";
  }
}

export function VisionCard(props: ProjectWithBalance) {
  const { _id, status, video_url, title, collaborators, balance } = props;
  return (
    <div className="p-2 col-span-1">
      <div className="flex justify-between items-center pb-2">
        <p>{convertStatusName(status)}</p>
        <Badge
          variant="none"
          className={cn(convertStatusToColour(status), "h-3 w-3 p-0")}
        />
      </div>
      <img src={generateVideoThumbnail(video_url)} alt={title + " thumbnail"} />
      <div className="my-4">
        <Link href={`/project/${_id}`} className="hover:opacity-70">
          {title}
        </Link>
      </div>
      <hr className="mb-3" />
      <div className="space-y-2 pb-8">
        <div className="grid grid-cols-2">
          <div className="border rounded-lg p-3 rounded-r-none text-gray-400">
            NFTs Sold
          </div>
          <div className="border border-l-0 rounded-lg rounded-l-none p-3">
            0
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border rounded-lg p-3 rounded-r-none text-gray-400">
            Funding Raised
          </div>
          <div className=" border border-l-0 rounded-lg rounded-l-none p-3">
            {formatEther(balance).slice(0, 9)} ETH
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border rounded-lg p-3 rounded-r-none text-gray-400">
            Waitlist
          </div>
          <div className=" border border-l-0 rounded-lg rounded-l-none p-3">
            0
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="border rounded-lg p-3 rounded-r-none text-gray-400">
            Collaborators
          </div>
          <div className="border border-l-0 rounded-lg rounded-l-none p-3">
            0
          </div>
        </div>
      </div>
      <VisionCardActions {...props} />
    </div>
  );
}
