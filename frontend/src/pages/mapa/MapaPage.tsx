import {
  Battery,
  Bolt,
  Clock3,
  Cpu,
  MapPin,
  Recycle,
  Search,
  TriangleAlert,
} from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import './mapa-page.css';

type Material = {
  label: string;
  icon: 'battery' | 'bolt' | 'cpu';
};

type Point = {
  name: string;
  neighborhood: string;
  status: 'aberto' | 'fechado';
  featured?: boolean;
  hours?: string;
  materials?: Material[];
};

const points: Point[] = [
  {
    name: 'Praça Dr. Augusto Silva',
    neighborhood: 'Centro, Lavras - MG',
    status: 'aberto',
    featured: true,
    hours: '08h às 18h',
    materials: [
      { label: 'Pilhas', icon: 'battery' },
      { label: 'Baterias', icon: 'bolt' },
      { label: 'Eletrônicos', icon: 'cpu' },
    ],
  },
  {
    name: 'UFLA - DCC',
    neighborhood: 'Campus Universitário',
    status: 'aberto',
  },
  {
    name: 'UFLA - Cantina Central',
    neighborhood: 'Campus Universitário',
    status: 'fechado',
  },
];

function MaterialIcon({ type }: { type: Material['icon'] }) {
  if (type === 'battery') return <Battery className="mapv2-tag__icon" aria-hidden="true" />;
  if (type === 'bolt') return <Bolt className="mapv2-tag__icon" aria-hidden="true" />;
  return <Cpu className="mapv2-tag__icon" aria-hidden="true" />;
}

export function MapaPage() {
  return (
    <main className="mapv2">
      <AppHeader />

      <section className="mapv2-shell">
        <aside className="mapv2-sidebar">
          <div className="mapv2-intro">
            <h1>Pontos de Coleta</h1>
            <p>Encontre o local mais próximo para descarte responsável.</p>
          </div>

          <div className="mapv2-list">
            {points.map((point) => {
              const isOpen = point.status === 'aberto';

              return (
                <article
                  key={point.name}
                  className={`mapv2-card${point.featured ? ' mapv2-card--featured' : ''}`}
                >
                  <div className="mapv2-card__header">
                    <div>
                      <h2>{point.name}</h2>
                      <p className="mapv2-location">
                        <MapPin className="mapv2-location__icon" aria-hidden="true" />
                        {point.neighborhood}
                      </p>
                    </div>

                    <span className={`mapv2-status mapv2-status--${point.status}`}>
                      <span className="mapv2-status__dot" aria-hidden="true" />
                      {isOpen ? 'ABERTO' : 'FECHADO'}
                    </span>
                  </div>

                  {point.featured ? (
                    <>
                      <section className="mapv2-meta-block">
                        <h3>HORÁRIO</h3>
                        <p className="mapv2-hours">
                          <Clock3 className="mapv2-hours__icon" aria-hidden="true" />
                          {point.hours}
                        </p>
                      </section>

                      <section className="mapv2-meta-block">
                        <h3>MATERIAIS ACEITOS</h3>
                        <div className="mapv2-tags">
                          {point.materials?.map((material) => (
                            <span key={material.label} className="mapv2-tag">
                              <MaterialIcon type={material.icon} />
                              {material.label}
                            </span>
                          ))}
                        </div>
                      </section>

                      <div className="mapv2-actions">
                        <button type="button" className="mapv2-btn mapv2-btn--outline">
                          <TriangleAlert className="mapv2-btn__icon" aria-hidden="true" />
                          AVISAR LIXEIRA CHEIA
                        </button>

                        <button type="button" className="mapv2-btn mapv2-btn--danger">
                          <TriangleAlert className="mapv2-btn__icon" aria-hidden="true" />
                          RELATAR PROBLEMA
                        </button>
                      </div>
                    </>
                  ) : null}
                </article>
              );
            })}
          </div>
        </aside>

        <section className="mapv2-canvas" aria-label="Mapa de pontos de coleta">
          <div className="mapv2-search">
            <Search className="mapv2-search__icon" aria-hidden="true" />
            <span>Buscar ponto de coleta no mapa...</span>
          </div>
          <div className="mapv2-grid" />
        </section>
      </section>
    </main>
  );
}
