import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';
import { ROUTES } from '../../shared/config/routes';
import { Button } from '../../shared/ui/Button/Button';
import { NotificationBell } from '../notification-bell/NotificationBell';

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <Link to={ROUTES.HOME} className="font-display text-base font-extrabold">
          Book<span className="text-primary">.</span>
        </Link>
        <nav className="ml-auto flex items-center gap-3">
          {isAuthenticated && <NotificationBell />}
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.PROFILE} className="text-sm text-muted hover:text-white">
                {user?.name}
              </Link>
              {user?.role === 'ADMIN' && (
                <Link to={ROUTES.ADMIN} className="text-sm text-muted hover:text-white">
                  Admin
                </Link>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  logout();
                  navigate(ROUTES.HOME);
                }}
              >
                Выйти
              </Button>
            </>
          ) : (
            <Link to={ROUTES.AUTH}>
              <Button size="sm">Войти</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
