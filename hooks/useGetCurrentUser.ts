import { AuthContext } from "@/components/Providers/AuthProvider";
import { CacheKey } from "@/constants/react-query";
import { getCurrentUser } from "@/lib/backend";
import { useContext } from "react";
import { useQuery } from "wagmi";

export function useGetCurrentUser() {
  const { idToken } = useContext(AuthContext);

  return useQuery(
    [CacheKey.CURRENT_USER, idToken],
    () => getCurrentUser(idToken),
    {
      enabled: idToken !== "",
    }
  );
}
