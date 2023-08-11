import { getUser } from "@/lib/backend";
import { useQuery } from "wagmi";

export function useGetUser(userId?: string) {
  return useQuery(["users", userId], () => getUser(userId!), {
    enabled: Boolean(userId),
  });
}
