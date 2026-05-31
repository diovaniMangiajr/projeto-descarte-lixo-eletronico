import { api } from '@/services/http/api';
import { TipoProdutoRequest } from './request/materiais-aceitos.request';
import { TipoProdutoResponse, SpringPage } from './response/materiais-aceitos.response';

const API_URL = '/tipos-produto';

export const materiaisAceitosService = {
  create: async (data: TipoProdutoRequest): Promise<TipoProdutoResponse> => {
    const response = await api.post<TipoProdutoResponse>(API_URL, data);
    return response.data;
  },

  findById: async (id: string): Promise<TipoProdutoResponse> => {
    const response = await api.get<TipoProdutoResponse>(`${API_URL}/${id}`);
    return response.data;
  },

  findAll: async (): Promise<TipoProdutoResponse[]> => {
    const response = await api.get<TipoProdutoResponse[]>(API_URL);
    return response.data;
  },

  findAllPaged: async (page: number, size = 5): Promise<SpringPage<TipoProdutoResponse>> => {
    const response = await api.get<SpringPage<TipoProdutoResponse>>(`${API_URL}/paged`, {
      params: { page, size }
    });
    return response.data;
  },

  update: async (id: string, data: TipoProdutoRequest): Promise<TipoProdutoResponse> => {
    const response = await api.put<TipoProdutoResponse>(`${API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`${API_URL}/${id}`);
  }
};