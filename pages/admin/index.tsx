import { chains } from "@/components/Providers/Web3Provider";
import { CONTRACT_ADDRESS } from "@/constants/address";
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { useGetProjects } from "@/hooks/useGetProjects";
import {
  usePrepareRadarEditionsApproveEdition,
  usePrepareRadarEditionsStopEdition,
  useRadarEditionsApproveEdition,
  useRadarEditionsGetEditions,
  useRadarEditionsStopEdition,
} from "@/lib/generated";
import { Project, ProjectStatus } from "@/types/mongo";
import { OnChainProject } from "../profile/[id]";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useMutation } from "wagmi";
import { useAuth } from "@/hooks/useAuth";
import { Label } from "@/components/ui/label";
import { deleteProject } from "@/lib/backend";
import { DeleteProjectButton } from "@/components/AdminPage/DeleteProjectButton";

async function updateProjectStatus(
  projectStatus: ProjectStatus,
  projectId: string,
  idToken: string
) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/projects/${projectId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          status: projectStatus,
        }),
      }
    );
    if (!response.ok) {
      throw new Error("Error updating project status");
    }
    return await response.json();
  } catch (e) {
    console.error(e);
  }
  return "";
}

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
  const editionIdRef = useRef<HTMLInputElement>(null);
  const projectStatusRef = useRef<HTMLInputElement>(null);
  const { idToken } = useAuth();
  const { toast } = useToast();

  const { data: onChainProjects } = useRadarEditionsGetEditions({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id),
  });
  const { config } = usePrepareRadarEditionsApproveEdition({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id) && editionIdRef.current?.value != null,
    args: [BigInt(+(editionIdRef.current?.value || 0)) || 0n],
  });
  const { writeAsync } = useRadarEditionsApproveEdition(config);
  const { config: stopEditionConfig } = usePrepareRadarEditionsStopEdition({
    address: CONTRACT_ADDRESS,
    chainId: chains[0].id,
    enabled: Boolean(chains[0].id) && editionIdRef.current?.value != null,
    args: [BigInt(+(editionIdRef.current?.value || 0)) || 0n],
  });
  const { writeAsync: writeStopEditionAsync } =
    useRadarEditionsStopEdition(stopEditionConfig);

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
            <h3 className="mb-0 pb-0">{project.title}</h3>
            {project.editionId === undefined && (
              <strong>No onchain project found</strong>
            )}
            <p>Edition Id (on-chain): {project.editionId}</p>
            <Link
              href={`/project/${project._id}`}
              className="hover:underline block"
            >
              Project Id (database): {project._id}
            </Link>
            <Link
              href={`/profile/${project.admin_address}`}
              className="break-all hover:underline block"
            >
              Admin address: {project.admin_address}
            </Link>
            <p>Database Status: {project.status}</p>
            <p>On Chain Status: {project.onChainStatus}</p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4">Actions</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Actions panel</DialogTitle>
                <DialogDescription className="space-y-4">
                  <Label>Edition ID</Label>
                  <Input
                    placeholder="Edition ID"
                    type="number"
                    ref={editionIdRef}
                    defaultValue={String(project.editionId)}
                  />
                  <Label>New Database Project Status</Label>
                  <Input
                    placeholder="New Project Status"
                    type="number"
                    ref={projectStatusRef}
                    defaultValue={String(project.status)}
                  />
                </DialogDescription>
                <DialogFooter className="flex !flex-col !space-x-0 space-y-4">
                  <Button
                    onClick={() => {
                      try {
                        writeAsync?.();
                      } catch (e) {
                        console.error(e);
                        toast({
                          variant: "destructive",
                          title: "An unexpected error occured",
                          description: "Check the console for more information",
                        });
                      }
                    }}
                  >
                    Approve Edition (on-chain)
                  </Button>
                  <Button
                    onClick={() => {
                      try {
                        writeStopEditionAsync?.();
                      } catch (e) {
                        console.error(e);
                        toast({
                          variant: "destructive",
                          title: "An unexpected error occured",
                          description: "Check the console for more information",
                        });
                      }
                    }}
                  >
                    Stop Edition (on-chain)
                  </Button>
                  <Button
                    onClick={async () => {
                      if (projectStatusRef.current?.value != null) {
                        try {
                          await updateProjectStatus(
                            projectStatusRef.current
                              .value as unknown as ProjectStatus,
                            project._id,
                            idToken
                          );
                        } catch (e) {
                          console.error(e);

                          toast({
                            variant: "destructive",
                            title: "An unexpected error occured",
                            description:
                              "Check the console for more information",
                          });
                        }
                      }
                    }}
                  >
                    Update project status (database)
                  </Button>
                  <DeleteProjectButton projectId={project._id} />
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </section>
  );
}
