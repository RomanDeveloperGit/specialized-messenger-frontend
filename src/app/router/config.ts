import {
  ALL_ROUTES,
  invitationRoute,
  messengerRoute,
  signInRoute,
} from '@/shared/router';

import { InvitationPage } from '@/pages/invitation';
import { SignInPage } from '@/pages/sign-in';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ROUTE_VIEW = new Map([
  [signInRoute.route, SignInPage],
  [invitationRoute.route, InvitationPage],
  [messengerRoute.route, () => 'empty'],
]);

export const routeFullConfigs = ALL_ROUTES.map((routeConfig) => ({
  ...routeConfig,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  view: ROUTE_VIEW.get(routeConfig.route)!,
}));
