/**
 * API Client for Google Tasks
 * 
 * Handles authentication, request/response, and error handling.
 * Wraps axios with auth token injection.
 */

import axios, { AxiosInstance, AxiosError } from "axios";
import { GOOGLE_TASKS_API } from "./endpoints";

/**
 * Error class for API errors
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * API Client configuration
 */
interface ApiClientConfig {
  accessToken: string;
  onTokenExpired?: () => void;
  onError?: (error: ApiError) => void;
}

/**
 * Google Tasks API Client
 */
export class GoogleTasksClient {
  private client: AxiosInstance;
  private config: ApiClientConfig;

  constructor(config: ApiClientConfig) {
    this.config = config;
    
    this.client = axios.create({
      baseURL: GOOGLE_TASKS_API.BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${config.accessToken}`,
      },
    });

    // Response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        const apiError = this.handleError(error);
        
        // Check for token expiration
        if (apiError.statusCode === 401) {
          this.config.onTokenExpired?.();
        }
        
        this.config.onError?.(apiError);
        throw apiError;
      }
    );
  }

  /**
   * Update the access token
   */
  setAccessToken(token: string): void {
    this.config.accessToken = token;
    this.client.defaults.headers.Authorization = `Bearer ${token}`;
  }

  /**
   * Transform axios errors into ApiError
   */
  private handleError(error: AxiosError): ApiError {
    if (error.response) {
      // Server responded with error status
      const message = 
        (error.response.data as { message?: string })?.message ||
        error.message ||
        "API request failed";
      return new ApiError(message, error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      return new ApiError("No response from server - check your connection");
    } else {
      // Error setting up request
      return new ApiError(error.message || "Request failed");
    }
  }

  /**
   * GET request
   */
  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.get<T>(path, { params });
    return response.data;
  }

  /**
   * POST request
   */
  async post<T>(path: string, data?: unknown, params?: Record<string, unknown>): Promise<T> {
    const response = await this.client.post<T>(path, data, { params });
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T>(path: string, data: unknown): Promise<T> {
    const response = await this.client.put<T>(path, data);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T>(path: string, data: unknown): Promise<T> {
    const response = await this.client.patch<T>(path, data);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete(path: string): Promise<void> {
    await this.client.delete(path);
  }
}

/**
 * Create a new API client instance
 */
export function createApiClient(config: ApiClientConfig): GoogleTasksClient {
  return new GoogleTasksClient(config);
}
