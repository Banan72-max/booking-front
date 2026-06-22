import { useState, FormEvent } from 'react';
import { useLogin } from './useLogin';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useLogin();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutate({ email, password });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input label="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <Button type="submit" isLoading={isPending}>
        Войти
      </Button>
    </form>
  );
}
