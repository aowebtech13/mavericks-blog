import axios from 'axios';

const MAX_RETRIES = 1;
const RETRY_DELAY_MS = 1000;

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request interceptor — attach auth token if available (for future use)
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Helper: wait for a given number of milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Helper: determine whether the error is likely transient (network-level)
 * and worth retrying.
 */
function isNetworkError(error: unknown): boolean {
  if (axios.isAxiosError(error)) {
    // No response received → network failure / server unreachable
    if (!error.response && error.code !== 'ERR_CANCELED') {
      return true;
    }
    // 5xx server errors are also worth a retry
    if (error.response && error.response.status >= 500) {
      return true;
    }
  }
  return false;
}

// Response interceptor — normalize errors with optional retry
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // If we haven't exhausted retries and it's a transient error, retry once
    if (config && !config._retryCount) {
      config._retryCount = 0;
    }

    if (
      config &&
      config._retryCount < MAX_RETRIES &&
      isNetworkError(error)
    ) {
      config._retryCount += 1;
      await sleep(RETRY_DELAY_MS);
      return apiClient(config);
    }

    // Build a human-readable error message
    if (error.response) {
      const message =
        error.response.data?.message || error.response.statusText || 'An error occurred';
      return Promise.reject(new Error(message));
    }
    if (error.request) {
      return Promise.reject(
        new Error(
          'Unable to reach the server. Please ensure the backend is running and try again.',
        ),
      );
    }
    return Promise.reject(error);
  },
);

export default apiClient;

