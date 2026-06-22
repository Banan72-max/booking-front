import { useState } from 'react';
import { useAuthStore } from '../../app/store/authStore';
import { BookingList } from '../../widgets/booking-list/BookingList';
import { useCreateListing } from '../../features/listing-crud';
import { useCategories } from '../../features/search-filter';
import { Input } from '../../shared/ui/Input/Input';
import { Select } from '../../shared/ui/Select/Select';
import { Button } from '../../shared/ui/Button/Button';
import { cn } from '../../shared/lib/cn';

function MyListingsTab() {
  const { data: categories = [] } = useCategories();
  const { mutate: create, isPending } = useCreateListing();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');

  return (
    <form
      className="flex flex-col gap-3 rounded-xl border border-border bg-surface-2 p-4"
      onSubmit={(e) => {
        e.preventDefault();
        create({ title, description, price: Number(price), categoryId });
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
      <Button type="submit" isLoading={isPending}>
        Создать объект
      </Button>
    </form>
  );
}

export function ProfilePage() {
  const { user } = useAuthStore();
  const [tab, setTab] = useState<'bookings' | 'listings'>('bookings');
  const isOwner = user?.role === 'OWNER' || user?.role === 'ADMIN';

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-6 font-display text-2xl font-extrabold">Привет, {user?.name}</h1>
      {isOwner && (
        <div className="mb-4 flex gap-2 rounded-lg border border-border bg-surface-2 p-1">
          <button
            onClick={() => setTab('bookings')}
            className={cn('flex-1 rounded-md py-2 text-sm font-semibold', tab === 'bookings' ? 'bg-primary' : 'text-muted')}
          >
            Бронирования
          </button>
          <button
            onClick={() => setTab('listings')}
            className={cn('flex-1 rounded-md py-2 text-sm font-semibold', tab === 'listings' ? 'bg-primary' : 'text-muted')}
          >
            Мои объекты
          </button>
        </div>
      )}
      {tab === 'bookings' ? <BookingList /> : <MyListingsTab />}
    </div>
  );
}
