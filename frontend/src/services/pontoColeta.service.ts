import { api } from './http/api';

export interface TipoProdutoResponse {
  id: string;
  nome: string;
  descricaoExemplos: string;
}

export interface PontoColetaResponse {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  latitude: number;
  longitude: number;
  horarioAbertura: string; 
  horarioFechamento: string;
  aberto: boolean;
  horarioFormatado: string;
  tiposProduto: TipoProdutoResponse[];
  createdAt: string;
  updatedAt: string;
  entityStatus: string;
}

export interface PontoColetaRequest {
  nome: string;
  endereco: string;
  descricao: string;
  latitude: number;
  longitude: number;
  horarioAbertura: string;
  horarioFechamento: string;
  tipoProdutoIds: string[];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export const pontoColetaService = {
  findAll: async (): Promise<PontoColetaResponse[]> => {
    const response = await api.get<PontoColetaResponse[]>('/pontos-coleta');
    return response.data;
  },

  findAllPaged: async (page: number, size: number = 5): Promise<Page<PontoColetaResponse>> => {
    const response = await api.get<Page<PontoColetaResponse>>(`/pontos-coleta/paged?page=${page}&size=${size}`);
    return response.data;
  },

  findById: async (id: string): Promise<PontoColetaResponse> => {
    const response = await api.get<PontoColetaResponse>(`/pontos-coleta/${id}`);
    return response.data;
  },

  create: async (data: PontoColetaRequest): Promise<PontoColetaResponse> => {
    const response = await api.post<PontoColetaResponse>('/pontos-coleta', data);
    return response.data;
  },

  update: async (id: string, data: PontoColetaRequest): Promise<PontoColetaResponse> => {
    const response = await api.put<PontoColetaResponse>(`/pontos-coleta/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/pontos-coleta/${id}`);
  }
};