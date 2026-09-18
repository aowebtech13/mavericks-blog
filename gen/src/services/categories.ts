import apiClient from '@/src/lib/axios';
import type { ApiCategory } from '@/src/interface/api';

/**
 * Fetch all categories (public endpoint).
 */
export async function getCategories(): Promise<ApiCategory[]> {
  const response = await apiClient.get<{ data: ApiCategory[] }>('/categories');
  return response.data.data;
}

/**
 * Fetch a single category by slug (public endpoint).
 */
export async function getCategoryBySlug(slug: string): Promise<ApiCategory | null> {
  try {
    const categories = await getCategories();
    return categories.find((cat) => cat.slug === slug) ?? null;
  } catch {
    return null;
  }
}

