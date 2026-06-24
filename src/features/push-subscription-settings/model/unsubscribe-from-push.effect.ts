import { createEffect } from 'effector';

import { showDefaultErrorNotificationFx } from '@/shared/lib/show-notification/show-notification';

import { updateNotificationsStatusFx } from '@/entities/authorized-user';
import {
  deletePushSubscriptionWithSyncFx,
  isPushSubscriptionActivedApi,
} from '@/entities/push-subscription';

export const unsubscribeFromPushFx = createEffect<void, void>(async () => {
  try {
    await deletePushSubscriptionWithSyncFx();
    await updateNotificationsStatusFx({ isNotificationsEnabled: false });

    isPushSubscriptionActivedApi.reset();
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'tryAgain' });

    throw error;
  }
});
