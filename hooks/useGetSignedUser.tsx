import { User } from "@/types/mongo";
import { useQuery } from "wagmi";

async function getSignedUser(): Promise<User[]> {
  try {
    return fetch(`${process.env.BACKEND_URL}/users/@me`).then((res) =>
      res.json()
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}

export function useGetSignedUser() {
  return useQuery(["users"], getSignedUser);
}
