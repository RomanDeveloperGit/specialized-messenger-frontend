import { createRoutesView, RouterProvider } from 'atomic-router-react';
import { type FC } from 'react';

import { PageNotFound } from './page-not-found';
import { router, routes } from './router';

const RoutesView = createRoutesView({ routes, otherwise: PageNotFound });

export const AppRouter: FC = () => {
  return (
    <RouterProvider router={router}>
      <RoutesView />
    </RouterProvider>
  );
};
