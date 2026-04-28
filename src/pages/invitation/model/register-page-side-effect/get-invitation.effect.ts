import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api';
import { showErrorNotificationFx } from '@/shared/lib/show-notification';

type Controller = OperationInfo<'InvitationController_getByPublicId_v1'>;
type Path = Controller['path'];
type Query = Controller['search'];
type Response = Controller['response'];

export const getInvitationFx = createEffect<
  {
    id: string;
    query: Query;
  },
  Response
>(async ({ id, query }) => {
  return await unauthorizedHttpClient
    .get<Response>(`/api/v1/invitations/${id}` satisfies Path, {
      searchParams: query,
    })
    .json();
});

sample({
  clock: getInvitationFx.fail,
  fn: () => ({ message: 'Get invitation error' }),
  target: showErrorNotificationFx,
});
