export interface SupportMessage {
  id: string;
  userId: string;
  senderId: string;
  senderRole: 'USER' | 'OWNER' | 'ADMIN';
  message: string;
  createdAt: string;
  /** Только в /api/support/threads (для админа). */
  user?: { id: string; name: string; email: string; role: string };
}
