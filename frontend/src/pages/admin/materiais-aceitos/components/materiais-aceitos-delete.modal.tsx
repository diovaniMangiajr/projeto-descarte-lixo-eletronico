import React from 'react';
import { X } from 'lucide-react';
import { TipoProdutoResponse } from '../services/response/materiais-aceitos.response';

interface MateriaisAceitosDeleteModalProps {
  material: TipoProdutoResponse;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const MateriaisAceitosDeleteModal: React.FC<MateriaisAceitosDeleteModalProps> = ({ 
  material, 
  isDeleting, 
  onClose, 
  onConfirm 
}) => {
  return (
    <div className="adminv2-modal" role="presentation" onClick={onClose}>
      <section
        className="adminv2-dialog adminv2-dialog--confirm"
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="adminv2-dialog__header">
          <div>
            <p className="adminv2-dialog__eyebrow">Confirmação obrigatória</p>
            <h3>Excluir tipo de resíduo</h3>
          </div>
          <button type="button" className="adminv2-dialog__close" onClick={onClose} disabled={isDeleting} aria-label="Fechar">
            <X />
          </button>
        </header>

        <div className="adminv2-confirmation">
          <p>
            Você está prestes a remover o material <strong>{material.nome}</strong>.
          </p>
          <span style={{ display: 'block', marginTop: '4px', color: '#94a3b8', fontSize: '0.875rem' }}>
            Exemplos afetados: {material.descricaoExemplos}
          </span>
          <p className="adminv2-confirmation__warning">
            Atenção: Esta ação ocultará este material do sistema. Confirme apenas se tiver certeza.
          </p>
        </div>

        <footer className="adminv2-dialog__footer">
          <button type="button" className="adminv2-secondaryBtn" onClick={onClose} disabled={isDeleting}>
            Cancelar
          </button>
          <button type="button" className="adminv2-dangerBtn" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Excluindo...' : 'Excluir material'}
          </button>
        </footer>
      </section>
    </div>
  );
};