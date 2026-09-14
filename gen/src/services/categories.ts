import apiClient from '@/src/lib/axios';
import type { ApiCategory } from '@/src/interface/api';

/**
 * Fetch all categories (public endpoint).
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const response = await apiClient.get<{ data: ApiCategory[] }>('/categories');
  return response.data.data;
}

