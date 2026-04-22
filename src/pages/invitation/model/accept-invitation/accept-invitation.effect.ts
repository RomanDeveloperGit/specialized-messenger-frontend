import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { api } from '@/shared/api';
import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';

import { acceptedInvitationSignInFx } from './accepted-invitation-sign-in.effect';

type Controller = OperationInfo<'InvitationController_acceptByPublicId_v1'>;
type Path = Controller['path'];
type Query = Controller['search'];
type Body = Controller['body'];
type Response = Controller['response'];

export const acceptInvitationFx = createEffect<
  {
    id: string;
    query: Query;
    requestBody: Body;
  },
  { credentials: Body }
>(async ({ id, query, requestBody }) => {
  await api.post<Response>(`/api/v1/invitations/${id}/accept` satisfies Path, {
    searchParams: query,
    json: requestBody,
  });

  return { credentials: requestBody };
});

sample({
  clock: acceptInvitationFx.done,
  fn: () => ({ message: 'Вы успешно приняли приглашение' }),
  target: showSuccessNotificationFx,
});

sample({
  clock: acceptInvitationFx.doneData,
  fn: (clock) => ({ requestBody: clock.credentials }),
  target: acceptedInvitationSignInFx,
});

sample({
  clock: acceptInvitationFx.fail,
  fn: () => ({ message: 'Accept invitation error' }),
  target: showErrorNotificationFx,
});
