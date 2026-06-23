import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../app/store/authStore';
import { useListingStore } from '../../app/store/listingStore';
import { useBookingStore } from '../../app/store/bookingStore';
import { useNotificationStore } from '../../app/store/notificationStore';
import { BookingList } from '../../widgets/booking-list/BookingList';
import { useCreateListing, useMyListings, useDeleteListing } from '../../features/listing-crud';
import { useCategories } from '../../features/search-filter';
import { userApi } from '../../entities/user';
import { Input } from '../../shared/ui/Input/Input';
import { Select } from '../../shared/ui/Select/Select';
import { Button } from '../../shared/ui/Button/Button';
import { Modal } from '../../shared/ui/Modal/Modal';
import { formatDate } from '../../shared/lib/formatDate';
import { formatPrice } from '../../shared/lib/formatPrice';
import { fileToBase64 } from '../../shared/lib/fileToBase64';
import { ROUTES } from '../../shared/config/routes';
import { cn } from '../../shared/lib/cn';

function MyListingsTab() {
  const { data: categories = [] } = useCategories();
  const { data: myListings = [] } = useMyListings();
  const { mutate: create, isPending } = useCreateListing();
  const { mutate: deactivate } = useDeleteListing();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(undefined);

  async function onPhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoUrl(await fileToBase64(file));
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        className="flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-4"
        onSubmit={(e) => {
          e.preventDefault();
          create({ title, description, price: Number(price), categoryId, photoUrl });
          setTitle('');
          setDescription('');
          setPrice('');
          setPhotoUrl(undefined);
        }}
      >
        <h3 className="font-display text-sm font-bold">Новый объект</h3>
        <Input label="Название" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <Input label="Описание" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <Input label="Цена / ночь" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <Select
          label="Категория"
          value={categoryId}
          onChange={setCategoryId}
          options={categories.map((c) => ({ label: c.name, value: c.id }))}
        />
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-muted">Фото</label>
          <input
            type="file"
            accept="image/*"
            onChange={onPhotoChange}
            className="rounded-lg border border-border bg-surface px-3 py-2 text-xs text-white"
          />
          {photoUrl && <img src={photoUrl} alt="Предпросмотр" className="mt-2 h-24 w-full rounded-lg object-cover" />}
        </div>
        <Button type="submit" isLoading={isPending}>
          Создать объект
        </Button>
      </form>

      <div>
        <h3 className="mb-3 font-display text-sm font-bold">Мои объекты ({myListings.length})</h3>
        <div className="flex flex-col gap-2">
          {myListings.length === 0 && <p className="text-sm text-muted">У вас пока нет объектов.</p>}
          {myListings.map((l) => (
            <div
              key={l.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2 px-3 py-2"
            >
              <div className="flex items-center gap-3">
                {l.photoUrl && <img src={l.photoUrl} alt={l.title} className="h-10 w-10 rounded-md object-cover" />}
                <div>
                  <p className="text-sm font-semibold text-white">
                    {l.title} {!l.isActive && <span className="text-xs text-muted">(неактивен)</span>}
                  </p>
                  <p className="text-xs text-muted">{formatPrice(l.price)} / ночь</p>
                </div>
              </div>
              {l.isActive && (
                <Button variant="danger" size="sm" onClick={() => deactivate(l.id)}>
                  Удалить
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DeleteAccountSection() {
  const { user, logout } = useAuthStore();
  const resetFilters = useListingStore((s) => s.resetFilters);
  const setBookings = useBookingStore((s) => s.setBookings);
  const setNotifications = useNotificationStore((s) => s.setNotifications);
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const { mutate: deleteAccount, isPending } = useMutation({
    mutationFn: () => userApi.remove(user!.id),
    onSuccess: () => {
      logout();
      resetFilters();
      setBookings([]);
      setNotifications([]);
      navigate(ROUTES.HOME);
    },
  });

  // У администраторов самостоятельного удаления аккаунта нет.
  if (!user || user.role === 'ADMIN') return null;

  return (
    <div className="mt-8 flex items-center justify-between gap-3 rounded-xl border border-destructive/40 bg-destructive/5 p-4">
      <div>
        <p className="text-sm font-semibold text-white">Удалить аккаунт</p>
        <p className="text-xs text-muted">
          Аккаунт и все связанные данные (объекты, бронирования, отзывы, уведомления) будут удалены без возможности
          восстановления.
        </p>
      </div>
      <Button variant="danger" size="sm" onClick={() => setConfirmOpen(true)}>
        Удалить
      </Button>
      <Modal isOpen={confirmOpen} onClose={() => setConfirmOpen(false)} title="Удалить аккаунт?">
        <p className="mb-4 text-sm text-muted">
          Это действие необратимо: вместе с аккаунтом удалятся все ваши объекты, бронирования, отзывы и уведомления.
        </p>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" size="sm" onClick={() => setConfirmOpen(false)}>
            Отмена
          </Button>
          <Button variant="danger" size="sm" isLoading={isPending} onClick={() => deleteAccount()}>
            Да, удалить
          </Button>
        </div>
      </Modal>
    </div>
  );
}

type Tab = 'bookings' | 'listings';

export function ProfilePage() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<Tab>('bookings');
  const isOwner = user?.role === 'OWNER';

  const tabs: { key: Tab; label: string }[] = [
    { key: 'bookings', label: 'Бронирования' },
    ...(isOwner ? [{ key: 'listings' as Tab, label: 'Мои объекты' }] : []),
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-1 font-display text-2xl font-extrabold">Привет, {user?.name}</h1>
      {user?.createdAt && <p className="mb-6 text-sm text-muted">Вы зарегистрированы {formatDate(user.createdAt)}</p>}
      {tabs.length > 1 && (
        <div className="mb-4 flex gap-2 rounded-lg border border-border bg-surface-2 p-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn('flex-1 rounded-md py-2 text-sm font-semibold', tab === t.key ? 'bg-primary' : 'text-muted')}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      {tab === 'bookings' && <BookingList />}
      {tab === 'listings' && isOwner && <MyListingsTab />}
      <DeleteAccountSection />
    </div>
  );
}
