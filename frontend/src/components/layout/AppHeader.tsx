import { NavLink, useNavigate } from 'react-router-dom';
import { Moon, Sun, LogOut } from 'lucide-react';
import { AppPaths } from '@/app/routes/paths';
import { useThemeMode } from '@/app/theme/ThemeProvider';
import { NotificacaoWidget } from './NotificacaoWidget'; // <-- Importe aqui!

export function AppHeader() {
  const { themeMode, toggleThemeMode } = useThemeMode();
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('@ELixo:token');

  const handleLogout = () => {
    localStorage.removeItem('@ELixo:token');
    window.location.href = AppPaths.mapa; 
  };

  return (
    <header className="app-header">
      <div>
        <p className="app-header__brand">E-Lixo Lavras</p>
        <p className="app-header__subtitle">Pontos de coleta de lixo eletrônico</p>
      </div>

      <div className="app-header__actions">
        <nav className="app-header__nav" aria-label="Navegação principal">
          <NavLink
            to={AppPaths.mapa}
            className={({ isActive }) =>
              `app-header__link${isActive ? ' app-header__link--active' : ''}`
            }
          >
            Mapa
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to={AppPaths.admin}
                className={({ isActive }) =>
                  `app-header__link${isActive ? ' app-header__link--active' : ''}`
                }
              >
                Painel Admin
              </NavLink>
              
              {/* NOSSO SININHO ENTRA AQUI */}
              <NotificacaoWidget />

              <button 
                type="button" 
                className="app-header__link" 
                onClick={handleLogout}
                style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <LogOut size={16} />
                Sair
              </button>
            </>
          ) : (
            <NavLink
              to={AppPaths.login}
              className={({ isActive }) =>
                `app-header__link${isActive ? ' app-header__link--active' : ''}`
              }
            >
              Acesso Restrito
            </NavLink>
          )}
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