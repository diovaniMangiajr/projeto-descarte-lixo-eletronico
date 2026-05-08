import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Cpu,
  LayoutList,
  MapPinned,
  Monitor,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  UserRound,
  Users,
  Wrench,
} from 'lucide-react';
import { AppHeader } from '@/components/layout/AppHeader';
import './admin-page.css';

type Station = {
  name: string;
  location: string;
  status: 'operacional' | 'manutencao';
  icon: 'cpu' | 'monitor' | 'pin' | 'wrench';
};

const stations: Station[] = [
  {
    name: 'UFLA - Cantina Central',
    location: 'Campus Universitário, Lavras - MG',
    status: 'operacional',
    icon: 'cpu',
  },
  {
    name: 'Prefeitura Municipal',
    location: 'Praça Dr. Augusto Silva, Centro',
    status: 'operacional',
    icon: 'monitor',
  },
  {
    name: 'Supermercado Rex',
    location: 'Av. Pedro Sales, 150',
    status: 'operacional',
    icon: 'pin',
  },
  {
    name: 'UFLA - DCC',
    location: 'Campus Universitário, Lavras - MG',
    status: 'manutencao',
    icon: 'wrench',
  },
];

function StationIcon({ icon }: { icon: Station['icon'] }) {
  if (icon === 'monitor') return <Monitor className="adminv2-stationIcon__svg" aria-hidden="true" />;
  if (icon === 'pin') return <MapPinned className="adminv2-stationIcon__svg" aria-hidden="true" />;
  if (icon === 'wrench') return <Wrench className="adminv2-stationIcon__svg" aria-hidden="true" />;
  return <Cpu className="adminv2-stationIcon__svg" aria-hidden="true" />;
}

export function AdminPage() {
  return (
    <main className="adminv2">
      <AppHeader />

      <section className="adminv2-shell">
        <aside className="adminv2-sidebar">
          <div className="adminv2-user">
            <span className="adminv2-user__avatar" aria-hidden="true" />
            <div>
              <strong>Leonardo Silva</strong>
              <p>Administrador</p>
            </div>
          </div>

          <nav className="adminv2-nav" aria-label="Navegação administrativa">
            <a href="#" className="adminv2-nav__item adminv2-nav__item--active">
              <MapPinned className="adminv2-nav__icon" aria-hidden="true" />
              Pontos de Coleta
            </a>
            <a href="#" className="adminv2-nav__item">
              <Users className="adminv2-nav__icon" aria-hidden="true" />
              Usuários
            </a>
            <a href="#" className="adminv2-nav__item">
              <Cpu className="adminv2-nav__icon" aria-hidden="true" />
              Materiais Aceitos
            </a>
          </nav>
        </aside>

        <section className="adminv2-content">
          <header className="adminv2-content__header">
            <div>
              <h1>Pontos de Coleta</h1>
              <p>
                Monitore e gerencie as estações inteligentes de descarte de lixo eletrônico na rede
                municipal.
              </p>
            </div>

            <button type="button" className="adminv2-addBtn">
              <Plus className="adminv2-addBtn__icon" aria-hidden="true" />
              Adicionar Novo Ponto
            </button>
          </header>

          <section className="adminv2-tableCard" aria-label="Tabela de pontos de coleta">
            <header className="adminv2-tableCard__head">
              <h2>Pontos de Coleta</h2>
              <div className="adminv2-tableCard__tools">
                <button type="button" aria-label="Filtros">
                  <LayoutList />
                </button>
                <button type="button" aria-label="Mais opções">
                  <MoreVertical />
                </button>
              </div>
            </header>

            <div className="adminv2-table">
              <div className="adminv2-table__header adminv2-table__row">
                <span>Estação</span>
                <span>Localização</span>
                <span>Status Operacional</span>
                <span className="adminv2-actionsCol" aria-hidden="true" />
              </div>

              {stations.map((station) => (
                <article key={station.name} className="adminv2-table__row adminv2-table__item">
                  <div className="adminv2-station">
                    <span
                      className={`adminv2-stationIcon${station.status === 'manutencao' ? ' adminv2-stationIcon--warn' : ''}`}
                      aria-hidden="true"
                    >
                      <StationIcon icon={station.icon} />
                    </span>
                    <strong>{station.name}</strong>
                  </div>

                  <p className="adminv2-location">{station.location}</p>

                  <span
                    className={`adminv2-status${station.status === 'manutencao' ? ' adminv2-status--warn' : ''}`}
                  >
                    <span className="adminv2-status__dot" aria-hidden="true" />
                    {station.status === 'manutencao' ? 'Manutenção Solicitada' : 'Operacional'}
                  </span>

                  <div className="adminv2-rowActions">
                    <button type="button" aria-label={`Editar ${station.name}`}>
                      <Pencil />
                    </button>
                    <button type="button" aria-label={`Excluir ${station.name}`}>
                      <Trash2 />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <footer className="adminv2-tableFooter">
              <p>Exibindo 1-4 de 12 estações</p>
              <div className="adminv2-pagination">
                <button type="button" aria-label="Anterior">
                  <ChevronLeft />
                </button>
                <button type="button" aria-label="Próximo">
                  <ChevronRight />
                </button>
              </div>
            </footer>
          </section>
        </section>
      </section>
    </main>
  );
}
