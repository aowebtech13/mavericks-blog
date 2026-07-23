import apiClient from '@/src/lib/api/client';
import type { ApiTag } from '@/src/interface/api';
import type { AxiosResponse } from 'axios';

/** Response shape for a resource collection (non-paginated) */
interface CollectionResponse<T> {
  data: T[];
}

/**
 * Fetch all tags.
 */
export async function getTags(): Promise<ApiTag[]> {
  const response: AxiosResponse<CollectionResponse<ApiTag>> =
    await apiClient.get('/tags');
  return response.data.data;
}

/**
 * Fetch popular tags.
 */
export async function getPopularTags(): Promise<ApiTag[]> {
  const response: AxiosResponse<CollectionResponse<ApiTag>> =
    await apiClient.get('/tags/popular');
  return response.data.data;
}

