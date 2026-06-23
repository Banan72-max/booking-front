import type { User } from '../model/types';

export function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-border bg-surface-2 p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary-foreground font-display font-bold">
        {user.name.slice(0, 1).toUpperCase()}
      </div>
      <div>
        <p className="text-sm font-semibold">
          {user.name} {user.isBanned && <span className="text-destructive">(забанен)</span>}
        </p>
        <p className="text-xs text-muted">{user.email} · {user.role}</p>
      </div>
    </div>
  );
}
