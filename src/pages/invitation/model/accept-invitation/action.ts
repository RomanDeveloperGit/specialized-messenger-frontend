import { createEffect, createEvent, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { api } from '@/shared/api';
import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/notifications';
import { DEFAULT_PUBLIC_ROUTE } from '@/shared/router';

import { signIn } from '@/entities/auth/model/sign-in/action';

import { $invitation, clearInvitation } from '../invitation';
import type { AcceptInvitationSchema } from './schema';

type Controller = OperationInfo<'InvitationController_acceptByPublicId_v1'>;
type Path = Controller['path'];
type Query = Controller['search'];
type Body = Controller['body'];
type Response = Controller['response'];

export const acceptInvitation = createEvent<AcceptInvitationSchema>();
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

sample({
  clock: acceptInvitation,
  source: $invitation,
  fn: (invitation, clock) => ({
    id: invitation!.publicId,
    query: {
      firstName: invitation!.firstName,
      lastName: invitation!.lastName,
    },
    requestBody: clock,
  }),
  target: acceptInvitationFx,
});

sample({
  clock: acceptInvitationFx.doneData,
  fn: (clock) => ({ ...clock, isSilentMode: true }),
  target: [signIn, clearInvitation],
});

sample({
  clock: acceptInvitationFx.fail,
  target: DEFAULT_PUBLIC_ROUTE.route.open,
});
