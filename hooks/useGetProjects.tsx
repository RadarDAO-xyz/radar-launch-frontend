import { getProjects } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetProjects() {
  return useQuery(["projects"], getProjects);
}
