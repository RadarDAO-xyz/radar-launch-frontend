import { Project, ProjectStatus } from "@/types/mongo";
import { VisionCard } from "./VisionCard";

export function YourVisions({ projects }: { projects: Project[] }) {
  return (
    <div>
      <div className="p-8 rounded-lg border mb-6">
        <h2 className="text-xl">Active Visions</h2>
        <div className="grid grid-cols-4 gap-2">
          {projects
            .filter(
              (project) =>
                project.status !== ProjectStatus.CANCELLED &&
                project.status !== ProjectStatus.REJECTED
            )
            .concat(projects)
            .concat(projects)
            .concat(projects)
            .concat(projects)
            .map((project) => (
              <VisionCard key={project._id} {...project} />
            ))}
        </div>
      </div>
      <div className="p-8 rounded-lg border">
        <h2 className="text-xl">Inactive Visions</h2>
      </div>
    </div>
  );
}
