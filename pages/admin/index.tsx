import { ProjectActions } from '@/components/AdminPage/ProjectActions';
import { chains } from '@/components/Providers/Web3Provider';
import { Badge } from '@/components/ui/badge';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetProjects } from '@/hooks/useGetProjects';
import { convertProjectStatusName } from '@/lib/convertProjectStatusName';
import { convertProjectStatusToColour } from '@/lib/convertProjectStatusToColour';
import { useRadarEditionsGetEditions } from '@/lib/generated';
import { cn } from '@/lib/utils';
import { Project, ProjectStatus } from '@/types/mongo';
import Link from 'next/link';
import { OnChainProject } from '../profile/[id]';
import { Placeholder } from '@/components/Layout/Placeholder';
import { convertOnChainStatusName } from '@/lib/convertOnChainStatusName';
import { useGetPools } from '@/hooks/useGetPools';

function transformProjects(
  databaseProjects?: Project[],
  chainProjects?: OnChainProject[],
) {
  if (!databaseProjects || !chainProjects) {
    return [];
  }

  const projectIdToEditionId = chainProjects.reduce<
    Record<string, { index: number; onChainStatus: number }>
  >((acc, project, index) => {
    acc[project.id] = { index, onChainStatus: project.status };
    return acc;
  }, {});

  return databaseProjects.map((project) => ({
    ...project,
    editionId: projectIdToEditionId[project._id]?.index,
    onChainStatus: projectIdToEditionId[project._id]?.onChainStatus,
  }));
}

export default function AdminPage() {
  const { data } = useGetCurrentUser();
  const { data: databaseProjectData } = useGetProjects();
  const { data: poolsData } = useGetPools();
  const { idToken } = useAuth();

  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id),
  });
  if (!data?.wallets?.[0].address || !idToken) {
    return (
      <Placeholder>
        <h1>Please Login</h1>
      </Placeholder>
    );
  }

  if (!data.bypasser) {
    return (
      <Placeholder>
        <h1>Not authorized to view this page</h1>
      </Placeholder>
    );
  }

  const projects = transformProjects(
    databaseProjectData,
    onChainProjects as OnChainProject[],
  );
  return (
    <section className="mx-auto mt-24 max-w-screen-lg">
      <div>
        <strong>
          Database project status: IN_REVIEW (0), APPROVED (1), LIVE (2),
          BUILDING (3), REJECTED (4), CANCELLED (5)
        </strong>
      </div>
      <div>
        <strong>
          On chain project status: NotCreated (0), Created (1), Launched (2),
          Stopped (3)
        </strong>
      </div>
      <div>
        To modify the 4 featured projects in the homepage, do the following
        <ul>
          <li>
            Copy the curation start date of the project you want to replace,
            e.g. DROP #3
          </li>
          <li>
            Update the curation start date of the new project with the date in
            previous step (go to actions)
          </li>
          <li>Delete the old project</li>
        </ul>
      </div>
      <div>
        Approval process of a project:
        <ul>
          <li>User creates project (in /project/create page)</li>
          <li>
            Admin creates on-chain edition and approves the project (2 buttons
            to press inside Actions)
          </li>
          <li>
            User launches project (in /profile/:id page via Launch Project
            button)
          </li>
          <li>Project is live!</li>
        </ul>
      </div>
      <div className="grid grid-cols-1 gap-4 pb-20 pt-4 lg:grid-cols-3">
        {projects.map((project) => (
          <div className="rounded border p-4" key={project._id}>
            {project.editionId === undefined && (
              <strong>No onchain project found</strong>
            )}
            <h3 className="mb-0 pb-0">{project.title}</h3>
            <p>Edition Id (on-chain): {project.editionId}</p>
            <Link href={`/project/${project._id}`} className="block underline">
              Project Id (database): {project._id}
            </Link>
            <Link
              href={`/profile/${project.founder}`}
              className="block break-all underline"
            >
              Admin address: {project.admin_address}
            </Link>
            <div>
              Database Status: {convertProjectStatusName(project.status)}{' '}
              <Badge
                variant="none"
                className={cn(
                  convertProjectStatusToColour(project.status),
                  'h-3 w-3 p-0',
                )}
              />
            </div>
            <p>
              On Chain Status: {convertOnChainStatusName(project.onChainStatus)}
            </p>
            <p>
              Curation Start:{' '}
              {new Date(project.curation?.start).toLocaleDateString()}
            </p>
            <p>
              Curation End:{' '}
              {new Date(project.curation?.end).toLocaleDateString()}
            </p>
            <ProjectActions {...project} />
          </div>
        ))}
      </div>
      <h2 className="text-3xl font-bold">Pools</h2>
      <div className="grid grid-cols-3 gap-4">
        {poolsData?.map((pool) => (
          <div key={pool._id} className="rounded-lg border p-4">
            <Link href={`/pool/${pool._id}`} className="underline">
              ID: {pool._id}
            </Link>
            <p>Title: {pool.title}</p>
            <p>Subtitle: {pool.subtitle}</p>
            <p>Is hidden: {pool.is_hidden ? 'true' : 'false'}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
