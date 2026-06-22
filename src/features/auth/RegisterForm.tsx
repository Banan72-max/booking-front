import { useState, FormEvent } from 'react';
import { useRegister } from './useLogin';
import { Input } from '../../shared/ui/Input/Input';
import { Button } from '../../shared/ui/Button/Button';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending } = useRegister();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutate({ name, email, password });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      <Input label="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
      <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        minLength={6}
        required
      />
      <Button type="submit" isLoading={isPending}>
        Зарегистрироваться
      </Button>
    </form>
  );
}
