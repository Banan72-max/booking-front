import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../../pages/home/HomePage';
import { ListingPage } from '../../pages/listing/ListingPage';
import { ProfilePage } from '../../pages/profile/ProfilePage';
import { AuthPage } from '../../pages/auth/AuthPage';
import { AdminPage } from '../../pages/admin/AdminPage';
import { ProtectedRoute } from './ProtectedRoute';
import { ROUTES } from '../../shared/config/routes';

export function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LISTING()} element={<ListingPage />} />
      <Route path={ROUTES.AUTH} element={<AuthPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
      </Route>
      <Route element={<ProtectedRoute roles={['ADMIN']} />}>
        <Route path={ROUTES.ADMIN} element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
