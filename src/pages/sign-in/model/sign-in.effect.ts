import { sample } from 'effector';
import { redirect } from 'atomic-router';

import { showSuccessNotificationFx } from '@/shared/lib/show-notification';
import { DEFAULT_PROTECTED_ROUTE_CONFIG } from '@/shared/router';

import { baseSignInEffectsFactory } from '@/entities/auth/model';

export const { baseSignInFx: signInFx, baseSignInDoneFx: signInDoneFx } =
  baseSignInEffectsFactory();

sample({
  clock: signInFx.doneData,
  target: signInDoneFx,
});

redirect({
  clock: signInDoneFx.done,
  route: DEFAULT_PROTECTED_ROUTE_CONFIG.route,
});

sample({
  clock: signInDoneFx.done,
  fn: () => ({ message: 'Вы успешно вошли в аккаунт' }),
  target: showSuccessNotificationFx,
});
