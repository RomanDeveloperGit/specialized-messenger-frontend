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

export type SignInFxParams = {
  body: Body;
};

export type SignInFxResult = {
  user: Response;
  credentials: Credentials;
};

export type SignInSuccessFxParams = SignInFxResult;

export type SignInSuccessFxResult = void;

export const signInEffectsFactory = () => {
  const signInFx = createEffect<SignInFxParams, SignInFxResult>(
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

  const signInSuccessFx = createEffect<
    SignInSuccessFxParams,
    SignInSuccessFxResult
  >(async ({ user, credentials }) => {
    saveCredentialsInLocalStorage(credentials);

    authorizedUserApi.set(user);
  });

  return {
    signInFx,
    signInSuccessFx,
  };
};
