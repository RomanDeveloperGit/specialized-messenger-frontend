import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api';
import {
  showDefaultErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';

type Controller = OperationInfo<'InvitationController_create_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

type CreateInvitationFxParams = {
  body: Body;
};

type CreateInvitationFxResult = {
  invitation: Response;
};

export const createInvitationFx = createEffect<
  CreateInvitationFxParams,
  CreateInvitationFxResult
>(async ({ body }) => {
  try {
    const invitation = await authorizedHttpClient
      .post<Response>(`/api/v1/invitations` satisfies Path, {
        json: body,
      })
      .json();

    showSuccessNotificationFx({ message: 'Вы успешно создали приглашение' });

    return { invitation };
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'tryAgain' });

    throw error;
  }
});
