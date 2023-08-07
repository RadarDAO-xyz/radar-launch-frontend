import { SupportType, type Pool, type Project, type User } from "@/types/mongo";

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

export async function signupProject(projectId: string, email?: string) {
  if (!email) {
    return "";
  }
  try {
    return fetch(
      `${process.env.BACKEND_URL}/projects/${projectId}/supporters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          type: SupportType.SIGN_UP,
        }),
      }
    ).then((res) => res.json());
  } catch (e) {
    console.error(e);
  }
  return "";
}

export async function contributeProject(
  projectId: string,
  social?: string,
  email?: string,
  skillset?: string,
  contribution?: string
) {
  if (!email || !social || !skillset || !contribution) {
    return "";
  }
  try {
    return fetch(
      `${process.env.BACKEND_URL}/projects/${projectId}/supporters`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          social,
          skillset,
          contribution,
          type: SupportType.CONTRIBUTE,
        }),
      }
    ).then((res) => res.json());
  } catch (e) {
    console.error(e);
  }
  return "";
}
