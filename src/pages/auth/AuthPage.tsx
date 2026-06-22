import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm, RegisterForm } from '../../features/auth';
import { useAuthStore } from '../../app/store/authStore';
import { ROUTES } from '../../shared/config/routes';
import { cn } from '../../shared/lib/cn';

export function AuthPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) return <Navigate to={ROUTES.HOME} replace />;

  return (
    <div className="mx-auto max-w-sm px-4 py-12">
      <div className="mb-6 flex gap-2 rounded-lg border border-border bg-surface-2 p-1">
        <button
          onClick={() => setTab('login')}
          className={cn('flex-1 rounded-md py-2 text-sm font-semibold', tab === 'login' ? 'bg-primary' : 'text-muted')}
        >
          Вход
        </button>
        <button
          onClick={() => setTab('register')}
          className={cn('flex-1 rounded-md py-2 text-sm font-semibold', tab === 'register' ? 'bg-primary' : 'text-muted')}
        >
          Регистрация
        </button>
      </div>
      {tab === 'login' ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
