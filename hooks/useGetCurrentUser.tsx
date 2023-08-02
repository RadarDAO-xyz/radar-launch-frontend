import { User } from "@/types/mongo";
import { useQuery } from "wagmi";

async function getCurrentUser(): Promise<User|undefined> {
  try {
    return fetch(`${process.env.BACKEND_URL}/users/@me`).then((res) =>
      res.json()
    );
  } catch (e) {
    console.error(e);
    return ;
  }
}

export function useGetCurrentUser() {
  return useQuery(["users"], getCurrentUser);
}
