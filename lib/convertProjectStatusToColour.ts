import { ProjectStatus } from '@/types/mongo';

export function convertProjectStatusToColour(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.IN_REVIEW:
      return 'bg-yellow-300';
    case ProjectStatus.APPROVED:
      return 'bg-orange-500';
    case ProjectStatus.LIVE:
      return 'bg-green-400';
    case ProjectStatus.BUILDING:
      return 'bg-purple-800';
    case ProjectStatus.REJECTED:
      return 'bg-red-700';
    case ProjectStatus.CANCELLED:
      return 'bg-gray-900';
    default:
      return 'Unknown status';
  }
}
