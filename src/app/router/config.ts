import {
  ALL_ROUTE_CONFIGS,
  invitationRouteConfig,
  messengerRouteConfig,
  signInRouteConfig,
} from '@/shared/router';

import { InvitationPage } from '@/pages/invitation';
import { MessengerPage } from '@/pages/messenger';
import { SignInPage } from '@/pages/sign-in';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const routeView = new Map([
  [signInRouteConfig.route, SignInPage],
  [invitationRouteConfig.route, InvitationPage],
  [messengerRouteConfig.route, MessengerPage],
]);

export const allRouteFullConfigs = ALL_ROUTE_CONFIGS.map((routeConfig) => ({
  ...routeConfig,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  view: routeView.get(routeConfig.route)!,
}));
