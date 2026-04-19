import { type FC, type ReactNode } from 'react';

import type { HistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';

export const AppRouterProvider: FC<{
  router: HistoryRouter;
  routesView: ReactNode;
}> = ({ router, routesView }) => {
  return <RouterProvider router={router}>{routesView}</RouterProvider>;
};
