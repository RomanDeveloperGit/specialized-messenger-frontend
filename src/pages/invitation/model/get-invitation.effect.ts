import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { api } from '@/shared/api';
import { showErrorNotificationFx } from '@/shared/lib/notifications';
import { DEFAULT_PUBLIC_ROUTE_CONFIG } from '@/shared/router';

import { $isAuthorized } from '@/entities/auth';

import { setInvitation } from './invitation.store';

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
  clock: getInvitationFx.doneData,
  target: setInvitation,
});

// TODO: Убрать этот фильтр, ведь он будет недействителен в новой логике (при входе на публичный роут разлогинивать)
sample({
  clock: getInvitationFx.fail,
  source: $isAuthorized,
  filter: (isAuthorized) => !isAuthorized,
  target: DEFAULT_PUBLIC_ROUTE_CONFIG.route.open,
});
