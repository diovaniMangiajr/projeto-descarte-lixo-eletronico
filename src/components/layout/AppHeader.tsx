import { NavLink } from 'react-router-dom';
import { AppPaths } from '@/app/routes/paths';

const navItems = [
  { label: 'Mapa', to: AppPaths.mapa },
  { label: 'Admin', to: AppPaths.admin },
  { label: 'Login', to: AppPaths.login },
];

export function AppHeader() {
  return (
    <header className="app-header">
      <div>
        <p className="app-header__brand">E-Lixo Lavras</p>
        <p className="app-header__subtitle">Pontos de coleta de lixo eletrônico</p>
      </div>
      <nav className="app-header__nav" aria-label="Navegação principal">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `app-header__link${isActive ? ' app-header__link--active' : ''}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}