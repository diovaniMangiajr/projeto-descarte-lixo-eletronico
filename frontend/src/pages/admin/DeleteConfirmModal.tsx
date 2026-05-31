import { X } from 'lucide-react';
import type { PontoColetaResponse } from '@/services/pontoColeta.service';

interface DeleteConfirmModalProps {
  point: PontoColetaResponse;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ point, isDeleting, onClose, onConfirm }: DeleteConfirmModalProps) {
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
            <h3>Excluir ponto de coleta</h3>
          </div>
          <button type="button" className="adminv2-dialog__close" onClick={onClose} disabled={isDeleting}>
            <X />
          </button>
        </header>

        <div className="adminv2-confirmation">
          <p>
            Você está prestes a remover o ponto <strong>{point.nome}</strong>.
          </p>
          <span>{point.endereco}</span>
          <p className="adminv2-confirmation__warning">
            Essa ação é irreversível. Confirme apenas se tiver certeza.
          </p>
        </div>

        <footer className="adminv2-dialog__footer">
          <button type="button" className="adminv2-secondaryBtn" onClick={onClose} disabled={isDeleting}>
            Cancelar
          </button>
          <button type="button" className="adminv2-dangerBtn" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? 'Excluindo...' : 'Excluir ponto'}
          </button>
        </footer>
      </section>
    </div>
  );
}