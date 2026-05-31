import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPinned, Cpu } from 'lucide-react';
import { AppPaths } from '@/app/routes/paths';

interface AdminSidebarProps {
  activeTab: 'pontos' | 'materiais';
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeTab }) => {
  const navigate = useNavigate();

  const navItemStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <aside className="adminv2-sidebar">
      <div className="adminv2-user">
        <span className="adminv2-user__avatar" aria-hidden="true" />
        <div>
          <strong>Administrador</strong>
          <p>Painel de Controle</p>
        </div>
      </div>

      <nav className="adminv2-nav" aria-label="Navegação administrativa">
        <button
          type="button"
          onClick={() => navigate(AppPaths.admin)}
          className={`adminv2-nav__item ${activeTab === 'pontos' ? 'adminv2-nav__item--active' : ''}`}
          style={navItemStyle}
        >
          <MapPinned className="adminv2-nav__icon" aria-hidden="true" />
          Pontos de Coleta
        </button>

        <button
          type="button"
          onClick={() => navigate(AppPaths.adminMateriais)}
          className={`adminv2-nav__item ${activeTab === 'materiais' ? 'adminv2-nav__item--active' : ''}`}
          style={navItemStyle}
        >
          <Cpu className="adminv2-nav__icon" aria-hidden="true" />
          Materiais Aceitos
        </button>
      </nav>
    </aside>
  );
};