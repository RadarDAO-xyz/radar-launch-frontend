import { ProjectWithOwnedAmount } from "@/pages/profile/[id]";
import { CollectedVision } from "./CollectedVision";

export function CollectedVisions({
  projects,
}: {
  projects: ProjectWithOwnedAmount[];
}) {
  return (
    <div className="p-8 rounded-lg border mb-6">
      <h2 className="text-xl">COLLECTED VISIONS</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {projects.map((edition) => (
          <CollectedVision {...edition} key={edition._id} />
        ))}
      </div>
    </div>
  );
}
