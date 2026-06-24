import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';

type Controller = OperationInfo<'UserController_updateNotifictionsStatus_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

type UpdateNotificationsStatusFxParams = {
  isNotificationsEnabled: boolean;
};

export const updateNotificationsStatusFx = createEffect<
  UpdateNotificationsStatusFxParams,
  void
>(async ({ isNotificationsEnabled }) => {
  await authorizedHttpClient.patch<Response>(
    '/api/v1/users/notifications' satisfies Path,
    {
      json: { isNotificationsEnabled } satisfies Body,
    },
  );
});
