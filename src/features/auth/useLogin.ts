import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { axiosInstance } from '../../shared/api/axiosInstance';
import { useAuthStore } from '../../app/store/authStore';
import type { User } from '../../entities/user/model/types';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export function useLogin() {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: (dto: { email: string; password: string }) =>
      axiosInstance.post<AuthResponse>('/api/auth/login', dto).then((r) => r.data),
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      toast.success('Вход выполнен');
    },
    onError: () => toast.error('Неверный email или пароль'),
  });
}

export function useRegister() {
  const login = useAuthStore((s) => s.login);
  return useMutation({
    mutationFn: (dto: { email: string; password: string; name: string }) =>
      axiosInstance.post<AuthResponse>('/api/auth/register', dto).then((r) => r.data),
    onSuccess: (data) => {
      login(data.user, data.accessToken);
      toast.success('Регистрация успешна');
    },
    onError: () => toast.error('Не удалось зарегистрироваться'),
  });
}
