import { createHistoryRouter } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { createBrowserHistory } from 'history';

import {
  ALL_ROUTES,
  invitationRoute,
  messengerRoute,
  signInRoute,
} from '@/shared/router';

import { SignInPage } from '@/pages/sign-in';

import { AppRouterProvider } from './ui/app-router-provider';
import { PageNotFound } from './ui/page-not-found';

export const createRouter = () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const routeView = new Map([
    [signInRoute.route, SignInPage],
    [invitationRoute.route, () => 'empty'],
    [messengerRoute.route, () => 'empty'],
  ]);

  const routeFullConfigs = ALL_ROUTES.map((routeConfig) => ({
    ...routeConfig,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    view: routeView.get(routeConfig.route)!,
  }));

  const historyRouter = createHistoryRouter({ routes: routeFullConfigs });
  historyRouter.setHistory(createBrowserHistory());

  const RoutesView = createRoutesView({
    routes: routeFullConfigs,
    otherwise: PageNotFound,
  });

  return {
    routeFullConfigs,
    historyRouter,
    UI: {
      AppRouterProvider,
      RoutesView,
    },
  };
};
