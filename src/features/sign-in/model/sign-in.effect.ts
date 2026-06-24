import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api/http';
import { saveCredentialsInLocalStorage } from '@/shared/lib/auth';

import { authorizedUserApi } from '@/entities/authorized-user';
import { actualizePushSubscriptionWithSyncFx } from '@/entities/push-subscription';

type Controller = OperationInfo<'AuthController_signIn_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

type SignInFxParams = {
  body: Body;
};

export const signInFx = createEffect<SignInFxParams, void>(async ({ body }) => {
  const user = await unauthorizedHttpClient
    .post<Response>('/api/v1/auth/sign-in' satisfies Path, {
      json: body satisfies Body,
    })
    .json();

  saveCredentialsInLocalStorage(body);

  authorizedUserApi.set(user);

  await actualizePushSubscriptionWithSyncFx({
    hasUserNotificationEnabled: user.isNotificationsEnabled,
  }).catch();
});
