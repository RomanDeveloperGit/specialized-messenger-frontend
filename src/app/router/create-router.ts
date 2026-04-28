import { createHistoryRouter } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { createBrowserHistory } from 'history';

import { isReactPageWithSideEffects } from '@/shared/lib/react-page-with-side-effect';

import { allRouteFullConfigs } from './config';
import { AppRouterProvider } from './ui/app-router-provider';
import { PageNotFound } from './ui/page-not-found';

export const createRouter = () => {
  const historyRouter = createHistoryRouter({ routes: allRouteFullConfigs });

  const registerPagesSideEffects = () => {
    allRouteFullConfigs.forEach(({ view }) => {
      if (isReactPageWithSideEffects(view)) {
        view.registerPageSideEffects();
      }
    });
  };

  const applyBrowserHistory = () => {
    historyRouter.setHistory(createBrowserHistory());
  };

  const RoutesView = createRoutesView({
    routes: allRouteFullConfigs,
    otherwise: PageNotFound,
  });

  return {
    historyRouter,
    registerPagesSideEffects,
    applyBrowserHistory,
    UI: {
      AppRouterProvider,
      RoutesView,
    },
  };
};
