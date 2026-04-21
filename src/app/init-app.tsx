import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { attachReduxDevTools } from '@effector/redux-devtools-adapter';

import { startInitialVisitGuard } from './model';
import { createRouter } from './router';
import { App } from './ui/app';

export const initApp = () => {
  if (import.meta.env.DEV) {
    attachReduxDevTools({
      name: 'Messenger',
      trace: true,
    });
  }

  const {
    historyRouter,
    registerPageSideEffects,
    applyBrowserHistory,
    UI: { AppRouterProvider, RoutesView },
  } = createRouter();

  startInitialVisitGuard();
  registerPageSideEffects();
  applyBrowserHistory();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App
        routerProvider={
          <AppRouterProvider
            router={historyRouter}
            routesView={<RoutesView />}
          />
        }
      />
    </StrictMode>,
  );
};
