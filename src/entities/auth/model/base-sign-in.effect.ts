import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { api } from '@/shared/api';
import { saveCredentialsInLocalStorage } from '@/shared/lib/auth';
import { showErrorNotificationFx } from '@/shared/lib/notifications';

import { setAuthorizedUser } from '@/entities/auth';

type Controller = OperationInfo<'AuthController_signIn_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

export const baseSignInFx = createEffect<
  {
    requestBody: Body;
  },
  void
>(async ({ requestBody }) => {
  try {
    const user = await api
      .post<Response>('/api/v1/auth/sign-in' satisfies Path, {
        json: requestBody,
      })
      .json();

    saveCredentialsInLocalStorage({
      login: requestBody.login,
      password: requestBody.password,
    });
    setAuthorizedUser(user);
  } catch (error) {
    showErrorNotificationFx({ message: 'Authorization error' });

    throw error;
  }
});
