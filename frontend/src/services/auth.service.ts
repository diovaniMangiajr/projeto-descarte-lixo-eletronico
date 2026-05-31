import { api } from './http/api';

export interface LoginRequest {
  email: string;
  senha: string;
}

export interface LoginResponse {
  accessToken: string;
}

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('@ELixo:token');
  }
};