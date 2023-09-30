import { Project } from './mongo';

export enum EditionStatus {
  NOT_CREATED,
  CREATED,
  LAUNCHED,
  STOPPED,
}

export interface OnChainProject {
  status: EditionStatus;
  fee: bigint;
  balance: bigint;
  owner: `0x${string}`;
  id: string;
  briefId: string;
}

export interface ProjectIdWithBalance {
  id: string;
  amount: bigint;
}

export interface ProjectWithChainData extends Project {
  balance?: bigint;
  editionId?: number;
  onChainStatus?: number;
}

export interface ProjectWithOwnedAmount extends Project {
  ownedAmount: bigint;
  editionId: number;
}
