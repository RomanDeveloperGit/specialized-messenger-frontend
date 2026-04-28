import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { attachReduxDevTools } from '@effector/redux-devtools-adapter';

import { LoadingOverlay } from '@mantine/core';

import { createRouter } from './router';
import { startInitialVisitGuard } from './start-initial-visit-guard';
import { App } from './ui';

export const initApp = () => {
  if (import.meta.env.DEV) {
    attachReduxDevTools({
      name: 'Messenger',
      trace: true,
    });
  }

  const root = createRoot(document.getElementById('root')!);

  root.render(
    <StrictMode>
      <App>
        <LoadingOverlay visible={true} />
      </App>
    </StrictMode>,
  );

  startInitialVisitGuard()
    .then(() => {
      const {
        historyRouter,
        registerPagesSideEffects,
        applyBrowserHistory,
        UI: { AppRouterProvider, RoutesView },
      } = createRouter();

      registerPagesSideEffects();
      applyBrowserHistory();

      root.render(
        <StrictMode>
          <App>
            <AppRouterProvider
              router={historyRouter}
              routesView={<RoutesView />}
            />
          </App>
        </StrictMode>,
      );
    })
    .catch((error) => {
      console.error('Unexpected error of init app', error);
    });
};
