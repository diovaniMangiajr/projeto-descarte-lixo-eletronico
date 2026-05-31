import type { PontoColetaResponse } from '@/services/pontoColeta.service';

export type AdminPointModalMode = 'create' | 'edit';

export type AdminPointFormState = {
  name: string;
  address: string;
  description: string;
  latitude: string;
  longitude: string;
  horarioAbertura: string;
  horarioFechamento: string;
  tipoProdutoIds: string[];
};

export type AdminPointFormErrors = Partial<Record<keyof AdminPointFormState, string>>;