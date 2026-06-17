import { createEffect, type EffectParams } from 'effector';

import { showSuccessNotificationFx } from '@/shared/lib/show-notification/show-notification';
import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  getRouteByConfig,
} from '@/shared/router';

import { signInFx as rawSignInFx } from '@/features/sign-in';

export const signInFx = createEffect<EffectParams<typeof rawSignInFx>, void>(
  async (params) => {
    await rawSignInFx(params);

    getRouteByConfig(DEFAULT_PROTECTED_ROUTE_CONFIG).open();
    showSuccessNotificationFx({ message: 'Вы успешно вошли в аккаунт' });
  },
);
