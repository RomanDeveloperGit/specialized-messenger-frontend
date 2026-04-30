import { createApi, createStore } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

type Controller = OperationInfo<'InvitationController_getByPublicId_v1'>;
type Response = Controller['response'];

export const $invitation = createStore<Response | null>(null);
export const $hasInvitationError = createStore(false);

export const invitationApi = createApi($invitation, {
  set: (_, invitation: Response) => invitation,
  reset: () => null,
});

export const hasInvitationErrorApi = createApi($hasInvitationError, {
  set: (_, hasInvitationError: boolean) => hasInvitationError,
  reset: () => false,
});
