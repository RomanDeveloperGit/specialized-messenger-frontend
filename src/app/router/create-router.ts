import { createHistoryRouter } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { createBrowserHistory } from 'history';

import { isReactPageWithSideEffect } from '@/shared/lib/react-page-with-side-effect';

import { allRouteFullConfigs } from './config';
import { AppRouterProvider } from './ui/app-router-provider';
import { PageNotFound } from './ui/page-not-found';

export const createRouter = () => {
  const historyRouter = createHistoryRouter({ routes: allRouteFullConfigs });

  const registerPageSideEffects = () => {
    allRouteFullConfigs.forEach(({ view }) => {
      if (isReactPageWithSideEffect(view)) {
        view.registerPageSideEffect();
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
    registerPageSideEffects,
    applyBrowserHistory,
    UI: {
      AppRouterProvider,
      RoutesView,
    },
  };
};
