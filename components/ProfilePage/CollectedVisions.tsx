import { ProjectWithOwnedAmount } from '@/types/web3';
import { CollectedVision } from './CollectedVision';

export function CollectedVisions({
  projects,
}: {
  projects: ProjectWithOwnedAmount[];
}) {
  return (
    <div className="mb-6 rounded-lg border p-8">
      <h2 className="text-xl">COLLECTED VISIONS</h2>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
        {projects.map((edition) => (
          <CollectedVision {...edition} key={edition._id} />
        ))}
      </div>
    </div>
  );
}
