export interface ClientEntity {
  id: string;
  name: string;
  email: string;
  birthDate: string;
  preferences?: ClientPreferences;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClientPreferences {
  notifications: boolean;
  marketingEmails: boolean;
  language: string;
  theme: 'light' | 'dark';
  additionalData?: Record<string, unknown>;
}

export interface CreateClientDto {
  name: string;
  email: string;
  birthDate: string;
  preferences?: Partial<ClientPreferences>;
}

export interface UpdateClientDto {
  name?: string;
  email?: string;
  birthDate?: string;
  preferences?: Partial<ClientPreferences>;
}

export interface ClientListResponse {
  clients: ClientEntity[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}

export type ClientFormData = Omit<ClientEntity, 'id' | 'createdAt' | 'updatedAt'>;