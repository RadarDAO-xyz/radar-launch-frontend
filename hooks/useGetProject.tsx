import { getProject } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetProject(id?: string) {
  return useQuery(["project", id], () => getProject(id!), {
    enabled: Boolean(id),
  });
}
