import { createEffect } from 'effector';

import { disconnectSocket } from '@/shared/api/socket';
import { clearCredentialsInLocalStorage } from '@/shared/lib/auth';
import { showSuccessNotificationFx } from '@/shared/lib/show-notification/show-notification';
import { DEFAULT_PUBLIC_ROUTE_CONFIG, getRouteByConfig } from '@/shared/router';

import { activeConversationApi } from '@/entities/active-conversation';
import { authorizedUserApi } from '@/entities/authorized-user';
import { conversationsApi } from '@/entities/conversations';
import { deletePushSubscriptionWithSyncFx } from '@/entities/push-subscription';
import { usersApi } from '@/entities/users';

export const logOutFx = createEffect<void, void>(async () => {
  await deletePushSubscriptionWithSyncFx();

  clearCredentialsInLocalStorage();

  getRouteByConfig(DEFAULT_PUBLIC_ROUTE_CONFIG).open();

  disconnectSocket();

  authorizedUserApi.reset();
  activeConversationApi.reset();
  conversationsApi.reset();
  usersApi.reset();

  showSuccessNotificationFx({ message: 'Вы успешно вышли из аккаунта' });
});
