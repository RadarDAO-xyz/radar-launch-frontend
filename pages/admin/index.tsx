import { CollectedVisions } from "@/components/CollectedVisions";
import { YourVisions } from "@/components/YourVisions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  GOERLI_CONTRACT_ADDRESS,
  MAINNET_CONTRACT_ADDRESS,
} from "@/constants/address";
import { useGetProjects } from "@/hooks/useGetProjects";
import {
  useRadarEditionsGetBalances,
  useRadarEditionsGetEditions,
} from "@/lib/generated";
import isTestnet from "@/lib/utils/isTestnet";
import { Project } from "@/types/mongo";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { useAccount, useNetwork } from "wagmi";

export interface OnChainProject {
  status: number;
  fee: bigint;
  balance: bigint;
  owner: `0x${string}`;
  id: string;
}

export interface ProjectIdWithBalance {
  id: string;
  amount: bigint;
}

export interface ProjectWithBalance extends Project {
  balance: bigint;
}

export interface ProjectWithOwnedAmount extends Project {
  ownedAmount: bigint;
}

function transformYourVisionsProjects(
  databaseProjects?: Project[],
  chainProjects?: OnChainProject[]
): ProjectWithBalance[] {
  if (!databaseProjects || !chainProjects) {
    return [];
  }

  const projectIds = new Set(
    // filter for "" ids
    chainProjects.map((project) => project.id).filter(Boolean)
  );
  const projectBalances: Record<string, bigint> = {};
  chainProjects.forEach((project) => {
    projectBalances[project.id] = project.balance;
  });

  return databaseProjects
    .filter((project) => projectIds.has(project._id))
    .map((project) => ({ ...project, balance: projectBalances[project._id] }));
}

function transformCollectionVisionsProject(
  databaseProjects?: Project[],
  chainBalances?: ProjectIdWithBalance[]
): ProjectWithOwnedAmount[] {
  if (!databaseProjects || !chainBalances) {
    return [];
  }

  const projectBalances: Record<string, bigint> = {};
  chainBalances.forEach((balance) => {
    projectBalances[balance.id] = balance.amount;
  });

  return databaseProjects
    .filter((project) => projectBalances[project._id] > 0n)
    .map((project) => ({
      ...project,
      ownedAmount: projectBalances[project._id],
    }));
}

export default function AdminPage() {
  const { address, status } = useAccount();
  const { chain } = useNetwork();
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chain?.id,
    enabled: Boolean(chain),
  });
  const { data: ownedOnChainProjects } = useRadarEditionsGetBalances({
    account: address,
    address: isTestnet() ? GOERLI_CONTRACT_ADDRESS : MAINNET_CONTRACT_ADDRESS,
    chainId: chain?.id,
    args: [address!],
    enabled: Boolean(chain) && Boolean(address),
  });
  const { data: databaseProjects } = useGetProjects();

  if (status === "disconnected") {
    return (
      <div className="mt-36 container mb-20 text-center">
        <h1>Please login to see the page</h1>
        <p>
          You can login either with your wallet or other social authentication
          providers.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-[80px] pt-6 pb-12 container max-w-7xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/default-avatar.png" />
          </Avatar>
          <div className="space-y-1">
            <h2 className="text-2xl">Founder Name</h2>
            <p className="font-mono text-gray-600">{address}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link href="/">
            Share Update <MoveUpRight className="inline h-3 w-3" />
          </Link>
          <Link href="/">
            Edit Profile <MoveUpRight className="inline h-3 w-3" />
          </Link>
        </div>
      </div>
      <hr className="mt-6" />
      <div className="py-4 flex justify-between items-center">
        <p>Bio</p>
        <Button variant={"ghost"}>Find out more</Button>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="your-visions">
          <TabsList className="justify-start w-full gap-4 mx-auto mb-6">
            <TabsTrigger
              // className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal"
              value="your-visions"
            >
              Your Visions
            </TabsTrigger>
            <TabsTrigger
              // className="data-[state=active]:no-underline data-[state=active]:bg-gray-200 bg-gray-100 rounded font-normal"
              value="collected-visions"
            >
              Collected Visions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="your-visions">
            <YourVisions
              projects={transformYourVisionsProjects(
                databaseProjects,
                onChainProjects as OnChainProject[]
              )}
            />
          </TabsContent>
          <TabsContent value="collected-visions">
            <CollectedVisions
              projects={transformCollectionVisionsProject(
                databaseProjects,
                ownedOnChainProjects as ProjectIdWithBalance[]
              )}
            />
          </TabsContent>
        </Tabs>
        <div className="py-20 text-center">
          <p className="text-2xl pb-4">Nothing to see here yet...</p>
          <Link href="/project" className="underline">
            Be inspired
          </Link>
        </div>
      </div>
    </div>
  );
}
