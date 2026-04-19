import { createHistoryRouter } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { createBrowserHistory } from 'history';

import { routeFullConfigs } from './config';
import { AppRouterProvider } from './ui/app-router-provider';
import { PageNotFound } from './ui/page-not-found';

export const createRouter = () => {
  const historyRouter = createHistoryRouter({ routes: routeFullConfigs });
  historyRouter.setHistory(createBrowserHistory());

  const RoutesView = createRoutesView({
    routes: routeFullConfigs,
    otherwise: PageNotFound,
  });

  return {
    historyRouter,
    UI: {
      AppRouterProvider,
      RoutesView,
    },
  };
};
