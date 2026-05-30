import { api } from './http/api';

export type TipoRelato = 
  | 'PONTO_NAO_EXISTE'
  | 'LIXEIRA_DANIFICADA'
  | 'LIXEIRA_CHEIA'
  | 'HORARIO_INCORRETO'
  | 'MATERIAIS_RECUSADOS'
  | 'OUTRO';

export interface RelatoProblemaRequest {
  tipoRelato: TipoRelato;
  nome: string;
  email: string;
  observacao?: string;
}

export interface RelatoProblemaResponse {
  id: string;
  pontoColetaId: string;
  tipoRelato: TipoRelato;
  nome: string;
  email: string;
  observacao?: string;
  createdAt: string;
}

export const relatoProblemaService = {
  create: async (pontoColetaId: string, data: RelatoProblemaRequest): Promise<RelatoProblemaResponse> => {
    const response = await api.post<RelatoProblemaResponse>(`/pontos-coleta/${pontoColetaId}/relatos-problema`, data);
    return response.data;
  },
};