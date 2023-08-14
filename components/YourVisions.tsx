import { useGetCurrentUser } from "@/hooks/useGetCurrentUser";
import { ProjectWithChainData } from "@/pages/profile/[id]";
import { ProjectStatus } from "@/types/mongo";
import { VisionCard } from "./ProfilePage/VisionCard";
import { ProjectBlock } from "./ProjectBlock";

export function YourVisions({
  projects,
}: {
  projects: ProjectWithChainData[];
}) {
  const { data: currentUserData } = useGetCurrentUser();

  return (
    <div>
      <div className="p-8 rounded-lg border mb-6">
        <h2 className="text-xl">ACTIVE VISIONS</h2>
        <div className="grid grid-cols-4 gap-2">
          {projects
            .filter(
              (project) =>
                project.status !== ProjectStatus.CANCELLED &&
                project.status !== ProjectStatus.REJECTED
            )
            .map((project) => {
              if (
                project.admin_address.toUpperCase() ===
                currentUserData?.wallets?.[0].address?.toUpperCase()
              ) {
                <VisionCard key={project._id} {...project} />;
              }
              return (
                <ProjectBlock
                  {...project}
                  key={project._id}
                  showDropDate
                  showMintEndDate
                  showSupporters
                />
              );
            })}
        </div>
      </div>
      <div className="p-8 rounded-lg border">
        <h2 className="text-xl">INACTIVE VISIONS</h2>
        <div className="grid grid-cols-4 gap-2">
          {projects
            .filter(
              (project) =>
                project.status === ProjectStatus.CANCELLED ||
                project.status === ProjectStatus.REJECTED
            )
            .map((project) => {
              if (
                project.admin_address.toUpperCase() ===
                currentUserData?.wallets?.[0].address?.toUpperCase()
              ) {
                <VisionCard key={project._id} {...project} />;
              }
              return (
                <ProjectBlock
                  {...project}
                  key={project._id}
                  showDropDate
                  showMintEndDate
                  showSupporters
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
