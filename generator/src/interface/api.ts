export interface ApiUser {
  id: number;
  name: string;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  posts_count?: number;
}

export interface ApiTag {
  id: number;
  name: string;
  slug: string;
}

export interface ApiPost {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  status: string;
  visibility: string;
  views_count: number;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
  user?: ApiUser;
  category?: ApiCategory;
  tags?: ApiTag[];
}

export interface ApiPaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  links?: {
    first?: string;
    last?: string;
    prev?: string | null;
    next?: string | null;
  };
}

export interface PostsQueryParams {
  page?: number;
  per_page?: number;
  category?: string;
  q?: string;
  tag?: string;
  status?: string;
  all?: boolean;
}
