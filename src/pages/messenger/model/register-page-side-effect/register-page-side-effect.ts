import { sample } from 'effector';
import { chainRoute } from 'atomic-router';

import { messengerRouteConfig } from '@/shared/router';

import { setIsInitMessengerPending } from '../is-init-messenger-pending.store';
import { connected, connectSocketFx } from './connect-socket.effect';
import { getConversationsFx } from './get-conversations.effect';

export const registerPageSideEffect = () => {
  // Процесс:
  // 1. Лоадер...
  // 2. Подключаемся к сокетам и подписываемся на события
  // 3. И только потом запрашиваем все чаты

  sample({
    clock: [
      messengerRouteConfig.route.opened,
      messengerRouteConfig.route.updated,
    ],
    fn: () => true,
    target: setIsInitMessengerPending,
  });

  const wsConnectedRoute = chainRoute({
    route: messengerRouteConfig.route,
    beforeOpen: connectSocketFx,
    openOn: connected,
  });

  chainRoute({
    route: wsConnectedRoute,
    beforeOpen: getConversationsFx,
  });
};
