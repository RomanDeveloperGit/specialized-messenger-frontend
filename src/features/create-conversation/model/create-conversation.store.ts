import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api';
import {
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';

type Controller = OperationInfo<'ChatController_createConversation_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

export const createConversationFx = createEffect<
  {
    body: Body;
  },
  Response
>(async ({ body }) => {
  return await authorizedHttpClient
    .post<Response>(`/api/v1/chat/conversations` satisfies Path, {
      json: body,
    })
    .json();
});

sample({
  clock: createConversationFx.done,
  fn: () => ({ message: 'Вы успешно создали чат' }),
  target: showSuccessNotificationFx,
});

sample({
  clock: createConversationFx.fail,
  fn: () => ({ message: 'Create conversation error' }),
  target: showErrorNotificationFx,
});
