import { ProjectActions } from '@/components/AdminPage/ProjectActions';
import { Placeholder } from '@/components/common/Placeholder';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { CONTRACT_ADDRESS } from '@/constants/address';
import { useAuth } from '@/hooks/useAuth';
import { useGetCurrentUser } from '@/hooks/useGetCurrentUser';
import { useGetPools } from '@/hooks/useGetPools';
import { useGetProjects } from '@/hooks/useGetProjects';
import { convertOnChainStatusName } from '@/lib/convertOnChainStatusName';
import { convertProjectStatusName } from '@/lib/convertProjectStatusName';
import { convertProjectStatusToColour } from '@/lib/convertProjectStatusToColour';
import { useRadarEditionsGetEditions } from '@/lib/generated';
import { cn } from '@/lib/utils';
import { chains } from '@/lib/wagmi';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';
import { transformProjectsWithChainData } from '../../lib/transformProjectsWithChainData';
import { EditionStatus } from '../../types/web3';
import { WithdrawFundsDialog } from '@/components/AdminPage/WithdrawFundsDialog';

export default function AdminPage() {
  const { data } = useGetCurrentUser();
  const { data: databaseProjectData } = useGetProjects();
  const { data: poolsData } = useGetPools();
  const { isLoggedIn } = useAuth();

  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
  });

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

  const projects = transformProjectsWithChainData(
    databaseProjectData,
    onChainProjects,
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
            User launches project (in /profile/:address page via Launch Project
            button)
          </li>
          <li>Project is live!</li>
        </ul>
      </div>
      <WithdrawFundsDialog />
      <h2 className="py-4 text-3xl font-bold">Projects</h2>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>ID (on-chain / database)</TableHead>
              <TableHead>Status (on-chain / database)</TableHead>
              <TableHead>Brief</TableHead>
              <TableHead>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p>
                        Assigned Brief ID (on-chain / database){' '}
                        <InfoIcon className="inline" width={14} height={14} />
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      Brief ID needs to be the same on-chain and in the database
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableHead>
              <TableHead>Founder Address</TableHead>
              <TableHead>Mint End Date</TableHead>
              <TableHead>Video URL</TableHead>
              <TableHead>Video ID</TableHead>
              <TableHead>Curation Start</TableHead>
              <TableHead>Curation End</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => {
              const projectShouldBeStopped =
                project.onChainStatus === EditionStatus.LAUNCHED &&
                new Date(project.mint_end_date) < new Date();
              return (
                <TableRow
                  key={project._id}
                  className={cn(projectShouldBeStopped && 'bg-red-100')}
                >
                  <TableCell>
                    <Link
                      href={`/project/${project._id}`}
                      className="underline"
                    >
                      {project.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {project.editionId ?? 'NA'} / {project._id}
                  </TableCell>
                  <TableCell>
                    <span>{convertProjectStatusName(project.status)} </span>
                    <Badge
                      variant="none"
                      className={cn(
                        convertProjectStatusToColour(project.status),
                        'h-3 w-3 p-0',
                      )}
                    />{' '}
                    /{' '}
                    <span>
                      {project.onChainStatus !== undefined
                        ? convertOnChainStatusName(project.onChainStatus)
                        : 'NA'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Link href={`/pool/${project.pool}`} className="underline">
                      {project.brief}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {project.pool ?? 'no database ID assigned'} /{' '}
                    {project.onChainBriefId || 'no on-chain ID assigned'}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/profile/${project.admin_address}`}
                      className="underline"
                    >
                      {project.admin_address}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <p
                            className={cn(
                              projectShouldBeStopped &&
                                'font-bold text-red-700',
                            )}
                          >
                            {new Date(
                              project.mint_end_date,
                            ).toLocaleDateString()}
                            {projectShouldBeStopped && (
                              <InfoIcon
                                className="inline"
                                width={14}
                                height={14}
                              />
                            )}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          Project needs to be stopped on-chain (via Actions) if
                          minting is to be disabled
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{project.video_url}</TableCell>
                  <TableCell>{project.video_id || 'NA'}</TableCell>
                  <TableCell>
                    <p>
                      {project.curation?.start
                        ? new Date(project.curation.start).toLocaleDateString()
                        : 'NA'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <p>
                      {project.curation?.end
                        ? new Date(project.curation.end).toLocaleDateString()
                        : 'NA'}
                    </p>
                  </TableCell>
                  <TableCell>
                    <ProjectActions {...project} />
                  </TableCell>
                </TableRow>
              );
            })}
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
                    {pool.title}
                  </Link>
                </TableCell>
                <TableCell>
                  <p>{pool._id}</p>
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
