import { sample } from 'effector';
import { chainRoute } from 'atomic-router';

import { messengerRouteConfig } from '@/shared/router';

import { closeMessengerPage } from './close-messenger-page.effect';
import { initMessengerPageFx } from './init-messenger-page.effect';

export const registerPageSideEffects = () => {
  chainRoute({
    route: messengerRouteConfig.route,
    beforeOpen: initMessengerPageFx,
  });

  sample({
    clock: messengerRouteConfig.route.closed,
    target: closeMessengerPage,
  });
};
