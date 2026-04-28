import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api';
import { showErrorNotificationFx } from '@/shared/lib/show-notification';

import { hasInvitationErrorApi, invitationApi } from '../invitation.store';

type Controller = OperationInfo<'InvitationController_getByPublicId_v1'>;
type Path = Controller['path'];
type Query = Controller['search'];
type Response = Controller['response'];

type GetInvitationFxParams = {
  id: string;
  query: Query;
};

type GetInvitationFxResult = {
  invitation: Response;
};

export const getInvitationFx = createEffect<
  GetInvitationFxParams,
  GetInvitationFxResult
>(async ({ id, query }) => {
  const invitation = await unauthorizedHttpClient
    .get<Response>(`/api/v1/invitations/${id}` satisfies Path, {
      searchParams: query,
    })
    .json();

  return { invitation };
});

const getInvitationSuccessFx = createEffect<GetInvitationFxResult, void>(
  async ({ invitation }) => {
    hasInvitationErrorApi.set(false);
    invitationApi.set(invitation);
  },
);

const getInvitationFailFx = createEffect<void, void>(async () => {
  hasInvitationErrorApi.set(true);

  showErrorNotificationFx({ message: 'Get invitation error' });
});

sample({
  clock: getInvitationFx.doneData,
  target: getInvitationSuccessFx,
});

sample({
  clock: getInvitationFx.fail,
  target: getInvitationFailFx,
});
