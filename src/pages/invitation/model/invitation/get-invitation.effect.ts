import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api';

import { hasInvitationErrorApi, invitationApi } from './invitation.store';

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
  try {
    hasInvitationErrorApi.reset();

    const invitation = await unauthorizedHttpClient
      .get<Response>(`/api/v1/invitations/${id}` satisfies Path, {
        searchParams: query,
      })
      .json();

    invitationApi.set(invitation);

    return { invitation };
  } catch (error) {
    hasInvitationErrorApi.init();

    throw error;
  }
});
