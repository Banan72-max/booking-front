import { useState } from 'react';
import { useAdminUsers, useAdminCategories, useDeleteUser, useDeleteCategory, useCreateCategory } from '../../features/admin-panel';
import { UserCard } from '../../entities/user';
import { CategoryBadge } from '../../entities/category';
import { Button } from '../../shared/ui/Button/Button';
import { Input } from '../../shared/ui/Input/Input';

export function AdminPage() {
  const { data: usersResult } = useAdminUsers();
  const { data: categories = [] } = useAdminCategories();
  const { mutate: deleteUser } = useDeleteUser();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { mutate: createCategory } = useCreateCategory();
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
              <Button variant="danger" size="sm" onClick={() => deleteUser(u.id)}>
                Удалить
              </Button>
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
    </div>
  );
}
