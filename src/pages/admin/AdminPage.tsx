import { useState } from 'react';
import {
  useAdminUsers,
  useAdminCategories,
  useAdminListings,
  useAdminBookings,
  useBanUser,
  useDeleteCategory,
  useCreateCategory,
  useDeactivateListing,
  useHardDeleteBooking,
} from '../../features/admin-panel';
import { useSupportThreads } from '../../features/support';
import { SupportChat } from '../../widgets/support-chat/SupportChat';
import { UserCard } from '../../entities/user';
import { CategoryBadge } from '../../entities/category';
import { Badge } from '../../shared/ui/Badge/Badge';
import { formatPrice } from '../../shared/lib/formatPrice';
import { formatDate } from '../../shared/lib/formatDate';
import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/Input/Input';
import { cn } from '../../shared/lib/cn';

function BookingsSection() {
  const { data: bookings = [] } = useAdminBookings();
  const { mutate: hardDelete } = useHardDeleteBooking();

  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-base font-bold">Бронирования</h2>
      <div className="flex flex-col gap-2">
        {bookings.length === 0 && <p className="text-sm text-muted">Бронирований нет.</p>}
        {bookings.map((b) => (
          <div key={b.id} className="rounded-lg border border-border bg-surface-2 px-3 py-2">
            <div className="mb-1 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold text-white">{b.listing?.title ?? b.listingId}</p>
              <Badge status={b.status} />
            </div>
            <p className="text-xs text-muted">
              Арендатор: {b.user?.name ?? '—'} ({b.user?.email ?? '—'}) · Владелец объекта:{' '}
              {b.listing?.owner?.name ?? '—'} ({b.listing?.owner?.email ?? '—'})
            </p>
            <p className="text-xs text-muted">
              {formatDate(b.dateFrom)} → {formatDate(b.dateTo)} · {formatPrice(b.totalPrice)}
            </p>
            <div className="mt-2 flex justify-end">
              <Button variant="danger" size="sm" onClick={() => hardDelete(b.id)}>
                Удалить запись
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SupportSection() {
  const { data: threads = [] } = useSupportThreads();
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <section className="mt-8">
      <h2 className="mb-3 font-display text-base font-bold">Поддержка</h2>
      <div className="grid gap-3 md:grid-cols-[220px_1fr]">
        <div className="flex flex-col gap-1">
          {threads.length === 0 && <p className="text-sm text-muted">Обращений пока нет.</p>}
          {threads.map((t) => (
            <button
              key={t.userId}
              onClick={() => setSelectedUserId(t.userId)}
              className={cn(
                'rounded-lg border border-border px-3 py-2 text-left text-xs',
                selectedUserId === t.userId ? 'bg-primary/20' : 'bg-surface-2',
              )}
            >
              <p className="font-semibold text-white">{t.user?.name ?? t.userId}</p>
              <p className="truncate text-muted">{t.message}</p>
            </button>
          ))}
        </div>
        <div>
          {selectedUserId ? (
            <SupportChat threadUserId={selectedUserId} />
          ) : (
            <p className="text-sm text-muted">Выберите обращение слева.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export function AdminPage() {
  const { data: usersResult } = useAdminUsers();
  const { data: categories = [] } = useAdminCategories();
  const { data: listingsResult } = useAdminListings();
  const { mutate: banUser } = useBanUser();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: createCategory } = useCreateCategory();
  const { mutate: deactivateListing } = useDeactivateListing();
  const [name, setName] = useState('');

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 font-display text-2xl font-extrabold">Админ-панель</h1>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-base font-bold">Пользователи</h2>
        <div className="flex flex-col gap-2">
          {usersResult?.data.map((u) => (
            <div key={u.id} className="flex items-center justify-between gap-3">
              <UserCard user={u} />
              {u.role !== 'ADMIN' && (
                <Button
                  variant={u.isBanned ? 'ghost' : 'danger'}
                  size="sm"
                  onClick={() => banUser({ id: u.id, isBanned: !u.isBanned })}
                >
                  {u.isBanned ? 'Разбанить' : 'Забанить'}
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 font-display text-base font-bold">Категории</h2>
        <div className="mb-3 flex flex-wrap gap-2">
          {categories.map((c) => (
            <div key={c.id} className="flex items-center gap-1">
              <CategoryBadge category={c} />
              <button onClick={() => deleteCategory(c.id)} className="text-xs text-destructive">
                ✕
              </button>
            </div>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            createCategory({ name, icon: '🏷️', slug: name.toLowerCase().replace(/\s+/g, '-') });
            setName('');
          }}
        >
          <Input placeholder="Новая категория" value={name} onChange={(e) => setName(e.target.value)} />
          <Button type="submit" size="sm">
            Добавить
          </Button>
        </form>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 font-display text-base font-bold">Объекты</h2>
        <div className="flex flex-col gap-2">
          {listingsResult?.data.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2"
            >
              <div>
                <p className="text-sm font-semibold text-white">
                  {l.title} {!l.isActive && <span className="text-xs text-muted">(неактивен)</span>}
                </p>
                <p className="text-xs text-muted">{formatPrice(l.price)} / ночь</p>
              </div>
              {l.isActive && (
                <Button variant="danger" size="sm" onClick={() => deactivateListing(l.id)}>
                  Деактивировать
                </Button>
              )}
            </div>
          ))}
        </div>
      </section>

      <BookingsSection />
      <SupportSection />
    </div>
  );
}
