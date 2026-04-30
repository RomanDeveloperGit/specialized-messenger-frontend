import { sample } from 'effector';
import { chainRoute } from 'atomic-router';

import { messengerRouteConfig } from '@/shared/router';

import { $socket } from '../socket/socket.store';
import { closeMessengerPageFx } from './close-messenger-page.effect';
import { initMessengerPageFx } from './init-messenger-page.effect';

export const registerPageSideEffects = () => {
  chainRoute({
    route: messengerRouteConfig.route,
    beforeOpen: initMessengerPageFx,
  });

  sample({
    clock: messengerRouteConfig.route.closed,
    source: $socket,
    fn: (source) => ({ socket: source }),
    target: closeMessengerPageFx,
  });
};
