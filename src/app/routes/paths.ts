export const AppPaths = {
  home: '/',
  login: '/login',
  admin: '/admin',
  mapa: '/mapa',
} as const;

export type AppPath = (typeof AppPaths)[keyof typeof AppPaths];