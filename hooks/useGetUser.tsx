import { AuthContext } from "@/components/AuthProvider";
import { getUser } from "@/lib/backend";
import { useContext } from "react";
import { useQuery } from "wagmi";

export function useGetUser(userId?: string) {
  const { idToken } = useContext(AuthContext);

  return useQuery(["users"], () => getUser(userId!), {
    enabled: Boolean(userId),
  });
}
