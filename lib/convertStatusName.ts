import { ProjectStatus } from "@/types/mongo";

export function convertStatusName(status: ProjectStatus) {
  switch (status) {
    case ProjectStatus.IN_REVIEW:
      return "In review";
    case ProjectStatus.APPROVED:
      return "Approved";
    case ProjectStatus.LIVE:
      return "Live";
    case ProjectStatus.BUILDING:
      return "Closed & Building";
    case ProjectStatus.REJECTED:
      return "Rejected";
    case ProjectStatus.CANCELLED:
      return "Cancelled";
    default:
      return "Unknown status";
  }
}
