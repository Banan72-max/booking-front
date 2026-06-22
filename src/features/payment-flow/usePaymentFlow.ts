import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { paymentApi } from '../../entities/payment';

export function useCreatePayment() {
  return useMutation({
    mutationFn: paymentApi.create,
    onSuccess: () => toast.success('Платёж создан, ожидает подтверждения'),
    onError: () => toast.error('Не удалось создать платёж'),
  });
}
