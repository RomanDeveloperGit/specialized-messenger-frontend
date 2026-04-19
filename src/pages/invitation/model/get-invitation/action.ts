import { createEffect, createEvent, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { api } from '@/shared/api';
import { showErrorNotificationFx } from '@/shared/lib/notifications';
import { DEFAULT_PUBLIC_ROUTE, invitationRoute } from '@/shared/router';

import { setInvitation } from '../invitation';

type Controller = OperationInfo<'InvitationController_getByPublicId_v1'>;
type Path = Controller['path'];
type Query = Controller['search'];
type Response = Controller['response'];

export const getInvitation = createEvent<Query & { id: string }>();
export const getInvitationFx = createEffect<
  {
    id: string;
    query: Query;
  },
  Response
>(async ({ id, query }) => {
  try {
    return await api
      .get<Response>(`/api/v1/invitations/${id}` satisfies Path, {
        searchParams: query,
      })
      .json();
  } catch (error) {
    showErrorNotificationFx({ message: 'Get invitation error' });

    throw error;
  }
});

sample({
  clock: invitationRoute.route.opened,
  fn: (clock) => ({
    ...(clock.query as Query),
    ...clock.params,
  }),
  target: getInvitation,
});

sample({
  clock: getInvitation,
  fn: (clock) => ({
    id: clock.id,
    query: {
      firstName: clock.firstName,
      lastName: clock.lastName,
    },
  }),
  target: getInvitationFx,
});

sample({
  clock: getInvitationFx.doneData,
  target: setInvitation,
});

sample({
  clock: getInvitationFx.fail,
  target: DEFAULT_PUBLIC_ROUTE.route.open,
});
