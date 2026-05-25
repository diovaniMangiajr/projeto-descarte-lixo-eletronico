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
}

export const pontoColetaService = {
  findAll: async (): Promise<PontoColetaResponse[]> => {
    const response = await api.get<PontoColetaResponse[]>('/pontos-coleta');
    return response.data;
  },

  notifyFull: async (id: string): Promise<void> => {
    await api.post(`/pontos-coleta/${id}/notificacoes/cheio`);
  }
};