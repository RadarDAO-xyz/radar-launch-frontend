export type Project = {
  title: string;
  video_url: string;
  tldr: string;
  brief: string;
  inspiration: string;
  team: Team[];
  description: string;
  collaborators: string;
  waitlist: boolean;
  milestones: AmountText[];
  edition_price: number;
  mint_end_date: string;
  benefits: AmountText[];
  admin_address: string;
  supporter_count: number;
  curation: {
    start: string; // ISO Datestring
    end: string; // ISO Datestring
  };
};

export type Pool = {
  title: string;
  subtitle: string;
  description: string;
  pool_amount: number;
  sponsors: Sponsor[];
  video: string;
};

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

type AmountText = {
  amount: number;
  text: string;
};