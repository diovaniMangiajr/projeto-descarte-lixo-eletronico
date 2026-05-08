import { AppHeader } from '@/components/layout/AppHeader';

const points = [
  {
    name: 'Praça Dr. Augusto Silva',
    neighborhood: 'Centro, Lavras - MG',
    status: 'Aberto',
    materials: ['Pilhas', 'Baterias', 'Eletrônicos'],
  },
  {
    name: 'UFLA - DCC',
    neighborhood: 'Campus Universitário',
    status: 'Fechado',
    materials: ['Computadores', 'Cabos', 'Periféricos'],
  },
  {
    name: 'Prefeitura Municipal',
    neighborhood: 'Praça Dr. Augusto Silva',
    status: 'Aberto',
    materials: ['Pilhas', 'Lâmpadas', 'Celulares'],
  },
];

export function MapaPage() {
  return (
    <main className="page page--map">
      <AppHeader />
      <section className="map-layout">
        <aside className="point-panel">
          <p className="eyebrow">Descoberta pública</p>
          <h1>Pontos de coleta</h1>
          <p className="page-copy">
            Encontre o local mais próximo para descarte responsável de lixo eletrônico.
          </p>

          <div className="point-list">
            {points.map((point) => (
              <article key={point.name} className="point-card">
                <div className="point-card__header">
                  <div>
                    <h2>{point.name}</h2>
                    <p>{point.neighborhood}</p>
                  </div>
                  <span className={`status-badge status-badge--${point.status.toLowerCase()}`}>
                    {point.status}
                  </span>
                </div>

                <div>
                  <p className="section-label">Materiais aceitos</p>
                  <div className="tag-row">
                    {point.materials.map((material) => (
                      <span key={material} className="tag">
                        {material}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </aside>

        <section className="map-canvas" aria-label="Mapa de pontos de coleta">
          <div className="map-canvas__search">Buscar ponto de coleta no mapa...</div>
          <div className="map-canvas__grid" />
        </section>
      </section>
    </main>
  );
}