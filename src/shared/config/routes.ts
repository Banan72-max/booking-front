export const ROUTES = {
  HOME: '/',
  LISTING: (id: string = ':id') => `/listing/${id}`,
  PROFILE: '/profile',
  AUTH: '/auth',
  ADMIN: '/admin',
};
