import { getProjectSupporters } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetProjectSupporters(
  projectId: string,
  idToken: string,
  signups: boolean,
  contributors: boolean
) {
  return useQuery(
    [projectId, idToken, signups, contributors],
    () => getProjectSupporters(projectId, idToken, signups, contributors),
    {
      enabled: (signups || contributors) && idToken !== "",
    }
  );
}
