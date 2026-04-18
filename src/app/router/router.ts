import { createHistoryRouter } from 'atomic-router';
import { createBrowserHistory } from 'history';

import { ALL_ROUTES, invitationRoute, messengerRoute, signInRoute } from '@/shared/router';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const routeView = new Map([
  [signInRoute.route, () => 'empty'],
  [invitationRoute.route, () => 'empty'],
  [messengerRoute.route, () => 'empty'],
]);

export const routes = ALL_ROUTES.map((routeConfig) => ({
  ...routeConfig,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  view: routeView.get(routeConfig.route)!,
}));

export const router = createHistoryRouter({ routes });

router.setHistory(createBrowserHistory());
