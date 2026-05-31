import React from 'react';
import { Trash2, Pencil } from 'lucide-react';
import { TipoProdutoResponse } from '../services/response/materiais-aceitos.response';
import { getIconForMaterial } from '@/utils/material-icons';

interface MateriaisAceitosTableProps {
  materiais: TipoProdutoResponse[];
  onEdit: (material: TipoProdutoResponse) => void;
  onDelete: (material: TipoProdutoResponse) => void;
}

export const MateriaisAceitosTable: React.FC<MateriaisAceitosTableProps> = ({
  materiais,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="adminv2-table">
      <div className="adminv2-table__header adminv2-table__row">
        <span>Material / Resíduo</span>
        <span>Exemplos Aceitos</span>
        <span className="adminv2-actionsCol" aria-hidden="true" />
      </div>

      {materiais.map((material) => (
        <article key={material.id} className="adminv2-table__row adminv2-table__item">
          <div className="adminv2-station">
            <span className="adminv2-stationIcon" aria-hidden="true">
              {/* Usando nossa função inteligente passando a classe CSS */}
              {getIconForMaterial(material.nome, "adminv2-stationIcon__svg")}
            </span>
            <div>
              <strong>{material.nome}</strong>
            </div>
          </div>

          <p className="adminv2-location">{material.descricaoExemplos}</p>

          <div className="adminv2-rowActions">
            <button type="button" aria-label={`Editar ${material.nome}`} onClick={() => onEdit(material)}>
              <Pencil />
            </button>
            <button type="button" aria-label={`Excluir ${material.nome}`} onClick={() => onDelete(material)}>
              <Trash2 />
            </button>
          </div>
        </article>
      ))}

      {materiais.length === 0 && (
        <p style={{ textAlign: 'center', color: '#64748b', padding: '3rem 0', width: '100%' }}>
          Nenhum material cadastrado.
        </p>
      )}
    </div>
  );
};