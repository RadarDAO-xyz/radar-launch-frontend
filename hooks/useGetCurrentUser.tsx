import { AuthContext } from "@/components/AuthProvider";
import { getCurrentUser } from "@/lib/backend";
import { useContext } from "react";
import { useQuery } from "wagmi";

export function useGetCurrentUser() {
  const { idToken } = useContext(AuthContext);

  return useQuery(["current-user", idToken], () => getCurrentUser(idToken), {
    enabled: idToken !== "",
  });
}
