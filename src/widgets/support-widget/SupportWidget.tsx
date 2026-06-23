import { useState } from 'react';
import { useAuthStore } from '../../app/store/authStore';
import { SupportChat } from '../support-chat/SupportChat';
import { cn } from '../../shared/lib/cn';

/**
 * Плавающий виджет поддержки в виде "призрака" — кнопка-бабл справа снизу,
 * доступна на любой странице для USER/OWNER. Раскрывает SupportChat (свой тред).
 * Админ работает с тредами через раздел "Поддержка" в админ-панели.
 */
export function SupportWidget() {
  const { user, isAuthenticated } = useAuthStore();
  const [open, setOpen] = useState(false);

  const canUseSupport = isAuthenticated && (user?.role === 'USER' || user?.role === 'OWNER');
  if (!canUseSupport) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-80 rounded-2xl border border-border bg-surface-2/95 p-3 shadow-2xl backdrop-blur-md">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-sm font-bold">👻 Поддержка</span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted hover:text-white"
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
          <SupportChat />
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-full border border-primary/40',
          'bg-surface-2/70 text-2xl shadow-xl backdrop-blur-md transition-transform hover:scale-105',
          open && 'scale-95 opacity-80',
        )}
        aria-label="Поддержка"
      >
        👻
      </button>
    </div>
  );
}
