export interface TipoProdutoResponse {
  id: string;
  nome: string;
  descricaoExemplos: string;
  version: number;
  createdAt: string;
  updatedAt: string;
  entityStatus: 'ACTIVE' | 'INACTIVE' | 'DELETED';
  deletedAt: string | null;
}

export interface SpringPage<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; 
}