import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { attachReduxDevTools } from '@effector/redux-devtools-adapter';

import { registerFirstVisitGuard } from './model';
import { createRouter } from './router';
import { App } from './ui/app';

export const initApp = async () => {
  if (import.meta.env.DEV) {
    attachReduxDevTools({
      name: 'Messenger',
      trace: true,
    });
  }

  const {
    historyRouter,
    UI: { AppRouterProvider, RoutesView },
  } = createRouter();
  registerFirstVisitGuard();

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
