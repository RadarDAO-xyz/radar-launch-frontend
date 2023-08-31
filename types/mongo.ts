export enum ProjectStatus {
  IN_REVIEW,
  APPROVED,
  LIVE,
  BUILDING,
  REJECTED,
  CANCELLED,
}

export type Project = {
  _id: string;
  title: string;
  pool: string;
  founder: string;
  description: string;
  video_url: string;
  tldr: string;
  brief: string;
  tags: string[];
  inspiration: string;
  team: Team[];
  collaborators?: string;
  waitlist: boolean;
  milestones: MilestoneAmountText[];
  edition_price: number;
  mint_end_date: string;
  benefits: AmountText[];
  admin_address: string;
  supporter_count: number;
  status: ProjectStatus;
  launched_at: string; // ISO Date string
  curation: {
    start: string; // ISO Date string
    end: string; // ISO Date string
  };
  thumbnail?: string;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
};

export type Pool = {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  pool_amount: number;
  hero_image?: string;
  sponsors: Sponsor[];
  video?: string;
  is_hidden: boolean;
  brief_button_link: string;
  event_button_link: string;
};

export type User = {
  _id: string;
  name: string;
  profile?: string;
  bio?: string;
  socials?: string; // must be a twitter link for now
  wallets: string[];
  email?: string;
  bypasser: boolean;
};

export type Wallet = {
  type: string;
};

export type SocialLoginWallet = {
  public_key: string;
  curve: string;
} & Wallet;

export type ExternalWallet = {
  address: string;
} & Wallet;

export type WalletResolvable = Partial<SocialLoginWallet> &
  Partial<ExternalWallet> &
  Wallet;

type Sponsor = {
  logo?: string;
  name: string;
  contribution: number;
};

type Team = {
  name: string;
  bio: string;
  email: string;
};

type AmountText = {
  amount: number;
  text: string;
};

type MilestoneAmountText = {
  amount: string;
  text: string;
};

export type ProjectUpdate = {
  project: string;
  text: string;
};

export enum Brief {
  THE_ENCHANTRESS = 'The Enchantress',
  THE_HEALER = 'The Healer',
  THE_MEDIATOR = 'The Mediator',
  THE_TEACHER = 'The Teacher',
  THE_ARTIST = 'The Artist',
  THE_NEW_PLAYERS = 'The New Players',
}

export enum SupportType {
  SIGN_UP,
  CONTRIBUTE,
  BELIEVE,
}

export interface ProjectBeliever {
  createdAt: string;
  updatedAt: string;
  signatureHash: string;
  signedMessage: string;
  signingAddress: string;
}
