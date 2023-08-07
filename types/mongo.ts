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
  launched_at: string; // ISO Datestring
  curation: {
    start: string; // ISO Datestring
    end: string; // ISO Datestring
  };
  project_image?: string;
};

export type Pool = {
  title: string;
  subtitle: string;
  description: string;
  pool_amount: number;
  sponsors: Sponsor[];
  video: string;
};

export type User = {
  _id: string;
  name: string;
  profile?: string;
  bio?: string;
  socials?: string; // must be a twitter link for now
  wallets: WalletResolvable[];
  email?: string;
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
  logo: string;
  name: string;
  contribution: number;
};

type Team = {
  name: string;
  bio: string;
  email: string;
};

type MilestoneAmountText = {
  amount: number | string;
  text: string;
};

type AmountText = {
  amount: number;
  text: string;
};

export type ProjectUpdate = {
  project: string;
  text: string;
};

export enum Brief {
  THE_ENCHANTRESS = "The Enchantress",
  THE_HEALER = "The Healer",
  THE_MEDIATOR = "The Mediator",
  THE_TEACHER = "The Teacher",
  THE_ARTIST = "The Artist",
  OTHER = "Other",
}

export enum SupportType {
  SIGN_UP,
  CONTRIBUTE,
}
