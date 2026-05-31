import axios from 'axios';
import { TipoProdutoRequest } from './request/materiais-aceitos.request';
import { TipoProdutoResponse, SpringPage } from './response/materiais-aceitos.response';

const API_URL = 'http://localhost:8080/api/v1/tipos-produto';

export const materiaisAceitosService = {
  create: async (data: TipoProdutoRequest): Promise<TipoProdutoResponse> => {
    const response = await axios.post<TipoProdutoResponse>(API_URL, data);
    return response.data;
  },

  findById: async (id: string): Promise<TipoProdutoResponse> => {
    const response = await axios.get<TipoProdutoResponse>(`${API_URL}/${id}`);
    return response.data;
  },

  findAll: async (): Promise<TipoProdutoResponse[]> => {
    const response = await axios.get<TipoProdutoResponse[]>(API_URL);
    return response.data;
  },

  findAllPaged: async (page: number, size = 5): Promise<SpringPage<TipoProdutoResponse>> => {
    const response = await axios.get<SpringPage<TipoProdutoResponse>>(`${API_URL}/paged`, {
      params: {
        page: page,
        size: size,
      }
    });
    return response.data;
  },

  update: async (id: string, data: TipoProdutoRequest): Promise<TipoProdutoResponse> => {
    const response = await axios.put<TipoProdutoResponse>(`${API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};