import apiClient from '@/src/lib/api/client';
import type { ApiCategory } from '@/src/interface/api';
import type { AxiosResponse } from 'axios';

/** Response shape for a resource collection (non-paginated) */
interface CollectionResponse<T> {
  data: T[];
}

/**
 * Fetch all categories with published post counts.
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const response: AxiosResponse<CollectionResponse<ApiCategory>> =
    await apiClient.get('/categories');
  return response.data.data;
}

