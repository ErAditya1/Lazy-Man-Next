import axios, { AxiosError, AxiosResponse } from "axios";
import { logout } from "./auth";


export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://super-tasky-server.onrender.com"
    : "http://localhost:8000";

// Primary API client used across the app.
// withCredentials:true so browser sends HttpOnly cookies automatically.
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Separate client for refresh requests to avoid interceptor recursion.
const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  // small timeout for refresh attempts
  timeout: 10_000,
});

// Types
interface User {
  accessToken?: string; // optional if server returns it in body
  refreshToken?: string;
  accessTokenExpires?: number;
  [key: string]: any;
}

interface RefreshTokenResponse {
  success: boolean;
  data?: {
    accessToken?: string;
    refreshToken?: string;
    user?: User;
  };
}

// Refresh control
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (err?: any) => void;
}> = [];

const processQueue = (error: any, result?: any) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(result);
  });
  failedQueue = [];
};

// Retry with exponential backoff wrapper used inside refreshAccessToken
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  attempts = 3,
  attempt = 1
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    if (attempt >= attempts) throw err;
    const baseDelay = Math.pow(2, attempt) * 1000;
    const jitter = Math.random() * 1000;
    const delay = baseDelay + jitter;
    await new Promise((r) => setTimeout(r, delay));
    return retryWithBackoff(fn, attempts, attempt + 1);
  }
}

// Core refresh logic
async function refreshAccessToken(): Promise<boolean> {
  // If a refresh is already running, return the same promise
  if (isRefreshing && refreshPromise) return refreshPromise;

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      // Use retryWithBackoff for transient network/server errors
      const response: AxiosResponse<RefreshTokenResponse> =
        await retryWithBackoff(() =>
          refreshClient.post("/api/v1/auth/refresh-token")
        );

      const { data } = response;
      if (!data || !data.success) {
        // Backend explicitly said refresh failed
        await handleRefreshFailure();
        return false;
      }

      // Optionally the backend returns new tokens in body (some implementations do).
      // If provided, you may want to keep a short-lived in-memory copy, but do NOT
      // persist to localStorage when using HttpOnly cookies.
      const respUser = data.data?.user;
      const newAccessToken = data.data?.accessToken;
      // If your app needs the new access token in JS (for example to set Authorization header),
      // keep it in memory (not localStorage). Otherwise you can ignore it; cookies will be sent automatically.
      if (newAccessToken) {
        // Optional: place it in a tiny in-memory store or state manager if necessary.
        // e.g., window.__ACCESS_TOKEN__ = newAccessToken;
      }

      // Successful refresh; callers can retry their requests — cookies were set by server.
      return true;
    } catch (error) {
      // If Axios error, inspect status and decide whether to logout
      if (axios.isAxiosError(error)) {
        const err = error as AxiosError;

        if (err.response) {
          const status = err.status;
          if (status === 401) {
            // Refresh token invalid/expired
            console.log(" Refresh token invalid/expired");
            await handleRefreshFailure();
            return false;
          }
          // for 5xx we may have retried; final failure -> call handleRefreshFailure
          await handleRefreshFailure();
          return false;
        } else if (err.request) {
          // Network issue after retries -> treat as failure (and log)
          console.error("Network error during refresh:", err.message);
          await handleRefreshFailure();
          return false;
        } else {
          console.error("Refresh setup error:", err.message);
          await handleRefreshFailure();
          return false;
        }
      } else {
        console.error("Unexpected error during token refresh:", error);
        await handleRefreshFailure();
        return false;
      }
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

async function handleRefreshFailure() {
  try {
    // call logout endpoint to clear cookies server-side if provided
    await logout();
  } catch (err) {
    console.warn("Backend logout failed or not available", err);
  } finally {
    // remove any client-side persisted user state if you had (we do not use localStorage for tokens anymore)
    if (typeof window !== "undefined") {
      // redirect to sign in
      // window.location.href = "/sign-in";
    }
  }
}

// Request interceptor: you can optionally add Authorization header if you have an in-memory token.
// For HttpOnly cookie setups, the browser sends cookies automatically, so Authorization header is not required.
api.interceptors.request.use(
  async (config) => {
    // Example: if you keep a tiny in-memory access token, attach it:
    // const inMemToken = (typeof window !== "undefined" && (window as any).__ACCESS_TOKEN__) || null;
    // if (inMemToken && config.headers) {
    //   config.headers["Authorization"] = `Bearer ${inMemToken}`;
    // }
    // set x-unique-id for tracking in headers
    if (config.headers) {
      const uniqueId = getCookieValue("x-unique-id");
      if (uniqueId) config.headers["x-unique-id"] = uniqueId;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor: on 401, attempt single refresh and retry original request
api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest: any = err.config;

    // If no config, just reject
    if (!originalRequest) return Promise.reject(err);

    // Prevent infinite loop: only retry once per request
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If refresh is already in progress, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: () => {
              resolve(api(originalRequest));
            },
            reject: (error) => reject(error),
          });
        });
      }

      // Attempt refresh
      try {
        const refreshed = await refreshAccessToken();
        if (refreshed) {
          // notify queued requests
          processQueue(null, true);
          return api(originalRequest);
        } else {
          // refresh failed and handled (logout will be triggered)
          processQueue(new Error("Refresh failed"), null);
          return Promise.reject(err);
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(err);
  }
);

// Helper: get non-HttpOnly cookie value (only works if cookie is NOT HttpOnly)
export function getCookieValue(name: string) {
  if (typeof document === "undefined") return null;
  const cookieString = document.cookie || "";
  return (
    cookieString
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1] || null
  );
}

export default api;
