import { Project, ProjectStatus } from "@/types/mongo";
import { VisionCard } from "./ProfilePage/VisionCard";
import { ProjectWithChainData } from "@/pages/profile/[id]";

export function YourVisions({
  projects,
}: {
  projects: ProjectWithChainData[];
}) {
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
            .map((project) => (
              <VisionCard key={project._id} {...project} />
            ))}
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
            .map((project) => (
              <VisionCard key={project._id} {...project} />
            ))}
        </div>
      </div>
    </div>
  );
}
