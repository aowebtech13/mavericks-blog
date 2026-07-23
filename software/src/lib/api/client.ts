import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import type { ApiError } from '@/src/interface/api';

/** Base URL for the backend API */
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Axios instance pre-configured to talk to the Laravel backend.
 * - base URL from env
 * - JSON content type
 * - credentials support (for Sanctum cookie-based auth)
 * - request/response interceptors for logging / error shaping
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  timeout: 15_000,
});

/* ─── Request interceptor ─────────────────────────────────── */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(`[API] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

/* ─── Response interceptor ────────────────────────────────── */
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (process.env.NODE_ENV === 'development') {
      if (error.response) {
        console.error(
          `[API] ${error.response.status}`,
          error.response.data,
        );
      } else if (error.request) {
        console.error('[API] No response received', error.message);
      } else {
        console.error('[API] Request setup error', error.message);
      }
    }

    return Promise.reject(error);
  },
);

export { apiClient };
export default apiClient;

