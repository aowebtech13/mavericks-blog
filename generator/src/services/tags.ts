import apiClient from '@/src/lib/axios';
import type { ApiTag } from '@/src/interface/api';

/**
 * Fetch all tags (public endpoint).
 */
export async function getTags(): Promise<ApiTag[]> {
  const response = await apiClient.get<{ data: ApiTag[] }>('/tags');
  return response.data.data;
}

/**
 * Fetch popular tags (top 10 by post count, public endpoint).
 */
export async function getPopularTags(): Promise<ApiTag[]> {
  const response = await apiClient.get<{ data: ApiTag[] }>('/tags/popular');
  return response.data.data;
}

