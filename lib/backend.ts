import { SupportType, type Pool, type Project, type User } from "@/types/mongo";

export async function getPools(): Promise<Pool[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/pools`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
}

export async function getExchangeRate(symbols: string) {
  const response = await fetch(`/api/exchange-rate?symbols=${symbols}`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
}

export async function getUser(userId: string): Promise<User> {
  const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
}

export async function getCurrentUser(idToken: string): Promise<User> {
  const response = await fetch(`${process.env.BACKEND_URL}/users/@me`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
}

export async function getProject(id: string): Promise<Project | undefined> {
  const response = await fetch(`${process.env.BACKEND_URL}/projects/${id}`);

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/projects?all`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
}

export async function signupProject(projectId: string, email?: string) {
  if (!email) {
    return "";
  }
  const response = await fetch(
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
  );
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
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
  const response = await fetch(
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
  );
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
}
