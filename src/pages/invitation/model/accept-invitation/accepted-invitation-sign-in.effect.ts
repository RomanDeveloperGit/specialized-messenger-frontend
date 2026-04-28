import { sample } from 'effector';
import { redirect } from 'atomic-router';

import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';
import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  DEFAULT_PUBLIC_ROUTE_CONFIG,
} from '@/shared/router';

import { baseSignInEffectsFactory } from '@/entities/auth/model';

export const {
  baseSignInFx: acceptedInvitationSignInFx,
  baseSignInDoneFx: acceptedInvitationSignInDoneFx,
} = baseSignInEffectsFactory();

sample({
  clock: acceptedInvitationSignInFx.doneData,
  target: acceptedInvitationSignInDoneFx,
});

redirect({
  clock: acceptedInvitationSignInDoneFx.done,
  route: DEFAULT_PROTECTED_ROUTE_CONFIG.route,
});

sample({
  clock: acceptedInvitationSignInDoneFx.done,
  fn: () => ({ message: 'Вы успешно вошли в аккаунт' }),
  target: showSuccessNotificationFx,
});

redirect({
  clock: acceptedInvitationSignInDoneFx.fail,
  route: DEFAULT_PUBLIC_ROUTE_CONFIG.route,
});

sample({
  clock: acceptedInvitationSignInDoneFx.fail,
  fn: () => ({ message: 'Authorization error' }),
  target: showErrorNotificationFx,
});
