import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedApi } from '@/shared/api';
import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';

type Controller = OperationInfo<'InvitationController_create_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

export const createInvitationFx = createEffect<
  {
    requestBody: Body;
  },
  Response
>(async ({ requestBody }) => {
  return await authorizedApi
    .post<Response>(`/api/v1/invitations` satisfies Path, {
      json: requestBody,
    })
    .json();
});

sample({
  clock: createInvitationFx.done,
  fn: () => ({ message: 'Вы успешно создали приглашение' }),
  target: showSuccessNotificationFx,
});

sample({
  clock: createInvitationFx.fail,
  fn: () => ({ message: 'Create invitation error' }),
  target: showErrorNotificationFx,
});

// подкидывать данные в стор: Фамилию, имя, ссылку
