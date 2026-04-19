import { createEffect, createEvent, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { api } from '@/shared/api';
import { saveCredentialsInLocalStorage } from '@/shared/lib/auth';
import {
  showDefaultErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';
import { DEFAULT_PROTECTED_ROUTE } from '@/shared/router';

import { setAuthorizedUser } from '@/entities/auth';

import type { SignInSchema } from './schema';

type SignInController = OperationInfo<'AuthController_signIn_v1'>;

export const signIn = createEvent<SignInSchema & { isSilentMode?: boolean }>();
export const signInFx = createEffect<
  {
    requestBody: SignInController['body'];
    isSilentMode: boolean;
  },
  unknown
>(async ({ requestBody, isSilentMode }) => {
  try {
    const user = await api
      .post<SignInController['response']>(
        '/api/v1/auth/sign-in' satisfies SignInController['path'],
        {
          json: requestBody,
        },
      )
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
    showDefaultErrorNotificationFx({ message: 'Authorization error' });

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
