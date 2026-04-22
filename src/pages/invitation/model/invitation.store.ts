import { createStore, restore } from 'effector';

import { acceptInvitationFx } from './accept-invitation/accept-invitation.effect';
import { acceptedInvitationSignInFx } from './accept-invitation/accepted-invitation-sign-in.effect';
import { getInvitationFx } from './register-page-side-effect/get-invitation.effect';

export const $invitation = restore(getInvitationFx.doneData, null).reset(
  acceptedInvitationSignInFx.done,
  acceptedInvitationSignInFx.fail,
);
export const $isGetInvitationError = createStore(false)
  .on(getInvitationFx.done, () => false)
  .on(getInvitationFx.fail, () => true);

export const $isAcceptInvitationPending = createStore(false)
  .on(acceptInvitationFx, () => true)
  .reset(
    acceptInvitationFx.fail,
    acceptedInvitationSignInFx.done,
    acceptedInvitationSignInFx.fail,
  );
