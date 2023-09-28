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
import Link from 'next/link';
import { OnChainProject } from '../../types/web3';
import { Placeholder } from '@/components/Layout/Placeholder';
import { convertOnChainStatusName } from '@/lib/convertOnChainStatusName';
import { useGetPools } from '@/hooks/useGetPools';
import { Button } from '@/components/ui/button';
import { transformProjects } from '../../lib/transformProjectsWithChainData';
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';

export default function AdminPage() {
  const { data } = useGetCurrentUser();
  const { data: databaseProjectData } = useGetProjects();
  const { data: poolsData } = useGetPools();
  const { isLoggedIn } = useAuth();

  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id),
  });

  console.log({ data, aasd: data?.bypasser });
  if (!data?.wallets?.[0].address || !isLoggedIn) {
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
      <h2 className="py-4 text-3xl font-bold">Projects</h2>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>ID (on-chain)</TableHead>
              <TableHead>ID (database)</TableHead>
              <TableHead>Founder Address</TableHead>
              <TableHead>Status (on-chain)</TableHead>
              <TableHead>Status (database)</TableHead>
              <TableHead>Curation Start</TableHead>
              <TableHead>Curation End</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project._id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.editionId ?? 'NA'}</TableCell>
                <TableCell>
                  <Link href={`/project/${project._id}`} className="underline">
                    {project._id}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/profile/${project.founder}`}
                    className="underline"
                  >
                    {project.admin_address}
                  </Link>
                </TableCell>
                <TableCell>
                  {convertProjectStatusName(project.status)}{' '}
                  <Badge
                    variant="none"
                    className={cn(
                      convertProjectStatusToColour(project.status),
                      'h-3 w-3 p-0',
                    )}
                  />
                </TableCell>
                <TableCell>
                  <p>{convertOnChainStatusName(project.onChainStatus)}</p>
                </TableCell>
                <TableCell>
                  <p>
                    {new Date(project.curation?.start).toLocaleDateString()}
                  </p>
                </TableCell>
                <TableCell>
                  <p>{new Date(project.curation?.end).toLocaleDateString()}</p>
                </TableCell>
                <ProjectActions {...project} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <h2 className="py-4 text-3xl font-bold">Pools</h2>
      <div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>ID (database)</TableHead>
              <TableHead>Subtitle</TableHead>
              <TableHead>Is Hidden?</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {poolsData?.map((pool) => (
              <TableRow key={pool._id}>
                <TableCell>
                  <Link href={`/pool/${pool._id}`} className="underline">
                    {pool._id}
                  </Link>
                </TableCell>
                <TableCell>
                  <p>{pool.title}</p>
                </TableCell>
                <TableCell>
                  <p>{pool.subtitle}</p>
                </TableCell>
                <TableCell>
                  <p>{pool.is_hidden ? 'true' : 'false'}</p>
                </TableCell>
                <TableCell>
                  <Button asChild>
                    <Link href={`/pool/${pool._id}/edit`}>Edit</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
