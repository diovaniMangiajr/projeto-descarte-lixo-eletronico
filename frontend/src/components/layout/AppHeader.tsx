import { NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { AppPaths } from '@/app/routes/paths';
import { useThemeMode } from '@/app/theme/ThemeProvider';

const navItems = [
  { label: 'Mapa', to: AppPaths.mapa },
  { label: 'Admin', to: AppPaths.admin },
  { label: 'Login', to: AppPaths.login },
];

export function AppHeader() {
  const { themeMode, toggleThemeMode } = useThemeMode();

  return (
    <header className="app-header">
      <div>
        <p className="app-header__brand">E-Lixo Lavras</p>
        <p className="app-header__subtitle">Pontos de coleta de lixo eletrônico</p>
      </div>

      <div className="app-header__actions">
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

        <button
          type="button"
          className="app-header__theme-toggle"
          onClick={toggleThemeMode}
          aria-label={themeMode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          title={themeMode === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {themeMode === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
        </button>
      </div>
    </header>
  );
}