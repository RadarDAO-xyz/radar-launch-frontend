import { SupportType, type Pool, type Project, type User } from "@/types/mongo";

export async function getPools(): Promise<Pool[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/pools`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pools");
  }
  return response.json();
}

export async function getPool(poolId: string): Promise<Pool> {
  const response = await fetch(`${process.env.BACKEND_URL}/pools/${poolId}`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch pool");
  }
  return response.json();
}

export async function getExchangeRate(symbols: string) {
  const response = await fetch(`/api/exchange-rate?symbols=${symbols}`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch exchange rate");
  }
  return response.json();
}

export async function getUser(userId: string): Promise<User> {
  const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch user");
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
    throw new Error("Failed to fetch current user");
  }
  return response.json();
}

export async function getProject(id: string): Promise<Project | undefined> {
  const response = await fetch(`${process.env.BACKEND_URL}/projects/${id}`);

  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch project");
  }
  return response.json();
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/projects?all`);
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to fetch projects");
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
    throw new Error("Failed to signup project");
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
    throw new Error("Failed to contribute project");
  }
  return response.json();
}

export async function authenticateUser({
  idToken,
  isWalletLogin,
  address,
  appPubKey,
}: {
  idToken: string;
  isWalletLogin: boolean;
  address?: string;
  appPubKey?: string;
}) {
  const response = await fetch(`${process.env.BACKEND_URL}/verify`, {
    method: "POST",
    headers: {
      "X-Auth-Method": isWalletLogin ? "Wallet" : "Social",
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: isWalletLogin
      ? JSON.stringify({
          public_address: address,
        })
      : JSON.stringify({
          appPubKey,
        }),
  });
  if (!response.ok) {
    console.error(response);
    throw new Error("Failed to authenticate user");
  }
  return response.json();
}
