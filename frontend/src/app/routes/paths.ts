export const AppPaths = {
  home: '/',
  login: '/login',
  admin: '/admin',
  adminMateriais: '/admin/materiais',
  mapa: '/mapa',
} as const;

export type AppPath = (typeof AppPaths)[keyof typeof AppPaths];