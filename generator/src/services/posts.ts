import apiClient from '@/src/lib/axios';
import type { ApiPaginatedResponse, ApiPost, PostsQueryParams } from '@/src/interface/api';

/**
 * Fetch paginated list of published posts (public endpoint).
 * Pass filters like category, tag, q (search), page, per_page.
 */
export async function getPosts(
  params: PostsQueryParams = {},
): Promise<ApiPaginatedResponse<ApiPost>> {
  const response = await apiClient.get<ApiPaginatedResponse<ApiPost>>('/posts', { params });
  return response.data;
}

/**
 * Fetch a single post by slug (public endpoint).
 */
export async function getPost(slug: string): Promise<ApiPost> {
  const response = await apiClient.get<{ data: ApiPost }>(`/posts/${slug}`);
  return response.data.data;
}

/**
 * Search posts via POST /api/posts/search
 */
export async function searchPosts(query: string): Promise<ApiPost[]> {
  const response = await apiClient.post<{ data: ApiPost[] }>('/posts/search', { q: query });
  return response.data.data;
}

