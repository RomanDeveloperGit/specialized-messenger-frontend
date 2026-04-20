import { createHistoryRouter } from 'atomic-router';
import { createRoutesView } from 'atomic-router-react';

import { createBrowserHistory } from 'history';

import { isReactPageWithSideEffect } from '@/shared/lib/react-page-with-side-effect';

import { allRouteFullConfigs } from './config';
import { AppRouterProvider } from './ui/app-router-provider';
import { PageNotFound } from './ui/page-not-found';

export const createRouter = () => {
  // Регистрируем сайд эффекты страниц перед инициализацией роутера
  allRouteFullConfigs.forEach(({ view }) => {
    if (isReactPageWithSideEffect(view)) {
      view.registerPageSideEffect();
    }
  });

  const historyRouter = createHistoryRouter({ routes: allRouteFullConfigs });
  historyRouter.setHistory(createBrowserHistory());

  const RoutesView = createRoutesView({
    routes: allRouteFullConfigs,
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
