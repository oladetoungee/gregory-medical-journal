import { RouteObject } from 'react-router-dom';
import { authRoutes } from '@/features/auth/router';

export const publicRoutes: RouteObject[] = [
  ...authRoutes
];
