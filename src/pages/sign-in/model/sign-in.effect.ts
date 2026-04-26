import { attach, sample } from 'effector';
import { redirect } from 'atomic-router';

import { showSuccessNotificationFx } from '@/shared/lib/show-notification';
import { DEFAULT_PROTECTED_ROUTE_CONFIG } from '@/shared/router';

import { baseSignInFx } from '@/entities/auth/model/base-sign-in.effect';

export const signInFx = attach({
  effect: baseSignInFx,
});

redirect({
  clock: signInFx.done,
  route: DEFAULT_PROTECTED_ROUTE_CONFIG.route,
});

sample({
  clock: signInFx.done,
  fn: () => ({ message: 'Вы успешно вошли в аккаунт' }),
  target: showSuccessNotificationFx,
});
