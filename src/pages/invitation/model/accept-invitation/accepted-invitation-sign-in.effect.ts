import { createEffect, sample } from 'effector';

import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';
import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  DEFAULT_PUBLIC_ROUTE_CONFIG,
  getRouteByConfig,
} from '@/shared/router';

import {
  signInEffectsFactory,
  type SignInSuccessFxParams,
  type SignInSuccessFxResult,
} from '@/entities/auth/model';

import { invitationApi } from '../invitation.store';
import { isInvitationAcceptancePendingApi } from './accept-invitation.store';

const factory = signInEffectsFactory();

export const acceptedInvitationSignInFx = factory.signInFx;

const acceptedInvitationSignInSuccessFx = createEffect<
  SignInSuccessFxParams,
  SignInSuccessFxResult
>(async (params) => {
  await factory.signInSuccessFx(params);

  getRouteByConfig(DEFAULT_PROTECTED_ROUTE_CONFIG).open();
  showSuccessNotificationFx({ message: 'Вы успешно вошли в аккаунт' });

  isInvitationAcceptancePendingApi.reset();
  invitationApi.reset();
});

const acceptedInvitationSignInFailFx = createEffect<void, void>(() => {
  getRouteByConfig(DEFAULT_PUBLIC_ROUTE_CONFIG).open();
  showErrorNotificationFx({ message: 'Authorization error' });

  isInvitationAcceptancePendingApi.reset();
  invitationApi.reset();
});

sample({
  clock: acceptedInvitationSignInFx.doneData,
  target: acceptedInvitationSignInSuccessFx,
});

sample({
  clock: acceptedInvitationSignInFx.fail,
  target: acceptedInvitationSignInFailFx,
});
