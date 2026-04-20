import { createEvent, createStore } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

type Controller = OperationInfo<'InvitationController_getByPublicId_v1'>;
type Response = Controller['response'];

export const $invitation = createStore<Response | null>(null);
export const setInvitation = createEvent<Response>();
export const clearInvitation = createEvent();

$invitation
  .on(setInvitation, (_, payload) => payload)
  .on(clearInvitation, () => null);
