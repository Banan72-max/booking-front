export type Role = 'USER' | 'ADMIN' | 'OWNER';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
  role: Role;
  isBanned?: boolean;
  createdAt: string;
}
