import { Battery, Bolt, Clock3, Cpu, MapPin, TriangleAlert, Trash2 } from 'lucide-react';
import type { PontoColetaResponse } from '@/services/pontoColeta.service';

interface PointCardProps {
  point: PontoColetaResponse;
  isSelected: boolean;
  onSelect: () => void;
  onNotifyFull: (id: string) => void;
}

function getIconForMaterial(nome: string) {
  const n = nome.toLowerCase();
  if (n.includes('pilha')) return <Battery className="mapv2-tag__icon" aria-hidden="true" />;
  if (n.includes('bateria')) return <Bolt className="mapv2-tag__icon" aria-hidden="true" />;
  return <Cpu className="mapv2-tag__icon" aria-hidden="true" />;
}

export function PointCard({ point, isSelected, onSelect, onNotifyFull }: PointCardProps) {
  return (
    <article
      onClick={onSelect}
      style={{ cursor: 'pointer' }}
      className={`mapv2-card${isSelected ? ' mapv2-card--featured' : ''}`}
    >
      <div className="mapv2-card__header">
        <div>
          <h2>{point.nome}</h2>
          <p className="mapv2-location">
            <MapPin className="mapv2-location__icon" aria-hidden="true" />
            <span>{point.endereco}</span>
          </p>
        </div>

        <span className={`mapv2-status mapv2-status--${point.aberto ? 'aberto' : 'fechado'}`}>
          <span className="mapv2-status__dot" aria-hidden="true" />
          {point.aberto ? 'ABERTO' : 'FECHADO'}
        </span>
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
                  <span 
                    key={material.id} 
                    className="mapv2-tag"
                    title={material.nome} /* A MÁGICA DO HOVER AQUI */
                  >
                    {getIconForMaterial(material.nome)}
                    <span>{material.nome}</span>
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="mapv2-actions">
            <button 
              type="button" 
              className="mapv2-btn mapv2-btn--outline"
              onClick={(e) => {
                e.stopPropagation();
                onNotifyFull(point.id);
              }}
            >
              <Trash2 className="mapv2-btn__icon" aria-hidden="true" />
              AVISAR LIXEIRA CHEIA
            </button>
            <button 
              type="button" 
              className="mapv2-btn mapv2-btn--danger"
              onClick={(e) => e.stopPropagation()}
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