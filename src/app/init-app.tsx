import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { attachReduxDevTools } from '@effector/redux-devtools-adapter';

import { LoadingOverlay } from '@mantine/core';

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

  const root = createRoot(document.getElementById('root')!);

  root.render(
    <StrictMode>
      <App>
        <LoadingOverlay visible={true} />
      </App>
    </StrictMode>,
  );

  startInitialVisitGuard().then(() => {
    const {
      historyRouter,
      registerPageSideEffects,
      applyBrowserHistory,
      UI: { AppRouterProvider, RoutesView },
    } = createRouter();

    registerPageSideEffects();
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
  });
};
