import { attach, sample } from 'effector';
import { redirect } from 'atomic-router';

import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';
import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  DEFAULT_PUBLIC_ROUTE_CONFIG,
} from '@/shared/router';

import { baseSignInFx } from '@/entities/auth/model/base-sign-in.effect';

export const acceptedInvitationSignInFx = attach({
  effect: baseSignInFx,
});

redirect({
  clock: acceptedInvitationSignInFx.done,
  route: DEFAULT_PROTECTED_ROUTE_CONFIG.route,
});

sample({
  clock: acceptedInvitationSignInFx.done,
  fn: () => ({ message: 'Вы успешно вошли в аккаунт' }),
  target: showSuccessNotificationFx,
});

redirect({
  clock: acceptedInvitationSignInFx.fail,
  route: DEFAULT_PUBLIC_ROUTE_CONFIG.route,
});

sample({
  clock: acceptedInvitationSignInFx.fail,
  fn: () => ({ message: 'Authorization error' }),
  target: showErrorNotificationFx,
});
