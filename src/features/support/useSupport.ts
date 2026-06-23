import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supportApi } from '../../entities/support';

export function useSupportThread(userId?: string) {
  return useQuery({
    queryKey: ['support', 'thread', userId ?? 'me'],
    queryFn: () => supportApi.getThread(userId),
  });
}

export function useSupportThreads() {
  return useQuery({
    queryKey: ['support', 'threads'],
    queryFn: supportApi.getThreads,
  });
}

export function useSendSupportMessage(userId?: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (message: string) => supportApi.send({ message, userId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['support'] });
    },
  });
}
