import { AuthContext } from "@/components/AuthProvider";
import { User } from "@/types/mongo";
import { useContext } from "react";
import { useQuery } from "wagmi";

async function getCurrentUser(userId: string): Promise<User | undefined> {
  try {
    return fetch(`${process.env.BACKEND_URL}/users/${userId}`).then((res) =>
      res.json()
    );
  } catch (e) {
    console.error(e);
    return;
  }
}

export function useGetUser(userId?: string) {
  const { idToken } = useContext(AuthContext);

  return useQuery(["users"], () => getCurrentUser(userId!), { enabled: Boolean(userId) });
}
