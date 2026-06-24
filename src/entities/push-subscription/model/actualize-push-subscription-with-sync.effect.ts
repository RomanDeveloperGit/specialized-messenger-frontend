import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';
import { getPushSubscription } from '@/shared/lib/push-manager/get-push-subscription';

import { createPushSubscriptionWithSyncFx } from './create-push-subscription-with-sync.effect';
import { deletePushSubscriptionWithSyncFx } from './delete-push-subscription-with-sync.effect';
import { isPushSubscriptionActivedApi } from './is-push-subscription-actived';

type Controller = OperationInfo<'PushSubscriptionController_getByData_v1'>;
type Path = Controller['path'];
type Query = Controller['search'];
type Response = Controller['response'];

type ActualizePushSubscriptionWithSyncFxParams = {
  hasUserNotificationEnabled: boolean;
};

export const actualizePushSubscriptionWithSyncFx = createEffect<
  ActualizePushSubscriptionWithSyncFxParams,
  void
>(async ({ hasUserNotificationEnabled }) => {
  const currentSubscription = await getPushSubscription();
  console.log({ currentSubscription });

  if (!hasUserNotificationEnabled && !currentSubscription) {
    isPushSubscriptionActivedApi.reset();

    return;
  }

  if (!hasUserNotificationEnabled && currentSubscription) {
    await deletePushSubscriptionWithSyncFx();

    isPushSubscriptionActivedApi.reset();

    return;
  }

  // далее кейсы с учетом, что hasUserNotificationEnabled = true

  if (!currentSubscription) {
    const newSubscription = await createPushSubscriptionWithSyncFx();

    if (newSubscription.data) {
      isPushSubscriptionActivedApi.init();
    }

    return;
  }

  try {
    const currentSubscriptionJSON = currentSubscription.toJSON();
    const foundSavedSubscription = await authorizedHttpClient
      .get<Response>('/api/v1/push-subscriptions' satisfies Path, {
        searchParams: {
          auth: currentSubscriptionJSON.keys?.auth || '',
          p256dh: currentSubscriptionJSON.keys?.p256dh || '',
          endpoint: currentSubscriptionJSON.endpoint || '',
          expirationTime: String(currentSubscriptionJSON.expirationTime || ''),
        } satisfies Query,
      })
      .json();

    if (foundSavedSubscription) {
      isPushSubscriptionActivedApi.init();

      return;
    }

    const newSubscription = await createPushSubscriptionWithSyncFx();

    if (newSubscription.data) {
      isPushSubscriptionActivedApi.init();
    }
  } catch (error) {
    isPushSubscriptionActivedApi.reset();

    throw error;
  }
});
