import { createEffect } from 'effector';

import {
  PERMISSION_DENIED_ERROR,
  UNSUPPORTED_ERROR,
} from '@/shared/lib/push-manager/errors';
import { getPushPermissionsStatus } from '@/shared/lib/push-manager/get-push-permissions-status';
import {
  showDefaultErrorNotificationFx,
  showErrorNotificationFx,
} from '@/shared/lib/show-notification/show-notification';

import { updateNotificationsStatusFx } from '@/entities/authorized-user';
import {
  createPushSubscriptionWithSyncFx,
  isPushSubscriptionActivedApi,
} from '@/entities/push-subscription';

export const subscribeToPushFx = createEffect<void, void>(async () => {
  try {
    const pushPermissionsStatus = await getPushPermissionsStatus();

    if (!pushPermissionsStatus.supported) {
      throw new Error(UNSUPPORTED_ERROR);
    }

    if (pushPermissionsStatus.permission === 'denied') {
      throw new Error(PERMISSION_DENIED_ERROR);
    }

    const savedPushSubscription = await createPushSubscriptionWithSyncFx();

    if (!savedPushSubscription.data) {
      throw new Error('Push subscription is not saved');
    }

    await updateNotificationsStatusFx({ isNotificationsEnabled: true });

    isPushSubscriptionActivedApi.init();
  } catch (error) {
    if (error instanceof Error) {
      switch (error.message) {
        case UNSUPPORTED_ERROR:
          showErrorNotificationFx({
            message: 'Данный браузер не поддерживает Push API',
          });

          break;
        case PERMISSION_DENIED_ERROR:
          showErrorNotificationFx({
            message: 'Вы не дали разрешение на использование Push API',
          });

          break;
        default:
          showDefaultErrorNotificationFx({ type: 'tryAgain' });
      }
    }

    throw error;
  }
});
