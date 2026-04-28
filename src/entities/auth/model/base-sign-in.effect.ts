import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api';
import { saveCredentialsInLocalStorage } from '@/shared/lib/auth';
import type { Credentials } from '@/shared/lib/auth/credentials';

import { authorizedUserApi } from './authorized-user.store';

type Controller = OperationInfo<'AuthController_signIn_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

export const baseSignInFx = createEffect<
  {
    requestBody: Body;
  },
  {
    user: Response;
    credentials: Credentials;
  }
>(async ({ requestBody }) => {
  const user = await unauthorizedHttpClient
    .post<Response>('/api/v1/auth/sign-in' satisfies Path, {
      json: requestBody,
    })
    .json();

  saveCredentialsInLocalStorage(requestBody);

  return {
    user,
    credentials: requestBody,
  };
});

sample({
  clock: baseSignInFx.doneData,
  fn: (clock) => clock.user,
  target: authorizedUserApi.userAuthorized,
});
