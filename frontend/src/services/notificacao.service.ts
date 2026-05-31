import { api } from './http/api';

export interface NotificacaoResponse {
  id: string;
  titulo: string;
  mensagem: string;
  pontoColetaId?: string;
  pontoColetaNome?: string;
  relatoProblemaId?: string;
  createdAt: string;
  entityStatus: 'ACTIVE' | 'INACTIVE' | 'DELETED';
}

export const notificacaoService = {
  findAll: async (): Promise<NotificacaoResponse[]> => {
    const response = await api.get<NotificacaoResponse[]>('/notificacoes');
    return response.data;
  },

  findUnread: async (): Promise<NotificacaoResponse[]> => {
    const response = await api.get<NotificacaoResponse[]>('/notificacoes/nao-visualizadas');
    return response.data;
  },

  markAsViewed: async (id: string): Promise<NotificacaoResponse> => {
    const response = await api.patch<NotificacaoResponse>(`/notificacoes/${id}/visualizar`);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/notificacoes/${id}`);
  }
};