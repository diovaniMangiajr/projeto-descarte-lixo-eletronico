import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { TipoProdutoResponse } from '../services/response/materiais-aceitos.response';

interface MateriaisAceitosModalProps {
  isOpen: boolean;
  onClose: () => void;
  // Corrigido para camelCase para bater com o DTO do Back-end
  onSave: (data: { nome: string; descricaoExemplos: string }) => void;
  materialToEdit: TipoProdutoResponse | null;
}

export const MateriaisAceitosModal: React.FC<MateriaisAceitosModalProps> = ({
  isOpen,
  onClose,
  onSave,
  materialToEdit,
}) => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  useEffect(() => {
    if (materialToEdit) {
      setNome(materialToEdit.nome);
      setDescricao(materialToEdit.descricaoExemplos);
    } else {
      setNome('');
      setDescricao('');
    }
  }, [materialToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || !descricao.trim()) return;
    // Enviando com o nome exato que o Spring Boot espera
    onSave({ nome, descricaoExemplos: descricao });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
      <div className="w-full max-w-md p-6 rounded-2xl bg-[#0f172a] border border-slate-800 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {materialToEdit ? 'Editar Material' : 'Adicionar Novo Material'}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Nome do Material</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Informática"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Exemplos (Separados por vírgula)</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Computadores, teclados, mouses."
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-800 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-500 text-white font-medium hover:bg-sky-600 shadow-md shadow-sky-500/10 transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};