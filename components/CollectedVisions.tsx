import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { useRadarEditionsGetEditions } from "@/lib/generated";
import isTestnet from "@/lib/utils/isTestnet";
import { useAccount, useNetwork } from "wagmi";
import { CollectedVision } from "./CollectedVision";
import { Project } from "@/types/mongo";
import { data } from "autoprefixer";
import { ProjectWithOwnedAmount } from "@/pages/admin";

export function CollectedVisions({
  projects,
}: {
  projects: ProjectWithOwnedAmount[];
}) {
  return (
    <div className="p-8 rounded-lg border mb-6">
      <h2 className="text-xl">Collected Visions</h2>
      <div className="grid grid-cols-4 gap-2">
        {projects.map((edition) => (
          <CollectedVision {...edition} key={edition._id} />
        ))}
      </div>
    </div>
  );
}
