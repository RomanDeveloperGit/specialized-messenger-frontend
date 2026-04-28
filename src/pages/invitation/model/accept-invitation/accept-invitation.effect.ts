import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api';
import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';

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
    body: Body;
  },
  { credentials: Body }
>(async ({ id, query, body }) => {
  await unauthorizedHttpClient.post<Response>(
    `/api/v1/invitations/${id}/accept` satisfies Path,
    {
      searchParams: query,
      json: body,
    },
  );

  return { credentials: body };
});

sample({
  clock: acceptInvitationFx.done,
  fn: () => ({ message: 'Вы успешно приняли приглашение' }),
  target: showSuccessNotificationFx,
});

sample({
  clock: acceptInvitationFx.doneData,
  fn: (clock) => ({ body: clock.credentials }),
  target: acceptedInvitationSignInFx,
});

sample({
  clock: acceptInvitationFx.fail,
  fn: () => ({ message: 'Accept invitation error' }),
  target: showErrorNotificationFx,
});
