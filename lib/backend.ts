import { createFormSchema } from '@/components/CreateProjectPage/CreateForm';
import {
  ProjectBeliever,
  ProjectStatus,
  SupportType,
  type Pool,
  type Project,
  type ProjectUpdate,
  type User,
  type WalletResolvable,
} from '@/types/mongo';
import * as z from 'zod';

export async function getPools(): Promise<Pool[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/pools`);
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch pools');
  }
  return response.json();
}

export async function getPool(poolId: string): Promise<Pool> {
  const response = await fetch(`${process.env.BACKEND_URL}/pools/${poolId}`);
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch pool');
  }
  return response.json();
}

export async function getPoolProjects(poolId: string): Promise<Project[]> {
  const response = await fetch(
    `${process.env.BACKEND_URL}/pools/${poolId}/projects`,
  );
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch pool projects');
  }
  return response.json();
}

export async function getProjectSupporters(
  projectId: string,
  idToken: string,
  signups: boolean,
  contributors: boolean,
) {
  const data = {
    signups: signups ? 'true' : 'false',
    contributors: contributors ? 'true' : 'false',
  };
  const params = new URLSearchParams(data);
  const response = await fetch(
    `${
      process.env.BACKEND_URL
    }/projects/${projectId}/supporters/?${params.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch project supporters');
  }
  return response.json();
}

export async function getProjectBelievers(
  projectId: string,
): Promise<ProjectBeliever[]> {
  const response = await fetch(
    `${process.env.BACKEND_URL}/projects/${projectId}/supporters/believers`,
  );
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch project believers');
  }
  return response.json();
}

export async function getUser(userId: string): Promise<User> {
  const response = await fetch(`${process.env.BACKEND_URL}/users/${userId}`);
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export async function getCurrentUser(
  idToken: string,
): Promise<Omit<User, 'wallets'> & { wallets: WalletResolvable[] }> {
  const response = await fetch(`${process.env.BACKEND_URL}/users/@me`, {
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch current user');
  }
  return response.json();
}

export async function getProject(id: string): Promise<Project> {
  const response = await fetch(`${process.env.BACKEND_URL}/projects/${id}`);

  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch project');
  }
  return response.json();
}

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/projects?all`);
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to fetch projects');
  }
  return response.json();
}

export async function signupProject(projectId: string, email?: string) {
  if (!email) {
    return '';
  }
  const response = await fetch(
    `${process.env.BACKEND_URL}/projects/${projectId}/supporters`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        type: SupportType.SIGN_UP,
      }),
    },
  );
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to signup project');
  }
  return response.json();
}

export async function contributeProject(
  projectId: string,
  social?: string,
  email?: string,
  skillset?: string,
  contribution?: string,
) {
  if (!email || !social || !skillset || !contribution) {
    return '';
  }
  const response = await fetch(
    `${process.env.BACKEND_URL}/projects/${projectId}/supporters`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        social,
        skillset,
        contribution,
        type: SupportType.CONTRIBUTE,
      }),
    },
  );
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to contribute project');
  }
  return response.json();
}

export async function believeProject(
  projectId: string,
  signatureHash: string,
  signedMessage: string,
  signingAddress: string,
) {
  if (!signatureHash || !signedMessage || !signingAddress) {
    return '';
  }
  const response = await fetch(
    `${process.env.BACKEND_URL}/projects/${projectId}/supporters`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        signatureHash,
        signedMessage,
        signingAddress,
        type: SupportType.BELIEVE,
      }),
    },
  );
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to contribute project');
  }
  return response.json();
}

export async function authenticateUser({ idToken }: { idToken: string }) {
  const response = await fetch(`${process.env.BACKEND_URL}/verify`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`,
    },
  });
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to authenticate user');
  }
  return response.json();
}

export async function deleteProject(projectId: string, idToken: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/projects/${projectId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to delete project');
  }
}

export async function downloadProjectSupporters(
  projectId: string,
  idToken: string,
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/projects/${projectId}/supporters/csv`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    },
  );
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to download project supporters');
  }
  return response.text();
}

export async function getTotalContributions(): Promise<{
  contributionInEth: number;
}> {
  const response = await fetch(`/api/get-total-contribution`);
  if (!response.ok) {
    console.error(response);
    throw new Error('Failed to get total contribution');
  }
  return response.json();
}

export async function getUserProjects(
  idToken: string,
  id: string,
): Promise<Project[]> {
  if (!id || !idToken) {
    return [];
  }
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/${id}/projects`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    if (!response.ok) {
      console.error(response);
      throw new Error('Failed to retrieve user projects');
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function getProjectUpdates(
  idToken: string,
  projectId: string,
): Promise<ProjectUpdate[]> {
  if (!projectId || !idToken) {
    return [];
  }
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/projects/${projectId}/updates`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
      },
    );
    if (!response.ok) {
      console.error(response);
      throw new Error('Failed to retrieve project updates');
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function createProject(
  idToken: string,
  values: z.infer<typeof createFormSchema> & { pool?: string },
): Promise<Project> {
  const finalValues = {
    ...values,
    mint_end_date: values.mint_end_date.toISOString(),
    tags: values.tags.split(',').map((tag) => tag.trim()),
  };
  if (finalValues.thumbnail) {
    const formData = new FormData();
    formData.append('thumbnail', finalValues.thumbnail);
    formData.append(
      'payload_json',
      JSON.stringify({
        ...finalValues,
        thumbnail: finalValues.thumbnail.name,
      }),
    );
    const res = await fetch(`${process.env.BACKEND_URL}/projects`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
      body: formData,
    });
    return await res.json();
  } else {
    const res = await fetch(`${process.env.BACKEND_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(finalValues),
    });
    return await res.json();
  }
}

export async function updateProject(
  values: Partial<z.infer<typeof createFormSchema>> & {
    pool?: string;
    status?: ProjectStatus;
    curation?: {
      start?: string;
      end?: string;
    };
  },
  projectId: string,
  idToken: string,
) {
  const finalValues = {
    ...values,
    mint_end_date: values?.mint_end_date?.toISOString(),
    tags: values.tags?.split(',').map((tag) => tag.trim()),
  };
  try {
    if (finalValues.thumbnail !== undefined) {
      const formData = new FormData();
      formData.append('thumbnail', finalValues.thumbnail);
      formData.append(
        'payload_json',
        JSON.stringify({
          ...finalValues,
          thumbnail: finalValues.thumbnail.name,
        }),
      );
      const res = await fetch(
        `${process.env.BACKEND_URL}/projects/${projectId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
          body: formData,
        },
      );
      if (!res.ok) {
        throw new Error('Error updating project');
      }
      return await res.json();
    } else {
      const res = await fetch(
        `${process.env.BACKEND_URL}/projects/${projectId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify(finalValues),
        },
      );
      if (!res.ok) {
        throw new Error('Error updating project');
      }
      return await res.json();
    }
  } catch (e) {
    console.error(e);
  }
  return '';
}

export async function createPool(
  idToken: string,
  values: Omit<Pool, '_id'>,
): Promise<Pool | undefined> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/pools`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error('Error creating pool');
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
}

export async function updatePool(
  idToken: string,
  poolId: string,
  values: Omit<Pool, '_id'>,
): Promise<Pool | undefined> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/pools/${poolId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      throw new Error('Error updating pool');
    }
    return response.json();
  } catch (e) {
    console.error(e);
  }
}
