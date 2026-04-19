import { createEffect, createEvent, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { api } from '@/shared/api';
import { saveCredentialsInLocalStorage } from '@/shared/lib/auth';
import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';
import { DEFAULT_PROTECTED_ROUTE } from '@/shared/router';

import { setAuthorizedUser } from '@/entities/auth';

import type { SignInSchema } from './schema';

type Controller = OperationInfo<'AuthController_signIn_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

export const signIn = createEvent<SignInSchema & { isSilentMode?: boolean }>();
export const signInFx = createEffect<
  {
    requestBody: Body;
    isSilentMode: boolean;
  },
  void
>(async ({ requestBody, isSilentMode }) => {
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

    DEFAULT_PROTECTED_ROUTE.route.open();

    if (!isSilentMode) {
      showSuccessNotificationFx({
        message: 'Вы успешно вошли в аккаунт',
      });
    }
  } catch (error) {
    showErrorNotificationFx({ message: 'Authorization error' });

    throw error;
  }
});

sample({
  clock: signIn,
  fn: (clock) => ({
    requestBody: {
      login: clock.login,
      password: clock.password,
    },
    isSilentMode: !!clock.isSilentMode,
  }),
  target: signInFx,
});
