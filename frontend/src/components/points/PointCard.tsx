import { Battery, Bolt, Clock3, Cpu, MapPin, TriangleAlert } from 'lucide-react';
import type { PontoColetaResponse } from '@/services/pontoColeta.service';
import { getIconForMaterial } from '@/utils/material-icons';

interface PointCardProps {
  point: PontoColetaResponse;
  isSelected: boolean;
  onSelect: () => void;
  onReportProblem: (point: PontoColetaResponse) => void;
  distance?: string;
}

export function PointCard({ point, isSelected, onSelect, onReportProblem, distance }: PointCardProps) {
  return (
    <article
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
      className={`mapv2-card${isSelected ? ' mapv2-card--featured' : ''}`}
    >
      <div className="mapv2-card__header">
        <h2>{point.nome}</h2>
        <p className="mapv2-location">
          <MapPin className="mapv2-location__icon" aria-hidden="true" />
          <span>{point.endereco}</span>
        </p>

        <div className="mapv2-card__badges-row">
          <span className={`mapv2-status mapv2-status--${point.aberto ? 'aberto' : 'fechado'}`}>
            <span className="mapv2-status__dot" aria-hidden="true" />
            {point.aberto ? 'ABERTO' : 'FECHADO'}
          </span>
          {distance && <span className="mapv2-distance-badge">{distance}</span>}
        </div>
      </div>

      {isSelected && (
        <>
          <section className="mapv2-meta-block">
            <h3>HORÁRIO</h3>
            <p className="mapv2-hours">
              <Clock3 className="mapv2-hours__icon" aria-hidden="true" />
              {point.horarioFormatado}
            </p>
          </section>

          {point.tiposProduto && point.tiposProduto.length > 0 && (
            <section className="mapv2-meta-block">
              <h3>MATERIAIS ACEITOS</h3>
              <div className="mapv2-tags">
                {point.tiposProduto.map((material) => (
                  <span key={material.id} className="mapv2-tag" title={material.nome}>
                    {getIconForMaterial(material.nome, "mapv2-tag__icon")}
                    <span>{material.nome}</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="mapv2-actions">
            <button 
              type="button" 
              className="mapv2-btn mapv2-btn--danger"
              onClick={(e) => {
                e.stopPropagation();
                onReportProblem(point);
              }}
            >
              <TriangleAlert className="mapv2-btn__icon" aria-hidden="true" />
              RELATAR PROBLEMA
            </button>
          </div>
        </>
      )}
    </article>
  );
}