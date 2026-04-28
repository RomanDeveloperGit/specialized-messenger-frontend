import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api';
import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';

import { isInvitationAcceptancePendingApi } from './accept-invitation.store';
import { acceptedInvitationSignInFx } from './accepted-invitation-sign-in.effect';

type Controller = OperationInfo<'InvitationController_acceptByPublicId_v1'>;
type Path = Controller['path'];
type Query = Controller['search'];
type Body = Controller['body'];
type Response = Controller['response'];

type AcceptInvitationFxParams = {
  id: string;
  query: Query;
  body: Body;
};

type AcceptInvitationFxResult = {
  credentials: Body;
};

export const acceptInvitationFx = createEffect<
  AcceptInvitationFxParams,
  AcceptInvitationFxResult
>(async ({ id, query, body }) => {
  isInvitationAcceptancePendingApi.set(true);

  await unauthorizedHttpClient.post<Response>(
    `/api/v1/invitations/${id}/accept` satisfies Path,
    {
      searchParams: query,
      json: body,
    },
  );

  return { credentials: body };
});

const acceptInvitationSuccessFx = createEffect<AcceptInvitationFxResult, void>(
  async ({ credentials }) => {
    acceptedInvitationSignInFx({ body: credentials });
    showSuccessNotificationFx({ message: 'Вы успешно приняли приглашение' });
  },
);

const acceptInvitationFailFx = createEffect<void, void>(async () => {
  isInvitationAcceptancePendingApi.reset();

  showErrorNotificationFx({ message: 'Accept invitation error' });
});

sample({
  clock: acceptInvitationFx.doneData,
  target: acceptInvitationSuccessFx,
});

sample({
  clock: acceptInvitationFx.fail,
  target: acceptInvitationFailFx,
});
