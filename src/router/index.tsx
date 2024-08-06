import { createBrowserRouter } from 'react-router-dom';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

// MISC


export const router = createBrowserRouter([
  ...publicRoutes,
  ...protectedRoutes,
  { path: '*'},
]);
