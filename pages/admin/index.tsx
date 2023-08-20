import { ProjectActions } from "@/components/AdminPage/ProjectActions";
import { chains } from "@/components/Providers/Web3Provider";
import { Badge } from "@/components/ui/badge";
import { CONTRACT_ADDRESS } from "@/constants/address";
import { useAuth } from "@/hooks/useAuth";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useGetProjects } from "@/hooks/useGetProjects";
import { convertProjectStatusName } from "@/lib/convertProjectStatusName";
import { convertProjectStatusToColour } from "@/lib/convertProjectStatusToColour";
import { useRadarEditionsGetEditions } from "@/lib/generated";
import { cn } from "@/lib/utils";
import { Project, ProjectStatus } from "@/types/mongo";
import Link from "next/link";
import { OnChainProject } from "../profile/[id]";

function transformProjects(
  databaseProjects?: Project[],
  chainProjects?: OnChainProject[]
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
  const { idToken } = useAuth();

  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id),
  });
  if (!data?.wallets?.[0].address || !idToken) {
    return (
      <section className="mt-24 max-w-screen-lg mx-auto h-[400px]">
        <h1 className="text-center">Please login</h1>
      </section>
    );
  }

  if (!data.bypasser) {
    return (
      <section className="mt-24 max-w-screen-lg mx-auto h-[400px]">
        <h1 className="text-center">Not authorized to view this page</h1>
      </section>
    );
  }

  const projects = transformProjects(
    databaseProjectData,
    onChainProjects as OnChainProject[]
  );
  return (
    <section className="mt-24 max-w-screen-lg mx-auto">
      <p>
        Database project status: IN_REVIEW (0), APPROVED (1), LIVE (2), BUILDING
        (3), REJECTED (4), CANCELLED (5)
      </p>
      <p>
        On chain project status: NotCreated (0), Created (1), Launched (2),
        Stopped (3)
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pt-4 pb-20">
        {projects.map((project) => (
          <div className="border rounded p-4" key={project._id}>
            {project.editionId === undefined && (
              <strong>No onchain project found</strong>
            )}
            <h3 className="mb-0 pb-0">{project.title}</h3>
            <p>Edition Id (on-chain): {project.editionId}</p>
            <Link href={`/project/${project._id}`} className="underline block">
              Project Id (database): {project._id}
            </Link>
            <Link
              href={`/profile/${project.admin_address}`}
              className="break-all underline block"
            >
              Admin address: {project.admin_address}
            </Link>
            <div>
              Database Status: {convertProjectStatusName(project.status)}{" "}
              <Badge
                variant="none"
                className={cn(
                  convertProjectStatusToColour(project.status),
                  "h-3 w-3 p-0"
                )}
              />
            </div>
            <p>On Chain Status: {project.onChainStatus}</p>
            <p>
              Curation Start:{" "}
              {new Date(project.curation?.start).toLocaleDateString()}
            </p>
            <p>
              Curation End:{" "}
              {new Date(project.curation?.end).toLocaleDateString()}
            </p>
            <ProjectActions {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}
