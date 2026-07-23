/**
 * API response types matching the Laravel backend JSON responses.
 */

export interface ApiUser {
  id: number;
  name: string;
}

export interface ApiCategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
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
  excerpt: string | null;
  content: string;
  featured_image: string | null;
  status: string;
  visibility: string;
  views_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  user: ApiUser | null;
  category: ApiCategory | null;
  tags: ApiTag[];
}

/** Pagination meta from Laravel's paginate() */
export interface PaginationMeta {
  current_page: number;
  from: number | null;
  last_page: number;
  links: { url: string | null; label: string; active: boolean }[];
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

/** Wrapper for paginated resource collections */
export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
  };
  meta: PaginationMeta;
}

/** Wrapper for a single resource */
export interface SingleResponse<T> {
  data: T;
}

/** Standard API error response shape */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

/** Parameters for fetching posts */
export interface GetPostsParams {
  page?: number;
  per_page?: number;
  category?: number;
  tag?: string | number;
  q?: string;
  status?: string;
  all?: boolean;
}

