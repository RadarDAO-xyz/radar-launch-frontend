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
  useRadarEditionsGetBalances,
  useRadarEditionsGetEditions,
} from '@/lib/generated';
import { convertAddressToChecksum } from '@/lib/utils';
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

function transformYourVisionsProjects(
  userId?: string,
  databaseProjects?: Project[],
  chainProjects?: OnChainProject[],
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
  chainBalances?: ProjectIdWithBalance[],
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

export default function AdminPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: userData } = useGetUser(id?.toString());
  // wallet object here is string from GET /user/:id, but WalletResolvable from GET /user/@me
  const address =
    typeof userData?.wallets[0] === 'string'
      ? userData.wallets[0]
      : typeof userData?.wallets[0] === 'object' &&
        'address' in userData?.wallets[0]
      ? (userData.wallets[0] as WalletResolvable).address
      : '';
  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id),
  });
  const { data: ownedOnChainProjects } = useRadarEditionsGetBalances({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    args: [convertAddressToChecksum(address) as Address],
    enabled: Boolean(chains[0].id) && Boolean(address),
  });
  const { data: databaseProjects } = useGetProjects();

  if (userData === undefined) {
    return (
      <Placeholder>
        <h1>No user data found</h1>
      </Placeholder>
    );
  }

  const yourVisionsProjects = transformYourVisionsProjects(
    id?.toString(),
    databaseProjects,
    onChainProjects as OnChainProject[],
  ).filter(
    (project) => project.admin_address.toUpperCase() === address?.toUpperCase(),
  );
  const collectedVisionsProjects = transformCollectionVisionsProject(
    databaseProjects,
    ownedOnChainProjects as ProjectIdWithBalance[],
  );

  return (
    <div className="container mt-[80px] max-w-7xl pb-12 md:pt-6">
      <AdminNav user={userData} />

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
