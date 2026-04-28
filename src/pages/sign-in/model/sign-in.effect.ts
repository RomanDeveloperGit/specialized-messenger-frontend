import { createEffect, sample } from 'effector';

import { showSuccessNotificationFx } from '@/shared/lib/show-notification';
import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  getRouteByConfig,
} from '@/shared/router';

import {
  signInEffectsFactory,
  type SignInSuccessFxParams,
  type SignInSuccessFxResult,
} from '@/entities/auth/model';

const factory = signInEffectsFactory();

export const signInFx = factory.signInFx;

const signInSuccessFx = createEffect<
  SignInSuccessFxParams,
  SignInSuccessFxResult
>(async (params) => {
  await factory.signInSuccessFx(params);

  getRouteByConfig(DEFAULT_PROTECTED_ROUTE_CONFIG).open();
  showSuccessNotificationFx({ message: 'Вы успешно вошли в аккаунт' });
});

sample({
  clock: signInFx.doneData,
  target: signInSuccessFx,
});
