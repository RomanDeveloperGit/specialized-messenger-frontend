import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api';
import { saveCredentialsInLocalStorage } from '@/shared/lib/auth';
import type { Credentials } from '@/shared/lib/auth/credentials';

import { authorizedUserApi } from './authorized-user.store';

type Controller = OperationInfo<'AuthController_signIn_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

type BaseSignInParams = {
  body: Body;
};

type BaseSignInResult = {
  user: Response;
  credentials: Credentials;
};

export const baseSignInEffectsFactory = () => {
  const baseSignInFx = createEffect<BaseSignInParams, BaseSignInResult>(
    async ({ body }) => {
      const user = await unauthorizedHttpClient
        .post<Response>('/api/v1/auth/sign-in' satisfies Path, {
          json: body,
        })
        .json();

      return {
        user,
        credentials: body,
      };
    },
  );

  const baseSignInDoneFx = createEffect<BaseSignInResult, void>(
    async ({ user, credentials }) => {
      saveCredentialsInLocalStorage(credentials);

      authorizedUserApi.userAuthorized(user);
    },
  );

  return {
    baseSignInFx,
    baseSignInDoneFx,
  };
};
