import type { Pool, Project, User } from "@/types/mongo";

export async function getPools(): Promise<Pool[]> {
  try {
    return fetch(`${process.env.BACKEND_URL}/pools`).then((res) => res.json());
  } catch (e) {
    console.log(e);
    return [];
  }
}
export async function getExchangeRate(symbols: string) {
  return fetch(`/api/exchange-rate?symbols=${symbols}`).then((res) =>
    res.json()
  );
}

export async function getUser(userId: string): Promise<User | undefined> {
  try {
    return fetch(`${process.env.BACKEND_URL}/users/${userId}`).then((res) =>
      res.json()
    );
  } catch (e) {
    console.error(e);
    return;
  }
}

export async function getCurrentUser(
  idToken: string
): Promise<User | undefined> {
  try {
    return fetch(`${process.env.BACKEND_URL}/users/@me`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }).then((res) => res.json());
  } catch (e) {
    console.error(e);
    return;
  }
}

export async function getProject(id: string): Promise<Project | undefined> {
  try {
    return fetch(`${process.env.BACKEND_URL}/projects/${id}`).then((res) =>
      res.json()
    );
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    return fetch(`${process.env.BACKEND_URL}/projects?all`).then((res) =>
      res.json()
    );
  } catch (e) {
    console.error(e);
    return [];
  }
}
