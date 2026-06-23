import { useState, FormEvent } from 'react';
import { useAuthStore } from '../../app/store/authStore';
import { useSupportThread, useSendSupportMessage } from '../../features/support';
import { Button } from '../../shared/ui/Button/Button';
import { Spinner } from '../../shared/ui/Spinner/Spinner';
import { formatDate } from '../../shared/lib/formatDate';
import { cn } from '../../shared/lib/cn';

const ROLE_LABEL: Record<string, string> = { USER: 'Пользователь', OWNER: 'Владелец', ADMIN: 'Админ' };

/**
 * Переписка с поддержкой. Без threadUserId — собственный тред (USER/OWNER).
 * С threadUserId — админ просматривает и отвечает в треде конкретного пользователя.
 */
export function SupportChat({ threadUserId }: { threadUserId?: string }) {
  const { user } = useAuthStore();
  const { data: messages = [], isLoading } = useSupportThread(threadUserId);
  const { mutate: send, isPending } = useSendSupportMessage(threadUserId);
  const [text, setText] = useState('');

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    send(text.trim());
    setText('');
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex max-h-80 flex-col gap-2 overflow-y-auto rounded-lg border border-border bg-surface p-3">
        {messages.length === 0 && <p className="text-sm text-muted">Сообщений пока нет — напишите, чем можем помочь.</p>}
        {messages.map((m) => {
          const isMine = m.senderId === user?.id;
          return (
            <div
              key={m.id}
              className={cn(
                'max-w-[80%] rounded-lg px-3 py-2 text-sm',
                isMine ? 'self-end bg-primary text-white' : 'self-start bg-surface-2 text-white',
              )}
            >
              <p className="mb-0.5 text-[10px] uppercase tracking-wide text-white/60">
                {ROLE_LABEL[m.senderRole] ?? m.senderRole}
              </p>
              <p>{m.message}</p>
              <p className="mt-1 text-[10px] text-white/50">{formatDate(m.createdAt)}</p>
            </div>
          );
        })}
      </div>
      <form onSubmit={onSubmit} className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Опишите проблему..."
          className="flex-1 rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-white outline-none focus:ring-2 focus:ring-primary"
          rows={2}
        />
        <Button type="submit" size="sm" isLoading={isPending} disabled={!text.trim()}>
          Отправить
        </Button>
      </form>
    </div>
  );
}
