import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';
import { createPushSubscription } from '@/shared/lib/push-manager/create-push-subscription';
import { getPushSubscription } from '@/shared/lib/push-manager/get-push-subscription';

import { deletePushSubscriptionWithSyncFx } from './delete-push-subscription-with-sync.effect';

type GetVapidPublicKeyController =
  OperationInfo<'PushSubscriptionController_getVapidPublicKey_v1'>;
type GetVapidPublicKeyPath = GetVapidPublicKeyController['path'];
type GetVapidPublicKeyResponse = GetVapidPublicKeyController['response'];

type CreatePushSubscriptionController =
  OperationInfo<'PushSubscriptionController_create_v1'>;
type CreatePushSubscriptionPath = CreatePushSubscriptionController['path'];
type CreatePushSubscriptionBody = CreatePushSubscriptionController['body'];
type CreatePushSubscriptionResponse =
  CreatePushSubscriptionController['response'];

type CreatePushSubscriptionWithSyncFxResult = {
  data: CreatePushSubscriptionResponse | null;
};

export const createPushSubscriptionWithSyncFx = createEffect<
  void,
  CreatePushSubscriptionWithSyncFxResult
>(async () => {
  const vapidPublicKey = await authorizedHttpClient
    .get<GetVapidPublicKeyResponse>(
      '/api/v1/push-subscriptions/vapid-public-key' satisfies GetVapidPublicKeyPath,
    )
    .text();

  const currentSubscription = await getPushSubscription();
  if (currentSubscription) {
    await deletePushSubscriptionWithSyncFx();
  }

  const newSubscription = (
    await createPushSubscription(vapidPublicKey)
  )?.toJSON() as CreatePushSubscriptionBody | undefined;

  if (!newSubscription) {
    return { data: null };
  }

  const savedPushSubscription = await authorizedHttpClient
    .post<CreatePushSubscriptionResponse>(
      '/api/v1/push-subscriptions' satisfies CreatePushSubscriptionPath,
      {
        json: newSubscription satisfies CreatePushSubscriptionBody,
      },
    )
    .json();

  return { data: savedPushSubscription };
});
