import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import type {
  ClientEntity,
  CreateClientDto,
  UpdateClientDto,
  ClientListResponse
} from '../types/client';

const API_BASE_URL = 'http://localhost:3000';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      withCredentials: false
    });

    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('auth_token');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('auth_token');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    throw new Error('An unexpected error occurred');
  }

  async createClient(data: CreateClientDto): Promise<ClientEntity> {
    try {
      const response = await this.client.post<ClientEntity>('/clients', data);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getClients(params?: Record<string, unknown>): Promise<ClientEntity[]> {
    try {
      const config: AxiosRequestConfig = {};
      if (params) {
        config.params = params;
      }
      const response = await this.client.get<ClientEntity[]>('/clients', config);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getClientById(id: string): Promise<ClientEntity> {
    try {
      const response = await this.client.get<ClientEntity>(`/clients/${id}`);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async updateClient(id: string, data: UpdateClientDto): Promise<ClientEntity> {
    try {
      const response = await this.client.put<ClientEntity>(`/clients/${id}`, data);
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async deleteClient(id: string): Promise<void> {
    try {
      await this.client.delete(`/clients/${id}`);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getClientsPaginated(
    page: number,
    limit: number
  ): Promise<ClientListResponse> {
    try {
      const response = await this.client.get<ClientListResponse>('/clients', {
        params: { page, limit }
      });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }

  async searchClients(query: string): Promise<ClientEntity[]> {
    try {
      const response = await this.client.get<ClientEntity[]>('/clients', {
        params: { search: query }
      });
      return this.handleResponse(response);
    } catch (error) {
      this.handleError(error);
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;