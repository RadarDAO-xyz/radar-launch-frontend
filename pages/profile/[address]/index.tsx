import { AdminNav } from '@/components/Layout/AdminNav';
import { Placeholder } from '@/components/Layout/Placeholder';
import { CollectedVisions } from '@/components/ProfilePage/CollectedVisions';
import { YourVisions } from '@/components/ProfilePage/YourVisions';
import { chains } from '@/lib/wagmi';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { useGetProjects } from '@/hooks/useGetProjects';
import { useGetUser } from '@/hooks/useGetUser';
import {
  useRadarEditionsBalances,
  useRadarEditionsGetBalances,
  useRadarEditionsGetEditions,
  useRadarEditionsGetUserBeliefs,
} from '@/lib/generated';
import { convertAddressToChecksum, formatEther } from '@/lib/utils';
import { Project, WalletResolvable } from '@/types/mongo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Address } from 'wagmi';
import {
  OnChainProject,
  ProjectWithChainData,
  ProjectIdWithBalance,
  ProjectWithOwnedAmount,
} from '../../../types/web3';
import { useGetUserByAddress } from '@/hooks/useGetUserByAddress';
import { BuilderRewards } from '@/components/ProfilePage/BuilderRewards';
import { BelieverRewards } from '@/components/ProfilePage/BelieverRewards';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';

function transformYourVisionsProjects(
  userId?: string,
  databaseProjects?: Project[],
  chainProjects?: readonly OnChainProject[],
): ProjectWithChainData[] {
  if (!databaseProjects || !chainProjects) {
    return [];
  }

  const projectBalances: Record<string, bigint> = {};
  chainProjects.forEach((project) => {
    projectBalances[project.id] = project.balance;
  });
  const projectIdToEditionId = chainProjects.reduce<Record<string, number>>(
    (acc, project, index) => {
      acc[project.id] = index;
      return acc;
    },
    {},
  );

  return databaseProjects
    .filter((project) => project.founder === userId)
    .map((project) => ({
      ...project,
      balance: projectBalances[project._id],
      editionId: projectIdToEditionId[project._id],
    }));
}

function transformCollectionVisionsProject(
  databaseProjects?: Project[],
  chainBalances?: readonly ProjectIdWithBalance[],
): ProjectWithOwnedAmount[] {
  if (!databaseProjects || !chainBalances) {
    return [];
  }

  const projectBalances: Record<string, bigint> = {};
  chainBalances.forEach((balance) => {
    projectBalances[balance.id] = balance.amount;
  });
  const projectIdToEditionId: Record<string, number> = chainBalances.reduce<
    Record<string, number>
  >((acc, project, index) => {
    acc[project.id] = index;
    return acc;
  }, {});

  return databaseProjects
    .filter((project) => projectBalances[project._id] > 0n)
    .map((project) => ({
      ...project,
      ownedAmount: projectBalances[project._id],
      editionId: projectIdToEditionId[project._id],
    }));
}

function transformBelievedProjects(
  databaseProjects?: Project[],
  chainProjects?: readonly OnChainProject[],
  believedProjects?: readonly boolean[],
) {
  if (
    !chainProjects ||
    !believedProjects ||
    !databaseProjects ||
    chainProjects.length !== believedProjects.length
  ) {
    return [];
  }
  const projectBalances: Record<string, bigint> = {};
  chainProjects.forEach((project) => {
    projectBalances[project.id] = project.balance;
  });
  const projectIdToEdition = chainProjects.reduce<
    Record<string, { editionId: number; isBelieved: boolean }>
  >((acc, project, editionId) => {
    acc[project.id] = {
      editionId,
      isBelieved: believedProjects[editionId],
    };
    return acc;
  }, {});
  return databaseProjects
    ?.map((project) => ({
      ...project,
      ...projectIdToEdition[project._id],
      balance: projectBalances[project._id],
    }))
    .filter((project) => project.isBelieved);
}

export default function ProfilePage() {
  const router = useRouter();
  const { address: addressQuery } = router.query;
  const address = addressQuery?.toString();

  const { data: userData } = useGetUserByAddress(address?.toString());
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
  });
  const { data: ownedOnChainProjects } = useRadarEditionsGetBalances({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    args: [convertAddressToChecksum(address) as Address],
    enabled: Boolean(address),
  });
  const { data: userBeliefs } = useRadarEditionsGetUserBeliefs({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    args: [convertAddressToChecksum(address) as Address],
    enabled: Boolean(address),
  });
  const { data: userBalance } = useRadarEditionsBalances({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    args: [convertAddressToChecksum(address) as Address],
    enabled: Boolean(address),
  });
  const { data: databaseProjects } = useGetProjects();
  const { data: currentUser } = useGetCurrentUser();

  if (userData === undefined || address === undefined) {
    return (
      <Placeholder>
        <h1>No user data found</h1>
      </Placeholder>
    );
  }

  const yourVisionsProjects = transformYourVisionsProjects(
    userData._id,
    databaseProjects,
    onChainProjects,
  ).filter(
    (project) =>
      project.admin_address.toUpperCase() === address.toString().toUpperCase(),
  );
  const collectedVisionsProjects = transformCollectionVisionsProject(
    databaseProjects,
    ownedOnChainProjects,
  );
  const believedProjects = transformBelievedProjects(
    databaseProjects,
    onChainProjects,
    userBeliefs,
  );

  return (
    <div className="container mt-[80px] max-w-7xl pb-12 md:pt-6">
      <AdminNav user={userData} />
      <div className="rounded-lg border p-8">
        <h3 className="text-xl">Rewards</h3>
        <Link
          href="https://radarxyz.notion.site/Launch-Rewards-Coming-October-2023-254e8ff30f4e405780c4cbf4b954aaa6?pvs=4"
          target="_blank"
          className="text-muted-foreground hover:underline"
        >
          Read more about earning rewards ↗
        </Link>
        {userData._id === currentUser?._id && (
          <div className="grid grid-cols-1 gap-4 pt-6 md:grid-cols-2">
            <BuilderRewards projects={yourVisionsProjects} />
            <BelieverRewards
              projects={believedProjects}
              amount={userBalance || 0n}
            />
          </div>
        )}
      </div>
      <div className="mt-8">
        <Tabs defaultValue="your-visions">
          <TabsList className="mx-auto mb-6 w-full justify-start gap-4">
            <TabsTrigger value="your-visions">Your Visions</TabsTrigger>
            <TabsTrigger value="collected-visions">
              Collected Visions
            </TabsTrigger>
          </TabsList>
          <TabsContent value="your-visions">
            {yourVisionsProjects.length === 0 ? (
              <div className="py-20 text-center">
                <p className="pb-4 text-2xl">Nothing to see here yet...</p>
                <Link
                  href="https://www.launch.radardao.xyz/brief"
                  target="_blank"
                  className="underline"
                >
                  Be inspired
                </Link>
              </div>
            ) : (
              <YourVisions projects={yourVisionsProjects} />
            )}
          </TabsContent>
          <TabsContent value="collected-visions">
            {collectedVisionsProjects.length === 0 ? (
              <div className="py-20 text-center">
                {address !== undefined ? (
                  <>
                    <p className="pb-4 text-2xl">Nothing to see here yet...</p>
                    <Link href="/" className="underline">
                      Be inspired
                    </Link>
                  </>
                ) : (
                  <p className="pb-4 text-2xl">Please login</p>
                )}
              </div>
            ) : (
              <CollectedVisions projects={collectedVisionsProjects} />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
