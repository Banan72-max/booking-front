import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../app/store/authStore';
import { useListingStore } from '../../app/store/listingStore';
import { useBookingStore } from '../../app/store/bookingStore';
import { useNotificationStore } from '../../app/store/notificationStore';
import { ROUTES } from '../../shared/config/routes';
import { Button } from '../../shared/ui/Button/Button';
import { NotificationBell } from '../notification-bell/NotificationBell';

export function Header() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const resetFilters = useListingStore((s) => s.resetFilters);
  const setBookings = useBookingStore((s) => s.setBookings);
  const setNotifications = useNotificationStore((s) => s.setNotifications);
  const navigate = useNavigate();

  function handleLogout() {
    // Требование ТЗ: при logout — resetFilters() + очистить bookings и notifications.
    logout();
    resetFilters();
    setBookings([]);
    setNotifications([]);
    navigate(ROUTES.HOME);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
        <Link to={ROUTES.HOME} className="font-display text-base font-extrabold">
          Букинг<span className="text-primary">.</span>
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
                  Админ
                </Link>
              )}
              <Button variant="ghost" size="sm" onClick={handleLogout}>
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
