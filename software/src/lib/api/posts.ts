import apiClient from '@/src/lib/api/client';
import type {
  ApiPost,
  GetPostsParams,
  PaginatedResponse,
  SingleResponse,
} from '@/src/interface/api';
import type { AxiosResponse } from 'axios';

/**
 * Fetch a paginated list of published posts.
 *
 * @param params - Optional query filters (page, per_page, category, tag, q, etc.)
 */
export async function getPosts(
  params: GetPostsParams = {},
): Promise<PaginatedResponse<ApiPost>> {
  const response: AxiosResponse<PaginatedResponse<ApiPost>> =
    await apiClient.get('/posts', { params });
  return response.data;
}

/**
 * Fetch a single post by its slug.
 *
 * @param slug - The post slug (route key name)
 */
export async function getPost(slug: string): Promise<SingleResponse<ApiPost>> {
  const response: AxiosResponse<SingleResponse<ApiPost>> =
    await apiClient.get(`/posts/${slug}`);
  return response.data;
}

/**
 * Search publicly visible posts.
 *
 * @param query - Search query string
 */
export async function searchPosts(
  query: string,
): Promise<PaginatedResponse<ApiPost>> {
  const response: AxiosResponse<PaginatedResponse<ApiPost>> =
    await apiClient.post('/posts/search', { q: query });
  return response.data;
}

/**
 * Create a new post (requires authentication).
 *
 * @param data - Form data or plain object matching post fields
 */
export async function createPost(
  data: FormData | Record<string, unknown>,
): Promise<SingleResponse<ApiPost>> {
  const headers =
    data instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }
      : undefined;

  const response: AxiosResponse<SingleResponse<ApiPost>> =
    await apiClient.post('/posts', data, { headers });
  return response.data;
}

/**
 * Update an existing post (requires authentication, authorization).
 *
 * @param slug - The post slug
 * @param data - Partial post fields to update
 */
export async function updatePost(
  slug: string,
  data: FormData | Record<string, unknown>,
): Promise<SingleResponse<ApiPost>> {
  const headers =
    data instanceof FormData
      ? { 'Content-Type': 'multipart/form-data' }
      : undefined;

  const response: AxiosResponse<SingleResponse<ApiPost>> =
    await apiClient.put(`/posts/${slug}`, data, { headers });
  return response.data;
}

/**
 * Delete a post (requires authentication, authorization).
 *
 * @param slug - The post slug
 */
export async function deletePost(slug: string): Promise<void> {
  await apiClient.delete(`/posts/${slug}`);
}

