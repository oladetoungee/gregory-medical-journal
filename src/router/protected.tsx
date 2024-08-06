import { RouteObject } from 'react-router-dom';
import { __PRODUCT__ } from '@/lib/hooks/use-product';
import { companyRoutes } from '@/features/company/router';
import { lawyerRoutes } from '@/features/lawyer/router';

export const protectedRoutes: RouteObject[] = [
  ...(__PRODUCT__ === 'vega-company' ? companyRoutes : lawyerRoutes)
];
