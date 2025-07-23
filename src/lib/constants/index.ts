
export const APP_CONFIG = {
  name: 'React Supabase Boilerplate',
  description: 'A production-ready boilerplate with atomic design system',
  version: '1.0.0',
  author: 'Your Name',
  repository: 'https://github.com/yourusername/react-supabase-boilerplate',
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    profile: '/auth/profile',
  },
  users: {
    list: '/users',
    create: '/users',
    update: '/users/:id',
    delete: '/users/:id',
  },
} as const;

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  profile: '/profile',
  settings: '/settings',
} as const;

export const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;
