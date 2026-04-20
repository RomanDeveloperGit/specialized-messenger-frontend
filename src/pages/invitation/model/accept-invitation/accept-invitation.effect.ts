import { attach, createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { api } from '@/shared/api';
import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';
import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  DEFAULT_PUBLIC_ROUTE_CONFIG,
} from '@/shared/router';

import { baseSignInFx } from '@/entities/auth/model/base-sign-in.effect';

import { clearInvitation } from '../invitation.store';

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
  Body
>(async ({ id, query, requestBody }) => {
  try {
    await api.post<Response>(
      `/api/v1/invitations/${id}/accept` satisfies Path,
      {
        searchParams: query,
        json: requestBody,
      },
    );

    showSuccessNotificationFx({
      message: 'Вы успешно приняли приглашение',
    });

    return requestBody;
  } catch (error) {
    showErrorNotificationFx({ message: 'Accept invitation error' });

    throw error;
  }
});

const acceptedInvitationSignInFx = attach({
  effect: baseSignInFx,
});

sample({
  clock: acceptInvitationFx.doneData,
  fn: (clock) => ({ requestBody: clock }),
  target: [acceptedInvitationSignInFx, clearInvitation],
});

sample({
  clock: acceptedInvitationSignInFx.done,
  target: DEFAULT_PROTECTED_ROUTE_CONFIG.route.open,
});

sample({
  clock: acceptedInvitationSignInFx.fail,
  target: DEFAULT_PUBLIC_ROUTE_CONFIG.route.open,
});
