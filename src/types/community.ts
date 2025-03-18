export interface Community {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image_url?: string;
  creator_id: string;
  created_at: string;
}

export interface Creator {
  id: string;
  name?: string;
  full_name?: string;
  avatar_url?: string;
}

export interface MemberCounts {
  [key: string]: number;
}

export interface Creators {
  [key: string]: Creator;
}
