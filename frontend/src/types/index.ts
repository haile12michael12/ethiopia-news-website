export interface User {
  id: number;
  email: string;
  username: string;
  full_name?: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface Article {
  id: number;
  title_en: string;
  title_am?: string;
  title_om?: string;
  title_ti?: string;
  slug: string;
  content_en: string;
  content_am?: string;
  content_om?: string;
  content_ti?: string;
  excerpt_en?: string;
  excerpt_am?: string;
  excerpt_om?: string;
  excerpt_ti?: string;
  featured_image?: string;
  author_id: number;
  category_id?: number;
  region_id?: number;
  tags: string[];
  status: string;
  is_breaking: boolean;
  view_count: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  name_en: string;
  name_am?: string;
  name_om?: string;
  name_ti?: string;
  slug: string;
  description?: string;
}

export interface Region {
  id: number;
  name_en: string;
  name_am?: string;
  name_om?: string;
  name_ti?: string;
  slug: string;
}

export interface Comment {
  id: number;
  article_id: number;
  user_id: number;
  content: string;
  is_approved: boolean;
  created_at: string;
}

export interface Submission {
  id: number;
  submitter_name?: string;
  submitter_email?: string;
  title: string;
  content: string;
  language: string;
  images: string[];
  region_id?: number;
  status: string;
  created_at: string;
}
