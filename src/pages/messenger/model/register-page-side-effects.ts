import { sample } from 'effector';

import { messengerRouteConfig } from '@/shared/router';

import { initMessengerPage } from './init-messenger-page.effect';

export const registerPageSideEffects = () => {
  sample({
    clock: messengerRouteConfig.route.opened,
    target: initMessengerPage,
  });
};
