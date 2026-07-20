// Frontend Configuration
// This file centralizes all configurable values for the frontend

window.APP_CONFIG = {
  // Backend API base URL
  API_BASE_URL: 'http://127.0.0.1:8000/api',
  
  // API endpoints
  ENDPOINTS: {
    POSTS: '/posts',
    POSTS_POPULAR: '/posts/popular',
    CATEGORIES: '/categories',
    TAGS: '/tags',
    TAGS_POPULAR: '/tags/popular',
    POST_SEARCH: '/posts/search',
  },
  
  // Pagination
  POSTS_PER_PAGE: 6,
  
  // Cache settings (in milliseconds)
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
};
