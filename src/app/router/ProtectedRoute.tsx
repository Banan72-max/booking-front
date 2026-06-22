import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../../shared/config/routes';
import type { Role } from '../../entities/user/model/types';

export function ProtectedRoute({ roles }: { roles?: Role[] }) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to={ROUTES.AUTH} replace />;
  if (roles && (!user || !roles.includes(user.role))) return <Navigate to={ROUTES.HOME} replace />;

  return <Outlet />;
}
