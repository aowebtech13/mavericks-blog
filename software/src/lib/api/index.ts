/**
 * Barrel export for the API layer.
 * Usage:
 *   import { getPosts, getCategories, getTags } from '@/src/lib/api';
 */

export { default as apiClient } from '@/src/lib/api/client';
export * from '@/src/lib/api/posts';
export * from '@/src/lib/api/categories';
export * from '@/src/lib/api/tags';

