import { Navigate, Route, Routes } from 'react-router-dom';
import { AppPaths } from './paths';
import { AdminPage } from '../../pages/admin/AdminPage';
import { LoginPage } from '../../pages/login/LoginPage';
import { MapaPage } from '../../pages/mapa/MapaPage';
import { MateriaisAceitosPage } from '@/pages/admin/materiais-aceitos';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={AppPaths.home} element={<Navigate to={AppPaths.mapa} replace />} />
      <Route path={AppPaths.login} element={<LoginPage />} />
      <Route path={AppPaths.admin} element={<AdminPage />} />
      <Route path={AppPaths.adminMateriais} element={<MateriaisAceitosPage />} />
      <Route path={AppPaths.mapa} element={<MapaPage />} />
      <Route path="*" element={<Navigate to={AppPaths.mapa} replace />} />
    </Routes>
  );
}