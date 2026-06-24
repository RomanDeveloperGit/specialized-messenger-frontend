import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';
import { deletePushSubscription } from '@/shared/lib/push-manager/delete-push-subscription';

type Controller =
  OperationInfo<'PushSubscriptionController_markAsUnsubscribed_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

type DeletePushSubscriptionWithSyncFxResult = {
  data: Response | null;
};

export const deletePushSubscriptionWithSyncFx = createEffect<
  void,
  DeletePushSubscriptionWithSyncFxResult
>(async () => {
  const deletedPushSubscription = (await deletePushSubscription())?.toJSON() as
    | Body
    | undefined;

  if (!deletedPushSubscription) {
    return { data: null };
  }

  const markedPushSubscriptionAsUnsubscribed = await authorizedHttpClient
    .patch<Response>(
      '/api/v1/push-subscriptions/mark-as-unsubscribed' satisfies Path,
      {
        json: deletedPushSubscription satisfies Body,
      },
    )
    .json();

  return {
    data: markedPushSubscriptionAsUnsubscribed,
  };
});
