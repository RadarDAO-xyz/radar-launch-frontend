import { AuthContext } from "@/components/AuthProvider";
import { User } from "@/types/mongo";
import { useContext } from "react";
import { useQuery } from "wagmi";

async function getCurrentUser(idToken: string): Promise<User | undefined> {
  try {
    return fetch(`${process.env.BACKEND_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      }
    }).then((res) =>
      res.json()
    );
  } catch (e) {
    console.error(e);
    return;
  }
}

export function useGetCurrentUser() {
  const { idToken } = useContext(AuthContext);

  return useQuery(["users"], () => getCurrentUser(idToken), { enabled: idToken !== '' });
}
