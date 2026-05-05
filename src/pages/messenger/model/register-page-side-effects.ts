import { sample } from 'effector';

import { messengerRouteConfig } from '@/shared/router';

import { closeMessengerPage } from './close-messenger-page.effect';
import { initMessengerPage } from './init-messenger-page.effect';

export const registerPageSideEffects = () => {
  sample({
    clock: messengerRouteConfig.route.opened,
    target: initMessengerPage,
  });

  sample({
    clock: messengerRouteConfig.route.closed,
    target: closeMessengerPage,
  });
};
